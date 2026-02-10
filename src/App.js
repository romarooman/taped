import styles from "./App.module.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HorizontalScroll from "./Components/HorizontalScroll/HorizontalScroll";
import Navbar from "./Components/Navbar/Navbar";
import Bottom from "./Components/Bottom/Bottom";
import GiftCard from "./Components/GiftCard/GiftCard";
import ScrollToGiftCard from "./Components/Helper/ScrollToGiftCard";
import Service from "./Components/Service/Service";
import QA from "./Components/QA/QA";
import Seven from "./images/7.png";
import ExpertCommunity from "./Components/ExpertCommunity/ExpertCommunity";

function Home() {
  return (
    <>
      <HorizontalScroll />
      <Service />
      <QA height={420} />
      <GiftCard />
      <ExpertCommunity
        title="yes, we have a taped. community"
        subtitle="is a director from Moscow who based in New York. He works in narrative film and photography and brings a calm, focused eye to the work. "
        subtitleSize="clamp(4px, 3.5vw, 20px)"
        textOn="first"
        fimage={Seven}
        bg="#FFFFFF"
      />
      <ExpertCommunity
        kicker="experts"
        title="our dialogues with famous experts"
        subtitle="is an actor from Barcelona, now
based in New York. He brings an understanding of performance and how to make people feel comfortable
in front of the camera."
        subtitleSize="clamp(4px, 3.5vw, 20px)"
        textOn="first"
        order="image-first"
        fimage={Seven}
        bg="#FFFFFF"
      />
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
      <div className={styles.App}>
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
