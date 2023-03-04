import { HTMLAttributes } from "react";
import { useRouter } from "next/router";
import cn from "classnames";

import { useFormContext } from "@/hooks";

interface StepProps extends HTMLAttributes<HTMLDivElement> {
  isLast?: boolean;
  index: number;
}

export const Step = ({ isLast, index }: StepProps) => {
  const { questions, currentStep } = useFormContext();
  const router = useRouter();
  console.log("idx", questions[index], index, currentStep);

  return (
    <div
      className={cn("w-full h-3 rounded-full flex items-center justify-center", {
        "bg-green-500": index <= currentStep,
        "bg-gray-200": index > currentStep,
        "cursor-pointer": index < currentStep || questions[index - 1]?.answer,
        "mr-4": !isLast,
      })}
      onClick={() =>
        (index < currentStep || questions[index - 1].answer) &&
        router.push({
          pathname: "/form",
          query: { step: index },
        })
      }
      title={questions[index].title}
    />
  );
};
