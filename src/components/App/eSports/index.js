import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import config from "../../../config/config";
import { GameTypeEnum } from "../../../api-services/utils/Enum";
import { SHOW_LOGIN } from "../../../api-services/constant/actionType";
import i18n from "../../../utils/i18n";

import ScrollAnimation from "react-animate-on-scroll";

const Container = styled.div`
  width: 100%;
  height: auto;
  min-height: 780px;
  position: relative;
  background: url(${(props) =>
      process.env.PUBLIC_URL +
      "/assets/images/pcGamePage/esports/background" +
      (props.GamePage_SpecificBackground ? "-hk28" : "") +
      ".jpg"})
    no-repeat center;
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

const LeftContainer = styled.div`
  top: 0;
  left: 165px;
  position: absolute;
  height: 835px;
`;

const LeftNavItemContainer = styled.ul`
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
  background: url(${process.env.PUBLIC_URL}"/assets/images/pcGamePage/esports/btn-esports.png") no-repeat;
  text-align: center;
  line-height: 1.8em;
`;

const LeftNavItem = styled.li`
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
class ESports extends Component {
  constructor(props) {
    super(props);

    var esportsList = props.game.homePageGameList.filter((item) => {
      return item.type === GameTypeEnum.ESPORTS;
    });

    this.state = {
      selected: 0,
      selectedGame: "",
      list: esportsList,
    };
  }

  componentDidMount() {}
  componentDidUpdate(preProps, preStates) {
    if (
      preProps.game.homePageGameList.length !==
      this.props.game.homePageGameList.length
    ) {
      var esportsList = this.props.game.homePageGameList.filter((item) => {
        return item.type === GameTypeEnum.ESPORTS;
      });

      this.setState({
        ...this.state,
        selected: 0,
        list: esportsList,
      });
    }
  }
  handleJoinGameClick = (params, type) => {
    if (!this.props.account.token) {
      this.props.showLogin(true);
    } else {
      if (params === "WGFM" || params === "WGVIA") {
        window.open(
          `/${i18n.language}/joinlobbygame/${type}/${params}`,
          "_blank"
        );
      } else {
        this.props.history.push(
          "/" + i18n.language + "/sports/play/" + params + "/" + type
        );
      }
    }
  };
  render() {
    return (
      <Container>
        <SportsWrapper>
          <LeftContainer>
            <ScrollAnimation
              animateIn="fadeInLeft"
              duration={1}
              animateOnce={true}
              style={{ overflow: "visible" }}
            >
              <LeftNavItemContainer>
                {this.state.list.map((data, index) => {
                  return (
                    <LeftNavItem
                      selected={this.state.selected === index}
                      onClick={() => {
                        if(data.status === 0)
                        {
                          this.handleJoinGameClick(data.abbreviation, data.type);
                        }
                      }}
                      maintenance={data.status !== 0}
                    >
                      <Maintenance>{i18n.t("transfer.maintenance")}</Maintenance>
                      <GameImage src={process.env.PUBLIC_URL + `/assets/images/pcGamePage/esports/${data.abbreviation.toLowerCase()}.png`}></GameImage>
                      <GameTitle>{data.abbreviation}</GameTitle>
                    </LeftNavItem>
                  );
                })}
              </LeftNavItemContainer>
            </ScrollAnimation>
          </LeftContainer>
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
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ESports));
