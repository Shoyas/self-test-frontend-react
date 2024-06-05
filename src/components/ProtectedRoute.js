/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { getUserInfo } from "../api-calls/users";
import { message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { SetUser } from "../redux/usersSlice";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const [effectCounter, setEffectCounter] = useState(0);

  const user = useSelector((state) => state.users);
  console.log(user);
  const [menu, setMenu] = useState([]);
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const userMenu = [
    {
      title: "Home",
      paths: ["/"],
      icon: <i class="ri-home-3-line" />,
      onClick: () => navigate("/"),
    },
    {
      title: "Reports",
      paths: ["/reports"],
      icon: <i class="ri-file-chart-line" />,
      onClick: () => navigate("/reports"),
    },
    {
      title: "Profile",
      paths: ["/profile"],
      icon: <i class="ri-user-line" />,
      onClick: () => navigate("/profile"),
    },
    {
      title: "Logout",
      paths: ["/logout"],
      icon: <i class="ri-logout-box-line" />,
      onClick: () => {
        localStorage.removeItem("token");
        navigate("/login");
      },
    },
  ];
  const adminMenu = [];

  const dispatch = useDispatch();
  const getUserData = async () => {
    try {
      const response = await getUserInfo();
      if (response.success) {
        message.success(response.message);
        dispatch(SetUser(response.data));
        setEffectCounter(effectCounter + 1);
        if (response.data.isAdmin) {
          setMenu(adminMenu);
        } else {
          setMenu(userMenu);
        }
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };
  useEffect(() => {
    if (effectCounter < 1) {
      getUserData();
    }
  }, [effectCounter]);

  const activeRoute = window.location.pathname;

  return (
    <div className="layout">
      {/* <h2>User: {user?.user?.name}</h2>
      {children} */}

      <div className="flex gap-2 h-100">
        <div className="sidebar">
          <div className="menu">
            {menu.map((item, index) => {
              return (
                <div
                  className={`menu-item ${
                    activeRoute === item.paths[0] && "active-menu-item"
                  }`}
                  key={index}
                  onClick={item.onClick}
                >
                  {item.icon}
                  {!collapsed && (
                    <span className="text-white">{item.title}</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        <div className="body">
          <div className="header flex justify-between items-center">
            {!collapsed && (
              <i
                class="ri-arrow-left-s-line"
                onClick={() => setCollapsed(true)}
              />
            )}
            {collapsed && (
              <i
              class="ri-arrow-right-s-line" 
                onClick={() => setCollapsed(false)}
              />
            )}
            <h2>SELF TEST</h2>
            <div className="flex gap-1 items-center">
            <i class="ri-user-line"/>
            <h4 className="text-md underline">{user?.user?.name}</h4>
            </div>
            
          </div>
          <div className="content">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default ProtectedRoute;
