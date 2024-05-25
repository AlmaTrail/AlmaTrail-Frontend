"use-client"
import React, { useEffect, useState } from "react";
import FormField from "./FormField";
import SectionHeading from "./SectionHeading";
import MyComponent from "./Dropdown";

interface YourInfoProps {
  yourInfo: {
    name: string;
    email: string;
    phone: string;
  };
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isEmpty: boolean;
}

interface FormField {
  id: number;
  name: keyof YourInfoProps['yourInfo'];
  label: string;
  placeholder: string;
}

const YourInfo: React.FC<YourInfoProps> = ({ yourInfo, onChange, isEmpty }) => {
  const [formFields, setFormFields] = useState<FormField[]>([
    {
      id: 1,
      name: "name",
      label: "Name",
      placeholder: "e.g John Doe",
    },
    {
      id: 2,
      name: "email",
      label: "Email Address",
      placeholder: "e.g john@gmail.com",
    },
    {
      id: 3,
      name: "phone",
      label: "Phone Number",
      placeholder: "e.g +1 234 567 890",
    },
  ]);

  return (
    <div>
      <SectionHeading
        title="Personal Info"
        desc="Please provide your name, email address, and phone number."
      />
      <form>
        <MyComponent />
        <div className="flex flex-col space-y-6 text-[14px]">
          {formFields.map((formField) => (
            <FormField
              onChange={onChange}
              key={formField.id}
              name={formField.name}
              label={formField.label}
              placeholder={formField.placeholder}
              value={yourInfo[formField.name]} // No type assertion needed now
              isEmpty={isEmpty}
            />
          ))}
        </div>
      </form>
    </div>
  );
};

export default YourInfo;
