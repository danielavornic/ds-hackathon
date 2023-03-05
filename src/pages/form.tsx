/* eslint-disable react-hooks/rules-of-hooks */
import { useRouter } from "next/router";
import { useEffect } from "react";

import { Layout, Form, FormNav } from "@/components";
import { useFormContext, useUserContext } from "@/hooks";

const form = () => {
  const { questions, currentStep } = useFormContext();
  const router = useRouter();
  const { user } = useUserContext();

  // useEffect(() => {
  //   if (user) {
  //     router.push("/trip");
  //   }
  // }, [user]);

  useEffect(() => {
    if (currentStep >= questions.length || currentStep < 0) {
      router.push({
        pathname: "/form",
        query: { step: 0 },
      });
    }
  }, [currentStep, questions, router]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Enter" && currentStep < questions.length - 1) {
        if (questions[currentStep].answer) {
          router.push({
            pathname: "/form",
            query: { step: currentStep + 1 },
          });
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentStep, questions]);

  return (
    <Layout title="Preferences">
      <div className="flex flex-col items-center pt-10 pb-14 h-full min-h-[calc(100vh-120px)]">
        <Form />
      </div>
      <FormNav />
    </Layout>
  );
};

export default form;
