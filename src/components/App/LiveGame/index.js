import React, { Component, useEffect, useState } from "react";
import { connect } from "react-redux";
import styled, { css, keyframes } from "styled-components";

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
    filter: grayscale(0) contrast(100%)
      drop-shadow(0 2px 4px rgba(0, 0, 0, 0.75))
      drop-shadow(0 4px 8px rgba(0, 0, 0, 0.75));
  }
`;

export const unflipButton = keyframes`
  0% {
    transform: rotateY(0deg);
  }
  50% {
    transform: rotateY(180deg);
  }
  to {
    transform: rotateY(1turn);  
    filter: grayscale(1) contrast(80%) drop-shadow(0 2px 4px rgba(0,0,0,.75)) drop-shadow(0 4px 8px rgba(0,0,0,.75));
  }
`;

const Container = styled.div`
  width: 100%;
  height: auto;
  position: relative;
  min-height: ${(props) =>
    props.GamePage_SpecificBackground ? "900px" : "780px"};
  background: url(${(props) =>
      process.env.PUBLIC_URL +
      "/assets/images/pcGamePage/live/background" +
      (props.GamePage_SpecificBackground ? "-hk28" : "") +
      ".jpg"})
    no-repeat center;
`;

const NoContentText = styled.div`
  color: #000;
  font-size: ${(props=> (props.lang === 'zh-CN') || (props.lang === 'zh-TW') ? `3.2em`: `2.3em`)};
  text-shadow: 0 0 18px #ffe14e;
  -webkit-text-stroke: 0.5px white;
  font-weight: bold;
  width: 450px;
  height: auto;
  margin-left: 180px;
  overflow: visible;
  font-family: '微軟正黑粗';
  &:first-child {
    margin-top: 210px;
  }
  &:last-child {
    ${(props=> props.lang === 'en-US'? `font-size: 3.2em;`:``)}
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

const GameButton = styled.div`
  width: 188px;
  height: 178px;
  background: url(${LiveGameButtonPNG}) center no-repeat;
  padding-top: 50px;
  padding-left: 30px;

  &:before {
    position: absolute;
    left: 20px;
    width: 150px;
    height: 80px;
    content: "";
    background-image: url(${(props=>{ 
      return process.env.PUBLIC_URL+"/assets/images/pcGamePage/live/"+props.name.toLowerCase()+".png";
    })});
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
  }
`;

const BottomNavItem = styled.li`
  cursor: pointer;
  margin: 0 5px;
  perspective: 300px;
  transform: scale3d(0.9, 0.9, 1);
  transform-origin: center;
  transition: transform 0.4s;
  filter: grayscale(1) contrast(80%) drop-shadow(0 2px 4px rgba(0,0,0,.75)) drop-shadow(0 4px 8px rgba(0,0,0,.75));
  &:hover {
    filter: grayscale(.5) contrast(90%) drop-shadow(0 2px 4px rgba(0,0,0,.75)) drop-shadow(0 4px 8px rgba(0,0,0,.75));
  }
  ${(props) =>
    props.selected &&
    css`
      animation: ${flipButton} 0.8s linear both;
      transform: scaleX(1);
    `}
  ${(props) =>
    !props.selected &&
    css`
      animation: ${unflipButton} 0.8s linear both;
      transform: scaleX(1);
    `}

    ${({ maintenance }) => {
      return maintenance
        ? `
      ${Maintenance}{
        display: flex;
      }
      ${GameButton}{
        filter: brightness(40%) grayscale(200%);
      }
      `
        : ``;
    }}
`;


const NoContentContainer = (props) => {
  switch (props.lang) {
    case "th-TH":
    case "vi-VN":
      return (
        <Container
          style={{
            background:
              "url(" +
              process.env.PUBLIC_URL +
              `/assets/images/pcGamePage/no.jpg) no-repeat center`,
          }}
        >
          <NoContentText lang={i18n.language}>
            {i18n.t("promotion.emptyLine1")}
          </NoContentText>
          <NoContentText lang={i18n.language}>
            {i18n.t("promotion.emptyLine2")}
          </NoContentText>
        </Container>
      );
    case "en-US":
    case "zh-CN":
    case "zh-TW":
    default:
      return (
        <Container
          style={{
            background:
              "url(" +
              process.env.PUBLIC_URL +
              `/assets/images/pcGamePage/no_${i18n.language}.jpg) no-repeat center`,
          }}
        ></Container>
      );
  }
};

class LiveGame extends Component {
  constructor(props) {
    super(props);
    var providerList = ["ab", "ag", "bg", "evo", "sw", "wm", "sg"];
    var liveList = props.game.homePageGameList.filter((e) => {
      return e.type === GameTypeEnum.LIVELOBBY && providerList.includes(
        e.abbreviation.toLowerCase()
      );
    });

    this.state = {
      selected: 0,
      selectedGame: "",
      list: liveList,
    };
  }

  componentDidMount() {}
  componentDidUpdate(preProps, preStates) {
    if (
      preProps.game.homePageGameList.length !==
      this.props.game.homePageGameList.length
    ) {
      var providerList = ["ab", "ag", "bg", "evo", "sw", "wm", "sg"];
      var liveList = this.props.game.homePageGameList.filter((e) => {
        return e.type === GameTypeEnum.LIVELOBBY && providerList.includes(
          e.abbreviation.toLowerCase()
        );
      });
      this.setState({
        ...this.state,
        selected: 0,
        list: liveList,
      });
    }
  }

  handleSliderClick = (index, game) => {
    this.setState({ ...this.state, selected: index, selectedGame: game });
  };

  handleJoinGameClick = (params) => {
    if (this.props.account.token != null) {
      if (document.getElementById("audio") != null)
        document.getElementById("audio").volume = 0.0;

      var win = window.open(
        "/" +
          i18n.language +
          "/joingame/" +
          GameTypeEnum.LIVELOBBY +
          "/" +
          params.toUpperCase(),
        "_blank",
        "directories=no,titlebar=no,toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=no,width=1280,height=720"
      );

      var timer = setInterval(function () {
        if (win.closed) {
          clearInterval(timer);
          if (document.getElementById("audio") != null)
            document.getElementById("audio").volume = 1.0;
        }
      }, 1000);
    } else {
      this.props.showLogin(true);
    }
  };

  render() {
    return this.state.list.length ? (
      <Container>
        <LiveWrapper>
          <BottomContainer>
            <ScrollAnimation
              animateIn="fadeInLeft"
              duration={1}
              animateOnce={true}
              style={{ overflow: "visible" }}
            >
              <BottomNavItemContainer>
                {this.state.list.map((data, index) => {
                  return (
                    <BottomNavItem selected={this.state.selected === index}
                        maintenance={data.status != 0}>
                      <Maintenance>{i18n.t("transfer.maintenance")}</Maintenance>
                      <GameButton
                        selected={this.state.selected === index}
                        onClick={() => {
                          this.handleSliderClick(index, data.abbreviation);
                          this.handleJoinGameClick(
                            data.abbreviation,
                            data.type
                          );
                        }}
                        name={data.abbreviation}
                      >
                        {/* <img
                          alt={data.abbreviation}
                          src={
                            process.env.PUBLIC_URL +
                            `/assets/images/pcGamePage/live/${data.abbreviation.toLowerCase()}${
                              index === this.state.selected
                                ? "-selected.png"
                                : "-not-selected.png"
                            }`
                          }
                        /> */}
                      </GameButton>
                    </BottomNavItem>
                  );
                })}
              </BottomNavItemContainer>
            </ScrollAnimation>
          </BottomContainer>
        </LiveWrapper>
      </Container>
    ) : (<NoContentContainer lang={i18n.language}></NoContentContainer>
    );
  }
}

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
