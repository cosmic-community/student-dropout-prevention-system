import { RiskLevel, SeverityLevel, PriorityLevel, RecommendationStatus } from '@/types'

// Get risk level color classes
export function getRiskLevelColor(riskLevel: RiskLevel): string {
  const colors = {
    'Low': 'bg-success-100 text-success-800 border-success-300',
    'Medium': 'bg-warning-100 text-warning-800 border-warning-300',
    'High': 'bg-orange-100 text-orange-800 border-orange-300',
    'Critical': 'bg-danger-100 text-danger-800 border-danger-300',
  }
  return colors[riskLevel] || 'bg-gray-100 text-gray-800 border-gray-300'
}

// Get severity level color classes
export function getSeverityColor(severity: SeverityLevel): string {
  const colors = {
    'Positive': 'bg-success-100 text-success-800 border-success-300',
    'Minor Concern': 'bg-blue-100 text-blue-800 border-blue-300',
    'Moderate Concern': 'bg-warning-100 text-warning-800 border-warning-300',
    'Major Concern': 'bg-danger-100 text-danger-800 border-danger-300',
  }
  return colors[severity] || 'bg-gray-100 text-gray-800 border-gray-300'
}

// Get priority level color classes
export function getPriorityColor(priority: PriorityLevel): string {
  const colors = {
    'Low': 'bg-gray-100 text-gray-800 border-gray-300',
    'Medium': 'bg-blue-100 text-blue-800 border-blue-300',
    'High': 'bg-orange-100 text-orange-800 border-orange-300',
    'Urgent': 'bg-danger-100 text-danger-800 border-danger-300',
  }
  return colors[priority] || 'bg-gray-100 text-gray-800 border-gray-300'
}

// Get status color classes
export function getStatusColor(status: RecommendationStatus): string {
  const colors = {
    'Draft': 'bg-gray-100 text-gray-800 border-gray-300',
    'Submitted': 'bg-blue-100 text-blue-800 border-blue-300',
    'Under Review': 'bg-warning-100 text-warning-800 border-warning-300',
    'Approved': 'bg-success-100 text-success-800 border-success-300',
    'In Progress': 'bg-primary-100 text-primary-800 border-primary-300',
    'Completed': 'bg-success-100 text-success-800 border-success-300',
    'On Hold': 'bg-orange-100 text-orange-800 border-orange-300',
    'Cancelled': 'bg-danger-100 text-danger-800 border-danger-300',
  }
  return colors[status] || 'bg-gray-100 text-gray-800 border-gray-300'
}

// Format date to readable string
export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

// Calculate days ago
export function getDaysAgo(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()
  const diffTime = Math.abs(now.getTime() - date.getTime())
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  
  if (diffDays === 0) return 'Today'
  if (diffDays === 1) return 'Yesterday'
  if (diffDays < 7) return `${diffDays} days ago`
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`
  return `${Math.floor(diffDays / 30)} months ago`
}

// Truncate text with ellipsis
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength) + '...'
}

// Strip HTML tags from text
export function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '')
}