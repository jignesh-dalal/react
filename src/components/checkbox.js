import React from "react";

const noop = () => {};

export default function Checkbox({
  label,
  isSelected,
  onCheckboxChange,
  dataTestId = "toggle-input"
}) {
  return (
    <div className="">
      <label>
        <input
          type="checkbox"
          name={label}
          checked={isSelected}
          onChange={onCheckboxChange}
          onClick={noop}
          className="toggle-input"
          data-testid={dataTestId}
        />
        {label}
      </label>
    </div>
  );
}
