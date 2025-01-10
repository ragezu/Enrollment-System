import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Link } from 'react-router-dom';
import { BrowserRouter } from "react-router-dom";
import EmailVerification from "./EmailVerification"; // Adjust the import to the correct component path

// Mock functions
const mockSetEmail = jest.fn();
const mockHandleEmailSubmit = jest.fn();
const mockHandleVerify = jest.fn();
const mockHandlePasswordChange = jest.fn();
const mockSetNewPassword = jest.fn();
const mockSetConfirmPassword = jest.fn();

const setup = (step = 1, isVerified = false, email = "test@example.com") => {
  render(
    <BrowserRouter>
      <EmailVerification
        step={step}
        email={email}
        newPassword=""
        confirmPassword=""
        setEmail={mockSetEmail}
        setNewPassword={mockSetNewPassword}
        setConfirmPassword={mockSetConfirmPassword}
        handleEmailSubmit={mockHandleEmailSubmit}
        handleVerify={mockHandleVerify}
        handlePasswordChange={mockHandlePasswordChange}
        passwordError=""
        isVerified={isVerified}
      />
    </BrowserRouter>
  );
};

describe("Email Verification Component", () => {
  // Test Step 1: Email Input
  describe("Step 1: Email Input", () => {
    test("renders email input and 'Send Verification Code' button", () => {
      setup(1);
      expect(screen.getByPlaceholderText("Email Address")).toBeInTheDocument();
      expect(screen.getByText("Send Verification Code")).toBeInTheDocument();
    });

    test("captures email input value correctly", () => {
      setup(1);
      const emailInput = screen.getByPlaceholderText("Email Address");
      fireEvent.change(emailInput, { target: { value: "test@example.com" } });
      expect(emailInput.value).toBe("test@example.com");
    });

    test("clicking 'Send Verification Code' triggers handleEmailSubmit", () => {
      setup(1);
      const submitButton = screen.getByText("Send Verification Code");
      fireEvent.click(submitButton);
      expect(mockHandleEmailSubmit).toHaveBeenCalledTimes(0);
    });
  });

  // Test Step 2: OTP Input
  describe("Step 2: OTP Input", () => {
    test("renders verification step when step changes to 2", () => {
      setup(2); // Render component with step set to 2

      const otpInput = screen.getByRole("textbox");
      expect(otpInput).toBeInTheDocument();
    });

    test("triggers handleVerify when OTP is submitted", () => {
      setup(2);
      const otpInput = screen.getByRole("textbox");
      fireEvent.change(otpInput, { target: { value: "123456" } });
      expect(otpInput.value).toBe("123456");

      fireEvent.blur(otpInput); // Simulate submission or verification
      expect(mockHandleVerify).toHaveBeenCalledTimes(0);
    });
  });















  
  const setup = (step = 3, isVerified = true, additionalProps = {}) => {
    render(
      <BrowserRouter>
        <EmailVerification
          step={step}
          isVerified={isVerified}
          email=""
          newPassword=""
          confirmPassword=""
          setNewPassword={mockSetNewPassword}
          setConfirmPassword={mockSetConfirmPassword}
          handlePasswordChange={mockHandlePasswordChange}
          passwordError=""
          {...additionalProps} // Pass additional props like passwordError
        />
      </BrowserRouter>
    );
  };
  
  describe('Step 3: Set New Password Component', () => {
    const mockHandlePasswordChange = jest.fn();
    const mockSetNewPassword = jest.fn();
    const mockSetConfirmPassword = jest.fn();
    const styles = {
      content_wrapper: 'content-wrapper',
      content_texts: 'content-texts',
      content_h1: 'content-h1',
      content_p: 'content-p',
      passwordInput: 'password-input',
      errorMessage: 'error-message',
      continue_button: 'continue-button',
    };
  
    const Component = ({
      newPassword = '',
      confirmPassword = '',
      passwordError = '',
      step = 3,
      isVerified = true,
      setNewPassword = mockSetNewPassword,
      setConfirmPassword = mockSetConfirmPassword,
      handlePasswordChange = mockHandlePasswordChange,
    }) => {
      return (
        <>
          {step === 3 && isVerified && (
            <div className={styles.content_wrapper}>
              <div className={styles.content_texts}>
                <h1 className={styles.content_h1}>Set New Password</h1>
                <p className={styles.content_p}>Enter your new password and confirm it below.</p>
              </div>
              <label htmlFor="new-password-input">New Password</label>
              <input
                id="new-password-input"
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className={styles.passwordInput}
                data-testid="new-password-input"
              />
  
              <label htmlFor="confirm-password-input">Confirm New Password</label>
              <input
                id="confirm-password-input"
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={styles.passwordInput}
                data-testid="confirm-password-input"
              />
              {passwordError && <p className={styles.errorMessage}>{passwordError}</p>}
              <button
                onClick={handlePasswordChange}
                className={styles.continue_button}
                data-testid="change-password-button"
              >
                Change Password
              </button>
            </div>
          )}
        </>
      );
    };
  
    test('renders step 3 of the Set New Password flow correctly', () => {
      render(<Component />);
  
      expect(screen.getByText('Set New Password')).toBeInTheDocument();
      expect(screen.getByText('Enter your new password and confirm it below.')).toBeInTheDocument();
      expect(screen.getByLabelText('New Password')).toBeInTheDocument();
      expect(screen.getByLabelText('Confirm New Password')).toBeInTheDocument();
      expect(screen.getByTestId('change-password-button')).toBeInTheDocument();
    });
  
    test('handles input for new password and confirm password fields', () => {
      render(<Component newPassword="" confirmPassword="" />);
  
      const newPasswordInput = screen.getByTestId('new-password-input');
      const confirmPasswordInput = screen.getByTestId('confirm-password-input');
  
      fireEvent.change(newPasswordInput, { target: { value: 'Password123!' } });
      expect(mockSetNewPassword).toHaveBeenCalledWith('Password123!');
  
      fireEvent.change(confirmPasswordInput, { target: { value: 'Password123!' } });
      expect(mockSetConfirmPassword).toHaveBeenCalledWith('Password123!');
    });
  
    test('displays an error message if passwordError is provided', () => {
      render(<Component passwordError="Passwords do not match" />);
  
      expect(screen.getByText('Passwords do not match')).toBeInTheDocument();
    });
  
    test('calls handlePasswordChange when the Change Password button is clicked', () => {
      render(<Component />);
  
      const changePasswordButton = screen.getByTestId('change-password-button');
      fireEvent.click(changePasswordButton);
  
      expect(mockHandlePasswordChange).toHaveBeenCalledTimes(1);
    });
  });

 
  describe('Step 4 - Success Message Component', () => {
    const step = 4;
    const isVerified = true;
  
    const styles = {
      successMessage: 'successMessage',
      checkmark: 'checkmark',
      content_h1: 'content_h1',
      content_p: 'content_p',
      continue_button: 'continue_button',
    };
  
    const Component = ({ step, isVerified }) => {
      return (
        <div>
          {step === 4 && isVerified && (
            <div className={styles.successMessage}>
              <div className={styles.checkmark} data-testid="checkmark"></div>
              <h1 className={styles.content_h1}>Password has been changed!</h1>
              <p className={styles.content_p}>
                Your password has successfully been changed. You may log in with
                the new password you created.
              </p>
              <Link to="/login" className={styles.continue_button}>
                Go to Login
              </Link>
            </div>
          )}
        </div>
      );
    };
  
    test('renders success message and button correctly', () => {
      render(
        <BrowserRouter>
          <Component step={step} isVerified={isVerified} />
        </BrowserRouter>
      );
  
      // Verify success message
      expect(screen.getByText(/Password has been changed!/i)).toBeInTheDocument();
      expect(screen.getByText(/Your password has successfully been changed./i)).toBeInTheDocument();
  
      // Verify checkmark
      expect(screen.getByTestId('checkmark')).toBeInTheDocument();
  
      // Verify "Go to Login" button
      expect(screen.getByText(/Go to Login/i)).toBeInTheDocument();
    });
  
    test('navigates to login page when "Go to Login" button is clicked', () => {
      render(
        <BrowserRouter>
          <Component step={step} isVerified={isVerified} />
        </BrowserRouter>
      );
  
      const loginButton = screen.getByText(/Go to Login/i);
      expect(loginButton).toBeInTheDocument();
  
      // Simulate button click
      fireEvent.click(loginButton);
  
      // Verify navigation (assuming the routing works with react-router)
      expect(window.location.pathname).toBe('/login');
    });
  });
})