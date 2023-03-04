import { useState } from "react";

import { useFormContext } from "@/hooks";
import { Option } from "@/components";

export const Options = () => {
  const { questions, setAnswer, currentStep } = useFormContext();
  const [otherValue, setOtherValue] = useState("");

  const question = questions[currentStep];
  const { id, answer, type } = question;

  const handleChange = (index: number, value: string) => {
    if (index === question.options.length) {
      return setAnswer(id, [value]);
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
          type={type}
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
          type={type}
          isOther
        />
      )}
    </div>
  );
};
