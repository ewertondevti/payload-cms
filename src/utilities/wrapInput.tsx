import {
  useFormContext,
  ValidationRule,
  ValidationValueMessage,
} from "react-hook-form";

import React, { ChangeEvent } from "react";


import { JSX } from "react";
import { Width } from "@/blocks/Form/Width";

export type WrappedProps = {
  name: string;
  label: string;
  required?: boolean;
  width: number;
  placeholder?: string;
  pattern?: ValidationRule<RegExp>;
  errorMessage?: string;
  minLength?: number;
  maxLength?: number;
  type?: "text" | "number" | "code";
  format?: (value: string) => string;
  defaultValue?: string;
};

export const wrapInput = <T,>(Input: React.FC<T>) => {
  return ({
    type,
    name,
    width,
    required,
    minLength,
    maxLength,
    pattern,
    errorMessage,
    inputProps,
    placeholder,
    format,
    label,
    defaultValue,
  }: { inputProps: T } & JSX.IntrinsicAttributes & WrappedProps) => {
    const { register, formState, setValue } = useFormContext();
    const errors = formState.errors[name];
    const patternValue =
      (pattern as ValidationValueMessage<RegExp>)?.value ?? (pattern as RegExp);
    const patternMessage =
      (pattern as ValidationValueMessage<RegExp>)?.message ??
      `"${label}" inválido`;

    format ??=
      type === "number"
        ? (value: string) => value.replace(/[^\d]+/g, "")
        : (value: string) => value;

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
      const value = format(e.target.value);
      setValue(name, value);
    };

    return (
      <Width width={width}>
        <Input
          {...inputProps}
          {...register(name!, {
            required: {
              value: !!required,
              message: `Obrigatório preencher "${label}"`,
            },
            minLength,
            maxLength,
            pattern: pattern
              ? { value: patternValue, message: patternMessage }
              : undefined,
            value: defaultValue,
            onChange,
          })}
          {...{
            minLength,
            maxLength,
            placeholder,
            label,
            required,
            defaultValue,
          }}
          pattern={pattern?.toString()}
          feedbackState="danger"
          feedbackText={errorMessage || errors?.message || "Erro no campo"}
          hasError={!!errors}
        />
      </Width>
    );
  };
};

export default wrapInput;
