import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { accountAction } from "../../../../api-services/actions/accountAction";
import { walletAction } from "../../../../api-services/actions/walletAction";
import {
  SHOWING_DIALOG,
  RESET_WALLETRESULT,
} from "../../../../api-services/constant/actionType";
import ErrorSwitcher from "../../../../utils/ErrorSwitcher";

import ManageCard from "./ManageCard";
import AddCard from "./AddCard";
import AddCardSuccess from "./AddCardSuccess";
import i18n from "../../../../utils/i18n";
import config from "../../../../config/config";

const Container = styled.div`
  padding: 20px 28px;
  box-sizing: border-box
  //background-color: #eaeaea;
  width: 100%;
  min-height: 611px;
  justify-content: space-between;
`;

const Header = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #ccc;
  height: 38px;
  margin-bottom: 10px;
  padding: 0 10px 10px;
`;
const Title = styled.div`
  align-items: baseline;
  display: flex;
  & h3 {
    color: #676767;
    font-size: 24px;
    font-weight: 400;
  }
`;

const Body = styled.div``;

class CardManagement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      bankCardList: [],
      defaultCard: 0,
      addCard: {
        number: "",
        password: "",
      },
      isAddCardSuccess: false,
      displayView: 1,
      showMessagebox: false,
      messageboxText: "",
    };
  }

  async componentDidMount() {
    if (this.props.token) {
      if (!config.features.Register_CustomFlow_IDR) {
        if (this.props.wallet.bankCardList.length === 0)
          this.props.getBankCardList();
      } else if (
        config.features.Register_CustomFlow_IDR &&
        this.props.account.info.bankInfoAuthentication
      ) {
        if (this.props.wallet.bankCardList.length === 0)
          this.props.getBankCardList();
      }
      if (this.props.wallet.withdrawalList.length === 0)
        this.props.getWithdrawalChannel();
      if (this.props.match.params.type === "edit") {
        this.setState({ ...this.state, displayView: 1 });
      } else if (this.props.match.params.type === "add") {
        this.setState({ ...this.state, displayView: 2 });
      }
    }
  }
  componentDidUpdate(preProps) {
    if (this.props.token !== null && preProps.token !== this.props.token) {
      if (!config.features.Register_CustomFlow_IDR) {
        if (this.props.wallet.bankCardList.length === 0)
          this.props.getBankCardList();
      } else if (
        config.features.Register_CustomFlow_IDR &&
        this.props.account.info.bankInfoAuthentication
      ) {
        if (this.props.wallet.bankCardList.length === 0)
          this.props.getBankCardList();
      }
      if (this.props.wallet.withdrawalList.length === 0)
        this.props.getWithdrawalChannel();
      if (this.props.match.params.type === "edit") {
        this.setState({ ...this.state, displayView: 1 });
      } else if (this.props.match.params.type === "add") {
        this.setState({ ...this.state, displayView: 2 });
      }
    }
    if (
      !preProps.account.info.bankInfoAuthentication &&
      this.props.account.info.bankInfoAuthentication &&
      this.props.token &&
      this.props.wallet.addBankCardResult === null
    ) {
      this.props.resetResult();
      this.props.getBankCardList().then(() => {
        this.setState({
          ...this.state,
          loading: false,
          isAddCardSuccess: true,
          displayView: 3,
        });
      });
    }
    if (
      preProps.wallet.deleteBankCardResult !==
        this.props.wallet.deleteBankCardResult &&
      this.props.wallet.deleteBankCardResult !== null
    ) {
      if (this.props.wallet.deleteBankCardResult.IsSuccess) {
        this.props.getBankCardList();
      } else {
        this.props.enqueueSnackbar(
          ErrorSwitcher.getTranslation(
            this.props.wallet.deleteBankCardResult.info
          ),
          {
            variant: "error",
          }
        );
      }
      this.props.resetResult();
      this.handleBacktoProfile();
    }
    if (
      preProps.wallet.addBankCardResult !==
        this.props.wallet.addBankCardResult &&
      this.props.wallet.addBankCardResult !== null
    ) {
      if (this.props.wallet.addBankCardResult.IsSuccess) {
        this.props.resetResult();
        this.props.getBankCardList().then(() => {
          this.setState({
            ...this.state,
            loading: false,
            isAddCardSuccess: true,
            displayView: 3,
          });
        });
      } else {
        this.props.enqueueSnackbar(
          ErrorSwitcher.getTranslation(
            this.props.wallet.addBankCardResult.info
          ),
          {
            variant: "error",
          }
        );
      }
    }
  }

  handleBacktoProfile = () => {
    this.props.history.push("/" + i18n.language + "/account/profile");
  };

  handleBindCardClick = () => {
    this.setState({ ...this.state, isAddCardSuccess: false, displayView: 2 });
  };

  handleAddCardNextClick = (channelid, bankType, detail) => {
    //clear url params
    window.history.pushState({}, null, "withdrawal");
    if (config.features.Register_CustomFlow_IDR) {
      this.props.initBankCard(channelid, bankType, detail).then((response) => {
        this.props.getAccountInfo();
      });
    } else {
      this.props.addBankCard(channelid, bankType, detail);
    }
  };

  performAddNewCard = (channelid, bankType, detail) => {
    window.history.pushState({}, null, "withdrawal");
    if (config.features.Register_CustomFlow_IDR) {
      this.props
        .newRegister("SetWithdrawBankInfo", {
          banktype: bankType,
          paymentchannelid: channelid,
          detail: detail,
        })
        .then((response) => {
          if (response.IsSuccess) {
            let setRealName = response.data.nextStepType === "SetRealName";
            if (setRealName) {
              this.props
                .newRegister("SetRealName", {
                  realname: detail.name || detail.eMoneyName || detail.username,
                })
                .then((response) => {
                  if (response.IsSuccess) {
                    this.props.getAccountInfo();
                  } else {
                    this.props.enqueueSnackbar(
                      ErrorSwitcher.getTranslation(response.info),
                      {
                        variant: "error",
                      }
                    );
                  }
                });
            } else {
              this.props.getAccountInfo();
            }
          } else {
            this.props.enqueueSnackbar(
              ErrorSwitcher.getTranslation(response.info),
              {
                variant: "error",
              }
            );
          }
        });
    } else {
      this.props.addBankCard(channelid, bankType, detail);
    }
  };

  handleDeleteCardClick = (id) => {
    if (config.features.ChangesNotAllowed) {
      this.props.enqueueSnackbar(i18n.t("card.toEdit"), {
        variant: "error",
      });
    } else {
      this.props.deleteBankCard(id);
    }
  };

  getCardDetail() {
    let cardDetail = {};
    let cardId = "";
    try {
      if (this.props.location.state !== null) {
        if (this.props.location.state.cardId !== undefined) {
          cardId = this.props.location.state.cardId;
          cardDetail = this.props.wallet.bankCardList.find(
            (item) => item.id === cardId
          );
        }
      }
    } catch (err) {}
    return cardDetail;
  }

  displaySwitcher = () => {
    switch (this.state.displayView) {
      case 1:
        return (
          <ManageCard
            cardDetail={this.getCardDetail()}
            onhandleBackClick={this.handleBacktoProfile}
            onhandleDeleteCardClick={this.handleDeleteCardClick}
          ></ManageCard>
        );
      case 2:
        return (
          <AddCard
            name={this.props.account.info.member_name}
            onhandleNextClick={this.performAddNewCard}
            withdrawalList={this.props.wallet.withdrawalList}
            onhandleBackClick={this.handleBacktoProfile}
            showBack={true}
            isDeposit={false}
          ></AddCard>
        );
      case 3:
        return (
          <AddCardSuccess
            onhandleBindCardClick={this.handleBindCardClick}
            onhandleBackClick={this.handleBacktoProfile}
            onhandleCSClick={this.handleCSClick}
            backButtonText={i18n.t("card.success.goProfile")}
            bankCardList={this.props.wallet.bankCardList}
            isDeposit={false}
          ></AddCardSuccess>
        );
      default:
        return null;
    }
  };

  render() {
    return (
      <Container>
        <Header>
          <Title>
            <h3>{i18n.t("card.title")}</h3>
          </Title>
        </Header>
        <Body>{this.displaySwitcher()}</Body>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.account.token,
    account: state.account,
    wallet: state.wallet,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getBalanceList: (token) => dispatch(walletAction.getBalanceList()),
    getBankCardList: () => dispatch(walletAction.getBankCardList()),
    deleteBankCard: (id) => dispatch(walletAction.deleteBankCard(id)),
    addBankCard: (channelid, bankType, detail) =>
      dispatch(walletAction.addBankCard(channelid, bankType, detail)),
    initBankCard: (channelid, bankType, detail) =>
      dispatch(walletAction.initBankCard(channelid, bankType, detail)),
    getWithdrawalChannel: () => dispatch(walletAction.getWithdrawalChannel()),
    resetResult: () =>
      dispatch({
        type: RESET_WALLETRESULT,
      }),
    getIDCardNo: () => dispatch(accountAction.getIDCardNo()),
    showDialog: (payload) => {
      dispatch({ type: SHOWING_DIALOG, payload });
    },
    getAccountInfo: () => dispatch(accountAction.getAccountInfo()),
    newRegister: (type, input) =>
      dispatch(accountAction.newRegister(type, input)),
  };
};
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CardManagement)
);
