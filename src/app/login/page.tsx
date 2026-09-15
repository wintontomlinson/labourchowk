import type { Metadata } from "next";
import { AuthLayout } from "@/components/auth/AuthLayout";

export const metadata: Metadata = {
  title: "Login",
  description: "Sign in to your Labour Chowk account.",
  robots: { index: false },
};

export default function LoginPage() {
  return <AuthLayout mode="login" />;
}
