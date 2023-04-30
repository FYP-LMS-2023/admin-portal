export const checkToken = () => {
  const token = sessionStorage.getItem("token");

  if (token) return true;
  else return false;
};
