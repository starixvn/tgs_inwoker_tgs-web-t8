import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { AppHistory } from "../../../history/History";
import ScrollAnimation from "react-animate-on-scroll";

import { SHOW_LOGIN } from "../../../api-services/constant/actionType";
import { GameTypeEnum } from "../../../api-services/utils/Enum";
import { GameService } from "../../../api-services/services/GameService";

import SlotAllPNG from "../../../assets/images/slot-all.png";
import SlotAllInactivePNG from "../../../assets/images/slot-all-inactive.png";

import Loading from "../../../components/App/Loading";

import i18n from "../../../utils/i18n";
import config from "../../../config/config";
import Common from "../../../utils/Common";

const Container = styled.div`
  width: 100%;
  height: auto;
  padding: 0px 0px;
  position: relative;
  min-height: ${(props) =>
    props.GamePage_SpecificBackground ? "900px" : "780px"};
  background: url(${(props) =>
        process.env.PUBLIC_URL +
        "/assets/images/pcGamePage/qipai/background" +
        (props.GamePage_SpecificBackground ? "-hk28" : "") +
        ".jpg"})
      no-repeat fixed 50% 100%/100% auto,
    #e3e3e3;
`;

const NoContentText = styled.div`
  color: #000;
  font-size: ${(props) =>
    props.lang === "zh-CN" || props.lang === "zh-TW" ? `3.2em` : `2.3em`};
  text-shadow: 0 0 18px #ffe14e;
  -webkit-text-stroke: 0.5px white;
  font-weight: bold;
  width: 450px;
  height: auto;
  margin-left: 180px;
  overflow: visible;
  font-family: "微軟正黑粗";
  &:first-child {
    margin-top: 210px;
  }
  &:last-child {
    ${(props) => (props.lang === "en-US" ? `font-size: 3.2em;` : ``)}
  }
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

const GameTabContainer = styled.div`
  display: flex;
  overflow: auto;
  width: 1280px;
  margin: 0 auto;
  margin-top: 70px;
`;

const GameTab = styled.div`
  background-color: #dcdcdc;
  color: #5a5656;
  border: 1px solid #ddd;
  border-radius: 5px;
  cursor: pointer;
  flex: 1;
  font-size: 14px;
  height: 95px;
  margin: 0 5px;
  padding: 0 10px;
  position: relative;
  text-align: center;
  ${(props) =>
    props.active
      ? `  
      background: linear-gradient(#0091fe,#20D0FF);
      color: #fff; 
      `
      : ``};
  &:first-child {
    margin-left: auto;
  }
  &:last-child {
    margin-right: auto;
  }
  &:hover {
    background-color: #f2f2f2;
  }
  &:before {
    content: "";
    display: block;
    height: 65px;
    margin: 3px auto 0;
    transition: 0.2s;
    width: 130px;
    background-image: url(${(props) =>
      process.env.PUBLIC_URL +
      `/assets/images/pcGamePage/slots/` +
      props.img +
      (props.active === true ? `-white` : `-color`) +
      `.png`});
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
  }
`;

const GameTabAll = styled(GameTab)`
  &:before {
    background-image: url(${(props) =>
      props.active === true ? `${SlotAllPNG}` : `${SlotAllInactivePNG}`});
    ${(props) => (props.active === true ? `filter: brightness(500%);` : ``)}
  }
`;

const DisabledOverlay = styled.div`
  height: 100%;
  width: 100&;
  display: none;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.75);
  position: relative;
  color: white;
  font-weight: bold;
  pointer-event: none;
  text-transform: capitalize;
  z-index: 3;
  cursor: not-allowed;
`;

const ItemContainer = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  overflow: visible;
`;

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

const GameListContainer = styled.div`
  position: relative;
  width: 100%;
  width: 1280px;
  margin: 0 auto;
  margin-top: 121px;
`;
const GameList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  padding-top: 15px;
  width: 100%;
  list-style: none;
}`;
const GameItem = styled.li`
  align-items: center;
  border-radius: 7px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  height: 125px;
  justify-content: center;
  margin: 0 20px 35px 0;
  padding-left: 130px;
  padding-right: 10px;
  position: relative;
  width: 150px;
`;
const GameItemImage = styled.div`
  & img {
    display: block;
    min-height: 150px;
    width: 100%;
  }
`;
const GameItemTitle = styled.div`
  color: #fff;
  font-size: 15px;
  font-weight: 700;
  line-height: 1.4;
  margin-bottom: 10px;
  text-align: center;
`;

const GameItemActionContainer = styled.div`
  display: flex;
  transition: 0.2s;
`;

const GameItemButton = styled.button`
  background-color: #20d0ff;
  border: 0;
  border-radius: 22.5px;
  color: #fff;
  cursor: pointer;
  font-size: 16px;
  height: 45px;
  padding: 0 40px;
  font-size: 14px;
  padding: 0;
  transition: background-color 0.4s, transform 0.4s;
  width: 136px;
`;

const GameItemJoinGameButton = styled(GameItemButton)`
  &:hover {
    filter: brightness(50%);
  }
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
class Qipai extends Component {
  constructor(props) {
    super(props);

    var qipaiList = props.game.homePageGameList.filter((item) => {
      return item.type == GameTypeEnum.QIPAI;
    });

    this.state = {
      selected: qipaiList[0],
      subMenu: null,
      trigger: true,
      list: qipaiList,
      selectedIndex: 0,
      first: true,
      type: GameTypeEnum.QIPAI,
      gameList: [],
      page: 1,
      platformList: [],
      loading: true,
      platform: "",
    };
  }
  componentDidMount() {
    this.getGameList();
    //test for fake input
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.platform !== this.state.platform && !this.loading) {
      this.getGameList();
    }
  }

  handleJoinGameClick = (kind) => {
    if (this.props.account.token != null) {
      window.open(
        "/" +
          i18n.language +
          "/joingame/" +
          GameTypeEnum.QIPAILOBBY +
          "/" +
          kind.toUpperCase(),
        "_blank",
        "directories=no,titlebar=no,toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=no,width=1280,height=720"
      );
    } else {
      this.props.showLogin(true);
    }
  };

  handleGameChange = (index) => {
    var gameSelected = this.state.list.filter(function (el) {
      return el.id === index;
    });
    this.setState({
      selected: gameSelected[0],
    });
  };

  handleSelectPlatform = (index) => {
    this.setState({
      ...this.state,
      platform: index,
    });
  };

  getGameList(
    page = this.state.page,
    platform = this.state.platform,
    type = this.state.type
  ) {
    this.setState({
      ...this.state,

      loading: true,
    });

    var result = GameService.GetGameList(platform, type);
    result.then((response) => {
      if (response.IsSuccess) {
        var data = response.data;

        if (page === 1) {
          this.setState({
            ...this.state,
            page: page,
            platform: platform,
            type: type,
            gameList: data,
            loading: false,
          });
        } else {
          this.setState({
            ...this.state,
            page: page,
            platform: platform,
            type: type,
            gameList: this.state.gameList.concat(data),
            loading: false,
          });
        }
      } else {
        this.setState({
          ...this.state,
          gameList: [],
          platform: platform,
          type: type,
          loading: false,
        });
      }
    });
  }

  render() {
    let list = null;
    if (this.state.gameList.length > 0) {
      list = this.state.gameList
        .filter((s) => {
          return s.isactive === true; // show only active game.
        })
        .map((el, i) => (
          <GameItem>
            <GameItemImage>
              <img
                src={`${
                  config.sourceUrl
                }${el.gpcode.toUpperCase()}/${Common.getCDNLanguagePrefix()}/${
                  el.code
                }.jpg`}
                alt={i}
              ></img>
            </GameItemImage>
            <GameItemTitle>{el.name}</GameItemTitle>
            <GameItemActionContainer>
              <GameItemJoinGameButton
                onClick={() => this.handleJoinGameClick(el.gpcode, el.id)}
              >
                開始遊戲
              </GameItemJoinGameButton>
            </GameItemActionContainer>
          </GameItem>
        ));
    }
    return this.state.list.length ? (
      <Container
        GamePage_SpecificBackground={
          config.features.GamePage_SpecificBackground
        }
      >
        <GameTabContainer>
          <GameTabAll
            active={this.state.platform == ""}
            onClick={() => {
              this.handleSelectPlatform("");
            }}
          ></GameTabAll>

          {this.state.list.map((row, index) => {
            return (
              <GameTab
                key={index}
                img={row.abbreviation.toLowerCase()}
                onClick={() => {
                  this.handleSelectPlatform(row.abbreviation);
                }}
                active={this.state.platform == row.abbreviation}
                maintenance={row.status != 0}
                img={row.abbreviation.toLowerCase()}
                active={this.state.platform == row.abbreviation}
              >
                {row.abbreviation}
              </GameTab>
            );
          })}
        </GameTabContainer>
        <GameListContainer>
          <GameList>{list}</GameList>
        </GameListContainer>
        <Loading show={this.state.loading}></Loading>
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
export default connect(mapStateToProps, mapDispatchToProps)(Qipai);
