import { useEffect, useState } from "react";

import { useFormContext } from "@/hooks";
import { Option } from "@/components";
import { QuestionType } from "@/types";

export const Options = () => {
  const { questions, setAnswer, currentStep } = useFormContext();
  const [otherValue, setOtherValue] = useState("");

  const question = questions[currentStep];
  const { id, type } = question;
  const answer = question?.answer || [];

  const handleChange = (index: number, value: string) => {
    if (index === question.options.length) {
      if (type === "radio") {
        return setAnswer(id, [value]);
      }

      return setAnswer(id, [...(answer || []), value]);
    }

    if (type === "checkbox") {
      if (answer?.includes(value)) {
        return setAnswer(
          question.id,
          answer.filter((answer: string) => answer !== value),
        );
      }

      return setAnswer(id, [...(answer || []), value]);
    }

    return setAnswer(id, [value]);
  };

  useEffect(() => {
    if (!question?.answer) {
      setOtherValue("");
    }

    if (
      question.options.every((option) => !answer.includes(option.value)) &&
      question.hasCustomOption
    ) {
      setOtherValue(answer[0]);
    }
  }, [currentStep]);

  return (
    <div className="max-w-screen-lg mx-auto mt-10 mb-18">
      {question.options.map(({ label, value }, index) => (
        <Option
          key={index}
          index={index}
          onChange={handleChange}
          label={label}
          value={value}
          answer={answer}
          type={type as QuestionType}
        />
      ))}
      {question.hasCustomOption && (
        <Option
          index={question.options.length}
          onChange={(index, value) => {
            handleChange(index, value);
            setOtherValue(value);
          }}
          label="Other"
          value={otherValue}
          answer={answer}
          type={type as QuestionType}
          isOther
        />
      )}
    </div>
  );
};
