import React, { Component } from "react";
import styled from "styled-components";
import { Grid } from "@material-ui/core";
import DynamicFont from "react-dynamic-font";
import LimitPopupBigPNG from "../../../../assets/images/limit-popup-big.png";

import IconEditPNG from "../../../../assets/images/icon-edit.png";
import IconBankDisablePNG from "../../../../assets/images/icon-bank-disable.png";

import CustomButton from "../../../Share/Button";

import CustomTextField from "../../../Share/TextField";
import i18n from "../../../../utils/i18n";

import Common from "../../../../utils/Common";

const SubHeaderContainer = styled.div``;
const NumberContainer = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 3.2px;
  background-color: #141933;
  font-family: Arial;
  font-size: 14px;
  font-weight: bold;
  color: #ffffff;
  text-align: center;
  padding-top: 2px;
  float: left;
`;
const SubTitle = styled.div`
  font-size: 16px;
  float: left;
  color: #818181;
  margin: 0 0 0 10px;
`;
const SelectionContainer = styled.div`
  margin: 15px 0 0 30px;
`;

const BankCardContainer = styled(SelectionContainer)`
  display: flex;
  justify-content: flex-start;
  gap: 10px;
  flex-wrap: wrap;
`

const BankCardItem = styled.div`
  width: 240px;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 2px;
  overflow: hidden;
  position: relative;
  align-items: center;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  height: 100px;
  padding-right: 20px;
  margin-bottom: 20px;

  ${(props)=> props.active && `
  border: 1px solid #0091FE;
  &:before {
    border-style: solid;
    height: 0;
    position: absolute;
    top: 0;
    width: 0;
    z-index: 2;
    border-width: 0 35px 35px;
    color: #fff;
    font-size: 12px;
    left: 0;
    text-shadow: 0 1px 2px rgb(0 0 0 / 30%);
    transform: translate3d(197px,-12px,0) scale3d(0.5,0.5,1) rotate(45deg);
    border-color: transparent transparent #0091FE;
    content: "";
  }
  `}
`;
const BankCardTitle = styled.div`
  background-image: linear-gradient(180deg, #787878, #3c3b3b);
  border-bottom: 1px solid #ccc;
  box-sizing: border-box;
  color: #fff;
  display: flex;
  flex-direction: column;
  height: 100px;
  justify-content: center;
  padding: 0 16px;
  position: relative;
  width: 105px;
  font-size: 14px;
  &:after {
    border-bottom: 99px solid #fff;
    border-left: 16px solid transparent;
    content: "";
    height: 0;
    position: absolute;
    right: 0;
    top: 0;
  }
`;
const BankCardInfo = styled.div`
  flex: 1;
  padding-left: 10px;
`;
const BankCardAccount = styled.div`
  color: #777;
  margin: 10px 0 4px;
`;
const BankCardNumber = styled.div`
  color: #ccc;
  word-break: break-all;
  font-size: 14px;
`;
const BankCardType = styled.div`
  color: #ccc;
  font-size: 14px;
`;

const BankCardButton = styled(Grid)`
  width: auto;
  text-align: left;

  height: 41px;
  font-size: 14px;
  background-color: #f7f7f7;
  color: #747474;
  padding-right: 10px;
  text-align: center;

  float: left;
  margin-right: 8px;
  margin-top: 5px;
  ${(props) =>
    props.active
      ? ` border: solid 1px #151a34;
      `
      : ` border: solid 1px #e1dfdf;
     `};
  &:hover {
    cursor: pointer;
  }
`;
const BankCardButtonIcon = styled(Grid)`
  width: 40px;
  height: 40px;
  background: url(${IconBankDisablePNG}) no-repeat 15px center;
`;
const BankCardButtonLabel = styled.div`
  width: 86px;
  display: inline-block;
`;
const BankCardButtonCardNo = styled.div`
  float: right;
  margin-right: 2px;
`;
const BankCardButtonCardNoHL = styled(BankCardButtonCardNo)`
  font-weight: bold;
`;
const ManageCardButton = styled(Grid)`
  height: 41px;
  width: auto;
  font-size: 14px;
  background-color: #f7f7f7;
  color: #747474;
  padding-right: 10px;
  text-align: center;

  float: left;
  margin-right: 8px;
  margin-top: 5px;
  ${(props) =>
    props.active
      ? ` border: solid 1px #151a34;
      `
      : ` border: solid 1px #e1dfdf;
     `};
  &:hover {
    cursor: pointer;
  }
`;
const ManageCardButtonIcon = styled(Grid)`
  width: 40px;
  height: 40px;
  background: url(${IconEditPNG}) no-repeat 15px center;
`;
const SplitLine = styled.div`
  width: 100%;
  height: 1px;
  background-color: #e1dfdf;
  margin: 20px 0;
`;

const LimitPopupContainer = styled.div`
  background: url(${LimitPopupBigPNG}) no-repeat,
    linear-gradient(90deg, rgba(2, 0, 36, 0) 9px, rgba(122, 145, 153, 1) 10px);
  font-size: 14px;
  color: #ffffff;
  padding: 10px 10px 10px 25px;
  border-radius: 4px;
  display: inline-block;
  line-height: 25px;
  margin: 10px 0 0 20px;
`;

const Turnover = styled.div`
  a {
    color: ${({ theme }) => {
      return theme.primary;
    }};
    font-weight: bold;
  }
`;
class Main extends Component {
  state = {
    selectedCardIndex: 0,
    showDetails: false,
    amount: "",
    password: "",
    disabled: false,
  };
  componentDidMount() {
    // this.setState({ ...this.state, selectedCard: this.props.defaultCard });
  }

  handleSelectCardChange = (index) => {
    this.setState({ ...this.state, selectedCardIndex: index });
  };
  handleAmountChange = (e) => {
    this.setState({ ...this.state, amount: e.target.value });
  };
  handlePasswordChange = (e) => {
    this.setState({ ...this.state, password: e.target.value });
  };
  handleWithdrawalClick = (e) => {
    this.props.onhandleWithdrawalClick(
      this.props.cardList[this.state.selectedCardIndex].id,
      this.state.amount,
      this.state.password
    );
    this.setState({ ...this.state, disabled: true });
    setTimeout(() => {
      this.setState({ ...this.state, disabled: false });
    }, 1000);
  };

  handleFilterBankNumber = (item) => {
    let last4Digits = "";
    if (item.banktype === "ThirdParty" || item.banktype === "FPS") {
      if (item.detail.phone) {
        last4Digits = item.detail.phone.slice(-4);
        return last4Digits.padStart(item.detail.phone.length, "*");
      } else if (item.detail.address) {
        last4Digits = item.detail.address.slice(-4);
        return last4Digits.padStart(item.detail.address.length, "*");
      }
    } else {
      if (item.detail.bankAccount) {
        last4Digits = item.detail.bankAccount.slice(-4);
        return last4Digits.padStart(item.detail.bankAccount.length, "*");
      } else if (item.detail.address) {
        last4Digits = item.detail.address.slice(-4);
        return last4Digits.padStart(item.detail.address.length, "*");
      }
    }
  };

  render() {
    return (
      <>
        <SubHeaderContainer>
          <SubTitle>{i18n.t("withdrawal.msgEnterBank")}</SubTitle>
        </SubHeaderContainer>
        <BankCardContainer>
          {this.props.cardList.map((item, index) => {
            return (
              <BankCardItem 
              key={index} 
              active={index === this.state.selectedCardIndex}
                onClick={() => this.handleSelectCardChange(index)}
              >
              <BankCardTitle>{i18n.t("withdrawal.bankCard")}</BankCardTitle>
              <BankCardInfo>
                <BankCardNumber>
                  <DynamicFont content={this.handleFilterBankNumber(item)}>
                  </DynamicFont>
                </BankCardNumber>
                <BankCardAccount>{i18n.t("deposit.details.account")}</BankCardAccount>
                <BankCardType>
                  {item.banktype === "bank"
                    ? item.detail.bankName
                    : item.banktype}
                </BankCardType>
              </BankCardInfo>
            </BankCardItem>

              // <BankCardButton
              //   key={index}
              //   active={index === this.state.selectedCardIndex}
              //   onClick={() => this.handleSelectCardChange(index)}
              //   container
              //   direction="row"
              //   justifyContent="flex-start"
              //   alignItems="center"
              // >
              //   <BankCardButtonIcon items></BankCardButtonIcon>
              //   <BankCardButtonLabel items>
              //     {i18n.t("withdrawal.bankCard")}
              //   </BankCardButtonLabel>
              //   <BankCardButtonCardNoHL items>
              //     {(() => {
              //       if (
              //         item.banktype === "ThirdParty" ||
              //         item.banktype === "FPS"
              //       ) {
              //         if (item.detail.phone) {
              //           return item.detail.phone.substring(
              //             item.detail.phone.length - 4,
              //             item.detail.phone.length
              //           );
              //         } else if (item.detail.address) {
              //           return item.detail.address.substring(
              //             item.detail.address.length - 4,
              //             item.detail.address.length
              //           );
              //         }
              //       } else {
              //         if (item.detail.bankAccount) {
              //           return item.detail.bankAccount.substring(
              //             item.detail.bankAccount.length - 4,
              //             item.detail.bankAccount.length
              //           );
              //         } else if (item.detail.address) {
              //           return item.detail.address.substring(
              //             item.detail.address.length - 4,
              //             item.detail.address.length
              //           );
              //         }
              //       }
              //     })()}
              //   </BankCardButtonCardNoHL>
              //   <BankCardButtonCardNo items>
              //     {i18n.t("withdrawal.tail")}
              //   </BankCardButtonCardNo>
              // </BankCardButton>
            );
          })}
          {/* <ManageCardButton
            onClick={this.props.onhandleManageCardClick}
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
          >
            <ManageCardButtonIcon items></ManageCardButtonIcon>
            <Grid items> {i18n.t("withdrawal.manageBank")}</Grid>
          </ManageCardButton> */}
        </BankCardContainer>
        
        <SubHeaderContainer>
          <SubTitle>{i18n.t("withdrawal.enterAmount")}</SubTitle>
        </SubHeaderContainer>

        <SelectionContainer>
          <CustomTextField
            width={250}
            height={38}
            placeholder={i18n.t("withdrawal.enterAmount")}
            handleTextFieldChange={this.handleAmountChange}
            variant="outlined"
            autoComplete="off"
            value={this.state.amount}
            pattern="[0-9]*"
            type={"number"}
            maxLength={12}
          ></CustomTextField>
          <LimitPopupContainer>
            {Common.formatNumberWithThousand(this.props.withdrawalMinLimit)} -{" "}
            {Common.formatNumberWithThousand(this.props.withdrawalMaxLimit)}
          </LimitPopupContainer>
          <Turnover>
            {i18n.t("withdrawal.turnover")}
            <a>
              {Common.formatNumberWithThousand(this.props.minWithdrawLimit)}
            </a>
          </Turnover>
        </SelectionContainer>
        {/* {config.brand !== "HKJP" && config.brand !== "GPI" ? (
          <React.Fragment>
            <SplitLine></SplitLine>
            <SubHeaderContainer>
              <NumberContainer>3</NumberContainer>

              <SubTitle>{i18n.t("withdrawal.msgEnterWithdrawalPass")}</SubTitle>
            </SubHeaderContainer>
            <SelectionContainer>
              <CustomTextField
                marginTop={10}
                type={"password"}
                placeholder={i18n.t("withdrawal.msgEnterWithdrawalPass")}
                width={220}
                height={38}
                float={"none"}
                value={this.state.password}
                handleTextFieldChange={this.handlePasswordChange}
              ></CustomTextField>
            </SelectionContainer>
          </React.Fragment>
        ) : null} */}

        <CustomButton
          disabled={
            parseFloat(this.state.amount) < this.props.withdrawalMinLimit ||
            parseFloat(this.state.amount) > this.props.withdrawalMaxLimit ||
            this.state.disabled
          }
          name={i18n.t("common.nextStep")}
          width={255}
          marginTop={0}
          float={"none"}
          marginLeft={290}
          handleClick={this.handleWithdrawalClick}
        ></CustomButton>
      </>
    );
  }
}
export default Main;
