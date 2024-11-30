# Object Detection Client

A React TypeScript application that provides a user interface for object detection in images.

## Features

- Modern UI built with React and TypeScript
- Real-time object detection visualization
- Responsive design with Tailwind CSS
- Image upload functionality
- Detection results display

## Tech Stack

- React
- TypeScript
- Tailwind CSS
- Vite
- Axios for API communication

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/amiril84/objdetect_client.git
```

2. Install dependencies:
```bash
cd objdetect_client
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Building for Production

```bash
npm run build
```

## Environment Variables

Create a `.env` file in the root directory with the following variables:
```
VITE_API_URL=your_backend_api_url
```

## Deployment

This application is configured for deployment on Railway. The build process includes Tailwind CSS compilation for proper styling in production.
