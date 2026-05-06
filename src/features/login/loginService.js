// features/login/loginService.js

// This acts as your private "Auth" table (Matches your logic)
const MOCK_AUTH_DB = [
  {
    email: "test.login@ara.ac.nz",
    password: "password123", // Internal use only for the mock sign-in
    // The profile matches your image_b09896.png schema exactly
    profile: {
      id: "550e8400-e29b-41d4-a716-446655440000", // uuid
      email: "test.login@ara.ac.nz",               // text (FK)
      first_name: "Trent",                         // varchar(50)
      last_name: "Morgan",                        // varchar(50)
      organization: "Ara Institute of Canterbury", // varchar(100)
      role: "Student",                            // varchar(100)
      bio: "Final-year BICT student at Ara specializing in software development and CITRENZ systems." // varchar(500)
    }
  },
  {
    email: "admin@citrenz.org",
    password: "admin123", 
    profile: {
      id: "f47ac10b-58cc-4372-a567-0e02b2c3d479", // Unique UUID
      email: "admin@citrenz.org",                 // text (FK)
      first_name: "Ad",                        // varchar(50)
      last_name: "Min",                         // varchar(50)
      organization: "CITRENZ Organization",      // varchar(100)
      role: "Admin",                              // Matches the check in your AdminPanel
      bio: "Lead administrator for the CITRENZ Conference Management System. Responsible for overseeing paper submissions and reviewer assignments." // varchar(500)
    }
  }
];

/**
 * Mocks the sign-in process for the CITRENZ conference system.
 * Returns { data, error } to stay consistent with Supabase patterns.
 */
export const signIn = async (email, password) => {
  // Simulate a slight network delay (800ms) for a realistic UI experience
  await new Promise((resolve) => setTimeout(resolve, 800));

  const account = MOCK_AUTH_DB.find(
    (a) => a.email === email && a.password === password
  );

  if (account) {
    // Return the profile data. Note: password is never sent to the UI.
    return { data: account.profile, error: null };
  }

  return { 
    data: null, 
    error: { message: "Invalid email or password. Please try again." } 
  };
};