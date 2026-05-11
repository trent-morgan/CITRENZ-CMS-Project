// features/registration/registerService.js

// Import the shared mock DB if you have it in a separate file, 
// or define it here if this is your primary source of truth.
import { MOCK_AUTH_DB } from '../login/loginService'; 

/**
 * Mocks the account creation process for the CITRENZ system.
 * Returns { data, error } to stay consistent with Supabase/API patterns.
 */
export const signUp = async (formData) => {
  // 1. Simulate network delay (1 second)
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // 2. Check if the user already exists in our mock database
  const userExists = MOCK_AUTH_DB.some(user => user.email === formData.email);
  
  if (userExists) {
    return { 
      data: null, 
      error: { message: "An account with this email already exists." } 
    };
  }

  // 3. Logic to split "Full Name" into First and Last for the DB schema
  const nameParts = formData.fullName.trim().split(' ');
  const firstName = nameParts[0] || "New";
  const lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : "User";

  // 4. Create the new profile object (Matching your database schema)
  const newProfile = {
    id: crypto.randomUUID(),
    email: formData.email,
    first_name: firstName,
    last_name: lastName,
    organization: formData.institution || "Independent Researcher",
    role: "Student", // Defaulting to Student; could be adjusted based on logic
    bio: `Registered member from ${formData.institution || 'CITRENZ'}.`
  };

  // 5. "Save" the new user into our mock array
  // In a real app, this would be a POST request to your backend
  MOCK_AUTH_DB.push({
    email: formData.email,
    password: formData.password, // In reality, never store plain text passwords!
    profile: newProfile
  });

  console.log("Mock DB Updated:", MOCK_AUTH_DB);

  return { data: newProfile, error: null };
};