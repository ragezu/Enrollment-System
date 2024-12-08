import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import styles from './StatusAndScheduling.module.css'

const RescheduleModal = ({ isOpen, onClose }) => {
  const [selectedDate, setSelectedDate] = useState('September 15');
  const [reason, setReason] = useState('');
  const [error, setError] = useState('Selected date is full, please choose another date.');

  if (!isOpen) return null;

  const handleConfirm = () => {
    // Handle form submission
    onClose();
  };

  return (
    <div className={styles.modal_overlay}>
      <div className={styles.modal_content}>
        <h2 className={styles.modal_title}>Reschedule Enrollment Date</h2>
        
        <div className={styles.modal_form}>
          <div className={styles.form_group}>
            <label>Select an advising date</label>
            <div className={styles.select_wrapper}>
              <select 
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className={styles.date_select}
              >
                <option value="September 15">September 15</option>
                <option value="September 16">September 16</option>
                <option value="September 17">September 17</option>
              </select>
              <ChevronDown className={styles.select_icon} />
            </div>
            {error && <span className={styles.error_message}>{error}</span>}
          </div>

          <div className={styles.form_group}>
            <label>Reason for Rescheduling Date</label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className={styles.reason_textarea}
              rows={4}
            />
          </div>

          <div className={styles.modal_actions}>
            <button className={`${styles.modal_button} ${styles.confirm}`} onClick={handleConfirm}>
              Confirm
            </button>
            <button className={`${styles.modal_button} ${styles.cancel}`} onClick={onClose}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RescheduleModal;