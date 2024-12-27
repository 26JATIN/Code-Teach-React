import React from 'react';
import { useParams } from 'react-router-dom';
import CourseLayout from '../../Frontend/Components/Interface Components/interface';
import { modules } from '../../Frontend/Components/Module Component/Cpp Modules';

const LearnCpp = () => {
  const { courseId } = useParams();
  
  return (
    <CourseLayout 
      courseName="C++ Programming" 
      courseShortName="C++" 
      modules={modules}
      basePath={`/course/${courseId}/modules`}
    />
  );
};

export default LearnCpp;
