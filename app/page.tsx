"use client";
import Link from "next/link";
import { Button } from "@mantine/core";
import useAuth from "@/hooks/useAuth";

export default function Home() {
  useAuth();
  return <></>;
}
