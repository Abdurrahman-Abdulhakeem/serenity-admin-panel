"use client";

import { setCredentials } from "@/app/redux/features/slices/authSlice";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useLoginMutation } from "../redux/features/authApi";

export default function LoginPage() {
  const [login] = useLoginMutation();
  const dispatch = useDispatch();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const { data } = await login({ email, password });

      dispatch(setCredentials({ user: data, accessToken: data.accessToken }));
      document.cookie = `refreshToken=${data.refreshToken}; path=/;`;
      router.push("/dashboard");
      alert(data.message + " welcome back " + data.user.name);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300">
      <form
        onSubmit={handleLogin}
        className="bg-background text-foreground p-8 rounded-xl shadow-2xl w-full max-w-md"
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
          className="w-full bg-blue-600 text-white p-3 rounded-xl hover:bg-blue-700"
        />
      </form>
    </div>
  );
}
