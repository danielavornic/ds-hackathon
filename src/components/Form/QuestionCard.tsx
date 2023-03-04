import { useFormContext } from "@/hooks";

export const QuestionCard = () => {
  const { questions, currentStep } = useFormContext();
  const question = questions[currentStep];

  return (
    <div className="card max-w-screen-lg mx-auto shadow">
      <div
        className="h-[200px] bg-gray-200 rounded-t-2xl bg-cover bg-center"
        style={{ backgroundImage: `url(${question?.img})` }}
      />
      <div className="-mt-5 rounded-full py-2 px-8 text-base font-bold shadow bg-green-500 text-white text-center w-fit mx-auto">
        Question {currentStep + 1} of {questions.length}
      </div>
      <div className="p-6 space-y-4 card-body">
        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl text-center">
          {question?.title}
        </h1>
      </div>
    </div>
  );
};
