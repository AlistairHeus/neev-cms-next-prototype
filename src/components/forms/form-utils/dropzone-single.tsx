import React, { useRef, useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { UploadIcon } from 'lucide-react'

interface DropzoneSingleProps {
  onChange: (newFile: string) => void // Expect a single file string (URL)
  className?: string
  fileExtension?: string
}

export function DropzoneSingle({
  onChange,
  className,
  fileExtension,
  ...props
}: DropzoneSingleProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const [fileInfo, setFileInfo] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    const { files } = e.dataTransfer
    handleFiles(files)
  }

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target
    if (files) {
      handleFiles(files)
    }
  }

  const handleFiles = (files: FileList) => {
    const uploadedFile = URL.createObjectURL(files[0])
    onChange(uploadedFile) // Return a single file

    const fileSizeInKB = Math.round(files[0].size / 1024)
    setFileInfo(`Uploaded file: ${files[0].name} (${fileSizeInKB} KB)`)
    setError(null)
  }

  const handleDropzoneClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  return (
    <Card
      className={`border-2 border-dashed hover:cursor-pointer hover:border-muted-foreground/50 ${className}`}
      onClick={handleDropzoneClick}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      {...props}
    >
      <CardContent className="flex flex-col items-center justify-center space-y-4 p-8 rounded-lg ">
        <UploadIcon className="h-12 w-12 text-muted-foreground" />
        <div className="text-center">
          <p className="text-lg font-semibold text-muted-foreground">Drag & Drop your file here</p>
          <p className="text-sm text-muted-foreground">or click to browse</p>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept={fileExtension ? `.${fileExtension}` : undefined}
          onChange={handleFileInputChange}
          className="hidden"
        />
        {fileInfo && <p className="text-xs text-muted-foreground">{fileInfo}</p>}
        {error && <span className="text-red-500">{error}</span>}
      </CardContent>
    </Card>
  )
}
