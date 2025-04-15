import React from "react";
import { useForm, FormProvider, UseFormReturn } from "react-hook-form";

type FormWrapperProps = {
 children: (methods: UseFormReturn) => React.ReactNode;
};

export const FormWrapper: React.FC<FormWrapperProps> = ({ children }) => {
 const methods = useForm();
 return <FormProvider {...methods}>{children(methods)}</FormProvider>;
};
