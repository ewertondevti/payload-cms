import { Block } from "payload";


export const DeathCertificateBlock: Block = {
 slug: "deathcertificate",
 labels: {
  singular: "Certidão de Óbito",
  plural: "Certidões de Óbito",
 },
 fields: [
  {
   name: "title",
   label: "Título da Seção",
   type: "text",
   defaultValue: "Certidão de Óbito",
   required: true,
  },
  {
   name: "subtitle",
   label: "Subtítulo da Seção",
   type: "text",
   defaultValue: "Registre as informações do falecimento.",
   required: false,
  },
  {
   name: "addressData",
   label: "Endereço",
   type: "group",
   fields: [
    {
     name: "country",
     label: "País",
     type: "select",
     options: [
      { label: "Portugal", value: "PT" },
      { label: "Brasil", value: "BR" },
      { label: "Espanha", value: "ES" },
     ],
     defaultValue: "PT",
     required: true,
    },
    {
     name: "postalCode",
     label: "Código Postal",
     type: "text",
     required: false,
    },
    {
     name: "city",
     label: "Localidade",
     type: "text",
     required: false,
    },
    {
     name: "street",
     label: "Morada",
     type: "text",
     required: false,
    },
    {
     name: "number",
     label: "Número / Lote",
     type: "text",
     required: false,
    },
    {
     name: "floor",
     label: "Andar",
     type: "text",
     required: false,
    },
    {
     name: "door",
     label: "Porta",
     type: "text",
     required: false,
    },
   ],
  },
 ],
};

export default DeathCertificateBlock;
