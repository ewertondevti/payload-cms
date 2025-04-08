"use client";

import type { Form as FormType } from "@payloadcms/plugin-form-builder/types";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import RichText from "@/components/RichText";
import { Button } from "@/components/ui/button";
import { buildInitialFormState } from "./buildInitialFormState";
import { fields } from "./fields";
import MosparoValidator from "./MosparoValidator/MosparoValidator";

export type Value = unknown;
export interface Property {
  [key: string]: Value;
}
export interface Data {
  [key: string]: Property | Property[];
}
export type FormBlockType = {
  blockName?: string;
  blockType?: "formBlock";
  enableIntro: boolean;
  form: FormType;
  introContent?: { [k: string]: unknown }[];
};

export const FormBlock: React.FC<
  {
    id?: string;
    stepIndex: number;
    onSubmitOverride?: (data: Data) => void;
    showSubmitButton: boolean;
  } & FormBlockType
> = (props) => {
  const {
    enableIntro,
    form: formFromProps,
    form: { id: formID, confirmationMessage, confirmationType, redirect, submitButtonLabel } = {},
    introContent,
    onSubmitOverride,
    showSubmitButton = true,
    stepIndex,
  } = props;

  const formMethods = useForm({
    defaultValues: buildInitialFormState(formFromProps?.fields),
  });
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
  } = formMethods;

  const [isLoading, setIsLoading] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);
  const [error, setError] = useState<{ message: string; status?: string } | undefined>();
  const [submitToken, setSubmitToken] = useState<string | null>(null);
  const [validationSignature, setValidationSignature] = useState<string | null>(null);
  const [formSignature, setFormSignature] = useState<string | null>(null);
  const [verifiedFormData, setVerifiedFormData] = useState<Record<string, string> | null>(null);
  // Se você quiser a verificação avançada (HMAC / verification/verify), pode criar esses estados:
  // const [validationSignature, setValidationSignature] = useState<string | null>(null);
  // const [formSignature, setFormSignature] = useState<string | null>(null);
  // const [verifiedFormData, setVerifiedFormData] = useState<any>(null);

  const router = useRouter();
  const t = useTranslations();

  // 1. Carregar o SUBMIT TOKEN
  useEffect(() => {
    const fetchSubmitToken = async () => {
      console.log("[FormBlock] Starting fetch for submit token from /api/send-token...");
      try {
        const response = await fetch("/api/send-token", { method: "POST" });
        const data = await response.json();
        console.log("[FormBlock] /api/send-token response:", data);

        if (data.submitToken) {
          setSubmitToken(data.submitToken);
        } else {
          setError({ message: "Fail to get the token" });
        }
      } catch (err) {
        console.error("[FormBlock] Error fetching token:", err);
        setError({ message: "fail to get the token" });
      }
    };
    fetchSubmitToken();
  }, []);

  // 2. Definir lógica de onSubmit
  let onSubmit;
  if (onSubmitOverride) {
    // Se houver um callback custom de onSubmit
    onSubmit = useCallback(
      (data: Data) => {
        console.log("[FormBlock] onSubmitOverride called, data =>", data);
        if (!hasSubmitted) {
          onSubmitOverride(data);
        }
        setIsLoading(false);
        setHasSubmitted(false);
        setError(undefined);
      },
      [onSubmitOverride, hasSubmitted]
    );
  } else {
    // Fluxo normal
    onSubmit = useCallback(
      async (data: Data) => {
        console.log("[FormBlock] onSubmit called, data =>", data);
        setError(undefined);
        let loadingTimerID: ReturnType<typeof setTimeout> | undefined;
        try {
          if (!submitToken) {
            console.warn("[FormBlock] No submitToken found, cannot proceed.");
            setError({ message: "Token de submissão ausente ou inválido" });
            return;
          }
          // Montar dataToSend
          const dataToSend = Object.entries(data).map(([name, value]) => ({
            name,
            value,
            fieldPath: name,
          }));

          console.log("[FormBlock] dataToSend =>", dataToSend);

          // Dispara isLoading depois de 1 segundo
          loadingTimerID = setTimeout(() => setIsLoading(true), 1000);

          // 2a) Chamamos /api/get-submit-token (modo "check-form-data")
          console.log("[FormBlock] Calling /api/get-submit-token with check-form-data...");
          const mosparoResponse = await fetch("/api/get-submit-token", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              publicKey: process.env.NEXT_PUBLIC_MOSPARO_PUBLIC_KEY,
              submitToken,
              formData: {
                fields: dataToSend,
                ignoredFields: [],
              },
            }),
          });

          console.log("[FormBlock] Mosparo fetch =>", mosparoResponse);
          const mosparoResult = await mosparoResponse.json();
          console.log("[FormBlock] Mosparo result =>", mosparoResult);

          if (!mosparoResult || mosparoResult.error || !mosparoResult.valid) {
            clearTimeout(loadingTimerID);
            setIsLoading(false);
            setError({ message: "Mosparo validation error (check-form-data)" });
            return;
          }

          // // 2b) Se você quisesse a verificação avançada, chamaria /api/verify aqui, ex:
          // /*
          // if (validationSignature && formSignature && verifiedFormData) {
          //   console.log("[FormBlock] Doing advanced verification with /api/verify...");
          //   const verifyRes = await fetch("/api/verify", {
          //     method: "POST",
          //     headers: { "Content-Type": "application/json" },
          //     body: JSON.stringify({
          //       submitToken,
          //       validationSignature,
          //       formSignature,
          //       formData: verifiedFormData,
          //     }),
          //   });
          //   const verifyJson = await verifyRes.json();
          //   console.log("[FormBlock] /api/verify response =>", verifyJson);
          //   if (!verifyJson.valid) {
          //     throw new Error("Verification advanced error");
          //   }
          // } else {
          //   console.log("[FormBlock] Skipping advanced verification because we don't have the signatures or hashed formData");
          // }
          // */

          // 2c) Enviar ao Payload (ou outro back)
          console.log("[FormBlock] Submitting data to Payload => /api/form-submissions");
          const req = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/form-submissions`, {
            body: JSON.stringify({
              form: formID,
              submissionData: dataToSend,
            }),
            headers: { "Content-Type": "application/json" },
            method: "POST",
          });

          const res = await req.json();
          clearTimeout(loadingTimerID);

          console.log("[FormBlock] Payload response =>", res);

          if (req.status >= 400) {
            setIsLoading(false);
            setError({
              message: res.errors?.[0]?.message || "Internal Server Error",
              status: String(req.status),
            });
            return;
          }

          setIsLoading(false);
          setHasSubmitted(true);
          console.log("[FormBlock] Form submission success =>", res);

          // Se houver redirect
          if (confirmationType === "redirect" && redirect) {
            const { url } = redirect;
            if (url) {
              console.log("[FormBlock] Redirecting to =>", url);
              router.push(url);
            }
          }
        } catch (err) {
          console.warn("[FormBlock] Error in submission process =>", err);
          clearTimeout(loadingTimerID);
          setIsLoading(false);
          setError({ message: "Something is wrong with the request." });
        }
      },
      [
        router,
        formID,
        redirect,
        confirmationType,
        submitToken,
        // validationSignature,
        // formSignature,
        // verifiedFormData,
      ]
    );
  }

  // Se não houver fields
  if (!formFromProps?.fields?.length) return null;

  return (
    <div className="container">
      <FormProvider {...formMethods}>
        {enableIntro && introContent && !hasSubmitted && (
          <RichText className="mb-8" content={introContent} enableGutter={false} />
        )}
        {isLoading && !hasSubmitted && <p>{t("loading")}</p>}

        {error && (
          <div style={{ color: "red", marginBottom: "1rem" }}>
            {`${error.status || "500"}: ${error.message || ""}`}
          </div>
        )}

        <form key="form" id={formID} onSubmit={handleSubmit(onSubmit)} noValidate>
          {/* 3) MosparoValidator (no modo 'async') */}
          <MosparoValidator
            submitToken={submitToken}
            onVerified={(detail) => {
              console.log("[FormBlock] mosparoVerified event =>", detail);
              // Exemplo de como você pegaria a verificação avançada:
              setValidationSignature(detail.validationSignature);
              setFormSignature(detail.formSignature);
              setVerifiedFormData(detail.formData);
            }}
          />

          <div className="flex flex-col gap-64 w-[800px]">
            {formFromProps.fields.map((field, index) => {
              const FieldComponent = fields?.[field.blockType] as React.FC<any> | undefined;
              if (FieldComponent) {
                return (
                  <div className="last:mb-0" key={`${index}_${stepIndex}`}>
                    <FieldComponent
                      form={formFromProps}
                      {...field}
                      {...formMethods}
                      control={control}
                      errors={errors}
                      register={register}
                    />
                  </div>
                );
              }
              return null;
            })}
          </div>

          {showSubmitButton && (
            <Button form={formID} type="submit" variant="default">
              {submitButtonLabel || "Enviar"}
            </Button>
          )}
        </form>
      </FormProvider>
    </div>
  );
};
