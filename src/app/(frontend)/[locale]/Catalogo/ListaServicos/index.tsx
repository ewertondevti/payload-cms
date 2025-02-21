'use client'
import { Breadcrumb, Icon, LinkWrapper } from "@ama-pt/agora-design-system";
import SideBar from "@/components/SideBarCatalogo";
import React from "react";
import "./style.css";
import { dummyDataTable, dummyHeaders } from "./dummy";
import CustomTable from "@/components/CustomTable/Component";


const ListaServico = () => {
  return (
    <div className="flex lista-servicos">
      <div>
        <SideBar loggedIn={true} />
      </div>
      <div className="mx-16 w-full">
        <section id="breadcrumb" className="flex rows mb-32">
          <Breadcrumb
            className=""
            items={[
              {
                label: "Catálogo de Serviços",
                url: "#",
              },
            ]}
          />
        </section>
        <section id="header" className="flex w-full mb-32 ">
          <div className="mt-8">
            <h2>Lista de Serviços</h2>
          </div>
          <div className="flex links">
            <span className="mx-8">
              <LinkWrapper>
                <a href="/Catalogo/Formulario" className="flex">
                  {" "}
                  <Icon name="agora-solid-plus-circle" className="mx-8" />{" "}
                  Adicionar novo serviço
                </a>
              </LinkWrapper>
            </span>
            <span>
              <LinkWrapper>
                <Icon name="agora-solid-hardware-settings"  className="mx-8" />
                <a href="#anchor-land">Editar estrutura base</a>
              </LinkWrapper>
            </span>
          </div>
        </section>
        <section className="custom-table">
          <CustomTable args={dummyDataTable} headers={dummyHeaders} />
        </section>
      </div>
    </div>
  );
};

export default ListaServico;
