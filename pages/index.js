import Layout from '../components/Layout';
import ResumeOptimizer from '../components/ResumeOptimizer';
import CareerPathFinder from '../components/CareerPathFinder';
import LearningRoadmap from '../components/LearningRoadmap';
import InterviewQuestions from '../components/InterviewQuestions';

export default function Home() {
  return (
    <Layout>
      {/* Hero Section */}
      <header className="py-16 md:py-24 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              AI-Powered
            </span>{' '}
            Career Success
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
            Optimize your resume, discover your ideal career path, create personalized learning roadmaps, and prepare for interviews with our advanced AI tools.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <a
              href="#features"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-lg font-medium shadow-lg hover:shadow-xl transition duration-300 flex items-center justify-center"
            >
              <i className="fas fa-rocket mr-2" />
              Get Started
            </a>
            <a
              href="#how-it-works"
              className="border border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-gray-800 px-8 py-3 rounded-lg text-lg font-medium transition duration-300 flex items-center justify-center"
            >
              <i className="fas fa-info-circle mr-2" />
              Learn More
            </a>
          </div>
        </div>
      </header>

      {/* Features Overview */}
      <section className="py-12 md:py-24 transition-colors duration-300" id="features">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Supercharge Your Career with AI</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature cards */}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-12 md:py-24 bg-gray-100 dark:bg-gray-800 transition-colors duration-300" id="how-it-works">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">How It Works</h2>
          {/* Steps */}
        </div>
      </section>

      {/* Tool Sections */}
      <ResumeOptimizer />
      <CareerPathFinder />
      <LearningRoadmap />
      <InterviewQuestions />

      {/* Testimonials */}
      <section className="py-12 md:py-24 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Success Stories</h2>
          {/* Testimonial cards */}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Accelerate Your Career?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Join thousands of professionals who have transformed their careers with our AI-powered tools.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <a
              href="#features"
              className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-3 rounded-lg text-lg font-medium shadow-lg hover:shadow-xl transition duration-300 flex items-center justify-center"
            >
              <i className="fas fa-rocket mr-2" />
              Get Started Now
            </a>
            <a
              href="#"
              className="border border-white text-white hover:bg-white hover:bg-opacity-10 px-8 py-3 rounded-lg text-lg font-medium transition duration-300 flex items-center justify-center"
            >
              <i className="fas fa-question mr-2" />
              Learn More
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
        }
