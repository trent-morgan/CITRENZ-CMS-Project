import { auth, db } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { ref, get } from "firebase/database";

export const signIn = async (email, password) => {
  try {
    // 1. Sign in using Firebase Auth
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // 2. Fetch the user's profile from Realtime Database
    const profileRef = ref(db, `user/${user.uid}`);
    const snapshot = await get(profileRef);

    if (!snapshot.exists()) {
      return {
        data: null,
        error: { message: "User profile not found in database." }
      };
    }

    const profile = snapshot.val();

    return { data: profile, error: null };

  } catch (error) {
    return {
      data: null,
      error: { message: "Invalid email or password. Please try again." }
    };
  }
};
