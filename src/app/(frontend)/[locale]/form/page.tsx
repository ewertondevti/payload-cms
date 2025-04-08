"use client";

import MosparoValidator from "@/blocks/Form/MosparoValidator/MosparoValidator";
import { useState, useEffect, FormEvent, ChangeEvent } from "react";

interface FormData {
 firstName: string;
 lastName: string;
 email: string;
}

// Dados retornados pelo evento "mosparoVerified"
interface MosparoVerifiedPayload {
 submitToken: string;
 validationSignature: string;
 formSignature: string;
 formData: Record<string, string>;
}

export default function SecureForm() {
 const [submitToken, setSubmitToken] = useState("");
 const [formData, setFormData] = useState<FormData>({
  firstName: "",
  lastName: "",
  email: ""
 });

 const [error, setError] = useState<string | null>(null);
 const [isBot, setIsBot] = useState(false);
 const [isSubmitting, setIsSubmitting] = useState(false);
 const [submitSuccess, setSubmitSuccess] = useState(false);

 // Para a verificação oficial
 const [validationSignature, setValidationSignature] = useState<string | null>(null);
 const [formSignature, setFormSignature] = useState<string | null>(null);
 const [verifiedFormData, setVerifiedFormData] = useState<Record<string, string> | null>(null);

 const MOSPARO_PUBLIC_KEY = process.env.NEXT_PUBLIC_MOSPARO_PUBLIC_KEY;
 const MOSPARO_HOST = process.env.NEXT_PUBLIC_MOSPARO_HOST;

 // 1) Carrega o SUBMIT TOKEN
 useEffect(() => {
  async function fetchToken() {
   try {
    const res = await fetch("/api/mosparo", {
     method: "POST",
     headers: { "Content-Type": "application/json" },
     body: JSON.stringify({
      action: "request-submit-token" // Especifica a ação para o endpoint
     })
    });

    const data = await res.json();
    console.log("Mosparo [request-submit-token] response", data);

    if (!res.ok) throw new Error(data.errorMessage || "Failed to get token");
    if (data.submitToken) {
     setSubmitToken(data.submitToken);
    } else {
     throw new Error("No submitToken in response");
    }
   } catch (err) {
    setError(err instanceof Error ? err.message : "Failed to connect to Mosparo");
   }
  }

  // Se as variáveis de ambiente estiverem OK
  if (MOSPARO_PUBLIC_KEY && MOSPARO_HOST) {
   fetchToken();
  } else {
   setError("Mosparo configuration is missing");
  }
 }, [MOSPARO_PUBLIC_KEY, MOSPARO_HOST]);

 // Captura mudanças nos inputs
 const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
  setFormData(prev => ({
   ...prev,
   [e.target.name]: e.target.value
  }));
 };

 // 2) SUBMISSÃO do formulário
 const handleSubmit = async (e: FormEvent) => {
  e.preventDefault();
  setError(null);
  setIsSubmitting(true);
  setSubmitSuccess(false);

  try {
   // 2a) Checagem simples: verificação inicial do form
   const verification = await fetch("/api/mosparo", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
     action: "check-form-data", // Especifica a ação para o endpoint
     submitToken,
     publicKey: MOSPARO_PUBLIC_KEY,
     formData: {
      fields: [
       // Use os mesmos nomes de campo que Mosparo espera
       { name: "firstName", value: formData.firstName },
       { name: "lastName", value: formData.lastName },
       { name: "email", value: formData.email }
      ]
     }
    })
   });

   const verificationData = await verification.json();
   console.log("Check-form-data response", verificationData);

   if (verificationData.error) {
    throw new Error(verificationData.errorMessage || "Error checking form data");
   }

   if (!verificationData.valid || verificationData.spam) {
    // Se spam === true, paramos aqui
    setIsBot(true);
    throw new Error("Bot detected! Submission blocked by check-form-data.");
   }

   // 2b) Verificação Oficial: verificação avançada (opcional mas recomendada)
   if (!validationSignature || !formSignature || !verifiedFormData) {
    console.log("Skipping advanced verification because we don't have the signatures or hashed formData");
   } else {
    const verifyRes = await fetch("/api/mosparo", {
     method: "POST",
     headers: { "Content-Type": "application/json" },
     body: JSON.stringify({
      action: "verify", // Especifica a ação para o endpoint
      submitToken,
      validationSignature,
      formSignature,
      formData: verifiedFormData
     })
    });

    const verifyJson = await verifyRes.json();
    console.log("Verification [official] response", verifyJson);

    if (!verifyRes.ok || verifyJson.error || !verifyJson.valid) {
     // Se "valid" for false ou erro
     throw new Error(verifyJson.errorMessage || "Mosparo advanced verification error");
    }
   }

   // Se chegou aqui, tudo está OK!
   setSubmitSuccess(true);
   setFormData({ firstName: "", lastName: "", email: "" });

  } catch (err) {
   setError(err instanceof Error ? err.message : "Submission error");
  } finally {
   setIsSubmitting(false);
  }
 };

 // 3) Monta o JSX
 return (
  <div className="secure-form">
   <h2>Secure Form</h2>

   {error && <div className="error-message">{error}</div>}
   {isBot && <div className="bot-warning">🚨 Bot detected! Form blocked.</div>}
   {submitSuccess && <div className="success-message">✅ Form submitted successfully!</div>}

   <form onSubmit={handleSubmit}>
    {/* MosparoValidator com "submitToken" e callback onVerified */}
    {submitToken && (
     <MosparoValidator
      submitToken={submitToken}
      onVerified={(info: MosparoVerifiedPayload) => {
       console.log("mosparoVerified payload =>", info);
       setValidationSignature(info.validationSignature);
       setFormSignature(info.formSignature);
       setVerifiedFormData(info.formData);
      }}
     />
    )}

    <div className="form-group">
     <label htmlFor="firstName">First Name:</label>
     <input
      id="firstName"
      type="text"
      name="firstName"
      value={formData.firstName}
      onChange={handleChange}
      required
     />
    </div>

    <div className="form-group">
     <label htmlFor="lastName">Last Name:</label>
     <input
      id="lastName"
      type="text"
      name="lastName"
      value={formData.lastName}
      onChange={handleChange}
      required
     />
    </div>

    <div className="form-group">
     <label htmlFor="email">Email:</label>
     <input
      id="email"
      type="email"
      name="email"
      value={formData.email}
      onChange={handleChange}
      required
     />
    </div>

    <button
     type="submit"
     disabled={isSubmitting || isBot}
     aria-busy={isSubmitting}
    >
     {isSubmitting ? "Submitting..." : "Submit"}
    </button>
   </form>
  </div>
 );
}