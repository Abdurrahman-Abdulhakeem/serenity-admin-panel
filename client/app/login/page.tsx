"use client";

import { setCredentials } from "@/redux/features/slices/authSlice";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useLoginMutation } from "../../redux/features/authApi";

export default function LoginPage() {
  const [login] = useLoginMutation();
  const dispatch = useDispatch();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/dashboard";

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const { data } = await login({ email, password });

      dispatch(
        setCredentials({ userData: data, accessToken: data.accessToken })
      );
      document.cookie = `refreshToken=${data.refreshToken}; path=/;`;
      router.replace(redirect);
      alert(data.message + " welcome back " + data.user.name);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-secondary to-primary">
      <form
        onSubmit={handleLogin}
        className="bg-card text-card-foreground p-8 rounded-xl shadow-2xl w-full max-w-md"
      >
        <h1 className="text-2xl font-bold mb-6 text-center">
          Serenity Admin Login
        </h1>
        <input
          className="w-full p-3 mb-4 border rounded-xl"
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="w-full p-3 mb-4 border rounded-xl"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="submit"
          value="Log In"
          className="w-full bg-primary text-primary-foreground p-3 rounded-xl hover:bg-primary/80"
        />
      </form>
    </div>
  );
}
