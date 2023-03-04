import { Options, QuestionCard, Steps } from ".";

export const Form = () => {
  return (
    <div className="w-full container mx-auto">
      <Steps />
      <QuestionCard />
      <Options />
    </div>
  );
};
