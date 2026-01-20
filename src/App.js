import "./App.css";
import HorizontalScroll from "./Components/HorizontalScroll/HorizontalScroll";
import Navbar from "./Components/Navbar/Navbar";
import Bottom from "./Components/Bottom/Bottom";

function App() {
  return (
    <div className="App">
      <Navbar title="NavBar" />
      <HorizontalScroll />
      <Bottom title="here content bottom" />
      <Bottom title="here content bottom" />
      <Bottom title="here content bottom" />
      <Bottom title="here content bottom" />
    </div>
  );
}

export default App;
