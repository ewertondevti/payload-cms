'use client'
import {
    Accordion,
    AccordionGroup,
    Icon,
    LinkWrapper,
  } from "@ama-pt/agora-design-system";
  import React from "react";
import { dummyDataTable, dummyDetalhePedido, dummyDocuments, dummyHeaders } from "./dummy";
import CustomTable from "@/components/Table";
import './style.css'
  
  const Pedidos = () => {
    return (
      <div className="container mx-auto my-32 pedidos" style={{ padding: 50 }}>
        <section
          className="flex space-between"
          style={{ justifyContent: "space-between", marginBottom: 80 }}
        >
          <div className="title">
            <h1>Registar Nascimento</h1>
            <p className="subtitle" style={{marginTop: 40}}>Pedido 47570832</p>
          </div>
  
          <div
            className="flex warning"    
            style={{
              justifyContent: "center",
              textAlign: "center",
              display: "flex",
              marginTop: -60,
            }}
          >
            <LinkWrapper variant="danger">
              <a href={""}>{"Desistir do pedido"}</a>
            </LinkWrapper>
            <Icon
              name={"agora-line-arrow-right-circle"}
              className="fill-danger-500"
              aria-hidden
              style={{ marginTop: 100, marginLeft: 10 }}
            />
          </div>
        </section>
  
        <section style={{ marginBottom: 160 }}>
          <div className="flex row">
            <div className="block transparent-block">
              <h5 className="subtitle no-bold">Número do Pedido</h5>
              <h4>47570832</h4>
            </div>
            <div className="block transparent-block">
              <h5 className="subtitle no-bold">Data</h5>
              <h4>30-01-2025 16:21</h4>
            </div>
            <div className="block transparent-block">
              <h5 className="subtitle no-bold">Estado</h5>
              <h4>Entregue</h4>
            </div>
          </div>
        </section>
  
        <section style={{ marginBottom: 160 }}>
          <div
            className="flex space-between"
            style={{ justifyContent: "space-between" }}
          >
            <div style={{ marginBottom: 60 }}>
              <h2>Detalhe do pedido</h2>
              <p className="subtitle">Consulte aqui o conteudo do pedido</p>
            </div>
  
            <div
              className="flex warning"
              style={{
                justifyContent: "center",
                textAlign: "center",
                display: "flex",
                marginTop: -60,
              }}
            >
              <LinkWrapper variant="primary">
                <a href={""}>{"Expandir"}</a>
              </LinkWrapper>
              <Icon
                name={"agora-line-arrow-right-circle"}
                className="fill-primary-500"
                aria-hidden
                style={{ marginTop: 80, marginLeft: 10 }}
              />
            </div>
          </div>
          <div>
            <AccordionGroup>
              {dummyDetalhePedido.map(({ title, description }, index): any => (
                <Accordion headingTitle={title} className="accordion" key={`pedidos-${index}`}>
                  <div className="p-32 bg-white">{description}</div>
                </Accordion>
              ))}
            </AccordionGroup>
          </div>
        </section>
  
        <section style={{ marginBottom: 160 }}>
          <div
            className="flex space-between"
            style={{ justifyContent: "space-between" }}
          >
            <div style={{ marginBottom: 40 }}>
              <h2>Documentos anexados</h2>
              <p className="subtitle">Consulte os documentos do pedido</p>
            </div>
          </div>
          <div className="grid-container">
              {dummyDocuments.map((file, index) => (
                <div key={index} className="flex" style={{
                  marginBottom: -30
                }}>
                  <Icon
                    name={"agora-line-document"}
                    className="fill-primary-500"
                    aria-hidden
                    style={{ marginTop: 35, marginRight: 20 }}
                  />
                  <LinkWrapper variant="primary">
                    <a href={file.documentPath}>{file.title}</a>
                  </LinkWrapper>
                </div>
              ))}
            </div>
        </section>
  
        <section>
          <div
            className="flex space-between"
            style={{ justifyContent: "space-between" }}
          >
            <div style={{ marginBottom: 60 }}>
              <h2>Outros do pedidos</h2>
              <p className="subtitle">Consulte aqui o conteudo do pedido</p>
            </div>
  
            <div
              className="flex warning"
              style={{
                justifyContent: "center",
                textAlign: "center",
                display: "flex",
                marginTop: -60,
              }}
            >
              <LinkWrapper variant="primary">
                <a href={""}>{"Ver todos os pedidos"}</a>
              </LinkWrapper>
              <Icon
                name={"agora-line-arrow-right-circle"}
                className="fill-primary-500"
                aria-hidden
                style={{ marginTop: 80, marginLeft: 10 }}
              />
            </div>
          </div>
          <div>
            <CustomTable args={dummyDataTable} headers={dummyHeaders}/>
          </div>
        </section>
      </div>
    );
  };
  
  export default Pedidos;
  