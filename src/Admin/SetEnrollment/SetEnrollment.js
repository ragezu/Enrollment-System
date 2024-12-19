import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./SetEnrollment.module.css";
import cs_logo from "../../assets/CSlogo.png";
import it_logo from "../../assets/ITlogo.png";
import close_icon from "../../assets/close-icon.png";

function SetEnrollment() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [currentStep, setCurrentStep] = useState(1);

  // Function to open the modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const nextStep = () => {
    setCurrentStep((prev) => (prev < 4 ? prev + 1 : prev));
  };

  const prevStep = () => {
    setCurrentStep((next) => (next > 1 ? next - 1 : next));
  };

  return (
    <div className={styles.container}>
      <div className={styles.shadow_container}>
        <div className={styles.container_wrapper}>
          <div className={styles.logo_container}>
            <img
              src={cs_logo}
              alt="CS logo"
              className={`${styles.logo} ${styles.cs_logo}`}
            />
            <img src={it_logo} alt="IT logo" className={styles.logo} />
          </div>

          <div className={styles.welcome_container}>
            <div className={styles.welcome_title_container}>
              <h1 className={styles.title}>Welcome, Name!</h1>
            </div>

            <div className={styles.welcome_subtitle_container}>
              <p className={styles.subtitle}>
                To start the enrollment, set an enrollment period by clicking
                the button below.
              </p>
              <p className={styles.subtitle}>
                Once set, you may adjust the Enrollment Period in the Dashboard
                Page.
              </p>
            </div>
          </div>
          <div className={styles.button_container}>
            <button className={styles.button} onClick={openModal}>
              set enrollment date
            </button>
            <button className={styles.button}>logout</button>
          </div>
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div
            className={styles.modal_overlay}
            onClick={closeModal}
            data-testid="modal"
            role="dialog"
            aria-labelledby="modal-title"
            aria-hidden={!isModalOpen}
          >
            <div
              className={styles.modal_content}
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
            >
              <div className={styles.modal_header}>
                <div className={styles.header_right}>
                  <p className={styles.modal_title}>
                    {currentStep === 4 ? "enrollment dates has successfully been set" : "set enrollment period"}
                  </p>
                  <p className={styles.modal_subtitle}>
                    {currentStep === 1
                      ? "Select a start date and an end date"
                      : currentStep === 2
                      ? "Regular Students: S1 and S2"
                      : currentStep === 3
                      ? "Irregular Students: S3, S4, S5, and S6"
                      : ""}
                  </p>
                </div>
                <div className={styles.header_left}>

                  {currentStep === 4 ? "" : (
                    <>

                  <button className={styles.close_button} onClick={closeModal}>
                    <img
                      src={close_icon}
                      className={styles.close_icon}
                      alt="close icon"
                    />
                  </button>
                    
                    </>
                  )}
                </div>
              </div>

              <div className={styles.modal_between}>
                {currentStep === 1 && (
                  <>
                    <div className={styles.form_group}>
                      <div className={styles.form_section}>
                        <label htmlFor="enrollment-period-start-date">
                          start date
                        </label>
                        <input
                          type="date"
                          name="enrollment-period-start-date"
                          id="enrollment-period-start-date"
                        />
                      </div>

                      <div className={styles.form_section}>
                        <label htmlFor="enrollment-period-end-date">
                          end date
                        </label>
                        <input
                          type="date"
                          name="enrollment-period-end-date"
                          id="enrollment-period-end-date"
                        />
                      </div>
                    </div>
                  </>
                )}

                {/* Step 2 */}
                {currentStep === 2 && (
                  <>
                    <div className={styles.form_group}>
                      <div className={styles.form_section}>
                        <label htmlFor="enrollment-period-start-date">
                          start date
                        </label>
                        <input
                          type="date"
                          name="enrollment-period-start-date"
                          id="enrollment-period-start-date"
                        />
                      </div>

                      <div className={styles.form_section}>
                        <label htmlFor="enrollment-period-end-date">
                          end date
                        </label>
                        <input
                          type="date"
                          name="enrollment-period-end-date"
                          id="enrollment-period-end-date"
                        />
                      </div>
                    </div>
                  </>
                )}

                {/* Step 3 */}
                {currentStep === 3 && (
                  <>
                    <div className={styles.form_group}>
                      <div className={styles.form_section}>
                        <label htmlFor="enrollment-period-start-date">
                          start date
                        </label>
                        <input
                          type="date"
                          name="enrollment-period-start-date"
                          id="enrollment-period-start-date"
                        />
                      </div>

                      <div className={styles.form_section}>
                        <label htmlFor="enrollment-period-end-date">
                          end date
                        </label>
                        <input
                          type="date"
                          name="enrollment-period-end-date"
                          id="enrollment-period-end-date"
                        />
                      </div>
                    </div>
                  </>
                )}

                {/* Step 4 */}
                {currentStep === 4 && <></>}
              </div>

              <div className={styles.modal_footer}>
                <div className={styles.button_container}>
                  {currentStep === 1 ? (
                    <>
                  <button className={styles.modal_button} onClick={nextStep}>
                    next
                  </button>
                    </>
                  ) :

                  currentStep === 2 ? (
                    <>
                      <button
                    className={`${styles.modal_button} ${styles.modal_back_button}`}
                    onClick={prevStep}
                  >
                    back
                  </button>
                  <button className={styles.modal_button} onClick={nextStep}>
                    next
                  </button>
                    </>
                  ) :

                  currentStep === 3 ? (
                    <>
                    
                    <button
                    className={`${styles.modal_button} ${styles.modal_back_button}`}
                    onClick={prevStep}
                  >
                    back
                  </button>
                  <button className={styles.modal_button} onClick={nextStep}>
                    submit
                  </button>

                    </>
                  ) :

                  <button className={`${styles.modal_button} ${styles.modal_go_to_dashboard_button}`}>
                    go to dashboard
                  </button>
                } 
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default SetEnrollment;
