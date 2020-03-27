import React from "react";
import Checkbox from "./checkbox";

function CheckBoxList(props) {
  //console.log(props);
  const [checked, setChecked] = React.useState([]);

  const toggle = event => {
    const { name } = event.target;
    const currentIndex = checked.indexOf(name);
    const newChecked = [...checked];
    if (currentIndex === -1) {
      newChecked.push(name);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
    props.onToggle(newChecked);
    //console.log(newChecked);
  };

  const toggleAll = isSelected => {
    const newChecked = isSelected ? [...props.source] : [];
    //console.log("BEFORE::", isSelected, checked, newChecked);
    setChecked(newChecked);
  };

  const createCheckbox = option => (
    <Checkbox
      label={option}
      isSelected={checked.indexOf(option) !== -1}
      onCheckboxChange={toggle}
      key={option}
    />
  );

  const createCheckboxes = () => props.source.map(createCheckbox);

  const getStateAndHelpers = () => {
    //console.log("getStateAndHelpers");
    return {
      checked,
      toggleAll,
      createCheckboxes
    };
  };

  return props.children(getStateAndHelpers());
}

function Usage({ onToggle = (...args) => console.log("onToggle", ...args) }) {
  const [selectAll, setSelectAll] = React.useState(false);
  const data = ["Checkbox 1", "Checkbox 2", "Checkbox 3"];
  const onCheckToggle = checked => {
    setSelectAll(data.length === checked.length);
    onToggle(checked);
  };
  const onSelectAllToggle = toggleAllFn => {
    const isChecked = !selectAll;
    setSelectAll(isChecked);
    toggleAllFn(isChecked);
  };
  return (
    <CheckBoxList source={data} onToggle={onCheckToggle}>
      {({ toggleAll, createCheckboxes }) => (
        <div className="container">
          <Checkbox
            label="Select All"
            isSelected={selectAll}
            onCheckboxChange={() => onSelectAllToggle(toggleAll)}
            dataTestId="checkbox-selectAll"
          />
          <hr />
          {createCheckboxes()}
          <hr />
          <div>
            <button
              aria-label="custom-button"
              onClick={() => onSelectAllToggle(toggleAll)}
              data-testid="button-selectAll"
            >
              {selectAll ? "Uncheck All" : "Check All"}
            </button>
          </div>
        </div>
      )}
    </CheckBoxList>
  );
}

export { CheckBoxList, Usage as default };
