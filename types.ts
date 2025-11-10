// Comprehensive type definitions for Student Dropout Prevention System

// Base Cosmic object interface
export interface CosmicObject {
  id: string
  slug: string
  title: string
  content?: string
  metadata: Record<string, any>
  type: string
  created_at: string
  modified_at: string
  status: string
  thumbnail?: string
  published_at?: string
}

// Select dropdown value types - MUST match content model exactly
export type EnrollmentStatus = 'Active' | 'On Leave' | 'Graduated' | 'Dropped Out'
export type RiskLevel = 'Low' | 'Medium' | 'High' | 'Critical'
export type CourseType = 'Core' | 'Elective' | 'Lab' | 'Project'
export type ObservationType = 'Academic Performance' | 'Behavioral' | 'Attendance' | 'Participation' | 'Assignment Quality'
export type SeverityLevel = 'Positive' | 'Minor Concern' | 'Moderate Concern' | 'Major Concern'
export type RecommendationCategory = 'Academic Support' | 'Study Skills' | 'Time Management' | 'Subject-Specific Help' | 'Peer Learning' | 'Counseling Referral' | 'Extra Classes/Tutoring'
export type PriorityLevel = 'Low' | 'Medium' | 'High' | 'Urgent'
export type SuggestedTimeline = 'Immediate' | '1 week' | '2 weeks' | '1 month' | 'Ongoing'
export type RecommendationStatus = 'Draft' | 'Submitted' | 'Under Review' | 'Approved' | 'In Progress' | 'Completed' | 'On Hold' | 'Cancelled'
export type VisibilityLevel = 'Private' | 'Shared with Counselor' | 'Shared with HOD' | 'Public'
export type EffectivenessRating = 'Very Effective' | 'Effective' | 'Somewhat Effective' | 'Not Effective' | 'Too Early to Tell'

// Student interface
export interface Student extends CosmicObject {
  type: 'students'
  metadata: {
    student_id: string
    full_name: string
    email: string
    department: string
    current_semester: number
    enrollment_status: {
      key: string
      value: EnrollmentStatus
    }
    risk_level: {
      key: string
      value: RiskLevel
    }
    risk_score?: number
    current_gpa?: number
    attendance_percentage?: number
    profile_image?: {
      url: string
      imgix_url: string
    }
    contact_number?: string
    academic_notes?: string
  }
}

// Teacher interface
export interface Teacher extends CosmicObject {
  type: 'teachers'
  metadata: {
    teacher_id: string
    full_name: string
    email: string
    department: string
    designation?: string
    specialization?: string
    contact_number?: string
    office_location?: string
    profile_photo?: {
      url: string
      imgix_url: string
    }
    active_status?: boolean
  }
}

// Subject interface
export interface Subject extends CosmicObject {
  type: 'subjects'
  metadata: {
    subject_code: string
    subject_name: string
    department: string
    semester?: number
    credits?: number
    course_type?: {
      key: string
      value: CourseType
    }
    teacher?: Teacher | string
  }
}

// Teacher Observation interface
export interface TeacherObservation extends CosmicObject {
  type: 'teacher-observations'
  metadata: {
    student: Student | string
    teacher: Teacher | string
    subject?: Subject | string
    observation_date: string
    observation_type: {
      key: string
      value: ObservationType
    }
    severity: {
      key: string
      value: SeverityLevel
    }
    observation_details: string
    follow_up_required?: boolean
    tags?: string
    private_notes?: string
  }
}

// Teacher Recommendation interface
export interface TeacherRecommendation extends CosmicObject {
  type: 'teacher-recommendations'
  metadata: {
    student: Student | string
    teacher: Teacher | string
    related_observation?: TeacherObservation | string
    subject_context?: Subject | string
    recommendation_category: {
      key: string
      value: RecommendationCategory
    }
    priority_level: {
      key: string
      value: PriorityLevel
    }
    recommendation_text: string
    rationale?: string
    expected_outcome?: string
    suggested_timeline?: {
      key: string
      value: SuggestedTimeline
    }
    status: {
      key: string
      value: RecommendationStatus
    }
    visibility?: {
      key: string
      value: VisibilityLevel
    }
    progress_notes?: string
    effectiveness_rating?: {
      key: string
      value: EffectivenessRating
    }
  }
}

// API response types
export interface CosmicResponse<T> {
  objects: T[]
  total: number
}

// Type guards
export function isStudent(obj: CosmicObject): obj is Student {
  return obj.type === 'students'
}

export function isTeacher(obj: CosmicObject): obj is Teacher {
  return obj.type === 'teachers'
}

export function isSubject(obj: CosmicObject): obj is Subject {
  return obj.type === 'subjects'
}

export function isObservation(obj: CosmicObject): obj is TeacherObservation {
  return obj.type === 'teacher-observations'
}

export function isRecommendation(obj: CosmicObject): obj is TeacherRecommendation {
  return obj.type === 'teacher-recommendations'
}

// Helper type for creating new objects (omits generated fields)
export type CreateStudentData = Omit<Student, 'id' | 'created_at' | 'modified_at' | 'status' | 'published_at'>
export type CreateObservationData = Omit<TeacherObservation, 'id' | 'created_at' | 'modified_at' | 'status' | 'published_at'>
export type CreateRecommendationData = Omit<TeacherRecommendation, 'id' | 'created_at' | 'modified_at' | 'status' | 'published_at'>