
import * as React from "react"
import { Check, ChevronDown, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

interface MultiSelectProps {
  options: string[]
  selected: string[]
  onSelectionChange: (selected: string[]) => void
  placeholder?: string
  className?: string
}

export function MultiSelect({
  options,
  selected,
  onSelectionChange,
  placeholder = "Select items...",
  className
}: MultiSelectProps) {
  const handleSelect = (option: string) => {
    if (selected.includes(option)) {
      onSelectionChange(selected.filter(item => item !== option))
    } else {
      onSelectionChange([...selected, option])
    }
  }

  const removeItem = (item: string) => {
    onSelectionChange(selected.filter(selected => selected !== item))
  }

  return (
    <div className={cn("w-full", className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="w-full justify-between h-auto min-h-10 px-3 py-2"
          >
            <div className="flex flex-wrap gap-1 flex-1">
              {selected.length === 0 ? (
                <span className="text-muted-foreground">{placeholder}</span>
              ) : (
                selected.map((item) => (
                  <Badge
                    key={item}
                    variant="secondary"
                    className="text-xs mr-1 mb-1"
                  >
                    {item}
                    <X
                      className="ml-1 h-3 w-3 cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation()
                        removeItem(item)
                      }}
                    />
                  </Badge>
                ))
              )}
            </div>
            <ChevronDown className="h-4 w-4 opacity-50 flex-shrink-0" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-full min-w-[var(--radix-dropdown-menu-trigger-width)]">
          {options.map((option) => (
            <DropdownMenuItem
              key={option}
              className="cursor-pointer"
              onSelect={() => handleSelect(option)}
            >
              <div className="flex items-center space-x-2 w-full">
                <div className="flex h-4 w-4 items-center justify-center">
                  {selected.includes(option) && <Check className="h-4 w-4" />}
                </div>
                <span className="flex-1">{option}</span>
              </div>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
