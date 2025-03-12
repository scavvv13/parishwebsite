"use client";

import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { useRouter } from "next/navigation";
import { signIn, signInWithRedirect, signOut } from "aws-amplify/auth";
import outputs from "@/amplify_outputs.json";

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle form submit for sign-in
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await signIn({ username: email, password });
      router.push("/post-announcement"); // Redirect after login
    } catch (err) {
      setError((err as Error).message || "Failed to login");
    } finally {
      setLoading(false);
    }
  };

  // Handle social sign-in
  const handleSocialSignIn = async (provider: "Google" | "Facebook") => {
    setError("");
    try {
      await signInWithRedirect({ provider });
    } catch (err) {
      setError(`Failed to sign in with ${provider}: ${(err as Error).message}`);
    }
  };

  return (
    <div className="w-full ">
      <strong className="playfair font-black text-5xl">Login</strong>

      {/* Social Login Buttons */}
      <div className="flex flex-row gap-4 mt-10">
        <Button
          variant="outline"
          className="w-full flex items-center gap-2"
          onClick={() => handleSocialSignIn("Facebook")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="256"
            height="256"
            viewBox="0 0 256 256"
          >
            <path
              fill="#1877f2"
              d="M256 128C256 57.308 198.692 0 128 0S0 57.308 0 128c0 63.888 46.808 116.843 108 126.445V165H75.5v-37H108V99.8c0-32.08 19.11-49.8 48.348-49.8C170.352 50 185 52.5 185 52.5V84h-16.14C152.959 84 148 93.867 148 103.99V128h35.5l-5.675 37H148v89.445c61.192-9.602 108-62.556 108-126.445"
            />
            <path
              fill="#fff"
              d="m177.825 165l5.675-37H148v-24.01C148 93.866 152.959 84 168.86 84H185V52.5S170.352 50 156.347 50C127.11 50 108 67.72 108 99.8V128H75.5v37H108v89.445A129 129 0 0 0 128 256a129 129 0 0 0 20-1.555V165z"
            />
          </svg>{" "}
          Continue with Facebook
        </Button>
        <Button
          variant="outline"
          className="w-full flex items-center gap-2"
          onClick={() => handleSocialSignIn("Google")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            viewBox="0 0 48 48"
          >
            <path
              fill="#ffc107"
              d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917"
            />
            <path
              fill="#ff3d00"
              d="m6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691"
            />
            <path
              fill="#4caf50"
              d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.9 11.9 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44"
            />
            <path
              fill="#1976d2"
              d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002l6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917"
            />
          </svg>{" "}
          Continue with Google
        </Button>
      </div>

      {/* Email & Password Login Form */}
      <form onSubmit={handleSubmit} className="space-y-4 mt-3">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </Button>
      </form>

      <Separator className="my-4" />
      <p className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <button
          onClick={() =>
            router.push("?registerModal=register", { scroll: false })
          }
          className="text-black font-bold"
        >
          Register
        </button>
      </p>
    </div>
  );
}
