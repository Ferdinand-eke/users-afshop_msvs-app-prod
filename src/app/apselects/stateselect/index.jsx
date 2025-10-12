import React from "react";
import Select from "react-select";

const StateSelect = ({ value, onChange, states }) => {

  return (
    <div>
      <label style={{ fontSize: "12px", fontWeight: "800" }}>
        *State Origin
      </label>
      <Select
        placeholder="What state are you in?"
        isClearable
        options={states}
        value={value}
        onChange={(value) => onChange(value)}
        formatOptionLabel={(option) => (
          <div className="flex flex-row items-center gap-3">
         
            <div>
              {option?.name}
            </div>
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

export default StateSelect;
