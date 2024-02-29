import React, { Component } from "react";
import { connect } from "react-redux";
import styled, { keyframes } from "styled-components";

import config from "../../config/config";
import { withStyles } from "@material-ui/core/styles";

import { withRouter } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import { accountAction } from "../../api-services/actions/accountAction";
import { walletAction } from "../../api-services/actions/walletAction";
import { SHOWING_DIALOG } from "../../api-services/constant/actionType";
import { SHOW_LOGIN } from "../../api-services/constant/actionType";
import { GameTypeEnum } from "../../api-services/utils/Enum";

import { Link } from "react-router-dom";
import GuestContainer from "./GuestContainer";
import MemberContainer from "./MemberContainer";

import TopMenuPromoPNG from "../../assets/images/top-menu-promo.png";

import TopMenuPromoHoverPNG from "../../assets/images/top-menu-promo-hover.png";

import IconPhonePNG from "../../assets/images/icon-mobile.png";

import { withSnackbar } from "notistack";
import Common from "../../utils/Common";

import i18n from "../../utils/i18n";
import Slider from "react-slick";
import LanguageChanger from "../Share/language-changer";
import { generalAction } from "../../api-services/actions/generalAction";
import { uiAction } from "../../api-services/actions/uiAction";
import { GeneralService } from "../../api-services/services/GeneralService";
import ErrorSwitcher from "../../utils/ErrorSwitcher";
import { AppHistory } from "../../history/History";
import { SortedMenuList } from "../../utils/HeaderSorting";
import { GameService } from "../../api-services/services/GameService";

const moment = require("moment");

const InnerWrap = styled.div`
  margin: 0 auto;
  width: 100%;
  font-size: 14px;
`;

const TopContainerWrap = styled.div`
  background-color: #2c2c2c;
`;
const TopContainer = styled.div`
  height: 38px;
  background-color: #2c2c2c;
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  width: 1280px;
`;

const TopLeftContainer = styled.div``;

const TopRightContainer = styled.div``;

const TimerContainer = styled.div`
  font-family: arial;
  display: flex;
  align-items: center;
  float: left;
  height: 100%;
  @media (max-width: 950px) {
    display: none;
  }
`;

const TimerSpan = styled.span`
  color: #f6f6f6;
  float: left;
  min-width: 100px;
  line-height: 38px;
`;
const PhoneNumberSpan = styled.span`
  color: #f6f6f6;
  float: left;
  line-height: 38px;
`;

const IconPhone = styled.div`
  background: url(${(props) => props.img}) no-repeat;
  float: left;
  width: 20px;
  height: 20px;
`;
const LinkContainer = styled.div`
  color: #fff;
  float: left;
  padding: 0px 10px;
  @media (max-width: 950px) {
    display: none;
  }
`;
const CustomLink = styled(Link)`
  color: #f6f6f6;

  &:hover {
    color: #fde73f;
    text-decoration: underline;
  }
`;

const BtnAppsAndCS = styled.div`
  display: flex;
  align-items: center;
  word-wrap: break-word;
  height: 30px;
  margin-top: 3px;
  margin-left: 2px;
  float: right;
  &:hover {
    cursor: pointer;
  }
  @media (max-width: 700px) {
    display: none;
  }
`;

const BtnCS = styled(BtnAppsAndCS)`
  background-color: ${(props) => props.theme.primary};
  border-radius: 7px;
  color: #fff;
  font-size: 13px;
  line-height: 30px;
  height: 30px;
  padding: 0 20px;
  user-select: none;
  appearance: none;
  border: 0;
  cursor: pointer;
  &:hover {
    filter: grayscale(0.3);
  }
`;

const BottomContainer = styled.div`
  margin: 0 auto;
  height: 68px;
  max-width: 1280px;
  display: grid;
  grid-template-columns: 230px auto;
  grid-gap: 5px;
  @media (max-width: 1279px) {
    grid-template-columns: auto;
  }
`;
const LogoContainer = styled.div`
  background-image: url("${(props) => props.img}");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: left center;
  width: 100%;
  height: 48px;
  margin-top: 10px;
  float: left;
  &:hover {
    cursor: pointer;
  }
  @media (max-width: 1279px) {
    display: none;
  }
`;

const RightMenuContainer = styled.div`
  margin-left: 70px;
  float: right;
`;
const RightMenuUL = styled.ul`
  display: flex;
  align-items: stretch; /* Default */
  justify-content: space-between;
  width: 100%;
  list-style: none;
  padding: 0;
  margin: 0;
  height: 68px;
`;

const RightMenuTextSpan = styled.span`
  font-size: ${(props) => (i18n.language === "vi-VN" ? "15px" : "16px")};

  margin: 0 auto;
  display: block;

  padding-top: 6px;
  text-align: center;
`;

const MouseOverContainer = styled.div`
  width: 100%;
  height: 0px;

  position: fixed;
  left: 0;
  top: 156px;
  z-index: 1;
  cursor: default;
  transition: height 0.5s;
`;
const MouseOverBackground = styled.div`
  width: 100%;

  background-color: rgba(0, 0, 0, 0.75);
  height: 190px;
  //position: absolute;
  bottom: 30px;
`;

const MouseOverInner = styled.div`
  width: 1280px;
  height: 190px;
  margin: 0 auto;
`;

const GameImg = styled.img`
  height: 130px;

  //position: absolute;
  object-fit: contain;
  //padding-bottom: 10px;
  transition: transform 0.6s;
  //bottom: 35px;
  //right: 0;
  transform-origin: bottom center;
  transform: translateY(-160px) scale(1);
  animation-duration: 200ms;
  animation-delay: ${(props) => `${100 + props.index * 100}`}ms;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
  animation-timing-function: ease-in-out;
`;

const GameTitle = styled.span`
  color: #fff;
  font-weight: 700;
`;

const GameName = styled.div`
  color: #fff;
  font-weight: bold;
  text-transform: uppercase;
  font-size: ${(props) => (i18n.language === "en-US" ? "20px" : "22px")};
  width: 100px;
  position: absolute;
  text-align: ${(props) => (i18n.language === "en-US" ? "left" : "right")};
  transition: transform 0.6s;
  top: 30px;
  left: ${(props) => (i18n.language === "en-US" ? "50px" : "20px")};
  transform-origin: bottom center;
  transform: translateY(-160px) scale(1);
  animation-duration: 200ms;
  animation-delay: ${(props) => `${100 + props.index * 100}`}ms;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
  animation-timing-function: ease-in-out;
`;
const breatheAnimation = keyframes`

 to { transform:translateY(0px); }

`;
const RightMenuLI = styled.li`
  position: relative;
  display: flex;
  align-items: center;
  width: 130px;
  height: 95%;
  color: #f6f6f6;
  border-bottom: solid 4px transparent;
  @media (max-width: 925px) {
    width: 100px;
  }
  @media (max-width: 770px) {
    width: 80px;
  }
  @media (max-width: 650px) {
    width: 100px;
  }
  &:after {
    content: "";
    display: block;
    width: 0;
    height: 4px;
    background: ${({ theme }) => theme.primary};
    border-radius: 1px;
    position: absolute;
    bottom: 0;
    left: 50%;
    transition: all 0.5s ease;
    transform: translate(-50%, 0);
  }

  &:hover {
    //border-bottom: solid 4px #20d0ff;
    color: ${({ theme }) => theme.primary};
    cursor: pointer;
    &:after {
      width: 80%;
    }
  }
  &:hover ${MouseOverContainer} {
    height: 190px;
  }
  &:hover ${GameImg} {
    animation-name: ${breatheAnimation};
  }
  &:hover ${GameName} {
    animation-name: ${breatheAnimation};
  }
  background-repeat: no-repeat;
  background-position: 15% center;
  ${(props) =>
    props.active
      ? `
  //border-bottom: solid 4px #20d0ff;
  color: ${props.theme.primary};
  &:after {
    width: 80%;
  }

  `
      : `
  
  `}
`;

const StyledAppBar = withStyles((theme) => ({
  root: {
    "& .MuiToolbar-regular": {
      margin: "0 auto",
    },
  },
}))(AppBar);

const CustomAppBar = styled(StyledAppBar)`
  display: ${({ hide }) => {
    return hide ? "none" : "block";
  }};
  background: ${({ theme }) => theme.pcAppBar};
  box-shadow: none;
`;

const GameFrameWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 15px;
`;

const Maintenance = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  display: none;
  justify-content: center;
  align-items: center;
  z-index: 1;
  cursor: not-allowed;
  pointer-event: none;
  color: white;

  text-transform: capitalize;

  font-weight: bold;
  font-size: 18px;
  user-select: none;
  cursor: not-allowed;
`;

const GameFrame = styled.div`
  max-width: 255px;
  float: left;
  //min-height: 160px;
  height: 175px;
  position: relative;
  transition: transform 0.6s;
  &:hover {
    cursor: pointer;
    transform: scale(1.1);
  }

  ${({ maintenance }) => {
    return maintenance
      ? `
      ${GameImg}{
        filter: brightness(40%) grayscale(200%);
      }

      ${Maintenance}{

        display: flex;
      }

      ${GameName}{
        filter: brightness(40%) grayscale(200%);
      }
    
    
    
    `
      : ``;
  }}
`;

const styles = {
  root: {
    flexGrow: 1,
  },
  show: {
    transform: "translateY(0)",
    transition: "transform .5s",
  },
  hide: {
    transform: "translateY(-110%)",
    transition: "transform .5s",
  },
  minIcon: {
    width: "25px",
    height: "25px",
    margin: "20px 0 0 15px",
    transition: "all .3s",
  },
  maxIcon: {
    width: "100%",
    height: "40px",
    margin: "30px 0 0 0",
    transition: "all .3s",
  },
  maxLabel: {
    transition: "all .3s",
  },
  minLabel: {
    transition: "all .3s",
    transform: "translate(18px, -30px)",
  },
  maxMenu: {
    height: "110px",
    transition: "height .3s",
  },
  minMenu: {
    height: "64px",
    transition: "height .3s",
  },
};

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: "/",
      hovermenu: "",
      shouldShow: null,
      isHoverMenu: false,
      isHoverSubMenuContainer: false,
      open: false,
      dialog: "",
      hideAppBar: false,
      systemDateTime: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"), //YYYY-MM-DD HH:mm:ss
    };
    this.lastScroll = null;

    this.handleScroll = this.handleScroll.bind(this);
  }

  updateInterval = null;
  tickCount = 0;

  async componentDidMount() {
    this.setState({ selected: this.props.location.pathname });
    this.FireTimerToUpdateBalance();
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.location.pathname !== this.props.location.pathname &&
      this.props.location.pathname === `/`
    ) {
      this.setState({ selected: this.props.location.pathname });
    }
  }

  FireTimerToUpdateBalance = () => {
    this.updateInterval = setInterval(() => {
      this.setState({
        ...this.state,
        systemDateTime: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
      });
      const localStorageToken = localStorage.getItem("token0");
      if (
        this.props.account.token === localStorageToken &&
        localStorageToken !== null
      ) {
        this.tickCount++;
        if (this.tickCount >= 10) {
          this.tickCount = 0;
          if (!config.features.Register_CustomFlow_IDR)
            this.props.getBalanceList(false);
          else if (
            config.features.Register_CustomFlow_IDR &&
            this.props.wallet.bankCardList.length > 0
          )
            this.props.getBalanceList(false);
        }
      }
    }, 1000);
  };

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }
  handleDialogChange = (dialog) => {
    this.setState({ ...this.state, dialog: dialog });
  };
  handleScroll(evt) {
    const lastScroll = window.scrollY;
    if (lastScroll > 160) {
      this.setState({ ...this.state, shouldShow: false });
    } else {
      this.setState({ ...this.state, shouldShow: true });
    }
    return;
  }

  onhandleLogout = () => {
    this.props.logout(this.props.account.token);
    this.props.history.push("/");
  };
  onhandleLogoClick = () => {
    this.setState({ selected: "/" });
    this.props.history.push("/");
  };
  onhandleTransfer = () => {
    if (
      config.features.ForceRedirectAddCard &&
      !this.props.account.info.bankInfoAuthentication
    ) {
      return;
    }
    this.props.history.push("/account/transfer");
  };
  onhandleWithdrawal = () => {
    this.props.history.push("/account/withdrawal");
  };
  onhandleDeposit = () => {
    if (
      config.features.ForceRedirectAddCard &&
      !this.props.account.info.bankInfoAuthentication
    ) {
      return;
    }
    this.props.history.push("/account/deposit");
  };
  handleInboxClick = () => {
    if (
      config.features.ForceRedirectAddCard &&
      !this.props.account.info.bankInfoAuthentication
    ) {
      return;
    }
    this.props.history.push("/account/inbox");
  };
  handleProfileClick = () => {
    if (
      config.features.ForceRedirectAddCard &&
      !this.props.account.info.bankInfoAuthentication
    ) {
      return;
    }
    this.props.history.push("/account/profile");
  };
  handleWithdrawClick = () => {
    if (
      config.features.ForceRedirectAddCard &&
      !this.props.account.info.bankInfoAuthentication
    ) {
      return;
    }
    this.props.history.push("/account/withdrawal");
  };
  handleRefreshBalanceClick = () => {
    if (
      config.features.ForceRedirectAddCard &&
      !this.props.account.info.bankInfoAuthentication
    ) {
      return;
    }
    this.tickCount = 0;
    this.props.updateBalanceList();
    this.props.game.providerList
      .filter((item) => item.status === 0 && item.transferwallet === true)
      .filter((item) => item.gpcode !== "NTTF" && item.gpcode !== "RTTF")
      .map((a) => this.props.getGameBalance(a.gpcode));
  };
  handleDownloadAppsClick = () => {
    this.setState({ selected: "/download" });
    this.props.history.push("/download");
    //alert("敬请期待");
  };
  handleContactUsClick = () => {
    this.props.history.push("/aboutus/contactus");
  };
  HighlightLink = (link) => {};
  handleMenuMouseOver = (to) => {
    this.setState({ ...this.state, hovermenu: to, isHoverMenu: true });
  };
  handleMenuMouseLeave = () => {
    this.setState({ ...this.state, isHoverMenu: false });
  };
  handleClickMenu = (path) => {
    if (
      config.features.ForceRedirectAddCard &&
      !this.props.account.info.bankInfoAuthentication
    ) {
      return;
    }
    if (path === "vip" && !this.props.account.token) {
      this.props.showLogin(true);
    } else {
      this.setState({ ...this.state, selected: path });
      this.props.history.push(`/${path}`);
    }
  };

  handleHideAppBar = () => {
    this.setState({ ...this.state, hideAppBar: true });
  };

  RightMenuItem = (to, image, label, imageHover, subMenuImg) => {
    const { classes } = this.props;

    return (
      <RightMenuLI
        active={this.state.selected === `${to}`}
        onClick={() => this.handleClickMenu(to)}
        onMouseOver={() => this.handleMenuMouseOver(to)}
        onMouseLeave={this.handleMenuMouseLeave}
        hoverimg={imageHover}
      >
        <RightMenuTextSpan
          className={`${
            this.state.shouldShow === null
              ? classes.maxLabel
              : this.state.shouldShow
              ? classes.maxLabel
              : classes.minLabel
          }`}
        >
          {label}
        </RightMenuTextSpan>
        {(() => {
          if (subMenuImg != null) {
            return (
              <MouseOverContainer
                onClick={(e) => e.stopPropagation()}
                style={
                  this.state.shouldShow === null
                    ? { top: "106px" }
                    : this.state.shouldShow
                    ? { top: "106px" }
                    : { top: "114px" }
                }
              >
                <MouseOverBackground>{subMenuImg}</MouseOverBackground>
              </MouseOverContainer>
            );
          } else {
            return null;
          }
        })()}
      </RightMenuLI>
    );
  };
  MouseOverItem = (to, image) => {
    return (
      <CustomLink to={to} onClick={() => this.setState({ selected: to })}>
        <img src={image} alt=""></img>
      </CustomLink>
    );
  };

  handleJoinLotteryGame = (name) => {
    if (
      config.features.ForceRedirectAddCard &&
      !this.props.account.info.bankInfoAuthentication
    ) {
      return;
    }
    Common.closePreviousPopup();
    if (this.props.account.token != null) {
      if (this.props.history.location.pathname.indexOf("play") >= 0) {
        AppHistory.goBack();
      }
      Common.PopupCenter("/joinlottery/" + name, name, 1280, 720);
    } else {
      this.props.showLogin(true);
    }
  };
  handleJoinGameClick = (gameType, path, gameCode, url) => {
    if (
      config.features.ForceRedirectAddCard &&
      !this.props.account.info.bankInfoAuthentication
    ) {
      return;
    }
    var slotPageGameType = [
      GameTypeEnum.SLOT,
      GameTypeEnum.TIGERSLOT,
      GameTypeEnum.SPORTS,
      GameTypeEnum.ESPORTS,
      GameTypeEnum.TABLEGAME,
      GameTypeEnum.FISH,
      GameTypeEnum.RNGSPORTS,
    ];
    Common.closePreviousPopup();
    if (slotPageGameType.indexOf(gameType) >= 0) {
      if (
        gameType === GameTypeEnum.SPORTS ||
        gameType === GameTypeEnum.ESPORTS ||
        gameType === GameTypeEnum.RNGSPORTS
      ) {
        if (!this.props.account.token) {
          this.props.showLogin(true);
        } else {
          if (gameType === GameTypeEnum.RNGSPORTS) {
            this.props.history.push("/sports/" + gameCode);
          } else if (
            (gameCode === "WGFM" && !config.features.WGSports_UseIframe) ||
            gameCode === "WGVIA"
          ) {
            if (document.getElementById("audio") != null)
              document.getElementById("audio").volume = 0;
            if (this.props.history.location.pathname.indexOf("play") >= 0) {
              AppHistory.goBack();
            }
            // this.handleRefreshBalanceClick();
            var win = Common.PopupCenter(
              `/joinlobbygame/${gameType}/${gameCode}`,
              gameCode,
              1280,
              720
            );
            var timer = setInterval(function () {
              if (win.closed) {
                clearInterval(timer);
                if (document.getElementById("audio") != null)
                  document.getElementById("audio").volume = 1.0;
              }
            }, 1000);
          } else {
            // this.handleRefreshBalanceClick();
            this.props.history.push(
              "/sports/play/" + gameCode + "/" + gameType
            );
          }
        }
      } else {
        this.props.history.push(`/${path}/${gameCode}`);
      }
    } else {
      if (!this.props.account.token) {
        this.props.showLogin(true);
        return;
      }
      if (document.getElementById("audio") != null)
        document.getElementById("audio").volume = 0;
      if (this.props.history.location.pathname.indexOf("play") >= 0) {
        AppHistory.goBack();
      }
      // this.handleRefreshBalanceClick();
      win = Common.PopupCenter(url, gameCode, 1280, 720);
      timer = setInterval(function () {
        if (win.closed) {
          clearInterval(timer);
          if (document.getElementById("audio") != null)
            document.getElementById("audio").volume = 1.0;
        }
      }, 1000);
    }
  };
  handleBookmarkClick = () => {
    let pageTitle = document.title;
    let pageURL = document.location;
    try {
      // Internet Explorer solution
      eval(
        "window.external.AddFa-vorite(pageURL, pageTitle)".replace(/-/g, "")
      );
    } catch (e) {
      try {
        // Mozilla Firefox solution
        window.sidebar.addPanel(pageTitle, pageURL, "");
      } catch (e) {
        // Opera solution
        if (typeof window.opera == "object") {
          e.rel = "sidebar";
          e.title = pageTitle;
          e.url = pageURL;
          return true;
        } else {
          // The rest browsers (i.e Chrome, Safari)

          alert(
            i18n.t("web.header.plsClick") +
              (navigator.userAgent.toLowerCase().indexOf("mac") !== -1
                ? "Cmd"
                : "Ctrl") +
              "+D" +
              i18n.t("web.header.bookmark")
          );
        }
      }
    }
    return false;
  };

  changeLanguage = (language) => {
    this.props.getBanner();
    this.props.getMarquee(language);
    this.props.getAnnouncement(language);
    GeneralService.GetLocalization().then((response) => {
      if (response.IsSuccess) {
        ErrorSwitcher.setTranslation(response.data);
      }
    });
  };
  handleCockfight = (item) => {
    if (!this.props.account.token) {
      this.props.showLogin(true);
    } else {
      if (item.include.indexOf("SM01") >= 0) {
        this.popup = window.open("", "Cockfight");
        GameService.GetCockfight()
          .then((e) => {
            this.popup.document.write(e.data);
            this.popup.document.close();
            this.popup.focus();
          })
          .catch((e) => {
            this.popup.close();
          });
      }
    }
  };

  handleOtherCockfightGame = (game) => {
    if (!this.props.account.token) {
      this.props.showLogin(true);
    } else {
      AppHistory.push(
        "/" +
          i18n.language +
          "/sports/play/" +
          game.name +
          "/" +
          GameTypeEnum.SPORTS
      );
    }
  };

  consolidateJoinGame = (game, item) => {
    if (game.type === GameTypeEnum.COCKFIGHT) {
      if (game.name === "SM01") {
        this.handleCockfight(item);
      } else {
        this.handleOtherCockfightGame(game);
      }
    } else if (
      game.type === GameTypeEnum.LOTTERYLOBBY ||
      game.type === GameTypeEnum.LOBBY
    ) {
      this.handleJoinLotteryGame(game.gpcode);
    } else {
      this.handleJoinGameClick(
        game.type,
        item.path,
        game.gpcode,
        "/joingame/" + game.type + "/" + game.gpcode
      );
    }
  };

  filterGameList = (item) => {
    if (item.include && item.include !== undefined) {
      this.props.game.homePageGameList.map((game) => {
        if (item.include.indexOf(game.game_platform_name) >= 0) {
          game.type = item.gameType[0];
        }
        return item;
      });
    }

    return this.props.game.homePageGameList.filter((game) => {
      return item.gameType.indexOf(game.type) >= 0;
    });
  };

  render() {
    const { classes } = this.props;

    const settings = {
      className: "headerSubmenu",
      slidesToShow: 4,
      slidesToScroll: 4,
    };

    return (
      <CustomAppBar hide={this.props.hide}>
        <InnerWrap>
          <TopContainerWrap>
            <TopContainer>
              <TopLeftContainer>
                <LinkContainer>
                  <LanguageChanger
                    language={this.props.general.brandLanguage}
                    changeLanguage={this.changeLanguage}
                  />
                </LinkContainer>
                <TimerContainer>
                  <TimerSpan> (GMT+8) {this.state.systemDateTime}</TimerSpan>
                </TimerContainer>
                {config.features.DisplayPhone && (
                  <TimerContainer style={{ marginLeft: "10px" }}>
                    <IconPhone img={IconPhonePNG}></IconPhone>
                    <PhoneNumberSpan>
                      {this.props.general.brandsSupport &&
                        this.props.general.brandsSupport.length >= 1 &&
                        this.props.general.brandsSupport[0].phone}
                    </PhoneNumberSpan>
                  </TimerContainer>
                )}
              </TopLeftContainer>
              <TopRightContainer>
                {config.features.Header_DisplayCS && (
                  <BtnCS onClick={this.props.onhandleShowCSClick}>
                    {i18n.t("common.cs")}
                  </BtnCS>
                )}
                {(() => {
                  if (!this.props.general.isMaintenance) {
                    if (
                      this.props.account.token !== this.props.account.info.token
                    ) {
                      return (
                        <GuestContainer
                          onhandleShowCSClick={this.props.onhandleShowCSClick}
                          onhandleContactUsClick={this.handleContactUsClick}
                          onDialogChange={this.handleDialogChange}
                        ></GuestContainer>
                      );
                    } else {
                      return (
                        <MemberContainer
                          onhandleLogout={this.onhandleLogout}
                          onhandleTransfer={this.onhandleTransfer}
                          onhandleWithdrawal={this.onhandleWithdrawal}
                          onhandleDeposit={this.onhandleDeposit}
                          onhandleInboxClick={this.handleInboxClick}
                          onhandleRefreshBalanceClick={
                            this.handleRefreshBalanceClick
                          }
                          wallet={this.props.wallet}
                          account={this.props.account}
                          game={this.props.game}
                        ></MemberContainer>
                      );
                    }
                  }
                })()}
              </TopRightContainer>
            </TopContainer>
          </TopContainerWrap>
          <BottomContainer>
            <LogoContainer
              img={
                this.props.general.brand &&
                this.props.general.brand.desktopLogoUrl
              }
              onClick={this.onhandleLogoClick}
              className={`${
                this.state.shouldShow === null
                  ? classes.maxMenu
                  : this.state.shouldShow
                  ? classes.maxMenu
                  : classes.minMenu
              }`}
            ></LogoContainer>
            <RightMenuContainer>
              <RightMenuUL
                className={`top-menu ${
                  this.state.shouldShow === null
                    ? classes.maxMenu
                    : this.state.shouldShow
                    ? classes.maxMenu
                    : classes.minMenu
                }`}
              >
                {SortedMenuList.map((item, index) => {
                  var list = this.filterGameList(item).sort((a, b) => {
                    if (config.features.LiveGame_Sorting_SKY) {
                      var sortDGFirst = ["DG"];
                      return (
                        sortDGFirst.indexOf(b.abbreviation) -
                        sortDGFirst.indexOf(a.abbreviation)
                      );
                    } else return b - a;
                  });

                  if (list.length > 0) {
                    return (
                      <RightMenuLI
                        key={index}
                        active={this.state.selected === `${item.path}`}
                        onClick={() => this.handleClickMenu(item.path)}
                        onMouseOver={() => this.handleMenuMouseOver(item.path)}
                        onMouseLeave={this.handleMenuMouseLeave}
                        hoverimg={item.hoverImg}
                      >
                        <RightMenuTextSpan
                          className={`${
                            this.state.shouldShow === null
                              ? classes.maxLabel
                              : this.state.shouldShow
                              ? classes.maxLabel
                              : classes.minLabel
                          }`}
                        >
                          {i18n.t(item.title)}
                        </RightMenuTextSpan>
                        <MouseOverContainer
                          onClick={(e) => e.stopPropagation()}
                          style={
                            this.state.shouldShow === null
                              ? { top: "106px" }
                              : this.state.shouldShow
                              ? { top: "106px" }
                              : { top: "114px" }
                          }
                        >
                          <MouseOverBackground>
                            <MouseOverInner>
                              {(() => {
                                return list.length <= 5 ? (
                                  list.map((game, index) => {
                                    var usecustom = false;
                                    return (
                                      <GameFrame
                                        key={index}
                                        style={{
                                          width: `calc(1264px / ${list.length})`,
                                        }}
                                        //TODO: To remove
                                        maintenance={game.status != 0}
                                      >
                                        <GameFrameWrapper>
                                          <Maintenance>
                                            {i18n.t("transfer.maintenance")}
                                          </Maintenance>
                                          {(() => {
                                            var gameCode =
                                              game.abbreviation.toLowerCase();
                                            // check if gamecode is "pptf" and  game.abbreviation is sports then change  game.abbreviation to "customsports"
                                            if (
                                              config.features
                                                .PP_CustomTranslation
                                            ) {
                                              if (
                                                gameCode === "pptf" &&
                                                item.path === "sports"
                                              ) {
                                                usecustom = true;
                                              }
                                            }
                                            if (
                                              config.features
                                                .BC_CustomTranslation
                                            ) {
                                              if (
                                                gameCode === "bc" &&
                                                item.path === "sports"
                                              ) {
                                                usecustom = true;
                                              }
                                            }

                                            if (
                                              config.features.SportsHideLogo
                                            ) {
                                              if (gameCode === "wgvia") {
                                                return (
                                                  <GameName index={index}>
                                                    {i18n.t("common.horserace")}
                                                  </GameName>
                                                );
                                              } else if (gameCode === "wgfm") {
                                                return (
                                                  <GameName index={index}>
                                                    {i18n.t("common.sport")}
                                                  </GameName>
                                                );
                                              }
                                            }
                                          })()}

                                          <GameImg
                                            index={index}
                                            src={`${
                                              process.env.PUBLIC_URL
                                            }/assets/images/pcHeaderMenu/${
                                              item.path
                                            }/${game.abbreviation.toLowerCase()}${
                                              config.features.SportsHideLogo &
                                              (game.abbreviation.toLowerCase() ===
                                                "wgvia" ||
                                                game.abbreviation.toLowerCase() ===
                                                  "wgfm")
                                                ? "-HKJP"
                                                : ""
                                            }.png`}
                                            alt=""
                                            onClick={() => {
                                              this.consolidateJoinGame(
                                                game,
                                                item
                                              );
                                            }}
                                          ></GameImg>
                                          <GameTitle index={index}>
                                            {game.name}
                                          </GameTitle>
                                        </GameFrameWrapper>
                                      </GameFrame>
                                    );
                                  })
                                ) : (
                                  <Slider {...settings}>
                                    {list.map((game, index) => {
                                      var usecustom = false;
                                      return (
                                        <GameFrame
                                          key={index}
                                          style={{
                                            width: `calc(1264px / ${list.length})`,
                                          }}
                                          //TODO: To remove
                                          maintenance={game.status != 0}
                                        >
                                          <GameFrameWrapper>
                                            <Maintenance>
                                              {i18n.t("transfer.maintenance")}
                                            </Maintenance>
                                            {(() => {
                                              var gameCode =
                                                game.abbreviation.toLowerCase();

                                              if (
                                                config.features
                                                  .PP_CustomTranslation
                                              ) {
                                                if (
                                                  gameCode === "pptf" &&
                                                  item.path === "sports"
                                                ) {
                                                  usecustom = true;
                                                }
                                              }

                                              if (
                                                config.features
                                                  .BC_CustomTranslation
                                              ) {
                                                if (
                                                  gameCode === "bc" &&
                                                  item.path === "sports"
                                                ) {
                                                  usecustom = true;
                                                }
                                              }

                                              if (
                                                config.features.SportsHideLogo
                                              ) {
                                                if (gameCode === "wgvia") {
                                                  return (
                                                    <GameName index={index}>
                                                      {i18n.t(
                                                        "common.horserace"
                                                      )}
                                                    </GameName>
                                                  );
                                                } else if (
                                                  gameCode === "wgfm"
                                                ) {
                                                  return (
                                                    <GameName index={index}>
                                                      {i18n.t("common.sport")}
                                                    </GameName>
                                                  );
                                                }
                                              }
                                            })()}
                                            <GameImg
                                              index={index}
                                              src={`${
                                                process.env.PUBLIC_URL
                                              }/assets/images/pcHeaderMenu/${
                                                item.path
                                              }/${game.abbreviation.toLowerCase()}${
                                                config.features.SportsHideLogo &
                                                (game.abbreviation.toLowerCase() ===
                                                  "wgvia" ||
                                                  game.abbreviation.toLowerCase() ===
                                                    "wgfm")
                                                  ? "-HKJP"
                                                  : ""
                                              }.png`}
                                              alt=""
                                              onClick={() => {
                                                this.consolidateJoinGame(
                                                  game,
                                                  item
                                                );
                                              }}
                                            ></GameImg>
                                            <GameTitle index={index}>
                                              {game.name}
                                            </GameTitle>
                                          </GameFrameWrapper>
                                        </GameFrame>
                                      );
                                    })}
                                  </Slider>
                                );
                              })()}
                            </MouseOverInner>
                          </MouseOverBackground>
                        </MouseOverContainer>
                      </RightMenuLI>
                    );
                  } else {
                    return null;
                  }
                })}

                {this.RightMenuItem(
                  "promotion",
                  TopMenuPromoPNG,
                  i18n.t("common.promotion"),
                  TopMenuPromoHoverPNG,
                  null
                )}

                {config.features.HaveVIPFeature &&
                  config.features.HomePage_DisplayVIP &&
                  this.RightMenuItem(
                    "account/vip",
                    TopMenuPromoPNG,
                    "VIP",
                    TopMenuPromoHoverPNG,
                    null
                  )}
              </RightMenuUL>
            </RightMenuContainer>
          </BottomContainer>
        </InnerWrap>
      </CustomAppBar>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    // screenWidth: state.ui.screenWidth,
    // screenHeight: state.ui.screenHeight,
    ui: state.ui,
    account: state.account,
    game: state.game,
    general: state.general,
    wallet: state.wallet,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getBanner: () => dispatch(generalAction.getBanner()),
    getMarquee: (language) => dispatch(uiAction.getMarquee(language)),
    getAnnouncement: (language) => dispatch(uiAction.getAnnouncement(language)),
    // updateScreenSize: (width, height) => {
    //   dispatch({ type: UPDATING_SCREEN_SIZE, width, height });
    // },
    // checkTokenIsValid: token =>
    //   dispatch(accountAction.checkTokenIsValid(token)),
    logout: (token) => dispatch(accountAction.accountLogout(token)),
    getGameBalance: (gpcode) => dispatch(walletAction.getGameBalance(gpcode)),
    getBalanceList: (loading) => dispatch(walletAction.getBalanceList(loading)),
    updateBalanceList: (loading) => dispatch(walletAction.updateBalanceList()),
    showLogin: (payload) => {
      dispatch({ type: SHOW_LOGIN, payload });
    },
    showDialog: (payload) => {
      dispatch({ type: SHOWING_DIALOG, payload });
    },
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(withSnackbar(withStyles(styles)(Header)))
);
