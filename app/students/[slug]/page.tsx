// app/students/[slug]/page.tsx
import { cosmic, hasStatus } from '@/lib/cosmic'
import { Student, TeacherObservation, TeacherRecommendation } from '@/types'
import { getRiskLevelColor, formatDate } from '@/lib/utils'
import ObservationCard from '@/components/ObservationCard'
import RecommendationCard from '@/components/RecommendationCard'
import { FaEnvelope, FaPhone, FaGraduationCap, FaChartLine, FaCalendar } from 'react-icons/fa'

async function getStudent(slug: string): Promise<Student | null> {
  try {
    const response = await cosmic.objects.findOne({
      type: 'students',
      slug
    }).props(['id', 'title', 'slug', 'metadata']).depth(1)
    
    return response.object as Student
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    throw error
  }
}

async function getStudentObservations(studentId: string): Promise<TeacherObservation[]> {
  try {
    const response = await cosmic.objects
      .find({ 
        type: 'teacher-observations',
        'metadata.student': studentId
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    return response.objects as TeacherObservation[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw error
  }
}

async function getStudentRecommendations(studentId: string): Promise<TeacherRecommendation[]> {
  try {
    const response = await cosmic.objects
      .find({ 
        type: 'teacher-recommendations',
        'metadata.student': studentId
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    return response.objects as TeacherRecommendation[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw error
  }
}

export default async function StudentDetailPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params
  const student = await getStudent(slug)

  if (!student) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="card text-center py-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Student Not Found</h2>
          <p className="text-gray-600">The requested student could not be found.</p>
        </div>
      </div>
    )
  }

  const [observations, recommendations] = await Promise.all([
    getStudentObservations(student.id),
    getStudentRecommendations(student.id)
  ])

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Student Profile Header */}
      <div className="card mb-8">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Profile Image */}
          <div className="flex-shrink-0">
            {student.metadata.profile_image?.imgix_url ? (
              <img
                src={`${student.metadata.profile_image.imgix_url}?w=200&h=200&fit=crop&auto=format,compress`}
                alt={student.metadata.full_name}
                className="w-32 h-32 rounded-full object-cover border-4 border-gray-200"
                width={128}
                height={128}
              />
            ) : (
              <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center">
                <FaGraduationCap className="text-4xl text-gray-400" />
              </div>
            )}
          </div>

          {/* Profile Info */}
          <div className="flex-1">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-1">
                  {student.metadata.full_name}
                </h1>
                <p className="text-gray-600">Student ID: {student.metadata.student_id}</p>
              </div>
              <span className={`badge ${getRiskLevelColor(student.metadata.risk_level.value)}`}>
                {student.metadata.risk_level.value} Risk
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="flex items-center gap-2 text-gray-700">
                <FaEnvelope className="text-gray-400" />
                <span>{student.metadata.email}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <FaPhone className="text-gray-400" />
                <span>{student.metadata.contact_number || 'Not provided'}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <FaGraduationCap className="text-gray-400" />
                <span>{student.metadata.department} - Semester {student.metadata.current_semester}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <FaChartLine className="text-gray-400" />
                <span>Risk Score: {student.metadata.risk_score || 'N/A'}</span>
              </div>
            </div>

            {/* Academic Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="text-sm text-gray-600 mb-1">Current GPA</p>
                <p className="text-2xl font-bold text-gray-900">
                  {student.metadata.current_gpa?.toFixed(2) || 'N/A'}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Attendance</p>
                <p className="text-2xl font-bold text-gray-900">
                  {student.metadata.attendance_percentage || 0}%
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Observations</p>
                <p className="text-2xl font-bold text-gray-900">{observations.length}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Interventions</p>
                <p className="text-2xl font-bold text-gray-900">{recommendations.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Academic Notes */}
        {student.metadata.academic_notes && (
          <div className="mt-6 pt-6 border-t border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-2">Academic Notes</h3>
            <p className="text-gray-700">{student.metadata.academic_notes}</p>
          </div>
        )}
      </div>

      {/* Observations Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Teacher Observations</h2>
        {observations.length === 0 ? (
          <div className="card text-center py-8">
            <p className="text-gray-500">No observations recorded yet</p>
          </div>
        ) : (
          <div className="space-y-4">
            {observations.map((observation) => (
              <ObservationCard key={observation.id} observation={observation} />
            ))}
          </div>
        )}
      </div>

      {/* Recommendations Section */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Intervention Recommendations</h2>
        {recommendations.length === 0 ? (
          <div className="card text-center py-8">
            <p className="text-gray-500">No recommendations created yet</p>
          </div>
        ) : (
          <div className="space-y-4">
            {recommendations.map((recommendation) => (
              <RecommendationCard key={recommendation.id} recommendation={recommendation} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}