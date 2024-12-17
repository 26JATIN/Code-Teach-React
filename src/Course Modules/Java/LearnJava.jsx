import React from 'react';
import CourseLayout from '../../Frontend/Components/Interface Components/interface';
import { modules } from '../../Frontend/Components/Module Component/Java Modules';

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
