import styles from "./App.module.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import GiftCard from "./Components/GiftCard/GiftCard";
import ScrollToGiftCard from "./Components/Helper/ScrollToGiftCard";
import Service from "./Components/Service/Service";
import QA from "./Components/QA/QA";
import Seven from "./images/7.png";
import ExpertCommunity from "./Components/ExpertCommunity/ExpertCommunity";
import Location from "./Components/Location/Location";
import locationImg from "./images/building.png";
import mapImg from "./images/map.png";
import PhotoTextSlider from "./Components/PhotoTextSlider/PhotoTextSlider";
import Img1 from "./images/8.png";
import Img2 from "./images/9.png";
import ServiceCard from "./Components/ServiceCard/ServiceCard";
import ImagesOnly from "./Components/ImagesOnly/ImagesOnly";
import One from "./images/1.png";
import Two from "./images/2.png";
import Three from "./images/3.png";
import Four from "./images/4.png";
import Five from "./images/5.png";
import Six from "./images/6.png";
import brands from "./images/brands.png";
import ImagesListColumn from "./Components/ImagesListColumn/ImagesListColumn";
import ImagesListRow from "./Components/ImagesListRow/ImagesListRow";
import HorizontalScroll from "./Components/HorizontScroll/HorizontalScroll";
import ExpertsMore from "./Components/Pages/ExpertsMore/ExpertsMore";
import GridOfExpertsCommunity from "./Components/Pages/ListOfExpertsCommunity/GridOfExpertsCommunity";
import ExhibitionCard from "./Components/Pages/ExhibitionCard/ExhibitionCard";
// import PhotoSlider from "./Components/PhotoSlider/PhotoSlider";
// import ContactForm from "./Components/ContactForm/ContactForm";
// import MoskData from "./Components/MoskData/MoskData";

// const photos = [
//   { id: 1, src: One, alt: "photo 1" },
//   { id: 2, src: Two, alt: "photo 2" },
//   { id: 3, src: Three, alt: "photo 3" },
//   { id: 3, src: Five, alt: "photo 3" },
//   { id: 3, src: Six, alt: "photo 3" },
// ];

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
      <div className={`${styles.slide}`} key={10}>
        <div className={`${styles.imageWrapper}`}>
          <ImagesOnly one={One} brands={brands} />
        </div>
      </div>
      <div className={`${styles.slide}`} key={11}>
        <div className={`${styles.imageWrapper}`}>
          <ImagesListColumn fimage={Two} />
        </div>
      </div>

      <div className={`${styles.slide}`} key={12}>
        <div className={`${styles.imageWrapper}`}>
          <ImagesListRow
            subtitle="our mission is to build
a one-stop service
that covers every aspect
of an actor’s visual
presentationand
personal branding"
            bg="#DAFF3E"
            textOn="second"
            fimage={Three}
            subtitleSize="clamp(4px, 3.5vw, 20px)"
          />
        </div>
      </div>

      <div className={`${styles.slide}`} key={13}>
        <div className={`${styles.imageWrapper}`}>
          <ImagesListRow
            subtitle="We aim to support
talent by creating
tools and content that
are both useful
and beautifully crafted."
            textOn="first"
            title=""
            fimage={Four}
            bg="#DAFF3E"
            order="bg-first"
            subtitleSize="clamp(4px, 3.5vw, 20px)"
          />
        </div>
      </div>

      <div className={`${styles.slide}`} key={14}>
        <div className={`${styles.imageWrapper}`}>
          <ImagesListRow
            textOn="first"
            fimage={Five}
            padding={0}
            bg="#FFFFFF"
            order="bg-first"
            title="Max Ishchenko"
            subtitle="is a director from Moscow who based in New York. He works in narrative film and photography and brings a calm, focused eye to the work."
            subtitleSize="clamp(4px, 3.5vw, 20px)"
          />
        </div>
      </div>

      <HorizontalScroll>
        <div className={`${styles.slide}`} key={15}>
          <div className={`${styles.imageWrapper2}`}>
            <ImagesListRow
              title="Mateu Parellada"
              subtitle="is an actor from Barcelona, now
based in New York. He brings an understanding of performance and how to make people feel comfortable
in front of the camera."
              subtitleSize="clamp(4px, 3.5vw, 20px)"
              textOn="first"
              fimage={Six}
              bg="#FFFFFF"
            />
          </div>
        </div>
        <Service />
      </HorizontalScroll>
      <QA height={420} />
      <PhotoTextSlider slides={slides} height={420} />

      {/* new page service */}
      {/* <ServiceCard image={Img1} onBook={() => console.log("book clicked")} />
      <PhotoSlider title="how it goes:" photos={photos} />
      <ContactForm /> */}
      <HorizontalScroll>
        <GiftCard />
        <ExpertCommunity
          title="yes, we have a taped. community"
          subtitle="is a director from Moscow who based in New York. He works in narrative film and photography and brings a calm, focused eye to the work. "
          subtitleSize="clamp(4px, 3.5vw, 20px)"
          textOn="first"
          fimage={Seven}
          bg="#FFFFFF"
          moreTo="/community/more"
        />
      </HorizontalScroll>
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
        moreTo="/experts/more"
      />
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
          <Route
            path="/service/card"
            element={
              <ServiceCard
                image={Img1}
                onBook={() => console.log("book clicked")}
              />
            }
          />
          <Route
            path="/community/more"
            element={
              <ExhibitionCard
                image={Img1}
          
              />
            }
          />
          <Route
            path="/experts/more"
            element={
              <ExpertsMore
                image={Img1}
                onBook={() => console.log("book clicked")}
              />
            }
          />
          <Route
            path="/experts/grid"
            element={
              <GridOfExpertsCommunity
                title="experts"
                items={[
                  {
                    image: One,
                    label: "upcoming",
                    name: "anton volodin exibition",
                    description:
                      "is a director from moscow who based in new york. he works in narrative film and photography and brings a calm, focused eye to the work.",
                  },
                  {
                    image: Two,
                    label: "past",
                    name: "anton volodin exibition",
                    description:
                      "is a director from moscow who based in new york. he works in narrative film and photography and brings a calm, focused eye to the work.",
                  },
                  {
                    image: One,
                    label: "past",
                    name: "anton volodin exibition",
                    description:
                      "is a director from moscow who based in new york. he works in narrative film and photography and brings a calm, focused eye to the work.",
                  },
                  {
                    image: One,
                    label: "upcoming",
                    name: "anton volodin exibition",
                    description:
                      "is a director from moscow who based in new york. he works in narrative film and photography and brings a calm, focused eye to the work.",
                  },
                ]}
              />
            }
          />
          <Route
            path="/community/grid"
            element={
              <GridOfExpertsCommunity
                title="community"
                items={[
                  {
                    image: One,
                    label: "upcoming",
                    name: "anton volodin exibition",
                    description:
                      "is a director from moscow who based in new york. he works in narrative film and photography and brings a calm, focused eye to the work.",
                  },
                  {
                    image: Two,
                    label: "past",
                    name: "anton volodin exibition",
                    description:
                      "is a director from moscow who based in new york. he works in narrative film and photography and brings a calm, focused eye to the work.",
                  },
                  {
                    image: One,
                    label: "past",
                    name: "anton volodin exibition",
                    description:
                      "is a director from moscow who based in new york. he works in narrative film and photography and brings a calm, focused eye to the work.",
                  },
                  {
                    image: One,
                    label: "upcoming",
                    name: "anton volodin exibition",
                    description:
                      "is a director from moscow who based in new york. he works in narrative film and photography and brings a calm, focused eye to the work.",
                  },
                ]}
              />
            }
          />

          <Route path="/community" element={<Home />} />
          <Route path="/contacts" element={<Home />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
