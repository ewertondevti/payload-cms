import {
  Accordion,
  ButtonUploader,
  DropdownOption,
  DropdownSection,
  InputDate,
  InputNumber,
  InputSelect,
  InputText,
} from "@ama-pt/agora-design-system";
import React, { useId, useState } from "react";
const sections = [
  <DropdownSection
    key={`my-input-select-44`}
    label="Selecione o estado civil"
    name="fruits"
  >
    <DropdownOption key={`my-input-select-0`} selected value="banana">
      Solteiro(a)
    </DropdownOption>
    <DropdownOption key={`my-input-select-1`} value="apple">
      Casado(a)
    </DropdownOption>
    <DropdownOption key={`my-input-select-2`} value="peach">
      Divociado(a)
    </DropdownOption>
    <DropdownOption key={`my-input-select-3`} value="tomato">
      Viuvo(a)
    </DropdownOption>
  </DropdownSection>,
];

const storyArgs: any = {
  label: "Selecionar ficheiro...",
  selectedFilesLabel: " Selecionar Ficheiro",
  extensionsInstructions: "Formatos: .jpg / .pdf / .png",

  removeFileButtonLabel: "Eliminar ficheiro",
  replaceFileButtonLabel: "Substituir ficheiro",

  duplicatedFileErrorLabel: "Ficheiro Duplicado",
  maxCountExceededErrorLabel: "Apenas pode submeter 1 ficheiro",
};

const Args: any = {
  label: <strong>Data da deliberação*</strong>,
  calendarIconAriaLabel: "Open calendar picker overlay",
  previousYearAriaLabel: "Navigate previous year",
  previousMonthAriaLabel: "Navigate previous month",
  nextMonthAriaLabel: "Navigate next month",
  nextYearAriaLabel: "Navigate next year",

  todayDayAriaLabel: "Hoje",
  focusedDayAriaLabel: "focused",
  selectedDayAriaLabel: "Selecionado",

  todayLabel: "Hoje",
  cancelLabel: "Cancelar",
  okLabel: "OK",
  todayAriaLabel: "Navegar para Hoje",
  cancelAriaLabel: "Cancelar selecção",
  okAriaLabel: "Selecionar dia focado",

  dayInputPlaceholder: "dd",
  monthInputPlaceholder: "mm",
  yearInputPlaceholder: "yyyy",

  monthsLabels: {
    jan: "Janeiro",
    fev: "Fevereiro",
    mar: "Março",
    abr: "Abril",
    mai: "Maio",
    jun: "Junho",
    jul: "Julho",
    ago: "Augosto",
    set: "Setembro",
    out: "Outubro",
    nov: "Novembro",
    dec: "Dezembro",
  },

  weekdaysLabels: {
    dom: "Domingo",
    seg: "Segunda",
    ter: "Terça",
    qua: "Quarta",
    qui: "Quinta",
    sex: "Sexta",
    sab: "Sabado",
  },
};

export const identity: any = [
  {
    name: "Nome Completo",
    id: "name",
    selected: false,
    component: (
      <div id="name" className="w-full">
        <InputText label="Nome completo" placeholder="Indique o seu nome" />
        <div className="flex mt-16" style={{ justifyContent: "space-between" }}>
          <InputText
            label="Tipo de documento (Opcional)"
            placeholder="Indique o seu documento"
          />
          <InputText
            label="Número do documento (Opcional)"
            placeholder="Indique o número de identificação"
          />
        </div>
      </div>
    ),
  },
  /*  {
    name: "Identificação e Número",
    selected: false,
    id: "identification",
    component: <div id="identification">test</div>,
  }, */
  {
    name: "NIF",
    selected: false,
    id: "nif",
    component: (
      <div id="nif" className="w-full">
        <InputText
          type="number"
          label="NIF"
          placeholder="xxx xxx xxx"
          max={9}
        />
      </div>
    ),
  },
  {
    name: "NIPC",
    selected: false,
    component: (
      <div id="nif" className="w-full">
        <InputText
          type="number"
          label="NIPC"
          placeholder="xxx xxx xxx"
          max={9}
        />
      </div>
    ),
  },
  {
    name: "Morada",
    selected: false,
    component: (
      <div id="morada" className="w-full">
        <InputText label="Morada" placeholder="Ex: Rua, Avenida, Largo" />
        <div className="flex mt-8" style={{ justifyContent: "space-between" }}>
          <InputText label="Nº da habitação" placeholder="Ex: 45" />
          <InputText label="Andar" placeholder="Ex: RC/DRT" />
        </div>
        <div className="flex mt-8" style={{ justifyContent: "space-between" }}>
          <InputText label="Código Postal" placeholder="Ex: xxxx-yyy" />
          <InputText label="Localidade" placeholder="Ex: Lisboa" />
        </div>
      </div>
    ),
  },
  {
    name: "Estado civil",
    selected: false,
    component: <InputSelect label="Estado Civil">{sections}</InputSelect>,
  },
/*   {
    name: "Representação On/Off",
    selected: false,
    component: "<div>Representação On/Off</div>",
  },
  {
    name: "Representação P. Singular",
    selected: false,
    component: "<div>Representação P. Singular</div>",
  },
  {
    name: "Representação P. Coletiva",
    selected: false,
    component: "<div>Representação P. Coletiva</div>",
  }, */
];

export const documentation = [
  {
    name: "Escritura",
    selected: false,
    component: (
      <Accordion headingTitle="Escritura" className="my-16 custom-accordion">
        <div className="block my-32" style={{ justifyContent: "center" }}>
          <ButtonUploader {...storyArgs} />
          <div className="flex">
            <p style={{color: '#021C51'}}>
              Por favor, indique a data da deliberação da abertura da
              representação permanente.
            </p>
          </div>
          <div className="flex mt-32">
            <InputDate {...Args} />
          </div>
        </div>
      </Accordion>
    ),
  },
  {
    name: "Comprovativo X",
    selected: false,
    component: (
      <Accordion headingTitle="Comprovativo X" className="my-16 custom-accordion">
        <div className="block my-32" style={{ justifyContent: "center" }}>
          <ButtonUploader {...storyArgs} />
          <div className="flex">
            <p style={{color: '#021C51'}}>
              Por favor, indique a data da deliberação da abertura da
              representação permanente.
            </p>
          </div>
          <div className="flex mt-32">
            <InputDate {...Args} />
          </div>
        </div>
      </Accordion>
    ),
  },
  {
    name: "Ata X",
    selected: false,
    component: (
      <Accordion headingTitle="Ata X" className="my-16 custom-accordion">
        <div className="block my-32" style={{ justifyContent: "center" }}>
          <ButtonUploader {...storyArgs} />
          <div className="flex">
            <p style={{color: '#021C51'}}>
              Por favor, indique a data da deliberação da abertura da
              representação permanente.
            </p>
          </div>
          <div className="flex mt-32">
            <InputDate {...Args} />
          </div>
        </div>
      </Accordion>
    ),
  },
  {
    name: "Documento",
    selected: false,
    component: (
      <Accordion headingTitle="Documento" className="my-16 custom-accordion">
        <div className="block my-32" style={{ justifyContent: "center" }}>
          <ButtonUploader {...storyArgs} />
          <div className="flex">
            <p style={{color: '#021C51'}}>
              Por favor, indique a data da deliberação da abertura da
              representação permanente.
            </p>
          </div>
          <div className="flex mt-32">
            <InputDate {...Args} />
          </div>
        </div>
      </Accordion>
    ),
  },
  {
    name: "Outros",
    selected: false,
    component: (
      <Accordion headingTitle="Outros" className="my-16 custom-accordion">
        <div className="block my-32" style={{ justifyContent: "center" }}>
          <ButtonUploader {...storyArgs} />
          <div className="flex">
            <p style={{color: '#021C51'}}>
              Por favor, indique a data da deliberação da abertura da
              representação permanente.
            </p>
          </div>
          <div className="flex mt-32">
            <InputDate {...Args} />
          </div>
        </div>
      </Accordion>
    ),
  },
];
