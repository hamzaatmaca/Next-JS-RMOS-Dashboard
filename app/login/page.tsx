"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { TextInput, Button, Container } from "@mantine/core";
import { loginEndpoint } from "@/utils/endpoints";
import Image from "next/image";
import logo from "../../public/logo.png";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const response = await axios.post(loginEndpoint, {
        username,
        password,
      });
      const token = response.data;

      localStorage.setItem("token", token);
      router.push("/dashboard");
    } catch (err) {
      setError("Login failed. Please check your credentials.");
    }
  };

  return (
    <Container
      mt={100}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "Center",
        flexDirection: "column",
      }}
    >
      <Image src={logo} alt="Açıklama" width={150} height={70} />
      <TextInput
        mt={10}
        label="Username"
        value={username}
        onChange={(event) => setUsername(event.currentTarget.value)}
      />
      <TextInput
        mt={10}
        label="Password"
        type="password"
        value={password}
        onChange={(event) => setPassword(event.currentTarget.value)}
      />
      {error && <p style={{ color: "red" }}>{error}</p>}
      <Button mt={10} onClick={handleLogin}>
        Login
      </Button>
    </Container>
  );
};

export default LoginPage;
