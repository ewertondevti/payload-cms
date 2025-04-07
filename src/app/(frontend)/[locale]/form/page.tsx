"use client";

import MosparoValidator from "@/blocks/Form/MosparoValidator/MosparoValidator";
import { useState, useEffect } from "react";

interface FormData {
 firstName: string;
 lastName: string;
 email: string;
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

 const MOSPARO_PUBLIC_KEY = process.env.NEXT_PUBLIC_MOSPARO_PUBLIC_KEY;
 const MOSPARO_HOST = process.env.NEXT_PUBLIC_MOSPARO_HOST;

 useEffect(() => {
  async function fetchToken() {
   try {
    const res = await fetch("/api/get-submit-token");
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to get token");
    setSubmitToken(data.submitToken);
   } catch (err) {
    setError(err instanceof Error ? err.message : "Failed to connect to Mosparo");
   }
  }

  if (MOSPARO_PUBLIC_KEY && MOSPARO_HOST) {
   fetchToken();
  } else {
   setError("Mosparo configuration is missing");
  }
 }, []);

 const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setFormData(prev => ({
   ...prev,
   [e.target.name]: e.target.value
  }));
 };

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setError(null);
  setIsSubmitting(true);

  try {
   const verification = await fetch("/api/send-token", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
     formData: {
      fields: [
       { name: "first-name", value: formData.firstName },
       { name: "last-name", value: formData.lastName },
       { name: "email-address", value: formData.email }
      ]
     },
     submitToken,
     publicKey: MOSPARO_PUBLIC_KEY
    })
   });
   const verificationData = await verification.json();
   console.log(verificationData);

   if (verificationData.spam) {
    setIsBot(true);
    throw new Error("Bot detected! Submission blocked.");
   }

   alert("Form submitted successfully!");
   setFormData({ firstName: "", lastName: "", email: "" });

  } catch (err) {
   setError(err instanceof Error ? err.message : "Submission error");
  } finally {
   setIsSubmitting(false);
  }
 };

 return (
  <div className="secure-form">
   <h2>Secure Form</h2>

   {error && <div className="error-message">{error}</div>}
   {isBot && <div className="bot-warning">🚨 Bot detected! Form blocked.</div>}

   <form onSubmit={handleSubmit}>
    <MosparoValidator submitToken={submitToken} />
    <input type="hidden" name="submitToken" value={submitToken} />
    <input type="hidden" name="publicKey" value={MOSPARO_PUBLIC_KEY} />

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