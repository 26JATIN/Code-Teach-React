import React, { useEffect } from 'react';
import { useParams, Navigate, useLocation, Routes, Route } from 'react-router-dom';
import CourseLayout from '../../Frontend/Components/Interface Components/interface';
import { modules } from '../../Frontend/Components/Module Component/Java Modules';

const LearnJava = () => {
  const { courseId } = useParams();
  const location = useLocation();
  
  useEffect(() => {
    console.log('LearnJava mounted:', { 
      courseId, 
      pathname: location.pathname,
      modules: modules.map(m => m.id)
    });
  }, [courseId, location.pathname]);

  // Check if we're at the root course path
  if (location.pathname === `/course/${courseId}/modules`) {
    const firstModule = modules[0];
    const firstSubModule = firstModule.subModules[0];
    const redirectPath = `/course/${courseId}/modules/${firstModule.id}/${firstSubModule.id}`;
    console.log('Redirecting to first module:', redirectPath);
    return <Navigate to={redirectPath} replace />;
  }

  return (
    <CourseLayout 
      courseName="Java Programming" 
      courseShortName="Java" 
      modules={modules}
      basePath={`/course/${courseId}/modules`}
    />
  );
};

export default LearnJava;
