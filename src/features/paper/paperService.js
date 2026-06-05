import { getDatabase, ref, push, set, get, child } from "firebase/database";
import { db } from "../../firebase";

export async function getUserByEmail(email) {
  const snapshot = await get(ref(db, "user"));  // <-- MUST MATCH YOUR DB

  if (!snapshot.exists()) return null;

  const users = snapshot.val();

  for (const uid in users) {
    if (users[uid].email === email) {
      return { uid, ...users[uid] };
    }
  }

  return null;
}
