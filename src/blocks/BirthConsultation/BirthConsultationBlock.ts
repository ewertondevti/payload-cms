import { Block } from "payload";

export const BirthconsultationBlock: Block = {
 slug: 'birthconsultation',
 labels: {
  singular: 'Consulta de certidão de nascimento',
  plural: 'Consulta de certidão de nascimento',
 },
 fields: [
  {
   name: 'accessCode',
   label: 'Código de Acesso',
   type: 'group',
   fields: [
    {
     name: 'placeholder',
     label: 'Placeholder do código de acesso',
     type: 'text',
     defaultValue: '000000',
     required: true,
    },
    {
     name: 'label',
     label: 'Label do código de acesso',
     type: 'text',
     defaultValue: 'Insira o código de acesso',
     required: true,
    },
   ],
  },
  {
   name: 'captcha',
   label: 'Código de Verificação',
   type: 'group',
   fields: [
    {
     name: 'placeholder',
     label: 'Placeholder do CAPTCHA',
     type: 'text',
     defaultValue: 'Insira os caracteres',
     required: true,
    },
    {
     name: 'label',
     label: 'Label do CAPTCHA',
     type: 'text',
     defaultValue: 'Insira os caracteres que vê na imagem',
     required: true,
    },
    {
     name: 'imageSrc',
     label: 'Imagem do CAPTCHA',
     type: 'upload',
     relationTo: 'media',
     required: true,
    },
   ],
  },
 ],
};
