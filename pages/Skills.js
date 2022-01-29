import Header from '../components/Header';
import Languages from '../components/Languages';
import Libraries from '../components/Libraries';
import Frameworks from '../components/Frameworks';
import Tools from '../components/Tools';

console.log(Tools);
function Skills() {
  return (
    <div>
      <Header />
      skill page
      {Languages.map((language) => (
        <div key={language.id}>
          <h2>{language.name}</h2>
          <h2>{language.icon}</h2>
        </div>
      ))}
      {Libraries.map((librarie) => (
        <div key={librarie.id}>
          <h2>{librarie.name}</h2>
          <h2>{librarie.icon}</h2>
        </div>
      ))}
      {Frameworks.map((framework) => (
        <div key={framework.id}>
          <h2>{framework.name}</h2>
          <h2>{framework.icon}</h2>
        </div>
      ))}
      {Tools.map((tool) => (
        <div key={tool.id}>
          <h2>{tool.name}</h2>
          <h2>{tool.icon}</h2>
        </div>
      ))}
    </div>
  );
}

export default Skills;
