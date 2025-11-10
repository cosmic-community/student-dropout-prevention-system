import { cosmic, hasStatus } from '@/lib/cosmic'
import { TeacherRecommendation } from '@/types'
import RecommendationCard from '@/components/RecommendationCard'

async function getRecommendations(): Promise<TeacherRecommendation[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'teacher-recommendations' })
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

export default async function RecommendationsPage() {
  const recommendations = await getRecommendations()

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Intervention Recommendations</h1>
        <p className="text-lg text-gray-600">
          Track and manage personalized intervention plans for at-risk students
        </p>
      </div>

      {recommendations.length === 0 ? (
        <div className="card text-center py-12">
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
  )
}