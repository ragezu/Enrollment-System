import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import StatusAndScheduling from "./StatusAndScheduling";

jest.mock("../Header/Header", () => () => <div data-testid="header">Header</div>);

describe("StatusAndScheduling Component", () => {
  test("renders the Header component", () => {
    render(<StatusAndScheduling />);
    expect(screen.getByTestId("header")).toBeInTheDocument();
  });

  test("renders the main title", () => {
    render(<StatusAndScheduling />);
    expect(screen.getByText("Status and Scheduling")).toBeInTheDocument();
  });

  test("renders all steps in the progress tracker", () => {
    render(<StatusAndScheduling />);
    const steps = [
      "Submission of Necessary Credentials",
      "Advising and Face-to-Face Submission of Requirements",
      "Schedule for Enrollment",
      "Face-to-Face Enrollment",
      "Fully Enrolled",
    ];
    steps.forEach((step) => {
      expect(screen.getByText(step)).toBeInTheDocument();
    });
  });

  test("highlights the current step", () => {
    render(<StatusAndScheduling />);
    expect(screen.getByText("Step 2")).toBeInTheDocument();
  });

  test("renders the enrollment date", () => {
    render(<StatusAndScheduling />);
    expect(screen.getByText("September 20, 2024")).toBeInTheDocument();
  });

  test("renders the rescheduling feedback", () => {
    render(<StatusAndScheduling />);
    expect(screen.getByText("Rescheduling Feedback")).toBeInTheDocument();
    expect(screen.getByText("Princess Mae Binalagbag")).toBeInTheDocument();
    expect(screen.getByText("APPROVED")).toBeInTheDocument();
  });

  test("opens the RescheduleModal when 'Appeal for Reschedule' is clicked", () => {
    render(<StatusAndScheduling />);
    const button = screen.getByText("Appeal for Reschedule");
    fireEvent.click(button);

    expect(screen.getByText("Reschedule Enrollment Date")).toBeInTheDocument();
    expect(screen.getByText("Select an advising date")).toBeInTheDocument();
  });

  test("closes the RescheduleModal when 'Cancel' is clicked in the modal", () => {
    render(<StatusAndScheduling />);

    // Open the modal
    const button = screen.getByText("Appeal for Reschedule");
    fireEvent.click(button);

    // Close the modal
    const cancelButton = screen.getByText("Cancel");
    fireEvent.click(cancelButton);

    expect(screen.queryByText("Reschedule Enrollment Date")).not.toBeInTheDocument();
  });

  test("confirms the RescheduleModal when 'Confirm' is clicked", () => {
    render(<StatusAndScheduling />);

    // Open the modal
    const button = screen.getByText("Appeal for Reschedule");
    fireEvent.click(button);

    // Confirm in the modal
    const confirmButton = screen.getByText("Confirm");
    fireEvent.click(confirmButton);

    expect(screen.queryByText("Reschedule Enrollment Date")).not.toBeInTheDocument();
  });
});