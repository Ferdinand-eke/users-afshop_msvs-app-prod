import React from "react";
import Select from "react-select";
import useCountries from "../../hooks/useCountries";
import useSellerCountries from "app/configs/data/server-calls/countries/useCountries";


const CountrySelect = ({ value, onChange }) => {
  // const { getAll } = useCountries();
  const { data: countries } = useSellerCountries();
  console.log("countries", countries);
  return (
    <div>
      <label style={{ fontSize: "12px", fontWeight: "800" }}>
        *Country Origin
      </label>
      <Select
        placeholder="Where on the globe are you?"
        isClearable
        options={countries?.data?.countries}
        value={value}
        onChange={(value) => onChange(value)}
        formatOptionLabel={(option) => (
          <div className="flex flex-row items-center gap-3">
            <image src={option?.flag} className="height-[10px] width-[14px]" />

            <div>{option?.name}</div>
          </div>
        )}
        theme={(theme) => ({
          ...theme,
          borderRadius: 6,
          colors: {
            ...theme.colors,
            primary: "black",
            primary25: "#ffe4e6",
          },
        })}
      />
    </div>
  );
};

export default CountrySelect;
