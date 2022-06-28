import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import IconDepositRedPNG from "../../../../assets/images/icon-deposit.png";

import { walletAction } from "../../../../api-services/actions/walletAction";
import { WalletService } from "../../../../api-services/services/WalletService";
import { generalAction } from "../../../../api-services/actions/generalAction";
import { RESET_WALLETRESULT } from "../../../../api-services/constant/actionType";
import { withRouter } from "react-router-dom";

import NameVerification from "../../Share/NameVerification";
import Loading from "../../../../components/App/Loading";

import UnderConstructionPNG from "../../../../assets/images/underconstruction.png";

import { withSnackbar } from "notistack";

import Step2Form from "./Step2Form";

import Success from "./Success";
import i18n from "../../../../utils/i18n";
import ErrorSwitcher from "../../../../utils/ErrorSwitcher";
import NewStepOne from "./NewStep1";
import NewStepOneHKJP from "./NewStep1HKJP";
import NewStepTwoHKJP from "./NewStep2HKJP";
import DepositTypeSelection from "./DepositTypeSelection";
import config from "../../../../config/config";
import PopupAnnouncement from "../../Home/PopupAnnouncement";

const Container = styled.div`
  padding: 20px 28px;
  box-sizing: border-box

  width: 100%;
  min-height: 611px;

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

const Wrap = styled.div`
  //width: 935px;

  position: relative;
`;

const SplitLine = styled.div`
  width: 100%;
  height: 1px;
  background-color: #e1dfdf;
  margin: 20px 0;
`;

const InnerWrap = styled.div`
  width: 100%;
  padding: 25px;
  margin-top: 14px;
  position: relative;
  background-color: #f7f7f7;
  min-height: 630px;
  border-radius: 10px;
`;
const UnderConstructionWrap = styled.div`
  width: 935px;
  height: 100%;

  background: url(${UnderConstructionPNG}) no-repeat center 50px #fff;
  position: absolute;
  top: 0;
`;
const DescLabel = styled.div`
  margin: 330px auto 0 auto;
  text-align: center;
`;

const NameVerificationWrap = styled.div`
  width: 935px;
  min-height: 532px;
  margin-top: 4px;
  box-sizing: border-box;
  background-color: #f7f7f7;
  padding: 25px;
  position: relative;
`;

class Deposit extends Component {
  constructor(props) {
    super(props);

    this.initialState = {
      selectedPaymentIndex: 0,
      selectedChannelIndex: 0,
      selectedMethodIndex: 0,
      loading: false,
      depositPromotion: this.props.match.params.promotionid,
      amount: "",
      step: 0,
      exchangeRate: { buyprice: 0, sellprice: 0 },
      files: [],
      //to handle access via URL
      paymentId: this.props.match.params.paymentId,
      depositDetail: "",
      channelname: "",
      methodcode: "",
      bankaccount: "",
      paymenturl: "",
      openAnnouncement: config.features.DepositNotification,
      playerNote: "",
    };
    this.state = {
      ...this.initialState,
      name: "",
      account: "",
    };
  }

  componentDidMount() {
    localStorage.removeItem("depositResult");
    this.props.getDepositMethod();
    this.props.getPromotion();
    
    window.addEventListener("storage", this.handStorageMsg, true);
    if (this.state.paymentId) {
      WalletService.PerformGetManualDepositDetail(this.state.paymentId).then(
        (e) => {
          if (e.IsSuccess) {
            this.setState({
              ...this.state,
              amount: e.data.amount,
              step: 2,
              depositResult: e.data,
              loading: false,
            });
          }
        }
      );
    }
    this.countDownInterval = setInterval(() => {
      this.props.getDepositMethod(); // call api every 30 mins
    }, 30 * 60 * 1000);
  }

  componentDidUpdate(preProps, preState) {
    if (config.features.Deposit_AutofillFirstCard) {
      if (preProps.wallet !== this.props.wallet) {
        this.setState({
          account:
            preState.account === ""
              ? this.props.wallet.bankCardList.length > 0
                ? this.props.wallet.bankCardList[0].detail.bankAccount ||
                  this.props.wallet.bankCardList[0].detail.address ||
                  this.props.wallet.bankCardList[0].detail.phone
                : ""
              : preState.account,
          name:
            preState.account === ""
              ? this.props.account.info.member_name !== ""
                ? this.props.account.info.member_name
                : ""
              : preState.name,
        });
      }
    }

    if (
      preProps.wallet.depositResult != this.props.wallet.depositResult &&
      this.props.wallet.depositResult !== null
    ) {
      if (this.props.wallet.depositResult.IsSuccess) {
        const response = this.props.wallet.depositResult;
        var payment = this.props.wallet.depositTypeList[
          this.state.selectedPaymentIndex
        ];
        if (config.features.Deposit_DualPage) {
          this.setState({
            ...this.state,
            step: 2,
            depositResult: response,
            loading: false,
          });
        } else {
          let url = "";
          if (payment.paymentcode.toUpperCase() === "MANUAL") {
            if (config.features.Deposit_UploadRequired) {
              this.props.doUploadDepositProof(
                response.data,
                this.state.files[0]
              );
              this.setState({
                ...this.state,
                loading: false,
                depositResult: response,
              });
            } else {
              if(this.state.files.length>0)
              {
                this.props.doUploadDepositProof(response.data, this.state.files[0]);
              }
              this.setState({
                ...this.state,
                step: 3,
                loading: false,
                depositResult: response,
              });
            }
          } else {
            this.setState({
              ...this.state,
              step: 3,
              loading: false,
              depositResult: response,
            });
            if (payment.paymentcode.toUpperCase() === "HELP2PAY") {
              url =
                config.baseUrl.replace("/api/", "") + response.data.paymenturl;
            }
            if (url !== "") {
              window.open(url, "_blank");
            } else {
              window.open(response.data.paymenturl, "_blank");
            }
          }
        }
      } else {
        this.props.enqueueSnackbar(
          ErrorSwitcher.getTranslation(this.props.wallet.depositResult.info),
          {
            variant: "error",
          }
        );

        this.setState({ ...this.state, loading: false });
      }
    }
    if (
      preProps.wallet.depositUploadResult !=
        this.props.wallet.depositUploadResult &&
      this.props.wallet.depositUploadResult !== null
    ) {
      if (this.props.wallet.depositUploadResult.IsSuccess) {
        this.setState({
          ...this.state,
          step: 4,
          loading: false,
        });
      } else {
        this.props.enqueueSnackbar(
          ErrorSwitcher.getTranslation(
            this.props.wallet.depositUploadResult.info
          ),
          {
            variant: "error",
          }
        );

        this.setState({ ...this.state, loading: false });
      }
    }
    if (
      preState.selectedPaymentIndex !== this.state.selectedPaymentIndex ||
      preState.selectedMethodIndex !== this.state.selectedMethodIndex ||
      preState.selectedChannelIndex !== this.state.selectedChannelIndex
    ) {
      if (
        this.props.wallet.depositTypeList[this.state.selectedPaymentIndex]
          .method[this.state.selectedMethodIndex].methodcode === "Crypto"
      ) {
        if (
          this.props.wallet.depositTypeList[this.state.selectedPaymentIndex]
            .paymentcode === "LeePay"
        ) {
          WalletService.GetLeePayExchangeRate(
            this.props.wallet.depositTypeList[this.state.selectedPaymentIndex]
              .method[this.state.selectedMethodIndex].channel[
              this.state.selectedChannelIndex
            ].id
          ).then((response) => {
            if (response.IsSuccess) {
              this.setState({ ...this.state, exchangeRate: response.data });
            } else {
              this.setState({
                ...this.state,
                exchangeRate: this.initialState.exchangeRate,
              });
            }
          });
        } else {
          WalletService.GetUmPayExchangeRate(
            this.props.wallet.depositTypeList[this.state.selectedPaymentIndex]
              .method[this.state.selectedMethodIndex].channel[
              this.state.selectedChannelIndex
            ].id
          ).then((response) => {
            if (response.IsSuccess) {
              this.setState({
                ...this.state,
                exchangeRate: response.data.rate,
              });
            } else {
              this.setState({
                ...this.state,
                exchangeRate: this.initialState.exchangeRate,
              });
            }
          });
        }
      } else {
        this.setState({
          ...this.state,
          exchangeRate: this.initialState.exchangeRate,
        });
      }
    }
  }

  componentWillUnmount() {
    clearInterval(this.countDownInterval);
    window.removeEventListener("storage", this.handStorageMsg, true); // Succeeds
    localStorage.removeItem("depositResult");
  }
  handStorageMsg = (ev) => {
    if (ev.key === "depositResult" && ev.newValue) {
      var depositResult = JSON.parse(ev.newValue);

      if (depositResult !== null && depositResult.IsSuccess) {
        var payment = this.props.wallet.depositTypeList[
          this.state.selectedPaymentIndex
        ];
        // var paymenturl = "";
        // if (payment.paymentcode.toUpperCase() !== "MANUAL") {
        //   paymenturl = response.data.paymenturl;
        //   window.open(paymenturl, "_blank");
        // }

        this.setState({
          ...this.state,
          step: payment.paymentcode.toUpperCase() === "MANUAL" ? 2 : 3,
          depositResult: depositResult,
          loading: false,
        });
      } else {
        this.props.enqueueSnackbar(
          ErrorSwitcher.getTranslation(depositResult.info),
          {
            variant: "error",
          }
        );

        this.setState({
          ...this.state,
          loading: false,
        });
      }
    }
  };
  handleTabClick = (item, index) => {
    if (this.state.step === 0) {
      this.setState({
        ...this.state,
        selectedPaymentIndex: index,
        amount: "",
        // name: "",
        //: "",
        depositPromotion: "",
        selectedChannelIndex: 0,
        selectedMethodIndex: 0,
        step: 1,
      });
    }
  };
  handleChannelChange = (e) => {
    //var channel = method.channel[this.state.selectedChannelIndex];

    this.setState({
      ...this.state,
      amount: "",
      selectedChannelIndex: e.target.value,
    });
  };
  handleMethodChange = (e) => {
    this.setState({
      ...this.state,
      amount: "",
      selectedMethodIndex: e.target.value,
      selectedChannelIndex: 0,
    });
  };

  handleNextClick = (e) => {
    this.setState({ ...this.state, loading: true });

    var payment = this.props.wallet.depositTypeList[
      this.state.selectedPaymentIndex
    ];
    var method = payment.method[this.state.selectedMethodIndex];

    var channel = method.channel[this.state.selectedChannelIndex];

    const depositMethodSwitcher = (method) => {
      switch (method) {
        case "banktransfer":
          return "bank";
        case "crypto":
          return "crypto";
        case "thirdparty":
          return "thirdparty";
        default:
          return "bank";
      }
    };

    if (payment.paymentcode.toUpperCase() === "MANUAL") {
      // handle manual deposit
      if (method.methodcode === "BankTransfer") {
        this.props.doBankDeposit(
          this.state.name,
          this.state.account,
          this.state.amount.replace(/,/g, ""),
          channel.id,
          this.state.depositPromotion
        );
      } else if (method.methodcode === "FPS") {
        if (config.features.Deposit_FPSWithName) {
          this.props.doFPSDepositWithName(
            this.state.name,
            this.state.account,
            this.state.amount.replace(/,/g, ""),
            channel.id,
            this.state.depositPromotion
          );
        } else {
          this.props.doFPSDeposit(
            this.state.account,
            this.state.amount.replace(/,/g, ""),
            channel.id,
            this.state.depositPromotion
          );
        }
      } else if (method.methodcode === "ThirdParty") {
        this.props.doThirdPartyDeposit(
          this.state.amount.replace(/,/g, ""),
          channel.id,
          this.state.depositPromotion
        );
      } else if (method.methodcode === "Usdt") {
        this.props.doUsdtDeposit(
          this.state.amount.replace(/,/g, ""),
          channel.id,
          this.state.depositPromotion
        );
      } else if (method.methodcode === "Pulsa") {
        this.props.doPulsaDeposit(
          this.state.amount.replace(/,/g, ""),
          channel.id,
          this.state.depositPromotion,
          null,
          config.features.Deposit_Withdrawal_PlayerNote
            ? this.state.playerNote
            : null
        );
      } else if (method.methodcode === "EWallet") {
        this.props.doEWalletDeposit(
          this.state.amount.replace(/,/g, ""),
          channel.id,
          this.state.depositPromotion,
          null,
          config.features.Deposit_Withdrawal_PlayerNote
            ? this.state.playerNote
            : null
        );
      }
    } else {
      this.props.performDeposit(
        this.state.amount.replace(/,/g, ""),
        channel.id,
        this.state.depositPromotion,
        payment.paymentcode,
        depositMethodSwitcher(method.methodcode.toLowerCase())
      );
      //   if (method.methodcode === "Crypto") {
      //     this.props.doCryptoDeposit(
      //       this.state.amount.replace(/,/g, ""),
      //       channel.id,
      //       this.state.depositPromotion,
      //       payment.paymentcode
      //     );
      //   } else {
      //     this.props.doBankDeposit2(
      //       this.state.amount.replace(/,/g, ""),
      //       channel.id,
      //       this.state.depositPromotion,
      //       payment.paymentcode
      //     );
      //   }
    }
  };

  // handleUploadClick = (file) => {
  //   if (!file) {
  //     this.props.enqueueSnackbar(i18n.t("deposit.msgPlsSelectFile"), {
  //       variant: "error",
  //     });
  //     return;
  //   }
  //   // this.props.resetDeposit();
  //   this.props.doDepositUpload(
  //     file,
  //     "image",
  //     this.props.wallet.depositResult.data.order_id
  //   );
  // };

  //newly declared function - START

  handleChangeManualDepositMethod = (value) => {
    this.setState({
      ...this.state,
      methodCode: value,
    });
  };

  handleChangePaymentOption = (value) => {
    this.setState({
      ...this.state,
      paymentId: value,
    });
  };
  handleDepositPromotionChange = (e) => {
    this.setState({
      ...this.state,
      depositPromotion: e.target.value,
    });
  };
  performSendData = () => {
    // TGSWalletService.PerformManualDeposit(
    //   this.state.amount,
    //   this.state.account,
    //   this.state.paymentId
    // ).then((result) => {
    //   if (result.IsSuccess) {
    //     this.setState({
    //       manualDepositId: result.data,
    //     });
    //     TGSWalletService.PerformGetManualDepositDetail(
    //       this.state.manualDepositId
    //     ).then((result) => {
    //       this.setState({
    //         ...this.state,
    //         manualDepositDetail: result.data,
    //         newStep: 2,
    //       });
    //     });
    //   }
    // });
    //this.props.performManualDeposit(
    //  this.state.amount,
    //  this.state.account,
    //  this.state.paymentId
    //);
  };

  performUploadImage = (file) => {
    this.props.doUploadDepositProof(
      this.state.paymentId
        ? this.state.paymentId
        : this.state.depositResult
        ? this.state.depositResult.data
        : "",
      file
    );
  };
  handleAmountChange = (e) => {
    var max = this.props.wallet.depositTypeList[this.state.selectedPaymentIndex]
      .method[this.state.selectedMethodIndex].channel[
      this.state.selectedChannelIndex
    ].transferlimit.to;

    this.setState({
      ...this.state,
      amount:
        parseInt(e.target.value.replace(/,/g, "")) > max ? max : e.target.value,
    });
  };
  handleNameChange = (e) => {
    this.setState({
      ...this.state,
      name: e.target.value,
    });
  };

  handleAccountChange = (e) => {
    this.setState({
      ...this.state,
      account: e.target.value,
    });
  };
  handleFileChange = (e) => {
    var files = e.target.files;
    var fileName = e.target.value.toLowerCase();
    if (files.length > 0) {
      if (
        !fileName.endsWith(".jpg") &&
        !fileName.endsWith(".jpeg") &&
        !fileName.endsWith(".png") &&
        !fileName.endsWith(".tiff")
      ) {
        this.props.enqueueSnackbar(i18n.t("deposit.msgInvalidFileType"), {
          variant: "error",
        });
        e.target.value = null;
        return false;
      }
      const fileSize = Math.round(files[0].size / 1024);
      if (fileSize > 2048) {
        this.props.enqueueSnackbar(i18n.t("deposit.msgInvalidFileSize"), {
          variant: "error",
        });
        e.target.value = null;
      } else {
        this.setState({ ...this.state, files: files });
      }
    }
  };
  handlePlayerNoteChange = (e) => {
    this.setState({
      ...this.state,
      playerNote: e.target.value,
    });
  };
  handleRestartClick = (e) => {
    this.setState(this.initialState);
    this.props.resetDeposit();
  };
  switchStep = (steps) => {
    switch (steps) {
      case 0:
        return (
          <DepositTypeSelection
            depositTypeList={this.props.wallet.depositTypeList}
            onhandleTabClick={this.handleTabClick}
            selectedPaymentIndex={this.state.selectedPaymentIndex}
          ></DepositTypeSelection>
        );
      case 1:
        if (config.features.Deposit_DualPage) {
          return (
            <NewStepOneHKJP
              amount={this.state.amount}
              onAmountChange={this.handleAmountChange}
              name={this.state.name}
              accountList={this.props.wallet.bankCardList}
              account={this.state.account}
              onNameChange={this.handleNameChange}
              exchangeRate={this.state.exchangeRate}
              onAccountChange={this.handleAccountChange}
              selectedChannelIndex={this.state.selectedChannelIndex}
              onChannelChange={this.handleChannelChange}
              selectedMethodIndex={this.state.selectedMethodIndex}
              onMethodChange={this.handleMethodChange}
              selectedPaymentIndex={this.state.selectedPaymentIndex}
              promotionList={this.props.general.promotionList.items.filter(
                (item) =>
                  [
                    "FirstDeposit",
                    "DailySecondDeposit",
                    "DailyFirstDeposit",
                  ].indexOf(item.promotionType) >= 0
              )}
              depositPromotion={this.state.depositPromotion}
              handleDepositPromotionChange={this.handleDepositPromotionChange}
              paymentType={
                this.props.wallet.depositTypeList.length > 0
                  ? this.props.wallet.depositTypeList[
                      this.state.selectedPaymentIndex
                    ]
                  : null
              }
              playerNote={this.state.playerNote}
              onPlayerNoteChange={this.handlePlayerNoteChange}
              onNextClick={this.handleNextClick}
              onDepositCancelClick={this.handleRestartClick}
            />
          );
        } else {
          return (
            <NewStepOne
              amount={this.state.amount}
              onAmountChange={this.handleAmountChange}
              accountList={this.props.wallet.bankCardList}
              name={this.state.name}
              onNameChange={this.handleNameChange}
              account={this.state.account}
              onAccountChange={this.handleAccountChange}
              files={this.state.files}
              exchangeRate={this.state.exchangeRate}
              selectedChannelIndex={this.state.selectedChannelIndex}
              onChannelChange={this.handleChannelChange}
              selectedMethodIndex={this.state.selectedMethodIndex}
              onMethodChange={this.handleMethodChange}
              selectedPaymentIndex={this.state.selectedPaymentIndex}
              onFileChange={this.handleFileChange}
              promotionList={this.props.general.promotionList.items.filter(
                (item) =>
                  [
                    "FirstDeposit",
                    "DailySecondDeposit",
                    "DailyFirstDeposit",
                  ].indexOf(item.promotionType) >= 0
              )}
              depositPromotion={this.state.depositPromotion}
              handleDepositPromotionChange={this.handleDepositPromotionChange}
              paymentType={
                this.props.wallet.depositTypeList.length > 0
                  ? this.props.wallet.depositTypeList[
                      this.state.selectedPaymentIndex
                    ]
                  : null
              }
              playerNote={this.state.playerNote}
              onPlayerNoteChange={this.handlePlayerNoteChange}
              onNextClick={this.handleNextClick}
              onDepositCancelClick={this.handleRestartClick}
            />
          );
        }

      case 2:
        return (
          <NewStepTwoHKJP
            extended={
              this.props.wallet.depositTypeList[this.state.selectedPaymentIndex]
                .method[this.state.selectedMethodIndex].channel[
                this.state.selectedChannelIndex
              ].extended
            }
            methodcode={
              this.props.wallet.depositTypeList[this.state.selectedPaymentIndex]
                .method[this.state.selectedMethodIndex].methodcode
            }
            channelname={
              this.props.wallet.depositTypeList[this.state.selectedPaymentIndex]
                .method[this.state.selectedMethodIndex].channel[
                this.state.selectedChannelIndex
              ].channelname
            }
            depositResult={this.state.depositResult}
            amount={this.state.amount}
            performUploadImage={this.performUploadImage}
            handleRestartClick={this.handleRestartClick}
            paymentId={this.state.paymentId}
          />
        );
      case 3:
        return (
          <Step2Form
            isCrypto={
              this.props.wallet.depositTypeList[this.state.selectedPaymentIndex]
                .method[this.state.selectedMethodIndex].methodcode === "Crypto"
            }
            depositType={
              this.props.wallet.depositTypeList[this.state.selectedPaymentIndex]
                .paymentcode
            }
            methodcode={
              this.props.wallet.depositTypeList[this.state.selectedPaymentIndex]
                .method[this.state.selectedMethodIndex].methodcode
            }
            channel={
              this.props.wallet.depositTypeList[this.state.selectedPaymentIndex]
                .method[this.state.selectedMethodIndex].channel[
                this.state.selectedChannelIndex
              ]
            }
            paymenturl={this.state.paymenturl}
            depositResult={this.state.depositResult}
            amount={this.state.amount}
            handleRestartClick={this.handleRestartClick}
          ></Step2Form>
        );
      case 4:
        return <Success handleRestartClick={this.handleRestartClick}></Success>;
      case 5:
        return (
          <NewStepTwoHKJP
            methodcode={this.state.methodcode}
            channelname={this.state.channelname}
            depositDetail={this.state.depositDetail}
            bankaccount={this.state.bankaccount}
            paymentId={this.state.paymentId}
            depositResult={this.state.depositResult}
            amount={this.state.amount}
            performUploadImage={this.performUploadImage}
            handleRestartClick={this.handleRestartClick}
          />
        );
      default:
        return null;
    }
  };

  brandSwitcher = (brand) => {
    switch (brand) {
      case "GMO":
        return "GMO";
      default:
        return "";
    }
  };

  //newly declared function - END

  render() {
    return (
      <Container>
        {(() => {
          if (
            config.features.DepositNotification &&
            this.props.ui.deposits &&
            this.props.ui.deposits.length > 0
          ) {
            var row = this.props.ui.deposits[0];

            return (
              <PopupAnnouncement
                open={this.state.openAnnouncement}
                onClose={() => {
                  this.setState({ ...this.state, openAnnouncement: false });
                }}
                text={
                  row.localization !== null && row.localization.content
                    ? row.localization.content
                    : row.content
                }
                header={
                  row.localization !== null && row.localization.subject
                    ? row.localization.subject
                    : row.subject
                }
              ></PopupAnnouncement>
            );
          }
        })()}
        <Header>
          <Title>
            <h3>{i18n.t("deposit.title")}</h3>
          </Title>
        </Header>

        <Wrap>
          {(() => {
            return (
              <>
                <InnerWrap>
                  {(() => {
                    if (this.props.wallet.depositTypeList.length <= 0)
                      return null;
                    return this.switchStep(this.state.step);
                    //   if (this.state.step === 1) {
                    //     return (
                    //       <Step1
                    //         username={this.state.username}
                    //         selectedType={this.state.selectedType}
                    //         selectedChannel={this.state.selectedChannel}
                    //         depositAmount={this.state.depositAmount}
                    //         handleDepositClick={this.handleDepositClick}
                    //         handleDepositAmountChange={
                    //           this.handleDepositAmountChange
                    //         }
                    //         handleUsernameChange={this.handleUsernameChange}
                    //         handleTunnelClick={this.handleTunnelClick}
                    //       ></Step1>
                    //     );
                    //   } else if (this.state.step === 2) {
                    //     return (
                    //       <Step2Form
                    //         depositResult={this.props.wallet.depositResult}
                    //         handleDepositConfirmClick={
                    //           this.handleDepositConfirmClick
                    //         }
                    //         handleDepositCancelClick={
                    //           this.handleDepositCancelClick
                    //         }
                    //       ></Step2Form>
                    //     );
                    //   } else if (this.state.step === 3) {
                    //     return (
                    //       <Step2QR
                    //         bankInfo={this.bankInfo}
                    //         amount={this.state.depositAmount}
                    //         selectedType={this.state.selectedType}
                    //         selectedChannel={this.state.selectedChannel}
                    //         depositResult={this.props.wallet.depositResult}
                    //         handleUploadClick={this.handleUploadClick}
                    //         handleDepositCancelClick={
                    //           this.handleDepositCancelClick
                    //         }
                    //       ></Step2QR>
                    //     );
                    //   } else if (this.state.step === 4) {
                    //     return (
                    //       <Success
                    //         handleConfirmClick={() => {
                    //           this.setState({
                    //             ...this.initialState,
                    //             selectedType: this.props.wallet
                    //               .depositTypeList[0],
                    //             selectedChannel: this.props.wallet
                    //               .depositTypeList[0].channel[0],
                    //           });
                    //         }}
                    //       ></Success>
                    //     );
                    //   }
                  })()}
                </InnerWrap>
              </>
            );
          })()}

          <Loading
            show={this.state.loading || this.props.wallet.depositLoading}
          ></Loading>
          <UnderConstructionWrap
            style={
              this.state.isMaintenance
                ? { display: "block" }
                : { display: "none" }
            }
          >
            <DescLabel>{i18n.t("deposit.msgMaintenance")}</DescLabel>
          </UnderConstructionWrap>
        </Wrap>
        <form id="form" target="_blank" method="post">
          <input type="hidden" name="cid" id="cid"></input>
          <input type="hidden" name="oid" id="oid"></input>
        </form>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    wallet: state.wallet,
    account: state.account,
    general: state.general,
    ui: state.ui,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    doBankDeposit: (
      name,
      account,
      amount,
      paymentid,
      promotionid,
      banktype
    ) => {
      dispatch(
        walletAction.doBankDeposit(
          name,
          account,
          amount,
          paymentid,
          promotionid,
          banktype
        )
      );
    },
    doFPSDeposit: (account, amount, paymentid, promotionid, banktype) => {
      dispatch(
        walletAction.doFPSDeposit(
          account,
          amount,
          paymentid,
          promotionid,
          banktype
        )
      );
    },
    doFPSDepositWithName: (
      name,
      account,
      amount,
      paymentid,
      promotionid,
      banktype
    ) => {
      dispatch(
        walletAction.doFPSDepositWithName(
          name,
          account,
          amount,
          paymentid,
          promotionid,
          banktype
        )
      );
    },
    doThirdPartyDeposit: (amount, paymentid, promotionid, banktype) => {
      dispatch(
        walletAction.doThirdPartyDeposit(
          amount,
          paymentid,
          promotionid,
          banktype
        )
      );
    },
    doUsdtDeposit: (amount, paymentid, promotionid, banktype) => {
      dispatch(
        walletAction.doUsdtDeposit(amount, paymentid, promotionid, banktype)
      );
    },
    doPulsaDeposit: (amount, paymentid, promotionid, banktype, note) => {
      dispatch(
        walletAction.doPulsaDeposit(amount, paymentid, promotionid, banktype, note)
      );
    },
    doEWalletDeposit: (amount, paymentid, promotionid, banktype, note) => {
      dispatch(
        walletAction.doEWalletDeposit(amount, paymentid, promotionid, banktype, note)
      );
    },
    doBankDeposit2: (amount, payment_id, promotionid, paymentcode) => {
      dispatch(
        walletAction.doBankDeposit2(
          amount,
          payment_id,
          promotionid,
          paymentcode
        )
      );
    },
    doCryptoDeposit: (amount, payment_id, promotionid, paymentcode) => {
      dispatch(
        walletAction.doCryptoDeposit(
          amount,
          payment_id,
          promotionid,
          paymentcode
        )
      );
    },
    performDeposit: (amount, payment_id, promotionid, paymentcode, type) => {
      dispatch(
        walletAction.performDeposit(
          amount,
          payment_id,
          promotionid,
          paymentcode,
          type
        )
      );
    },
    getBalanceList: () => dispatch(walletAction.getBalanceList()),
    getPlayerPromotionList: (language) =>
      dispatch(
        generalAction.getPlayerPromotionList(language, 1, 99, true, "", true)
      ),
    doUploadDepositProof: (id, file) =>
      dispatch(walletAction.doUploadDepositProof(id, file)),
    resetDeposit: () =>
      dispatch({
        type: RESET_WALLETRESULT,
      }),
    getDepositMethod: () => dispatch(walletAction.getDepositMethod()),
    getPromotion: () => dispatch(generalAction.getPromotion()),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withSnackbar(Deposit)));
