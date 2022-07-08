import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { withRouter } from "react-router-dom";

import BGPromotionJPG from "../../../assets/images/bg-promotion.jpg";

import { AppHistory } from "../../../history/History";

import { withSnackbar } from "notistack";

import i18n from "../../../utils/i18n";
import { generalAction } from "../../../api-services/actions/generalAction";
import { SHOW_LOGIN } from "../../../api-services/constant/actionType";
import { Grid, Container as MContainer } from "@material-ui/core";

import PromoEmpty from "../../../assets/images/promo-empty.png";

const moment = require("moment");

const Container = styled.div`
  width: 100%;
  background: #000; //url(${BGPromotionJPG}) no-repeat top center #fff;
  min-height: 780px;
  position: relative;
`;
const Wrap = styled.div`
  width: 1280px;
  margin: 0 auto;
`;

const ThePromotion = styled(Grid)`
  margin: 70px 0;
`;

const ThePromotionContainer = styled(Grid)`
  background: #fff;
  width: 100%;
  border-radius: 20px;
  padding: 25px 18px;
  flex-direction: column;
  box-shadow: 5px 5px 8px rgba(32, 0, 0, 0.7);
  height: 539px;
  position: relative;
`;

const PromoImages = styled.div`
  width: 550px;
  height: 222px;
  position: relative;
  margin-bottom: 12px;
  background: url(${(props) => props.img}) no-repeat;
  background-size: 100% 100%;
`;

const EventTitle = styled.div`
  color: #7e0000;
  margin-bottom: 10px;
  font-size: 19px;
  font-family: Arial;
  margin-left: -8px;
`;
const EventLabel = styled.div`
  font-size: 15px;
  color: #4f4f4f;
  font-family: Arial;
  line-height: 16px;
  margin-bottom: 6px;
  font-weight: bold;
`;
const EventText = styled.div`
  font-size: 15px;
  color: #4f4f4f;
  font-family: Arial;
  line-height: 16px;
  margin-bottom: 12px;
`;

const PromoButtonContainer = styled(Grid)`
  cursor: pointer;
  user-select: none;
  position: relative;
`;

const PromoButtonImg = styled.div`
  width: 100%;
  border-radius: 5px;
  height: 62px;
  background-image: linear-gradient(
    to top,
    ${({ theme }) => theme.primaryGradient},
    ${({ theme }) => theme.primary}
  );
`;

const PromoButtonText = styled.div`
  position: absolute;
  left: calc(50% - 32px);
  bottom: 20px;
  color: white;
  font-size: 20px;
`;

const ContainerForPromoList = styled(Grid)`
  padding: 14px;
`;

const PromotionBannerContainer = styled.div`
  cursor: pointer;
  margin: 10px 0;
  transition: 0.3s ease;
  background: #fff;
  width: 1200px;
  height: 486px;

  &:hover {
    transform: translateY(10px);
  }
  & img {
    width: 1200px;
    height: 486px;
  }
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

class Promotion extends Component {
  state = {
    list: [],
    selectedTab: 0,
    selectedPromoId: "",
    selectedPromoTitle: "",
    selectedBospId: 0,
    openJoin: false,
    selectedPromoSpecifications: [],
  };

  componentDidMount() {
    this.props.getPromotion();
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.account.token !== this.props.account.token) {
      this.props.getPromotion();
    }

    if (
      this.props.general.joinPromoResult !== null &&
      prevProps.general.joinPromoResult !== this.props.general.joinPromoResult
    ) {
      if (this.props.general.joinPromoResult.success === true) {
        this.props.enqueueSnackbar(i18n.t("promotion.joinSuccess"), {
          variant: "success",
        });
      } else {
        if (this.props.general.joinPromoResult.err === 0) {
          this.props.enqueueSnackbar(i18n.t("promotion.promoJoint"), {
            variant: "error",
          });
        }
      }
    }
  }

  //TODO: Temporary hardcode the navigation
  handlejoinPromotionClick = (id, promotionType) => {
    if (this.props.account.token === null) this.props.showLogin(true);
    else {
      this.props.joinPromotion(id);
      if (
        ["FirstDeposit", "DailySecondDeposit", "DailyFirstDeposit"].indexOf(
          promotionType
        ) >= 0
      ) {
        AppHistory.push({
          pathname: "/" + i18n.language + "/account/deposit/" + id,
        });
      }
    }
  };
  handlePromotionClick = (id, promotionType) => {
    AppHistory.push({
      pathname: "/" + i18n.language + "/promotion/" + id,
    });
  };
  render() {
    return (
      <Container>
        {this.props.general.promotionList.items &&
        this.props.general.promotionList.items.length <= 0 ? (
          <NoContentContainer lang={i18n.language}></NoContentContainer>
        ) : (
          <></>
        )}
        <Wrap>
          <MContainer>
            <ThePromotion container>
              {this.props.general.promotionList.items.map((data, index) => {
                var checkLocale = data.localization[i18n.language];
                return (
                  <PromotionBannerContainer
                    onClick={() =>
                      this.handlePromotionClick(data.id, data.promotionType)
                    }
                  >
                    <img
                      src={
                        checkLocale
                          ? checkLocale.desktopBanner
                          : data.desktopBanner
                      }
                      alt={data.name}
                    ></img>
                    {/* <img
                     src={
                        process.env.PUBLIC_URL +
                        `/assets/images/promotion/${i18n.language}/BN-${index}.jpg`
                      } alt={data.name}>
                    </img> */}
                  </PromotionBannerContainer>
                );
              })}
            </ThePromotion>
          </MContainer>
        </Wrap>
      </Container>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    general: state.general,
    account: state.account,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    showLogin: (payload) => {
      dispatch({ type: SHOW_LOGIN, payload });
    },
    joinPromotion: (id) => {
      dispatch(generalAction.joinPromotion(id));
    },
    //TODO: Revert the 4th param to true after testing.
    getPromotionList: (language) =>
      dispatch(
        generalAction.getPromotionList(language, 1, 99, false, "", true)
      ),
    getPlayerPromotionList: (language) =>
      dispatch(
        generalAction.getPlayerPromotionList(language, 1, 99, true, "", true)
      ),
    getPromotion: () => dispatch(generalAction.getPromotion()),
  };
};
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(withSnackbar(Promotion))
);
