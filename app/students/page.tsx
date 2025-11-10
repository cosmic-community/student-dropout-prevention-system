import { cosmic, hasStatus } from '@/lib/cosmic'
import { Student } from '@/types'
import StudentCard from '@/components/StudentCard'
import StudentFilters from '@/components/StudentFilters'

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

export default async function StudentsPage() {
  const students = await getStudents()

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Student Directory</h1>
        <p className="text-lg text-gray-600">
          Comprehensive view of all students with risk assessment and tracking
        </p>
      </div>

      <StudentFilters />

      {students.length === 0 ? (
        <div className="card text-center py-12">
          <p className="text-gray-500">No students found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {students.map((student) => (
            <StudentCard key={student.id} student={student} />
          ))}
        </div>
      )}
    </div>
  )
}