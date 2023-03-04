import { useFormContext } from "@/hooks";
import { Step } from ".";

export const Steps = () => {
  const { questions } = useFormContext();

  return (
    <div className="w-full flex justify-between items-center mb-16">
      {questions.map((_, index) => (
        <Step key={index} isLast={index === questions.length - 1} index={index} />
      ))}
    </div>
  );
};
