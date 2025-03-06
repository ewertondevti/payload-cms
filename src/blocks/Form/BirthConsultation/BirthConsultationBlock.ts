import { Block } from "payload";

export const BirthConsultationBlock: Block = {
 slug: "birthconsultation",
 labels: {
  singular: "Consulta de certidão de nascimento",
  plural: "Consulta de certidão de nascimento",
 },
 fields: [
  {
   name: "title",
   label: "Título da Seção",
   type: "text",
   defaultValue: "Consulta de Certidão",
   required: true,
  },
  {
   name: "subtitle",
   label: "Subtítulo da Seção",
   type: "text",
   defaultValue: "Aceda à certidão sempre atualizada.",
   required: false,
  },
  {
   name: "accessCodeTitle",
   label: "Código de Acesso",
   type: "text",
   defaultValue: "Código de acesso",
   required: true,
  },
  {
   name: "accessCode",
   label: "Código de Acesso",
   type: "group",
   fields: [
    {
     name: "label",
     label: "Label do código de acesso",
     type: "text",
     defaultValue: "Insira o código de acesso",
     required: true,
    },
    {
     name: "placeholder",
     label: "Placeholder do código de acesso",
     type: "text",
     defaultValue: "000000",
     required: true,
    }
   ],
  },
 ],
};
