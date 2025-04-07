import React, { useEffect } from "react";

interface MosparoValidatorProps {
 submitToken: any;
}

const MosparoValidator: React.FC<MosparoValidatorProps> = ({ submitToken }) => {
 useEffect(() => {
  if (!document.querySelector('script[src*="mosparo-frontend.js"]')) {
   const script = document.createElement("script");
   script.src = `${process.env.NEXT_PUBLIC_MOSPARO_HOST}/build/mosparo-frontend.js`;

   script.async = true;
   document.body.appendChild(script);
  }
 }, []);
 const MOSPARO_CONFIG = {
  publicKey: process.env.NEXT_PUBLIC_MOSPARO_PUBLIC_KEY,
  host: process.env.NEXT_PUBLIC_MOSPARO_HOST
 };

 if (!MOSPARO_CONFIG.publicKey || !MOSPARO_CONFIG.host) {
  console.error("Mosparo configuration is missing");
  return null;
 }

 return React.createElement("mosparo", {
  "project-id": MOSPARO_CONFIG.publicKey,
  host: MOSPARO_CONFIG.host,
  "submit-token": submitToken,
  "mode": "async"
 });
};

export default MosparoValidator;