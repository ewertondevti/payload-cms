import React from "react";
import { CardFrame, Icon, Scribbles } from "@ama-pt/agora-design-system";

const CardFrameGeneral = (props: any) => {
  const { title, description, link, linkText, icon = undefined } = props.props;

  const cardArgs: any = {
    label: title,
    headingLevel: "h2",
    mainAnchor: {
      children: linkText,
      href: link,
      target: "_blank",
      hasIcon: true
    },
   
  };
  return (
    <div
      className="container"
      style={{ maxWidth: "20%", height: 300, marginLeft: 20, textAlign: "center", justifyContent: "center" }}
    >
      <CardFrame {...cardArgs}>
        {icon && <Icon name={icon} aria-hidden dimensions="xl"/>}
        {description}
      </CardFrame>
    </div>
  );
};

export { CardFrameGeneral };
