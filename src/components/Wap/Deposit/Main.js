import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import Modal from "@material-ui/core/Dialog";
import Common from "../../../utils/Common";

import { withStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import "react-lazy-load-image-component/src/effects/blur.css";
import Textbox from "../../Wap/Share/Textbox";
import Button from "../../Wap/Share/Button";

import i18n from "../../../utils/i18n";

import config from "../../../config/config";

const CustomSelect = withStyles((theme) => ({
  root: {
    "&:focus": {
      border: "none",
      backgroundColor: "#fff",
    },
    "&:active": {
      border: "none",
      backgroundColor: "#fff",
    },
  },
  select: {
    padding: "18.5px 0px",
    "&:focus": {
      border: "none",
      backgroundColor: "#fff",
    },
    "&:active": {
      border: "none",
      backgroundColor: "#fff",
    },
    "&:disabled": {
      color: "#c3c3c3",
    },
  },
}))(Select);

const CustomCustomSelect = styled(CustomSelect)`
  font-size: 28px;
  height: 78px;
  border: none;
  .MuiSelect-root {
    color: black;
  }
`;

const CustomText = styled.div`
  width: 700px;

  display: flex;
  flex-direction: column;
  border-radius: 20px;
  padding: 40px 20px 0 20px;
  margin: 20px auto;
`;
const CustomImage = styled.img`
  display: block;
  margin-top: 10px;
  width: 200px;
  height: 200px;
`;
const CustomLabel = styled.div`
  font-size: 24px;
  font-weight: 600;
  margin-left: 3px;
  color: ${({ theme }) => theme.secondary};
  float: left;
`;
const CustomFormControl = withStyles((theme) => ({
  root: {
    margin: "10px 0 0 0",
    background: "white",
    padding: "16px 32px",
    borderRadius: "16px",
    height: "101px",
    border: "none",
    fontSize: "28px",
    "& fieldset": {
      border: "none",
    },
  },
}))(FormControl);

const LimitLabel = styled.span`
  color: #747474;
`;

const LimitAmount = styled.span`
  color: #c0252d;
`;
const TransferContainer = styled.div`
  margin-top: 10px;
`;
const TransferLabel = styled.div`
  color: #747474;
  font-size: 30px;
  float: left;
  font-weight: bold;
`;
const TransferValue = styled.div`
  color: #747474;
  font-size: 30px;
  float: left;
  margin-left: 10px;
`;
const UploadInput = styled.input`
  font-size: 30px;
  margin-top: 14px;
`;
const ExchangeRateContainer = styled.div`
  margin: 20px auto;
  font-size: 28px;
  padding: 0px 20px 20px 48px;
`;

const Remark = styled.div`
  font-size: 20px;
  padding: 0px 50px;
  color: ${({ theme }) => theme.secondary};
  opacity: 0.75;
`;
const QRCodeImg = styled.img`
  display: block;
  margin-top: 10px;
  width: 200px;
  height: 200px;
`;
const StyledModalPopup = withStyles((theme) => ({
  paper: {
    borderRadius: "50px",
    fontSize: "28px",
    color: "#666666",
    padding: "30px",
    width: "600px",
    maxWidth: "690px",

    display: "block",
  },
}))(Modal);
const DialoMessage = styled.div`
  font-size: 26px;
  margin: 20px 45px;
  color: #4a4a4a;
  line-height: 1.8em;
  text-align: center;
`;
const ButtonConfirm = styled.div`
  width: 250px;
  height: 90px;
  border-radius: 20px;

  font-size: 34px;

  text-align: center;

  padding-top: 24px;

  margin: 10px auto;
  background-image: linear-gradient(
    to top,
    ${({ theme }) => theme.primaryGradient},
    ${({ theme }) => theme.primary}
  );
  color: #ffffff;
`;
class Main extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}
  componentDidUpdate(preProps, preState) {}

  render() {
    return (
      <React.Fragment>
        <CustomText>
          <CustomLabel>{i18n.t("deposit.msgPlsSelectPayment")}</CustomLabel>
          <CustomFormControl variant="outlined">
            <CustomCustomSelect
              native
              id="customSelect"
              value={this.props.selectedMethodIndex}
              onChange={(e) => this.props.handleMethodChange(e)}
            >
              <option value={""} disabled>
                {i18n.t("deposit.msgPlsSelectPayment")}
              </option>
              {this.props.wallet.depositTypeList.length > 0 &&
                this.props.wallet.depositTypeList[
                  this.props.selectedPaymentIndex
                ].method.map((item, index) => {
                  return (
                    <option value={index}>{i18n.t(item.methodcode)}</option>
                  );
                })}
            </CustomCustomSelect>
          </CustomFormControl>
        </CustomText>
        <CustomText>
          <CustomLabel>{i18n.t("deposit.msgPlsSelectMethod")}</CustomLabel>
          <CustomFormControl variant="outlined">
            <CustomCustomSelect
              native
              id="customSelect"
              value={this.props.selectedChannelIndex}
              onChange={(e) => this.props.handleChannelChange(e)}
            >
              {this.props.wallet.depositTypeList.length > 0 &&
                this.props.wallet.depositTypeList[
                  this.props.selectedPaymentIndex
                ].method[this.props.selectedMethodIndex].channel.map(
                  (item, index) => {
                    return <option value={index}>{item.channelname}</option>;
                  }
                )}
            </CustomCustomSelect>
          </CustomFormControl>
        </CustomText>
        {(() => {
          if (
            this.props.wallet.depositTypeList[
              this.props.selectedPaymentIndex
            ].paymentcode.toUpperCase() === "MANUAL"
          ) {
            var channelExtend =
              this.props.wallet.depositTypeList[this.props.selectedPaymentIndex]
                .method[this.props.selectedMethodIndex].channel[
                this.props.selectedChannelIndex
              ].extended;
            if (
              this.props.wallet.depositTypeList[
                this.props.selectedPaymentIndex
              ].method[
                this.props.selectedMethodIndex
              ].methodcode.toUpperCase() === "THIRDPARTY"
            ) {
              return (
                <CustomText>
                  <CustomLabel>{i18n.t("deposit.transferAccount")}</CustomLabel>
                  <QRCodeImg src={channelExtend.qrCodeFileUrl} />
                </CustomText>
              );
            } else {
              return (
                <CustomText>
                  <CustomLabel>{i18n.t("deposit.transferAccount")}</CustomLabel>
                  {channelExtend.logo && (
                    <CustomImage src={channelExtend.logo} />
                  )}
                  <TransferContainer>
                    <TransferLabel>{i18n.t("deposit.accName")}:</TransferLabel>
                    <TransferValue>{channelExtend.name}</TransferValue>
                  </TransferContainer>
                  <TransferContainer>
                    <TransferLabel>{i18n.t("deposit.cardNum")}:</TransferLabel>
                    <TransferValue>{channelExtend.bankAccount}</TransferValue>
                  </TransferContainer>
                </CustomText>
              );
            }
          }
        })()}
        {(() => {
          if (config.features.Deposit_ManualApplePayHideBankAcc) {
          } else {
            if (
              this.props.wallet.depositTypeList[
                this.props.selectedPaymentIndex
              ].paymentcode.toUpperCase() === "MANUAL" ||
              this.props.wallet.depositTypeList[
                this.props.selectedPaymentIndex
              ].paymentcode.toUpperCase() === "APPLEPAY"
            ) {
              return (
                <Textbox
                  style={{ margin: "20px auto 20px auto" }}
                  type={"text"}
                  placeholder={
                    config.features.Deposit_EnglishName
                      ? i18n.t("bet28.msgEnterBankAccountName")
                      : i18n.t("deposit.msgPlsEnterAccount")
                  }
                  label={
                    config.features.Deposit_EnglishName
                      ? i18n.t("bet28.BankAccountName")
                      : i18n.t("deposit.msgPlsEnterAccount")
                  }
                  value={this.props.account}
                  onChange={(e) => this.props.handleAccountChange(e)}
                ></Textbox>
              );
            }
          }
        })()}
        <Textbox
          style={{ margin: "20px auto 20px auto" }}
          value={this.props.amount}
          onChange={this.props.handleAmountChange}
          type={"number"}
          placeholder={
            i18n.t("deposit.msgPleaseEnter") +
            Common.formatNumberWithThousand(
              this.props.wallet.depositTypeList[this.props.selectedPaymentIndex]
                .method[this.props.selectedMethodIndex].channel[
                this.props.selectedChannelIndex
              ].transferlimit.from
            ) +
            "-" +
            Common.formatNumberWithThousand(
              this.props.wallet.depositTypeList[this.props.selectedPaymentIndex]
                .method[this.props.selectedMethodIndex].channel[
                this.props.selectedChannelIndex
              ].transferlimit.to
            ) +
            i18n.t("deposit.dollor")
          }
          label={i18n.t("deposit.depositAmount")}
        ></Textbox>
        {this.props.wallet.depositTypeList[
          this.props.selectedPaymentIndex
        ].paymentcode.toUpperCase() === "UMPAY" && (
          <Remark>{i18n.t("deposit.ppRemark")}</Remark>
        )}
        {(() => {
          if (
            this.props.wallet.depositTypeList[this.props.selectedPaymentIndex]
              .method[this.props.selectedMethodIndex].methodcode === "Crypto"
          ) {
            if (
              this.props.wallet.depositTypeList[this.props.selectedPaymentIndex]
                .paymentcode === "LeePay"
            ) {
              return (
                <ExchangeRateContainer style={{ marginTop: "4px" }}>
                  <LimitLabel>{i18n.t("deposit.exchangeRate")}: </LimitLabel>
                  <LimitAmount>{` ${this.props.exchangeRate.buyprice}`}</LimitAmount>
                  <LimitLabel style={{ marginLeft: "26px" }}>
                    {i18n.t("deposit.expectedPayment")}
                  </LimitLabel>{" "}
                  <LimitAmount>{` ${
                    isNaN(this.props.amount) === false
                      ? (
                          this.props.amount / this.props.exchangeRate.buyprice
                        ).toFixed(2)
                      : 0
                  }`}</LimitAmount>
                </ExchangeRateContainer>
              );
            } else {
              return Object.keys(this.props.exchangeRate).map((key) => {
                return Object.keys(this.props.exchangeRate[key]).map((key2) => {
                  if (key2 === "HKD") {
                    return (
                      <ExchangeRateContainer style={{ marginTop: "4px" }}>
                        <LimitLabel>
                          {i18n.t("deposit.exchangeRate")}:{" "}
                        </LimitLabel>
                        <LimitAmount>{` ${this.props.exchangeRate[key][key2].rate}`}</LimitAmount>
                        <LimitLabel style={{ marginLeft: "26px" }}>
                          {i18n.t("deposit.expectedPayment")}
                        </LimitLabel>{" "}
                        <LimitAmount>{` ${
                          isNaN(this.props.amount) === false
                            ? (
                                this.props.amount /
                                this.props.exchangeRate[key][key2].rate
                              ).toFixed(2)
                            : 0
                        }`}</LimitAmount>
                      </ExchangeRateContainer>
                    );
                  }
                });
              });
            }
          }
        })()}
        <CustomText>
          <CustomLabel>{i18n.t("deposit.promotion")}</CustomLabel>
          <CustomFormControl variant="outlined">
            <CustomCustomSelect
              native
              id="customSelect"
              value={this.props.depositPromotion}
              onChange={(e) => this.props.handlePromotionChange(e)}
            >
              <option value={""}>
                {i18n.t("deposit.msgPlsSelectPromotion")}
              </option>
              {this.props.general.promotionList.items
                .filter(
                  (item) =>
                    [
                      "FirstDeposit",
                      "DailySecondDeposit",
                      "DailyFirstDeposit",
                    ].indexOf(item.promotionType) >= 0
                )
                .map((item, index) => {
                  return (
                    <option value={item.id} key={index}>
                      {item.name}
                    </option>
                  );
                })}
            </CustomCustomSelect>
          </CustomFormControl>
        </CustomText>
        {(() => {
          if (
            this.props.wallet.depositTypeList[
              this.props.selectedPaymentIndex
            ].paymentcode.toUpperCase() === "MANUAL"
          ) {
            return (
              <CustomText>
                <CustomLabel>{i18n.t("deposit.uploadReceipt")}</CustomLabel>
                <CustomFormControl variant="outlined">
                  <UploadInput
                    key={this.props.fileInput}
                    type="file"
                    onChange={this.props.handleFileChange}
                    accept="image/jpg, image/jpeg, image/png, image/tiff"
                  ></UploadInput>
                </CustomFormControl>
              </CustomText>
            );
          }
        })()}

        <StyledModalPopup
          onClose={this.props.handleClosePopup}
          open={this.props.openPopup}
        >
          <DialoMessage>{i18n.t("deposit.msgDialog")}</DialoMessage>
          <ButtonConfirm
            onClick={this.props.handleOpenPopupUrl}
            style={{ float: "left" }}
          >
            {i18n.t("common.confirm")}
          </ButtonConfirm>
          <ButtonConfirm
            onClick={this.props.handleClosePopup}
            style={{ float: "right" }}
          >
            {i18n.t("common.cancel")}
          </ButtonConfirm>
        </StyledModalPopup>
        <Button
          style={{ margin: "40px auto 0 auto" }}
          label={i18n.t("common.submit")}
          onClick={this.props.handleDepositClick}
          disabled={(() => {
            const paymentcode =
              this.props.wallet.depositTypeList[
                this.props.selectedPaymentIndex
              ].paymentcode.toUpperCase();
            const transferlimit =
              this.props.wallet.depositTypeList[this.props.selectedPaymentIndex]
                .method[this.props.selectedMethodIndex].channel[
                this.props.selectedChannelIndex
              ].transferlimit;

            if (
              this.props.disabled === true ||
              ((paymentcode.toUpperCase() === "MANUAL" ||
                paymentcode.toUpperCase() === "APPLEPAY") &&
                this.props.files === null) ||
              this.props.amount < transferlimit.from ||
              this.props.amount > transferlimit.to
            ) {
              return true;
            } else {
              return false;
            }
          })()}
        ></Button>
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    wallet: state.wallet,
    general: state.general,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(Main);
