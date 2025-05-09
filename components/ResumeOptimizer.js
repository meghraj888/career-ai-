import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import ResumePDF from './ResumePDF';

export default function ResumeOptimizer() {
  const { data: session } = useSession();
  const [originalResume, setOriginalResume] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [optimizedResume, setOptimizedResume] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleOptimize = async () => {
    if (!originalResume.trim()) {
      setError('Please paste your resume first!');
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    try {
      const response = await fetch('/api/fix-resume', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          resume: originalResume,
          jobTitle: jobTitle || 'Software Developer',
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to optimize resume');
      }
      
      const data = await response.json();
      setOptimizedResume(data.optimizedResume);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(optimizedResume.replace(/<[^>]*>/g, ''));
  };

  return (
    <section className="py-12 md:py-24" id="resume-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="h-16 w-16 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mx-auto mb-4">
            <i className="fas fa-file-alt text-3xl text-blue-600 dark:text-blue-400" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">AI Resume Optimizer</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Transform your resume into an ATS-friendly document that highlights your strengths and achievements.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-bold mb-4">Your Original Resume</h3>
            <textarea
              className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-lg mb-4 dark:bg-gray-700 dark:text-white"
              value={originalResume}
              onChange={(e) => setOriginalResume(e.target.value)}
              placeholder="Paste your resume content here..."
              rows={10}
            />
            <h3 className="text-xl font-bold mb-2">Target Job Title (Optional)</h3>
            <input
              className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-lg mb-6 dark:bg-gray-700 dark:text-white"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              placeholder="e.g. Senior Software Engineer"
            />
            <button
              onClick={handleOptimize}
              disabled={isLoading}
              className={`w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg text-lg font-medium shadow-md hover:shadow-lg transition duration-300 flex items-center justify-center ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <i className="fas fa-magic mr-2" />
              {isLoading ? 'Optimizing...' : 'Optimize Resume'}
            </button>
            {error && <p className="text-red-500 mt-2">{error}</p>}
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-bold mb-4">AI-Optimized Resume</h3>
            <div className="border border-gray-300 dark:border-gray-600 rounded-lg p-4 min-h-[250px] mb-4 bg-gray-50 dark:bg-gray-700 overflow-auto max-h-[400px]">
              {isLoading ? (
                <p className="text-gray-500 dark:text-gray-400 italic">AI is optimizing your resume...</p>
              ) : optimizedResume ? (
                <div dangerouslySetInnerHTML={{ __html: optimizedResume }} />
              ) : (
                <p className="text-gray-500 dark:text-gray-400 italic">Your optimized resume will appear here after processing...</p>
              )}
            </div>
            
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
              {optimizedResume && (
                <PDFDownloadLink
                  document={<ResumePDF content={optimizedResume} />}
                  fileName="optimized-resume.pdf"
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg font-medium shadow-md hover:shadow-lg transition duration-300 flex items-center justify-center"
                >
                  <i className="fas fa-download mr-2" />
                  Download as PDF
                </PDFDownloadLink>
              )}
              <button
                onClick={copyToClipboard}
                disabled={!optimizedResume}
                className={`flex-1 border border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-gray-700 py-3 px-4 rounded-lg font-medium transition duration-300 flex items-center justify-center ${!optimizedResume ? 'opacity-50 cursor-not-allowed border-gray-400 text-gray-400' : ''}`}
              >
                <i className="fas fa-copy mr-2" />
                Copy to Clipboard
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
    }
