"use client";

import { useState } from "react";

export default function LoginPage() {
  const [forgotPassword, setForgotPassword] = useState(false);

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 p-6">

      <div className="relative h-125 w-225 overflow-hidden rounded-4xl bg-white shadow-xl">

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
        >
          <div className="text-center text-white">
            <h1 className="text-4xl font-bold">
              <div>
                Welcome to
              </div>
              <div>
                GiantBD ERP
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

            <h2 className="text-3xl font-bold text-slate-900">
              Login
            </h2>

            <div className="mt-6 space-y-4">

              <input
                type="email"
                placeholder="Email"
                className="w-full rounded-lg border px-4 py-3 outline-none"
              />

              <input
                type="password"
                placeholder="Password"
                className="w-full rounded-lg border px-4 py-3 outline-none"
              />

              <button className="w-full rounded-xl bg-[#476ab8] py-3 text-white">
                Login
              </button>

              <button
                onClick={() => setForgotPassword(true)}
                className="w-full text-sm text-slate-500 hover:text-slate-900"
              >
                Forgot Password?
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

            <h2 className="text-3xl font-bold text-slate-900">
              Forgot Password?
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Enter your email and we will send you an OTP.
            </p>

            <div className="mt-6 space-y-4">

              <input
                type="email"
                placeholder="Enter your email"
                className="w-full rounded-lg border px-4 py-3 outline-none"
              />

              <button className="w-full rounded-lg bg-[#476ab8] py-3 text-white">
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