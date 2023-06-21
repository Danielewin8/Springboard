import React from "react";
import { render, fireEvent } from "@testing-library/react";
import TodoList from "./TodoList";

it("renders without crashing", function () {
    render(<TodoList />);
});

it("matches snapshot", function () {
    const { asFragment } = render(<TodoList />);
    expect(asFragment()).toMatchSnapshot();
});

it('can add a todo', () => {
    const { queryByText, getByLabelText } = render(<TodoList />);
    expect(queryByText('X')).not.toBeInTheDocument();
    expect(queryByText('Clean room')).not.toBeInTheDocument();
  
    const todo = getByLabelText("Add Todo");
    const button = queryByText('Add')
  
    fireEvent.change(todo, {target: {value: 'Clean Room'}});
    fireEvent.click(button);
  
    expect(queryByText('X')).toBeInTheDocument();
    expect(queryByText('Clean Room')).toBeInTheDocument();
})

it('can delete a todo', () => {
    const { queryByText, getByLabelText } = render(<TodoList />);
    expect(queryByText('X')).not.toBeInTheDocument();
    expect(queryByText('Clean room')).not.toBeInTheDocument();
  
    const todo = getByLabelText("Add Todo");
    const button = queryByText('Add')
  
    fireEvent.change(todo, {target: {value: 'Clean Room'}});
    fireEvent.click(button);
  
    expect(queryByText('X')).toBeInTheDocument();
    expect(queryByText('Clean Room')).toBeInTheDocument();

    const destroy = queryByText('X');
    fireEvent.click(destroy)

    expect(queryByText('X')).not.toBeInTheDocument();
    expect(queryByText('Clean room')).not.toBeInTheDocument();
})
