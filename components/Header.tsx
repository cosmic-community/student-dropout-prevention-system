import Link from 'next/link'
import { FaGraduationCap, FaClipboardList, FaLightbulb, FaUsers } from 'react-icons/fa'

export default function Header() {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div className="p-2 bg-primary-600 rounded-lg">
              <FaGraduationCap className="text-2xl text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Dropout Prevention</h1>
              <p className="text-xs text-gray-600">Student Support System</p>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link 
              href="/students" 
              className="flex items-center gap-2 text-gray-700 hover:text-primary-600 transition-colors"
            >
              <FaUsers className="text-lg" />
              <span className="font-medium">Students</span>
            </Link>
            <Link 
              href="/observations" 
              className="flex items-center gap-2 text-gray-700 hover:text-primary-600 transition-colors"
            >
              <FaClipboardList className="text-lg" />
              <span className="font-medium">Observations</span>
            </Link>
            <Link 
              href="/recommendations" 
              className="flex items-center gap-2 text-gray-700 hover:text-primary-600 transition-colors"
            >
              <FaLightbulb className="text-lg" />
              <span className="font-medium">Interventions</span>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}