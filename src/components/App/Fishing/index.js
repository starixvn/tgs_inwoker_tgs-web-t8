import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { AppHistory } from "../../../history/History";

import { GameService } from "../../../api-services/services/GameService";
import { SHOW_LOGIN } from "../../../api-services/constant/actionType";
import { GameTypeEnum } from "../../../api-services/utils/Enum";

import SlotAllPNG from "../../../assets/images/slot-all.png";
import SlotAllInactivePNG from "../../../assets/images/slot-all-inactive.png";

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

const GameTabContainer = styled.div`
  display: flex;
  overflow: auto;
  padding-right: 60px;
  background-color: #b2b2b2;
`;
const GameTab = styled.div`
  cursor: pointer;
  flex-shrink: 0;
  font-size: 14px;
  height: 96px;
  padding: 3px;
  position: relative;
  text-align: center;
  transition: color 0.4s, filter 0.4s;
  z-index: 1;
  filter: ${(props) =>
    props.active === true
      ? `brightness(500%) grayscale(100%);`
      : `brightness(50%) grayscale(100%);`};
  margin: 0 auto;
  background: url(${(props) =>
      process.env.PUBLIC_URL +
      `/assets/images/pcGamePage/slots/` +
      props.img +
      (props.active === true ? `-white` : `-color`) +
      `.png`})
    no-repeat;
  background-position: center;
  background-size: contain;
  width: 100px;
`;

const GameTabAll = styled(GameTab)`
  background: url(${(props) =>
      props.active === true ? `${SlotAllPNG}` : `${SlotAllInactivePNG}`})
    no-repeat;
  background-position: center;
  background-size: contain;
  width: 100px;
`;

const DisabledOverlay = styled.div`
  height: 100%;
  width: 100%;
  display: none;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.75);
  position: absolute;
  color: white;
  font-weight: bold;
  pointer-event: none;
  text-transform: capitalize;
  z-index: 3;
  cursor: not-allowed;
  text-align: center;
`;

const GameTabButton = styled.div`
  width: 141px;
  height: 95px;
  background-color: #b2b2b2;
  position: relative;
  float: left;
  z-index: 1;

  &:hover {
    cursor: pointer;
  }

  &:hover:after {
    background-color: #0091fe;
    transform: scaleY(1);
  }

  &:after {
    content: "";
    height: 100%;
    left: 0;
    position: absolute;
    top: 0;
    transform: scaleY(0);
    transition: transform 0.4s;
    width: 100%;
    z-index: -1;
  }

  &:first-child {
    margin-left: auto;
  }
  &:last-child {
    margin-right: auto;
  }

  ${(props) =>
    props.active
      ? `  background-color: #0091FE; `
      : `  background-color: #B2B2B2;`};

  ${({ maintenance }) => {
    return maintenance
      ? `
          pointer-events: none !important;
        ${DisabledOverlay}{
          display: flex; 
          pointer-events: none !important;
          cursor: not-allowed;
        }
    
        ${GameTab}{
          pointer-events: none;
         
        }
        `
      : ``;
  }}

  &:hover ${GameTab} {
    background: url(${(props) =>
      process.env.PUBLIC_URL +
      `/assets/images/pcGamePage/slots/` +
      props.img +
      `-white.png`})
      no-repeat;
    background-position: center;
    background-size: contain;
    filter: brightness(500%) grayscale(100%);
    transition: filter 3s;
  }
  &:hover ${GameTabAll} {
    background: url(${SlotAllInactivePNG}) no-repeat;
    background-position: center;
    background-size: contain;
    filter: brightness(500%) grayscale(100%);
    transition: filter 1s;
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

  & > img {
    width: 150px;
    height: 150px;
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
      platform: this.props.match.params.platform
        ? this.props.match.params.platform
        : "",
    };
  }
  componentDidMount() {
    this.getGameList();
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.type !== this.state.type ||
      prevProps.match.params.platform !== this.props.match.params.platform ||
      prevProps.match.url !== this.props.match.url
    ) {
      if (prevProps.match.url !== this.props.match.url) {
        window.scrollTo({ top: 0, behavior: "smooth" });

        var platform = this.props.match.params.platform
          ? this.props.match.params.platform
          : "";

        this.getGameList(1, platform, GameTypeEnum.FISH);
      } else if (
        prevProps.match.params.platform !== this.props.match.params.platform
      ) {
        window.scrollTo({ top: 0, behavior: "smooth" });
        this.setState({
          ...this.state,
          platform: this.props.match.params.platform
            ? this.props.match.params.platform
            : "",
        });
      } else {
        this.getGameList();
      }
    }
  }

  handleJoinGameClick = (gpcode, gpid) => {
    if (this.props.token) {
      Common.closePreviousPopup();
      this.props.history.push(`/fish/play/${gpcode}/${gpid}`);
    } else {
      this.props.showLogin(true);
    }
  };

  handleParentClick = (platform) => {
    const type =
      this.props.match.url.indexOf("fish") >= 0
        ? "fish"
        : this.props.match.url.indexOf("slots") >= 0
        ? "slots"
        : "electron";
    AppHistory.push(`/${type}/${platform}`);
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
                {i18n.t("common.joinGame")}
              </GameItemJoinGameButton>
            </GameItemActionContainer>
          </GameItem>
        ));
    }

    return (
      <Container>
        <GameTabContainer>
          <GameTabButton
            active={this.state.platform === ""}
            onClick={() => this.handleParentClick("")}
          >
            <GameTabAll active={this.state.platform === ""}></GameTabAll>
          </GameTabButton>

          {this.props.game.homePageGameList

            .filter((ele) => {
              return ele.type === this.state.type; //check for only fish enum.
            })

            .map((row, index) => {
              return (
                <GameTabButton
                  key={index}
                  img={row.abbreviation.toLowerCase()}
                  active={this.state.platform === row.abbreviation}
                  onClick={() => this.handleParentClick(row.abbreviation)}
                  maintenance={row.status !== 0}
                >
                  <DisabledOverlay>
                    {i18n.t("transfer.maintenance")}
                  </DisabledOverlay>
                  <GameTab
                    img={row.abbreviation.toLowerCase()}
                    active={this.state.platform === row.abbreviation}
                  ></GameTab>
                </GameTabButton>
              );
            })}
        </GameTabContainer>
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
