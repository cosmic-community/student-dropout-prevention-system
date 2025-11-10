import { TeacherRecommendation, Student, Teacher } from '@/types'
import { getPriorityColor, getStatusColor, stripHtml, truncateText } from '@/lib/utils'
import { FaUserGraduate, FaChalkboardTeacher, FaClock, FaEye } from 'react-icons/fa'

interface RecommendationCardProps {
  recommendation: TeacherRecommendation
}

export default function RecommendationCard({ recommendation }: RecommendationCardProps) {
  const student = recommendation.metadata.student as Student
  const teacher = recommendation.metadata.teacher as Teacher

  return (
    <div className="card">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 mb-2">{recommendation.title}</h3>
          <div className="flex flex-wrap gap-2 mb-3">
            <span className={`badge ${getStatusColor(recommendation.metadata.status.value)}`}>
              {recommendation.metadata.status.value}
            </span>
            <span className={`badge ${getPriorityColor(recommendation.metadata.priority_level.value)}`}>
              {recommendation.metadata.priority_level.value} Priority
            </span>
            <span className="badge bg-blue-100 text-blue-800 border-blue-300">
              {recommendation.metadata.recommendation_category.value}
            </span>
          </div>
        </div>
      </div>

      {/* Recommendation Text */}
      <div className="text-gray-700 mb-4">
        {truncateText(stripHtml(recommendation.metadata.recommendation_text), 200)}
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
        {recommendation.metadata.suggested_timeline && (
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <FaClock className="text-primary-600" />
            <span>{recommendation.metadata.suggested_timeline.value}</span>
          </div>
        )}
        {recommendation.metadata.visibility && (
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <FaEye className="text-primary-600" />
            <span>{recommendation.metadata.visibility.value}</span>
          </div>
        )}
      </div>

      {/* Rationale (if available) */}
      {recommendation.metadata.rationale && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <h4 className="text-sm font-semibold text-gray-900 mb-2">Rationale</h4>
          <p className="text-sm text-gray-700">{truncateText(recommendation.metadata.rationale, 150)}</p>
        </div>
      )}

      {/* Effectiveness Rating (if available) */}
      {recommendation.metadata.effectiveness_rating && (
        <div className="mt-3 flex items-center gap-2">
          <span className="text-sm font-medium text-gray-700">Effectiveness:</span>
          <span className="text-sm text-gray-600">
            {recommendation.metadata.effectiveness_rating.value}
          </span>
        </div>
      )}
    </div>
  )
}