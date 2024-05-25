"use-client"
import React, { useEffect, useState, ChangeEvent } from "react";

interface FormFieldProps {
  name: string;
  label: string;
  placeholder: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  value: string;
  isEmpty: boolean;
  type?: string;
}

const FormField: React.FC<FormFieldProps> = ({
  name,
  label,
  placeholder,
  onChange,
  value,
  isEmpty,
  type = 'text'
}) => {
  const [displayRequired, setDisplayRequired] = useState<string>("hidden");
  const [redBorder, setRedBorder] = useState<string>("border-[#d6d9e6]");

  useEffect(() => {
    if (isEmpty) {
      setDisplayRequired("block");
      setRedBorder("border-[#ed3548]");
    } else {
      setDisplayRequired("hidden");
      setRedBorder("border-[#d6d9e6]");
    }
  }, [isEmpty]);

  return (
    <div>
      <div className="flex justify-between items-center">
        <label>{label}</label>
        <p className={`${displayRequired} font-medium text-[14px] text-[#ed3548]`}>
          This field is required
        </p>
      </div>
      <div>
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`font-medium w-full mt-1 p-2 pl-3 rounded-lg border ${redBorder} text-[#02295a] text-[15px] hover:border-[#02295a] focus:border-white focus:ring-[#bfe2fd]`}
        />
      </div>
    </div>
  );
};

export default FormField;
