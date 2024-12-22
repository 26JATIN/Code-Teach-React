import React from 'react';
import CourseLayout from '../../Frontend/Components/Interface Components/interface';
import { modules } from '../../Frontend/Components/Module Component/Cpp Modules';

const LearnCpp = () => {
  return (
    <CourseLayout 
      courseName="Learn C++"
      courseShortName="C++"
      modules={modules}
      basePath="/modules/cpp"
    />
  );
};

export default LearnCpp;
