import React, { useState } from "react";
import styled from "styled-components";
import DynamicFont from "react-dynamic-font";
import LimitPopupBigPNG from "../../../../assets/images/limit-popup-big.png";
import CustomButton from "../../../Share/Button";
import CustomTextField from "../../../Share/TextField";
import i18n from "../../../../utils/i18n";
import Common from "../../../../utils/Common";
import { walletAction } from "../../../../api-services/actions/walletAction";
import { connect } from "react-redux";

const SubHeaderContainer = styled.div``;

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
`;

const BankCardItem = styled.div`
  width: 240px;
  background-color: #fff;
  border: 1px solid ${(props) => (props.active ? props.theme.primary : `#ccc`)};
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
`;
const BankCardTitle = styled.div`
  background-image: ${(props) =>
    props.active
      ? `linear-gradient(180deg, ${props.theme.primary}, ${props.theme.primaryGradient})`
      : `linear-gradient(180deg, #787878, #3c3b3b)`};
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
  span {
    color: ${({ theme }) => {
      return theme.primary;
    }};
    font-weight: bold;
  }
`;

const Main = (props) => {
  const [selectedCardIndex, setSelectedCardIndex] = useState("");
  const [amount, setAmount] = useState("");

  const [disabled, setDisabled] = useState("");
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(0);
  const [paymentList, setPaymentList] = useState(props.wallet.depositTypeList);

  var minValue = [];
  var maxValue = [];

  const handleSelectCardChange = (index) => {
    setSelectedCardIndex(index);
  };
  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleWithdrawalClick = (e) => {
    props.onhandleWithdrawalClick(
      props.cardList[this.state.selectedCardIndex].id,
      this.state.amount
    );
    setDisabled(true);
    setTimeout(() => {
      setDisabled(false);
    }, 1000);
  };

  const handleFilterBankNumber = (item) => {
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

  const getTransferLimit = (channelId) => {
    //reset everything
    minValue = [];
    maxValue = [];
    setMin(0);
    setMax(0);
    //update new data.
    for (var i = 0; i < paymentList.length; i++) {
      const methodList = paymentList[i].method;
      if (methodList) {
        for (var inner = 0; inner < methodList.length; inner++) {
          const channelList = methodList[inner].channel;
          for (var channel = 0; channel < channelList.length; channel++)
            if (channelList[channel]) {
              if (channelList[channel].channelid === channelId) {
                minValue.push(channelList[channel].transferlimit.from);
                maxValue.push(channelList[channel].transferlimit.to);
                setMin(Math.min(...minValue));
                setMax(Math.max(...maxValue));
              }
            }
        }
      }
    }
  };

  return (
    <>
      <SubHeaderContainer>
        <SubTitle>{i18n.t("withdrawal.msgEnterBank")}</SubTitle>
      </SubHeaderContainer>
      <BankCardContainer>
        {props.cardList.map((item, index) => {
          return (
            <BankCardItem
              key={index}
              active={index === selectedCardIndex}
              onClick={() => {
                handleSelectCardChange(index);
                getTransferLimit(item.paymentchannelid);
              }}
            >
              <BankCardTitle active={index === selectedCardIndex}>
                {i18n.t("withdrawal.bankCard")}
              </BankCardTitle>
              <BankCardInfo>
                <BankCardNumber>
                  <DynamicFont
                    content={handleFilterBankNumber(item)}
                  ></DynamicFont>
                </BankCardNumber>
                <BankCardAccount>
                  {i18n.t("deposit.details.account")}
                </BankCardAccount>
                <BankCardType>
                  {item.banktype === "bank"
                    ? item.detail.bankName
                    : item.banktype}
                </BankCardType>
              </BankCardInfo>
            </BankCardItem>
          );
        })}
      </BankCardContainer>

      <SubHeaderContainer>
        <SubTitle>{i18n.t("withdrawal.enterAmount")}</SubTitle>
      </SubHeaderContainer>

      <SelectionContainer>
        <CustomTextField
          width={250}
          height={38}
          placeholder={i18n.t("withdrawal.enterAmount")}
          handleTextFieldChange={handleAmountChange}
          variant="outlined"
          autoComplete="off"
          value={amount}
          pattern="[0-9]*"
          type={"number"}
          maxLength={12}
        ></CustomTextField>
        <LimitPopupContainer>
          {Common.formatNumberWithThousand(min)} -{" "}
          {Common.formatNumberWithThousand(max)}
        </LimitPopupContainer>
        <Turnover>
          {i18n.t("withdrawal.msgCanWithdrawal")}
          <span>{Common.formatNumberWithThousand(props.mainBalance)}</span>
        </Turnover>
        <Turnover>
          {i18n.t("withdrawal.turnover")}
          <span>{Common.formatNumberWithThousand(props.minWithdrawLimit)}</span>
        </Turnover>
      </SelectionContainer>

      <CustomButton
        disabled={
          parseFloat(amount) < min || parseFloat(amount) > max || disabled
        }
        name={i18n.t("common.nextStep")}
        width={255}
        marginTop={0}
        float={"none"}
        marginLeft={290}
        handleClick={handleWithdrawalClick}
      ></CustomButton>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    wallet: state.wallet,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getWithdrawalChannel: () => dispatch(walletAction.getWithdrawalChannel()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
