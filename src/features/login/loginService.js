export let MOCK_AUTH_DB = [
  {
    email: "test.login@ara.ac.nz",
    password: "password123", 
    profile: {
      id: "550e8400-e29b-41d4-a716-446655440000", 
      email: "test.login@ara.ac.nz",               
      first_name: "Trent",                         
      last_name: "Morgan",                       
      organization: "Ara Institute of Canterbury", 
      role: "Student",                           
      bio: "Final-year BICT student at Ara specializing in software development and CITRENZ systems."
    }
  },
  {
    email: "admin@citrenz.org",
    password: "admin123", 
    profile: {
      id: "f47ac10b-58cc-4372-a567-0e02b2c3d479", 
      email: "admin@citrenz.org",                 
      first_name: "Ad",                        
      last_name: "Min",                         
      organization: "CITRENZ Organization",      
      role: "Admin",                              
      bio: "Lead administrator for the CITRENZ Conference Management System. Responsible for overseeing paper submissions and reviewer assignments." 
    }
  }
];

export const signIn = async (email, password) => {
  await new Promise((resolve) => setTimeout(resolve, 800));

  const account = MOCK_AUTH_DB.find(
    (a) => a.email === email && a.password === password
  );

  if (account) {
    return { data: account.profile, error: null };
  }

  return { 
    data: null, 
    error: { message: "Invalid email or password. Please try again." } 
  };
};