
"use client";

import axios from "axios";
import { useState } from "react";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [response, setResponse] = useState({
    status: null,
    message: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    // Clear previous response
    setResponse({
      status: null,
      message: "",
    });

    const formData = new FormData(e.target);

    const userData = {
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
    };

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/signup`,
        userData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Success Response
      setResponse({
        status: res.status,
        message: res.data.message,
      });

      // Reset form on success
      if (res.status >= 200 && res.status < 300) {
        e.target.reset();
        setShowPassword(false);
      }

    } catch (error) {
      console.error("Error submitting data:", error);

      if (error.response) {
        // Server Error Response
        setResponse({
          status: error.response.status,
          message:
            error.response.data.message || "Something went wrong!",
        });
      } else {
        // Network Error
        setResponse({
          status: 0,
          message: "Network error! Please try again.",
        });
      }

    } finally {
      setIsLoading(false);
    }
  };

  // Check response status
  const isSuccess =
    response.status >= 200 && response.status < 300;

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0B1B38] px-4 py-10">

      <div className="w-full max-w-md rounded-2xl border border-blue-400/20 bg-[#112544] p-8 shadow-2xl">

        {/* Header */}
        <div className="text-center mb-8">

          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-blue-600">
            <span className="text-3xl">💼</span>
          </div>

          <h1 className="text-3xl font-bold text-white">
            Create Account
          </h1>

          <p className="mt-2 text-sm text-blue-200">
            Join our Job Board community
          </p>

        </div>

        {/* Response Message */}
        {response.message && (
          <div
            role="alert"
            className={`mb-6 rounded-lg border p-4 ${
              isSuccess
                ? "border-green-500/30 bg-green-500/10 text-green-400"
                : "border-red-500/30 bg-red-500/10 text-red-400"
            }`}
          >
            <div className="flex items-center gap-2">

              <span className="text-lg">
                {isSuccess ? "✓" : "✕"}
              </span>

              <span className="text-sm font-medium">
                {response.message}
              </span>

            </div>

          </div>
        )}

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Name */}
          <div>
            <label className="mb-2 block text-sm font-medium text-white">
              Full Name
            </label>

            <input
              type="text"
              name="name"
              placeholder="Enter your full name"
              required
              autoComplete="name"
              className="w-full rounded-lg border border-blue-400/30 bg-[#0B1B38] px-4 py-3 text-white outline-none placeholder:text-blue-200/50 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
            />
          </div>

          {/* Email */}
          <div>
            <label className="mb-2 block text-sm font-medium text-white">
              Email Address
            </label>

            <input
              type="email"
              name="email"
              placeholder="example@email.com"
              required
              autoComplete="email"
              className="w-full rounded-lg border border-blue-400/30 bg-[#0B1B38] px-4 py-3 text-white outline-none placeholder:text-blue-200/50 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
            />
          </div>

          {/* Password */}
          <div>
            <label className="mb-2 block text-sm font-medium text-white">
              Password
            </label>

            <div className="relative">

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Create a password"
                required
                minLength={6}
                autoComplete="new-password"
                className="w-full rounded-lg border border-blue-400/30 bg-[#0B1B38] px-4 py-3 pr-16 text-white outline-none placeholder:text-blue-200/50 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-medium text-blue-400 hover:text-blue-300 cursor-pointer"
              >
                {showPassword ? "Hide" : "Show"}
              </button>

            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 py-3 font-semibold text-white transition duration-300 hover:bg-blue-700 focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-[#112544] disabled:cursor-not-allowed disabled:opacity-70 cursor-pointer"
          >

            {isLoading ? (
              <>
                <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white"></span>

                Creating Account...
              </>
            ) : (
              "Create Account"
            )}

          </button>

        </form>

        {/* Login Link */}
        <p className="mt-7 text-center text-sm text-blue-200">

          Already have an account?{" "}

          <a
            href="/login"
            className="font-semibold text-blue-400 transition hover:text-blue-300"
          >
            Login
          </a>

        </p>

      </div>

    </div>
  );
}
