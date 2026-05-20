import { MOCK_AUTH_DB } from '../login/loginService'; 


export const signUp = async (formData) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const userExists = MOCK_AUTH_DB.some(user => user.email === formData.email);
  
  if (userExists) {
    return { 
      data: null, 
      error: { message: "An account with this email already exists." } 
    };
  }

  const nameParts = formData.fullName.trim().split(' ');
  const firstName = nameParts[0] || "New";
  const lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : "User";

  const newProfile = {
    id: crypto.randomUUID(),
    email: formData.email,
    first_name: firstName,
    last_name: lastName,
    organization: formData.institution || "Independent Researcher",
    role: "Student",
    bio: `Registered member from ${formData.institution || 'CITRENZ'}.`
  };


  MOCK_AUTH_DB.push({
    email: formData.email,
    password: formData.password, 
    profile: newProfile
  });

  console.log("Mock DB Updated:", MOCK_AUTH_DB);

  return { data: newProfile, error: null };
};