import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import styled, { keyframes } from "styled-components";
import i18n from "../../../utils/i18n";
import {GameTypeEnum} from "../../../api-services/utils/Enum";

import SectionTwo from "../../../assets/images/home/section/section2.png";
import TitleLive from "../../../assets/images/home/section/title-live.png";
import TitleEN from "../../../assets/images/home/section/title-en.png";
import LeftModelPNG from "../../../assets/images/home/section/left-model.png";
import SliderPNG from "../../../assets/images/home/section/game-slider.png";
import SliderSelectedPNG from "../../../assets/images/home/section/game-slider-selected.png";
import GirlOne from "../../../assets/images/home/section/girl-1.png";
import GirlTwo from "../../../assets/images/home/section/girl-2.png";
import GirlThree from "../../../assets/images/home/section/girl-3.png";

import ScrollAnimation from "react-animate-on-scroll";
const GameSelectorWithSlider = styled.div`
  height: 555px;
  width: 1280px;
  margin: 0 auto;
  padding-bottom: 10px;
  background-position: 670px 160px;

  margin-top: 14px;

  position: relative;
  overflow: visible;
`;
const TitleContainer = styled(ScrollAnimation)`
  height: 155px;
  width: 419px;
  background: url(${(props) => props.img}) center no-repeat;
  position: absolute;
  left: 125px;
  top: 55px;
  z-index: 99;
`;
const LeftModel = styled.div`
  height: 606px;
  width: 610px;
  float: left;
  background: url(${LeftModelPNG}) center top no-repeat;
  margin-left: -110px;
`;
const GameSlider = styled.div`
  height: 101px;
  width: 101px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background 300ms linear;
  background: url(${(props) => {
      return props.selected ? SliderSelectedPNG : SliderPNG;
    }})
    center no-repeat;
  cursor: pointer;
  margin: 0px 10px;
  margin-bottom: 10px;
`;

const GameSliderButtonContainer = styled.div`
  padding: 10px 0px;
  position: absolute;
  display: flex;
  top: 40%;
  left: 9%;
`;
const GameModelContainer = styled.div`
  width: 700px;
  height: 550px;
  float: right;
  position: relative;
  margin-top: -5px;
  margin-right: 42px;
`;
const TheGameGirl = styled.div`
  width: 700px;
  height: 550px;
  position: absolute;
  top: 0;
  left: 0;
  background: url(${(props) => props.img}) no-repeat;
  transition: opacity 300ms linear;
  opacity: 0;
  ${(props) => (props.selected === true ? `opacity:1;` : ``)}
`;

const CustomTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #5a6b90;
  font-weight: bold;
`;

const SecondSection = (props) => {
  const [selected, setSelected] = useState(0);

  var timerAnimation = null;
  useEffect(() => {
    if (timerAnimation != null) {
      clearTimeout(timerAnimation);
      timerAnimation = null;
    }
    timerAnimation = setAnimation();
  }, [selected]);
  const handleSliderClick = (index) => {
    if (timerAnimation != null) {
      clearTimeout(timerAnimation);
      timerAnimation = null;
    }
    setSelected(index);
  };
  const setAnimation = () => {
    return setTimeout(() => {
      if (selected >= 1) {
        setSelected(0);
      } else {
        setSelected(selected + 1);
      }
    }, 3000);
  };

  var getLiveGame = props.game.homePageGameList.filter((e) => {
    return e.type === GameTypeEnum.LIVE && e.status === 0;
  });

  return (
    <GameSelectorWithSlider>
      <div>
        <TitleContainer
          animateIn="flipInY"
          animateOut="flipOutY"
          style={{ overflow: "visible" }}
          img={TitleLive}
        ></TitleContainer>
        <GameSliderButtonContainer>
          {getLiveGame.slice(0,3).map((data, index)=>{
            return (
              <CustomTextContainer>
                <GameSlider
                  selected={selected === index}
                  onClick={() => {
                    if (index === 0) {
                      clearTimeout(timerAnimation);
                    }

                    handleSliderClick(index);
                  }}
                >
                  <img
                    src={
                      process.env.PUBLIC_URL +
                      `/assets/images/pcGamePage/live/${data.abbreviation.toLowerCase()}${
                        index === selected
                          ? "-selected.png"
                          : "-not-selected.png"
                      }`
                    }
                    alt={data.abbreviation.toLowerCase()}
                  />
                </GameSlider>
                <div>{i18n.t(data.abbreviation + ".live")}</div>
              </CustomTextContainer>
            );
          })}
        </GameSliderButtonContainer>
      </div>

      <ScrollAnimation
        animateIn="fadeInLeft"
        duration={1}
        animateOnce={true}
        style={{ overflow: "visible" }}
      ></ScrollAnimation>
      <ScrollAnimation
        animateIn="fadeInRight"
        duration={1}
        animateOnce={true}
        style={{ overflow: "visible" }}
      >
        <GameModelContainer>
          <TheGameGirl selected={selected === 0} img={GirlOne} />
          <TheGameGirl selected={selected === 1} img={GirlTwo} />
          <TheGameGirl selected={selected === 2} img={GirlThree} />
        </GameModelContainer>
      </ScrollAnimation>
    </GameSelectorWithSlider>
  );
};

const mapStateToProps = (state) => {
  return {
    game: state.game,
  };
};
export default connect(mapStateToProps)(SecondSection);
