# AyurSutra Patient Management System

## Overview
A comprehensive React-based patient management system for Ayurveda/Panchakarma practitioners and patients. This modern, professional application provides role-based access for both practitioners and patients with a calming, patient-centric approach.

## Project Architecture
- **Frontend Framework**: React 18 with Vite
- **UI Components**: Radix UI with Tailwind CSS
- **Routing**: React Router DOM
- **Charts/Analytics**: Recharts
- **Build Tool**: Vite
- **Port**: 5000 (configured for Replit environment)

## Key Features
- Role-based authentication (Patient/Practitioner)
- Patient dashboard with session tracking
- Practitioner dashboard with patient management
- Schedule management
- Analytics and reporting
- Ayurveda chatbot integration
- Progress visualization
- Communication and messaging
- Document management
- Notifications system

## Development Setup
- Node.js 20 with npm
- All dependencies installed with `--legacy-peer-deps` due to date-fns version conflicts
- Vite configured for Replit proxy environment (allowedHosts: true, host: 0.0.0.0)

## Current State
- ✅ Project successfully imported and configured for Replit
- ✅ Dependencies installed and working (resolved conflicts with --legacy-peer-deps)
- ✅ Development server running on port 5000
- ✅ Workflow configured for frontend development
- ✅ Tailwind CSS v4 properly configured with custom design system
- ✅ Beautiful login interface with AyurSutra branding matches design specifications
- ✅ Firebase authentication fully configured with environment variables
- ✅ Firebase integration for JavaScript/TypeScript applications added
- ✅ Deployment configuration set for production (autoscale)
- ✅ Application verified and running successfully

## Recent Changes
- 2025-09-23: Fresh GitHub import setup for Replit environment
  - Installed all dependencies with --legacy-peer-deps flag to resolve date-fns conflicts
  - Verified Vite configuration is correct for Replit proxy environment (allowedHosts: true, host: 0.0.0.0:5000)
  - Confirmed dev-server workflow running successfully on port 5000
  - Verified Firebase integration with fallback handling for missing credentials
  - Configured deployment settings for autoscale production deployment
  - Fixed critical user name extraction issue where users were showing as "New Patient"
    - Resolved race condition in AuthContext by passing user object directly to loadUserProfile
    - Improved name extraction logic to properly use displayName and email-derived names
    - Added consistency improvements with serverTimestamp usage
  - Successfully tested application with working login interface and professional design
  - Import completed successfully - application fully functional

## User Preferences
- Clean, professional medical interface
- Role-based access control
- Modern React patterns with functional components