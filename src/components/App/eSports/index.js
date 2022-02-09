import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { withRouter } from "react-router-dom";

import { GameTypeEnum } from "../../../api-services/utils/Enum";
import { SHOW_LOGIN } from "../../../api-services/constant/actionType";
import i18n from "../../../utils/i18n";

//import Icon1Selected from "../../../assets/images/home/section/saba-selected.png";
//import Icon1 from "../../../assets/images/home/section/saba-not-selected.png";
//import Icon2Selected from "../../../assets/images/home/section/sbo-selected.png";
//import Icon2 from "../../../assets/images/home/section/sbo-not-selected.png";
//import Icon3Selected from "../../../assets/images/home/section/im-selected.png";
//import Icon3 from "../../../assets/images/home/section/im-not-selected.png";

import SliderPNG from "../../../assets/images/home/section/game-slider.png";
import SliderSelectedPNG from "../../../assets/images/home/section/game-slider-selected.png";

import SportIcons from "../../../assets/images/sports/sportsicons.png";
import Button from "../../../custom/button";

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

const LeftContent = styled(TheActualContent)``;
const RightContent = styled(TheActualContent)`
  flex-direction: column;
  align-items: flex-start;
  width: 620px;
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
  background: -webkit-linear-gradient(
    ${(props) => props.theme.primary},
    ${(props) => props.theme.primaryGradient}
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-family: Arial, "微軟正黑體";
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
  opacity: ${(props) => (props.imageVisible ? "1" : "0")};
  transform: ${(props) =>
    props.imageVisible ? "translateX(0)" : "translateX(50px)"};
  ${(props) =>
    props.imageVisible
      ? "transition: opacity 0.8s ease-in-out, transform 0.8s ease-in-out;"
      : ""}
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
  display: grid;
  grid-template-columns: auto auto auto auto;
`;

const CustomTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #5a6b90;
  font-weight: bold;
`;

const LeftContentTransition = styled.div`
  opacity: ${(props) => (props.imageVisible ? "1" : "0")};
  transform: ${(props) =>
    props.imageVisible ? "translateX(0)" : "translateX(-50px)"};
  ${(props) =>
    props.imageVisible
      ? "transition: opacity 1s linear, transform 1s ease-in-out;"
      : ""}
`;

const ImageTransition = styled.img`
  width: 100%;
  height: auto;
`;

const Sports = (props) => {
  const handleJoinGameClick = (params, type) => {
    if (!props.account.token) {
      props.showLogin(true);
    } else {
      props.history.push(
        "/" + i18n.language + "/sports/play/" + params + "/" + type
      );
    }
  };

  const [selected, setSelected] = useState(0);
  const [selectedGame, setSelectedGame] = useState("");
  const [type, setType] = useState("1");
  const [imageVisible, setImageVisible] = useState(false);

  var timerAnimation = null;
  useEffect(() => {
    if (timerAnimation != null) {
      clearTimeout(timerAnimation);
      timerAnimation = null;
    }
    // timerAnimation = setAnimation();
  }, [selected]);
  const handleSliderClick = (index, game, type) => {
    if (timerAnimation != null) {
      clearTimeout(timerAnimation);
      timerAnimation = null;
    }
    setSelected(index);
    setSelectedGame(game);
    setType(type);
    setImageVisible(false);
    setTimeout(() => {
      setImageVisible(true);
    }, 150);
  };
  // const setAnimation = () => {
  //   return setTimeout(() => {
  //     if (selected >= gameMenu.length - 1) {
  //       setSelected(0);
  //     } else {
  //       setSelected(selected + 1);
  //     }
  //   }, 3000);
  // };

  var getSportGame = props.game.homePageGameList.filter((e) => {
    return e.type === GameTypeEnum.ESPORTS;
  });

  useEffect(() => {
    if (selectedGame === "" && getSportGame.length != 0) {
      setSelectedGame(getSportGame[0].abbreviation);
      setTimeout(() => {
        setImageVisible(true);
      }, 150);
    }
  });

  return getSportGame.length ? (
    <Container>
      <Content>
        <LeftContent>
          <LeftContentTransition imageVisible={imageVisible}>
            <ImageTransition
              selected={selected}
              src={
                process.env.PUBLIC_URL +
                `/assets/images/pcGamePage/sports/${selectedGame.toLowerCase()}.png`
              }
            />
          </LeftContentTransition>
        </LeftContent>
        <RightContent>
          <RightContentTransition imageVisible={imageVisible}>
            <RightContentGameHeader>
              <RightContentGameHeaderZH>
                {i18n.t(selectedGame.toString() + ".sports", { lng: "zh-CN" })}
              </RightContentGameHeaderZH>
              <RightContentGameHeaderEN>
                {i18n.t(selectedGame.toString() + ".sports", { lng: "en-US" })}
              </RightContentGameHeaderEN>
              {/* <img
                src={
                  process.env.PUBLIC_URL +
                  `/assets/images/pcGamePage/sports/${selectedGame.toLowerCase()}_${
                    i18n.language
                  }.png`
                }
                /> */}
            </RightContentGameHeader>
            <RightContentItems>
              <img src={SportIcons} />
            </RightContentItems>
          </RightContentTransition>
          <RightContentItems>
            <GameSliderButtonContainer>
              {getSportGame.map((data, index) => {
                return (
                  <CustomTextContainer>
                    <GameSlider
                      selected={selected === index}
                      onClick={() => {
                        clearTimeout(timerAnimation);

                        handleSliderClick(index, data.abbreviation, data.type);
                      }}
                      maintenance={data.status != 0}
                    >
                      <img
                        src={
                          process.env.PUBLIC_URL +
                          `/assets/images/pcGamePage/sports/${data.abbreviation.toLowerCase()}${
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
                handleJoinGameClick(selectedGame, type);
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
    account: state.account,
    game: state.game,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Sports));
