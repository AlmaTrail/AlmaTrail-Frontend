import React, { useState, useEffect } from "react";
import { defaultPage3Props, IPage3, mainState } from "../../app/mentor_form/page";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  InputAdornment,
} from "@mui/material";
import countries from "../../data/country.json";

/*
export interface IPage3 {
  whatsapp: string; // input
  linkedin: string; // input
  twitter: string; // input
  mail: string; // input
  phone: string; // input + country code
}
*/

interface Page3Props {
  mainState: mainState;
  setMainState: (state: mainState) => void;
}

const Page3 = (props: Page3Props) => {
  const { mainState, setMainState } = props;
  
  // Initialize state with existing mainState if it has values to preserve data when navigating back/forth
  const [Page3state, setPage3state] = useState<IPage3>(
    mainState.page3.whatsapp || mainState.page3.linkedin ? mainState.page3 : defaultPage3Props
  );

  const selectedCountry = countries.find(c => c.code === mainState.page2.country);
  
  const initialWhatsapp = mainState.page3.whatsapp || "";
  let initDial = selectedCountry?.dialCode || "+1";
  let initNum = "";
  
  if (initialWhatsapp.includes(" ")) {
    const parts = initialWhatsapp.split(" ");
    initDial = parts[0];
    initNum = parts.slice(1).join(" ");
  } else if (initialWhatsapp) {
    initNum = initialWhatsapp;
  }

  const [dialCode, setDialCode] = useState(initDial);
  const [whatsappNum, setWhatsappNum] = useState(initNum);

  useEffect(() => {
    setMainState({ ...mainState, page3: Page3state });
  }, [Page3state]);

  useEffect(() => {
    if (selectedCountry?.dialCode) {
      setDialCode(selectedCountry.dialCode);
      setPage3state(prev => ({ ...prev, whatsapp: `${selectedCountry.dialCode} ${whatsappNum}`.trim() }));
    }
  }, [mainState.page2.country]);

  const handleWhatsappChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const num = e.target.value;
    setWhatsappNum(num);
    setPage3state({ ...Page3state, whatsapp: `${dialCode} ${num}`.trim() });
  };

  const handleDialCodeChange = (e: any) => {
    const code = e.target.value as string;
    setDialCode(code);
    setPage3state({ ...Page3state, whatsapp: `${code} ${whatsappNum}`.trim() });
  };

  return (
    <Stack spacing={2}>
      <TextField
        label="Whatsapp"
        value={whatsappNum}
        onChange={handleWhatsappChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Select
                value={dialCode}
                onChange={handleDialCodeChange}
                variant="standard"
                disableUnderline
                sx={{ mr: 1, minWidth: 60 }}
              >
                {countries.map((c) => (
                  <MenuItem key={c.code} value={c.dialCode}>
                    {c.code} ({c.dialCode})
                  </MenuItem>
                ))}
              </Select>
            </InputAdornment>
          ),
        }}
      />
      <TextField
        label="Linkedin"
        value={Page3state.linkedin}
        onChange={(e) =>
          setPage3state({ ...Page3state, linkedin: e.target.value })
        }
      />
      <TextField
        label="Twitter"
        value={Page3state.twitter}
        onChange={(e) =>
          setPage3state({ ...Page3state, twitter: e.target.value })
        }
      />
      <TextField
        label="Mail"
        value={Page3state.mail}
        onChange={(e) => setPage3state({ ...Page3state, mail: e.target.value })}
      />
      <Stack spacing={2}>
        <TextField
          label="Phone"
          value={Page3state.phone}
          onChange={(e) =>
            setPage3state({ ...Page3state, phone: e.target.value })
          }
        />
      </Stack>
    </Stack>
  );
};

export default Page3;
