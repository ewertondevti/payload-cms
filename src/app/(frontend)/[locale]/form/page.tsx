"use client";

import React, { useEffect, useRef, useState } from 'react';

declare global {
 interface Window {
  mosparo?: any;
 }
}

const ContactForm = () => {
 const formRef = useRef<HTMLFormElement>(null);
 const mosparoBoxRef = useRef<HTMLDivElement>(null);
 const [isSubmitting, setIsSubmitting] = useState(false);
 const [submitError, setSubmitError] = useState<string | null>(null);

 useEffect(() => {
  // Hardcoded Mosparo values (instead of using environment variables)
  const mosparoHost = "https://mosparo.irn.internal";  // Using the MOSPARO_URL from .env
  const mosparoUUID = "f88fbf2f-d7e5-4c66-9811-6029a091be99";
  const mosparoPublicKey = "erNgKndOLlyfLpxb6lIuUYBJf5HslQkwYr98t5pPd-g";

  // Create and append the CSS link
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = `${mosparoHost}/resources/${mosparoUUID}.css`;
  document.head.appendChild(link);

  // Create and append the script
  const script = document.createElement('script');
  script.src = `${mosparoHost}/build/mosparo-frontend.js`;
  script.defer = true;
  document.body.appendChild(script);

  // Initialize Mosparo after script loads
  script.onload = () => {
   if (window.mosparo && mosparoBoxRef.current) {
    try {
     new window.mosparo(
      'mosparo-box',
      mosparoHost,
      mosparoUUID,
      mosparoPublicKey,
      { loadCssResource: true }
     );
    } catch (error) {
     console.error('Failed to initialize Mosparo:', error);
    }
   }
  };

  // Cleanup function
  return () => {
   if (link.parentNode) {
    document.head.removeChild(link);
   }
   if (script.parentNode) {
    document.body.removeChild(script);
   }
  };
 }, []);

 const handleSubmit = async (event: React.FormEvent) => {
  event.preventDefault();
  setIsSubmitting(true);
  setSubmitError(null);

  try {
   // You would typically send your form data to an API endpoint here
   // const formData = new FormData(formRef.current!);
   // const response = await fetch('/api/contact', {
   //   method: 'POST',
   //   body: formData,
   // });

   console.log("Form submitted successfully");

   // Clear the form
   if (formRef.current) {
    formRef.current.reset();
   }
  } catch (error) {
   console.error("Error submitting form:", error);
   setSubmitError("There was an error submitting your form. Please try again.");
  } finally {
   setIsSubmitting(false);
  }
 };

 return (
  <div className="container py-4">
   <h2 className="mb-4">Contact Us</h2>
   {submitError && (
    <div className="alert alert-danger" role="alert">
     {submitError}
    </div>
   )}
   <form method="post" id="contact-form" onSubmit={handleSubmit} ref={formRef}>
    <div className="row mb-3">
     <label className="col-sm-3 col-form-label required" htmlFor="name">
      Name
     </label>
     <div className="col-sm-9">
      <input
       type="text"
       name="name"
       id="name"
       className="form-control"
       required
      />
     </div>
    </div>
    <div className="row mb-3">
     <label className="col-sm-3 col-form-label required" htmlFor="emailAddress">
      Email address
     </label>
     <div className="col-sm-9">
      <input
       type="email"
       name="emailAddress"
       id="emailAddress"
       className="form-control"
       required
      />
     </div>
    </div>
    <div className="row mb-3">
     <label className="col-sm-3 col-form-label required" htmlFor="message">
      Message
     </label>
     <div className="col-sm-9">
      <textarea
       className="form-control"
       name="message"
       id="message"
       style={{ height: '200px' }}
       required
      ></textarea>
     </div>
    </div>
    <div className="row mb-3">
     <div className="col-sm-3"></div>
     <div className="col-sm-9">
      {/* Mosparo integration */}
      <div id="mosparo-box" ref={mosparoBoxRef}></div>
     </div>
    </div>
    <div className="row mb-3">
     <div className="col-sm-3"></div>
     <div className="col-sm-9">
      <button
       type="submit"
       name="submitted"
       className="btn btn-primary btn-lg"
       disabled={isSubmitting}
      >
       {isSubmitting ? 'Submitting...' : 'Submit'}
      </button>
     </div>
    </div>
   </form>
  </div>
 );
};

export default ContactForm;