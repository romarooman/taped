import styles from "./App.module.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./Components/Navbar/Navbar";

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

import { homeImages, homeSlides } from "./data/homeData";
import { studioImages } from "./data/studioData";

import ServiceCard from "./Components/ServiceCard/ServiceCard";
import GridOfExpertsCommunity from "./Components/Pages/ListOfExpertsCommunity/GridOfExpertsCommunity";
import ExpertsMore from "./Components/Pages/ExpertsMore/ExpertsMore";
import ExhibitionCard from "./Components/Pages/ExhibitionCard/ExhibitionCard";
import { expertsData } from "./data/expertsData";
import { communityData } from "./data/communityData";

function Home() {
  return (
    <PageSlider header={<Navbar />}>
      <Page id="hero">
        <ImagesOnly one={homeImages.hero} brands={homeImages.brands} />
      </Page>

      <Page id="column">
        <ImagesListColumn fimage={homeImages.introduction} />
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
          fimage={homeImages.mission}
          subtitleSize="clamp(32px, 4vw, 60px)"
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
          fimage={homeImages.about}
          bg="#DAFF3E"
          order="bg-first"
          subtitleSize="clamp(32px, 4vw, 60px)"
        />
      </Page>

      <Page id="expert">
        <ImagesListRow
          textOn="first"
          fimage={homeImages.expert}
          bg="#FFFFFF"
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
          subtitle={`is an actor from Barcelona, now
based in New York. He brings an understanding of performance and how to make people feel comfortable
in front of the camera.`}
          fimage={homeImages.actor}
          bg="#FFFFFF"
        />

        <Service />
      </Page>

      <Page id="qa">
        <QA />
      </Page>

      <Page id="photo">
        <PhotoTextSlider slides={homeSlides} />
      </Page>

      <Page id="community" direction="horizontal">
        <GiftCard enabled={false} />

        <ExpertCommunity
          title="yes, we have a taped. community"
          fimage={homeImages.community}
          moreTo="/community/more"
        />
      </Page>

      <Page id="experts">
        <ExpertCommunity
          kicker="experts"
          title="our dialogues with famous experts"
          fimage={homeImages.community}
          order="image-first"
          moreTo="/experts/more"
        />
      </Page>

      <Page id="location">
        <Location {...studioImages} />
      </Page>
    </PageSlider>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div className={styles.App}>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/service" element={<Home />} />

          <Route path="/community" element={<Home />} />

          <Route path="/experts" element={<Home />} />

          <Route path="/contacts" element={<Home />} />

          <Route
            path="/experts/more"
            element={
              <GridOfExpertsCommunity title="experts" items={expertsData} />
            }
          />
          <Route
            path="/community/more"
            element={
              <GridOfExpertsCommunity
                title="community"
                items={communityData}
                basePath="/community"
              />
            }
          />
          <Route
            path="/experts/:slug"
            element={<ExpertsMore items={expertsData} />}
          />

          <Route
            path="/community/:slug"
            element={<ExhibitionCard items={communityData} />}
          />

          <Route
            path="/service/headshots"
            element={<ServiceCard />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
