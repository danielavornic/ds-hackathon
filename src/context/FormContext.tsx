import { useRouter } from "next/router";
import { createContext, useEffect, useReducer, useState } from "react";

import { Question } from "@/types";
import { questions } from "@/data";
import { useTripContext } from "@/hooks";

type FormContext = {
  questions: Question[];
  currentStep: number;
  setAnswer: (questionId: string, answer: string | string[]) => void;
  sendForm: (form: any) => void;
  resetForm: () => void;
};

const initialState: FormContext = {
  questions,
  currentStep: 0,
  setAnswer: () => null,
  sendForm: () => null,
  resetForm: () => null,
};

export const FormContext = createContext<FormContext>(initialState);

const formReducer = (state: FormContext, action: any) => {
  switch (action.type) {
    case "SET_ANSWER": {
      const question = state.questions.find(
        (question) => question.id === action.payload.questionId,
      );
      if (question) {
        question.answer = action.payload.answer;
      }
      return {
        ...state,
        questions: [...state.questions],
      };
    }
    case "RESET_FORM": {
      return {
        ...state,
        questions: state.questions.map((question) => {
          question.answer = [""];
          return question;
        }),
      };
    }
    default: {
      return state;
    }
  }
};

export const FormProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(formReducer, initialState);
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const { addRecommendations } = useTripContext();

  useEffect(() => {
    if (router.query.step) {
      setCurrentStep(parseInt(router.query.step as string));

      return;
    }

    if (router.pathname === "/form") {
      router.push({
        pathname: "/form",
        query: { step: 0 },
      });
    }
  }, [router.query.step]);

  const sendForm = async (form: any) => {
    try {
      const reponse = await fetch("/api/user-form", {
        method: "POST",
        body: JSON.stringify(form),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (reponse.ok) {
        router.push({ pathname: "/trip", query: { tab: "map" } });
        const data = await reponse.json();
        addRecommendations(data.recommendations);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <FormContext.Provider
      value={{
        ...state,
        sendForm,
        currentStep,
        resetForm: () => {
          dispatch({ type: "RESET_FORM" });
        },
        setAnswer: (questionId: string, answer: string | string[]) => {
          dispatch({
            type: "SET_ANSWER",
            payload: { questionId, answer },
          });
        },
      }}
    >
      {children}
    </FormContext.Provider>
  );
};
