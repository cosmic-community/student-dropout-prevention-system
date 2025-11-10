export default function LoadingSpinner({ size = 'medium' }: { size?: 'small' | 'medium' | 'large' }) {
  const sizeClasses = {
    small: 'h-6 w-6 border-2',
    medium: 'h-12 w-12 border-4',
    large: 'h-16 w-16 border-4'
  }

  return (
    <div className="flex items-center justify-center">
      <div className={`inline-block animate-spin rounded-full border-gray-300 border-t-primary-600 ${sizeClasses[size]}`}></div>
    </div>
  )
}