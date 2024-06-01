import { useEffect } from "react";
import { getUserInfo } from "../api-calls/users";
import { message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { SetUser } from "../redux/usersSlice";

const ProtectedRoute = ({ children }) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const getUserData = async () => {
    try {
      const response = await getUserInfo();
      if (response.success) {
        message.success(response.message);
        dispatch(SetUser(response.data));
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };
  useEffect(() => {
    getUserData();
  }, [user]);
  return (
    <div>
      {user?.name}
      {children}
    </div>
  );
};

export default ProtectedRoute;
