declare module "react-input-mask" {
  import * as React from "react";

  export interface InputState {
    value: string;
    selection: { start: number; end: number };
  }

  export interface MaskOptions {
    mask: string | Array<string | RegExp>;
    maskChar: string;
    formatChars: { [key: string]: string };
    permanents: number[];
  }

  export interface InputMaskProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    mask: string | Array<string | RegExp>;
    maskChar?: string | null;
    formatChars?: { [key: string]: string };
    alwaysShowMask?: boolean;
    beforeMaskedValueChange?: (
      newState: InputState,
      oldState: InputState,
      userInput: string,
      maskOptions: MaskOptions
    ) => InputState;
    children?:
      | React.ReactNode
      | ((
          inputProps: React.InputHTMLAttributes<HTMLInputElement>
        ) => React.ReactNode);
  }

  export default class InputMask extends React.Component<InputMaskProps> {}
}
