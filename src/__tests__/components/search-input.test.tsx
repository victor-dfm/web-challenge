import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import SearchInput from "@/components/search-input/search-input";

describe("SearchInput Component", () => {
  it("renders the input field with the correct placeholder", () => {
    render(<SearchInput value="" onChange={() => {}} />);

    const inputElement = screen.getByPlaceholderText(
      "Search for a smartphone...",
    );
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveAttribute("type", "text");
  });

  it("calls onChange when text is entered", () => {
    const handleChange = jest.fn();
    render(<SearchInput value="" onChange={handleChange} />);

    const inputElement = screen.getByPlaceholderText(
      "Search for a smartphone...",
    );

    fireEvent.change(inputElement, { target: { value: "iPhone" } });

    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it("displays the correct value", () => {
    render(<SearchInput value="Samsung" onChange={() => {}} />);

    const inputElement = screen.getByDisplayValue("Samsung");
    expect(inputElement).toBeInTheDocument();
  });
});
