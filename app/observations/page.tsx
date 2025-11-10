import { cosmic, hasStatus } from '@/lib/cosmic'
import { TeacherObservation } from '@/types'
import ObservationCard from '@/components/ObservationCard'

async function getObservations(): Promise<TeacherObservation[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'teacher-observations' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    const observations = response.objects as TeacherObservation[]
    
    // Sort by observation date (newest first)
    return observations.sort((a, b) => {
      const dateA = new Date(a.metadata.observation_date).getTime()
      const dateB = new Date(b.metadata.observation_date).getTime()
      return dateB - dateA
    })
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw error
  }
}

export default async function ObservationsPage() {
  const observations = await getObservations()

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Teacher Observations</h1>
        <p className="text-lg text-gray-600">
          Comprehensive record of classroom observations and student concerns
        </p>
      </div>

      {observations.length === 0 ? (
        <div className="card text-center py-12">
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
  )
}