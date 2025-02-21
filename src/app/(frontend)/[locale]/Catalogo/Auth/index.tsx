"use client";
import { CardEmphasize, CardSingle } from "@ama-pt/agora-design-system";
import React, { useEffect } from "react";
import "./style.css";
import SideBar from "@/components/SideBarCatalogo";
import { redirect } from "next/navigation";


const CatalogAuth = () => {

  return (
    <div className="flex">
      <div>
        <SideBar />
      </div>
      <div className="catalogo">
        <section className="container">
          <div>
            <h1>Iniciar sessão</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris.
            </p>
          </div>
        </section>
        <section className="container my-64">
          <div className="grid xs:grid-cols-4 md:grid-cols-8 xl:grid-cols-12 gap-32">
            <div className="xs:col-span-4 md:col-span-8 xl:col-span-5">
              <CardEmphasize
                title="Cartão Funcionário da Justiça"
                description="Lorem ipsum dolor sit amet, 
                consectetur adipiscing elit, sed do eiusmod tempor 
                incididunt ut labore et dolore magna aliqua. Ut enim ad
                 minim veniam, quis nostrud exercitation ullamco laboris."
                mainButton={{
                  hasIcon: true,
                  trailingIcon: "agora-line-arrow-right-circle",
                  trailingIconHover: "agora-line-arrow-right-circle",
                  children: "Entrar com Authenticação gov",
                  onClick: () => {redirect('/Catalogo/ListaServicos')},
                }}
                icon={{
                  name: "/media/justica.png",
                  dimensions: "xl",
                }}
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default CatalogAuth