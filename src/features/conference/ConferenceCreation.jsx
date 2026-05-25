import React, { useState } from "react";
import { submitConference } from "./conferenceService";

const CreateConference = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
    status: "Open",
  });

  const [preview, setPreview] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePreview = (e) => {
    e.preventDefault();
    setPreview(true);
  };

  const handleCancel = () => {
    setPreview(false);
  };

  const handleSubmit = async () => {
    const user = JSON.parse(localStorage.getItem("currentUser"));

    const conferenceData = {
        ...form
    };

    try {
        const id = await submitConference(conferenceData, user);  // 🔥 FIXED
        alert("Conference submitted for admin review!");
        console.log("Conference ID:", id);
        setPreview(false);

        // navigate("/dashboard");
    } catch (err) {
        console.error(err);
        alert("Failed to submit conference");
    }
    };


  // ⭐ Smart date + time formatting
  const renderDateDisplay = () => {
    const { startDate, endDate, startTime, endTime } = form;

    if (!startDate) return "No date selected";

    // Same date → show one date
    if (startDate === endDate || !endDate) {
      return `${startDate}${startTime ? ` • ${startTime}` : ""}`;
    }

    // Different dates → show arrow
    return `${startDate}${startTime ? ` • ${startTime}` : ""} → ${endDate}${
      endTime ? ` • ${endTime}` : ""
    }`;
  };

  return (
    <div style={styles.pageWrapper}>
      <h1 style={styles.mainTitle}>Create a Conference</h1>
      <p className="info">Fill out the details below to create a new conference.</p>

      {/* ---------------- FORM MODE ---------------- */}
      {!preview && (
        <div style={styles.mainContainer}>
          <main style={styles.contentArea}>
            <label style={styles.label}>
              Conference Title <span style={styles.required}>*</span>
            </label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              style={styles.detailInput}
            />

            <label style={styles.label}>
              Description <span style={styles.required}>*</span>
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              style={styles.messageInput}
              rows="4"
            />

            <label style={styles.label}>
              Location <span style={styles.required}>*</span>
            </label>
            <input
              type="text"
              name="location"
              value={form.location}
              onChange={handleChange}
              style={styles.detailInput}
            />

            <label style={styles.label}>
              Start Date <span style={styles.required}>*</span>
            </label>
            <input
              type="date"
              name="startDate"
              value={form.startDate}
              onChange={handleChange}
              style={styles.detailInput}
            />

            <label style={styles.label}>Start Time</label>
            <input
              type="time"
              name="startTime"
              value={form.startTime}
              onChange={handleChange}
              style={styles.detailInput}
            />

            <label style={styles.label}>
              End Date <span style={styles.required}>*</span>
            </label>
            <input
              type="date"
              name="endDate"
              value={form.endDate}
              onChange={handleChange}
              style={styles.detailInput}
            />

            <label style={styles.label}>End Time</label>
            <input
              type="time"
              name="endTime"
              value={form.endTime}
              onChange={handleChange}
              style={styles.detailInput}
            />

            <label style={styles.label}>
              Status <span style={styles.required}>*</span>
            </label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              style={styles.detailInput}
            >
              <option value="Open">Open</option>
              <option value="Closed">Closed</option>
            </select>

            <button style={styles.submitButton} onClick={handlePreview}>
              Preview Conference
            </button>
          </main>
        </div>
      )}

      {/* ---------------- PREVIEW MODE ---------------- */}
      {preview && (
        <div style={styles.previewCard}>
          <h2 style={styles.previewTitle}>{form.title}</h2>

          <p style={styles.previewDetail}>
            <strong>Location:</strong> {form.location}
          </p>

          <p style={styles.previewDetail}>
            <strong>Date:</strong> {renderDateDisplay()}
          </p>

          <p style={styles.previewDetail}>
            <strong>Status:</strong>{" "}
            <span
              style={
                form.status === "Open"
                  ? styles.statusOpen
                  : styles.statusClosed
              }
            >
              {form.status}
            </span>
          </p>

          <p style={styles.previewDescription}>{form.description}</p>

          <div style={styles.previewButtons}>
            <button style={styles.confirmButton} onClick={handleSubmit}>
              Submit Conference
            </button>
            <button style={styles.cancelButton} onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  pageWrapper: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    fontFamily: "system-ui, sans-serif",
    padding: "1rem 1rem",
    maxWidth: "900px",
    margin: "0 auto",
    width: "100%",
    boxSizing: "border-box",
  },

  mainTitle: {
    textAlign: "center",
    margin: "1rem 0",
    fontSize: "clamp(1.5rem, 5vw, 2.5rem)",
    fontWeight: "700",
    color: "#2D3748",
  },

  mainContainer: {
    display: "flex",
    flexDirection: "column",
    marginTop: "1rem",
  },

  contentArea: {
    backgroundColor: "#f0f0f0",
    padding: "40px",
    borderRadius: "15px",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },

  label: {
    fontSize: "0.9rem",
    fontWeight: "600",
    color: "#4A5568",
    paddingBottom: "10px",
    paddingTop: "20px",
  },

  detailInput: {
    padding: "12px",
    borderRadius: "6px",
    border: "1px solid #cbd5e0",
    width: "100%",
    boxSizing: "border-box",
  },

  messageInput: {
    minHeight: "120px",
    borderRadius: "6px",
    border: "1px solid #cbd5e0",
    width: "100%",
    boxSizing: "border-box",
    padding: "12px",
    fontFamily: "inherit",
    resize: "vertical",
  },

  required: {
    color: "#E53E3E",
    marginLeft: "4px",
  },

  submitButton: {
    marginTop: "30px",
    backgroundColor: "#3182ce",
    color: "white",
    padding: "12px 24px",
    border: "none",
    borderRadius: "8px",
    fontWeight: "bold",
    cursor: "pointer",
  },

  previewCard: {
    backgroundColor: "white",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    marginTop: "20px",
  },

  previewTitle: {
    fontSize: "1.8rem",
    marginBottom: "10px",
    color: "#2D3748",
  },

  previewDetail: {
    fontSize: "1rem",
    marginBottom: "8px",
    color: "#4A5568",
  },

  previewDescription: {
    marginTop: "15px",
    fontSize: "0.95rem",
    color: "#4A5568",
    lineHeight: "1.5",
  },

  previewButtons: {
    display: "flex",
    gap: "15px",
    marginTop: "25px",
  },

  confirmButton: {
    backgroundColor: "#3182ce",
    color: "white",
    padding: "12px 24px",
    border: "none",
    borderRadius: "8px",
    fontWeight: "bold",
    cursor: "pointer",
  },

  cancelButton: {
    backgroundColor: "#EDF2F7",
    color: "#2D3748",
    padding: "12px 24px",
    border: "none",
    borderRadius: "8px",
    fontWeight: "bold",
    cursor: "pointer",
  },

  statusOpen: {
    backgroundColor: "#C6F6D5",
    color: "#22543D",
    padding: "4px 10px",
    borderRadius: "12px",
    fontWeight: "bold",
  },

  statusClosed: {
    backgroundColor: "#FED7D7",
    color: "#822727",
    padding: "4px 10px",
    borderRadius: "12px",
    fontWeight: "bold",
  },
};

export default CreateConference;
