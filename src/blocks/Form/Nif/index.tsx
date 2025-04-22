"use client";

import React from "react";
import type {
  FieldErrorsImpl,
  FieldValues,
  UseFormRegister,
} from "react-hook-form";
import { InputText } from "@ama-pt/agora-design-system";

export interface NifField {
  defaultValue?: string;
  label?: string;
  name: string;
  required?: boolean;
}

export const Nif: React.FC<
  NifField & {
    errors: Partial<
      FieldErrorsImpl<{
        [x: string]: any;
      }>
    >;
    register: UseFormRegister<FieldValues>;
  }
> = ({
  name,
  defaultValue,
  errors,
  label,
  register,
  required: requiredFromProps,
}) => {
    return (
      <InputText
        label={label}
        defaultValue={defaultValue}
        id={name}
        type="text"
        hasFeedback={true}
        maxLength={9}
        hasError={errors[name] ? true : false}
        feedbackText={errors[name]?.message?.toString()}
        required={requiredFromProps}
        {...register(name, {
          required: requiredFromProps
            ? "Campo de preenchimento obrigatório."
            : false,
          validate: {
            length: (value: string) => {
              if (value && value.length !== 9) {
                return `"Número de Identificação Fiscal (NIF)" deve ter exatamente 9 dígitos.`;
              }
              return true;
            },
            isNif: (value: string) => {
              if (!value) return true;

              if (!/^[0-9]{9}$/.test(value)) {
                return `"Número de Identificação Fiscal (NIF)" introduzido (${value}) é inválido.`;
              }

              const nifArray = value.split("").map(Number);
              const checkDigit = nifArray[8];
              const sum = nifArray
                .slice(0, 8)
                .reduce((acc, num, index) => acc + num * (9 - index), 0);
              const calculatedCheckDigit = 11 - (sum % 11);

              const isValid =
                calculatedCheckDigit >= 10
                  ? checkDigit === 0
                  : checkDigit === calculatedCheckDigit;

              if (!isValid) {
                return `"Número de Identificação Fiscal (NIF)" introduzido (${value}) é inválido.`;
              }

              return true;
            },
          },
        })}
      />
    );
  };
