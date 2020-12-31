import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";

import s from "../styles/pages/login.module.scss";
import Button from "../components/Button";
import Input from "../components/inputs/Input";
import ErrorMessage from "../components/displays/ErrorMessage";
import { login } from "../redux/authSlice";

const Signup = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [formValid, setFormValid] = useState(false);
  const [error, setError] = useState(null);

  function handleSetFormData(value, prop) {
    const newFormData = { ...formData, [prop]: value };
    setFormData(newFormData);
  }

  async function handleSignup() {
    try {
      setLoading(true);
      await sendSignupRequest();
    } catch (e) {
      setError(e.message);
      setLoading(false);
    }
  }

  async function sendSignupRequest() {
    const response = (
      await axios.post("/users", {
        ...formData,
        confirmPassword: undefined,
      })
    ).data;
    if (response.status === "ok") {
      await sendLoginRequest();
    } else {
      throw new Error(response.message);
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

  function validatePasswordLength(val) {
    if (val.length < 6) return "Password must be at least 6 characters long";
  }

  function validatePasswordMatch(val) {
    if (val !== formData.password) return "Passwords do not match";
  }

  return (
    <div className={s.container}>
      <h1>User Signup</h1>
      <Input
        label={"First Name:"}
        setIsValidated={setFormValid}
        required
        placeholder="Enter first name"
        value={formData.firstName}
        setValue={(val) => handleSetFormData(val, "firstName")}
      />
      <Input
        label={"Last Name:"}
        setIsValidated={setFormValid}
        required
        placeholder="Enter last name"
        value={formData.lastName}
        setValue={(val) => handleSetFormData(val, "lastName")}
      />
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
        validationCb={validatePasswordLength}
        placeholder="Enter password"
        value={formData.password}
        setValue={(val) => handleSetFormData(val, "password")}
      />
      <Input
        label={"Confirm Password:"}
        type="password"
        required
        setIsValidated={setFormValid}
        validationCb={validatePasswordMatch}
        placeholder="Confirm password"
        value={formData.confirmPassword}
        setValue={(val) => handleSetFormData(val, "confirmPassword")}
      />
      <Button
        disabled={!formValid}
        loading={loading}
        onClick={handleSignup}
        className={s.button}
      >
        Sign up
      </Button>
      <ErrorMessage error={error} />
    </div>
  );
};

export default Signup;
