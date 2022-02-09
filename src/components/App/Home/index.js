import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import Common from "../../../utils/Common";

import Slider from "./Slider";
import { withRouter } from "react-router-dom";

import Marquee from "./Marquee";
import FloatPanel from "./FloatPanel";
import {SHOW_MODAL, SHOW_LOGIN} from "../../../api-services/constant/actionType";
import {GameTypeEnum} from "../../../api-services/utils/Enum";
import i18n from "../../../utils/i18n";
import SecondSection from "./SecondSection";
import ThirdSection from "./ThirdSection";
import BGJPG from "../../../assets/images/home/section/sections-bg.jpg";
import Section1ChessPNG from "../../../assets/images/home/section/section1-chess.png";
import Section1FishPNG from "../../../assets/images/home/section/section1-fish.png";
import Section1LotteryPNG from "../../../assets/images/home/section/section1-lottery.png";
import Section1SlotPNG from "../../../assets/images/home/section/section1-slot.png";

import TitleHotGames from "../../../assets/images/home/section/title-hot-game.png";
import TitleCardGames from "../../../assets/images/home/section/title-card-game.png";

import TextBgPNG from "../../../assets/images/home/section/text-bg.png";
import ScrollAnimation from "react-animate-on-scroll";
import { Grid, Container } from "@material-ui/core";
import AnotherFloatPanel from "./AnotherFloatPanel";
import FourthSection from "./FourthSection";
import config from "../../../config/config";
const HomeContainer = styled.div`
  width: 100%;
  overflow: hidden;
`;
const SliderContainer = styled.div`
  position: relative;
`;

const MarqueeContainer = styled.div`
  margin-top: 50px;
`;
const SectionContainer = styled.div`
  background: url(${BGJPG}) no-repeat;
  background-position: top;
  background-position-y: -600px;
  width: 100%;
`;
const FirstSection = styled.div`
  width: 1280px;
  margin: 0 auto;
  height: 460px;
  padding-top: 63px;
  display: grid;
  grid-template-columns: auto auto auto auto;
`;
const FirstSectionItemBg2 = styled.div`
  background: url(${TextBgPNG}) no-repeat;
  background-size: 283px 50px;
  position: absolute;
  bottom: 44px;
  left: 13px;
  height: 50px;
  width: 0;
  transition: width 300ms linear;
`;
const FirstSectionItemBg = styled(Grid)`
  position: absolute;
  bottom: 38px;
  left: 16px;
  height: 61px;
  width: 283px;
  padding-left: 14px;
`;
const FirstSectionItemLabel = styled(Grid)``;
const FirstSectionItem = styled(Grid)`
  background: url(${(props) => props.img}) no-repeat;
  background-size: contain;
  background-position: center;
  width: 320px;
  height: 282px;
  color: #fff;
  font-size: 1.8em;
  padding-top: 215px;
  padding-left: 38px;
  position: relative;
  &:hover {
    cursor: pointer;
  }
`;

const TitleSection = styled.div`
  display: flex;
  width: 1920px;
  justify-content: center;
`;

class Home extends Component {
  constructor(props) {
    super(props);

    var displayGame = this.getHomePageDisplayGame();
    this.state = {
      marqueeText: [],

      wm: displayGame.wm,
      ky: displayGame.ky,
    };
  }

  componentDidMount() {
    let promotionId = "";
    let promotionChannelId = "";

    if (this.props.match.params) {
      promotionId = this.props.match.params.promotionid || "";
      promotionChannelId = this.props.match.params.promotionchannelid || "";
    }
    localStorage.setItem("promotionId", promotionId);
    localStorage.setItem("promotionChannelId", promotionChannelId);
  }
  componentDidUpdate(preProps) {
    if (
      preProps.game.homePageGameList.length !==
        this.props.game.homePageGameList.length &&
      this.props.game.homePageGameList.length > 0
    ) {
      var displayGame = this.getHomePageDisplayGame();
      this.setState({
        ...this.state,
        wm: displayGame.wm,
        ky: displayGame.ky,
      });
    }
  }
  getHomePageDisplayGame() {
    var wm = null,
      ky = null;
    if (this.props.game.homePageGameList.length > 0) {
      var wmList = this.props.game.homePageGameList.filter(
        (item) => item.type === "Wm"
      );
      var kyList = this.props.game.homePageGameList.filter(
        (item) => item.abbreviation === "Ky"
      );
      if (wmList.length >= 1) {
        wm = wmList[0];
      } else {
        wm = this.props.game.homePageGameList.filter(
          (item) => item.type === GameTypeEnum.LIVE
        )[0];
      }
      if (kyList.length >= 1) {
        ky = kyList[0];
      } else {
        ky = this.props.game.homePageGameList.filter(
          (item) => item.type === GameTypeEnum.QIPAI
        )[0];
      }
    }

    return { wm, ky };
  }
  handleJoinGameClick = (gameType, path, gameCode, url) => {
    if (this.props.token !== "" && this.props.token !== null) {
      var slotPageGameType = [
        GameTypeEnum.FISH,
        GameTypeEnum.SLOT,
        GameTypeEnum.TIGERSLOT,
        GameTypeEnum.SPORTS,
        GameTypeEnum.ESPORTS,
        GameTypeEnum.TABLEGAME,
      ];
      if (slotPageGameType.indexOf(gameType) >= 0) {
        if (
          gameType == GameTypeEnum.SPORTS ||
          gameType == GameTypeEnum.ESPORTS
        ) {
          if (!this.props.token) {
            this.props.showLogin(true);
          } else {
            this.props.history.push(
              `/${i18n.language}/sports/play/${gameCode}/${gameType}`
            );
          }
        } else {
          this.props.history.push(`/${i18n.language}/${path}/${gameCode}`);
        }
      } else {
        Common.PopupCenter(url, gameCode, 1280, 720);
      }
    } else {
      this.props.showLogin(true);
    }
  };

  handleNavigateClick = (url) => {
    this.props.history.push(url);
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  gameMenu = [
    {
      img: Section1LotteryPNG,
      type: "lottery",
      name: i18n.t("web.home.Section1Lottery"),
    },
    {
      img: Section1FishPNG,
      type: "fish",
      name: i18n.t("web.home.Section1FISHing"),
    },
    {
      img: Section1SlotPNG,
      type: "slots",
      name: i18n.t("web.home.Section1Slot"),
    },
    {
      img: Section1ChessPNG,
      type: "chess",
      name: i18n.t("web.home.Section1Chess"),
    },
  ];

  render() {
    return (
      <HomeContainer>
        <SliderContainer>
          <Slider></Slider>

          {
            //   <AnotherFloatPanel
            //     onhandleDepositClick={this.props.onhandleDepositClick}
            //     onhandleShowCSClick={this.props.onhandleShowCSClick}
            //     onDownloadClick={() =>
            //       this.handleNavigateClick("/" + i18n.language + "/download")
            //     }
            //   ></AnotherFloatPanel>
          }
        </SliderContainer>
        <SectionContainer>
          <MarqueeContainer>
            <Marquee text={this.props.ui.marqueeText}></Marquee>
          </MarqueeContainer>
          <FirstSection>
            {this.gameMenu.map((data, index) => {
              return (
                <ScrollAnimation
                  animateIn="fadeInLeft"
                  duration={1}
                  animateOnce={true}
                  style={{ overflow: "visible" }}
                >
                  <FirstSectionItem
                    item
                    spacing={0}
                    img={data.img}
                    onClick={() => {
                      window.scrollTo({ top: 0, behavior: "smooth" });
                      this.props.history.push(`/${i18n.language}/${data.type}`);
                    }}
                  >
                    <FirstSectionItemBg2></FirstSectionItemBg2>
                    <FirstSectionItemBg
                      container
                      direction="row"
                      justify="flex-start"
                      alignItems="center"
                    ></FirstSectionItemBg>
                  </FirstSectionItem>
                </ScrollAnimation>
              );
            })}
          </FirstSection>
          <TitleSection>
            <img src={TitleHotGames} alt="hotgamestitle" />
          </TitleSection>
          <SecondSection />
          <ThirdSection />
          <TitleSection>
            <img src={TitleCardGames} alt="cardgametitle" />
          </TitleSection>
          <FourthSection handleJoinGameClick={this.handleJoinGameClick} />
        </SectionContainer>
      </HomeContainer>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    showModal: (pageName) => {
      dispatch({ type: SHOW_MODAL, pageName });
    },
    showLogin: (payload) => {
      dispatch({ type: SHOW_LOGIN, payload });
    },
  };
};
const mapStateToProps = (state) => {
  return {
    token: state.account.token,
    ui: state.ui,
    game: state.game,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Home));
