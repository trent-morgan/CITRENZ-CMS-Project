import { db } from "../../firebase";
import { ref, get, update, child } from "firebase/database";

export const getPendingConferences = async () => {
  const snapshot = await get(child(ref(db), "conference"));
  if (!snapshot.exists()) return [];

  const data = snapshot.val();

  return Object.keys(data)
    .map(id => ({ id, ...data[id] }))
    .filter(conf => conf.reviewStatus === "pending");
};

export const approveConference = async (id) => {
  await update(ref(db, `conference/${id}`), {
    reviewStatus: "confirmed"
  });
};

export const denyConference = async (id) => {
  await update(ref(db, `conference/${id}`), {
    reviewStatus: "denied"
    });
};
