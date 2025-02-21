import React, { Children } from "react";
import { CardCollection, Icon, Scribbles } from "@ama-pt/agora-design-system";
import "./style.css";

const CardGeneral = (props: any) => {
  const { link, title, subtitle }: any = props.props;

  const cardArgs: any = {
    title: title,
    subtitle: subtitle,
    headingLevel: "h2",
    mainAnchor: {
      children: "",
      href: link,
      target: "_blank",
      hasIcon: true,
      inline: true,
    },
  };

  return (
    <div className="FilledCard">
      <CardCollection {...cardArgs} />
    </div>
  );
};

export { CardGeneral };
