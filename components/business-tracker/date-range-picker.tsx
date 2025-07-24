"use client"
import { useState } from "react"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { DateRange } from "@/contexts/business-tracker-context"

interface DateRangePickerProps {
  dateRange: DateRange
  setDateRange: (range: DateRange) => void
  customDateRange: { start: string; end: string }
  setCustomDateRange: (range: { start: string; end: string }) => void
}

export function DateRangePicker({
  dateRange,
  setDateRange,
  customDateRange,
  setCustomDateRange,
}: DateRangePickerProps) {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)
  const [date, setDate] = useState<Date | undefined>(
    customDateRange.start ? new Date(customDateRange.start) : undefined,
  )

  const handleDateSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate)
    if (selectedDate) {
      const formattedDate = format(selectedDate, "yyyy-MM-dd")
      setCustomDateRange({
        ...customDateRange,
        start: formattedDate,
      })
    }
  }

  const handleRangeChange = (value: string) => {
    setDateRange(value as DateRange)
  }

  return (
    <div className="flex items-center space-x-2">
      <Select value={dateRange} onValueChange={handleRangeChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select date range" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="today">Today</SelectItem>
          <SelectItem value="week">Last 7 days</SelectItem>
          <SelectItem value="month">Last 30 days</SelectItem>
          <SelectItem value="quarter">Last 90 days</SelectItem>
          <SelectItem value="year">Last 365 days</SelectItem>
          <SelectItem value="custom">Custom range</SelectItem>
        </SelectContent>
      </Select>

      {dateRange === "custom" && (
        <div className="flex items-center space-x-2">
          <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn("w-[180px] justify-start text-left font-normal", !date && "text-muted-foreground")}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar mode="single" selected={date} onSelect={handleDateSelect} initialFocus />
            </PopoverContent>
          </Popover>
        </div>
      )}
    </div>
  )
}
