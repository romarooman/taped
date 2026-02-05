import "./App.css";
import HorizontalScroll from "./Components/HorizontalScroll/HorizontalScroll";
import Navbar from "./Components/Navbar/Navbar";
import Bottom from "./Components/Bottom/Bottom";
import GiftCard from "./Components/GiftCard/GiftCard";

function App() {
  return (
    <div className="App">
      <Navbar title="NavBar" />
      <HorizontalScroll />
      <GiftCard/>
      <Bottom title="here content bottom" />
      <Bottom title="here content bottom" />
      <Bottom title="here content bottom" />
      <Bottom title="here content bottom" />
    </div>
  );
}

export default App;
