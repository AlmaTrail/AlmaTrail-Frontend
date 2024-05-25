"use-client"
import React, { useState } from 'react';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';

// Define the E164Number type
type E164Number = string & { __tag: 'E164Number' };

const Numberinp: React.FC = () => {
  // `value` will be the parsed phone number in E.164 format.
  // Example: "+12133734253".
  const [value, setValue] = useState<E164Number | undefined>();

  return (
    <PhoneInput
      defaultCountry="RU"
      placeholder="Enter phone number"
      value={value}
      onChange={(phone: string | undefined) => setValue(phone as E164Number | undefined)}
    />
  );
};

export default Numberinp;
