import wrapInput, { WrappedProps } from "@/utilities/wrapInput";
import { InputSearch } from "@ama-pt/agora-design-system";
import { JSX } from "react";

export const Search = (props: WrappedProps & JSX.IntrinsicAttributes) => {
  const Component = wrapInput(InputSearch);
  return <Component inputProps={{}} {...props} />;
};
