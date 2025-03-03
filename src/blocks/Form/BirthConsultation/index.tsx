"use client";

import React from "react";
import { InputText } from "@ama-pt/agora-design-system";
import { UseFormReturn, FieldValues } from "react-hook-form";
import FormTitle from "../formTitle";

type AccessVerificationProps = {
 title: string;
 subtitle?: string;
 accessCodeTitle: string;
 accessCode: {
  placeholder: string;
  required: boolean;
  label: string;
 };
} & UseFormReturn<FieldValues>;

export const BirthConsultation: React.FC<AccessVerificationProps> = ({
 title,
 subtitle,
 accessCodeTitle,
 accessCode,
 register,
 formState: { errors },
}) => {
 return (
  <div className="space-y-4">
   <FormTitle title={title} subtitle={subtitle} />
   <div className="mb-4">
    <h5 className="text-xl font-bold text-[#021C51] mt-12">{accessCodeTitle}</h5>
   </div>
   <div className="mt-8">
    <h2 className="text-base font-semibold text-gray-900 mt-12">{accessCode.label}</h2>
    <div className="grid grid-cols-3 gap-6 mt-4 ">
     <InputText
      id="accessCode1"
      placeholder={accessCode.placeholder}
      {...register("accessCode1")}
      hasError={!!errors.accessCode1}
      feedbackState="danger"
     />
     <InputText
      id="accessCode2"
      placeholder={accessCode.placeholder}
      {...register("accessCode2")}
      hasError={!!errors.accessCode2}
      feedbackState="danger"
     />
     <InputText
      id="accessCode3"
      placeholder={accessCode.placeholder}
      {...register("accessCode3")}
      hasError={!!errors.accessCode3}
      feedbackState="danger"
     />
    </div>
   </div>
  </div>
 );
};
