import React, { Component } from "react";
import { connect } from "react-redux";
import styled, { css, keyframes } from "styled-components";

import { GameService } from "../../../api-services/services/GameService";
import { SHOW_LOGIN } from "../../../api-services/constant/actionType";
import { GameTypeEnum, GameEnum } from "../../../api-services/utils/Enum";

import i18n from "../../../utils/i18n";
import config from "../../../config/config";
import Common from "../../../utils/Common";

const Container = styled.div`
  width: 100%;
  height: auto;
  min-height: 780px;
  position: relative;
  background: url(${(props) =>
      process.env.PUBLIC_URL +
      "/assets/images/pcGamePage/fish/background" +
      (props.GamePage_SpecificBackground ? "-hk28" : "") +
      ".jpg"})
    no-repeat;
  background-attachment: fixed;
  background-size: cover;
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

const GameContainer = styled.div`
  width: 1280px;
  align-items: flex-start;
  display: flex;
  flex-wrap: wrap;
  margin: 0 auto;
  margin-top: 75px;
`;
const GameItem = styled.div`
  width: 190px;
  height: auto;
  margin: 20px 25px;
  text-align: center;
`;

const GameItemImage = styled.div`
  cursor: pointer;
  background-color: transparent;
  border-radius: 0 !important;
  box-shadow: none !important;
  filter: drop-shadow(0 10px 6px rgba(0, 0, 0, 0.7));
  transition: 0.3s ease;
  display: block;
  overflow: hidden;
  position: relative;
  width: 100%;
  padding-top: 10px;
  ${GameItem}:hover & {
    transform: translateY(-4px);
  }
`;

const GameItemTitle = styled.div`
  font-size: 16px;
  text-align: center;
  transition: 0.3s;
  width: 100%;
  color: #ffffff;
  margin-top: 15px;
`;

const GameItemActionContainer = styled.div``;

const GameItemButton = styled.button`
  background-color: ${({ theme }) => theme.primary};
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
  width: 80%;

  &:hover {
    transform: scale3d(1.06, 1.06, 1);
  }
`;

const GameItemJoinGameButton = styled(GameItemButton)`
  margin-top: 18px;
  &:hover {
    filter: grayscale(0.3);
  }
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
              `/assets/images/pcGamePage/no.jpg) no-repeat`,
            backgroundAttachment: "fixed",
            backgroundSize: "cover",
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
              `/assets/images/pcGamePage/no_${i18n.language}.jpg) no-repeat`,
            backgroundAttachment: "fixed",
            backgroundSize: "cover",
          }}
        ></Container>
      );
  }
};
class Fishing extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loaded: false,
      gameList: [],
      page: 1,
      limit: 25,
      total: 0,
      type: GameTypeEnum.FISH,
      platform: "",
    };
  }
  componentDidMount() {
    this.getGameList();
  }
  componentDidUpdate(preProps, preStates) {}

  handleJoinGameClick = (gpcode, gpid) => {
    if (this.props.token) {
      this.props.history.push(`/${i18n.language}/fish/play/${gpcode}/${gpid}`);
    } else {
      this.props.showLogin(true);
    }
  };

  // handleJoinGameClick = (gid) => {
  //   if (this.props.token) {
  //     Common.PopupCenter(
  //       "/" +
  //         i18n.language +
  //         "/joingame/" +
  //         GameTypeEnum.FISH +
  //         "/" +
  //         GameEnum.JDB +
  //         "/" +
  //         gid,
  //       1280,
  //       720
  //     );
  //   } else {
  //     this.props.showLogin(true);
  //   }
  // };
  getGameList(
    page = this.state.page,
    platform = this.state.platform,
    type = this.state.type
  ) {
    var result = GameService.GetGameList(platform, type);
    result.then((response) => {
      if (response.IsSuccess) {
        if (page === 1) {
          this.setState({
            ...this.state,
            page: page,
            platform: platform,
            type: type,
            gameList: response.data,
            loading: false,
          });
        } else {
          this.setState({
            ...this.state,
            page: page,
            platform: platform,
            type: type,
            gameList: this.state.gameList.concat(response.data),
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
  handleGameChange = (game) => {
    this.setState({
      selected: game,
    });
  };

  render() {
    let list = null;
    if (this.state.gameList.length > 0) {
      list = this.state.gameList
        .filter((s) => {
          return s.isactive === true; // show only active game.
        })
        .map((el, i) => (
          <GameItem>
            <GameItemImage
              onClick={() => this.handleJoinGameClick(el.gpcode, el.id)}
            >
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

    return this.state.gameList.length ? (
      <Container>
        <GameContainer>{list}</GameContainer>
      </Container>
    ) : (
      <NoContentContainer lang={i18n.language}></NoContentContainer>
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
    token: state.account.token,
    game: state.game,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Fishing);
