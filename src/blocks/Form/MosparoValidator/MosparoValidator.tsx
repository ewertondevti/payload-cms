import React, { useEffect, useRef, useState } from "react";

interface MosparoValidatorProps {
 submitToken: string | null;
 onVerified?: (info: any) => void;
}

const MosparoValidator: React.FC<MosparoValidatorProps> = ({
 submitToken,
 onVerified,
}) => {
 const mosparoRef = useRef<HTMLElement | null>(null);
 const [isScriptLoaded, setIsScriptLoaded] = useState(false);
 const [eventAttached, setEventAttached] = useState(false);

 const MOSPARO_CONFIG = {
  publicKey: process.env.NEXT_PUBLIC_MOSPARO_PUBLIC_KEY,
  host: process.env.NEXT_PUBLIC_MOSPARO_HOST,
 };

 // Load JS + CSS
 useEffect(() => {
  if (!MOSPARO_CONFIG.host) return;

  // 1. JS
  if (!document.querySelector('script[src*="mosparo-frontend.js"]')) {
   console.log("[MosparoValidator] Injecting mosparo-frontend.js from:", MOSPARO_CONFIG.host);
   const script = document.createElement("script");
   script.src = `${MOSPARO_CONFIG.host}/build/mosparo-frontend.js`;
   script.async = true;
   script.onload = () => {
    console.log("[MosparoValidator] mosparo-frontend.js loaded");
    setIsScriptLoaded(true);
   };
   script.onerror = () => {
    console.error("[MosparoValidator] Failed to load mosparo-frontend.js");
   };
   document.body.appendChild(script);
  } else {
   console.log("[MosparoValidator] mosparo-frontend.js already present");
   setIsScriptLoaded(true);
  }

  // 2. CSS
  if (!document.querySelector('link[href*="mosparo"]')) {
   const link = document.createElement("link");
   link.href = `${MOSPARO_CONFIG.host}/resources/f88fbf2f-d7e5-4c66-9811-6029a091be99.css`;
   link.rel = "stylesheet";
   document.head.appendChild(link);
  }
 }, [MOSPARO_CONFIG.host]);

 // Event Listener
 useEffect(() => {
  const handleMosparoVerified = (e: any) => {
   console.log("✅ [MosparoValidator] mosparoVerified event received =>", e.detail);
   if (onVerified) onVerified(e.detail);
  };

  const element = mosparoRef.current;
  if (element && !eventAttached) {
   console.log("[MosparoValidator] Attaching event listener...");
   element.addEventListener("mosparoVerified", handleMosparoVerified as EventListener);
   setEventAttached(true);
  }

  return () => {
   if (element && eventAttached) {
    console.log("[MosparoValidator] Removing event listener...");
    element.removeEventListener("mosparoVerified", handleMosparoVerified as EventListener);
   }
  };
 }, [onVerified, eventAttached, mosparoRef.current]); // Added mosparoRef.current to dependency array

 if (!MOSPARO_CONFIG.publicKey || !MOSPARO_CONFIG.host) {
  console.error("[MosparoValidator] ❌ Missing configuration");
  return <p style={{ color: "red" }}>Mosparo config missing</p>;
 }

 if (!submitToken) {
  console.warn("[MosparoValidator] ❌ No submitToken passed");
  return <p style={{ color: "orange" }}>Waiting for token...</p>;
 }

 // Final Render
 return (
  <>
   {process.env.NODE_ENV === "development" && (
    <div style={{ fontSize: 12, color: "gray", marginBottom: 8 }}>
     <p>🔒 Mosparo Debug:</p>
     <ul>
      <li>JS Loaded: {isScriptLoaded ? "✅" : "❌"}</li>
      <li>Token: {submitToken.slice(0, 10)}...</li>
      <li>Listener: {eventAttached ? "✅" : "❌"}</li>
     </ul>
    </div>
   )}
   {React.createElement("mosparo", {
    ref: mosparoRef,
    "project-id": MOSPARO_CONFIG.publicKey,
    host: MOSPARO_CONFIG.host,
    "submit-token": submitToken,
    mode: "async",
   })}
  </>
 );
};

export default MosparoValidator;