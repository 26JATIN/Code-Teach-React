import React from 'react';
import CourseLayout from '../Components/Interface Components/CourseLayout';
import { modules } from '../Components/Module Component/Java Modules';

const LearnJava = () => {
  return (
    <CourseLayout 
      courseName="Learn Java"
      courseShortName="J"
      modules={modules}
      basePath="/modules/java"
    />
  );
};

export default LearnJava;
