import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { storage, auth, db } from "../../firebase";
import { ref as dbRef, push, set, get, ref } from "firebase/database";
import { ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";

const PaperSubmissionPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [conference, setConference] = useState(null);
  const [loading, setLoading] = useState(true);

  const [title, setTitle] = useState("");
  const [abstract, setAbstract] = useState("");
  const [file, setFile] = useState(null);

  const [agreementChecked, setAgreementChecked] = useState(false);
  const [showForm, setShowForm] = useState(false);

  // Load conference
  useEffect(() => {
    async function loadConference() {
      const snapshot = await get(ref(db, `conference/${id}`));

      if (snapshot.exists()) {
        setConference({ id, ...snapshot.val() });
      } else {
        setConference(null);
      }

      setLoading(false);
    }

    loadConference();
  }, [id]);

  // Submit paper
  const handleSubmit = async () => {
    if (!title || !abstract || !file || !agreementChecked) {
      alert("Please fill all fields and agree to the terms.");
      return;
    }

    const user = auth.currentUser;
    if (!user) {
      alert("You must be logged in to submit.");
      return;
    }

    try {
      // Upload PDF
      const filePath = `papers/${id}/${user.uid}/${file.name}`;
      const fileRef = storageRef(storage, filePath);

      await uploadBytes(fileRef, file);
      const fileUrl = await getDownloadURL(fileRef);

      // Save metadata
      const paperRef = push(dbRef(db, "paper"));

      await set(paperRef, {
        id: paperRef.key,
        conferenceId: id,
        userId: user.uid,
        title,
        abstract,
        fileUrl,
        submittedAt: Date.now(),
        status: "submitted",
      });

      alert("Paper submitted successfully!");
      navigate(`/conference-detail/${id}`);
    } catch (err) {
      console.error("SUBMISSION ERROR:", err);
      alert("Failed to submit paper.");
    }
  };
  const handleDownloadTemplate = async () => {
    try {
      const fileRef = storageRef(storage, "BCDE311 Ass2 2025 S2.pdf");
      const url = await getDownloadURL(fileRef);

      const link = document.createElement("a");
      link.href = url;
      link.download = "BCDE311 Ass2 2025 S2.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("DOWNLOAD ERROR:", error);
      alert("Failed to download template.");
    }
  };

  if (loading) {
    return <div style={styles.pageWrapper}>Loading conference...</div>;
  }

  if (!conference) {
    return (
      <div style={styles.pageWrapper}>
        <h1 style={styles.mainTitle}>Conference Not Found</h1>
        <button onClick={() => navigate('/conferences')} style={styles.backButton}>
          ← Back to Conferences
        </button>
      </div>
    );
  }

  return (
    <div style={styles.pageWrapper}>
      <div style={styles.backButtonContainer}>
        <button onClick={() => navigate(`/conference-detail/${id}`)} style={styles.backButton}>
          ← Back to Conference
        </button>
      </div>

      <div style={styles.titleRow}>
        <h1 style={styles.mainTitle}>{conference.title} - Paper Submission</h1>
      </div>

      <header style={styles.assignmentHeader}>
        <div style={styles.dateInfo}>
          <p><strong>Opened:</strong> {conference.startDate} {conference.startTime}</p>
          <p><strong>Deadline:</strong> {conference.endDate} {conference.endTime}</p>
        </div>

        <p style={styles.instructions}>
          Upload your paper as a PDF file.
        </p>
      </header>

      {!showForm && (
        <>
          <button style={styles.secondaryButton} onClick={handleDownloadTemplate}>
            Download template
          </button>

          <button style={styles.addSubmissionBtn} onClick={() => setShowForm(true)}>
            Add submission
          </button>

          <section style={styles.statusSection}>
            <h2 style={styles.sectionTitle}>Submission status</h2>
            <table style={styles.statusTable}>
              <tbody>
                <tr><td style={styles.tableLabel}>Submission status</td><td style={styles.tableValue}>-</td></tr>
                <tr><td style={styles.tableLabel}>Time remaining</td><td style={styles.tableValue}>-</td></tr>
                <tr><td style={styles.tableLabel}>Last modified</td><td style={styles.tableValue}>-</td></tr>
                <tr><td style={styles.tableLabel}>Comments</td><td style={styles.tableValue}>-</td></tr>
              </tbody>
            </table>
          </section>
        </>
      )}

      {showForm && (
        <main style={styles.contentContainer}>
          <section style={styles.submissionFormBlock}>
            <div style={styles.formGroup}>
              <label style={styles.boldLabel}>Title</label>
              <input
                type="text"
                style={styles.textInputSingleLine}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.boldLabel}>Abstract</label>
              <textarea
                style={styles.textInputMultiLine}
                value={abstract}
                onChange={(e) => setAbstract(e.target.value)}
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.boldLabel}>Upload File</label>
              <input
                type="file"
                accept="application/pdf"
                onChange={(e) => setFile(e.target.files[0])}
                style={{ marginTop: "10px" }}
              />
            </div>

            <div style={styles.agreementGroup}>
              <input
                type="checkbox"
                id="agreement"
                checked={agreementChecked}
                onChange={(e) => setAgreementChecked(e.target.checked)}
                style={styles.checkbox}
              />
              <label htmlFor="agreement" style={styles.agreementLabel}>
                Agreement to Terms & Conditions
              </label>
            </div>

            <div style={styles.buttonGroup}>
              <button style={styles.submitButton} onClick={handleSubmit}>
                Submit
              </button>
              <button style={styles.cancelButton} onClick={() => setShowForm(false)}>
                Cancel
              </button>
            </div>
          </section>
        </main>
      )}
    </div>
  );
};


const styles = {
  pageWrapper: {
    paddingLeft: '3rem',
    paddingRight: '3rem',
    paddingTop: '1rem',
    paddingBottom: '2rem',
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
  backButton: {
    backgroundColor: 'transparent',
    border: 'none',
    color: '#3182ce',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: '600',
    alignItems: 'flex-start',
  },
  backButtonContainer: {
    display: 'flex',
    alignItems: 'flex-start',
    paddingBottom: '1rem',
  },
  assignmentHeader: {
    width: '100%',
    boxSizing: 'border-box',
    marginBottom: '2rem',
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
  backButtonContainer: {
    paddingBottom: '40px',
    paddingTop: '40px',
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
  secondaryButton: {
    backgroundColor: '#EDF2F7',
    color: '#2D3748',
    padding: '12px 24px',
    border: 'none',
    borderRadius: '8px',
    fontWeight: 'bold',
    cursor: 'pointer',
    marginBottom: '12px',
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