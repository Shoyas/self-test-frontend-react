import { Button } from "antd";
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div>
            <h1>SelfTest - App - Home Page</h1>
            
            <Button type="primary"><Link to={'/login'}>Login</Link></Button>
        </div>
    );
};

export default Home;