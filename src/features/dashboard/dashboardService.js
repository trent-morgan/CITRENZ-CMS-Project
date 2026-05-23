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

// -------------------------------
// Fetch papers for the user
// -------------------------------
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
