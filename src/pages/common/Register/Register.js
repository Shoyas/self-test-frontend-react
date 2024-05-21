import { Form, message } from "antd";
import { Link } from "react-router-dom";
import { registerUser } from "../../../apicalls/users";

const Register = () => {
  const onSubmitRegistration = async (values) => {
    try {
      const response = await registerUser(values);
      if (response.success) {
        message.success(response.message);
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
          <h1 className="text-2xl divider">Register</h1>
          <Form
            layout="vertical"
            className="mt-2"
            onFinish={onSubmitRegistration}
          >
            <Form.Item name="name" label="Name">
              <input type="text" placeholder="Enter name" required />
            </Form.Item>
            <Form.Item name="email" label="Email">
              <input type="text" placeholder="Enter email" required />
            </Form.Item>
            <Form.Item name="password" label="Password">
              <input type="password" placeholder="Enter password" required />
            </Form.Item>
            <div className="flex flex-col gap-2">
              <button type="submit" className="primary-contained-btn mt-2">
                Register
              </button>
              <Link to="/login">Already a member? Login</Link>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Register;
