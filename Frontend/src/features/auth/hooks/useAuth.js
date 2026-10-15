import { useContext } from "react";
import { AuthContext } from "../auth.context";
import { login, registor, getMe, logout } from "../services/auth.api";

export const useAuth = () => {
  const context = useContext(AuthContext);
  const { User, setUser, Loading, setLoading } = context;

  const handleLogin = async ({ email, password }) => {
    setLoading(true);
    try {
      const data = await login(email, password);
      setUser(data.User);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleRegistor = async ({ username, email, password }) => {
    setLoading(true);
    try {
      const data = await registor(username, email, password);
      setUser(data.User);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  const handleLogout = async () => {
    setLoading(true);
    try {
      const data = await logout();
      if (data) {
        setUser(null);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const getCurrentUser = async () => {
    setLoading(true);
    try {
      const data = await getMe();
      if (data) {
        setUser(data);
      }
    } catch (err) {
      setUser(null);
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  return {
    User,
    setUser,
    Loading,
    setLoading,
    handleLogin,
    handleRegistor,
    handleLogout,
  };
};
