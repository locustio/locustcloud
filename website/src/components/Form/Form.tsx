import { FormEvent, useCallback } from "react";
import { Box } from "@mui/material";

export type BaseInputData = Record<any, any>;

interface IForm<IInputData extends BaseInputData> {
  children: React.ReactNode;
  className?: string;
  onSubmit?: (inputData: IInputData) => void;
  onChange?: (formEvent: React.ChangeEvent<HTMLFormElement>) => void;
  action?: string;
  method?: string;
}

const FORM_INPUT_ELEMENTS = 'input, select, textarea:not([aria-hidden="true"])';

const getInputValue = (
  inputElement: HTMLInputElement | HTMLSelectElement,
  currentValue: string | undefined
) => {
  if (
    inputElement instanceof HTMLInputElement &&
    inputElement.getAttribute("data-type") === "number"
  ) {
    return Number(inputElement.value);
  }

  if (
    inputElement instanceof HTMLInputElement &&
    inputElement.type === "checkbox"
  ) {
    return inputElement.checked;
  }

  if (
    inputElement instanceof HTMLInputElement &&
    inputElement.type === "radio"
  ) {
    return inputElement.checked ? inputElement.value : currentValue;
  }

  if (inputElement instanceof HTMLSelectElement && inputElement.multiple) {
    return Array.from(inputElement.selectedOptions).map(
      (option) => option.value
    );
  }

  return inputElement.type === "text"
    ? inputElement.value.trim()
    : inputElement.value;
};

export default function Form<IInputData extends BaseInputData>({
  children,
  onSubmit,
  onChange,
}: IForm<IInputData>) {
  const formSubmitHandler = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const form = event.target as HTMLFormElement;
      const inputData: IInputData = [
        ...form.querySelectorAll<HTMLInputElement | HTMLSelectElement>(
          FORM_INPUT_ELEMENTS
        ),
      ].reduce(
        (inputData, inputElement) =>
          inputElement.name
            ? {
                ...inputData,
                [inputElement.name]: getInputValue(
                  inputElement,
                  inputData[inputElement.name] as string
                ),
              }
            : inputData,
        {} as IInputData
      );

      if (onSubmit) {
        onSubmit(inputData);
      }
    },
    [onSubmit]
  );

  return (
    <form onChange={onChange} onSubmit={formSubmitHandler}>
      <Box sx={{ display: "flex", flexDirection: "column", rowGap: 2 }}>
        {children}
      </Box>
    </form>
  );
}
