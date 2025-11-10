import { TeacherObservation, Student, Teacher, Subject } from '@/types'
import { getSeverityColor, formatDate, stripHtml, truncateText } from '@/lib/utils'
import { FaCalendar, FaUserGraduate, FaChalkboardTeacher, FaBook } from 'react-icons/fa'

interface ObservationCardProps {
  observation: TeacherObservation
}

export default function ObservationCard({ observation }: ObservationCardProps) {
  const student = observation.metadata.student as Student
  const teacher = observation.metadata.teacher as Teacher
  const subject = observation.metadata.subject as Subject | undefined

  return (
    <div className="card">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 mb-2">{observation.title}</h3>
          <div className="flex flex-wrap gap-2 mb-3">
            <span className={`badge ${getSeverityColor(observation.metadata.severity.value)}`}>
              {observation.metadata.severity.value}
            </span>
            <span className="badge bg-purple-100 text-purple-800 border-purple-300">
              {observation.metadata.observation_type.value}
            </span>
          </div>
        </div>
      </div>

      {/* Observation Details */}
      <div className="text-gray-700 mb-4">
        {truncateText(stripHtml(observation.metadata.observation_details), 200)}
      </div>

      {/* Meta Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-gray-200">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <FaUserGraduate className="text-primary-600" />
          <span>{student?.title || 'Unknown Student'}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <FaChalkboardTeacher className="text-primary-600" />
          <span>{teacher?.metadata?.full_name || 'Unknown Teacher'}</span>
        </div>
        {subject && (
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <FaBook className="text-primary-600" />
            <span>{subject.metadata.subject_name}</span>
          </div>
        )}
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <FaCalendar className="text-primary-600" />
          <span>{formatDate(observation.metadata.observation_date)}</span>
        </div>
      </div>

      {/* Tags */}
      {observation.metadata.tags && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex flex-wrap gap-2">
            {observation.metadata.tags.split(',').map((tag, index) => (
              <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                {tag.trim()}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}