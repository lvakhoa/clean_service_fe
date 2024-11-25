import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Key } from "lucide-react";
interface InputWithLabelProps {
  labelText: string;
  inputType: string;
  inputPlaceholder: string;
  inputId: string;
  inputWidth?: string;
  options?: string[];
  value?: string;
  setValue?: (value: string) => void;
  defaultValue?: string;
  plusPX?: string;
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
  onValueChange?: (value: string) => void;
  error?: string;
}

export function InputWithLabel({
  labelText,
  inputType,
  inputPlaceholder,
  inputId,
  inputWidth = "w-full",
  options = [],
  setValue,
  defaultValue,
  value,
  plusPX,
  onChange,
  onValueChange,
  error,
}: InputWithLabelProps) {
  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue && setValue(e.target.value);
  };

  return (
    <div className="grid max-w-max items-center gap-1.5">
      <Label
        className="font-Averta-Semibold text-[14px] text-[#9FA7B0]"
        htmlFor={inputId}
      >
        {labelText}
      </Label>
      {inputType === "combobox" ? (
        <Select defaultValue={defaultValue} onValueChange={onValueChange}>
          <SelectTrigger
            className={`${inputWidth} h-[50px] border-2 font-Averta-Semibold text-[16px] text-[#5f6367]`}
            style={{ width: `${inputWidth}` }}
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {options.map((option, index) => (
                <SelectItem key={index} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      ) : (
        <>
          <Input
            className={`h-[50px] border-2 font-Averta-Semibold text-[16px] text-[#5f6367]`}
            type={inputType}
            id={inputId}
            placeholder={inputPlaceholder}
            defaultValue={defaultValue}
            onChange={onChange}
            style={
              plusPX
                ? { width: `calc(${inputWidth} + ${plusPX})` }
                : { width: `${inputWidth}` }
            }
          />
          {error && <p className="text-sm text-red-500">{error}</p>}
        </>
      )}
    </div>
  );
}
