import { useState } from "react";
import { useNavigate } from "react-router";
import { register } from "../api/api";

export const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await register(username, password);
    navigate("/login");
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
          Register
        </button>
        <button
          className="default-button"
          type="button"
          onClick={() => navigate("/login")}
        >
          Login
        </button>
      </form>
    </div>
  );
};
