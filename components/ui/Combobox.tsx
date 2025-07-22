import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export interface ComboboxOption {
  value: string;
  label: string;
  emoji?: string;
  color?: string;
}

interface ComboboxProps {
  options: ComboboxOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  allowCustomValue?: boolean;
  inputValue?: string;
  onInputValueChange?: (value: string) => void;
  disabledOptions?: string[];
}

export const Combobox: React.FC<ComboboxProps> = ({
  options,
  value,
  onChange,
  placeholder = "בחר...",
  allowCustomValue = true,
  inputValue,
  onInputValueChange,
  disabledOptions = [],
}) => {
  const [open, setOpen] = React.useState(false);
  const [internalInput, setInternalInput] = React.useState("");
  const input = inputValue !== undefined ? inputValue : internalInput;

  const handleInputChange = (val: string) => {
    if (onInputValueChange) onInputValueChange(val);
    else setInternalInput(val);
  };

  const handleSelect = (val: string) => {
    onChange(val);
    setOpen(false);
    handleInputChange("");
  };

  const filteredOptions = options.filter(
    (opt) =>
      opt.label.toLowerCase().includes(input.toLowerCase()) &&
      !disabledOptions.includes(opt.value)
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full min-w-0 justify-between"
        >
          {value
            ? options.find((opt) => opt.value === value)?.label || value
            : placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-full min-w-0 p-0 max-h-72 overflow-y-auto text-right rtl:text-right"
        align="start"
      >
        <Command>
          <CommandInput
            placeholder={placeholder}
            value={input}
            onChange={(e) => handleInputChange(e.target.value)}
            className="h-9"
          />
          <CommandList>
            <CommandEmpty>לא נמצאו אפשרויות.</CommandEmpty>
            <CommandGroup>
              {filteredOptions.map((opt) => (
                <CommandItem
                  key={opt.value}
                  value={opt.value}
                  onSelect={() => handleSelect(opt.value)}
                  disabled={disabledOptions.includes(opt.value)}
                  className="flex items-center justify-between"
                >
                  <span className="flex items-center">
                    {opt.emoji && <span className="mr-1">{opt.emoji}</span>}
                    {opt.label}
                  </span>
                  {value === opt.value && (
                    <Check className="ml-2 rtl:mr-2 opacity-100" />
                  )}
                </CommandItem>
              ))}
              {allowCustomValue &&
                input &&
                !options.some((opt) => opt.label === input) && (
                  <CommandItem
                    key={input}
                    value={input}
                    onSelect={() => handleSelect(input)}
                  >
                    {input}
                  </CommandItem>
                )}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
