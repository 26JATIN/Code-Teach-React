// Module 0: Introduction To Java
import History from '../../Java/0.Intoduction To Java/1.History';
import WhyJava from '../../Java/0.Intoduction To Java/2.WhyJava';
import TopicsCovered from '../../Java/0.Intoduction To Java/3.TopicsCovered';
import InstallationOfJavaOnWindows from '../../Java/0.Intoduction To Java/4.InstallationOfJavaOnWindows';

// Module 1: How Programs Work
import WhatIsAProgram from '../../Java/1.HowaprogramWorks/1.whatisaprogram';
import HowDoesAProgramWork from '../../Java/1.HowaprogramWorks/2.howdoesprogramworks';
import WhatIsCompiler from '../../Java/1.HowaprogramWorks/3.whatisacompiler';
import WhatIsInterpreter from '../../Java/1.HowaprogramWorks/4.whatisainterpreter';
import WhatIsCodeEditor from '../../Java/1.HowaprogramWorks/5.whatisacodeeditor';
import WhatTypeOfLanguageIsJava from '../../Java/1.HowaprogramWorks/6.whattypeoflanguageisjava';

// Module 2: Syntax And Variables
import Syntexofjava from '../../Java/2.Syntex And Variables/1.Syntexofjava';
import VariablesinJava from '../../Java/2.Syntex And Variables/2.VariablesinJava';
import DatatypesinJava from '../../Java/2.Syntex And Variables/3.DatatypesinJava';
import Set1Datatypes from '../../Java/2.Syntex And Variables/PracticeSet1Datatypes';

export const modules = [
  {
    id: '0',
    title: 'Introduction To Java',
    subModules: [
      { id: '0.1', title: '1. History', component: History },
      { id: '0.2', title: '2. Why Java?', component: WhyJava },
      { id: '0.3', title: '3. Topics Covered', component: TopicsCovered },
      { id: '0.4', title: '4. Installation Guide', component: InstallationOfJavaOnWindows }
    ]
  },
  {
    id: '1',
    title: 'How Programs Work',
    subModules: [
      { id: '1.1', title: 'What is a Program?', component: WhatIsAProgram },
      { id: '1.2', title: 'How Programs Run', component: HowDoesAProgramWork },
      { id: '1.3', title: 'What is a Compiler?', component: WhatIsCompiler },
      { id: '1.4', title: 'What is an Interpreter?', component: WhatIsInterpreter },
      { id: '1.5', title: 'What is a Code Editor?', component: WhatIsCodeEditor },
      { id: '1.6', title: 'What Type of Language is Java?', component: WhatTypeOfLanguageIsJava }
    ]
  },
  {
    id: '2',
    title: 'Syntax And Variables',
    subModules: [
      { id: '2.1', title: 'Java Syntax', component: Syntexofjava },
      { id: '2.2', title: 'Variables in Java', component: VariablesinJava },
      { id: '2.3', title: 'Data Types in Java', component: DatatypesinJava },
      { id: '2.4', title: 'Practice Set 1', component: Set1Datatypes }
    ]
  }
];
