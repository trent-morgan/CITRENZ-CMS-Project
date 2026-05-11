// import React, { useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { MOCK_CONFERENCES } from '../conference/ConferenceDetailPage';

// const PaperSubmissionEdit = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [agreementChecked, setAgreementChecked] = useState(false);

//   const conference = MOCK_CONFERENCES?.find(conf => conf.id === parseInt(id));

//   return (
//     <div style={styles.pageWrapper}>
//       <div style={styles.titleRow}>
//         <h1 style={styles.mainTitle}>
//            {conference ? `${conference.title} - Edit Submission` : "Edit Submission"}
//         </h1>
//       </div>

//       <main style={styles.contentContainer}>
//         <section style={styles.submissionFormBlock}>
//           <div style={styles.formGroup}>
//             <label style={styles.boldLabel}>Title</label>
//             <input type="text" style={styles.textInputSingleLine} placeholder="Enter the title of your paper" />
//           </div>

//           <div style={styles.formGroup}>
//             <label style={styles.boldLabel}>Abstract</label>
//             <textarea style={styles.textInputMultiLine} placeholder="Provide a short abstract..." />
//           </div>

//           <div style={styles.formGroup}>
//             <label style={styles.boldLabel}>File Submission</label>
//             <div style={styles.fileUploadBox}>
//               <div style={styles.iconWrapper}>
//                 <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                     <path d="M14 2H6C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V8L14 2Z" stroke="#3182CE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//                     <path d="M14 2V8H20" stroke="#3182CE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//                     <path d="M12 18V12M12 12L9 15M12 12L15 15" stroke="#3182CE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//                 </svg>
//               </div>
//             </div>
//           </div>

//           <div style={styles.agreementGroup}>
//             <input 
//               type="checkbox" 
//               id="agreement"
//               checked={agreementChecked}
//               onChange={(e) => setAgreementChecked(e.target.checked)}
//               style={styles.checkbox}
//             />
//             <label htmlFor="agreement" style={styles.agreementLabel}>Agreement to Terms & Conditions</label>
//           </div>

//           <div style={styles.buttonGroup}>
//               <button style={styles.submitButton}>Save changes</button>
//               <button style={styles.cancelButton} onClick={() => navigate(-1)}>Cancel</button>
//           </div>
//         </section>
//       </main>
//     </div>
//   );
// };

// const styles = {
//   pageWrapper: {
//     padding: '3rem',
//     backgroundColor: '#fff',
//     fontFamily: "'Inter', system-ui, sans-serif",
//     maxWidth: '1200px',
//     margin: '0 auto',
//     width: '100%',
//     boxSizing: 'border-box',
//   },
//   titleRow: { marginBottom: '30px' },
//   mainTitle: { fontSize: '34px', fontWeight: 'bold' },
//   contentContainer: {
//     width: '100%',
//     display: 'flex',
//     justifyContent: 'center',
//   },
//   submissionFormBlock: {
//     backgroundColor: '#E2E8F0',
//     borderRadius: '24px',
//     padding: '40px',
//     width: '100%',
//     maxWidth: '900px',
//     display: 'flex',
//     flexDirection: 'column',
//     gap: '20px',
//   },
//   formGroup: { display: 'flex', flexDirection: 'column', gap: '8px' },
//   boldLabel: { fontWeight: '700' },
//   textInputSingleLine: { padding: '12px', borderRadius: '8px', border: '1px solid #CBD5E0' },
//   textInputMultiLine: { padding: '12px', borderRadius: '8px', border: '1px solid #CBD5E0', minHeight: '150px', fontFamily: 'inherit' },
//   fileUploadBox: {
//     padding: '60px',
//     borderRadius: '8px',
//     backgroundColor: '#FFFFFF',
//     border: '2px dashed #CBD5E0',
//     display: 'flex',
//     justifyContent: 'center',
//   },
//   iconWrapper: { padding: '15px', borderRadius: '12px', backgroundColor: 'rgba(49, 130, 206, 0.1)' },
//   agreementGroup: { display: 'flex', alignItems: 'center', gap: '10px' },
//   agreementLabel: { fontSize: '14px', color: '#4A5568' },
//   buttonGroup: { display: 'flex', gap: '15px', marginTop: '20px' },
//   submitButton: { flex: 1, padding: '14px', borderRadius: '8px', backgroundColor: '#3182CE', color: '#fff', border: 'none', fontWeight: 'bold', cursor: 'pointer' },
//   cancelButton: { padding: '14px', borderRadius: '8px', backgroundColor: '#CBD5E0', border: 'none', cursor: 'pointer' },
//   checkbox: { cursor: 'pointer' }
// };

// export default PaperSubmissionEdit;