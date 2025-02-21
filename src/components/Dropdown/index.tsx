import {
    Dropdown,
    DropdownOption,
    DropdownSection,
  } from "@ama-pt/agora-design-system";
  import React from "react";
  
  const DropDownComponent = ({ args }: any) => {
    const { show, setShow, optionsVisible, options } = args;
  
    const handleShow = () => {
      setShow(true);
    };
  
    const handleHide = () => {
      setShow(false);
    };
  
    return (
      <Dropdown
        optionsVisible={optionsVisible}
        onShow={handleShow}
        onHide={handleHide}
        id="my-dropdown"
      >
        <DropdownSection label="Fruits" name="fruits">
          {options?.map((opt: any, index: React.Key) => {
            <DropdownOption key={index} value={opt.value}>
              {opt.title}
            </DropdownOption>;
          })}
        </DropdownSection>
      </Dropdown>
    );
  };
  
  export default DropDownComponent;
  