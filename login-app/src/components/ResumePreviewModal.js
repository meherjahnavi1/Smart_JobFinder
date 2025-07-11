// components/ResumePreviewModal.js
import React from 'react';

const ResumePreviewModal = ({ show, onClose, optimizedResume }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 max-w-3xl w-full shadow-lg relative">
        <h2 className="text-xl font-bold mb-4">AI-Optimized Resume Preview</h2>
        <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto max-h-[60vh]">
          {optimizedResume}
        </pre>
        <div className="flex justify-end gap-2 mt-4">
          <button onClick={onClose} className="px-4 py-2 bg-gray-500 text-white rounded">Close</button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded">Download PDF</button>
        </div>
      </div>
    </div>
  );
};

export default ResumePreviewModal;
