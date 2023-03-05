/* eslint-disable react-hooks/rules-of-hooks */
import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/router";

import { useUserContext } from "@/hooks";
import { Layout } from "@/components";

const welcome = () => {
  const router = useRouter();
  const { user } = useUserContext();

  // useEffect(() => {
  //   if (user) {
  //     router.push("/trip");
  //   }
  // }, [user]);

  return (
    <Layout title="Welcome">
      <div className="container mx-auto flex flex-col items-center justify-center pb-14 h-full min-h-[calc(100vh-120px)]">
        <h1 className="mb-6 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl dark:text-white">
          Welcome to X. Set your preferences!
        </h1>
        <p className="mb-6 text-lg text-gray-500 dark:text-gray-400 max-w-screen-md text-center">
          We need to know a few things about you to get started. Lorem ipsum dolor sit, amet
          consectetur adipisicing elit. Quisquam, quos repudiandae. saepe velit quia.
        </p>
        <Link
          href={{ pathname: "/form", query: { step: "0" } }}
          className="btn btn-primary mt-4 mb-10 btn-lg text-xl"
        >
          Get started
        </Link>
        <div
          className="bg-cover h-80 rounded-lg shadow-lg bg-center mx-auto w-full max-w-screen-md"
          style={{
            backgroundImage:
              "url(https://cdn2.wanderlust.co.uk/media/1107/dreamstime_l_74818175.jpg?anchor=center&mode=crop&width=1920&height=858&format=auto&rnd=131455359460000000)",
          }}
        />
      </div>
    </Layout>
  );
};

export default welcome;
