import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import BGJPG from "../../../assets/images/bg.jpg";
import { AppHistory } from "../../../history/History";
import { withSnackbar } from "notistack";

import i18n from "../../../utils/i18n";
import { generalAction } from "../../../api-services/actions/generalAction";
import { SHOW_LOGIN } from "../../../api-services/constant/actionType";
import IconLoginClosePNG from "../../../assets/images/icon-login-close.png";
import { Grid, Container as MContainer } from "@material-ui/core";

const moment = require("moment");

const Container = styled.div`
  width: 100%;
  padding-top: 20px;

  position: relative;
  background: #000;//url(${BGJPG}) no-repeat top center #19262f;
  min-height: 800px;
`;

const PromoDesc = styled.div`
  font-size: 14px;
  color: #747474;
`;

const PromoDetailContainer = styled(Grid)`
  box-shadow: 0px 1px 8px rgba(32, 0, 0, 0.7);
  margin: 10px 0px;
  width: 100%;
  position: relative;
  background: white;
  //padding: 18px 15px;
  border-radius: 20px;
  height: 700px;
`;

const PromoDetailHeaderContainer = styled.div`
justify-content: flex-end;
box-sizing: border-box;
width: 100%;
background-color: #0091FE
height: 50px;
    padding: 0 20px;`;

const PromoDetailBodyContainer = styled.div`
  padding: 18px 0;
  height: 650px;
`;

const PromoDetailLeftContainer = styled.div`
  background-color: rgba(204, 204, 204, 0.1);
  box-shadow: 1px 0 0 0 rgb(204 204 204 / 30%);
  box-sizing: border-box;
  height: calc(100% - 50px);
  max-width: 350px;
  position: absolute;
  top: 50px;
  transition: 0.2s ease;
  z-index: 1;
  overflow: visible;
  ${({ isToggled }) =>
    isToggled ? `padding: 10px; width:0;` : `padding: 15px; width: 35%;`}

  & img {
    ${({ isToggled }) => (isToggled ? `display: none;` : `display: block;`)}
    width: 100%;
  }

  & h1 {
    ${({ isToggled }) => (isToggled ? `display: none;` : ``)}
    font-size: 21px;
    line-height: 1.4;
    margin: 15px 0;
  }
`;

const PromoDetailToggleButton = styled.div`
  align-items: center;
  display: block;
  display: flex;
  height: 80px;
  justify-content: center;
  position: absolute;
  right: -40px;
  top: 50%;
  transform: translateY(-50%);
  width: 80px;
  z-index: 10;
  &:after {
    ${({ isToggled }) => (isToggled ? ` content: "❯";` : ` content: "❮";`)}
    speak: none;
    align-items: center;
    background-color: rgba(239, 239, 239, 0.9);
    border-radius: 50%;
    box-shadow: 0 1px 5px rgb(0 0 0 / 50%);
    color: #085e49;
    cursor: pointer;
    display: flex;
    font-family: iconmps !important;
    font-size: 20px;
    font-style: normal;
    font-variant: normal;
    font-weight: 400;
    height: 30px;
    justify-content: center;
    line-height: 1;
    text-transform: none;
    transition: 0.3s ease;
    width: 30px;
  }
`;

const PromoDetailRightContainer = styled.div`
  box-sizing: border-box;
  height: calc(100% - 50px);
  overflow: auto;
  ${({ isToggled }) =>
    isToggled
      ? `     
      margin-left: 0;
      padding: 20px 50px 80px;
      width: 100%;`
      : `     
      margin: 0 0 0 35%;  
      padding: 15px;  
      width: 65%;
    `}

`;

const PromoDetailJoinButton = styled.button`
  background-color: #20d0ff;
  border: 0;
  border-radius: 22.5px;
  color: #fff;
  font-size: 16px;
  height: 45px;
  padding: 0 30px;
  box-shadow: 0 2px 10px rgb(0 0 0 / 20%);
  cursor: pointer;
  transition: 0.3s ease;

  ${({ uiDisabled }) => {
    return uiDisabled
      ? `
  opacity: 0.65;
  cursor: not-allowed;`
      : ``;
  }}
  &:hover {
    transform: scale3d(1.06, 1.06, 1);
  }
`;

const PromoDetailFooterContainer = styled.div`
  display: flex;
  justify-content: center;
  background: transparent;
  bottom: 0;
  box-sizing: border-box;
  left: 0;
  padding: 20px;
  position: absolute;
  transition: 0.2s ease;
  z-index: 5;
  ${({ isToggled }) =>
    isToggled
      ? `   max-width: 100%;
    width: 100%;`
      : `   max-width: 350px;  width: 35%;

    `}
`;

const PromoDetailImage = styled.div`
  width: 100%;
  height: 486px;
  margin-bottom: 20px;
  background: url(${(props) => props.img}) no-repeat;
  background-size: contain;
`;

const EventTitle = styled.div`
  color: #0091fe;
  margin-bottom: 10px;
  font-size: 16px;
  font-family: Arial;
  font-weight: bold;
`;

const EventText = styled.div`
  font-size: 14px;
  color: #4f4f4f;

  line-height: 26px;
  margin-bottom: 20px;
`;
const PromoButtonContainer = styled(Grid)`
  cursor: pointer;
  user-select: none;
  position: relative;
  width: 100%;
  border-radius: 5px;
  height: 62px;
  background-image: linear-gradient(
    to top,
    ${({ theme }) => theme.primaryGradient},
    ${({ theme }) => theme.primary}
  );

  ${({ disableTheButton }) => {
    return disableTheButton
      ? `
    opacity: 0.65;
    cursor: not-allowed;`
      : ``;
  }}
`;
const TNCContainer = styled.span`
  color: #123414;
  text-decoration: underline;
  font-weight: bold;
`;
const PromoButtonText = styled(Grid)`
  color: #fff;
  font-size: 20px;
`;
const StyledDialog = withStyles({
  root: {
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",

    "& .MuiPaper-root": {
      backgroundColor: "transparent",
      borderRadius: "15px",
    },
  },
})(Dialog);
const DialogContainer = styled.div`
  width: 600px;

  background-color: #fff;
  display: table;
`;
const CloseIconContainer = styled.div`
  background: url(${IconLoginClosePNG}) no-repeat;
  width: 28px;
  height: 28px;
  float: right;
  margin: 10px 10px 0 0;
  &:hover {
    cursor: pointer;
  }
`;
const TitleContainer = styled.div`
  text-align: center;

  font-size: 42px;

  color: ${({ theme }) => theme.secondary};
`;
const DialogContent = styled.div`
  margin: 0 auto;
  padding: 10px 40px;
`;

const CloseButton = styled.div`
  position: absolute;
  right: 5px;
  top: 0px;
  user-select: none;
  cursor: pointer;
  font-size: 24px;
  //background: #fff;
  padding: 8px 12px;
  color: #fff;
`;
class PromotionDetails extends Component {
  constructor(props) {
    super(props);
    var index = -1;
    var details = null;
    for (var i = 0; i < this.props.general.promotionList.items.length; i++) {
      if (
        this.props.general.promotionList.items[i].id ===
        this.props.match.params.id
      ) {
        index = i;
        details = this.props.general.promotionList.items[i];
        break;
      }
    }
    if (index === -1) {
      AppHistory.replace("/" + i18n.language + "/promotion");
    }
    var term = "";
    if (details) {
      if (
        details.localization !== null &&
        details.localization.terms &&
        details.localization.terms !== null
      ) {
        term = details.localization.terms || "";
      } else {
        term = details.terms || "";
      }
    }

    this.state = {
      index: index,
      details: details,
      term: term,
      joined: false,
      openDialog: false,
      isToggled: false,
    };
  }

  componentDidMount() {
    if (this.props.match.params.id == null) {
      AppHistory.replace("/" + i18n.language + "/promotion");
    }
    if (this.props.general.promotionList.items.length <= 0) {
      AppHistory.replace("/" + i18n.language + "/promotion");
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.general.joinPromoResult !== null &&
      prevProps.general.joinPromoResult !== this.props.general.joinPromoResult
    ) {
      if (this.props.general.joinPromoResult.success === true) {
        this.props.enqueueSnackbar(i18n.t("promotion.joinSuccess"), {
          variant: "success",
        });
        this.setState({
          ...this.state,
          joined: true,
        });
      } else {
        if (this.props.general.joinPromoResult.err === 0) {
          this.props.enqueueSnackbar(i18n.t("promotion.promoJoint"), {
            variant: "success",
          });
        }
      }
    }
    if (prevProps.account.token !== this.props.account.token) {
      AppHistory.replace("/" + i18n.language + "/promotion");
    }
  }

  handleBospIdChange = (bospId) => {
    this.setState({ ...this.state, selectedBospId: bospId });
  };
  ResetPopup = () => {
    this.setState({
      ...this.state,
      openJoin: false,
      selectedPromoSpecifications: [],
      selectedPromoTitle: "",
      selectedBospId: 0,
    });
    this.props.history.push("/" + i18n.language + "/promotion");
  };
  handleCloseDialog = () => {
    this.ResetPopup();
  };
  ViewAllClick = (activity_id) => {
    let list = this.state.list;
    var foundIndex = list.findIndex((x) => x.id === activity_id);
    list[foundIndex].checked = !list[foundIndex].checked;

    this.setState({ ...this.state, list: list });
  };
  contentClickHandler = (e) => {
    const targetLink = e.target.closest("a");
    if (!targetLink) return;
    e.preventDefault();
    if (targetLink.href.indexOf("/promotion/") >= 0) {
      this.props.history.push(
        "/" +
          i18n.language +
          "/promotion/" +
          targetLink.href.substring(
            targetLink.href.indexOf("/promotion/") + 11,
            targetLink.href.length
          )
      );
    }
  };

  performRedirect = (id, promotionType) => {
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
  };

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
  handleCloseDialog = () => {
    this.setState({ ...this.state, openDialog: false });
  };
  handleShowDialog = () => {
    this.setState({ ...this.state, openDialog: true });
  };

  handleToggleButton = () => {
    this.setState({ ...this.state, isToggled: !this.state.isToggled });
  };

  goBack() {
    AppHistory.replace("/" + i18n.language + "/promotion");
  }
  render() {
    if (this.state.details === null) return <></>;
    return (
      <Container>
        <MContainer>
          <PromoDetailContainer container direction="column">
            <PromoDetailHeaderContainer>
              <CloseButton onClick={this.goBack}>✖</CloseButton>
            </PromoDetailHeaderContainer>
            <PromoDetailBodyContainer>
              <PromoDetailLeftContainer isToggled={this.state.isToggled}>
                <img
                  src={
                    this.state.details.localization.desktopBanner &&
                    this.state.details.localization.desktopBanner !== null
                      ? this.state.details.localization.desktopBanner
                      : this.state.details.desktopBanner
                  }
                  alt={this.state.details.name}
                ></img>
                <h1>{this.state.details.name}</h1>
                <PromoDetailToggleButton
                  isToggled={this.state.isToggled}
                  onClick={this.handleToggleButton}
                ></PromoDetailToggleButton>
              </PromoDetailLeftContainer>
              <PromoDetailRightContainer isToggled={this.state.isToggled}>
                <EventTitle>{i18n.t("promotion.promoTarget")}：</EventTitle>
                <EventText>
                  {this.state.details.vipLevels.map((a, index) => {
                    return (
                      <span key={index}>
                        VIP{a}
                        {index < this.state.details.vipLevels.length - 1 &&
                          ", "}
                      </span>
                    );
                  })}
                </EventText>
                <EventTitle>{i18n.t("promotion.promoDate")}：</EventTitle>
                <EventText>
                  {moment(this.state.details.from).format(
                    "YYYY/MM/DD HH:mm:ss"
                  )}
                  {" - "}
                  {moment(this.state.details.to).format("YYYY/MM/DD HH:mm:ss")}
                </EventText>
                <EventText>
                  <PromoDesc
                    dangerouslySetInnerHTML={{
                      __html:
                        "<div >" +
                        (() => {
                          if (
                            this.state.details.localization !== null &&
                            this.state.details.localization.content &&
                            this.state.details.localization.content !== null
                          ) {
                            return this.state.details.localization.content;
                          } else {
                            return this.state.details.content;
                          }
                        })() +
                        "</div>",
                    }}
                  ></PromoDesc>
                  {this.state.term !== "" && (
                    <TNCContainer onClick={this.handleShowDialog}>
                      {i18n.t("common.termsAndCondition")}
                    </TNCContainer>
                  )}
                </EventText>
              </PromoDetailRightContainer>
            </PromoDetailBodyContainer>
            <PromoDetailFooterContainer isToggled={this.state.isToggled}>
              <PromoDetailJoinButton
                uiDisabled={this.state.joined}
                onClick={() =>
                  !this.state.joined &&
                  this.handlejoinPromotionClick(
                    this.state.details.id,
                    this.state.details.promotionType
                  )
                }
              >
                {i18n.t("promotion.joinPromo")}
              </PromoDetailJoinButton>
            </PromoDetailFooterContainer>
            {/* <PromoDetailImage
              img={(() => {
                if (this.state.details.localization !== null) {
                  if (
                    this.state.details.localization.desktopBanner &&
                    this.state.details.localization.desktopBanner !== null
                  ) {
                    return this.state.details.localization.desktopBanner;
                  } else {
                    return this.state.details.desktopBanner;
                  }
                } else {
                  return this.state.details.desktopBanner;
                }
              })()}
            ></PromoDetailImage>
            <EventTitle>{i18n.t("promotion.promoTarget")}：</EventTitle>
            <EventText>
              {this.state.details.vipLevels.map((a, index) => {
                return (
                  <span key={index}>
                    VIP{a}
                    {index < this.state.details.vipLevels.length - 1 && ", "}
                  </span>
                );
              })}
            </EventText>
            <EventTitle>{i18n.t("promotion.promoDate")}：</EventTitle>
            <EventText>
              {moment(this.state.details.from).format("YYYY/MM/DD HH:mm:ss")}
              {" - "}
              {moment(this.state.details.to).format("YYYY/MM/DD HH:mm:ss")}
            </EventText>
            <EventText>
              <PromoDesc
                dangerouslySetInnerHTML={{
                  __html:
                    "<div >" +
                    (() => {
                      if (
                        this.state.details.localization !== null &&
                        this.state.details.localization.content &&
                        this.state.details.localization.content !== null
                      ) {
                        return this.state.details.localization.content;
                      } else {
                        return this.state.details.content;
                      }
                    })() +
                    "</div>",
                }}
              ></PromoDesc>
              {this.state.term !== "" && (
                <TNCContainer onClick={this.handleShowDialog}>
                  {i18n.t("common.termsAndCondition")}
                </TNCContainer>
              )}
            </EventText>
            <Grid container justify="center">
              <PromoButtonContainer
                container
                alignItems="center"
                justify="center"
                md={3}
                disableTheButton={this.state.joined}
                onClick={() =>
                  !this.state.joined &&
                  this.handlejoinPromotionClick(
                    this.state.details.id,
                    this.state.details.promotionType
                  )
                }
              >
                <PromoButtonText item>
                  {i18n.t("promotion.joinPromo")}
                </PromoButtonText>
              </PromoButtonContainer>
            </Grid> */}
          </PromoDetailContainer>
        </MContainer>
        <StyledDialog
          open={this.state.openDialog}
          onClose={this.handleCloseDialog}
        >
          <DialogContainer>
            <CloseIconContainer
              viewBox="4 4 16 16"
              onClick={this.handleCloseDialog}
            ></CloseIconContainer>
            <div className="clear"></div>
            <TitleContainer>
              {i18n.t("common.termsAndCondition")}
            </TitleContainer>
            <DialogContent
              dangerouslySetInnerHTML={{
                __html: "<div >" + this.state.term + "</div>",
              }}
            ></DialogContent>
          </DialogContainer>
        </StyledDialog>
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
  };
};
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(withSnackbar(PromotionDetails))
);
