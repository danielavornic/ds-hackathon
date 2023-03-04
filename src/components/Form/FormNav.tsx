import Link from "next/link";
import cn from "classnames";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";

import { useFormContext } from "@/hooks";

export const FormNav = () => {
  const { questions, currentStep } = useFormContext();

  return (
    <div className="bg-white w-full h-14 px-6 py-2 flex justify-center text-gray-font fixed bottom-0 shadow-lg z-40 border-t border-gray-99">
      <div className="container mx-auto flex justify-center items-center">
        <Link
          href={{ pathname: "/form", query: { step: currentStep - 1 } }}
          className={cn("btn btn-outline btn-sm mr-4", {
            "opacity-0 pointer-events-none": currentStep === 0,
          })}
        >
          <FiArrowLeft className="text-base mr-2" />
          Back
        </Link>
        <Link
          href={
            currentStep === questions.length - 1
              ? "/trip"
              : { pathname: "/form", query: { step: currentStep + 1 } }
          }
          className={cn("btn btn-primary btn-sm", {
            "opacity-50 pointer-events-none":
              !questions[currentStep].answer?.filter((item) => !!item).length &&
              questions[currentStep]?.required,
          })}
        >
          {currentStep === questions.length - 1 ? "Finish" : "Next"}
          <FiArrowRight className="text-base ml-2" />
        </Link>
      </div>
    </div>
  );
};
