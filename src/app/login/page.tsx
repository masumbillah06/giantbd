"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const [forgotPassword, setForgotPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 p-6">

      <div className="relative h-135 w-225 overflow-hidden rounded-4xl bg-white shadow-xl">

        {/* =========================
            WELCOME PANEL
        ========================== */}

        <div
          className={`
            absolute left-0 top-0 z-20
            flex h-full w-1/2
            items-center justify-center
            bg-[#476ab8]
            transition-transform duration-700 ease-in-out
            ${forgotPassword
              ? "translate-x-full"
              : "translate-x-0"
            }
          `}
          style={{
            borderRadius: forgotPassword
              ? "30% 0 0 30% / 30% 0 0 30%"
              : "0 30% 30% 0 / 0 30% 30% 0",
          }}
        >
          <div className="text-center text-white px-10">
            <h1 className="text-4xl font-bold leading-snug">
              <div>
                <span>Welcome to</span> <br />
                <span>Giant BD ERP</span>
              </div>
            </h1>
          </div>
        </div>


        {/* =========================
            LOGIN PANEL
        ========================== */}

        <div
          className={`
            absolute right-0 top-0 z-10
            flex h-full w-1/2
            items-center justify-center
            bg-white
            transition-all duration-700 ease-in-out
            ${forgotPassword
              ? "opacity-0"
              : "opacity-100"
            }
          `}
        >
          <div className="w-full max-w-sm px-8">
            {/* Logo */}
            <div className="mb-10 flex justify-center">
              <img
                src="/image.png"
                alt="Giant BD Co Limited"
                className="h-28 w-auto object-contain"
              />
            </div>

            <div className="space-y-3">

              <input
                type="email"
                placeholder="Enter Your Email"
                className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 placeholder-slate-400 outline-none focus:border-[#476ab8] focus:ring-1 focus:ring-[#476ab8]"
              />

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 pr-11 text-sm text-slate-700 placeholder-slate-400 outline-none focus:border-[#476ab8] focus:ring-1 focus:ring-[#476ab8]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                    </svg>
                  )}
                </button>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={() => setForgotPassword(true)}
                  className="text-sm text-[#476ab8] hover:underline"
                >
                  Forgot Password?
                </button>
              </div>

              <button
                onClick={() => router.push("/inventory/dashboard")}
                className="w-full rounded-lg bg-[#476ab8] py-3 text-sm font-semibold text-white transition-colors hover:bg-[#3a5aa0]"
              >
                Login
              </button>

            </div>

          </div>
        </div>


        {/* =========================
            FORGOT PASSWORD PANEL
        ========================== */}

        <div
          className={`
            absolute left-0 top-0 z-10
            flex h-full w-1/2
            items-center justify-center
            bg-white
            transition-all duration-700 ease-in-out
            ${forgotPassword
              ? "opacity-100"
              : "opacity-0"
            }
          `}
        >
          <div className="w-full max-w-sm px-8">

            {/* Logo */}
            <div className="mb-8 flex justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/giantbdLogo.webp"
                alt="Giant BD Co Limited"
                className="h-22 w-auto object-contain"
              />
            </div>

            <div className="space-y-2 text-center">
              <h2 className="text-xl font-bold text-slate-900">
                Forgot Password?
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                Enter your registered email address and we&apos;ll send you a verification code.
              </p>
            </div>

            <div className="mt-6 space-y-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 placeholder-slate-400 outline-none focus:border-[#476ab8] focus:ring-1 focus:ring-[#476ab8]"
              />

              <button className="w-full rounded-lg bg-[#476ab8] py-3 text-sm font-semibold text-white transition-colors hover:bg-[#3a5aa0]">
                Send OTP
              </button>

              <button
                onClick={() => setForgotPassword(false)}
                className="w-full text-sm text-slate-500 hover:text-slate-900"
              >
                Back to Login
              </button>

            </div>

          </div>
        </div>

      </div>

    </main>
  );
}
