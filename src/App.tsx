import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';

interface AnalysisResult {
  thumbnail: string;
  objectName: string;
  defect: string;
  explanation: string;
}

function App() {
  const [results, setResults] = useState<AnalysisResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const onDrop = async (acceptedFiles: File[]) => {
    setIsLoading(true);
    const formData = new FormData();
    acceptedFiles.forEach(file => {
      formData.append('images', file);
    });

    try {
      const response = await axios.post('https://objdetectserver-production.up.railway.app/api/analyze', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setResults(response.data);
    } catch (error) {
      console.error('Error uploading images:', error);
      alert('Error uploading images. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png']
    }
  });

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">
          AI Object Detection & Analysis
        </h1>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">About This Tool</h2>
          <p className="text-gray-600 mb-4">
            This AI-powered tool helps you detect and analyze objects in images, specifically focusing on identifying potential defects or issues. Perfect for quality control and inspection processes.
          </p>
          <div className="space-y-2">
            <p className="text-gray-600"><span className="font-semibold">How to use:</span></p>
            <ul className="list-disc list-inside text-gray-600 ml-4">
              <li>Drag and drop images or click to select files</li>
              <li>Wait for the AI to analyze your images</li>
              <li>View results with detailed explanations for each object</li>
              <li>Click on any image to view it in full size</li>
            </ul>
          </div>
        </div>

        <div
          {...getRootProps()}
          className="border border-gray-300 rounded-lg p-12 text-center cursor-pointer transition-all hover:border-gray-400 bg-white"
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center gap-3">
            <svg 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              className="text-gray-400"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" strokeWidth="2" strokeLinecap="round"/>
              <polyline points="17 8 12 3 7 8" strokeWidth="2" strokeLinecap="round"/>
              <line x1="12" y1="3" x2="12" y2="15" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <p className="text-gray-700">
              {isDragActive ? 'Drop images here...' : 'Drop images here or click to upload'}
            </p>
            <p className="text-sm text-gray-500">
              Supported formats: JPG, PNG
            </p>
          </div>
        </div>

        {isLoading && (
          <div className="text-center mt-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"></div>
            <p className="mt-2 text-gray-600">Analyzing images...</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {results.map((result, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src={result.thumbnail}
                alt={result.objectName}
                className="w-full h-48 object-contain bg-gray-50 cursor-pointer"
                onClick={() => setSelectedImage(result.thumbnail)}
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold">{result.objectName}</h3>
                <div className="mt-2">
                  <span
                    className={`inline-block px-2 py-1 rounded text-sm ${
                      result.defect === 'Yes'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-green-100 text-green-800'
                    }`}
                  >
                    {result.defect === 'Yes' ? 'Defect Detected' : 'No Defects'}
                  </span>
                </div>
                <p className="mt-3 text-gray-600 text-sm">{result.explanation}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Modal for displaying full-size image */}
        {selectedImage && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedImage(null)}
          >
            <div className="max-w-4xl w-full">
              <img
                src={selectedImage}
                alt="Full size"
                className="w-full h-auto max-h-[90vh] object-contain bg-white"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
