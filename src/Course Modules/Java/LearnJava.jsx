import React from 'react';
import { useParams } from 'react-router-dom';
import CourseLayout from '../../Frontend/Components/Interface Components/interface';
import { modules } from '../../Frontend/Components/Module Component/Java Modules';

const LearnJava = () => {
  const { courseId } = useParams();
  
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
