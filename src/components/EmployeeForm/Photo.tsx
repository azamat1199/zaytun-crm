import { ZFileUploader } from "../z-components/FormElements";
import { useFormContext, Controller } from "react-hook-form";

const Photo = () => {
    const {
        control,
        setValue,

        formState: { errors },
        trigger,
    } = useFormContext();

    return (
        <div className="w-full flex gap-6 pt-6">
            <Controller
                control={control}
                name="photo"
                render={({ field }) => (
                    <ZFileUploader
                        whiteList={["png", "jpg", "jpeg"]}
                        label="Загрузить фотографию сотрудника"
                        accept="image/*"
                        {...field}
                        onChange={(name, value) => {
                            trigger(name);
                            setValue(name, value);
                        }}
                        errors={errors}
                        server="hr"
                        isPhoto
                    />
                )}
            />
            <Controller
                control={control}
                name="idCard"
                render={({ field }) => (
                    <ZFileUploader
                        label="Загрузить ДУЛ"
                        {...field}
                        onChange={(name, value) => {
                            trigger(name);
                            setValue(name, value);
                        }}
                        accept="application/pdf"
                        whiteList={["pdf"]}
                        errors={errors}
                        server="hr"
                    />
                )}
            />
        </div>
    );
};

export default Photo;
