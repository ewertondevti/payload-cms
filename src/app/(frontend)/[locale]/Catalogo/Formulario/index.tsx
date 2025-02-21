'use client'
import {
  Accordion,
  Breadcrumb,
  Button,
  Checkbox,
} from "@ama-pt/agora-design-system";
import React, { useEffect, useState } from "react";
import { documentation, identity } from "./constants";
import "./style.css";
import SideBar from "@/components/SideBarCatalogo";
import { redirect } from "next/navigation";

const Formulario = () => {
  const [components, setComponents]: any = useState([]);
  const [componentIds, setComponentIds]: any = useState([]);
  const [documentos, setDocumentos]: any = useState([]);
  const [documentosIds, setDocumentosIds]: any = useState([]);

  const addComponent = (component: any, id: any) => {
    if (id === "i") {
      const temp = components;
      temp.push(component);
      setComponents([...temp]);
      return;
    }
    const temp = documentos;
    temp.push(component);
    setDocumentos([...temp]);
    return;
  };

  const removeComponent = (id: any, idx: string) => {
    if (idx === "i") {
      const temp = componentIds.indexOf(id);
      const componentTemp = components.filter(
        (component, index) => index !== temp
      );
      setComponents([...componentTemp]);
      const tempIds = componentIds.filter((ids) => ids !== id);
      setComponentIds([...tempIds]);
    } else {
      const temp = documentosIds.indexOf(id);
      const documentsTemp = documentos.filter((docs, index) => index !== temp);
      setDocumentos([...documentsTemp]);
      const tempIds = documentosIds.filter((ids) => ids !== id);
      setDocumentosIds([...tempIds]);
    }
  };  

  return (
    <div className="flex formulario-catalogo">
      <div>
        <SideBar loggedIn={true} />
      </div>
      <div className="block">
        <div className="mx-32 my-16" style={{ minWidth: "90%" }}>
          <Breadcrumb
            className="mx-16"
            items={[
              {
                label: "Catálogo de Serviços",
                url: "/ListaServicos",
              },
              {
                label: "Novo Serviço",
                url: "#",
              },
            ]}
          />
        </div>
        <main className="bg-color-1 py-8 mx-8">
          <div className="flex mx-16">
            <strong>Formulário: </strong>
            <p className="ml-8">Nome do serviço</p>
          </div>
          <div className="flex mx-32 mt-8 pt-8">
            <strong>Dados</strong>
          </div>
          <div className="mx-16 my-8 flex">
            <section>
              <Accordion headingTitle="Identificação do Requerente">
                <div className="px-8">
                  {identity.map((info: any, index: number) => (
                    <div className="flex selection my-4 pl-8">
                      {info.name}
                      <Checkbox
                        id={`i-${index}`}
                        checked={info.selected}
                        onChange={(e) => {
                          info.selected = !info.selected;
                          e.target.checked
                            ? (addComponent(info.component, `i`),
                              setComponentIds([...componentIds, `i-${index}`]))
                            : removeComponent(`i-${index}`, "i");
                        }}
                      />
                    </div>
                  ))}
                </div>
              </Accordion>
              <Accordion headingTitle="Documentação" className="my-16">
                <div className="px-8">
                  {documentation.map((docs: any, index) => (
                    <div
                    className="flex selection my-4 pl-8"
                      onClick={() => {
                        docs.selected = !docs.selected;
                      }}
                    >
                      {docs.name}
                      <Checkbox
                        id={`d-${index}`}
                        checked={docs.selected}
                        onChange={(e) => {
                          docs.selected = !docs.selected;
                          e.target.checked
                            ? (addComponent(docs.component, "d"),
                              setDocumentosIds([
                                ...documentosIds,
                                `d-${index}`,
                              ]))
                            : removeComponent(`d-${index}`, "d");
                        }}
                      />
                    </div>
                  ))}
                </div>
              </Accordion>
            </section>
            <section className="mx16 px-16" style={{ minWidth: 700 }}>
              <h1>Pré-visualização</h1>
              <form action="">
                {components.length != 0 && (
                  <h3 className="my-8">Identificação do Requerente</h3>
                )}
                {components.map((component, index) => (
                  <div id={`${index}`} key={index} className="my-8">
                    {component}
                  </div>
                ))}
              </form>
              <form action="" className="mt-16">
                {documentos.length != 0 && (
                  <h3 className="my-8">Documentos</h3>
                )}
                {documentos.map((docs, index) => (
                  <div id={`${index}`} key={index} className="my-8">
                    {docs}
                  </div>
                ))}
              </form>
            </section>
          </div>
          <section
          id="btns-form"
          className=" flex my-32"
          style={{ justifyContent: "end", maxWidth:1100 }}
        >
          <Button
            children="Cancelar"
            appearance="link"
            onClick={() => redirect("/Catalogo/ListaServicos")}
          />
          <Button
            children="Guardar"
            onClick={() => redirect("/Catalogo/ListaServicos")}
          />
        </section> 
        </main>
      </div>
    </div>
  );
};

export default Formulario;
