import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";

import s from "../styles/pages/login.module.scss";
import Button from "../components/Button";
import Input from "../components/inputs/Input";
import ErrorMessage from "../components/displays/ErrorMessage";
import { login } from "../redux/authSlice";

const Login = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [formValid, setFormValid] = useState(false);
  const [error, setError] = useState(null);

  function handleSetFormData(value, prop) {
    const newFormData = { ...formData, [prop]: value };
    setFormData(newFormData);
  }

  async function handleLogin() {
    try {
      setLoading(true);
      await sendLoginRequest();
    } catch (e) {
      setError(e);
      setLoading(false);
    }
  }

  async function sendLoginRequest() {
    const response = (await axios.post("/users/login", formData)).data;
    if (response.status === "ok") {
      dispatch(login(response.data));
      await router.push("/");
    } else {
      throw new Error(response.message);
    }
  }

  return (
    <div className={s.container}>
      <h1>User Login</h1>
      <Input
        label={"Email:"}
        setIsValidated={setFormValid}
        required
        placeholder="Enter email"
        value={formData.email}
        setValue={(val) => handleSetFormData(val, "email")}
      />
      <Input
        label={"Password:"}
        type="password"
        required
        setIsValidated={setFormValid}
        placeholder="Enter password"
        value={formData.password}
        setValue={(val) => handleSetFormData(val, "password")}
      />
      <Button
        disabled={!formValid}
        loading={loading}
        onClick={handleLogin}
        className={s.button}
      >
        Login
      </Button>
      <ErrorMessage error={error} />
    </div>
  );
};

export default Login;
