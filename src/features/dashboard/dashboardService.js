// src/services/dashboardService.js
import { db } from "../../firebase";
import { ref, get } from "firebase/database";

// -------------------------------
// Fetch conferences for the user
// -------------------------------
export async function getMyConferences(userEmail) {
  try {
    const snapshot = await get(ref(db, "conference"));

    if (!snapshot.exists()) return [];

    const data = snapshot.val();

    return Object.keys(data)
      .map(id => ({ id, ...data[id] }))
      .filter(conf => conf.createdBy === userEmail);
  } catch (err) {
    console.error("DashboardService.getMyConferences:", err);
    return [];
  }
}

export async function getMyPapers(userEmail) {
  try {
    const snapshot = await get(ref(db, "paper"));

    if (!snapshot.exists()) return [];

    const data = snapshot.val();

    return Object.keys(data)
      .map(id => ({ id, ...data[id] }))
      .filter(paper => paper.createdBy === userEmail);
  } catch (err) {
    console.error("DashboardService.getMyPapers:", err);
    return [];
  }
}

export async function getMyRegistrations(userId) {
  const regRef = ref(db, `registrations`);
  const snapshot = await get(regRef);

  if (!snapshot.exists()) return [];

  const allRegs = snapshot.val();
  const registeredConfIds = [];

  // Find all conferences where this user is registered
  for (const confId in allRegs) {
    if (allRegs[confId][userId]) {
      registeredConfIds.push(confId);
    }
  }

  // Fetch conference details
  const conferences = [];
  for (const confId of registeredConfIds) {
    const confSnap = await get(ref(db, `conference/${confId}`));
    if (confSnap.exists()) {
      conferences.push({ id: confId, ...confSnap.val() });
    }
  }

  return conferences;
}