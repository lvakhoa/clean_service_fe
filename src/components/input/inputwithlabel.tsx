import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Key } from 'lucide-react';
interface InputWithLabelProps {
  labelText: string;
  inputType: string;
  inputPlaceholder: string;
  inputId: string;
  inputWidth?: string;
  options?: string[];
  defaulValue?: string;
  setValue?: (value: string) => void;
  plusPX?: string;
}

export function InputWithLabel({
  labelText,
  inputType,
  inputPlaceholder,
  inputId,
  inputWidth = 'w-full',
  options = [],
  defaulValue,
  setValue,
  plusPX,
}: InputWithLabelProps) {
  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue && setValue(e.target.value);
  };

  return (
    <div className="grid max-w-max items-center gap-1.5">
      <Label
        className="text-[14px] font-Averta-Semibold text-[#9FA7B0]"
        htmlFor={inputId}
      >
        {labelText}
      </Label>
      {inputType === 'combobox' ? (
        <Select defaultValue={defaulValue}>
          <SelectTrigger
            className={`${inputWidth} font-Averta-Regular h-[50px] text-[16px] text-[#5f6367] border-2`}
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
          value={defaulValue}
          onChange={handleChangeValue}
          className={`font-Averta-Regular h-[50px] text-[16px] text-[#5f6367] border-2 focus-visible:border-[#1A78F2] focus-visible:ring-[#1A78F2]`}
          type={inputType}
          id={inputId}
          placeholder={inputPlaceholder}
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
