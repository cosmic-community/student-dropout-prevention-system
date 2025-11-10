import Link from 'next/link'
import { FaHome } from 'react-icons/fa'

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="card text-center py-12">
        <h2 className="text-6xl font-bold text-gray-900 mb-4">404</h2>
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Page Not Found</h3>
        <p className="text-gray-600 mb-6">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link href="/" className="btn btn-primary inline-flex items-center gap-2">
          <FaHome />
          Return Home
        </Link>
      </div>
    </div>
  )
}