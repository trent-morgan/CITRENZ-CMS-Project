import { getDatabase, ref, push, set, get, child } from "firebase/database";
import { db } from "../../firebase";

// ⭐ Fetch all conferences
export const getConferences = async () => {
  try {
    const snapshot = await get(child(ref(db), "conference"));

    if (!snapshot.exists()) return [];

    const data = snapshot.val();

    return Object.keys(data).map(id => ({
      id,
      ...data[id]
    }));
  } catch (error) {
    console.error("Error fetching conferences:", error);
    throw error;
  }
};

// ⭐ Submit a new conference (default: pending)
export const submitConference = async (conferenceData, user) => {
  try {
    const conferenceRef = push(ref(db, "conference"));

    await set(conferenceRef, {
      ...conferenceData,
      createdBy: user.email,        // 🔥 FIXED — always use email
      reviewStatus: "pending",
      createdAt: Date.now()
    });

    return conferenceRef.key;
  } catch (error) {
    console.error("Error submitting conference:", error);
    throw error;
  }
};

export const getUserByEmail = async (email) => {
  const snapshot = await get(ref(db, "user"));

  if (!snapshot.exists()) return null;

  const users = snapshot.val();

  // Find user whose email matches
  for (const uid in users) {
    if (users[uid].email === email) {
      return { uid, ...users[uid] };
    }
  }

  return null;
};