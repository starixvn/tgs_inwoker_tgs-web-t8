import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import Common from "../../../utils/Common";

import Slider from "./Slider";
import { withRouter } from "react-router-dom";

import Marquee from "./Marquee";

import {
  SHOW_MODAL,
  SHOW_LOGIN,
} from "../../../api-services/constant/actionType";
import { GameTypeEnum } from "../../../api-services/utils/Enum";

import i18n from "../../../utils/i18n";
import SecondSection from "./SecondSection";
import ThirdSection from "./ThirdSection";
import FourthSection from "./FourthSection";
import FifthSection from "./FifthSection";
import BGJPG from "../../../assets/images/home/section/bg.jpg";
import Section1FishPNG from "../../../assets/images/home/section/section1-fish.png";
import Section1LotteryPNG from "../../../assets/images/home/section/section1-lottery.png";
import Section1ElectronPNG from "../../../assets/images/home/section/section1-electron.png";
import TextBgPNG from "../../../assets/images/home/section/text-bg.png";
import ScrollAnimation from "react-animate-on-scroll";
import { Grid } from "@material-ui/core";

import config from "../../../config/config";

import PopupAnnouncement from "./PopupAnnouncement";
const HomeContainer = styled.div`
  width: 100%;
  overflow: hidden;
`;
const SliderContainer = styled.div`
  position: relative;
`;

const MarqueeContainer = styled.div`
  position: absolute;
  width: 100%;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
`;
const SectionContainer = styled.div`
  //background: url(${BGJPG}) no-repeat;
  //background-position: center;
  //background-size: cover;
  background-color: #000000;
  width: 100%;
`;
const FirstSection = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  min-height: 460px;
  padding-top: 110px;
  overflow: visible;
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
  bottom: 76px;
  left: ${(props) => (i18n.language === "vi-VN" ? "0px" : "16px")};
  width: 160px;
  padding-left: 30px;
`;
const FirstSectionItemLabel = styled(Grid)`
  text-transform: uppercase;
`;

const FirstSectionItemButton = styled(Grid)`
  font-size: 14px;
  color: #fff;
  text-align: center;
  width: 85px;
  border-radius: 6px;
  border: solid 1px #e4eaff;
  margin-top: 25px;
  height: 34px;
  line-height: 2em;
  transition: all .3s;
  &:hover {
    cursor: pointer;
    background-color: #20D0FF;
    transition: all .3s;
  }
`;

const FirstSectionItem = styled(Grid)`
  background: url(${(props) => props.img}) no-repeat;
  background-position: 0% 100%;
  margin: 0 auto;
  width: 469px;
  height: 272px;
  color: #fff;
  font-size: ${(props) => (i18n.language === "vi-VN" ? "1.4em" : "1.75em")};
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  transition: transform .3s;
  &:hover{
    transform: scale(1.05);
    transition: transform .3s;
  }
`;

class Home extends Component {
  constructor(props) {
    super(props);

    var displayGame = this.getHomePageDisplayGame();
    this.state = {
      marqueeText: [],
      banner_list: [],
      wm: displayGame.wm,
      ky: displayGame.ky,
      openAnnouncement: true,
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

  render() {
    return (
      <HomeContainer>
        <SliderContainer>
          <Slider list={this.props.ui.board_list}></Slider>
          {/* <MarqueeContainer>
            <Marquee text={this.props.ui.marqueeText}></Marquee>
          </MarqueeContainer> */}
        </SliderContainer>
        <SectionContainer>
          <FirstSection
            style={{
              display: "grid",
              "grid-template-columns": config.features
                .HomePage_FirstSection6Widget
                ? "auto auto auto"
                : "auto auto auto auto",
            }}
          >
            {(() => {
              const MenuItemList = [
                {
                  path: `electron`,
                  title: i18n.t("web.home.Section1Electron"),
                  img: Section1ElectronPNG,
                  gameType: [GameTypeEnum.TABLEGAME],
                  sortingHK28: 6,
                  sorting: 1,
                },
                {
                  path: `fish`,
                  title: i18n.t("web.home.Section1Fishing"),
                  img: Section1FishPNG,
                  gameType: [GameTypeEnum.FISH],
                  sortingHK28: 5,
                  sorting: 3,
                },
                {
                  path: "lottery",
                  title: i18n.t("web.home.Section1Lottery"),
                  img: Section1LotteryPNG,
                  gameType: [GameTypeEnum.LOTTERYLOBBY],
                  sortingHK28: 7,
                  sorting: 2,
                },
              ];
              var count = 0;
              return MenuItemList.sort((a, b) => {
                if (config.features.MenuItem_Sorting_HK28) {
                  return a.sortingHK28 > b.sortingHK28 ? 1 : -1;
                } else {
                  return a.sorting > b.sorting ? 1 : -1;
                }
              }).map((item, index) => {
                var list = this.props.game.homePageGameList.filter(
                  (game) => item.gameType.indexOf(game.type) >= 0
                );

                if (
                  list.length > 0 &&
                  index < (config.features.PopupAnnouncement ? 6 : 4)
                ) {
                  count++;
                  return (
                    <ScrollAnimation
                      animateIn="fadeInLeft"
                      duration={1}
                      animateOnce={true}
                      style={{ overflow: "visible" }}
                    >
                      <FirstSectionItem item spacing={0} img={item.img}>
                        <FirstSectionItemBg
                          container
                          direction="row"
                          justify="flex-start"
                          alignItems="center"
                        >
                          <FirstSectionItemLabel item>
                            {item.title}
                          </FirstSectionItemLabel>
                          <FirstSectionItemButton
                            onClick={() => {
                              window.scrollTo({ top: 0, behavior: "smooth" });
                              this.props.history.push(
                                `/${i18n.language}/${item.path}`
                              );
                            }}
                          >
                            {i18n.t("withdrawal.checkDetails")}
                          </FirstSectionItemButton>
                        </FirstSectionItemBg>
                      </FirstSectionItem>
                    </ScrollAnimation>
                  );
                }
              });
            })()}
          </FirstSection>
          <SecondSection navigate={this.handleNavigateClick} />
          <ScrollAnimation
            animateIn="fadeInLeft"
            duration={1}
            animateOnce={true}
            style={{ overflow: "visible" }}
          >
            <ThirdSection></ThirdSection>
          </ScrollAnimation>
          <ScrollAnimation
            animateIn="fadeInRight"
            duration={1}
            animateOnce={true}
            style={{ overflow: "visible" }}
          >
            <FourthSection></FourthSection>
          </ScrollAnimation>
          <ScrollAnimation
            animateIn="fadeInLeft"
            duration={1}
            animateOnce={true}
            style={{ overflow: "visible" }}
          >
            <FifthSection></FifthSection>
          </ScrollAnimation>
        </SectionContainer>
        {/* {this.props.game.providerList.filter((e) => {
          return e.abbreviation === "KY";
        }).length === 0 ? (
          <FourthSection></FourthSection>
        ) : (
          <ThirdSection handleJoinGameClick={this.handleJoinGameClick} />
        )} */}

        {(() => {
          if (
            config.features.PopupAnnouncement &&
            this.props.ui.marqueeText.length > 0
          ) {
            var row = this.props.ui.marqueeText[0];

            return (
              <PopupAnnouncement
                open={this.state.openAnnouncement}
                onClose={() => {
                  this.setState({ ...this.state, openAnnouncement: false });
                }}
                text={
                  row.localization !== null && row.localization.content
                    ? row.localization.content
                    : row.content
                }
                header={
                  row.localization !== null && row.localization.subject
                    ? row.localization.subject
                    : row.subject
                }
              ></PopupAnnouncement>
            );
          }
        })()}
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
