export const getCurrentUser = () => {
  const stored = localStorage.getItem("currentUser");
  return stored ? JSON.parse(stored) : null;
};
