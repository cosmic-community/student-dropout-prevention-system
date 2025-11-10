import Link from 'next/link'
import { Student } from '@/types'
import { getRiskLevelColor } from '@/lib/utils'
import { FaGraduationCap, FaChartLine, FaCalendarCheck } from 'react-icons/fa'

interface StudentCardProps {
  student: Student
}

export default function StudentCard({ student }: StudentCardProps) {
  return (
    <Link href={`/students/${student.slug}`}>
      <div className="card hover:shadow-md transition-shadow cursor-pointer">
        <div className="flex items-start gap-4 mb-4">
          {/* Profile Image */}
          {student.metadata.profile_image?.imgix_url ? (
            <img
              src={`${student.metadata.profile_image.imgix_url}?w=100&h=100&fit=crop&auto=format,compress`}
              alt={student.metadata.full_name}
              className="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
              width={64}
              height={64}
            />
          ) : (
            <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
              <FaGraduationCap className="text-2xl text-gray-400" />
            </div>
          )}

          {/* Info */}
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 truncate mb-1">
              {student.metadata.full_name}
            </h3>
            <p className="text-sm text-gray-600 mb-2">
              {student.metadata.student_id}
            </p>
            <span className={`badge ${getRiskLevelColor(student.metadata.risk_level.value)}`}>
              {student.metadata.risk_level.value} Risk
            </span>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 pt-4 border-t border-gray-200">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-gray-600 mb-1">
              <FaChartLine className="text-xs" />
              <span className="text-xs">GPA</span>
            </div>
            <p className="text-sm font-semibold text-gray-900">
              {student.metadata.current_gpa?.toFixed(2) || 'N/A'}
            </p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-gray-600 mb-1">
              <FaCalendarCheck className="text-xs" />
              <span className="text-xs">Attend</span>
            </div>
            <p className="text-sm font-semibold text-gray-900">
              {student.metadata.attendance_percentage || 0}%
            </p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-gray-600 mb-1">
              <FaGraduationCap className="text-xs" />
              <span className="text-xs">Sem</span>
            </div>
            <p className="text-sm font-semibold text-gray-900">
              {student.metadata.current_semester}
            </p>
          </div>
        </div>
      </div>
    </Link>
  )
}