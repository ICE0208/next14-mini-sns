import { HTMLInputTypeAttribute, InputHTMLAttributes } from "react";

interface InputWithLabelProps {
  labelText: string;
  name: string;
  errors?: string[];
}

export default function InputWithLabel({
  labelText,
  name,
  errors,
  type = "text",
  required = true,
}: InputWithLabelProps & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label>
      <span>{labelText}</span>
      <input
        className="border-2 border-black"
        name={name}
        type={type}
        required={required}
      />
      {errors && errors?.length > 0 && <span>{errors[0]}</span>}
    </label>
  );
}
