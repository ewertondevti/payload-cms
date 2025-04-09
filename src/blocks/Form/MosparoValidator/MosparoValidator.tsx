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
  publicKey: "erNqkNdoL1yfLpxb6IlUUYBJf5Hs1QkwYr98t5pPd-g",
  host: "mosparo.irn.internal",
 };

 // Injeção do script e do CSS do Mosparo
 useEffect(() => {
  // Injetar JS se não estiver presente
  if (!document.querySelector('script[src*="mosparo-frontend.js"]')) {
   console.log("[MosparoValidator] Injetando mosparo-frontend.js...");
   const script = document.createElement("script");
   script.src = "https://mosparo.irn.internal/build/mosparo-frontend.js";
   script.async = true;
   script.onload = () => {
    console.log("[MosparoValidator] mosparo-frontend.js carregado");
    setIsScriptLoaded(true);
   };
   script.onerror = () => {
    console.error("[MosparoValidator] Erro ao carregar mosparo-frontend.js");
   };
   document.body.appendChild(script);
  } else {
   console.log("[MosparoValidator] mosparo-frontend.js já está presente");
   setIsScriptLoaded(true);
  }

  // Injetar o CSS se não estiver presente
  if (!document.querySelector('link[href*="mosparo"]')) {
   const link = document.createElement("link");
   link.href = "https://mosparo.irn.internal/resources/f88fbf2f-d7e5-4c66-9811-6029a091be99.css";
   link.rel = "stylesheet";
   console.log("[MosparoValidator] Injetando o CSS do Mosparo");
   document.head.appendChild(link);
  }
 }, []);

 // Adicionar o listener para o evento de verificação
 useEffect(() => {
  const handleMosparoVerified = (e: any) => {
   console.log("✅ [MosparoValidator] Evento 'mosparoVerified' recebido =>", e.detail);
   if (onVerified) onVerified(e.detail);
  };

  const element = mosparoRef.current;
  if (element && !eventAttached) {
   console.log("[MosparoValidator] Anexando listener do evento 'mosparoVerified'...");
   element.addEventListener("mosparoVerified", handleMosparoVerified as EventListener);
   setEventAttached(true);
  }

  return () => {
   if (element && eventAttached) {
    console.log("[MosparoValidator] Removendo listener do evento 'mosparoVerified'...");
    element.removeEventListener("mosparoVerified", handleMosparoVerified as EventListener);
   }
  };
 }, [onVerified, eventAttached]);

 // Verificação de token e configuração
 if (!MOSPARO_CONFIG.publicKey || !MOSPARO_CONFIG.host) {
  console.error("[MosparoValidator] ❌ Configuração do Mosparo ausente");
  return <p style={{ color: "red" }}>Configuração do Mosparo ausente</p>;
 }

 if (!submitToken) {
  console.warn("[MosparoValidator] ❌ Aguardando o submitToken...");
  return <p style={{ color: "orange" }}>Aguardando o token...</p>;
 }

 // Renderização do componente do Mosparo
 return (
  <>
   {/* Container opcional para ajudar na estilização ou centralizar o box */}
   <div id="mosparo-container">
    {React.createElement("mosparo", {
     ref: mosparoRef,
     "project-id": MOSPARO_CONFIG.publicKey,
     host: MOSPARO_CONFIG.host,
     "submit-token": submitToken,
     mode: "async",
    })}
   </div>
   {/* Debug opcional: descomente para informações em desenvolvimento */}
   {/*
      <div style={{ fontSize: 12, color: "gray", marginTop: 8 }}>
        <p>🔒 Debug do Mosparo:</p>
        <ul>
          <li>JS Carregado: {isScriptLoaded ? "✅" : "❌"}</li>
          <li>Token: {submitToken.slice(0, 10)}...</li>
          <li>Listener: {eventAttached ? "✅" : "❌"}</li>
        </ul>
      </div>
      */}
  </>
 );
};

export default MosparoValidator;
