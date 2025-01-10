import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import RescheduleModal from "./RescheduleModal";

describe("RescheduleModal Component", () => {
  const onCloseMock = jest.fn();

  const setup = (isOpen = true) => {
    render(<RescheduleModal isOpen={isOpen} onClose={onCloseMock} />);
  };

  test("renders correctly when open", () => {
    setup();

    expect(screen.getByText("Reschedule Enrollment Date")).toBeInTheDocument();
    expect(screen.getByText("Select an advising date")).toBeInTheDocument();
    expect(screen.getByText("Reason for Rescheduling Date")).toBeInTheDocument();
    expect(screen.getByText("Confirm")).toBeInTheDocument();
    expect(screen.getByText("Cancel")).toBeInTheDocument();
  });

  test("does not render when isOpen is false", () => {
    setup(false);
    expect(screen.queryByText("Reschedule Enrollment Date")).not.toBeInTheDocument();
  });

  test("updates the selected date when a new date is chosen", () => {
    setup();

    const selectDropdown = screen.getByRole("combobox"); // Use "combobox" to locate the select element
    expect(selectDropdown.value).toBe("September 15");

    fireEvent.change(selectDropdown, { target: { value: "September 16" } });
    expect(selectDropdown.value).toBe("September 16");
  });

  test("updates the reason textarea when text is entered", () => {
    setup();

    const textarea = screen.getByRole("textbox"); // Use "textbox" to locate the textarea element
    expect(textarea.value).toBe("");

    fireEvent.change(textarea, { target: { value: "I have a scheduling conflict." } });
    expect(textarea.value).toBe("I have a scheduling conflict.");
  });

  test("displays an error message when present", () => {
    setup();

    const errorMessage = screen.getByText("Selected date is full, please choose another date.");
    expect(errorMessage).toBeInTheDocument();
  });

  test("calls onClose when 'Cancel' button is clicked", () => {
    setup();

    const cancelButton = screen.getByText("Cancel");
    fireEvent.click(cancelButton);

    expect(onCloseMock).toHaveBeenCalled();
  });

  test("calls onClose when 'Confirm' button is clicked", () => {
    setup();

    const confirmButton = screen.getByText("Confirm");
    fireEvent.click(confirmButton);

    expect(onCloseMock).toHaveBeenCalled();
  });
});
