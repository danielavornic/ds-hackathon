import cn from "classnames";
import { QuestionType } from "@/types";

interface OptionProps {
  label: string;
  index: number;
  onChange: (index: number, value: string) => void;
  value: string;
  answer?: string | string[];
  type?: QuestionType;
  isOther?: boolean;
}

export const Option = ({ label, index, onChange, value, answer, type, isOther }: OptionProps) => {
  const isChecked = answer?.includes(value);

  return (
    <label
      className={cn(
        "w-full flex flex-col mb-4 py-3 px-4 border-gray-200 border-2 rounded-lg cursor-pointer",
        { "border-green-500 bg-green-50": isChecked },
      )}
    >
      <div className="flex w-full">
        <input
          type={type || "radio"}
          name="option"
          className={cn(type, {
            "checkbox-primary": type === "checkbox" && isChecked,
            "radio-primary": type === "radio" && isChecked,
          })}
          id={`option-${index}`}
          onChange={() => onChange(index, value)}
          checked={isChecked}
        />
        <p className="ml-2 w-full">{label}</p>
      </div>

      {isOther && isChecked && (
        <input
          type="text"
          className="input mt-4 block"
          placeholder="Please specify"
          value={answer?.[0] || ""}
          onChange={(e) => onChange(index, e.target.value)}
        />
      )}
    </label>
  );
};
