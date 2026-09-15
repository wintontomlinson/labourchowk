import type { Metadata } from "next";
import { AuthLayout } from "@/components/auth/AuthLayout";

export const metadata: Metadata = {
  title: "Sign Up",
  description: "Create your Labour Chowk account.",
  robots: { index: false },
};

export default function SignupPage() {
  return <AuthLayout mode="signup" />;
}
