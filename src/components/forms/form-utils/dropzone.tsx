import React, { useRef, useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { UploadIcon } from 'lucide-react' // Import the upload icon from Lucide

interface DropzoneProps {
  onChange: (newFiles: string[]) => void
  className?: string
  fileExtension?: string
}

export function Dropzone({
  onChange,
  className,
  fileExtension,
  ...props
}: DropzoneProps) {
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
    const uploadedFiles: string[] = Array.from(files).map((file) => URL.createObjectURL(file))

    // Call onChange with the new files
    onChange(uploadedFiles)

    const uploadedFile = files[0]
    const fileSizeInKB = Math.round(uploadedFile.size / 1024)
    setFileInfo(`Uploaded file: ${uploadedFile.name} (${fileSizeInKB} KB)`)
    setError(null)
  }

  const handleDropzoneClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  return (
    <Card
      className={`border-2 border-dashed  hover:cursor-pointer hover:border-muted-foreground/50 ${className}`}
      onClick={handleDropzoneClick}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      {...props}
    >
      <CardContent className="flex flex-col items-center justify-center space-y-4 p-8 rounded-lg ">
        {/* Upload Icon */}
        <UploadIcon className="h-12 w-12 text-muted-foreground" />

        {/* Instruction Text */}
        <div className="text-center">
          <p className="text-lg font-semibold text-muted-foreground">Drag & Drop your files here</p>
          <p className="text-sm text-muted-foreground">or click to browse</p>
        </div>

        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept={fileExtension ? `.${fileExtension}` : undefined} // Restrict file extensions if provided
          onChange={handleFileInputChange}
          className="hidden" // Hide the file input element
          multiple
        />

        {/* File info display */}
        {fileInfo && <p className="text-xs text-muted-foreground">{fileInfo}</p>}
        {error && <span className="text-red-500">{error}</span>}
      </CardContent>
    </Card>
  )
}
