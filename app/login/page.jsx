"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { loginSchema } from "@/utils/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { CiLogin } from "react-icons/ci";
import { MdOutlineMail } from "react-icons/md";
import { GoLock } from "react-icons/go";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      console.log(result);
      
      if (result.success) {
        router.push(`/dashboard/${result.role}`);
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="w-full max-w-md">
        {/* Header with blue line */}
        <div className="flex items-center gap-4 mb-8 justify-center">
          <div className="flex flex-col  items-center">
            <h2 className="text-3xl bg-linear-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent momo-font">
              Login
            </h2>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Email */}
          <div className="flex items-start gap-3">
            <div className="grow ">
              <label className=" mb-2 font-medium text-black flex ml-3 items-center">
                <div className="w-1 h-8 bg-indigo-600 mr-2 text-3xl"></div>
                Email
              </label>
              <div
                className={`flex items-center gap-3 border rounded-xl px-4 py-3 ${
                  errors.email
                    ? "border-red-500"
                    : "border-gray-300 focus-within:border-indigo-600"
                }`}
              >
                <MdOutlineMail className="text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="w-full bg-transparent outline-none text-black"
                  {...register("email")}
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>
          </div>

          {/* Password */}
          <div className="flex items-start gap-3">
            <div className="grow">
              <label className=" mb-2 font-medium text-gray-700 flex ml-3 items-center">
                <div className="w-1 h-8 bg-indigo-600 mr-2 text-4xl"></div>
                Password
              </label>
              <div
                className={`flex items-center gap-3 border rounded-xl px-4 py-3 ${
                  errors.password
                    ? "border-red-500"
                    : "border-gray-300 focus-within:border-indigo-600"
                }`}
              >
                <GoLock className="text-gray-400 w-5 h-5" />
                <input
                  type="password"
                  placeholder="••••••••••"
                  className="w-full bg-transparent outline-none text-black gap-1.5"
                  {...register("password")}
                />
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>

          {/* Role Selection */}
          <div className="flex items-start gap-3">
            <div className="grow">
              <label className=" mb-2 font-medium text-gray-700 flex ml-3 items-center">
                <div className="w-1 h-8 bg-indigo-600 mr-2 text-3xl"></div>
                Role
              </label>
              <select
                className="w-full px-4 py-3 border border-gray-300 rounded-xl text-gray-500 focus:border-indigo-600 outline-none"
                {...register("role")}
              >
                <option value="faculty">Faculty</option>
                <option value="student">Student</option>
              </select>
              {errors.role && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.role.message}
                </p>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex items-center gap-3 pt-2">
            <button
              type="submit"
              className="w-full bg-linear-to-r from-indigo-500 to-purple-600 text-white py-3 rounded-xl font-semibold hover:from-indigo-600 hover:to-indigo-700 transition flex items-center justify-center gap-2"
            >
              <CiLogin /> Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Page;
