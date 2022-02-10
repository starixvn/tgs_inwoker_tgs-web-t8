import React, {  useState, useRef } from "react";
import styled from "styled-components";

import { connect } from "react-redux";
import SliderPNG from "../../../assets/images/home/section/game-slider.png";
import SliderBackgroundPNG from "../../../assets/images/home/section/game-slider-bg.png";
import Section2LotteryPNG from "../../../assets/images/home/section/section2-lottery.png";
import Section2ChessPNG from "../../../assets/images/home/section/section2-chess.png";
import Section2ElectronPNG from "../../../assets/images/home/section/section2-electron.png";
import Section2LivePNG from "../../../assets/images/home/section/section2-live.png";
import Section2SportsPNG from "../../../assets/images/home/section/section2-sports.png";
import Section2EsportsPNG from "../../../assets/images/home/section/section2-esports.png";
import i18n from "../../../utils/i18n";
import Common from "../../../utils/Common";
import { GameTypeEnum } from "../../../api-services/utils/Enum";
import ScrollAnimation from "react-animate-on-scroll";
import Slider from "react-slick";

const GameSelectorWithSlider = styled.div`
  width: 1280px;
  margin: 0 auto;
  margin-top: 30px;
  position: relative;
  overflow: visible;
`;

const SliderImg = styled.div`
  background: url(${(props) => props.img}) no-repeat;
  width: 489px;
  height: 382px;
  transform: scale(0.8);
  background-position-x: ${(props) => props.background.x};
  background-position-y: ${(props) => props.background.y};
  transition: all 0.2s ease-in;
  color: #ffffff;
  padding-top: 184px;
  padding-left: 47px;
  .slick-current & {
    transform: scale(1);
  }
`;

const SliderImgTitle = styled.div`
  font-size: 1.5em;
`;

const SliderImgButton = styled.div`
  font-size: 14px;
  color: #fff;
  text-align: center;
  width: 85px;
  border-radius: 6px;
  border: solid 1px #e4eaff;
  margin-top: 25px;
  height: 34px;
  line-height: 2em;
  &:hover {
    cursor: pointer;
  }
`;

const SliderBar = styled.div`
  display: flex;
  justify-content: space-between;
  background: url(${SliderBackgroundPNG}) no-repeat;
  width: 1038px;
  height: 68px;
  margin: 0 auto;
  margin-top: 90px;
`;

const SliderButton = styled.div`
  background: ${(props) => {
    return props.selected ? `url(${SliderPNG}) no-repeat` : "none";
  }};
  width: 131px;
  height: 64px;
  background-position: 3px 5px;
`;

const SliderButtonLabel = styled.div`
  font-size: 14px;
  color: ${(props) => {
    return props.selected ? "#0C5AAC" : "#FFFFFF";
  }};
  transition: color 0.1s ease-in;
  text-align: center;
  padding-top: 23px;
`;

const secondSectionSlides = [
  {
    path: "live",
    img: Section2LivePNG,
    type: "live",
    name: i18n.t("common.live"),
    background: {
      x: "0px",
      y: "-11px",
    },
  },
  {
    path: "chess",
    img: Section2ChessPNG,
    type: "chess",
    name: i18n.t("common.chess"),
    background: {
      x: "0px",
      y: "-20px",
    },
  },
  {
    path: "sports",
    img: Section2SportsPNG,
    type: "sports",
    name: i18n.t("common.sport"),
    background: {
      x: "0px",
      y: "-75px",
    },
  },
  {
    path: "esports",
    img: Section2EsportsPNG,
    type: "esports",
    name: i18n.t("common.esports"),
    background: {
      x: "0px",
      y: "9px",
    },
  },
  {
    path: "lottery",
    img: Section2LotteryPNG,
    type: "lottery",
    name: i18n.t("common.lottery"),
    background: {
      x: "0px",
      y: "-8px",
    },
  },
  {
    path: "electron",
    img: Section2ElectronPNG,
    type: "electron",
    name: i18n.t("common.electron"),
    background: {
      x: "0px",
      y: "25px",
    },
  },
];

const SecondSection = (props) => {
  const [current] = useState(0);
  const [activeSlide, setActiveSlide] = useState(0);
  const [activeSlide2, setActiveSlide2] = useState(0);
  const slider = useRef(null);

  const handleOverlayClick = (index) => {
    slider.current.slickGoTo(index);
  };

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
    variableWidth: true,
    autoplay: false,
    speed: 500,
    autoplaySpeed: 6000,
    draggable: false,
    swipe: false,
    cssEase: "linear",
    beforeChange: (current, next) => setActiveSlide(next),
    afterChange: (current) => setActiveSlide2(current),
  };

  return (
    <GameSelectorWithSlider>
      <ScrollAnimation
        animateIn="fadeInRight"
        duration={1}
        animateOnce={true}
        style={{ overflow: "visible" }}
      >
        <Slider {...settings} ref={slider}>
          {secondSectionSlides.map((item, index) => {
            return (
              <div key={index}>
                <SliderImg
                  index={index}
                  current={current}
                  img={item.img}
                  background={item.background}
                  onClick={() => handleOverlayClick(index)}
                >
                  <SliderImgTitle>{item.name}</SliderImgTitle>
                  <SliderImgButton
                    onClick={() => {
                      window.scrollTo({ top: 0, behavior: "smooth" });
                      props.navigate(`/${i18n.language}/${item.path}`);
                    }}
                  >
                    {i18n.t("withdrawal.checkDetails")}
                  </SliderImgButton>
                </SliderImg>
              </div>
            );
          })}
        </Slider>

        <SliderBar>
          {secondSectionSlides.map((item, index) => {
            return (
              <div key={index}>
                <SliderButton
                  selected={activeSlide2 === index}
                  onClick={() => handleOverlayClick(index)}
                >
                  <SliderButtonLabel selected={activeSlide2 === index}>
                    {item.name}
                  </SliderButtonLabel>
                </SliderButton>
              </div>
            );
          })}
        </SliderBar>
      </ScrollAnimation>
    </GameSelectorWithSlider>
  );
};

const mapStateToProps = (state) => {
  return {
    game: state.game,
  };
};

export default connect(mapStateToProps, null)(SecondSection);
