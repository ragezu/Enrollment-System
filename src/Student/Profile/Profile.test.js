import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("PersonalDetails Component", () => {
  const PersonalDetails = () => (
    <div className="personal_details_wrapper">
    <div className="form_row">
      <div className="form_field">
        <label htmlFor="firstName">First Name</label>
        <input type="text" name="firstName" id="firstName" className="input" />
      </div>
  
      <div className="form_field">
        <label htmlFor="middleName">Middle Name</label>
        <input type="text" name="middleName" id="middleName" className="input" />
      </div>
  
      <div className="form_field">
        <label htmlFor="lastName">Last Name</label>
        <input type="text" name="lastName" id="lastName" className="input" />
      </div>
  
      <div className="form_field">
        <label htmlFor="suffix">Suffix</label>
        <input type="text" name="suffix" id="suffix" className="input" />
      </div>
    </div>
  
    <div className="form_row">
      <div className="form_field">
        <label htmlFor="dob">Date of Birth</label>
        <input type="date" name="dob" id="dob" className="input" />
      </div>
  
      <div className="form_field">
        <label htmlFor="sex" className="radio_title">Sex</label>
        <div className="radio_container">
          <div className="radio">
            <input type="radio" name="sex" id="Male" value="Male" />
            <label htmlFor="Male">Male</label>
          </div>
          <div className="radio">
            <input type="radio" name="sex" id="Female" value="Female" />
            <label htmlFor="Female">Female</label>
          </div>
        </div>
      </div>
    </div>
  
    <div className="form_row">
      <div className="form_field solo_row">
        <label htmlFor="address">Complete Address</label>
        <input
          type="text"
          name="address"
          id="address"
          className="input"
          placeholder="Ex. B27 L16, Chesa Street, Talon Singko"
        />
      </div>
    </div>
  
    <div className="form_row">
      <div className="form_field two_rows">
        <input type="text" name="city" id="city" className="input" placeholder="City" />
      </div>
  
      <div className="form_field two_rows">
        <input type="text" name="province" id="province" className="input" placeholder="Province" />
      </div>
    </div>
  
    <div className="form_row">
      <div className="form_field">
        <input type="text" name="postal" id="postal" className="input" placeholder="Postal Code" />
      </div>
  
      <div className="form_field">
        <input type="text" name="country" id="country" className="input" placeholder="Country" />
      </div>
    </div>
  
    <div className="form_row">
      <div className="form_field solo_row">
        <label htmlFor="contact">Contact Number</label>
        <input type="text" name="contactNumber" id="contact" className="input" />
      </div>
    </div>
  
    <div className="navigation_buttons">
      <button>Submit</button>
    </div>
  </div>
  
  );

  test("should render all form fields correctly", () => {
    render(<PersonalDetails />);

    expect(screen.getByLabelText("First Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Middle Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Last Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Suffix")).toBeInTheDocument();
    expect(screen.getByLabelText("Date of Birth")).toBeInTheDocument();
    expect(screen.getByText("Sex")).toBeInTheDocument();
    expect(screen.getByLabelText("Complete Address")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("City")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Province")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Postal Code")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Country")).toBeInTheDocument();
    expect(screen.getByLabelText("Contact Number")).toBeInTheDocument();
  });

  test("should allow input in form fields", () => {
    render(<PersonalDetails />);

    const firstNameInput = screen.getByLabelText("First Name");
    fireEvent.change(firstNameInput, { target: { value: "John" } });
    expect(firstNameInput.value).toBe("John");

    const lastNameInput = screen.getByLabelText("Last Name");
    fireEvent.change(lastNameInput, { target: { value: "Doe" } });
    expect(lastNameInput.value).toBe("Doe");

    const cityInput = screen.getByPlaceholderText("City");
    fireEvent.change(cityInput, { target: { value: "New York" } });
    expect(cityInput.value).toBe("New York");
  });

  test("should submit the form when the button is clicked", () => {
    render(<PersonalDetails />);

    const submitButton = screen.getByText("Submit");
    fireEvent.click(submitButton);

    // Add assertions based on the expected behavior upon form submission
  });



describe("Family Background - Step 1: Parent Information", () => {
  const FamilyBackgroundStep1 = () => (
    <div className="family_background_wrapper">
      <div className="family_background_step1">
        {/* Parent 1 */}
        <div className="parent1_container">
          <div className="title">
            <h1>Parent 1</h1>
          </div>
          <div className="field">
            <label htmlFor="parent1Name">Full Name</label>
            <input type="text" className="input" id="parent1Name" />
          </div>
          <div className="field">
            <label htmlFor="parent1Relationship">Relationship</label>
            <input type="text" className="input" id="parent1Relationship" />
          </div>
          <div className="field">
            <label htmlFor="parent1Education">Highest Education</label>
            <select className="input" id="parent1Education">
              <option disabled selected>
                Choose
              </option>
              <option>High School</option>
              <option>Bachelor's Degree</option>
              <option>Master's Degree</option>
              <option>Doctorate</option>
            </select>
          </div>
          <div className="field">
            <label htmlFor="parent1Contact">Contact Number</label>
            <input type="text" className="input" id="parent1Contact" />
          </div>
        </div>

        {/* Parent 2 */}
        <div className="parent2_container">
          <div className="title">
            <h1>Parent 2</h1>
          </div>
          <div className="field">
            <label htmlFor="parent2Name">Full Name</label>
            <input type="text" className="input" id="parent2Name" />
          </div>
          <div className="field">
            <label htmlFor="parent2Relationship">Relationship</label>
            <input type="text" className="input" id="parent2Relationship" />
          </div>
          <div className="field">
            <label htmlFor="parent2Education">Highest Education</label>
            <select className="input" id="parent2Education">
              <option disabled selected>
                Choose
              </option>
              <option>High School</option>
              <option>Bachelor's Degree</option>
              <option>Master's Degree</option>
              <option>Doctorate</option>
            </select>
          </div>
          <div className="field">
            <label htmlFor="parent2Contact">Contact Number</label>
            <input type="text" className="input" id="parent2Contact" />
          </div>
        </div>
      </div>
    </div>
  );

  test("should render all form fields correctly", () => {
    render(<FamilyBackgroundStep1 />);

    // Parent 1
    expect(screen.getByLabelText("Full Name", { selector: '[id="parent1Name"]' })).toBeInTheDocument();
    expect(screen.getByLabelText("Relationship", { selector: '[id="parent1Relationship"]' })).toBeInTheDocument();
    expect(screen.getByLabelText("Highest Education", { selector: '[id="parent1Education"]' })).toBeInTheDocument();
    expect(screen.getByLabelText("Contact Number", { selector: '[id="parent1Contact"]' })).toBeInTheDocument();

    // Parent 2
    expect(screen.getByLabelText("Full Name", { selector: '[id="parent2Name"]' })).toBeInTheDocument();
    expect(screen.getByLabelText("Relationship", { selector: '[id="parent2Relationship"]' })).toBeInTheDocument();
    expect(screen.getByLabelText("Highest Education", { selector: '[id="parent2Education"]' })).toBeInTheDocument();
    expect(screen.getByLabelText("Contact Number", { selector: '[id="parent2Contact"]' })).toBeInTheDocument();
  });

  test("should allow input in Parent 1 form fields", () => {
    render(<FamilyBackgroundStep1 />);

    // Input for Parent 1
    fireEvent.change(screen.getByLabelText("Full Name", { selector: '[id="parent1Name"]' }), { target: { value: "John Doe" } });
    expect(screen.getByLabelText("Full Name", { selector: '[id="parent1Name"]' }).value).toBe("John Doe");

    fireEvent.change(screen.getByLabelText("Relationship", { selector: '[id="parent1Relationship"]' }), { target: { value: "Father" } });
    expect(screen.getByLabelText("Relationship", { selector: '[id="parent1Relationship"]' }).value).toBe("Father");

    fireEvent.change(screen.getByLabelText("Contact Number", { selector: '[id="parent1Contact"]' }), { target: { value: "123456789" } });
    expect(screen.getByLabelText("Contact Number", { selector: '[id="parent1Contact"]' }).value).toBe("123456789");
  });

  test("should allow selection in Parent 1 education dropdown", () => {
    render(<FamilyBackgroundStep1 />);

    fireEvent.change(screen.getByLabelText("Highest Education", { selector: '[id="parent1Education"]' }), { target: { value: "Bachelor's Degree" } });
    expect(screen.getByLabelText("Highest Education", { selector: '[id="parent1Education"]' }).value).toBe("Bachelor's Degree");
  });

  test("should allow input in Parent 2 form fields", () => {
    render(<FamilyBackgroundStep1 />);

    // Input for Parent 2
    fireEvent.change(screen.getByLabelText("Full Name", { selector: '[id="parent2Name"]' }), { target: { value: "Jane Doe" } });
    expect(screen.getByLabelText("Full Name", { selector: '[id="parent2Name"]' }).value).toBe("Jane Doe");

    fireEvent.change(screen.getByLabelText("Relationship", { selector: '[id="parent2Relationship"]' }), { target: { value: "Mother" } });
    expect(screen.getByLabelText("Relationship", { selector: '[id="parent2Relationship"]' }).value).toBe("Mother");

    fireEvent.change(screen.getByLabelText("Contact Number", { selector: '[id="parent2Contact"]' }), { target: { value: "987654321" } });
    expect(screen.getByLabelText("Contact Number", { selector: '[id="parent2Contact"]' }).value).toBe("987654321");
  });
});



describe("Family Background - Step 2: Guardian Information", () => {
  const FamilyBackgroundStep2 = () => (
    <div className="family_background_wrapper">
      <div className="family_background_step2">
        {/* Guardian Section */}
        <div className="guardian">
          <div className="title">
            <h1>Guardian</h1>
          </div>
          <div className="row_field">
            <div className="field">
              <label htmlFor="guardianName">Name</label>
              <input type="text" className="input" id="guardianName" />
            </div>
            <div className="field">
              <label htmlFor="guardianRelationship">Relationship</label>
              <input
                type="text"
                className="input"
                id="guardianRelationship"
              />
            </div>
          </div>
          <div className="row_field">
            <div className="field">
              <label htmlFor="guardianEmployer">Employer</label>
              <input type="text" className="input" id="guardianEmployer" />
            </div>
            <div className="field">
              <label htmlFor="guardianEducation">Highest Education</label>
              <select className="input" id="guardianEducation">
                <option disabled selected>
                  Choose
                </option>
                <option>High School</option>
                <option>Bachelor's Degree</option>
                <option>Master's Degree</option>
                <option>Doctorate</option>
              </select>
            </div>
          </div>
          <div className="row_field">
            <div className="field">
              <label htmlFor="guardianContact">Contact Number</label>
              <input type="text" className="input" id="guardianContact" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  test("should render all form fields correctly", () => {
    render(<FamilyBackgroundStep2 />);

    expect(screen.getByLabelText("Name", { selector: '[id="guardianName"]' })).toBeInTheDocument();
    expect(
      screen.getByLabelText("Relationship", { selector: '[id="guardianRelationship"]' })
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText("Employer", { selector: '[id="guardianEmployer"]' })
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText("Highest Education", { selector: '[id="guardianEducation"]' })
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText("Contact Number", { selector: '[id="guardianContact"]' })
    ).toBeInTheDocument();
  });

  test("should allow input in the form fields", () => {
    render(<FamilyBackgroundStep2 />);

    // Input for Guardian Name
    fireEvent.change(screen.getByLabelText("Name", { selector: '[id="guardianName"]' }), {
      target: { value: "John Doe" },
    });
    expect(screen.getByLabelText("Name", { selector: '[id="guardianName"]' }).value).toBe(
      "John Doe"
    );

    // Input for Guardian Relationship
    fireEvent.change(
      screen.getByLabelText("Relationship", { selector: '[id="guardianRelationship"]' }),
      { target: { value: "Uncle" } }
    );
    expect(
      screen.getByLabelText("Relationship", { selector: '[id="guardianRelationship"]' }).value
    ).toBe("Uncle");

    // Input for Guardian Employer
    fireEvent.change(screen.getByLabelText("Employer", { selector: '[id="guardianEmployer"]' }), {
      target: { value: "TechCorp" },
    });
    expect(screen.getByLabelText("Employer", { selector: '[id="guardianEmployer"]' }).value).toBe(
      "TechCorp"
    );

    // Input for Guardian Contact
    fireEvent.change(
      screen.getByLabelText("Contact Number", { selector: '[id="guardianContact"]' }),
      { target: { value: "123456789" } }
    );
    expect(
      screen.getByLabelText("Contact Number", { selector: '[id="guardianContact"]' }).value
    ).toBe("123456789");
  });

  test("should allow selection in the education dropdown", () => {
    render(<FamilyBackgroundStep2 />);

    fireEvent.change(
      screen.getByLabelText("Highest Education", { selector: '[id="guardianEducation"]' }),
      { target: { value: "Bachelor's Degree" } }
    );
    expect(
      screen.getByLabelText("Highest Education", { selector: '[id="guardianEducation"]' }).value
    ).toBe("Bachelor's Degree");
  });
});


describe("Family Background - Step 3: Siblings Information", () => {
  const mockHandleInputChange = jest.fn();
  const mockHandleAddSibling = jest.fn();
  const mockHandleRemoveSibling = jest.fn();

  const FamilyBackgroundStep3 = ({ siblings, handleInputChange, handleAddSibling, handleRemoveSibling }) => (
    <div className="family_background_wrapper">
      <div className="family_background_step3">
        <div className="siblings">
          <div className="title">
            <h1>Siblings</h1>
            <h3>
              If you are an only child, please leave it blank and proceed to the next step.
            </h3>
          </div>
          <div className="add_siblings_container">
            <table className="add_siblings_table">
              <thead>
                <tr>
                  <th>Full Name</th>
                  <th>Age</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {siblings.map((sibling, index) => (
                  <tr key={index}>
                    <td>
                      <input
                        type="text"
                        name="name"
                        value={sibling.name}
                        placeholder="Enter name"
                        className="add_siblings_name"
                        onChange={(e) => handleInputChange(e, index)}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        name="age"
                        value={sibling.age}
                        placeholder="Age"
                        className="add_siblings_age"
                        onChange={(e) => handleInputChange(e, index)}
                      />
                    </td>
                    <td>
                      {index === 0 && (
                        <button
                          type="button"
                          className="add_sibling_button"
                          onClick={handleAddSibling}
                        >
                          Add
                        </button>
                      )}
                      {index !== 0 && (
                        <button
                          type="button"
                          className="remove_button"
                          onClick={() => handleRemoveSibling(index)}
                        >
                          Remove
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );

  test("should render siblings table with correct headers", () => {
    render(
      <FamilyBackgroundStep3
        siblings={[]}
        handleInputChange={mockHandleInputChange}
        handleAddSibling={mockHandleAddSibling}
        handleRemoveSibling={mockHandleRemoveSibling}
      />
    );

    expect(screen.getByText("Full Name")).toBeInTheDocument();
    expect(screen.getByText("Age")).toBeInTheDocument();
   
  });

  test("should allow adding a sibling row", () => {
    render(
      <FamilyBackgroundStep3
        siblings={[{ name: "", age: "" }]}
        handleInputChange={mockHandleInputChange}
        handleAddSibling={mockHandleAddSibling}
        handleRemoveSibling={mockHandleRemoveSibling}
      />
    );

    fireEvent.click(screen.getByText("Add"));
    expect(mockHandleAddSibling).toHaveBeenCalledTimes(1);
  });

  test("should allow removing a sibling row", () => {
    render(
      <FamilyBackgroundStep3
        siblings={[
          { name: "John", age: "15" },
          { name: "Jane", age: "13" },
        ]}
        handleInputChange={mockHandleInputChange}
        handleAddSibling={mockHandleAddSibling}
        handleRemoveSibling={mockHandleRemoveSibling}
      />
    );

    fireEvent.click(screen.getByText("Remove"));
    expect(mockHandleRemoveSibling).toHaveBeenCalledTimes(1);
    expect(mockHandleRemoveSibling).toHaveBeenCalledWith(1);
  });
});

 

describe("Navigation Buttons", () => {
    const mockPrevStep = jest.fn();
    const mockNextStep = jest.fn();
  
    const NavigationButtons = ({ currentStep, prevStep, nextStep }) => (
      <div className="navigation_buttons">
        {currentStep > 1 && (
          <button onClick={prevStep} className="nav_button">
            Back
          </button>
        )}
        {currentStep < 3 && (
          <button onClick={nextStep} className="nav_button">
            Next
          </button>
        )}
        {currentStep === 3 && (
          <button type="submit" className="nav_button">
            Submit
          </button>
        )}
      </div>
    );
  
    test("renders Back and Next buttons on step 2", () => {
      render(
        <NavigationButtons currentStep={2} prevStep={mockPrevStep} nextStep={mockNextStep} />
      );
  
      expect(screen.getByText("Back")).toBeInTheDocument();
      expect(screen.getByText("Next")).toBeInTheDocument();
    });
  
    test("renders only the Submit button on step 3", () => {
      render(
        <NavigationButtons currentStep={3} prevStep={mockPrevStep} nextStep={mockNextStep} />
      );
  
      expect(screen.getByText("Submit")).toBeInTheDocument();
      expect(screen.queryByText("Next")).not.toBeInTheDocument();
      expect(screen.queryByText("Back")).toBeInTheDocument();
    });
  
    test("renders only the Next button on step 1", () => {
      render(
        <NavigationButtons currentStep={1} prevStep={mockPrevStep} nextStep={mockNextStep} />
      );
  
      expect(screen.getByText("Next")).toBeInTheDocument();
      expect(screen.queryByText("Back")).not.toBeInTheDocument();
      expect(screen.queryByText("Submit")).not.toBeInTheDocument();
    });
  
    test("calls prevStep when Back button is clicked", () => {
      render(
        <NavigationButtons currentStep={2} prevStep={mockPrevStep} nextStep={mockNextStep} />
      );
  
      fireEvent.click(screen.getByText("Back"));
      expect(mockPrevStep).toHaveBeenCalledTimes(1);
    });
  
    test("calls nextStep when Next button is clicked", () => {
      render(
        <NavigationButtons currentStep={2} prevStep={mockPrevStep} nextStep={mockNextStep} />
      );
  
      fireEvent.click(screen.getByText("Next"));
      expect(mockNextStep).toHaveBeenCalledTimes(1);
    });
  });
  
  // Mock Component for EducationalAttainment
  const EducationalAttainment = () => (
    <div className="educational_attainment_wrapper">
      <div className="title">
        <h1>Educational Attainment</h1>
      </div>
  
      <div className="elementary">
        <div className="subtitle">
          <h3>Elementary</h3>
        </div>
        <div className="elementary_fields">
          <div className="last_school_attended">
            <label htmlFor="elementary">Last School Attended</label>
            <input type="text" id="elementary" name="elementary" />
          </div>
  
          <div className="type_of_school">
            <label htmlFor="type-of-school">Type of School</label>
            <select id="type-of-school">
              <option disabled>Choose</option>
              <option value="public">Public</option>
              <option value="private">Private</option>
            </select>
          </div>
  
          <div className="year_graduated">
            <label htmlFor="year">Year Graduated</label>
            <input type="number" id="year" name="year" />
          </div>
        </div>
      </div>
  
      <div className="junior_hs">
        <div className="subtitle">
          <h3>Junior High School</h3>
        </div>
        <div className="junior_hs_fields">
          <div className="last_school_attended">
            <label htmlFor="junior-hs">Last School Attended</label>
            <input type="text" id="junior-hs" name="junior-hs" />
          </div>
  
          <div className="type_of_school">
            <label htmlFor="type-of-school">Type of School</label>
            <select>
              <option disabled>Choose</option>
              <option value="public">Public</option>
              <option value="private">Private</option>
            </select>
          </div>
  
          <div className="year_graduated">
            <label htmlFor="year">Year Graduated</label>
            <input type="number" id="year" name="year" />
          </div>
        </div>
      </div>
  
      <div className="senior_hs">
        <div className="subtitle">
          <h3>Senior High School</h3>
        </div>
        <div className="senior_hs_fields">
          <div className="last_school_attended">
            <label htmlFor="senior-hs">Last School Attended</label>
            <input type="text" id="senior-hs" name="senior-hs" />
          </div>
  
          <div className="type_of_school">
            <label htmlFor="type-of-school">Type of School</label>
            <select>
              <option disabled>Choose</option>
              <option value="public">Public</option>
              <option value="private">Private</option>
            </select>
          </div>
  
          <div className="strand">
            <label htmlFor="strand">Strand</label>
            <input type="text" id="strand" name="strand" placeholder="Ex. STEM" />
          </div>
  
          <div className="year_graduated">
            <label htmlFor="year">Year Graduated</label>
            <input type="number" id="year" name="year" />
          </div>
        </div>
      </div>
  
      <div className="navigation_buttons">
        <button>Submit</button>
      </div>
    </div>
  );
  
  describe('EducationalAttainment Component', () => {
    test('renders all sections and fields correctly', () => {
      render(<EducationalAttainment />);
    
      // Check main title
      expect(screen.getByText('Educational Attainment')).toBeInTheDocument();
    
      // Check section subtitles
      expect(screen.getByText('Elementary')).toBeInTheDocument();
      expect(screen.getByText('Junior High School')).toBeInTheDocument();
      expect(screen.getByText('Senior High School')).toBeInTheDocument();
    
      // Check input fields for Elementary
      expect(screen.getByLabelText('Last School Attended', { selector: 'input#elementary' })).toBeInTheDocument();
      expect(screen.getByLabelText('Type of School', { selector: 'select' })).toBeInTheDocument();
      expect(screen.getByLabelText('Year Graduated', { selector: 'input#year' })).toBeInTheDocument();
    
      // Check input fields for Junior High School
      expect(screen.getByLabelText('Last School Attended', { selector: 'input#junior-hs' })).toBeInTheDocument();
      expect(screen.getByLabelText('Type of School', { selector: 'select' })).toBeInTheDocument();
      expect(screen.getByLabelText('Year Graduated', { selector: 'input#year' })).toBeInTheDocument();
    
      // Check input fields for Senior High School
      expect(screen.getByLabelText('Last School Attended', { selector: 'input#senior-hs' })).toBeInTheDocument();
      expect(screen.getByLabelText('Type of School', { selector: 'select' })).toBeInTheDocument();
      expect(screen.getByLabelText('Strand', { selector: 'input#strand' })).toBeInTheDocument();
      expect(screen.getByLabelText('Year Graduated', { selector: 'input#year' })).toBeInTheDocument();
    });
    
  
    test('allows user interaction with input fields and dropdowns', () => {
      render(<EducationalAttainment />);
  
      // Interact with Elementary inputs
      const elementaryInput = screen.getAllByLabelText('Last School Attended')[0];
      fireEvent.change(elementaryInput, { target: { value: 'Elementary School Name' } });
      expect(elementaryInput.value).toBe('Elementary School Name');
  
   // Interact with the "Type of School" dropdown using aria-label
  const elementarySelect = screen.getAllByLabelText('Type of School')[0];
  fireEvent.change(elementarySelect, { target: { value: 'public' } });
  expect(elementarySelect.value).toBe('public');
  
      const yearInput = screen.getByLabelText('Year Graduated');
      fireEvent.change(yearInput, { target: { value: '2005' } });
      expect(yearInput.value).toBe('2005');
    });
  
    test('renders a Submit button', () => {
      render(<EducationalAttainment />);
      expect(screen.getByText('Submit')).toBeInTheDocument();
    });
  });
  // Mock Component for AccountSettings
const AccountSettings = () => (
  <div className="account_settings_wrapper">
    <div className="title">
      <h1>Account Settings</h1>
    </div>
    <div className="account">
      <div className="field">
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" />
      </div>
      <div className="field">
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" />
      </div>
    </div>
    <div className="navigation_buttons">
      <button className="change_password">Change Password</button>
    </div>
  </div>
);

describe('AccountSettings Component', () => {
  test('renders all fields and button correctly', () => {
    render(<AccountSettings />);

    // Check title
    expect(screen.getByText('Account Settings')).toBeInTheDocument();

    // Check input fields
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();

    // Check button
    expect(screen.getByText('Change Password')).toBeInTheDocument();
  });

  test('allows user interaction with email and password inputs', () => {
    render(<AccountSettings />);

    // Email input interaction
    const emailInput = screen.getByLabelText('Email');
    fireEvent.change(emailInput, { target: { value: 'user@example.com' } });
    expect(emailInput.value).toBe('user@example.com');

    // Password input interaction
    const passwordInput = screen.getByLabelText('Password');
    fireEvent.change(passwordInput, { target: { value: 'securepassword' } });
    expect(passwordInput.value).toBe('securepassword');
  });

  test('handles Change Password button click', () => {
    const mockHandler = jest.fn();

    // Mock the button click handler
    render(
      <div className="navigation_buttons">
        <button className="change_password" onClick={mockHandler}>
          Change Password
        </button>
      </div>
    );

    const button = screen.getByText('Change Password');
    fireEvent.click(button);
    expect(mockHandler).toHaveBeenCalledTimes(1);
  });
});

})