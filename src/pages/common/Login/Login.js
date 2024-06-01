import { Form, message } from "antd";
import { Link } from "react-router-dom";
import { loginUser } from "../../../api-calls/users";

const Login = () => {
  const [form] = Form.useForm();
  const onSubmitLogin = async (values) => {
    try {
      const response = await loginUser(values);
      if (response.success) {
        message.success(response.message);
        localStorage.setItem("token", response.data);
        window.location.href = "/";
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };
  return (
    <div className="flex justify-center items-center h-screen w-100">
      <div className="card w-400 p-3">
        <div className="flex flex-col">
          <h1 className="text-2xl divider">Login</h1>
          <Form
            layout="vertical"
            className="mt-2"
            form={form}
            onFinish={onSubmitLogin}
          >
            <Form.Item name="email" label="Email">
              <input type="text" placeholder="Enter email" required />
            </Form.Item>
            <Form.Item name="password" label="Password">
              <input type="password" placeholder="Enter password" required />
            </Form.Item>
            <div className="flex flex-col gap-2">
              <button type="submit" className="primary-contained-btn mt-2">
                Login
              </button>
              <Link to="/register">Not a member? Register</Link>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;
