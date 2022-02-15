import React, { Component } from "react";
import { connect } from "react-redux";
import styled, { css, keyframes } from "styled-components";
import BtnRedPNG from "../../../assets/images/btn-red.png";
import BtnRedHoverPNG from "../../../assets/images/btn-red-hover.png";

import { GameService } from "../../../api-services/services/GameService";
import { SHOW_LOGIN } from "../../../api-services/constant/actionType";
import { GameTypeEnum, GameEnum } from "../../../api-services/utils/Enum";
import BtnJoinPNG from "../../../assets/images/btn-join.png";
import BtnJoinHoverPNG from "../../../assets/images/btn-join-hover.png";
import _633Lottery from "../../../assets/images/lottery/633-lotteryball.png";
import _633Description from "../../../assets/images/lottery/633-lotterydescription.png";

import i18n from "../../../utils/i18n";
import config from "../../../config/config";
import Common from "../../../utils/Common";

import JDBLogo from "../../../assets/images/fish/jdb_logo.png";

const Container = styled.div`
  width: 100%;
  height: auto;
  min-height: 780px;
  position: relative;
  background: url(${(props) =>
      `${process.env.PUBLIC_URL}/assets/images/pcGamePage/fish/background.jpg`})
      no-repeat fixed 50% 100%/100% auto, #e3e3e3;
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
  width: 80%;

  &:hover {
    transform: scale3d(1.06, 1.06, 1);
  }
`;

const GameItemJoinGameButton = styled(GameItemButton)`
  margin-top: 18px;
  &:hover {
    background-color: #1db8e1;
  }
`;

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
  handleJoinGameClick = (gid) => {
    if (this.props.token) {
      Common.PopupCenter(
        "/" +
          i18n.language +
          "/joingame/" +
          GameTypeEnum.FISH +
          "/" +
          GameEnum.JDB +
          "/" +
          gid,
        1280,
        720
      );
    } else {
      this.props.showLogin(true);
    }
  };
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
            <GameItemImage onClick={() => this.handleJoinGameClick(el.gpcode, el.id)}>
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

    return (
      <Container>
        <GameContainer>{list}</GameContainer>
      </Container>
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
