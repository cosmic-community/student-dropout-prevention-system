import { FaExclamationTriangle } from 'react-icons/fa'

interface ErrorMessageProps {
  message?: string
  onRetry?: () => void
}

export default function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <div className="card text-center py-8">
      <div className="flex justify-center mb-4">
        <div className="p-3 bg-red-100 rounded-full">
          <FaExclamationTriangle className="text-3xl text-red-600" />
        </div>
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">Something went wrong</h3>
      <p className="text-gray-600 mb-4">{message || 'An unexpected error occurred'}</p>
      {onRetry && (
        <button onClick={onRetry} className="btn btn-primary">
          Try Again
        </button>
      )}
    </div>
  )
}