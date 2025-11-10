# Cosmic CMS Setup Guide

## Content Types Structure

Your Cosmic bucket should have these content types:

### 1. Students
- student_id (text)
- full_name (text)
- email (text)
- department (text)
- current_semester (number)
- enrollment_status (select-dropdown)
- risk_level (select-dropdown)
- risk_score (number)
- current_gpa (number)
- attendance_percentage (number)
- profile_image (file)
- contact_number (text)
- academic_notes (textarea)

### 2. Teachers
- teacher_id (text)
- full_name (text)
- email (text)
- department (text)
- designation (text)
- specialization (text)
- contact_number (text)
- office_location (text)
- profile_photo (file)
- active_status (switch)

### 3. Subjects
- subject_code (text)
- subject_name (text)
- department (text)
- semester (number)
- credits (number)
- course_type (select-dropdown)
- teacher (object - links to Teachers)

### 4. Teacher Observations
- student (object - links to Students)
- teacher (object - links to Teachers)
- subject (object - links to Subjects)
- observation_date (date)
- observation_type (select-dropdown)
- severity (select-dropdown)
- observation_details (html-textarea)
- follow_up_required (switch)
- tags (text)
- private_notes (textarea)

### 5. Teacher Recommendations
- student (object - links to Students)
- teacher (object - links to Teachers)
- related_observation (object - links to Teacher Observations)
- subject_context (object - links to Subjects)
- recommendation_category (select-dropdown)
- priority_level (select-dropdown)
- recommendation_text (html-textarea)
- rationale (textarea)
- expected_outcome (textarea)
- suggested_timeline (select-dropdown)
- status (select-dropdown)
- visibility (select-dropdown)
- progress_notes (textarea)
- effectiveness_rating (select-dropdown)

## Select Dropdown Values

Make sure to use EXACT values from your content model for all select-dropdown fields.