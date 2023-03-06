/* eslint-disable react-hooks/rules-of-hooks */
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { Formik } from "formik";
import * as Yup from "yup";

import { useUserContext } from "@/hooks";
import { Layout } from "@/components";

const signup = () => {
  const router = useRouter();
  const { user, signup, error } = useUserContext();

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email address").required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null as any], "Passwords must match")
      .required("Confirm password is required"),
  });

  return (
    <Layout title="Sign up">
      <section className=" dark:bg-gray-900 md:h-[calc(100vh-120px)]">
        <div className="container  flex flex-col md:flex-row h-full justify-center items-center px-6 py-8 mx-auto lg:py-0">
          <div>
            <Image
              src="/images/md-2.png"
              alt="Sign in"
              width="700"
              height="548"
              unoptimized={true}
            />
          </div>
          <div className="-ml-48 bg-white w-full card shadow-md dark:border md:mt-0 sm:max-w-lg xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <div>
                <h1 className="mb-2 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Create your account
                </h1>
                <p className="text-gray-500 dark:text-gray-400">
                  Enter your details below and start your journey with MOLDOVISE.
                </p>
                {error && (
                  <div className="alert alert-error mt-4 p-2 bg-red-300 rounded-lg">
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="stroke-current flex-shrink-0 h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span>{error}</span>
                    </div>
                  </div>
                )}{" "}
              </div>
              <Formik
                initialValues={{ email: "", password: "", confirmPassword: "" }}
                onSubmit={(values, { setSubmitting }) => {
                  signup(values.email, values.password);
                  setSubmitting(false);
                }}
                validationSchema={validationSchema}
              >
                {({
                  values,
                  handleChange,
                  handleSubmit,
                  isSubmitting,
                  errors,
                  touched,
                  handleBlur,
                }) => (
                  <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                    <div>
                      <label
                        htmlFor="email"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Your email
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        className={`input input-bordered w-full ${
                          touched.email && errors.email ? "input-error" : ""
                        }`}
                        placeholder="name@company.com"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email}
                        required
                      />
                      {touched.email && errors.email ? (
                        <div className="text-xs text-red-600 mt-1">{errors.email}</div>
                      ) : null}
                    </div>
                    <div>
                      <label
                        htmlFor="password"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Password
                      </label>
                      <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="••••••••"
                        className={`input input-bordered w-full ${
                          touched.password && errors.password ? "input-error" : ""
                        }`}
                        required
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {touched.password && errors.password ? (
                        <div className="text-xs text-red-600 mt-1">{errors.password}</div>
                      ) : null}
                    </div>
                    <div>
                      <label
                        htmlFor="password"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Confirm password
                      </label>
                      <input
                        type="password"
                        name="confirmPassword"
                        id="confirmPassword"
                        placeholder="••••••••"
                        className={`input input-bordered w-full ${
                          touched.confirmPassword && errors.confirmPassword ? "input-error" : ""
                        }`}
                        required
                        value={values.confirmPassword}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </div>
                    <button
                      type="submit"
                      className="btn btn-primary w-full text-base"
                      disabled={isSubmitting}
                    >
                      Sign up
                    </button>
                    <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                      Already have an account?{" "}
                      <Link
                        href="/signin"
                        className="font-medium text-green-600 hover:underline dark:text-green-500"
                      >
                        Sign in
                      </Link>
                    </p>
                  </form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default signup;
