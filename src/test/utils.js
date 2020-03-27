import "@testing-library/jest-dom";
import { render, fireEvent } from "@testing-library/react";
import React from "react";
// import {
//   findAllInRenderedTree,
//   isCompositeComponentWithType
// } from "react-dom/test-utils";
// import Checkbox from "../components/checkbox";

// const findCheckboxInstances = rootInstance =>
//   findAllInRenderedTree(rootInstance, c =>
//     isCompositeComponentWithType(c, Checkbox),
//   )

function Root(props) {
  return props.children;
}
function renderCheckBoxList(ui) {
  let rootInstance;
  let rootRef = instance => (rootInstance = instance);
  const utils = render(<Root ref={rootRef}>{ui}</Root>);
  //const checkboxInstances = findCheckboxInstances(rootInstance);
  // validateSwitchInstance(switchInstance)
  const checkboxes = utils.getAllByTestId("toggle-input");
  let selectAllCheckbox, selectAllButton;
  try {
    selectAllCheckbox = utils.getByTestId("checkbox-selectAll");
    selectAllButton = utils.getByTestId("button-selectAll");
  } catch (error) {}

  return {
    toggle: elem => fireEvent.click(elem),
    checkboxes,
    selectAllCheckbox,
    selectAllButton,
    rootInstance,
    ...utils
  };
}

export * from "@testing-library/react";
export { render, renderCheckBoxList };
