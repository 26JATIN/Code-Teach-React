import React, { useState, useEffect } from 'react';
import { useParams, Navigate, useLocation } from 'react-router-dom';
import CourseLayout from '../Frontend/Components/Interface Components/interface';
import { apiRequest } from '../config/config';

const DynamicCourseModule = () => {
  const { courseId } = useParams();
  const location = useLocation();
  const [modules, setModules] = useState([]);
  const [courseInfo, setCourseInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchModules = async () => {
      try {
        setLoading(true);
        const response = await apiRequest(`/api/modules/course/${courseId}`);
        
        setModules(response.modules || []);
        setCourseInfo(response.course);
        setError(null);
      } catch (err) {
        console.error('Error fetching modules:', err);
        setError('Failed to load course modules');
      } finally {
        setLoading(false);
      }
    };

    if (courseId) {
      fetchModules();
    }
  }, [courseId]);

  // Redirect to first module if on base path
  if (location.pathname === `/course/${courseId}/modules`) {
    if (loading) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="w-8 h-8 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin" />
        </div>
      );
    }

    if (modules.length > 0) {
      const firstModule = modules[0];
      const firstSubModule = firstModule.subModules?.[0];
      
      if (firstSubModule) {
        const redirectPath = `/course/${courseId}/modules/${firstModule.id}/${firstSubModule.id}`;
        return <Navigate to={redirectPath} replace />;
      }
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Loading course content...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="text-center">
          <p className="text-red-400 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!modules || modules.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="text-center">
          <p className="text-gray-400">No modules available for this course yet.</p>
        </div>
      </div>
    );
  }

  return (
    <CourseLayout 
      courseName={courseInfo?.title || 'Course'} 
      courseShortName={courseInfo?.shortName || 'Course'} 
      modules={modules}
      basePath={`/course/${courseId}/modules`}
      isDynamic={true}
    />
  );
};

export default DynamicCourseModule;
