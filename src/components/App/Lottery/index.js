import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { SHOW_LOGIN } from "../../../api-services/constant/actionType";
import { GameTypeEnum } from "../../../api-services/utils/Enum";
import ScrollAnimation from "react-animate-on-scroll";

import i18n from "../../../utils/i18n";
import Common from "../../../utils/Common";

const Container = styled.div`
  width: 100%;
  height: auto;
  min-height: 780px;
  position: relative;
  background: url(${(props) =>
      process.env.PUBLIC_URL +
      "/assets/images/pcGamePage/lottery/background" +
      (props.GamePage_SpecificBackground ? "-hk28" : "") +
      ".jpg"})
    no-repeat center;
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

const SportsWrapper = styled.div`
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
  background: url(${process.env.PUBLIC_URL}"/assets/images/pcGamePage/lottery/btn-lottery.png")
    no-repeat;
  text-align: center;
  line-height: 1.8em;
`;

const RightNavItem = styled.li`
  box-shadow: 0 3px 8px rgb(0 0 0 / 80%);
  cursor: pointer;
  overflow: hidden;
  position: relative;
  width: 355px;
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
class Lottery extends Component {
  constructor(props) {
    super(props);
    var lotteryList = this.getLotteryGame();
    this.state = {
      selected: lotteryList[0],
      subMenu: null,
      loaded: false,
      hide: true,
      list: lotteryList,
    };
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({
        hide: false,
      });
    }, 1000);
  }
  componentDidUpdate(preProps, preStates) {
    if (
      preProps.game.homePageGameList.length !==
      this.props.game.homePageGameList.length
    ) {
      var lotteryList = this.getLotteryGame();

      this.setState({
        ...this.state,
        selected: lotteryList[0],

        list: lotteryList,
      });
    }
  }
  getLotteryGame = () => {
    var lotteryList = this.props.game.homePageGameList.filter((item) => {
      return (
        item.type === GameTypeEnum.LOTTERY ||
        item.type === GameTypeEnum.LOTTERYLOBBY
      );
    });
    var newLotteryList = [];
    var existList = [];
    for (var i = 0; i < lotteryList.length; i++) {
      if (existList.indexOf(lotteryList[i].abbreviation) < 0) {
        existList.push(lotteryList[i].abbreviation);
        newLotteryList.push(lotteryList[i]);
      }
    }
    return newLotteryList;
  };
  handleJoinGameClick = (name) => {
    if (this.props.account.token != null) {
      if (document.getElementById("audio") != null)
        document.getElementById("audio").volume = 0.0;
      Common.closePreviousPopup();
      // this.props.performBalanceRefresh();
      var win = Common.PopupCenter("/joinlottery/" + name, name, 1280, 720);
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

  handleGameChange = (game) => {
    this.setState({
      selected: game,
    });
  };

  render() {
    return (
      <Container>
        <SportsWrapper>
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
                          `/assets/images/pcGamePage/lottery/${data.abbreviation.toLowerCase()}.png`
                        }
                      ></GameImage>
                      <GameTitle>{data.name}</GameTitle>
                    </RightNavItem>
                  );
                })}
              </RightNavItemContainer>
            </ScrollAnimation>
          </RightContainer>
        </SportsWrapper>
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
export default connect(mapStateToProps, mapDispatchToProps)(Lottery);
