import logo from './logo.svg';
import './App.css';
import { PieDiagram } from './module/PieDiagram/index.tsx';
import { DiagramCont } from './module/DiagramCont/index.tsx';

function App() {
  let testData = {"group1":1, "group2":2, "group3":3}
  return (
    <div className="App">
      <DiagramCont style="margin: 20px">
        <PieDiagram isShowData={true} isVertical={false} data={testData}/>
      </DiagramCont>
      <DiagramCont style="margin: 20px">
        <PieDiagram isShowData={false} isVertical={false} data={testData}/>
      </DiagramCont>
      <DiagramCont style="margin: 20px">
        <PieDiagram isShowData={true} isVertical={true} data={testData}/>
      </DiagramCont>
    </div>
  );
}

export default App;
