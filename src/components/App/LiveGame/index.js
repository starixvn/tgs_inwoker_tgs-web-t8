import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import styled, { css,keyframes } from "styled-components";

import i18n from "../../../utils/i18n";

import LiveGameButtonPNG from "../../../assets/images/live/live-game-button.png";
import ScrollAnimation from "react-animate-on-scroll";

import config from "../../../config/config";
import { GameTypeEnum } from "../../../api-services/utils/Enum";
import { SHOW_LOGIN } from "../../../api-services/constant/actionType";

export const flipButton = keyframes`
  0% {
    transform: rotateY(0deg);
  }
  50% {
    transform: rotateY(180deg);
  }
  to {
    transform: rotateY(1turn);
  }
`;

const Container = styled.div`
  width: 100%;
  height: auto;

  padding: 70px 0px;
  position: relative;
  min-height: ${(props) =>
    props.GamePage_SpecificBackground ? "900px" : "870px"};
  background: url(${(props) =>
      process.env.PUBLIC_URL +
      "/assets/images/pcGamePage/live/background" +
      (props.GamePage_SpecificBackground ? "-hk28" : "") +
      ".jpg"})
    no-repeat center;
`;
const GirlImage = styled.div`
  background: url(${(props) => props.img}) no-repeat;
  width: 308px;
  height: 172px;
  float: right;
  &:hover {
    cursor: pointer;
  }
`;
const LeftSlide = styled(ScrollAnimation)`
  display: flex;
`;
const RightSlide = styled(ScrollAnimation)`
  display: flex;
`;
const LiveWrapper = styled.div``;

const Maintenance = styled.div`
  width: 100%;
  height: 100%;
  z-index: 1;
  position: absolute;
  align-items: center;
  justify-content: center;
  color: white;
  display: none;
  text-transform: capitalize;
  font-weight: bold;
  font-size: 24px;
  user-select: none;
  cursor: not-allowed;
`;

const ImageWrapper = styled.div`
  position: relative;

  ${({ maintenance }) => {
    return maintenance
      ? `

    ${Maintenance}{
     
      display: flex;
    }
    ${GirlImage}{
      filter: brightness(40%) grayscale(200%);
    }
    
    
    `
      : ``;
  }}
`;

const BottomContainer = styled.div`
  bottom: 0;
  left: 0;
  position: absolute;
  width: 100%;
`;

const BottomNavItemContainer = styled.ul`
  display: flex;
  justify-content: center;
  padding-bottom: 1.8%;
  list-style-type: none;
`;

const BottomNavItem = styled.li`
  cursor: pointer;
  margin: 0 5px;
  perspective: 300px;
  transform: scale3d(0.9, 0.9, 1);
  transform-origin: 50% 90%;
  transition: transform 0.4s;
  ${(props) =>
    props.selected &&
    css`
      animation: ${flipButton} 0.8s linear both;
      transform: scaleX(1);
    `}
`;

const GameButton = styled.div`
  width: 188px;
  height: 178px;
  background: url(${LiveGameButtonPNG}) center no-repeat;
  padding-top: 50px;
  padding-left: 30px;
`;



const LiveGame = (props) => {
  const [selected, setSelected] = useState(0);
  const [selectedGame, setSelectedGame] = useState("");
  const [imageVisible, setImageVisible] = useState(false);

  var timerAnimation = null;
  useEffect(() => {
    if (timerAnimation != null) {
      clearTimeout(timerAnimation);
      timerAnimation = null;
    }
    //   timerAnimation = setAnimation();
  }, [selected]);
  const handleSliderClick = (index, game) => {
    if (timerAnimation != null) {
      clearTimeout(timerAnimation);
      timerAnimation = null;
    }
    setSelected(index);
    setSelectedGame(game);
    setImageVisible(false);
    setTimeout(() => {
      setImageVisible(true);
    }, 150);
  };

  const handleJoinGameClick = (params) => {
    if (props.account.token != null) {
      window.open(
        "/" +
          i18n.language +
          "/joingame/" +
          GameTypeEnum.LIVELOBBY +
          "/" +
          params.toUpperCase(),
        "_blank",
        "directories=no,titlebar=no,toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=no,width=1280,height=720"
      );
    } else {
      props.showLogin(true);
    }
  };

  var getLiveGame = props.game.homePageGameList.filter((e) => {
    return e.type === GameTypeEnum.LIVE;
  });

  useEffect(() => {
    if (selectedGame === "" && getLiveGame.length != 0) {
      setSelectedGame(getLiveGame[0].abbreviation);
      setTimeout(() => {
        setImageVisible(true);
      }, 150);
    }
  });
  return getLiveGame.length ? (
    <Container>
      <LiveWrapper>
        <BottomContainer>
          <BottomNavItemContainer>
            {getLiveGame.map((data, index) => {
              return (
                <BottomNavItem selected={selected === index}>
                  <GameButton
                    selected={selected === index}
                    onClick={() => {
                      clearTimeout(timerAnimation);

                      handleSliderClick(index, data.abbreviation);
                    }}
                    maintenance={data.status != 0}
                  >
                    <img
                      alt={data.abbreviation}
                      src={
                        process.env.PUBLIC_URL +
                        `/assets/images/pcGamePage/live/${data.abbreviation.toLowerCase()}${
                          index === selected
                            ? "-selected.png"
                            : "-not-selected.png"
                        }`
                      }
                    />
                  </GameButton>
                </BottomNavItem>
              );
            })}
          </BottomNavItemContainer>
        </BottomContainer>
      </LiveWrapper>
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
export default connect(mapStateToProps, mapDispatchToProps)(LiveGame);
