'use client'
import React, { useState } from 'react'

const MOSPARO_URL = "https://mosparo.irn.internal"
const MOSPARO_PUBLIC_KEY = "erNgKndOLlyfLpxb6lIuUYBJf5HslQkwYr98t5pPd-g"


async function getSubmitToken() {
 try {
  const formData = new FormData();
  formData.append("publicKey", MOSPARO_PUBLIC_KEY);

  console.log("🔍 Enviando para Mosparo:", formData);

  const response = await fetch(`${MOSPARO_URL}/api/v1/frontend/request-submit-token`, {
   method: "POST",
   body: formData,
   mode: "cors"
  });

  const data = await response.json();

  if (!response.ok) {
   console.error("Erro ao obter submitToken:", data);
   throw new Error(data.errorMessage || "Erro ao obter submitToken");
  }

  return data.submitToken;
 } catch (err: any) {
  console.error("Erro no getSubmitToken:", err);
  throw new Error(err?.message || "Erro ao obter submitToken.");
 }
}



async function validateFormWithMosparo(formDataObj: any, submitToken: string) {
 try {
  const formData = new FormData();
  formData.append("publicKey", MOSPARO_PUBLIC_KEY);
  formData.append("submitToken", submitToken);
  formData.append("formData", JSON.stringify({
   fields: Object.keys(formDataObj).map(key => ({
    name: key,
    value: formDataObj[key],
    fieldPath: `input[text].${key}`
   }))
  }));

  console.log("🔍 Enviando formulário para Mosparo:", formData);
  const response = await fetch(`${MOSPARO_URL}/api/v1/frontend/check-form-data`, {
   method: "POST",
   body: formData,
   mode: "cors"
  });

  const data = await response.json();

  if (!response.ok) {
   console.error("Erro na validação:", data);
   throw new Error(data.error || "Erro na validação");
  }

  return data.message;
 } catch (err: any) {
  console.error("Erro no validateFormWithMosparo:", err);
  throw new Error(err?.message || "Erro inesperado na validação.");
 }
}


export default function TestMosparoForm() {
 const [formData, setFormData] = useState({
  "first-name": "",
  "last-name": "",
  "email-address": ""
 });
 const [error, setError] = useState<string | null>(null);
 const [isLoading, setIsLoading] = useState(false);
 const [submitted, setSubmitted] = useState(false);

 const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setFormData({ ...formData, [e.target.name]: e.target.value });
 };

 const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setError(null);
  setIsLoading(true);
  setSubmitted(false);

  try {

   const submitToken = await getSubmitToken();

   await validateFormWithMosparo(formData, submitToken);

   alert("[SUCESSO] Formulário validado pelo Mosparo!");
   setSubmitted(true);
  } catch (err: any) {
   setError(err?.message || "Erro inesperado ao validar formulário.");
  } finally {
   setIsLoading(false);
  }
 };

 return (
  <div style={{ maxWidth: 500, margin: "0 auto", padding: 16 }}>
   <h1>Formulário de Teste com Mosparo</h1>
   <form onSubmit={handleSubmit}>
    <div style={{ marginBottom: 8 }}>
     <label>
      Nome:
      <input
       type="text"
       name="first-name"
       value={formData["first-name"]}
       onChange={handleChange}
       required
       style={{ marginLeft: 8 }}
      />
     </label>
    </div>

    <div style={{ marginBottom: 8 }}>
     <label>
      Sobrenome:
      <input
       type="text"
       name="last-name"
       value={formData["last-name"]}
       onChange={handleChange}
       required
       style={{ marginLeft: 8 }}
      />
     </label>
    </div>

    <div style={{ marginBottom: 8 }}>
     <label>
      E-mail:
      <input
       type="email"
       name="email-address"
       value={formData["email-address"]}
       onChange={handleChange}
       required
       style={{ marginLeft: 8 }}
      />
     </label>
    </div>

    <button type="submit" disabled={isLoading}>
     {isLoading ? "Verificando..." : "Enviar"}
    </button>
   </form>

   {error && (
    <div style={{ marginTop: 12, color: "red" }}>
     <strong>Erro:</strong> {error}
    </div>
   )}

   {submitted && (
    <div style={{ marginTop: 12, color: "green" }}>
     <strong>Formulário enviado com sucesso!</strong>
    </div>
   )}
  </div>
 );
}
