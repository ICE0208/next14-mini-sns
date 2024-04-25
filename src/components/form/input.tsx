import { HTMLInputTypeAttribute, InputHTMLAttributes } from "react";

interface InputWithLabelProps {
  labelText: string;
  name: string;
}

export default function InputWithLabel({
  labelText,
  name,
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
    </label>
  );
}
