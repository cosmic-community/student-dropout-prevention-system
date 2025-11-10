# 🎓 Student Dropout Prevention System

![App Preview](https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1200&h=300&fit=crop&auto=format)

A comprehensive web application for educational institutions to identify at-risk students and implement targeted interventions through teacher observations and smart recommendations.

## ✨ Features

- **Student Risk Dashboard** - Visual overview of students with risk levels, GPA, and attendance tracking
- **Teacher Observation System** - Detailed logging of academic, behavioral, and attendance concerns
- **Smart Recommendations Engine** - Category-based intervention suggestions (Academic, Financial, Emotional, Time Management, Peer Support)
- **Progress Tracking** - Monitor recommendation status and effectiveness ratings
- **Multi-level Access Control** - Private, counselor-shared, HOD-shared, and public visibility options
- **Subject Integration** - Link observations and recommendations to specific courses
- **Responsive Design** - Mobile-friendly interface for on-the-go access
- **Real-time Updates** - Powered by Cosmic CMS for instant content synchronization

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=69118528fb7423bbdde4fd7d&clone_repository=69118904fb7423bbdde4fdc7)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Academic	""Enroll in remedial math course", "Watch curated YouTube lectures""	Use subject-wise performance and attendance
Financial	""Apply for Merit-cum-Means Scholarship", "Contact financial aid office""	Match to institution's aid option
Emotional / Psychological	""Book counseling session for stress", "Join mindfulness club""	Based on counselor report keywords
Social / Peer	""Join peer study group", "Mentorship by topper student""	Based on department data
          Time Management	""Use Pomodoro study planner", "Attend productivity workshop""	Triggered when low attendance + high workload

Types of Recommendations
Category
Example Recommendations
How to GenerateExample Scenario
1.  AI → predicts Student Riya = High dropout risk.
2.  Counselor → talks to Riya, uploads report: "Financial stress + part-time job."
3.  AI Engine → auto-suggests:
Apply for scholarship
Join flexible timetable program
Connect to student welfare officer
4.  Teacher → reviews and approves 2 out of 3 suggestions
5.  System → marks them as "Intervention in progress.""

### Code Generation Prompt

> "Based on the content model I created for "Academic	""Enroll in remedial math course", "Watch curated YouTube lectures""	Use subject-wise performance and attendance
Financial	""Apply for Merit-cum-Means Scholarship", "Contact financial aid office""	Match to institution's aid option
Emotional / Psychological	""Book counseling session for stress", "Join mindfulness club""	Based on counselor report keywords
Social / Peer	""Join peer study group", "Mentorship by topper student""	Based on department data
          Time Management	""Use Pomodoro study planner", "Attend productivity workshop""	Triggered when low attendance + high workload

Types of Recommendations
Category
Example Recommendations
How to GenerateExample Scenario
1.  AI → predicts Student Riya = High dropout risk.
2.  Counselor → talks to Riya, uploads report: "Financial stress + part-time job."
3.  AI Engine → auto-suggests:
Apply for scholarship
Join flexible timetable program
Connect to student welfare officer
4.  Teacher → reviews and approves 2 out of 3 suggestions
5.  System → marks them as "Intervention in progress."", now build a complete web application that showcases this content. Include a modern, responsive design with proper navigation, content display, and user-friendly interface."

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## 🛠️ Technologies Used

- **Next.js 16** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Cosmic CMS** - Headless CMS for content management
- **React Icons** - Icon library
- **Bun** - Fast package manager and runtime

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ or Bun installed
- A Cosmic account with your bucket set up

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd student-dropout-prevention
```

2. Install dependencies:
```bash
bun install
```

3. Set up environment variables:

Create a `.env.local` file in the root directory:

```env
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

4. Run the development server:
```bash
bun run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📚 Cosmic SDK Examples

### Fetching Students with Risk Levels

```typescript
import { cosmic } from '@/lib/cosmic'

// Get all high-risk students
const { objects: students } = await cosmic.objects
  .find({
    type: 'students',
    'metadata.risk_level.key': 'high'
  })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)

// Sort by risk score
const sortedStudents = students.sort((a, b) => 
  (b.metadata.risk_score || 0) - (a.metadata.risk_score || 0)
)
```

### Creating Teacher Observations

```typescript
// Create a new observation
await cosmic.objects.insertOne({
  title: `Math Performance Concern - ${studentName}`,
  type: 'teacher-observations',
  metadata: {
    student: studentId, // Object ID
    teacher: teacherId, // Object ID
    subject: subjectId, // Object ID
    observation_date: '2024-01-25',
    observation_type: 'Academic Performance', // Exact value from content model
    severity: 'Moderate Concern', // Exact value from content model
    observation_details: '<p>Detailed observation text</p>',
    follow_up_required: true,
    tags: 'struggling, needs-support',
    private_notes: 'Confidential notes for staff only'
  }
})
```

### Creating Recommendations

```typescript
// Create recommendation linked to observation
await cosmic.objects.insertOne({
  title: `Academic Support Plan - ${studentName}`,
  type: 'teacher-recommendations',
  metadata: {
    student: studentId,
    teacher: teacherId,
    related_observation: observationId, // Optional
    subject_context: subjectId, // Optional
    recommendation_category: 'Academic Support', // Exact value
    priority_level: 'High', // Exact value
    recommendation_text: '<h3>Support Plan</h3><ol><li>Action 1</li></ol>',
    rationale: 'Detailed reasoning for this recommendation',
    expected_outcome: 'What we expect to achieve',
    suggested_timeline: '1 month', // Exact value
    status: 'Draft', // Exact value
    visibility: 'Private', // Exact value
    progress_notes: '',
    effectiveness_rating: 'Too Early to Tell' // Exact value
  }
})
```

### Querying with Connected Objects

```typescript
// Get recommendations with full student, teacher, and observation data
const { objects: recommendations } = await cosmic.objects
  .find({ type: 'teacher-recommendations' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1) // This includes nested object data

// Access connected data directly
recommendations.forEach(rec => {
  console.log('Student:', rec.metadata.student?.title)
  console.log('Teacher:', rec.metadata.teacher?.metadata.full_name)
  console.log('Subject:', rec.metadata.subject_context?.metadata.subject_name)
  console.log('Risk Level:', rec.metadata.student?.metadata.risk_level?.value)
})
```

## 🔗 Cosmic CMS Integration

This application is built on Cosmic's powerful content infrastructure:

### Content Types

- **Students** (`students`) - Student profiles with risk assessment data
- **Teachers** (`teachers`) - Faculty information and contact details
- **Subjects** (`subjects`) - Course catalog with department information
- **Teacher Observations** (`teacher-observations`) - Classroom observation records
- **Teacher Recommendations** (`teacher-recommendations`) - Intervention action plans

### Key Features

- **Object Relationships** - Connected student, teacher, and subject data via object metafields
- **Select Dropdowns** - Standardized values for risk levels, statuses, categories, and priorities
- **Rich Text** - HTML textarea for detailed observation and recommendation content
- **File Management** - Profile photos stored in Cosmic's media library
- **Depth Queries** - Automatic nested object loading with `depth(1)` parameter

### Content Management

All content is managed through your Cosmic dashboard at [https://app.cosmicjs.com](https://app.cosmicjs.com). Authorized staff can:

- Add and update student profiles
- Record new observations
- Create and track recommendations
- Update recommendation statuses and effectiveness ratings
- Manage teacher and subject information

## 📦 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository in Vercel
3. Add environment variables in Vercel dashboard:
   - `COSMIC_BUCKET_SLUG`
   - `COSMIC_READ_KEY`
   - `COSMIC_WRITE_KEY`
4. Deploy!

### Other Platforms

This Next.js application can be deployed to any platform that supports Node.js:
- Netlify
- Railway
- AWS Amplify
- Digital Ocean App Platform

Make sure to set the environment variables in your deployment platform's dashboard.

<!-- README_END -->