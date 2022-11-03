import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import ScrollAnimation from "react-animate-on-scroll";
import { SHOW_LOGIN } from "../../../api-services/constant/actionType";
import { GameTypeEnum } from "../../../api-services/utils/Enum";
import i18n from "../../../utils/i18n";
import Common from "../../../utils/Common";

const Container = styled.div`
  width: 100%;
  height: auto;
  min-height: 780px;
  position: relative;
  background: url(${(props) =>
      process.env.PUBLIC_URL +
      "/assets/images/pcGamePage/qipai/background" +
      (props.GamePage_SpecificBackground ? "-hk28" : "") +
      ".jpg"})
    no-repeat center;
`;

const QipaiWrapper = styled.div`
  margin: 0 auto;
  width: 1280px;
`;

const RightContainer = styled.div`
  top: 0;
  right: 295px;
  position: absolute;
  height: 780px;
`;

const RightNavItemContainer = styled.ul`
  list-style-type: none;
  display: grid;
  overflow: auto;
  height: 765px;
  align-content: center;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const GameImage = styled.img`
  height: 100%;
  width: 100%;
  transition: transform 0.3s;
`;

const GameTitle = styled.div`
  height: 45px;
  width: 100%;
  border-radius: 10px;
  color: #ffffff;
  font-size: 1.5em;
  font-weight: bold;
  position: absolute;
  bottom: 0;
  background: url(${process.env.PUBLIC_URL}"/assets/images/pcGamePage/qipai/btn-qipai.png")
    no-repeat;
  text-align: center;
  line-height: 1.8em;
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

const RightNavItem = styled.li`
  box-shadow: 0 3px 8px rgb(0 0 0 / 80%);
  cursor: pointer;
  overflow: hidden;
  position: relative;
  width: 354px;
  height: 180px;
  border-radius: 10px;
  margin: 20px 0;
  &:hover ${GameImage} {
    transform: scale(1.05);
    transition: transform 0.3s;
  }

  ${({ maintenance }) => {
    return maintenance
      ? `

  ${Maintenance}{
    display: flex;
  }
  ${GameImage}, ${GameTitle}{
    filter: brightness(40%) grayscale(200%);
  }
  `
      : ``;
  }}
`;

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
    //test for fake input
  }
  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.game.homePageGameList.length !==
      this.props.game.homePageGameList.length
    ) {
      var qipaiList = this.props.game.homePageGameList.filter((item) => {
        return item.type == GameTypeEnum.QIPAI;
      });

      this.setState({
        ...this.state,
        selected: qipaiList[0],

        list: qipaiList,
      });
    }
  }

  handleJoinGameClick = (kind) => {
    if (this.props.account.token != null) {
      if (document.getElementById("audio") != null)
        document.getElementById("audio").volume = 0.0;
      Common.closePreviousPopup();
      // this.props.performBalanceRefresh();
      var win = Common.PopupCenter(
        "/" +
          i18n.language +
          "/joingame/" +
          GameTypeEnum.QIPAILOBBY +
          "/" +
          kind.toUpperCase(),
        kind.toUpperCase(),
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
      this.props.showLogin(true);
    }
  };

  render() {
    return (
      <Container>
        <QipaiWrapper>
          <RightContainer>
            <ScrollAnimation
              animateIn="fadeInRight"
              duration={1}
              animateOnce={true}
              style={{ overflow: "visible" }}
            >
              <RightNavItemContainer>
                {this.state.list.map((data, index) => {
                  return (
                    <RightNavItem
                      selected={this.state.selected === index}
                      onClick={() => {
                        if (data.status === 0) {
                          this.handleJoinGameClick(
                            data.abbreviation,
                            data.type
                          );
                        }
                      }}
                      maintenance={data.status !== 0}
                    >
                      <Maintenance>
                        {i18n.t("transfer.maintenance")}
                      </Maintenance>
                      <GameImage
                        src={
                          process.env.PUBLIC_URL +
                          `/assets/images/pcGamePage/qipai/${data.abbreviation.toLowerCase()}.png`
                        }
                      ></GameImage>
                      <GameTitle>{data.abbreviation}</GameTitle>
                    </RightNavItem>
                  );
                })}
              </RightNavItemContainer>
            </ScrollAnimation>
          </RightContainer>
        </QipaiWrapper>
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
    account: state.account,
    game: state.game,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Qipai);
