# Project Estimation Tool

A web-based project estimation tool designed in true ABP HP style for creating and managing project estimates with story types, subtasks, and resource allocation.

## Features

### 🔐 User Management
- **Estimator Login**: Create and manage project estimations
- **Admin Login**: Manage story types and system configuration
- Predefined user accounts with role-based access

### 📊 Estimation Matrix
- Create custom story types with defined subtasks
- Set time estimates for each subtask
- Add, edit, and delete story types (Admin only)
- Pre-loaded with common story types:
  - Feature Development
  - Bug Fix
  - Integration

### 📁 Project Management
- Create new projects with multiple line items
- Select story types for each line item
- Apply multipliers to adjust estimates
- Override estimates at line item level
- Real-time calculation of total project hours
- Edit and delete existing projects

### 📋 Project Planning
- Assign resources to project tasks
- Support for both human developers and AI agents
- View detailed project breakdowns
- Resource allocation tracking

### 💾 Data Persistence
- All data stored in browser localStorage
- No backend required
- Instant data saving and retrieval

## Getting Started

1. Open `index.html` in your web browser
2. Choose your login type:
   - **Estimator**: For creating and managing estimates
   - **Admin**: For managing story types and configuration

## User Guide

### For Estimators

1. **Login** as Estimator
2. **View Estimation Matrix**: See available story types and their time estimates
3. **Create Projects**:
   - Go to "Projects" tab
   - Click "New Project"
   - Add line items and select story types
   - Apply multipliers if needed
   - Override individual estimates if required
4. **Project Planning**:
   - Go to "Project Plan" tab
   - Select a project
   - Assign resources to tasks

### For Admins

1. **Login** as Admin
2. **Manage Story Types**:
   - Add new story types with custom subtasks
   - Edit existing story types
   - Set time estimates for each subtask
   - Delete unused story types

## Technical Details

### Data Structure

The application uses a comprehensive localStorage-based data structure:

```javascript
{
  storyTypes: {
    // Story type definitions with subtasks and hours
  },
  projects: {
    // Project definitions with line items and estimates
  },
  users: [
    // User accounts with roles
  ],
  resources: [
    // Available resources (developers, AI agents)
  ]
}
```

### File Structure

- `index.html` - Main application interface
- `styles.css` - Complete styling and responsive design
- `app.js` - Full application logic and data management
- `README.md` - This documentation

### Browser Support

- Modern browsers with localStorage support
- Responsive design for desktop and mobile
- No external dependencies required

## Features in Detail

### Story Types
Each story type contains:
- Name and description
- List of subtasks with time estimates
- Total hours calculation
- Admin-only editing capabilities

### Project Estimation
- Line-by-line story type selection
- Multiplier application (0.1 to any value)
- Override functionality for custom estimates
- Real-time total calculation
- Detailed breakdown view

### Resource Management
- Human developers
- AI agents
- Assignment tracking
- Resource type identification

## Development

This is a pure frontend application requiring no build process or server setup. Simply open the HTML file in a browser to run the application.

### Customization

- Modify initial data in `app.js` `initializeData()` method
- Add new resource types or story types as needed
- Customize styling in `styles.css`
- Extend functionality by adding new tabs or features

## Future Enhancements

- Export estimates to various formats (PDF, CSV, Excel)
- Import/export data functionality
- Time tracking integration
- Team collaboration features
- Backend integration for multi-user support
- Advanced reporting and analytics

## License

This project is open source and available under the MIT License.