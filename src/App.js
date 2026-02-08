import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HorizontalScroll from "./Components/HorizontalScroll/HorizontalScroll";
import Navbar from "./Components/Navbar/Navbar";
import Bottom from "./Components/Bottom/Bottom";
import GiftCard from "./Components/GiftCard/GiftCard";
import ScrollToGiftCard from "./Components/Helper/ScrollToGiftCard";
import Service from "./Components/Service/Service";

function Home() {
  return (
    <>
      <HorizontalScroll />
      <Service/>
      <GiftCard />
      <Bottom title="here content bottom" />
      <Bottom title="here content bottom" />
      <Bottom title="here content bottom" />
    </>
  );
}

function App() {
  return (
    // <div className="App">
    //   <Navbar title="NavBar" />
    //   <ScrollToGiftCard />
    //   <HorizontalScroll />
    //   <GiftCard />
    //   <Bottom title="here content bottom" />
    //   <Bottom title="here content bottom" />
    //   <Bottom title="here content bottom" />
    //   <Bottom title="here content bottom" />
    // </div>

    <BrowserRouter>
      <div className="App">
        <Navbar />
        <ScrollToGiftCard />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/service" element={<Home />} />
          <Route path="/community" element={<Home />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
