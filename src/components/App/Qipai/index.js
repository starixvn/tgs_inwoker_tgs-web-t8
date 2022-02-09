import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import styled, { keyframes } from "styled-components";
import { withRouter } from "react-router-dom";

import {SHOW_LOGIN} from "../../../api-services/constant/actionType";
import {GameTypeEnum} from "../../../api-services/utils/Enum";
import i18n from "../../../utils/i18n";

//import Icon1Selected from "../../../assets/images/home/section/saba-selected.png";
//import Icon1 from "../../../assets/images/home/section/saba-not-selected.png";

import SliderPNG from "../../../assets/images/home/section/game-slider.png";
import SliderSelectedPNG from "../../../assets/images/home/section/game-slider-selected.png";

import SportIcons from "../../../assets/images/sports/sportsicons.png";
import Button from "../../../custom/button";
import Common from "../../../utils/Common";

import Float1 from "../../../assets/images/chess/float-1.png";
import Float2 from "../../../assets/images/chess/float-2.png";
import Float3 from "../../../assets/images/chess/float-3.png";
import Float4 from "../../../assets/images/chess/float-4.png";

const Container = styled.div`
  width: 100%;
  height: 730px;
  position: relative;
  background: url(${process.env
      .PUBLIC_URL}/assets/images/pcGamePage/sports/bg.jpg)
    no-repeat center;
  display: flex;
  justify-content: center;
`;

const Content = styled.div`
  display: grid;
  width: 1280px;
  grid-template-columns: auto auto;
  min-height: 730px;
`;

const TheActualContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 15px;
`;

const LeftContent = styled(TheActualContent)`
  position: relative;
`;
const RightContent = styled(TheActualContent)`
  flex-direction: column;
  align-items: flex-start;
  width: 620px;
  zoom: 0.9;
`;

const RightContentItems = styled.div`
  padding: 10px 0px;
`;

const RightContentGameHeader = styled.div`
  padding: 10px 0px;
  min-height: 145px;
`;

const RightContentGameHeaderZH = styled.div`
  font-size: 80px;
  background: -webkit-linear-gradient(${props=> props.theme.primary}, ${props=> props.theme.primaryGradient});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-family: Arial, '微軟正黑體';
  font-weight: bold;
`;
const RightContentGameHeaderEN = styled.div`
  color: #afb4c6;
  font-size: 40px;
  font-weight: bold;
  font-family: Arial;
  text-transform: uppercase;
`;

const RightContentTransition = styled.div`
  opacity: ${props => props.imageVisible ? '1' : '0' };
  transform: ${props => props.imageVisible ? 'translateX(0)' : 'translateX(50px)'};
  ${props => props.imageVisible ? 'transition: opacity 0.8s ease-in-out, transform 0.8s ease-in-out;' : '' }
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

  ${({ maintenance }) => {
    return maintenance
      ? ` 
    filter: brightness(40%) grayscale(200%);
    cursor: not-allowed;
    pointer-events: none;
    `
      : ``;
  }}
`;

const GameSliderButtonContainer = styled.div`
  padding: 10px 0px;
  display: flex;
`;

const CustomTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #5a6b90;
  font-weight: bold;
`;

const rotate = keyframes`
0% {
  transform: translateZ(0);
}
50% {
    transform: translate3D(10px,10px,0);
}
100% {
    transform: translateZ(0);
}
`;

const rotate2 = keyframes`
0% {
  transform: translateX(0);
}
50% {
  transform: translateY(-10px);
}
100% {
  transform: translateX(0);
}
`;

const RandomMovingStuff = styled.div`
  position: absolute;
  animation: ${rotate} 5s linear infinite;
  transition: animation 1s;
`;

const Animation1 = styled(RandomMovingStuff)`
  top: 15%;
  left: 66px;
  background: url(${Float1}) center no-repeat;
  width: 104px;
  height: 87px;
`;

const Animation2 = styled(RandomMovingStuff)`
  top: 10%;
  right: 110px;
  background: url(${Float2}) center no-repeat;
  width: 61px;
  height: 67px;
  animation: ${rotate2} 5s linear infinite;
`;

const Animation3 = styled(RandomMovingStuff)`
  bottom: 12%;
  left: 11px;
  background: url(${Float3}) center no-repeat;
  width: 73px;
  height: 68px;
  animation: ${rotate2} 5s linear infinite;
`;

const Animation4 = styled(RandomMovingStuff)`
  bottom: 24%;
  right: 30px;
  background: url(${Float4}) center no-repeat;
  width: 74px;
  height: 58px;
`;

const LeftContentTransition = styled.div`
  opacity: ${props => props.imageVisible ? '1' : '0' };
  transform: ${props => props.imageVisible ? 'translateX(0)' : 'translateX(-50px)'};
  ${props => props.imageVisible ? 'transition: opacity 1s linear, transform 1s ease-in-out;' : '' }
`;

const ImageTransition = styled.img`
  width: 100%;
  height: auto;
`;

const Qipai = (props) => {
  const handleJoinGameClick = (kind) => {
    if (props.token) {
      Common.PopupCenter(
        "/" +
          i18n.language +
          "/joingame/" +
          GameTypeEnum.QIPAILOBBY +
          "/" +
          kind.toUpperCase(),
        720,
        1280
      );
    } else {
      props.showLogin(true);
    }
  };

  //const gameMenu = [
  //  { notSelected: Icon1, selected: Icon1Selected, text: "KY" },
  //];

  const [selected, setSelected] = useState(0);
  const [selectedGame, setSelectedGame] = useState("");
  const [imageVisible, setImageVisible] = useState(false);

  var timerAnimation = null;

  const handleSliderClick = (index, game) => {
    if (timerAnimation != null) {
      clearTimeout(timerAnimation);
      timerAnimation = null;
    }
    setSelected(index);
    setSelectedGame(game);
    setImageVisible(false);
    setTimeout(()=>{
      setImageVisible(true);
    },150);
  };
  //  const setAnimation = () => {
  //    return setTimeout(() => {
  //      if (selected >= gameMenu.length) {
  //        setSelected(0);
  //      } else {
  //        setSelected(selected + 1);
  //      }
  //    }, 3000);
  //  };

  var getQipaiGame = props.game.homePageGameList.filter((e) => {
    return e.type === GameTypeEnum.QIPAILOBBY;
  });

  useEffect(() => {
    if (selectedGame === "" && getQipaiGame.length != 0) {
      setSelectedGame(getQipaiGame[0].abbreviation);
      setTimeout(()=>{
        setImageVisible(true);
      },150);
    }
  });

  return getQipaiGame.length ? (
    <Container>
      <Content>
        <LeftContent>
          <LeftContentTransition
          imageVisible={imageVisible}>
            <ImageTransition
              selected={selected}
              src={
                process.env.PUBLIC_URL +
                `/assets/images/pcGamePage/qipai/${selectedGame}.png`
              }
            />
            <Animation1 />
            <Animation2 />
            <Animation3 />
            <Animation4 />
          </LeftContentTransition>
        </LeftContent>
        <RightContent>
          <RightContentTransition
          imageVisible={imageVisible}>
            <RightContentGameHeader>
              <RightContentGameHeaderZH>{i18n.t(selectedGame.toString()+".chess",{lng:'zh-CN'})}</RightContentGameHeaderZH>
              <RightContentGameHeaderEN>{i18n.t(selectedGame.toString()+".chess",{lng:'en-US'})}</RightContentGameHeaderEN>
              {/* <img
                src={
                  process.env.PUBLIC_URL +
                  `/assets/images/pcGamePage/qipai/${i18n.language}.png`
                }
                /> */}
            </RightContentGameHeader>
          </RightContentTransition>
          <RightContentItems>
            <GameSliderButtonContainer>
              {getQipaiGame.map((data, index) => {
                return (
                  <CustomTextContainer>
                    <GameSlider
                      selected={selected === index}
                      onClick={() => {
                        clearTimeout(timerAnimation);
                        handleSliderClick(index, data.abbreviation);
                      }}
                      maintenance={data.status != 0}
                    >
                      <img
                        src={
                          process.env.PUBLIC_URL +
                          `/assets/images/pcGamePage/qipai/${
                            data.abbreviation
                          }${
                            index === selected
                              ? "-selected.png"
                              : "-not-selected.png"
                          }`
                        }
                      />
                    </GameSlider>
                    <div>{data.abbreviation}</div>
                  </CustomTextContainer>
                );
              })}
            </GameSliderButtonContainer>
          </RightContentItems>{" "}
          <RightContentItems>
            <Button
              click={() => {
                handleJoinGameClick(selectedGame);
              }}
              text={i18n.t("common.joinGame")}
            ></Button>
          </RightContentItems>
        </RightContent>
      </Content>
    </Container>
  ) : (
    <Container
      style={{
        background:
          "url(" +
          process.env.PUBLIC_URL +
          `/assets/images/pcGamePage/no_${i18n.language}.jpg) no-repeat center`,
      }}
    ></Container>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    showLogin: (payload) => {
      dispatch({ type: SHOW_LOGIN, payload });
    },
  };
};
const mapStateToProps = (state) => {
  return {
    token: state.account.token,
    game: state.game,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Qipai);
