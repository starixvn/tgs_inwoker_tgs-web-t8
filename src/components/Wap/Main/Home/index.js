import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import AppBar from "@material-ui/core/AppBar";
import { withStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";

import { accountAction } from "../../../../api-services/actions/accountAction";
import { GameTypeEnum } from "../../../../api-services/utils/Enum";
import { GameService } from "../../../../api-services/services/GameService";
import Common from "../../../../utils/Common";

import i18n from "../../../../utils/i18n";
import config from "../../../../config/config";
import TemplateSwitcher from "./scene-1";
import GamePicker from "./scene-2";
import Banner from "./scene-1/banner";
const StyledAppBar = withStyles({
  root: {
    boxShadow: "none",
  },
})(AppBar);

const CustomAppBar = styled(StyledAppBar)`
  background: ${({ theme }) => theme.body};
`;

const FixedContainer = styled.div`
  background-color: #fff;
  height: 265px;
  border-radius: 20px 20px 0 0;
  width: 100%;
  position: absolute;
  bottom: -2px;
`;
const AnnouncementContainer = styled.div`
  margin: 10px 23px;
  display: flex;
  align-items: center;
  position: absolute;
  bottom: 0px;
`;
const AnnouncementTitle = styled.div`
  font-size: 28px;
  width: 140px;
  color: ${({ theme }) => theme.secondary};
  font-weight: bold;
  display: flex;
  align-items: center;
`;
const MarqueeContainer = styled.div`
  white-space: nowrap;
  letter-spacing: 1.5px;
  font-size: 21px;
  float: left;
  line-hight: 26px;
  overflow: hidden;
  margin: 5px 0 0 8px;
  width: 640px;
  height: 36px;
  border-radius: 17px;
`;
const ProfileContainer = styled.div`
  width: 723px;
  height: 192px;
  margin: 0 auto;
`;
const ProfileContainerTop = styled.div`
  width: 100%;
  height: 50px;
  background-color: ${({ theme }) => theme.primary};
  border-radius: 10px 10px 0 0;

  padding: 15px 25px 0 26px;
`;
const ProfileContainerBottom = styled.div`
  width: 100%;

  padding: 0 25px 0 26px;
  background-image: linear-gradient(
    to top,
    ${({ theme }) => theme.primaryGradient},
    ${({ theme }) => theme.primary}
  );
`;
const WelcomeLabel = styled.div`
  float: left;
  font-family: SourceHanSansCN;
  font-size: 22px;

  color: #dfdfdf;
`;
const WelcomeUsernameLabel = styled(WelcomeLabel)`
  color: #fde73f;
  font-weight: bold;
`;

const ProfileLink = styled(WelcomeLabel)`
  float: right;
`;
const BalanceContainer = styled.div`
  float: left;
`;
const BalanceAmount = styled.div`
  font-size: 35px;
  font-weight: bold;
  color: #ffffff;
  text-align: center;
  width: 100%;
  margin-top: 35px;
`;
const WalletTypeLabel = styled(WelcomeLabel)`
  text-align: center;
  width: 100%;
  margin-top: 10px;
`;
const WalletActionContainer = styled.div`
  float: right;
`;
const WalletActionUL = styled.ul`
  text-align: center;

  margin-top: 15px;

  font-size: 28px;

  color: #ffffff;
`;
const WalletActionLI = styled.li`
  display: inline-table;
  padding: 0 10px;

  text-align: center;
`;
const WalletActionIcon = styled.div`
  ${(props) => `background:url(${props.img}) no-repeat center center; `}
  background-color: ${(props) => props.theme.secondary};
  margin: 0 auto;
  border-radius: 50%;
  background-size: 60px;
  width: 80px;
  height: 80px;
`;
const ButtonSignup = styled.div`
  width: 195px;
  height: 71px;
  background: url(${process.env.PUBLIC_URL +
    `/assets/images/wapp/btn-signup.png`})
    no-repeat;
  margin: 40px 0 0 60px;
  color: #fff;
  text-align: center;
  padding: 17px 0;
  font-size: 28px;
`;

const ButtonStartGame = styled.div`
  width: 148px;
  height: 43px;
  background: url(${process.env.PUBLIC_URL +
    `/assets/images/wapp/btn-start-game.png`})
    no-repeat;
  background-size: 100%;
  margin: 150px 0 0 76px;
  font-size: 16px;
  font-weight: bold;
  line-height: 37px;
  text-align: center;
  color: #fff;
  zoom: 1.3;
`;
const GameSelectionContainer = styled.div`
  font-size: 48px;
  position: fixed;
  top: 550px;
  left: 0;
`;
const GameSelectionUL = styled.div`
  position: fixed;
  top: 525px;
  font-size: 35px;
  font-weight: bold;
  color: #cdcdcd;
  margin: 0 0 0 20px;
  background: white;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  border-radius: 20px;
  padding: 10px 0px;
  padding: 0 0px;
  width: 176px;
  overflow-y: auto;
  height: calc(100vh - 640px);
`;
const GameSelectionEmpty = styled.div`
  height: 90px;
  width: 130px;
`;
const TheIcon = styled.div`
  width: 80px;
  height: 80px;
  mask: ${({ icon }) => {
    return `url(${icon}) no-repeat center /
  contain;`;
  }};
`;
const GameSelectionLI = styled.div`
  width: 130px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 16px auto 0 auto;
  font-size: 24px;
  line-height: 1.7;
  color: ${({ selected, theme }) => {
    return selected ? theme.primary : theme.secondary;
  }};
  padding: 10px 0px;

  ${TheIcon} {
    background-color: ${({ selected, theme }) => {
      return selected ? theme.primary : theme.secondary;
    }};
  }
`;

const GameListContainer = styled.div`
  padding-bottom: 100px;
`;
const GameListWrap = styled.div`
  width: 560px;
  padding: 0px 20px 0px 20px;
  border-radius: 10px;
  background-color: #ededed;
`;
const GameFrameImg = styled.div`
  margin: 0 auto 10px auto;
  display: block;
  width: 100%;
  height: 320px;
  background: url(${(props) => props.src}) no-repeat;
  background-position: center;
  background-size: 100%;
  border-radius: 20px;
`;

const NewAppBar = styled.div`
  height: 125px;
  background: ${({ theme }) => theme.appbar};
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 40px;
`;

const LogoHolder = styled.div`
  background: url("${({ img }) => img}") no-repeat left center;
  background-size: contain;
  width: 200px;
  height: 100px;
`;

const CustomButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-right: 20px;
`;

const CustomColoredButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${({ primary, theme }) => {
    return primary ? theme.buttonBackground : "transparent";
  }};
  border: ${({ primary, theme }) => {
    return primary ? theme.buttonBackground : "solid 2px #ffffff";
  }};
  color: ${({ primary, theme }) => {
    return primary ? theme.buttonText2 : "";
  }};
  padding: 10px 40px;
  font-size: 28px;
  margin: 0px 10px;
  border-radius: 7px;
`;
const UsernameContainer = styled.div`
  color: ${({ primary, theme }) => {
    return primary ? theme.buttonText2 : "";
  }};
  font-size: 30px;
  font-weight: bold;
  margin-right: 20px;
`;

const SceneTwoAppBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100vw;
`;

const SceneTwoAppBarTitle = styled.div`
  font-size: 50px;
  font-weight: bold;
`;

const BackButton = styled.div`
  width: 50px;
  height: 50px;
  mask: ${`url(${
    process.env.PUBLIC_URL + "/assets/images/wapp/btn-back-white.png"
  }) no-repeat center /
  contain;`};
  background: #fff;
`;
const TheContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const PhoneHolder = styled.div`
  font-size: 20px;

  padding-bottom: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Icon = styled.div`
  width: 20px;
  height: 20px;
  margin-right: 5px;
  background: #fff;
  margin-right: 10px;
  mask: ${({ src }) => {
    return `url(${src}) no-repeat center /
contain;`;
  }};
`;

class Home extends Component {
  state = {
    value: 0,
    marqueeText: [],
    banner_list: [],
    gameTypeListSorting: [],
    selectedGameType: 0,
    tab1: {
      limit: 10,
      page: 0,
      totalPage: 0,
      list: [],
      verifyList: [],
    },
    tab2: {
      limit: 10,
      page: 0,
      totalPage: 0,
      list: [],
    },
    loading: true,
    scene: 1,
    selected: "",
    listOfGame: [],
  };

  componentWillUnmount() {
    if (config.wapVersion === 2) {
      window.removeEventListener("scroll", this.handleScroll);
    }
  }

  componentDidMount() {
    if (config.wapVersion === 2) {
      window.addEventListener("scroll", this.handleScroll);
    }
    if (this.props.game.homePageGameList.length > 0) {
      var gameTypeListSorting = this.formatSortedGameList();
      this.setState({
        ...this.state,
        gameTypeListSorting: gameTypeListSorting,
        selectedGameType: gameTypeListSorting[0],
      });
    }
  }
  componentDidUpdate(preProps) {
    if (
      preProps.game.homePageGameList.length !==
      this.props.game.homePageGameList.length
    ) {
      var gameTypeListSorting = this.formatSortedGameList();
      this.setState({
        ...this.state,
        gameTypeListSorting: gameTypeListSorting,
        selectedGameType: gameTypeListSorting[0],
      });
    }
  }

  formatSortedGameList() {
    var currentType = -1;
    var gameTypeListSorting = [];
    var displayGameType = Common.GetDisplayGameType();

    this.props.game.homePageGameList
      .filter((a) => {
        // if (a.type !== GameTypeEnum.ESPORTS) {
        //   // #stupidButWorkingSolution
        //   return displayGameType.indexOf(a.type) >= 0;
        // }
        return displayGameType.indexOf(a.type) >= 0;
      })
      .sort((a, b) => {
        return a.type - b.type;
      })
      .map((row, index) => {
        if (currentType !== row.type) {
          gameTypeListSorting.push(row.type);
        }
        currentType = row.type;
      });
    return gameTypeListSorting;
  }

  constructor(props) {
    super(props);
    this.scrollRef = React.createRef();
  }

  handleScroll = (e) => {
    const doc = document.documentElement;

    let top = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);

    top = top + 530;

    let reachedTheForthItem =
      this.state.gameTypeListSorting[3] == this.state.selectedGameType ||
      this.state.gameTypeListSorting[3] <= this.state.selectedGameType;

    if (reachedTheForthItem) {
      this.scrollRef.current.scrollTo(0, 500);
    } else {
      this.scrollRef.current.scrollTo(0, 0);
    }

    var D = document;
    var docHeight = Math.max(
      D.body.scrollHeight,
      D.documentElement.scrollHeight,
      D.body.offsetHeight,
      D.documentElement.offsetHeight,
      D.body.clientHeight,
      D.documentElement.clientHeight
    );
    var gameTypeListSorting = this.state.gameTypeListSorting;
    let gameType = gameTypeListSorting[0];
    if (window.innerHeight + window.scrollY >= docHeight - 2) {
      gameType = gameTypeListSorting[gameTypeListSorting.length - 1];
    } else {
      for (var i = gameTypeListSorting.length - 1; i >= 0; i--) {
        if (
          top >
          document.getElementById("gameType" + gameTypeListSorting[i]).offsetTop
        ) {
          gameType = gameTypeListSorting[i];
          break;
        }
      }
    }

    this.setState({ ...this.state, selectedGameType: gameType });
  };
  handleGameTypeClick = (gameType) => {
    let pos = document.getElementById("gameType" + gameType).offsetTop;

    window.scrollTo({ top: pos - 520, behavior: "smooth" });
  };

  handleJoinLotteryGame = (name) => {
    if (this.props.account.token != null) {
      GameService.GetGameList(name, GameTypeEnum.LOTTERYLOBBY).then((e) => {
        if (e.IsSuccess) {
          GameService.JoinGame(e.data[0].id, name).then((response) => {
            if (response.IsSuccess) {
              this.setState({ ...this.state, maintenance: false });
              window.open(response.data.url, "_blank");
            } else {
              this.setState({ ...this.state, maintenance: true });
            }
          });
        }
      });
    } else {
      this.props.appHistory.push("/" + i18n.language + "/login");
    }
  };

  handleJoinOtherGame = (type, params, game_platform_id) => {
    if (!this.props.account.token) {
      this.props.appHistory.push("/" + i18n.language + "/login");
      return;
    }
    if (
      type === GameTypeEnum.SLOT ||
      type === GameTypeEnum.TIGERSLOT ||
      type === GameTypeEnum.TABLEGAME ||
      type === GameTypeEnum.FISH
    ) {
      this.props.navigate(`/slots/${params}/${type}`);
    } else {
      window.open(
        "/" + i18n.language + "/joinlobbygame/" + type + "/" + params,
        "_blank"
      );
    }
  };

  handleGameClick = (type, params, game_platform_id) => {
    type === GameTypeEnum.LOTTERYLOBBY || type === GameTypeEnum.LOTTERY
      ? this.handleJoinLotteryGame(params)
      : this.handleJoinOtherGame(type, params, game_platform_id);
  };
  handleSignupClick = () => {
    this.props.appHistory.push("/" + i18n.language + "/login");
  };

  handleRegisterClick = () => {
    this.props.appHistory.push("/" + i18n.language + "/login?do=register");
  };
  handleLogout = () => {
    this.props.accountLogout(this.props.account.token).then((response) => {
      if (response.IsSuccess) {
        this.props.navigate("/" + i18n.language + "/login");
      }
    });
  };

  convertGameTypeToText = (gameType) => {
    switch (gameType) {
      case GameTypeEnum.LIVE:
        return i18n.t("wap.main.home.gameTab.live");
      case GameTypeEnum.LIVELOBBY:
        return i18n.t("wap.main.home.gameTab.live");
      case GameTypeEnum.QIPAI:
        return i18n.t("wap.main.home.gameTab.chess");
      case GameTypeEnum.QIPAILOBBY:
        return i18n.t("wap.main.home.gameTab.chess");
      case GameTypeEnum.SPORTS:
        return i18n.t("common.sport");
      case GameTypeEnum.ESPORTS:
        return i18n.t("common.esports");
      case GameTypeEnum.LOTTERYLOBBY:
        return i18n.t("wap.main.home.gameTab.lottery");
      case GameTypeEnum.SLOT:
        return i18n.t("wap.main.home.gameTab.slot");
      case GameTypeEnum.FISH:
        if (config.features.MenuItem_ShootFish) {
          return i18n.t("common.shootFish");
        } else {
          return i18n.t("wap.main.home.gameTab.fish");
        }

      case GameTypeEnum.TIGERSLOT:
      default:
        return i18n.t("wap.main.home.gameTab.electron");
    }
  };
  getImgPrefix(gameType) {
    switch (gameType) {
      case GameTypeEnum.FISH:
        return "fish";
      case GameTypeEnum.LIVE:
        return "live";
      case GameTypeEnum.LIVELOBBY:
        return "live";
      case GameTypeEnum.LOTTERY:
        return "lottery";
      case GameTypeEnum.LOTTERYLOBBY:
        return "lottery";
      case GameTypeEnum.QIPAI:
        return "chess";
      case GameTypeEnum.QIPAILOBBY:
        return "chess";
      case GameTypeEnum.SLOT:
        return "slot";
      case GameTypeEnum.SPORTS:
        return "sports";
      case GameTypeEnum.ESPORTS:
        return "esports";
      case GameTypeEnum.TIGERSLOT:
        return "slot";
      case GameTypeEnum.TABLEGAME:
        return "table";
      default:
        return "";
    }
  }

  gameMenu = [
    {
      image: "1",
      title: i18n.t("common.sport"),
      big: true,
      type: [GameTypeEnum.SPORTS],
    },
    {
      image: "2",
      title: i18n.t("common.live"),
      big: true,
      type: [GameTypeEnum.LIVELOBBY],
    },
    {
      image: "8",
      title: i18n.t("common.esports"),
      big: false,
      type: [GameTypeEnum.ESPORTS],
    },
    {
      image: "3",
      title: i18n.t("common.slot"),
      big: false,
      type: [GameTypeEnum.SLOT],
    },
    {
      image: "4",
      title: config.features.MenuItem_ShootFish
        ? i18n.t("common.shootFish")
        : i18n.t("common.fish"),
      big: false,
      type: [GameTypeEnum.FISH],
    },
    {
      image: "5",
      title: i18n.t("common.lottery"),
      big: false,
      type: [GameTypeEnum.LOTTERY],
    },
    {
      image: "6",
      title: i18n.t("common.electron"),
      big: false,
      type: [GameTypeEnum.TABLEGAME],
    },
    {
      image: "7",
      title: i18n.t("common.chess"),
      big: false,
      type: [GameTypeEnum.QIPAILOBBY],
    },
  ];

  shiftScene = (scene, type) => {
    this.setState({
      ...this.state,
      scene: scene,
      selected: type,
    });
  };

  changeShowGame = (type) => {
    this.setState({
      selected: type,
      listOfGame: this.props.game.homePageGameList.filter(
        (game) => type.indexOf(game.type) >= 0
      ),
    });
  };

  scenes = (scene) => {
    switch (scene) {
      case 1:
        return (
          <TemplateSwitcher
            template={config.wapVersion}
            gameTypeListSorting={this.state.gameTypeListSorting}
            homePageGameList={this.props.game.homePageGameList}
            getImgPrefix={this.getImgPrefix}
            selectedGameType={this.state.selectedGameType}
            convertGameTypeToText={this.convertGameTypeToText}
            handleGameTypeClick={this.handleGameTypeClick}
            handleGameClick={this.handleGameClick}
            gameMenu={this.gameMenu}
            shiftScene={this.shiftScene}
            changeShowGame={this.changeShowGame}
            scrollRef={this.scrollRef}
            handleSignupClick={this.handleSignupClick}
          />
        );
      case 2:
        return (
          <GamePicker
            template={config.wapVersion}
            listOfGame={this.state.listOfGame}
            gameTypeListSorting={this.state.gameTypeListSorting}
            homePageGameList={this.props.game.homePageGameList}
            getImgPrefix={this.getImgPrefix}
            selectedGameType={this.state.selectedGameType}
            convertGameTypeToText={this.convertGameTypeToText}
            handleGameTypeClick={this.handleGameTypeClick}
            handleGameClick={this.handleGameClick}
            gameMenu={this.gameMenu}
            shiftScene={this.shiftScene}
            changeShowGame={this.changeShowGame}
            selected={this.state.selected}
          />
        );
    }
  };
  getVIPName = (id) => {
    switch (id) {
      case 1:
        return "VIP1";
      case 2:
        return "Silver";
      case 3:
        return "Gold";
      case 4:
        return "Platinum";
      case 5:
        return "Diamond";
      default:
        return "";
    }
  };
  updownSwitcher = (template) => {
    switch (template) {
      case 1:
        return "up";
      case 2:
        return "fixed";
      case 3:
        return "scroll";
      case 4:
        return "no-gap-down";
      case 5:
        return "scroll";
      case 6:
        return "no-gap-up";
      case 7:
        return "no-gap-up";
      default:
        return "up";
    }
  };

  render() {
    return (
      <React.Fragment>
        <CustomAppBar position="fixed" color="default" scene={this.state.scene}>
          {/* {(() => {
            if (this.props.ui.board_list.length === 0) {
              return <React.Fragment></React.Fragment>;
            } else {
              return <Slider list={this.props.ui.board_list}></Slider>;
            }
          })()} */}
          {this.state.scene === 1 ? (
            <NewAppBar>
              <TheContainer>
                <LogoHolder
                  img={
                    this.props.general.brand &&
                    this.props.general.brand.mobileLogoUrl
                  }
                />
                {config.features.DisplayPhone &&
                  this.props.general.brandsSupport.length > 0 && (
                    <PhoneHolder>
                      <Icon
                        src={
                          process.env.PUBLIC_URL +
                          `/assets/images/wapp/phone.png`
                        }
                      ></Icon>
                      {this.props.general.brandsSupport &&
                        this.props.general.brandsSupport.length > 0 &&
                        this.props.general.brandsSupport[0].phone}

                      {this.props.account.token && config.features.CustomVIP && (
                        <React.Fragment>
                          <Icon
                            style={{ marginLeft: "10px" }}
                            src={
                              process.env.PUBLIC_URL +
                              `/assets/images/wapp/vip.png`
                            }
                          ></Icon>
                          {this.getVIPName(
                            this.props.account.info.member_level_id
                          )}
                        </React.Fragment>
                      )}
                    </PhoneHolder>
                  )}
              </TheContainer>
              {(() => {
                if (!this.props.account.token) {
                  return (
                    <TheContainer>
                      <CustomButtonContainer>
                        <CustomColoredButton onClick={this.handleSignupClick}>
                          {i18n.t("common.login")}
                        </CustomColoredButton>
                        <CustomColoredButton
                          primary
                          onClick={this.handleRegisterClick}
                        >
                          {i18n.t("common.register")}
                        </CustomColoredButton>
                      </CustomButtonContainer>
                    </TheContainer>
                  );
                } else {
                  return (
                    <TheContainer>
                      <CustomButtonContainer>
                        <UsernameContainer>
                          {this.props.account.info.member_username}
                        </UsernameContainer>
                        <CustomColoredButton
                          primary
                          onClick={this.handleLogout}
                        >
                          {i18n.t("common.exit")}
                        </CustomColoredButton>
                      </CustomButtonContainer>
                    </TheContainer>
                  );
                }
              })()}
            </NewAppBar>
          ) : (
            <NewAppBar>
              <SceneTwoAppBar>
                <div
                  onClick={() => {
                    this.shiftScene(1, "");
                    this.changeShowGame("");
                  }}
                >
                  <BackButton />
                </div>
                <SceneTwoAppBarTitle>
                  {this.gameMenu
                    .filter((a) => a.type === this.state.selected)
                    .map((data) => {
                      return data.title;
                    })}
                </SceneTwoAppBarTitle>
                <div></div>
              </SceneTwoAppBar>
            </NewAppBar>
          )}

          {
            //  this.state.scene === 1 && (
            //    <div>
            //      <SliderContainer>
            //        <Slider list={this.props.ui.board_list}></Slider>
            //      </SliderContainer>
            //      <AnnouncementContainer>
            //        <AnnouncementTitle>
            //          <AnnounceIcon
            //            icon={
            //              process.env.PUBLIC_URL +
            //              `/assets/images/wapp/announce.svg`
            //            }
            //          />
            //          {i18n.t('wap.main.home.profile.announcement')}
            //        </AnnouncementTitle>
            //        <MarqueeContainer>
            //          <Marquee />
            //        </MarqueeContainer>
            //      </AnnouncementContainer>
            //    </div>
            //  )
          }
          {
            //    <FixedContainer>
            //    <AnnouncementContainer>
            //      <AnnouncementTitle>
            //        {i18n.t('wap.main.home.profile.announcement')}
            //      </AnnouncementTitle>
            //      <MarqueeContainer>
            //        <Marquee />
            //      </MarqueeContainer>
            //    </AnnouncementContainer>
            //    <ProfileContainer
            //      src={
            //        process.env.PUBLIC_URL + `/assets/images/wapp/home-profile.png`
            //      }
            //    >
            //      <ProfileContainerTop>
            //        {(() => {
            //          if (this.props.account.token != null) {
            //            return (
            //              <React.Fragment>
            //                <WelcomeLabel>
            //                  {i18n.t(
            //                    'wap.main.home.profile.welcomeBack'
            //                  )}
            //                </WelcomeLabel>
            //                <WelcomeUsernameLabel>
            //                  {this.props.account.info.member_username}
            //                </WelcomeUsernameLabel>
            //              </React.Fragment>
            //            )
            //          } else {
            //            return (
            //              <WelcomeLabel>
            //                {i18n.t(
            //                  'wap.main.home.profile.pleaseLogin'
            //                )}
            //              </WelcomeLabel>
            //            )
            //          }
            //        })()}
            //
            //        <ProfileLink onClick={() => this.props.navigate('/profile')}>
            //          {i18n.t('wap.main.home.profile.profile')}
            //        </ProfileLink>
            //      </ProfileContainerTop>
            //      <ProfileContainerBottom>
            //        <BalanceContainer>
            //          {(() => {
            //            if (this.props.account.token != null) {
            //              return (
            //                <React.Fragment>
            //                  <BalanceAmount>
            //                    {this.props.wallet.mainSymbol}{' '}
            //                    {Common.formatNumberWithThousand(
            //                      this.props.wallet.mainBalance +
            //                        this.props.game.providerList
            //                          .filter(
            //                            (item) =>
            //                              item.status === 0 &&
            //                              item.transferwallet === true
            //                          )
            //                          .reduce((a, v) => (a = a + v.balance), 0)
            //                    )}
            //                  </BalanceAmount>
            //                  <WalletTypeLabel>
            //                    {i18n.t(
            //                      'wap.main.home.profile.mainAccount'
            //                    )}
            //                  </WalletTypeLabel>
            //                </React.Fragment>
            //              )
            //            } else {
            //              return (
            //                <ButtonSignup onClick={this.handleSignupClick}>
            //                  {i18n.t(
            //                    'wap.main.home.profile.loginRegister'
            //                  )}
            //                </ButtonSignup>
            //              )
            //            }
            //          })()}
            //        </BalanceContainer>
            //        <WalletActionContainer>
            //          <WalletActionUL>
            //            <WalletActionLI
            //              onClick={() => this.props.navigate('/deposit')}
            //            >
            //              <WalletActionIcon
            //                img={
            //                  process.env.PUBLIC_URL +
            //                  `/assets/images/wapp/icon-deposit.png`
            //                }
            //              ></WalletActionIcon>
            //              {i18n.t('common.deposit')}
            //            </WalletActionLI>
            //            <WalletActionLI
            //              onClick={() => this.props.navigate('/transfer')}
            //            >
            //              <WalletActionIcon
            //                img={
            //                  process.env.PUBLIC_URL +
            //                  `/assets/images/wapp/icon-transfer.png`
            //                }
            //              ></WalletActionIcon>
            //              {i18n.t('common.transfer')}
            //            </WalletActionLI>
            //            <WalletActionLI
            //              onClick={() => this.props.navigate('/withdrawal')}
            //            >
            //              <WalletActionIcon
            //                img={
            //                  process.env.PUBLIC_URL +
            //                  `/assets/images/wapp/icon-withdrawal.png`
            //                }
            //              ></WalletActionIcon>
            //              {i18n.t('common.withdrawal')}
            //            </WalletActionLI>
            //          </WalletActionUL>
            //        </WalletActionContainer>
            //      </ProfileContainerBottom>
            //    </ProfileContainer>
            //  </FixedContainer>
          }
        </CustomAppBar>
        {this.state.scene === 1 && (
          <Banner
            updown={this.updownSwitcher(config.wapVersion)}
            banner={this.props.general.banner}
          />
        )}
        <GameListContainer scene={this.state.scene}>
          {this.scenes(this.state.scene)}
        </GameListContainer>
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    account: state.account,
    ui: state.ui,
    wallet: state.wallet,
    game: state.game,
    general: state.general,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    accountLogout: (token) => dispatch(accountAction.accountLogout(token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Home));
