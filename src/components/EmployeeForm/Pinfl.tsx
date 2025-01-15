import {
    getEmployeeByProcessId,
    getEmployeeCreateProcessId,
} from "@/data/hr/employee";
import useGender from "@/hooks/api/useGender";
import { useMutation } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import get from "lodash.get";
import { useRef } from "react";
import { Controller, useFormContext } from "react-hook-form";
import TableSearchIcon from "../icons/TableSearchIcon";
import { ZDatePicker, ZPatternFormat } from "../z-components/FormElements";
import ZButton from "../z-components/ZButton";
import useEmployeeFormContext from "./_hooks/useEmployeeFormContext";
import { formatDate } from "@/services/time";
// import { useStompClient, useSubscription } from 'react-stomp-hooks';

let externalVariable = "";
const EMPLOYEE_REQUEST_LIMIT = 10;
const INTERVAL_TIME = 10000;
let pinflDone = false;

const OrganizationStructureCollapse = () => {
    const {
        control,
        watch,
        formState: { errors },
        setValue,
    } = useFormContext();
    const { options: genderOptions } = useGender();
    const { setFormStatus, formStatus, setProcessId, readonly } =
        useEmployeeFormContext();
    const intervalId = useRef<any>(null);

    const pinfl = (watch("pinfl") || "") as string;
    const birthDate = watch("birthDate");

    // Function to send request to server with given count
    const sendRequest = async (count: number) => {
        // If PINFL data has already been processed, return
        if (pinflDone) {
            return;
        }
        try {
            // Get employee data by process ID from server
            const response = await getEmployeeByProcessId(externalVariable);
            const data = get(response, "data.result.data", {});

            // Find gender option corresponding to the data
            const gender = genderOptions.find(
                (option) => option.value === data.gender,
            );

            // Set values for various form fields
            setValue("firstNameCrl", data.firstNameCrl);
            setValue("firstNameLat", data.firstNameLat);
            setValue("internalPhoneNumber", data.internalPhoneNumber);
            setValue("lastNameCrl", data.lastNameCrl);
            setValue("lastNameLat", data.lastNameLat);
            setValue("middleNameCrl", data.middleNameCrl);
            setValue("middleNameLat", data.middleNameLat);
            setValue("passportIssuedDate", formatDate(data.passportIssuedDate));
            setValue("passportNumber", data.passportNumber);
            setValue("passportSerial", data.passportSerial);
            setValue(
                "passportValidityDate",
                formatDate(data.passportValidityDate),
            );
            setValue("gender", gender);

            // Update flag to indicate PINFL processing is done
            pinflDone = true;
            // Set form status to idle
            setFormStatus("done");
        } catch (e) {
            // Handle errors, if any
        } finally {
            // If all requests are exhausted, set form status to idle
            if (count + 1 === EMPLOYEE_REQUEST_LIMIT) {
                setFormStatus("done");
            }
        }
    };

    // Mutation hook for getting process ID
    const processIdMutation = useMutation({
        mutationFn: getEmployeeCreateProcessId,
        mutationKey: ["process-id"],
        onSuccess: (response: AxiosResponse) => {
            // If response status is OK, set process ID and external variable
            if (response.status === 200) {
                setProcessId(get(response, "data.result.data.id"));
                externalVariable = get(response, "data.result.data.id");
            }

            // Clear interval for checking server
            clearInterval(intervalId.current);
            // Set form status to checking server
            setFormStatus("checking-server");
            // Send first request to server to get employee data
            sendRequest(0);

            // Loop to send subsequent requests with interval
            for (let i = 1; i < EMPLOYEE_REQUEST_LIMIT; i++) {
                setTimeout(() => {
                    sendRequest(i);
                }, INTERVAL_TIME * i);
            }
        },
    });

    // Function to get data by PINFL
    const getDataByPinfl = async () => {
        // If form status is checking server, return
        if (formStatus === "checking-server") {
            return;
        }
        // Trigger mutation to get data by PINFL
        processIdMutation.mutate({ pinfl, birthDate });
    };

    const enabledPinflButton = pinfl.trim() && birthDate;

    return (
        <div className="w-full grid grid-cols-4 gap-4 pt-6">
            <Controller
                control={control}
                name="pinfl"
                render={({ field }) => (
                    <ZPatternFormat
                        inputProps={{
                            label: "ПИНФЛ",
                            placeholder: "ПИНФЛ",
                            errors,
                        }}
                        format="##############"
                        {...field}
                    />
                )}
            />
            <Controller
                control={control}
                name="birthDate"
                render={({ field }) => (
                    <ZDatePicker
                        label="Дата рождения"
                        {...field}
                        errors={errors}
                        rightElement={
                            !readonly && (
                                <ZButton
                                    type="button"
                                    className="ml-4 w-12"
                                    iconButton
                                    onClick={getDataByPinfl}
                                    pending={formStatus === "checking-server"}
                                    disabled={!enabledPinflButton}
                                >
                                    <TableSearchIcon />
                                </ZButton>
                            )
                        }
                    />
                )}
            />
        </div>
    );
};

export default OrganizationStructureCollapse;
