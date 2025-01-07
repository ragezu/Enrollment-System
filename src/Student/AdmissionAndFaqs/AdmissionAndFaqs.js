import React, { useState } from "react";
import styles from "./AdmissionAndFaqs.module.css";
import cs_logo from "../../assets/CSlogo.png";
import it_logo from "../../assets/ITlogo.png";

const AdmissionAndFaqs = () => {
  // State to track which FAQ is open
  const [openFaq, setOpenFaq] = useState(null);

  // Toggle FAQ visibility
  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className={styles.enrollment_container}>
      {/* Navbar */}
      <nav className={styles.navbar}>
        <div className={styles.navbar_left}>
          <img
            src={cs_logo}
            alt="BSCS Logo"
            className={styles.navbar_logo}
          />
          <img
            src={it_logo}
            alt="IT Logo"
            className={styles.navbar_logo}
          />
        </div>
      </nav>

      {/* Content */}
      <section className={styles.enrollment_content}>
        <h1>Admission Process</h1>

        <h2>
          Please read the process before proceeding to the next steps of
          enrollment. Students are categorized by the following:
        </h2>

        <h2>Students are categorized by the following:</h2>
        <ul>
          <li>
            <b>Regular Students (S1):</b> Those who are taking the regular load
            of subjects.
          </li>
          <li>
            <b>Incoming First-Year Students (S2):</b>
          </li>
          <li>
            <b>Irregular Students (S3):</b> Those not taking the expected load
            based on their year level.
          </li>
          <li>
            <b>Shiftees (S4):</b> Students who have shifted from other programs
            to IT/CS.
          </li>
          <li>
            <b>Returnees (S5):</b>
          </li>
          <li>
            <b>Transferees (S6):</b> Students who transferred from other
            universities.
          </li>
        </ul>

        <h2>Conditions for the classification of student types are outlined as follows:</h2>
        <ol>
          <li>A student who is a transferee and/or a regular student from other CvSU campuses shall be classified as S6</li>
          <li>The classification of S4 shall be applied exclusively to students residing in CvSU Bacoor who shift to the IT/CS program.</li>
          <li>A student shall be classified as S3 only if they are residing on campus and are not enrolled in the regular workload of subjects.</li>
          <li>Students will be automatically classified as S3 if their Certificate of Grades indicates a score of 4.00, 5.00, or contains the designations INC or DRP.</li>
          <li>Students that are planning to shift to other programs and/or transfer to other campuses shall not use this system.</li>
        </ol>
        <h2> Requirements For Regular Students (S1) and Irregular Students (S3),</h2>
        <ol>the following requirements should be submitted in the system for upon checking:</ol>
        <ol> <li>Scanned Copy of Curriculum Checklist signed by advisers last semester; and</li> <li>Last semester’s Certificate of Registration.</li></ol>
        <h2>For Transferee (S6):</h2>
        <ol> <li>Transcript of Records (TOR)</li></ol>
        <h2> Incoming First Year Students (S2)</h2><ol> will not submit any requirements on the system as it submissions are arranged by the registrar.</ol>
        <h2>Shiftees (S4) and Returnees (S5) </h2> <ol> will also not submit anything via online, but it is required to pick an advising schedule to submit all the requirements needed via face-to-face.
        After verification and checking by the advisers: S1 and S2 will be given an Enrollment Date, while S4, S5, and S6 will be given a chance to select an advising date for picking schedules, sections and subjects</ol>
        
        <h2>Steps of Enrollment</h2>
        <h3>For Regular Students (S1 and S2):</h3>
        <ol>
          <li>Submit the necessary documents through the system.</li>
          <li>Receive your enrollment date.</li>
          <li>On your enrollment date, pay fees and get your Certificate of Registration.</li>
        </ol>

        <h3>For Irregular Students (S3, S4, S5, and S6):</h3>
        <ol>
          <li>Submit the necessary scanned documents through the system.</li>
          <li>Select an advising date for the submission of requirements and the selection of subjects.</li>
          <li>Once completed, you will receive your enrollment date.</li>
          <li>On your enrollment date, pay the society fee and wait for the issuance of your Certificate of Registration.</li>
        </ol>


       
        {/* Example for FAQ */}
        <div className={styles.faq_box}>
          <div className={styles.faq_item} onClick={() => toggleFaq(0)}>
            <span className={styles.faq_symbol}>
              {openFaq === 0 ? "-" : "+"}
            </span>
            {openFaq !== 0 && (
              <p className={styles.faq_question}>
                How can I change my password?
              </p>
            )}
            {openFaq === 0 && (
              <p className={styles.faq_answer}>
                You can change your password by going to the "Profile" section
                and selecting "Change Password".
              </p>
            )}
          </div>
          <div className={styles.faq_item} onClick={() => toggleFaq(1)}>
            <span className={styles.faq_symbol}>
              {openFaq === 1 ? "-" : "+"}
            </span>
            {openFaq !== 1 && (
              <p className={styles.faq_question}>
                How and where can I pay matriculation and society fees?
              </p>
            )}
            {openFaq === 1 && (
              <p className={styles.faq_answer}>
                Matriculation fees are to be paid at the Registrar's Office,
                while society fees are to be settled with the society's
                designated officers on duty. Both fees must be paid on the
                enrollment date specified in the system.
              </p>
            )}
          </div>

          <div className={styles.faq_item} onClick={() => toggleFaq(2)}>
            <span className={styles.faq_symbol}>
              {openFaq === 2 ? "-" : "+"}
            </span>
            {openFaq !== 2 && (
              <p className={styles.faq_question}>
                Should I still use the system if I’m planning to shift to other
                programs outside DCS?
              </p>
            )}
            {openFaq === 2 && (
              <p className={styles.faq_answer}>
                However, before shifting, students must coordinate with the
                respective department chairpersons. If the department does not
                approve the shift, the student will either need to retain their
                current program (Computer Science or Information Technology) or
                consider transferring to another university.
              </p>
            )}
          </div>

          <div className={styles.faq_item} onClick={() => toggleFaq(3)}>
            <span className={styles.faq_symbol}>
              {openFaq === 3 ? "-" : "+"}
            </span>
            {openFaq !== 3 && (
              <p className={styles.faq_question}>
                Why can’t I select an advising date that I want?
              </p>
            )}
            {openFaq === 3 && (
              <p className={styles.faq_answer}>
                You may only select an advising date that is available in the
                system, as each day has a set quota. If a date is no longer
                selectable, it means the quota for that day has been reached,
                and you must choose from the remaining available dates.
              </p>
            )}
          </div>
        </div>

        <div className={styles.confirmation}>
          <input type="checkbox" id="confirmation" />
          <label htmlFor="confirmation">
            I have read and understand the enrollment process.
          </label>
        </div>
        <button className={styles.proceed_button}>Proceed</button>
      </section>
    </div>
  );
};

export default AdmissionAndFaqs;
