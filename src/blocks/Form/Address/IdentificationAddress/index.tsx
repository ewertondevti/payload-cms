import React, { ChangeEvent, useState } from "react";
import { SelectWithApi } from "../../SelectWithAPI";
import { TextBox } from "../../TextBox";
import { Search } from "../../Search";
import api from "@/utilities/api";

export interface AddressProps {
 name?: string;
}

export const IdentificationAddress: React.FC<AddressProps> = ({ name }) => {
 const [selectedCountry, setSelectedCountry] = useState<string>("Portugal");

 return (
  <div className="flex flex-wrap gap-32 w-full">
   <div className="w-full">
    <SelectWithApi
     id={"cvtResidencia"}
     name={"cvtResidencia"}
     defaultValue="Portugal"
     type="text"
     label="Residência"
     apidomain={api.COUNTRIES}
     placeholder="Selecione uma opção"
     searchable
     hideSectionNames
     searchInputPlaceholder="Pesquisar país"
     dropdownAriaLabel="Lista de países"
     searchNoResultsText="Não foram encontrados resultados."
     onChange={setSelectedCountry}
     width={50}
    />
   </div>
   {selectedCountry === "Portugal" ? (
    <>
     <Search
      name={"cvtCodPostal"}
      label="Código Postal"
      placeholder="0000-000"
      required
      pattern={{
       value: /^(?:\d{4}|\d{4}-\d{3})$/,
       message:
        '"Código Postal" tem que ter no mínimo 4 caracteres ou 4+3 caracteres',
      }}
      type="number"
      width={50}
      maxLength={8}
      format={(value: string) => {
       if (/^\d{4}-$/.test(value)) return value; // Permitir escrita explícita do hífen
       const digitsOnly = value.replace(/[^\d]+/g, "");
       if (digitsOnly.length > 4) {
        return digitsOnly.slice(0, 4) + "-" + digitsOnly.slice(4);
       } else {
        return digitsOnly;
       }
      }}
     />

     <TextBox
      name={"cvtLocalidade"}
      label="Localidade"
      placeholder="Indique a localidade"
      required
      width={50}
     />

     <div className="w-full">
      <TextBox
       name={"cvtMorada"}
       label="Morada"
       placeholder="Nome de rua ou avenida"
       required
       width={100}
      />
     </div>
     <TextBox
      name={"cvtNumero-lote"}
      label="Número / Lote"
      placeholder="Indique o número ou lote"
      width={33}
      required
     />
     <TextBox
      name={"cvtAndar"}
      label="Andar"
      placeholder="Indique o andar"
      width={33}
     />
     <TextBox
      name={"cvtPorta"}
      label="Porta"
      placeholder="Indique o nº, letra ou lado"
      width={33}
     />
    </>
   ) : (
    <TextBox
     name={"cvtEstrangeira"}
     label="Morada"
     placeholder="Indique a morada"
     required
     width={100}
    />
   )}
  </div>
 );
};
