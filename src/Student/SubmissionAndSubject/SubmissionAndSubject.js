import React, { useState } from "react";
import styles from "./SubmissionAndSubject.module.css";

function SubmissionAndSubject() {
  const [step, setStep] = useState(1);

  const handleNext = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setStep((prevStep) => prevStep - 1);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}></div>

      <h1 className={styles.title}>Subjects and Submission</h1>

      <div className={styles.content}>
        {step === 1 && (
          <div className={styles.category}>
            <div className={styles.student_info_left}>
              <div className={styles.student_categorization}>
                <h2>Student Categorization</h2>
                <p className={styles.student_category_code}>
                  S1 - Regular students
                </p>
                <p className={styles.student_category_code}>
                  S2 - Incoming First Year Student
                </p>
                <p className={styles.student_category_code}>S3 - Irregulars</p>
                <p className={styles.student_category_code}>S4 - Shiftee</p>
                <p className={styles.student_category_code}>S5 - Returnee</p>
                <p className={styles.student_category_code}>S6 - Transferee</p>
              </div>

              <div className={styles.student_type}>
                <h2>Select Student Type</h2>
                <p className={styles.student_type_label}>
                  You may refer to the categories above.
                </p>
              

                <div className={styles.student_category}>
                  <div>
                    <input type="radio" id="S1" name="category" value="S1" />
                    <label className={styles.radio_label} htmlFor="S1">S1</label>
                  </div>
                  <div>
                    <input type="radio" id="S2" name="category" value="S2" />
                    <label className={styles.radio_label} htmlFor="S2">S2</label>
                  </div>
                  <div>
                    <input type="radio" id="S3" name="category" value="S3" />
                    <label className={styles.radio_label} htmlFor="S3">S3</label>
                  </div>
                  <div>
                    <input type="radio" id="S4" name="category" value="S4" />
                    <label className={styles.radio_label} htmlFor="S4">S4</label>
                  </div>
                  <div>
                    <input type="radio" id="S5" name="category" value="S5" />
                    <label className={styles.radio_label} htmlFor="S5">S5</label>
                  </div>
                  <div>
                    <input type="radio" id="S6" name="category" value="S6" />
                    <label className={styles.radio_label} htmlFor="S6">S6</label>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.student_info_right}>
              <div className={styles.enrollment_data}>
                <div className={styles.field}>
                  <label className={styles.label}>Student ID</label>
                  <input
                    type="text"
                    id="studentId"
                    name="studentId"
                    placeholder=""
                    className={styles.input}
                  />
                </div>

                <div className={styles.field}>
                  <label className={styles.label}>Year Level</label>
                  <input
                    type="text"
                    id="yearlvl"
                    name="studentId"
                    placeholder=""
                    className={styles.input}
                  />
                </div>

                <div className={styles.field}>
                  <label className={styles.label}>Program</label>
                  <input
                    type="text"
                    id="program"
                    name="program"
                    placeholder=""
                    className={styles.input}
                  />
                </div>
              </div>
                <div className={styles.next_button}>
                  <button
                    type="button"
                    className={styles.submitbtn}
                    onClick={handleNext}
                  >
                    Next
                  </button>
                </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <h4>Select subjects</h4>
            <p>
              Minimum of 15 units. Please note that the selected subjects will
              be subjected to advising. It will change depending on schedule
              discrepancies and prerequisite subject conflicts.
            </p>

            <div className={styles.candunitsLabel}>
              <label htmlFor="classcode">Class Code</label>
            </div>

            <div className={styles.candunitsLabel2}>
              <label htmlFor="classcode">No. Of Units</label>
            </div>

            <div className={styles.candunits}>
              <select id="subject" name="subject" className={styles.dropdown}>
                <option value="">Select Subject</option>
                <option value="math101">Math 101</option>
                <option value="eng102">English 102</option>
                <option value="cs103">Computer Science 103</option>
                <option value="bio104">Biology 104</option>
                <option value="phys105">Physics 105</option>
              </select>
            </div>

            <div className={styles.candunits2}>
              <input
                type="text"
                id="units"
                name="noofunits"
                placeholder="3.00"
                className={styles.numunits}
              />
              <button type="button" className={styles.addbtn}>
                Add
              </button>
            </div>

            <div className={styles.btnforbns}>
              <button
                type="button"
                className={styles.backbtn}
                onClick={handleBack}
              >
                Back
              </button>
              <button
                type="button"
                className={styles.submitp2btn}
                onClick={handleNext}
              >
                Next
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <h4>Submit Required Documents</h4>
            <label htmlFor="">
              Submit a signed copy of the curriculum checklist.
            </label>
            <label htmlFor="">
              Submit the last semester’s certificate of registration.
            </label>

            <div>
              <button type="button" className={styles.uploadbtn}>
                Upload File
              </button>

              <button type="button" className={styles.uploadbtn2}>
                Upload File
              </button>
            </div>

            <div className={styles.scheduling}>
              <label htmlFor="">Select an advising date</label>

              <select id="sched" name="sched" className={styles.sched}>
                <option value="">Select Date</option>
                <option value="2024-12-01">2024-12-01</option>
                <option value="2024-12-02">2024-12-02</option>
                <option value="2024-12-03">2024-12-03</option>
              </select>
            </div>

            <div className={styles.backbtnsubbtn}>
              <button
                type="button"
                className={styles.backbtn}
                onClick={handleBack}
              >
                Back
              </button>
              <button type="button" className={styles.submitp3btn}>
                Submit
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default SubmissionAndSubject;
