import React from "react";
import { renderCheckBoxList } from "../test/utils";
import Usage, { CheckBoxList } from "../components/checkboxlist";

test("renders a CheckBoxList component", () => {
  const handleToggle = jest.fn();
  const { checkboxes, toggle } = renderCheckBoxList(
    <CheckBoxList
      source={["Checkbox 1", "Checkbox 2", "Checkbox 3"]}
      onToggle={handleToggle}
    >
      {({ createCheckboxes }) => createCheckboxes()}
    </CheckBoxList>
  );
  expect(checkboxes[0]).not.toBeChecked();
  toggle(checkboxes[0]);
  expect(checkboxes[0]).toBeChecked();
  expect(handleToggle).toHaveBeenCalledTimes(1);
});

test("renders a CheckBoxList with Select All component", () => {
  const handleToggle = jest.fn();
  const {
    checkboxes,
    toggle,
    selectAllCheckbox,
    selectAllButton
  } = renderCheckBoxList(<Usage onToggle={handleToggle} />);
  expect(checkboxes[0]).not.toBeChecked();
  toggle(checkboxes[0]);
  expect(checkboxes[0]).toBeChecked();
  expect(handleToggle).toHaveBeenCalledTimes(1);

  toggle(selectAllCheckbox);
  checkboxes.forEach(cb => expect(cb).toBeChecked());
  toggle(selectAllCheckbox);
  checkboxes.forEach(cb => expect(cb).not.toBeChecked());

  toggle(selectAllButton);
  checkboxes.forEach(cb => expect(cb).toBeChecked());
  toggle(selectAllButton);
  checkboxes.forEach(cb => expect(cb).not.toBeChecked());
});
