'use client'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'


const CustomSelect = ({ label, placeholder, value, options, onChange }: any) => (
    <div className="space-y-2">
      <label className="font-semibold text-lg">{label}</label>
      <Select onValueChange={onChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder={value || placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option: any) => (
            <SelectItem key={option} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
  

  export default CustomSelect