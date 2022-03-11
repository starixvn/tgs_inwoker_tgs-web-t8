import React, { Component } from "react";
import { connect } from "react-redux";
import styled, { keyframes } from "styled-components";
import { AppHistory } from "../../../history/History";
import { withStyles } from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";

import { GameService } from "../../../api-services/services/GameService";
import { gameAction } from "../../../api-services/actions/gameAction";
import { GameTypeEnum, SlotFilterType } from "../../../api-services/utils/Enum";
import { SHOW_LOGIN } from "../../../api-services/constant/actionType";

import SearchIcon from "../../../assets/images/search.svg";
import SearchActiveIcon from "../../../assets/images/search-active.svg";

import SlotAllPNG from "../../../assets/images/slot-all.png";
import SlotAllInactivePNG from "../../../assets/images/slot-all-inactive.png";

import SlotAllGamePNG from "../../../assets/images/slot-allgame.png";
import SlotAllGameActivePNG from "../../../assets/images/slot-allgame-active.png";
import SlotHotGamePNG from "../../../assets/images/slot-hotgame.png";
import SlotHotGameActivePNG from "../../../assets/images/slot-hotgame-active.png";
import SlotNewGamePNG from "../../../assets/images/slot-newgame.png";
import SlotNewGameActivePNG from "../../../assets/images/slot-newgame-active.png";
import SlotBookmarkPNG from "../../../assets/images/slot-bookmark.png";
import SlotBookmarkActivePNG from "../../../assets/images/slot-bookmark-active.png";
import SlotFishGamePNG from "../../../assets/images/slot-fishgame.png";
import SlotFishGameActivePNG from "../../../assets/images/slot-fishgame-active.png";
import SlotHistoryGamePNG from "../../../assets/images/slot-history.png";
import SlotHistoryGameActivePNG from "../../../assets/images/slot-history-active.png";

import SlotBookmark1PNG from "../../../assets/images/slot-bookmark-1.png";
import SlotBookmark2PNG from "../../../assets/images/slot-bookmark-2.png";

import Loading from "../../../components/App/Loading";

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
      "/assets/images/pcGamePage/slots/bg-" +
      props.type +
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

const InnerWrap = styled.div`
  width: 1020px;
  min-height: 780px;
  background: rgba(0, 0, 0, 0.8);
  margin: 35px auto 0 auto;
  padding: 10px;
  box-sizing: border-box;
  overflow-y: auto;
  padding-bottom: 50px;
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
`;

const GameTabButton = styled.div`
  width: 141px;
  height: 95px;
  background-color: #B2B2B2;
  position: relative;
  float: left;
  z-index: 1;

  &:hover {
    cursor: pointer;
  }

  &:hover:after {
    background-color: #0091FE;
    transform: scaleY(1);
  }

  &:after { 
    content: "";
    height: 100%;
    left: 0;
    position: absolute;
    top: 0;
    transform: scaleY(0);
    transition: transform .4s;
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
    background: url(${SlotAllInactivePNG})
      no-repeat;
      background-position: center;
      background-size: contain;
    filter: brightness(500%) grayscale(100%);
    transition: filter 1s;
  }
`;

const GameDisplayContainer = styled.div`
  display: flex;
  width: 1280px;
  margin: 0 auto;
  justify-content: space-between;
`;
const GameSubFilterContainer = styled.div`
  width: 150px;
  margin: 35px auto 0 auto;
`;

const CategoryContainer = styled.div`
  margin: 7px 0;
  border: 1px solid #ffffff9c;
  border-radius: 5px;
  width: 150px;
  display: flex;
  height: 56px;
  align-items: center;
  background-color: #303030;
  box-sizing: border-box;
  font-size: 16px;
  float: left;
  z-index: 1;
  position: relative;
  &:hover {
    cursor: pointer;
    color: #272727;
  }

  ${(props) =>
    props.active
      ? ` color:  #272727;
      background-color: #20D0FF;`
      : ` color:  #ffffff;`}

  &:hover:after {
    left: -10%;
    width: 120%;
  }
  &:after {
    background-color: #20d0ff;
    content: "";
    height: 100%;
    position: absolute;
    right: -10%;
    top: 0;
    transform: skew(-30deg);
    transition: width 0.4s linear;
    width: 0;
    z-index: -1;
  }
`;
const CategoryText = styled.div`
  margin-right: auto;
`;
const FilterItem = styled.div`
  background-repeat: no-repeat;
  margin: 0 auto;
  height: 30px;
  width: 30px;
  float: left;
  background-size: contain;
  background-position-y: center;
  background-repeat: no-repeat;
`;

const AllGameFilterItem = styled(FilterItem)`
  ${CategoryContainer}:hover & {
    background-image: url(${SlotAllGameActivePNG});
  }
  ${(props) =>
    props.active
      ? `  background-image: url(${SlotAllGameActivePNG});`
      : `  background-image: url(${SlotAllGamePNG});`};
`;
const HotGameFilterItem = styled(FilterItem)`
  ${CategoryContainer}:hover & {
    background-image: url(${SlotHotGameActivePNG});
  }
  ${(props) =>
    props.active
      ? `  background-image: url(${SlotHotGameActivePNG});`
      : `  background-image: url(${SlotHotGamePNG});`};
`;
const NewGameFilterItem = styled(FilterItem)`
  ${CategoryContainer}:hover & {
    background-image: url(${SlotNewGameActivePNG});
  }
  ${(props) =>
    props.active
      ? `  background-image: url(${SlotNewGameActivePNG});`
      : `  background-image: url(${SlotNewGamePNG});`};
`;
const BookmarkFilterItem = styled(FilterItem)`
  ${CategoryContainer}:hover & {
    background-image: url(${SlotBookmarkActivePNG});
  }
  ${(props) =>
    props.active
      ? `  background-image: url(${SlotBookmarkActivePNG});`
      : `  background-image: url(${SlotBookmarkPNG});`};
`;
const FishGameFilterItem = styled(FilterItem)`
  ${CategoryContainer}:hover & {
    background-image: url(${SlotFishGameActivePNG});
  }
  ${(props) =>
    props.active
      ? `  background-image: url(${SlotFishGameActivePNG});`
      : `  background-image: url(${SlotFishGamePNG});`};
`;
const HistoryFilterItem = styled(FilterItem)`
  ${CategoryContainer}:hover & {
    background-image: url(${SlotHistoryGameActivePNG});
  }
  ${(props) =>
    props.active
      ? `  background-image: url(${SlotHistoryGameActivePNG});`
      : `  background-image: url(${SlotHistoryGamePNG});`};
`;

const GameDesc = styled.div`
  height: 28px;
  float: right;
  background-color: rgba(0, 0, 0, 0.8);
  position: absolute;
  right: 0;
  top: 0;
  z-index: 3;
`;

const Bookmark = styled.div`
  float: right;

  width: 30px;
  height: 28px;
  background-repeat: no-repeat;
  background-position: 8px center;

  ${(props) =>
    props.bookmark
      ? ` background-image:  url(${SlotBookmark1PNG})`
      : `  background-image:  url(${SlotBookmark2PNG})`};
`;

const GameSearchContainer = styled.div`
  width: 1280px;
  margin: 0 auto;
`;

const Spliter = styled.div`
  width: 2px;
  height: 25px;
  background-color: #cecece;
  transition: width 0.3s;
  position: absolute;
  top: 6px;
  right: 42px;
`;

const SearchImg = styled.img`
  height: 25px;
  margin-right: 10px;
  position: absolute;
  top: 6px;
  right: 0;
  cursor: pointer;
`;

const SearchFilterItemInput = styled.input`
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.secondary};
  font-size: 15px;
  margin: 0;
  margin-left: 10px;
  width: 100px;
  transition: width 0.3s;
  height: 37px;
  line-height: 37px;
  ::placeholder,
  ::-webkit-input-placeholder {
    color: #9e9e9e;
  }
  :-ms-input-placeholder {
    color: #9e9e9e;
  }
`;

const SearchFilterItemContainer = styled.div`
  ${(props) =>
    props.toggleSearchBar
      ? `
  width:195px;
  background-color: #ffffff;
  transition: all 0.3s;
  `
      : `
width:50px;
background-color: transparent;
transition: all 0.3s;

& ${Spliter} {
  display: none;
  width: 0;
}
& ${SearchFilterItemInput} {
  display: none;
  width: 0;
}
`}

  position: relative;
  height: 37px;
  border-radius: 7px;
  margin-top: 5px;
  float: right;
`;

const GameListContainer = styled.div`
  width: 100%;
  padding: 5px;
`;

const GameHoverSelection = styled.div`
  width: 165px;
  height: 205px;
  position: absolute;
  left: 0;
  top: 0;
  display: none;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 2;
  color: #fff;
  font-size: 65px;
  text-align: center;
  padding-top: 55px;
`;

const bounceInAnimation = keyframes`
0% {
  opacity: 0;
  transform: scale3d(0.3, 0.3, 1);
}
20% {
  transform: scale3d(1.1, 1.1, 1);
}
40% {
  transform: scale3d(0.9, 0.9, 1);
}
60% {
  opacity: 1;
  transform: scale3d(1.03, 1.03, 1);
}
80% {
  transform: scale3d(0.97, 0.97, 1);
}
to {
  opacity: 1;
  transform: scaleX(1);
}
`;

const GameItem = styled.div`
  animation: ${bounceInAnimation} 0.6s cubic-bezier(0.215, 0.61, 0.355, 1) both;
  display: inline-block;
  height: 205px;
  margin: 15px 5px 0;
  perspective: 430px;
  position: relative;
  text-align: center;
  vertical-align: top;
  width: 155px;

  &:before {
    border-style: solid;
    height: 0;
    position: absolute;
    top: 0;
    width: 0;
    z-index: 2;
    border-width: 0 35px 35px;
    color: #fff;
    font-size: 12px;
    left: 0;
    line-height: 47px;
    text-indent: -13px;
    text-shadow: 0 1px 2px rgb(0 0 0 / 30%);
    transform: translate3d(-26px, -8px, 0) scale3d(0.8, 0.8, 1) rotate(-45deg);
    border-color: transparent transparent #d01919;
    ${(props) =>
      props.isNew
        ? ` content:  "NEW"; `
        : props.isHot
        ? ` content:  "HOT"; `
        : ``};
  }
`;

const GameItemImage = styled.div`
  & img {
    display: block;
    min-height: 150px;
    width: 100%;
  }
`;

const GameTitle = styled.div`
  color: #fff;
  font-size: 14px;
  font-weight: 700;
  margin: 10px 0;
  padding: 8px 0;
`;

const GameItemOverlay = styled.div`
  align-items: center;
  backface-visibility: hidden;
  display: flex;
  filter: blur(3px);
  flex-direction: column;
  height: calc(100% - 40px);
  justify-content: center;
  transform: rotateX(-105deg);
  transform-origin: 50% 0;
  transition: transform 0.6s, filter 0.4s;
  z-index: 1;
  background-color: rgba(0, 0, 0, 0.4);
  border-radius: 8px;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;

  &:before {
    content: "";
    height: 100%;
    opacity: 0;
    transform: scale3d(0.25, 0.25, 1);
    z-index: -1;

    background-color: rgba(0, 0, 0, 0.4);
    border-radius: 8px;
    left: 0;
    position: absolute;
    top: 0;
    width: 100%;

    transition: transform .6s .6s,opacity .4s .4s;
  }

  ${GameItem}:hover &:before, ${GameItem}:hover &:after {
    opacity: 1;
    transform: scaleX(1);
  }

  

  &:after {    
    content: "";
    height: 100%;
    opacity: 0;
    transform: scale3d(.25,.25,1);
    z-index: -1;

    background-color: rgba(0,0,0,.4);
    border-radius: 8px;
    left: 0;
    position: absolute;
    top: 0;
    width: 100%;

    transition: transform .6s .2s,opacity .4s;
  }

  ${GameItem}:hover & {
    filter: blur(0);
    transform: rotate3d(0, 0, 0, 0deg);
  }
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
  width: 80%;

  &:hover {
    transform: scale3d(1.06, 1.06, 1);
  }
`;

const GameItemFavouriteButton = styled(GameItemButton)`
  background-color: #ea4747;
  &:hover {
    background-color: #db4444;
  }
`;

const GameItemJoinGameButton = styled(GameItemButton)`
  margin-top: 18px;
  &:hover {
    background-color: #1db8e1;
  }
`;

const PaginationContainer = styled.div`
  position: absolute;
  bottom: 0;
  width: inherit;
  margin: 0 auto;
  padding: 10px 0;
`;
const StyledPagination = withStyles({
  root: {
    width: "100%",
    "& .MuiPagination-ul": {
      justifyContent: "center",
    },
    "& .MuiPaginationItem-root": {
      padding: "10px",
      color: "#ffffff",
      backgroundColor: "#303030",
      "&.MuiPaginationItem-page:hover": {
        backgroundColor: "#20D0FF",
        color: "#272727",
      },
      "&.MuiPaginationItem-page.Mui-selected": {
        backgroundColor: "#20D0FF",
        color: "#272727",
      },
      "&.MuiPaginationItem-ellipsis": {
        backgroundColor: "transparent",
      },
    },
  },
})(Pagination);

const NoContentContainer = (props) => {
  switch (props.lang) {
    case "th-TH":
    case "vi-VN":
      return (
        <Container
          style={{
            height: `auto`,
            minHeight: `780px`,
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

class Slots extends Component {
  constructor(props) {
    super(props);

    const type = this.getType();
    this.state = {
      favGame: [],
      firstLoad: true,
      filterGame: 0,
      keyword: "",
      gameList: [],
      page: 1,
      limit: 48,
      total: 0,
      type: type,
      platformList: [],
      loading: true,
      platform: this.props.match.params.platform
        ? this.props.match.params.platform
        : "",
      toggleSearchBar: false,
    };
  }
  language = null;
  componentDidMount() {
    this.getGameList();
    if (this.props.token !== null && this.props.token !== "") {
      this.getFav();
    }
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

        this.getGameList(1, platform, this.getType());
      } else if (prevState.type !== this.state.type) {
        if (this.props.token !== null && this.props.token !== "") {
          this.getFav();
        }
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

    if (prevProps.token !== this.props.token && this.props.token !== null) {
      this.getFav();
    }
  }
  getType() {
    const type =
      this.props.match.url.indexOf("electron") >= 0
        ? GameTypeEnum.TABLEGAME
        : this.props.match.url.indexOf("slots") >= 0
        ? GameTypeEnum.SLOT
        : this.props.match.url.indexOf("fish") >= 0
        ? GameTypeEnum.FISH
        : GameTypeEnum.SLOT;
    return type;
  }

  getFav(type = this.state.type) {
    var result = GameService.GetFavoriteGame(type);
    result.then((response) => {
      if (response.IsSuccess) {
        var data = response.data;
        this.setState({
          ...this.state,
          favGame: data,
        });
      }
    });
  }

  getGameList(
    page = this.state.page,
    platform = this.state.platform,
    type = this.state.type
  ) {
    this.setState({
      ...this.state,
      keyword: "",
      toggleSearchBar: false,
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
  handleParentClick = (platform) => {
    const type =
      this.props.match.url.indexOf("fish") >= 0
        ? "fish"
        : this.props.match.url.indexOf("slots") >= 0
        ? "slots"
        : "electron";
    AppHistory.push(`/${i18n.language}/${type}/${platform}`);
  };
  handleFilterGameClick = (filterType) => {
    this.setState({ ...this.state, filterGame: filterType, page: 1 });
  };
  handleKeywordChange = (e) => {
    this.setState({ ...this.state, keyword: e.target.value });
  };
  handleToggleSearchBar = () => {
    this.setState({
      ...this.state,
      toggleSearchBar: !this.state.toggleSearchBar,
    });
  };
  // handleSearchClick = (e) => {
  //   this.getGameList(1);
  // };
  // handleMoreClick = () => {
  //   this.setState({ ...this.state, page: this.state.page + 1 });
  // };
  // handleBookmarkClick = (id, collect_id) => {
  //   if (this.props.token) {
  //     if (collect_id > 0) {
  //       GameService.DeleteBookmarkSlotGame(collect_id).then((response) => {
  //         if (response.IsSuccess) {
  //           this.setState((preState) => {
  //             let newList = [];
  //             for (let k in this.state.gameList) {
  //               var item = this.state.gameList[k];
  //               if (item.id === id) {
  //                 item.collect_id = 0;
  //                 if (this.state.filterGame !== SlotFilterType.Bookmark) {
  //                   newList.push(item);
  //                 }
  //               } else {
  //                 newList.push(item);
  //               }
  //             }
  //             return { ...preState, gameList: newList };
  //           });
  //         }
  //       });
  //     } else {
  //       GameService.BookmarkSlotGame(this.props.token, id).then((response) => {
  //         if (response.IsSuccess) {
  //           var collect_id = response.data;
  //           this.setState((preState) => {
  //             let newList = [];
  //             for (let k in this.state.gameList) {
  //               var item = this.state.gameList[k];
  //               if (item.id === id) {
  //                 item.collect_id = collect_id;
  //               }
  //               newList.push(item);
  //             }
  //             return { ...preState, gameList: newList };
  //           });
  //           // this.state.gameList.filter((row) => row.id === id);
  //         }
  //       });
  //     }
  //   }
  // };
  handleJoinGameClick = (gpcode, gpid) => {
    const type =
      this.props.match.url.indexOf("fish") >= 0
        ? "fish"
        : this.props.match.url.indexOf("slots") >= 0
        ? "slots"
        : "electron";
    if (this.props.token) {
      this.props.history.push(
        `/${i18n.language}/${type}/play/${gpcode}/${gpid}`
      );
    } else {
      this.props.showLogin(true);
    }
  };

  genCategoryItem(category, text) {
    if (this.props.token === null && category === 3) {
      return null;
    }

    return (
      <CategoryContainer
        onClick={() => this.handleFilterGameClick(category)}
        active={this.state.filterGame === category}
      >
        {(() => {
          switch (category) {
            case SlotFilterType.All:
              return (
                <AllGameFilterItem
                  active={this.state.filterGame === category}
                ></AllGameFilterItem>
              );
            case SlotFilterType.Hot:
              return (
                <HotGameFilterItem
                  active={this.state.filterGame === category}
                ></HotGameFilterItem>
              );
            case SlotFilterType.New:
              return (
                <NewGameFilterItem
                  active={this.state.filterGame === category}
                ></NewGameFilterItem>
              );
            case SlotFilterType.Bookmark:
              return (
                <BookmarkFilterItem
                  active={this.state.filterGame === category}
                ></BookmarkFilterItem>
              );
            case SlotFilterType.Fish:
              return (
                <FishGameFilterItem
                  active={this.state.filterGame === category}
                ></FishGameFilterItem>
              );
            case SlotFilterType.History:
              return (
                <HistoryFilterItem
                  active={this.state.filterGame === category}
                ></HistoryFilterItem>
              );
            case SlotFilterType.Recommend:
              return (
                <HistoryFilterItem
                  active={this.state.filterGame === category}
                ></HistoryFilterItem>
              );
            default:
              return null;
          }
        })()}

        <CategoryText>{text}</CategoryText>
      </CategoryContainer>
    );
  }
  handlePageChange = (event, value) => {
    this.setState({ ...this.state, page: value });
  };
  handleToggleFavorite = (match, id, match2) => {
    if (this.props.token !== null && this.props.token !== "") {
      if (match) {
        this.props.removeFavoriteGame(id).then(() => {
          var array = [...this.state.favGame];
          var index = array.indexOf(id);
          if (index !== -1) {
            array.splice(index, 1);
            this.setState({ favGame: array });
          }
        });
      } else {
        this.props.setFavoriteGame(id).then(() => {
          this.setState({
            ...this.state,
            favGame: [...this.state.favGame, id],
          });
        });
      }
    }
  };

  render() {
    let list = null;
    list = this.state.gameList
      .filter((a) => {
        if (this.state.filterGame === SlotFilterType.All) return true;
        else {
          if (this.state.filterGame === SlotFilterType.Hot) {
            return a.tag.hot === true;
          } else if (this.state.filterGame === SlotFilterType.New) {
            return a.tag.new === true;
          } else if (this.state.filterGame === SlotFilterType.Recommend) {
            return a.tag.recommend === true;
          } else if (this.state.filterGame === SlotFilterType.Bookmark) {
            return this.state.favGame.indexOf(a.id) > -1;
          }
        }

        return false;
      })
      .filter((a) => {
        if (this.state.keyword === "") return true;
        else
          return a.name
            .toUpperCase()
            .includes(this.state.keyword.toUpperCase());
      })
      .filter((s) => {
        return s.isactive === true; // show only active game.
      });
    return this.state.gameList.length ? (
      <Container
        type={
          this.state.type === GameTypeEnum.TABLEGAME
            ? "electron"
            : this.state.type === GameTypeEnum.SLOT
            ? "slot"
            : this.state.type === GameTypeEnum.FISH
            ? config.features.GamePage_SpecificBackground
              ? "fish-hk28"
              : "fish"
            : "slot"
        }
      >
        <GameTabContainer>
          <GameTabButton
            active={this.state.platform == ""}
            onClick={() => this.handleParentClick("")}
          >
            <GameTabAll active={this.state.platform == ""}></GameTabAll>
          </GameTabButton>

          {this.props.game.homePageGameList

            .filter((ele) => {
              return ele.type === this.state.type; //check for only SLOT enum.
            })

            .map((row, index) => {
              return (
                <GameTabButton
                  key={index}
                  img={row.abbreviation.toLowerCase()}
                  active={this.state.platform == row.abbreviation}
                  onClick={() => this.handleParentClick(row.abbreviation)}
                  maintenance={row.status != 0}
                >
                  <DisabledOverlay>
                    {i18n.t("transfer.maintenance")}
                  </DisabledOverlay>
                  <GameTab
                    img={row.abbreviation.toLowerCase()}
                    active={this.state.platform == row.abbreviation}
                  ></GameTab>
                </GameTabButton>
              );
            })}
        </GameTabContainer>
        <GameSearchContainer></GameSearchContainer>
        <GameDisplayContainer>
          <GameSubFilterContainer>
            {this.genCategoryItem(SlotFilterType.All, i18n.t("slot.allGame"))}
            {this.genCategoryItem(SlotFilterType.Hot, i18n.t("slot.hotGame"))}
            {this.genCategoryItem(SlotFilterType.New, i18n.t("slot.newGame"))}
            {/* {this.genCategoryItem(
              SlotFilterType.Recommend,
              i18n.t("slot.recommendGame")
            )} */}
            {this.genCategoryItem(
              SlotFilterType.Bookmark,
              i18n.t("slot.bookmarkGame")
            )}
            {/* {this.genCategoryItem(
              SlotFilterType.History,
              i18n.t("slot.historyGame")
            )} */}
          </GameSubFilterContainer>
          <InnerWrap type={this.state.type}>
            <SearchFilterItemContainer
              toggleSearchBar={this.state.toggleSearchBar}
            >
              <SearchFilterItemInput
                type="text"
                maxLength="15"
                autocomplete="off"
                placeholder={i18n.t("slot.search")}
                onChange={this.handleKeywordChange}
                value={this.state.keyword}
                focus={this.state.toggleSearchBar}
              ></SearchFilterItemInput>
              <Spliter></Spliter>
              <SearchImg
                src={this.state.toggleSearchBar ? SearchActiveIcon : SearchIcon}
                onClick={this.handleToggleSearchBar}
              ></SearchImg>
            </SearchFilterItemContainer>
            <GameListContainer>
              <DisplayList
                keyword={this.state.keyword}
                favGame={this.state.favGame}
                gameList={list}
                page={this.state.page}
                itemsPerPage={this.state.limit}
                onhandleJoinGameClick={this.handleJoinGameClick}
                onhandleToggleFavorite={this.handleToggleFavorite}
              ></DisplayList>
            </GameListContainer>
            <PaginationContainer>
              <StyledPagination
                count={Math.ceil(list.length / this.state.limit)}
                page={this.state.page}
                onChange={this.handlePageChange}
                defaultPage={1}
                shape="rounded"
                size="small"
                showFirstButton
                showLastButton
              />
            </PaginationContainer>
          </InnerWrap>
        </GameDisplayContainer>
        <Loading show={this.state.loading}></Loading>
      </Container>
    ) : (
      <NoContentContainer lang={i18n.language}></NoContentContainer>
    );
  }
}

const DisplayList = ({
  favGame,
  gameList,
  page,
  itemsPerPage,
  onhandleJoinGameClick,
  onhandleToggleFavorite,
}) => {
  if (gameList.length > 0) {
    return gameList
      .slice((page - 1) * itemsPerPage, page * itemsPerPage)
      .map((el, i) => (
        <GameItem key={i} isNew={el.tag.new} isHot={el.tag.hot}>
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
          <GameTitle>{el.name}</GameTitle>
          <GameDesc>
            <Bookmark
              bookmark={favGame.indexOf(el.id) > -1}
              onClick={() =>
                onhandleToggleFavorite(favGame.indexOf(el.id) > -1, el.id)
              }
            ></Bookmark>
          </GameDesc>
          <GameItemOverlay>
            <GameItemFavouriteButton
              onClick={() =>
                onhandleToggleFavorite(favGame.indexOf(el.id) > -1, el.id)
              }
            >
              {i18n.t("common.favoriteGame")}
            </GameItemFavouriteButton>
            <GameItemJoinGameButton
              onClick={() => {
                onhandleJoinGameClick(el.gpcode, el.id);
              }}
            >
              {i18n.t("common.joinGame")}
            </GameItemJoinGameButton>
          </GameItemOverlay>
        </GameItem>
      ));
  } else return [];
};
const mapDispatchToProps = (dispatch) => {
  return {
    showLogin: (payload) => {
      dispatch({ type: SHOW_LOGIN, payload });
    },
    setFavoriteGame: (gameId) => dispatch(gameAction.setFavoriteGame(gameId)),
    removeFavoriteGame: (gameId) =>
      dispatch(gameAction.removeFavoriteGame(gameId)),
  };
};
const mapStateToProps = (state) => {
  return {
    token: state.account.token,
    // jackpotAmount: state.ui.jackpotAmount,
    game: state.game,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Slots);
