import styles from "./App.module.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./Components/Navbar/Navbar";
import ScrollToGiftCard from "./Components/Helper/ScrollToGiftCard";

import PageSlider, { Page } from "./Components/PageSlider";

import ImagesOnly from "./Components/ImagesOnly/ImagesOnly";
import ImagesListColumn from "./Components/ImagesListColumn/ImagesListColumn";
import ImagesListRow from "./Components/ImagesListRow/ImagesListRow";

import Service from "./Components/Service/Service";
import GiftCard from "./Components/GiftCard/GiftCard";

import ExpertCommunity from "./Components/ExpertCommunity/ExpertCommunity";
import Location from "./Components/Location/Location";

import QA from "./Components/QA/QA";
import PhotoTextSlider from "./Components/PhotoTextSlider/PhotoTextSlider";

import One from "./images/1.png";
import Two from "./images/2.png";
import Three from "./images/3.png";
import Four from "./images/4.png";
import Five from "./images/5.png";
import Six from "./images/6.png";
import Seven from "./images/7.png";

import Img1 from "./images/8.png";
import Img2 from "./images/9.png";

import brands from "./images/brands.png";

import locationImg from "./images/building.png";
import mapImg from "./images/map.png";

import ServiceCard from "./Components/ServiceCard/ServiceCard";

function Home() {
  const slides = [
    {
      id: 1,
      image: Img1,
      quote: "is an actor from barcelona, now based in new york.",
      name: "mateu parellada",
    },

    {
      id: 2,
      image: Img2,
      quote: "is an actor from barcelona, now based in new york.",
      name: "mateu parellada",
    },
  ];

  return (
    <PageSlider>
      <Page id="hero">
        <ImagesOnly one={One} brands={brands} />
      </Page>

      <Page id="column">
        <ImagesListColumn fimage={Two} />
      </Page>

      <Page id="mission">
        <ImagesListRow
          subtitle={`our mission is to build
a one-stop service
that covers every aspect
of an actor’s visual
presentation
and personal branding`}
          bg="#DAFF3E"
          textOn="second"
          fimage={Three}
          subtitleSize="clamp(4px,3.5vw,20px)"
        />
      </Page>

      <Page id="about">
        <ImagesListRow
          subtitle={`We aim to support
talent by creating
tools and content
that are useful
and beautifully crafted.`}
          textOn="first"
          fimage={Four}
          bg="#DAFF3E"
          order="bg-first"
        />
      </Page>

      <Page id="expert">
        <ImagesListRow
          textOn="first"
          fimage={Five}
          title="Max Ishchenko"
          subtitle={`is a director from Moscow
who based in New York.
He works in narrative film
and photography.`}
        />
      </Page>

      <Page id="services" direction="horizontal">
        <ImagesListRow
          title="Mateu Parellada"
          subtitle={`is an actor from Barcelona,
now based in New York.`}
          fimage={Six}
          bg="#FFFFFF"
        />

        <Service />
      </Page>

      <Page id="qa">
        <QA />
      </Page>

      <Page id="photo">
        <PhotoTextSlider slides={slides} />
      </Page>

      <Page id="community" direction="horizontal">
        <GiftCard />

        <ExpertCommunity
          title="yes, we have a taped. community"
          fimage={Seven}
          moreTo="/community/grid"
        />
      </Page>

      <Page id="experts">
        <ExpertCommunity
          kicker="experts"
          title="our dialogues with famous experts"
          fimage={Seven}
          order="image-first"
          moreTo="/experts/grid"
        />
      </Page>

      <Page id="location">
        <Location image={locationImg} mapImage={mapImg} />
      </Page>
    </PageSlider>
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

          <Route path="/contacts" element={<Home />} />

          <Route path="/service/card" element={<ServiceCard image={Img1} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
