import Image from "next/image";
import Link from "next/link";
import { Formik } from "formik";

import { Layout } from "@/components";

const signup = () => {
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
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Create your account
              </h1>
              <p className="text-gray-500 dark:text-gray-400">
                Enter your details below and start your journey with us.
              </p>
              <Formik
                initialValues={{ email: "", password: "", confirmPassword: "" }}
                onSubmit={(values, { setSubmitting }) => {
                  console.log(values);
                  setSubmitting(false);
                }}
              >
                {({ values, handleChange, handleSubmit, isSubmitting }) => (
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
                        className="input input-bordered w-full"
                        placeholder="name@company.com"
                        onChange={handleChange}
                        value={values.email}
                        required
                      />
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
                        className="input input-bordered w-full"
                        required
                        value={values.password}
                        onChange={handleChange}
                      />
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
                        className="input input-bordered w-full"
                        required
                        value={values.confirmPassword}
                        onChange={handleChange}
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
