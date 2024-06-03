import { useEffect, useState } from "react";
import { getUserInfo } from "../api-calls/users";
import { message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { SetUser } from "../redux/usersSlice";

const ProtectedRoute = ({ children }) => {
  const [effectCounter, setEffectCounter] = useState(0);
  const user = useSelector((state) => state.users);
  console.log(user);
  const dispatch = useDispatch();
  const getUserData = async () => {
    try {
      const response = await getUserInfo();
      if (response.success) {
        message.success(response.message);
        dispatch(SetUser(response.data));
        setEffectCounter(effectCounter + 1);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };
  useEffect(() => {
    if (effectCounter < 4) {
      getUserData();
    }
  }, [effectCounter]);

  return (
    <div className="layout">
      <h2>User: {user?.user?.name}</h2>
      {children}
    </div>
  );
};

export default ProtectedRoute;
