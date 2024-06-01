import { Button } from "antd";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Home = () => {
  const user = useSelector((state) => state.user);
  return (
    <div>
      <h1>{user?.name}</h1>
      <h1>SelfTest - App - Home Page</h1>

      <Button type="primary">
        <Link to={"/login"}>Login</Link>
      </Button>
    </div>
  );
};

export default Home;
