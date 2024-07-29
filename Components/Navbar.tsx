"use client";
import {
  Container,
  Group,
  Button,
  Text,
  Burger,
  Paper,
  Transition,
} from "@mantine/core";
import { useState, useEffect } from "react";
import Link from "next/link";

const Navbar = () => {
  const [opened, setOpened] = useState(false);
  const [pathName, setPathName] = useState<string>("");

  useEffect(() => {
    setPathName(window.location.pathname.toLocaleLowerCase());
  }, []);

  const handleLogout = () => {
    try {
      window.localStorage.removeItem("token");
      window.location.href = "/login";
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Paper p="md" shadow="xs" style={{ position: "sticky", top: 0, zIndex: 1 }}>
      <Container>
        <Group ml="350" align="center">
          <Text c="blue" fw={700}>
            {pathName}
          </Text>
          <Burger
            opened={opened}
            onClick={() => setOpened((o) => !o)}
            size="md"
          />
          <Transition
            transition="slide-left"
            duration={200}
            timingFunction="ease"
            mounted={opened}
          >
            {(styles) => (
              <Group
                style={{
                  ...styles,
                  display: opened ? "flex" : "none",
                  flexDirection: "column",
                  position: "absolute",
                  top: 60,
                  right: 0,
                  backgroundColor: "#d4edfd",
                  border: "2px solid #4fb1f1",
                  color: "white!important",
                  padding: "1rem",
                  borderRadius: "0.5rem",
                  boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
                }}
              >
                <Link href="/dashboard">
                  <Button variant="subtle">Dashboard</Button>
                </Link>
                <Link href="/dashboard/blacklist">
                  <Button variant="subtle">Black List</Button>
                </Link>

                <Link href="#">
                  <Button onClick={handleLogout} variant="subtle">
                    Logout
                  </Button>
                </Link>
              </Group>
            )}
          </Transition>
        </Group>
      </Container>
    </Paper>
  );
};

export default Navbar;
