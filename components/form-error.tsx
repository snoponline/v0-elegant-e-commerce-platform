import { AlertCircle } from "lucide-react"

interface FormErrorProps {
  message?: string
  errors?: Array<{ field: string; message: string }>
}

export function FormError({ message, errors }: FormErrorProps) {
  if (!message && (!errors || errors.length === 0)) {
    return null
  }

  return (
    <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 flex gap-3">
      <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
      <div className="text-sm text-destructive">
        {message && <p className="font-semibold">{message}</p>}
        {errors && errors.length > 0 && (
          <ul className="list-disc list-inside mt-1">
            {errors.map((error, idx) => (
              <li key={idx}>{error.message}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
