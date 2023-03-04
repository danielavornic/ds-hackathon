import { useRouter } from "next/router";
import { createContext, useEffect, useReducer, useState } from "react";

import { Question } from "@/types";

type FormContext = {
  questions: Question[];
  currentStep: number;
  setAnswer: (questionId: string, answer: string | string[]) => void;
};

const initialState: FormContext = {
  questions: [
    {
      id: "0",
      title: "Which factors motivated you to visit Republic of Moldova?",
      options: [
        {
          value: "1",
          label: "I have family or friends in Moldova",
        },
        {
          value: "2",
          label: "I have a business interest in Moldova",
        },
        {
          value: "3",
          label: "I am a student",
        },
      ],
      img: "https://www.nationsonline.org/gallery/Moldova/Old-Orhei-Moldova.jpg",
      type: "checkbox",
      required: true,
    },
    {
      id: "1",
      title: "What is your age?",
      options: [
        {
          value: "1",
          label: "18-24",
        },
        {
          value: "2",
          label: "25-34",
        },
        {
          value: "3",
          label: "35-44",
        },
        {
          value: "4",
          label: "45-54",
        },
        {
          value: "5",
          label: "55-64",
        },
        {
          value: "6",
          label: "65+",
        },
        // {
        //   value: "",
        //   label: "Other",
        //   isOther: true,
        // },
      ],
      hasCustomOption: true,
      img: "https://www.nationsonline.org/gallery/Moldova/Old-Orhei-Moldova.jpg",
      type: "radio",
      required: true,
    },
    {
      id: "2",
      title: "3rd question?",
      options: [
        {
          value: "1",
          label: "18-24",
        },
        {
          value: "2",
          label: "25-34",
        },
        {
          value: "3",
          label: "35-44",
        },
        {
          value: "4",
          label: "45-54",
        },
        {
          value: "5",
          label: "55-64",
        },
        {
          value: "6",
          label: "65+",
        },
      ],
      img: "https://www.nationsonline.org/gallery/Moldova/Old-Orhei-Moldova.jpg",
      type: "radio",
    },
  ],
  currentStep: 0,
  setAnswer: () => null,
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
    default: {
      return state;
    }
  }
};

export const FormProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(formReducer, initialState);
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);

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

  return (
    <FormContext.Provider
      value={{
        ...state,
        currentStep,
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
