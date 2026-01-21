import { useState } from "react";
import { useNavigate } from "react-router";
import { login } from "../api/api";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await login(username, password);
      localStorage.setItem("token", data.access_token);
      navigate("/dashboard");
    } catch (err) {
      alert(`Ошибка входа: ${err}`);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <form onSubmit={onSubmit}>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="username"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
        />
        <button className="default-button" type="submit">
          Login
        </button>
        <button
          className="default-button"
          type="button"
          onClick={() => navigate("/register")}
        >
          Register
        </button>
      </form>
    </div>
  );
};
export default Login;
