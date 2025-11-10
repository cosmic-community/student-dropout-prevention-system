import { cosmic, hasStatus } from '@/lib/cosmic'
import { Student, TeacherObservation, TeacherRecommendation } from '@/types'
import StudentCard from '@/components/StudentCard'
import StatsCard from '@/components/StatsCard'
import { FaGraduationCap, FaExclamationTriangle, FaClipboardList, FaLightbulb } from 'react-icons/fa'
import Link from 'next/link'

async function getStudents(): Promise<Student[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'students' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    return (response.objects as Student[]).sort((a, b) => 
      (b.metadata.risk_score || 0) - (a.metadata.risk_score || 0)
    )
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw error
  }
}

async function getObservations(): Promise<TeacherObservation[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'teacher-observations' })
      .props(['id', 'title', 'metadata'])
      .depth(0)
    
    return response.objects as TeacherObservation[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw error
  }
}

async function getRecommendations(): Promise<TeacherRecommendation[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'teacher-recommendations' })
      .props(['id', 'title', 'metadata'])
      .depth(0)
    
    return response.objects as TeacherRecommendation[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw error
  }
}

export default async function HomePage() {
  const [students, observations, recommendations] = await Promise.all([
    getStudents(),
    getObservations(),
    getRecommendations()
  ])

  const highRiskStudents = students.filter(s => 
    s.metadata.risk_level?.value === 'High' || s.metadata.risk_level?.value === 'Critical'
  )

  const activeRecommendations = recommendations.filter(r => 
    r.metadata.status?.value === 'In Progress' || r.metadata.status?.value === 'Approved'
  )

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Student Dropout Prevention System
        </h1>
        <p className="text-lg text-gray-600">
          Proactive intervention system to support at-risk students and improve retention
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="Total Students"
          value={students.length}
          icon={<FaGraduationCap />}
          color="blue"
        />
        <StatsCard
          title="High-Risk Students"
          value={highRiskStudents.length}
          icon={<FaExclamationTriangle />}
          color="red"
        />
        <StatsCard
          title="Total Observations"
          value={observations.length}
          icon={<FaClipboardList />}
          color="purple"
        />
        <StatsCard
          title="Active Interventions"
          value={activeRecommendations.length}
          icon={<FaLightbulb />}
          color="green"
        />
      </div>

      {/* High-Risk Students Section */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-900">High-Risk Students</h2>
          <Link href="/students" className="text-primary-600 hover:text-primary-700 font-medium">
            View All Students →
          </Link>
        </div>
        
        {highRiskStudents.length === 0 ? (
          <div className="card text-center py-12">
            <p className="text-gray-500">No high-risk students found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {highRiskStudents.slice(0, 6).map((student) => (
              <StudentCard key={student.id} student={student} />
            ))}
          </div>
        )}
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link href="/observations" className="card hover:shadow-md transition-shadow">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-100 rounded-lg">
              <FaClipboardList className="text-2xl text-purple-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">View Observations</h3>
              <p className="text-sm text-gray-600">Review teacher observations</p>
            </div>
          </div>
        </Link>

        <Link href="/recommendations" className="card hover:shadow-md transition-shadow">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <FaLightbulb className="text-2xl text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">View Recommendations</h3>
              <p className="text-sm text-gray-600">Track intervention plans</p>
            </div>
          </div>
        </Link>

        <Link href="/students" className="card hover:shadow-md transition-shadow">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <FaGraduationCap className="text-2xl text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Student Directory</h3>
              <p className="text-sm text-gray-600">View all student profiles</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  )
}