import React from "react";
import styled from "styled-components";
import { TextField, Select, FormControl, withStyles } from "@material-ui/core";
import i18n from "../../../../utils/i18n";
import CustomButton from "../../../Share/Button";
import LimitPopupPNG from "../../../../assets/images/limit-popup.png";
import Common from "../../../../utils/Common";
import config from "../../../../config/config";
import { withSnackbar } from "notistack";
import { utility } from "../../../../utils/utility";
const CustomImage = styled.img`
  height: 130px;
  width: auto;
`;

const FormContainer = styled.div`
  display: flex;
  align-items: center;
`;

const FormRightContainer = styled.div``;

const FormLeftContainer = styled.div`
  width: 280px;
`;

const FormActionContainer = styled.div`
  margin: 40px 0;
  align-items: center;
  display: flex;
  justify-content: center;
  gap: 20px;
`;

const CustomFormControl = withStyles((theme) => ({
  root: {
    width: "400px",
    height: "47.63px",

    marginRight: "5px",
    float: "left",
    backgroundColor: "#fff",
    padding: 0,
    "&:before": {
      borderRight: "1px solid #b6b6b6",
      content: '"\\00a0"',
      position: "absolute",
      top: "1px",
      right: "36px",
      zIndex: " 1",
      display: "block",
      height: "100%",
    },
    "& label.Mui-focused": {
      color: "#b6b6b6",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#b6b6b6",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#b6b6b6",
        marginTop: "1px",
      },
      "&:hover fieldset": {
        borderColor: "#b6b6b6",
        marginTop: "1px",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#b6b6b6",
        marginTop: "1px",
      },
    },
  },
}))(FormControl);
const TabButton = styled.div`
  height: 86px;
  font-size: 14px;
  background-color: #f7f7f7;
  color: #747474;

  text-align: center;

  float: left;
  margin-right: 8px;
  transition: all 0.3s;
  ${(props) =>
    props.active
      ? ` border: solid 1px ${props.theme.primary};
      color: ${props.theme.primary};`
      : ` border: solid 1px #e1dfdf;
      color: #747474;`};
  &:hover {
    cursor: pointer;
  }
`;
const SubHeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const SubTitle = styled.div`
  font-size: 16px;
  color: #818181;
  text-align: right;
  width: 100%;
`;
const SelectionContainer = styled.div`
  margin: 15px 0 0 30px;
`;
const QRCodeImg = styled.img``;

const CustomSelect = withStyles((theme) => ({
  root: {
    fontSize: "14px",
    color: "#818181",
  },
}))(Select);

const LimitPopupContainer = styled.div`
  background: url(${LimitPopupPNG}) no-repeat,
    linear-gradient(90deg, rgba(2, 0, 36, 0) 10px, rgb(242, 230, 125) 11px);
  font-size: 14px;
  color: #ffffff;
  padding: 10px 10px 10px 22px;
  border-radius: 4px;
  display: inline-block;
  min-width: 150px;
`;

const LimitLabel = styled.span`
  color: #747474;
`;

const LimitAmount = styled.span`
  color: #c0252d;
`;
const ExchangeRateContainer = styled.div``;

const TransferContainer = styled.div`
  color: #747474;
  padding: 5px 0;
  display: flex;
  align-items: center;
`;
const TransferLabel = styled.span`
  float: left;
  //min-width: 100px;
  color: #151a34;
`;
const TransferLabelValue = styled.span`
  float: left;
  margin-left: 10px;
`;

const CustomInput = styled.input`
  color: #000;
  font-size: 14px;
  text-align: right;
  margin: 12px 0 12px 10px;
  font-weight: 500;
  border: 0;

  padding: 0;
  ::placeholder,
  ::-webkit-input-placeholder {
    color: #c3c3c3;
  }
  &:disabled {
    background: #fff;
    -webkit-text-fill-color: #000;
    opacity: 1;
  }
`;
const Remark = styled.div`
  color: ${({ theme }) => theme.primary};
  opacity: 0.75;
`;

const CopyIcon = styled.div`
  width: 15px;
  height: 15px;

  background-color: ${({ theme }) => theme.primary};
  mask: url(${process.env.PUBLIC_URL + `/assets/images/wapp/copy.png`})
    no-repeat center / contain;
  cursor: pointer;
  margin-left: 10px;
`;

const FeeSpot = styled.div`
  color: ${({ theme }) => theme.primary};

  span {
    font-weight: bold;
  }
`;

const NewStepOne = (props) => {
  const {
    amount,
    onAmountChange,
    name,
    onNameChange,
    account,
    onAccountChange,
    onDepositCancelClick,
    selectedMethodIndex,
    onMethodChange,
    selectedChannelIndex,
    onChannelChange,
    paymentType,
    onNextClick,
    exchangeRate,
    files,
    playerNote,
    onPlayerNoteChange,
  } = props;

  if (paymentType === null) return <></>;

  const methodList = paymentType.method;

  const paymentCode = (payment) => {
    return paymentType.paymentcode.toUpperCase() === payment.toUpperCase();
  };

  const methodCode = (method) => {
    return (
      methodList[selectedMethodIndex].methodcode.toUpperCase() ===
      method.toUpperCase()
    );
  };

  const performCopy = (content) => {
    props.enqueueSnackbar(i18n.t("affiliate.copied"), {
      variant: "success",
    });

    utility.copy(content);
  };

  const CopyFeature = ({ copyContent }) => {
    return (
      <CopyIcon
        onClick={() => {
          performCopy(copyContent);
        }}
      />
    );
  };

  const DepositDetails = ({ title, data }) => {
    return (
      <TransferContainer>
        <TransferLabel>{i18n.t("extended." + title)}:</TransferLabel>
        {data && (
          <>
            <TransferLabelValue>{data}</TransferLabelValue>
            <CopyFeature copyContent={data} />
          </>
        )}
      </TransferContainer>
    );
  };
  var displaysequence = [
    "name",
    "address",
    "bankAccount",
    "eMoneyName",
    "phone",
  ];

  const generateDisplayContent = (content) => {
    // for every child in channelExtend object, map it to a DepositDetails component if the child is not empty
    // if the data is int format, ignore it
    // if the data returned is an URL, render it as an image
    // otherwise return as DepositDetails

    return Object.keys(content)
      .sort((a, b) => {
        return displaysequence.indexOf(a) - displaysequence.indexOf(b);
      })
      .map((key, index) => {
        if (content[key] !== "") {
          if (typeof content[key] === "number") {
            return <></>;
          } else if (content[key].includes("http")) {
            return (
              <CustomImage src={content[key]} alt={content[key]} key={index} />
            );
          } else {
            return (
              <DepositDetails title={key} data={content[key]} key={index} />
            );
          }
        }
      });
  };

  return (
    <>
      {!config.features.Deposit_AddCard ? (
        <>
          <FormContainer>
            <FormLeftContainer>
              <SubHeaderContainer>
                <SubTitle>{i18n.t("deposit.msgPlsSelectPayment")}</SubTitle>
              </SubHeaderContainer>
            </FormLeftContainer>

            <FormRightContainer>
              <SelectionContainer>
                <CustomFormControl>
                  <CustomSelect
                    variant="outlined"
                    value={selectedMethodIndex}
                    displayEmpty
                    onChange={onMethodChange}
                    native
                  >
                    {methodList.map((data, key) => {
                      return (
                        <option value={key} key={key}>
                          {i18n.t(data.methodcode)}
                        </option>
                      );
                    })}
                  </CustomSelect>
                </CustomFormControl>
              </SelectionContainer>
            </FormRightContainer>
          </FormContainer>
        </>
      ) : (
        <>
          <FormContainer>
            <FormLeftContainer>
              <SubHeaderContainer>
                <SubTitle>{i18n.t("idr1.pleaseEnterAccountName")}</SubTitle>
              </SubHeaderContainer>
            </FormLeftContainer>
            <FormRightContainer>
              <SelectionContainer>
                <CustomFormControl>
                  <CustomSelect
                    variant="outlined"
                    value={props.selectedBankCard}
                    displayEmpty
                    onChange={props.handleBankCardChange}
                    native
                  >
                    <option value="" disabled>
                      {i18n.t("idr1.msgPlsSelectAccount")}
                    </option>
                    {props.bankCardList.map((data, key) => {
                      return (
                        <option value={data.id} key={key}>
                          {data.detail.bankAccount ||
                            data.detail.address ||
                            data.detail.phone}
                        </option>
                      );
                    })}
                  </CustomSelect>
                </CustomFormControl>
              </SelectionContainer>
            </FormRightContainer>
          </FormContainer>
        </>
      )}

      {(() => {
        if (methodList.length > 0 && selectedMethodIndex !== -1) {
          return (
            <>
              {!(
                config.features.Deposit_HideDepositChannel ||
                config.features.Deposit_AddCard
              ) && (
                <>
                  <FormContainer>
                    <FormLeftContainer>
                      <SubHeaderContainer>
                        <SubTitle>
                          {i18n.t("deposit.msgPlsSelectMethod")}
                        </SubTitle>
                      </SubHeaderContainer>
                    </FormLeftContainer>

                    <FormRightContainer>
                      <SelectionContainer>
                        <CustomFormControl>
                          <CustomSelect
                            variant="outlined"
                            value={selectedChannelIndex}
                            displayEmpty
                            onChange={onChannelChange}
                            native
                          >
                            {methodList[selectedMethodIndex].channel.map(
                              (data, key) => {
                                return (
                                  <option value={key} key={key}>
                                    {data.channelname}
                                  </option>
                                );
                              }
                            )}
                          </CustomSelect>
                        </CustomFormControl>
                        {/* {methodList[selectedMethodIndex].channel.map(
                    (item, index) => {
                      return (
                        <TunnelButton
                          key={index}
                          onClick={() => onChannelChange(index)}
                          active={selectedChannelIndex === index}
                        >
                          {item.channelname}
                        </TunnelButton>
                      );
                    }
                  )} */}
                      </SelectionContainer>
                    </FormRightContainer>
                  </FormContainer>
                </>
              )}

              {(() => {
                if (
                  (paymentCode("MANUAL") || paymentCode("USDT")) &&
                  !config.features.Deposit_AddCard
                ) {
                  var channelExtend =
                    methodList[selectedMethodIndex].channel[
                      selectedChannelIndex
                    ].extended;

                  if (
                    methodList[selectedMethodIndex].methodcode.toUpperCase() ===
                    "THIRDPARTY"
                  ) {
                    return (
                      <>
                        <FormContainer>
                          <FormLeftContainer>
                            <SubHeaderContainer>
                              <SubTitle>
                                {i18n.t("deposit.transferAccount")}
                              </SubTitle>
                            </SubHeaderContainer>
                          </FormLeftContainer>

                          <FormRightContainer>
                            <SelectionContainer>
                              <QRCodeImg src={channelExtend.qrCode} />
                            </SelectionContainer>
                          </FormRightContainer>
                        </FormContainer>
                      </>
                    );
                  } else {
                    return (
                      <>
                        <FormContainer>
                          <FormLeftContainer>
                            <SubHeaderContainer>
                              <SubTitle>
                                {i18n.t("deposit.transferAccount")}
                              </SubTitle>
                            </SubHeaderContainer>
                          </FormLeftContainer>

                          <FormRightContainer>
                            <SelectionContainer>
                              {generateDisplayContent(channelExtend)}
                            </SelectionContainer>
                          </FormRightContainer>
                        </FormContainer>
                      </>
                    );
                  }
                }
              })()}

              {(() => {
                if (
                  (paymentCode("MANUAL") || paymentCode("APPLEPAY")) &&
                  !config.features.Deposit_ManualApplePayHideBankAcc
                ) {
                  return (
                    <>
                      {!(
                        config.features.Deposit_RemoveAccount ||
                        methodCode("USDT") ||
                        config.features.Deposit_AddCard
                      ) && (
                        <FormContainer>
                          <FormLeftContainer>
                            <SubHeaderContainer>
                              <SubTitle>
                                {config.features.Deposit_OriginAccount
                                  ? i18n.t("idr1.pleaseEnterAccountName")
                                  : i18n.t("common.pleaseEnterAccountName")}
                              </SubTitle>
                            </SubHeaderContainer>
                          </FormLeftContainer>

                          <FormRightContainer>
                            <SelectionContainer>
                              {props.accountList.length > 1 &&
                              !config.features
                                .Deposit_AccountNameManualInput ? (
                                <CustomFormControl>
                                  <CustomSelect
                                    variant="outlined"
                                    value={props.selectedBankCard}
                                    displayEmpty
                                    onChange={props.handleSelectAccountChange}
                                    native
                                  >
                                    <option value="">
                                      {config.features.Deposit_OriginAccount
                                        ? i18n.t("idr1.pleaseEnterAccountName")
                                        : i18n.t(
                                            "common.pleaseEnterAccountName"
                                          )}
                                    </option>
                                    {props.accountList.map((data, key) => {
                                      var detail = data.detail;

                                      return (
                                        <option value={data.id} key={key}>
                                          {detail.bankAccount ||
                                            detail.address ||
                                            detail.phone}{" "}
                                          ({data.banktype})
                                        </option>
                                      );
                                    })}
                                  </CustomSelect>
                                </CustomFormControl>
                              ) : (
                                <TextField
                                  style={{
                                    height: "38px",
                                    width: "258px",
                                    float: "left",
                                    marginRight: "5px",
                                    padding: 0,
                                  }}
                                  placeholder={
                                    config.features.Deposit_OriginAccount
                                      ? i18n.t("idr1.pleaseEnterAccountName")
                                      : i18n.t("common.pleaseEnterAccountName")
                                  }
                                  onChange={onAccountChange}
                                  outputFormat="string"
                                  variant="outlined"
                                  autoComplete="off"
                                  disabled={
                                    !config.features
                                      .Deposit_AccountNameManualInput &&
                                    config.features.Deposit_AutofillFirstCard &&
                                    props.accountList.length > 1
                                  }
                                  value={account}
                                ></TextField>
                              )}
                            </SelectionContainer>
                            {config.features.Deposit_AddTips && (
                              <div style={{ marginLeft: 30, marginTop: 8 }}>
                                <Remark>
                                  {" "}
                                  {i18n.t("mgm.accountDepositTips")}
                                </Remark>
                              </div>
                            )}
                          </FormRightContainer>
                        </FormContainer>
                      )}

                      {(!(
                        config.features.Deposit_RemoveName || methodCode("FPS")
                      ) ||
                        config.features.Deposit_FPSWithName) && (
                        <FormContainer>
                          <FormLeftContainer>
                            <SubHeaderContainer>
                              <SubTitle>
                                {config.features
                                  .Deposit_CustomBankNameTranslation
                                  ? i18n.t("mgm.msgPlsEnterAccount")
                                  : config.features.Deposit_EnglishName
                                  ? i18n.t("bet28.BankAccountName")
                                  : i18n.t("deposit.msgPlsEnterAccount")}
                              </SubTitle>
                            </SubHeaderContainer>
                          </FormLeftContainer>

                          <FormRightContainer>
                            <SelectionContainer>
                              <TextField
                                style={{
                                  height: "38px",
                                  width: "258px",
                                  float: "left",
                                  marginRight: "5px",
                                  padding: 0,
                                }}
                                placeholder={
                                  config.features
                                    .Deposit_CustomBankNameTranslation
                                    ? i18n.t("mgm.msgPlsEnterAccount")
                                    : config.features.Deposit_EnglishName
                                    ? i18n.t("bet28.msgEnterBankAccountName")
                                    : i18n.t("deposit.msgPlsEnterAccount")
                                }
                                onChange={onNameChange}
                                outputFormat="string"
                                variant="outlined"
                                autoComplete="off"
                                value={name}
                              ></TextField>
                            </SelectionContainer>
                            {config.features.Deposit_AddTips && (
                              <div style={{ marginLeft: 30, marginTop: 8 }}>
                                <Remark>
                                  {" "}
                                  {i18n.t("mgm.nameDepositTips")}
                                </Remark>
                              </div>
                            )}
                          </FormRightContainer>
                        </FormContainer>
                      )}
                    </>
                  );
                }
              })()}

              <FormContainer>
                <FormLeftContainer>
                  <SubHeaderContainer>
                    <SubTitle>
                      {i18n.t("deposit.plsEnterDepositAmount")}
                    </SubTitle>
                    {methodList[selectedMethodIndex].channel[
                      selectedChannelIndex
                    ].fees > 0 && (
                      <FeeSpot>
                        {i18n.t("fees.deposit")}:{" "}
                        <span>
                          {
                            methodList[selectedMethodIndex].channel[
                              selectedChannelIndex
                            ].fees
                          }
                          %
                        </span>
                      </FeeSpot>
                    )}
                  </SubHeaderContainer>
                </FormLeftContainer>

                <FormRightContainer>
                  <SelectionContainer>
                    <TextField
                      style={{
                        height: "38px",
                        width: "220px",
                        float: "left",
                        marginRight: "5px",
                        padding: 0,
                      }}
                      placeholder={
                        methodCode("USDT")
                          ? i18n.t("deposit.plsEnterUSDTAmount")
                          : i18n.t("deposit.plsEnterDepositAmount")
                      }
                      onChange={onAmountChange}
                      outputFormat="string"
                      variant="outlined"
                      autoComplete="off"
                      value={amount}
                      pattern="[0-9]*"
                      type={"number"}
                    ></TextField>

                    <LimitPopupContainer>
                      <LimitLabel>{i18n.t("deposit.limitDeposit")} </LimitLabel>
                      <LimitAmount>
                        {Common.formatNumberWithThousand(
                          methodList[selectedMethodIndex].channel[
                            selectedChannelIndex
                          ].transferlimit.from
                        )}{" "}
                        -{" "}
                        {Common.formatNumberWithThousand(
                          methodList[selectedMethodIndex].channel[
                            selectedChannelIndex
                          ].transferlimit.to
                        )}
                      </LimitAmount>
                    </LimitPopupContainer>
                    {(() => {
                      if (
                        methodList[selectedMethodIndex].methodcode === "Usdt" &&
                        methodList[selectedMethodIndex].channel[
                          selectedChannelIndex
                        ].extended.rate !== undefined
                      ) {
                        var usdtRate =
                          methodList[selectedMethodIndex].channel[
                            selectedChannelIndex
                          ].extended.rate;
                        if (
                          paymentType.paymentcode.toUpperCase() === "MANUAL"
                        ) {
                          return (
                            <ExchangeRateContainer style={{ marginTop: "4px" }}>
                              <LimitLabel>
                                {i18n.t("deposit.exchangeRate")} 1{" "}
                                {`${config.currency}`} :{" "}
                              </LimitLabel>
                              <LimitAmount>{` ${usdtRate} `}</LimitAmount>
                              <LimitLabel>USDT</LimitLabel>
                              <div class="clear"></div>
                              <LimitLabel>
                                {i18n.t("deposit.totalAmount")}
                              </LimitLabel>
                              {" : "}
                              <LimitAmount>{` ${
                                isNaN(amount) === false
                                  ? Common.formatNumberWithCommasNoRounding(
                                      amount / usdtRate
                                    )
                                  : 0
                              }`}</LimitAmount>
                            </ExchangeRateContainer>
                          );
                        }
                      }
                    })()}
                    {(() => {
                      if (
                        methodList[selectedMethodIndex].methodcode === "Crypto"
                      ) {
                        if (
                          paymentType.paymentcode.toUpperCase() === "LEEPAY"
                        ) {
                          return (
                            <ExchangeRateContainer style={{ marginTop: "4px" }}>
                              <LimitLabel>
                                {i18n.t("deposit.exchangeRate")}:{" "}
                              </LimitLabel>
                              <LimitAmount>{` ${exchangeRate.buyprice}`}</LimitAmount>
                              <LimitLabel style={{ marginLeft: "26px" }}>
                                {i18n.t("deposit.expectedPayment")}
                              </LimitLabel>{" "}
                              <LimitAmount>{` ${
                                isNaN(amount) === false
                                  ? (amount / exchangeRate.buyprice).toFixed(2)
                                  : 0
                              }`}</LimitAmount>
                            </ExchangeRateContainer>
                          );
                        } else {
                          return Object.keys(exchangeRate).map((key) => {
                            return Object.keys(exchangeRate[key]).map(
                              (key2) => {
                                if (key2 === "HKD") {
                                  return (
                                    <ExchangeRateContainer
                                      style={{ marginTop: "4px" }}
                                    >
                                      <LimitLabel>
                                        {i18n.t("deposit.exchangeRate")}:{" "}
                                      </LimitLabel>
                                      <LimitAmount>{` ${exchangeRate[key][key2].rate}`}</LimitAmount>
                                      <LimitLabel
                                        style={{ marginLeft: "26px" }}
                                      >
                                        {i18n.t("deposit.expectedPayment")}
                                      </LimitLabel>{" "}
                                      <LimitAmount>{` ${
                                        isNaN(amount) === false
                                          ? (
                                              amount /
                                              exchangeRate[key][key2].rate
                                            ).toFixed(2)
                                          : 0
                                      }`}</LimitAmount>
                                    </ExchangeRateContainer>
                                  );
                                }
                              }
                            );
                          });
                        }
                      }
                    })()}
                    {paymentType.paymentcode.toUpperCase() === "UMPAY" && (
                      <Remark>{i18n.t("deposit.ppRemark")}</Remark>
                    )}
                  </SelectionContainer>
                </FormRightContainer>
              </FormContainer>

              <FormContainer>
                <FormLeftContainer>
                  <SubHeaderContainer>
                    <SubTitle>{i18n.t("deposit.promotion")}</SubTitle>
                  </SubHeaderContainer>
                </FormLeftContainer>

                <FormRightContainer>
                  <SelectionContainer>
                    <CustomFormControl>
                      <CustomSelect
                        variant="outlined"
                        value={props.depositPromotion}
                        displayEmpty
                        onChange={props.handleDepositPromotionChange}
                        native
                      >
                        <option value="">
                          {i18n.t("deposit.msgPlsSelectPromotion")}
                        </option>
                        {props.promotionList.map((data, key) => {
                          return (
                            <option value={data.id} key={key}>
                              {data.name}
                            </option>
                          );
                        })}
                      </CustomSelect>
                    </CustomFormControl>
                  </SelectionContainer>
                </FormRightContainer>
              </FormContainer>

              {(() => {
                if (paymentType.paymentcode.toUpperCase() === "MANUAL") {
                  return (
                    <React.Fragment>
                      <FormContainer>
                        <FormLeftContainer>
                          <SubHeaderContainer>
                            <SubTitle>
                              {i18n.t("deposit.uploadReceipt")}
                            </SubTitle>
                          </SubHeaderContainer>
                        </FormLeftContainer>

                        <FormRightContainer>
                          <SelectionContainer>
                            <CustomInput
                              type="file"
                              accept="image/jpg, image/jpeg, image/png, image/tiff"
                              onChange={props.onFileChange}
                            ></CustomInput>
                            <Remark>
                              {i18n.t(
                                config.features.Deposit_UploadRequired
                                  ? "deposit.msgPlsUploadProof"
                                  : "deposit.msgNotMustUploadProof"
                              )}
                            </Remark>
                          </SelectionContainer>
                        </FormRightContainer>
                      </FormContainer>
                    </React.Fragment>
                  );
                }
              })()}
              {methodList && paymentType.paymentcode === "ZeroNineNinePay" && (
                <FormActionContainer>{i18n.t("hint._099")}</FormActionContainer>
              )}

              {config.features.Deposit_Withdrawal_PlayerNote &&
                (methodCode("EWALLET") || methodCode("PULSA")) && (
                  <FormContainer>
                    <FormLeftContainer>
                      <SubHeaderContainer>
                        <SubTitle>{i18n.t("deposit.playerNote")}</SubTitle>
                      </SubHeaderContainer>
                    </FormLeftContainer>

                    <FormRightContainer>
                      <SelectionContainer>
                        <TextField
                          style={{
                            height: "38px",
                            width: "258px",
                            float: "left",
                            marginRight: "5px",
                            padding: 0,
                          }}
                          placeholder={i18n.t("deposit.plsEnterPlayerNote")}
                          onChange={onPlayerNoteChange}
                          outputFormat="string"
                          variant="outlined"
                          autoComplete="off"
                          value={playerNote}
                        ></TextField>
                      </SelectionContainer>
                    </FormRightContainer>
                  </FormContainer>
                )}

              <FormActionContainer>
                <CustomButton
                  name={i18n.t("common.cancel")}
                  width={150}
                  marginTop={0}
                  float={"none"}
                  marginLeft={0}
                  handleClick={() => {
                    onDepositCancelClick();
                  }}
                ></CustomButton>
                <CustomButton
                  name={i18n.t("common.submit")}
                  width={150}
                  marginTop={0}
                  float={"none"}
                  handleClick={() => {
                    onNextClick();
                  }}
                  disabled={
                    amount <
                      methodList[selectedMethodIndex].channel[
                        selectedChannelIndex
                      ].transferlimit.from ||
                    amount >
                      methodList[selectedMethodIndex].channel[
                        selectedChannelIndex
                      ].transferlimit.to ||
                    (config.features.Deposit_UploadRequired &&
                      paymentCode("MANUAL") &&
                      files.length <= 0) ||
                    (config.features.Deposit_AddCard &&
                      props.selectedBankCard === "")
                  }
                ></CustomButton>
              </FormActionContainer>
            </>
          );
        }
      })()}
    </>
  );
};

export default withSnackbar(NewStepOne);
