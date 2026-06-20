import { useSelector } from "react-redux";

export const useAuth = () => {
  const { user, token } = useSelector((state) => state.user);

  return {
    user,
    token,
    isAuthenticated: !!token,
  };
};

export default useAuth;
