import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { toHaveStyle } from "@testing-library/jest-dom";
import BoxList from "./BoxList";
import Box from "./Box";

it("renders without crashing", function () {
    render(<BoxList />);
});

it("matches snapshot", function () {
    const { asFragment } = render(<BoxList />);
    expect(asFragment()).toMatchSnapshot();
});

test('should check length of box array after adding box', () => {
  // Render the BoxList component
  const { getByLabelText, getByText, container } = render(<BoxList />);

  // Simulate entering values in the form
  const colorInput = getByLabelText('Color');
  const widthInput = getByLabelText('Width');
  const heightInput = getByLabelText('Height');
  const addButton = getByText('Add Box');

  fireEvent.change(colorInput, { target: { value: 'purple' } });
  fireEvent.change(widthInput, { target: { value: '100' } });
  fireEvent.change(heightInput, { target: { value: '100' } });

  // Get the initial boxes count
  const initialBoxesCount = container.querySelectorAll('.box-container > div').length;

  // Simulate submitting the form
  fireEvent.click(addButton);

  // Get the updated boxes count
  const updatedBoxesCount = container.querySelectorAll('.box-container > div').length;

  // Assert that the length has increased by 1
  expect(updatedBoxesCount).toBe(initialBoxesCount + 1);
});

test('should check length of box array after adding and removing a box', () => {
    // Render the BoxList component
    const { getByLabelText, getByText, container, getAllByRole } = render(<BoxList />);
  
    // Simulate entering values in the form
    const colorInput = getByLabelText('Color');
    const widthInput = getByLabelText('Width');
    const heightInput = getByLabelText('Height');
    const addButton = getByText('Add Box');
  
    fireEvent.change(colorInput, { target: { value: 'purple' } });
    fireEvent.change(widthInput, { target: { value: '100' } });
    fireEvent.change(heightInput, { target: { value: '100' } });
  
    // Get the initial boxes count
    const initialBoxesCount = container.querySelectorAll('.box-container > div').length;
  
    // Simulate submitting the form
    fireEvent.click(addButton);
  
    // Get the updated boxes count
    const updatedBoxesCount = container.querySelectorAll('.box-container > div').length;
  
    // Assert that the length has increased by 1
    expect(updatedBoxesCount).toBe(initialBoxesCount + 1);
  
    // Get all 'X' buttons and find the one corresponding to the newly added box
    const deleteButtons = getAllByRole('button', { name: 'X' });
    const deleteButton = deleteButtons[deleteButtons.length - 1];
  
    // Simulate removing the newly added box
    fireEvent.click(deleteButton);
  
    // Get the final boxes count after removal
    const finalBoxesCount = container.querySelectorAll('.box-container > div').length;
  
    // Assert that the length is back to the initial count
    expect(finalBoxesCount).toBe(initialBoxesCount);
  });
