import styles from "./App.module.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HorizontalScroll from "./Components/HorizontalScroll/HorizontalScroll";
import Navbar from "./Components/Navbar/Navbar";
import GiftCard from "./Components/GiftCard/GiftCard";
import ScrollToGiftCard from "./Components/Helper/ScrollToGiftCard";
import Service from "./Components/Service/Service";
import QA from "./Components/QA/QA";
import Seven from "./images/7.png";
import ExpertCommunity from "./Components/ExpertCommunity/ExpertCommunity";
import ContactForm from "./Components/ContactForm/ContactForm";
import Location from "./Components/Location/Location";
import locationImg from "./images/building.png";
import mapImg from "./images/map.png";
import PhotoTextSlider from "./Components/PhotoTextSlider/PhotoTextSlider";
import Img1 from "./images/8.png";
import Img2 from "./images/9.png";

function Home() {
  const slides = [
    {
      id: 1,
      image: Img1,
      alt: "mateu",
      quote:
        "is an actor from barcelona, now based in new york. he brings an understanding of performance and how to make people feel comfortable in front of the camera.",
      name: "mateu parellada",
      role: "an actor from barcelona, now based in new york",
    },
    {
      id: 2,
      image: Img2,
      alt: "another",
      quote:
        "is an actor from barcelona, now based in new york. he brings an understanding of performance and how to make people feel comfortable in front of the camera.",
      name: "mateu parellada",
      role: "an actor from barcelona, now based in new york",
    },
    {
      id: 3,
      image: Img1,
      alt: "mateu",
      quote:
        "is an actor from barcelona, now based in new york. he brings an understanding of performance and how to make people feel comfortable in front of the camera.",
      name: "mateu parellada",
      role: "an actor from barcelona, now based in new york",
    },
  ];

  return (
    <>
      <HorizontalScroll />
      <Service />
      <QA height={420} />
      <GiftCard />
      <PhotoTextSlider slides={slides} height={420} />
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
      <ContactForm />
      <Location image={locationImg} mapImage={mapImg} />
    </>
  );
}

function App() {
  return (
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
