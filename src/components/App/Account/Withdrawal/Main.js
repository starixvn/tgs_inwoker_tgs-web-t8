import React, { Component } from "react";
import styled from "styled-components";
import { Grid } from "@material-ui/core";

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
  render() {
    return (
      <>
        <SubHeaderContainer>
          <NumberContainer>1</NumberContainer>

          <SubTitle>{i18n.t("withdrawal.msgEnterBank")}</SubTitle>
        </SubHeaderContainer>
        <SelectionContainer>
          {this.props.cardList.map((item, index) => {
            return (
              <BankCardButton
                key={index}
                active={index === this.state.selectedCardIndex}
                onClick={() => this.handleSelectCardChange(index)}
                container
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
              >
                <BankCardButtonIcon items></BankCardButtonIcon>
                <BankCardButtonLabel items>
                  {i18n.t("withdrawal.bankCard")}
                </BankCardButtonLabel>
                <BankCardButtonCardNoHL items>
                  {(() => {
                    if (
                      item.banktype === "ThirdParty" ||
                      item.banktype === "FPS"
                    ) {
                      if (item.detail.phone) {
                        return item.detail.phone.substring(
                          item.detail.phone.length - 4,
                          item.detail.phone.length
                        );
                      } else if (item.detail.address) {
                        return item.detail.address.substring(
                          item.detail.address.length - 4,
                          item.detail.address.length
                        );
                      }
                    } else {
                      if (item.detail.bankAccount) {
                        return item.detail.bankAccount.substring(
                          item.detail.bankAccount.length - 4,
                          item.detail.bankAccount.length
                        );
                      } else if (item.detail.address) {
                        return item.detail.address.substring(
                          item.detail.address.length - 4,
                          item.detail.address.length
                        );
                      }
                    }
                  })()}
                </BankCardButtonCardNoHL>
                <BankCardButtonCardNo items>
                  {i18n.t("withdrawal.tail")}
                </BankCardButtonCardNo>
              </BankCardButton>
            );
          })}
          <ManageCardButton
            onClick={this.props.onhandleManageCardClick}
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
          >
            <ManageCardButtonIcon items></ManageCardButtonIcon>
            <Grid items> {i18n.t("withdrawal.manageBank")}</Grid>
          </ManageCardButton>
        </SelectionContainer>
        <SplitLine></SplitLine>

        <SubHeaderContainer>
          <NumberContainer>2</NumberContainer>

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
