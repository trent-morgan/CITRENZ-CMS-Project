import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref, set } from "firebase/database";
import { auth, db } from "../../firebase";


export const signUp = async (formData) => {

  try {
    // 1. Create the user in Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      formData.email,
      formData.password
    );

    const user = userCredential.user;

    // 2. Build profile object
    const firstName = formData.firstName;
    const lastName = formData.lastName;

    const newProfile = {
      id: user.uid,
      email: formData.email,
      first_name: firstName,
      last_name: lastName,
      organization: "",
      role: "",
      bio: "",
      createdAt: Date.now()
    };

    // 3. Save profile to Realtime Database
    await set(ref(db, `user/${user.uid}`), newProfile);

    return { data: newProfile, error: null };

  } catch (error) {
    return {
      data: null,
      error: { message: error.message }
    };
  }
};
