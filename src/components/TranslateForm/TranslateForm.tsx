import { FC } from "react";
import FormInput from "../form-input/formInput";
import { Form, Formik } from "formik";
import { TButton } from "@zaytun/components";

interface TranslateFormProps {
    handleSubmit: (values: any) => void;
    initialValues?: Record<string, any>;
    pending?: boolean;
    serialNum?: boolean;
}

const TranslateForm: FC<TranslateFormProps> = ({
    pending = false,
    initialValues = {},
    serialNum = true,
    handleSubmit,
}) => {
    return (
        <Formik onSubmit={handleSubmit} initialValues={initialValues}>
            {() => (
                <Form>
                    <div>
                        <FormInput
                            upperWidth
                            name="uzCr"
                            label={`Название (узб)`}
                            placeholder="Название (узб)"
                            fullWidth
                            withAsterisk
                        />
                        <FormInput
                            upperWidth
                            name="uzLat"
                            label={`Название (lat)`}
                            placeholder="Название (lat)"
                            fullWidth
                            withAsterisk
                        />
                        <FormInput
                            upperWidth
                            name="en"
                            label="Название (анг)"
                            placeholder="Название (анг)"
                            fullWidth
                            withAsterisk
                        />
                        <FormInput
                            upperWidth
                            name="ru"
                            label="Название (рус)"
                            placeholder="Название (рус)"
                            fullWidth
                            withAsterisk
                        />
                        {serialNum && (
                            <FormInput
                                upperWidth
                                name="sortOrder"
                                label="Порядковый номер"
                                placeholder="Порядковый номер"
                                fullWidth
                                withAsterisk
                                type="number"
                            />
                        )}
                    </div>
                    <div className="flex items-center py-8  w-full justify-center gap-6">
                        <TButton onClick={close} className="w-[160px]">
                            Отменить
                        </TButton>
                        <TButton
                            className="w-[160px]"
                            variant="filled"
                            // @ts-expect-error need to be fixed TODO
                            type="submit"
                            loading={pending}
                        >
                            Добавить{" "}
                        </TButton>
                    </div>
                </Form>
            )}
        </Formik>
    );
};

export default TranslateForm;
