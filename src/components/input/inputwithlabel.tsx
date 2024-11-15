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
  defaultValue?: string;
  plusPX?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
  onValueChange?: (value: string) => void
}

export function InputWithLabel({
  labelText,
  inputType,
  inputPlaceholder,
  inputId,
  inputWidth = "w-full",
  options = [],
  defaultValue,
  plusPX,
  onChange,
  onValueChange
}: InputWithLabelProps) {
  return (
    <div className="grid max-w-max items-center gap-1.5">
      <Label
        className="text-[14px] font-Averta-Semibold text-[#9FA7B0]"
        htmlFor={inputId}
      >
        {labelText}
      </Label>
      {inputType === "combobox" ? (
        <Select defaultValue={defaultValue} onValueChange={onValueChange}>
          <SelectTrigger
            className={`${inputWidth} font-Averta-Semibold h-[50px] text-[16px] text-[#5f6367] border-2`}
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
        <Input
          className={`font-Averta-Semibold h-[50px] text-[16px] text-[#5f6367] border-2`}
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
      )}
    </div>
  );
}
