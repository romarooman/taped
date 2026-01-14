import "./App.css";
import HorizontalScroll from "./Components/HorizontalScroll/HorizontalScroll";
import Section from "./Components/Section/Section";
import Bottom from "./Components/Bottom/Bottom";

function App() {
  return (
    <div className="App">
      <Section title="NavBar" />
      <HorizontalScroll />
      <Bottom title="here content bottom" />
      <Bottom title="here content bottom" />
      <Bottom title="here content bottom" />
      <Bottom title="here content bottom" />
    </div>
  );
}

export default App;
