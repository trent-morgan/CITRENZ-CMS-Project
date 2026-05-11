import React, { useState } from 'react';
import { useParams } from 'react-router-dom'; // Added to handle the 'id' variable
// Assuming MOCK_CONFERENCES is a named export in your file
import { MOCK_CONFERENCES } from '../conference/ConferenceDetailPage'; 

const PaperSubmissionPage = () => {
  const { id } = useParams(); // Retrieves the ID from the URL path
  const [agreementChecked, setAgreementChecked] = useState(false);
  const [showForm, setShowForm] = useState(false);

  // Find the specific conference based on URL ID
  const conference = MOCK_CONFERENCES?.find(conf => conf.id === parseInt(id));

  return (
    <div style={styles.pageWrapper}>
      <div style={styles.titleRow}>
        <h1 style={styles.mainTitle}>
           {conference ? `${conference.title} - Submission` : "Assessment 2 Hi-Fi Prototype Documentation"}
        </h1>
      </div>

      <header style={styles.assignmentHeader}>
        <div style={styles.dateInfo}>
          <p><strong>Opened:</strong> Thursday, 16 March 2017, 9:10 AM</p>
          <p><strong>Deadline:</strong> Friday, 31 October 2025, 11:59 PM</p>
        </div>

        <p style={styles.instructions}>
          File containing Documentation of the Design, Iterations and Testing. 
          Submit your documentation as one unified document.
        </p>
      </header>

      {!showForm && (
        <>
            <button style={styles.addSubmissionBtn} onClick={() => setShowForm(true)}>
            Add submission
            </button>

            <section style={styles.statusSection}>
            <h2 style={styles.sectionTitle}>Submission status</h2>
            <table style={styles.statusTable}>
                <tbody>
                <tr>
                    <td style={styles.tableLabel}>Submission status</td>
                    <td style={styles.tableValue}>-</td>
                </tr>
                <tr>
                    <td style={styles.tableLabel}>Time remaining</td>
                    <td style={styles.tableValue}>-</td>
                </tr>
                <tr>
                    <td style={styles.tableLabel}>Last modified</td>
                    <td style={styles.tableValue}>-</td>
                </tr>
                <tr>
                    <td style={styles.tableLabel}>Comments</td>
                    <td style={styles.tableValue}>-</td>
                </tr>
                </tbody>
            </table>
            </section>
        </>
        )}
      {/* Actual Form Container */}
      {showForm && (
        <main style={styles.contentContainer}>
          <section style={styles.submissionFormBlock}>
            <div style={styles.formGroup}>
              <label style={styles.boldLabel}>Title</label>
              <input type="text" style={styles.textInputSingleLine} />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.boldLabel}>Abstract</label>
              <textarea style={styles.textInputMultiLine} />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.boldLabel}>Submission Box</label>
              <div style={styles.fileUploadBox}>
                <div style={styles.iconWrapper}>
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M14 2H6C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V8L14 2Z" stroke="#3182CE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M14 2V8H20" stroke="#3182CE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M12 18V12M12 12L9 15M12 12L15 15" stroke="#3182CE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </div>

            <div style={styles.agreementGroup}>
              <input 
                type="checkbox" 
                id="agreement"
                checked={agreementChecked}
                onChange={(e) => setAgreementChecked(e.target.checked)}
                style={styles.checkbox}
              />
              <label htmlFor="agreement" style={styles.agreementLabel}>Agreement to Terms & Conditions</label>
            </div>

            <div style={styles.buttonGroup}>
                <button style={styles.submitButton}>Submit</button>
                <button style={styles.cancelButton} onClick={() => setShowForm(false)}>Cancel</button>
            </div>
          </section>
        </main>
      )}
    </div>
  );
};

const styles = {
  pageWrapper: {
    padding: '3rem',
    backgroundColor: '#fff',
    color: '#333',
    fontFamily: "'Inter', system-ui, sans-serif",
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start', 
    textAlign: 'left',
    maxWidth: '1200px',
    margin: '0 auto',
    width: '100%',
    boxSizing: 'border-box',
  },
  assignmentHeader: {
    width: '100%',
    boxSizing: 'border-box',
    marginBottom: '30px',
    backgroundColor: '#f7fafc',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    textAlign: 'left',
    padding: '20px',
    borderRadius: '12px',
  },
  statusSection: {
    width: '100%',
    boxSizing: 'border-box',
    marginTop: '40px',
  },
  statusTable: {
    width: '100%',
    borderCollapse: 'collapse',
    border: '1px solid #dee2e6',
  },
  titleRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '15px',
  },
  mainTitle: {
    fontSize: '34px',
    fontWeight: 'bold',
    margin: 0,
  },
  dateInfo: {
    fontSize: '16px',
    lineHeight: '1.5',
    marginBottom: '20px',
  },
  instructions: {
    fontSize: '16px',
    marginBottom: '25px',
  },
  addSubmissionBtn: {
    backgroundColor: '#3182ce',
    color: 'white',
    padding: '12px 24px',
    border: 'none',
    borderRadius: '8px',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  sectionTitle: {
    fontSize: '24px',
    marginBottom: '20px',
  },
  tableLabel: {
    padding: '12px',
    backgroundColor: '#f8f9fa',
    fontWeight: 'bold',
    width: '200px',
    borderBottom: '1px solid #dee2e6',
  },
  tableValue: {
    padding: '12px',
    borderBottom: '1px solid #dee2e6',
  },
  contentContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
  submissionFormBlock: {
    backgroundColor: '#E2E8F0',
    borderRadius: '24px',
    padding: '40px',
    width: '100%',
    maxWidth: '900px',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  formGroup: { display: 'flex', flexDirection: 'column', gap: '8px' },
  boldLabel: { fontWeight: '700' },
  textInputSingleLine: { padding: '12px', borderRadius: '8px', border: '1px solid #CBD5E0' },
  textInputMultiLine: { padding: '12px', borderRadius: '8px', border: '1px solid #CBD5E0', minHeight: '100px', fontFamily: 'inherit' },
  fileUploadBox: {
    padding: '30px',
    borderRadius: '8px',
    backgroundColor: '#FFFFFF',
    border: '2px dashed #CBD5E0',
    display: 'flex',
    justifyContent: 'center',
  },
  iconWrapper: { padding: '15px', borderRadius: '12px', backgroundColor: 'rgba(49, 130, 206, 0.1)' },
  agreementGroup: { display: 'flex', alignItems: 'center', gap: '10px' },
  agreementLabel: { fontSize: '14px', color: '#4A5568' },
  buttonGroup: { display: 'flex', gap: '10px', marginTop: '10px' },
  submitButton: { flex: 1, padding: '14px', borderRadius: '8px', backgroundColor: '#3182CE', color: '#fff', border: 'none', fontWeight: 'bold', cursor: 'pointer' },
  cancelButton: { padding: '14px', borderRadius: '8px', backgroundColor: '#CBD5E0', border: 'none', cursor: 'pointer' },
  checkbox: { cursor: 'pointer' }
};

export default PaperSubmissionPage;