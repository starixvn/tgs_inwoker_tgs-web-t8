import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import DynamicFont from "react-dynamic-font";

import Dialog from "@material-ui/core/Dialog";
import LoginBGPNG from "../../../../assets/images/login-bg.png";
import IconLoginClosePNG from "../../../../assets/images/icon-login-close.png";
import IconAddCardPNG from "../../../../assets/images/icon-addcard.png";

import { accountAction } from "../../../../api-services/actions/accountAction";
import { walletAction } from "../../../../api-services/actions/walletAction";
import { SHOWING_DIALOG } from "../../../../api-services/constant/actionType";
import { withStyles } from "@material-ui/core/styles";
// import Address from "./Address";
import ChangePassword from "./ChangePassword";
import Email from "./Email";
import WithdrawalPassword from "./WithdrawalPassword";
import ChangeWithdrawalPassword from "./ChangeWithdrawalPassword";

import IDVerification from "./id-verification";
import PhoneVerification from "./PhoneVerification";
// import SecurityQuestion from "./SecurityQuestion";
// import ResetSecurityQuestion from "./ResetSecurityQuestion";

import QQ from "./QQ";
import Wechat from "./Wechat";
import FacebookMessenger from "./FacebookMessenger";
import Telegram from "./Telegram";
import Line from "./Line";
import Viber from "./Viber";
import Whatsapp from "./Whatsapp";
import i18n from "../../../../utils/i18n";
import config from "../../../../config/config";
import Common from "../../../../utils/Common";
import Birthdate from "./Birthdate";

const Container = styled.div`
  padding: 20px 28px;
  box-sizing: border-box
  //background-color: #eaeaea;
  width: 100%;
  min-height: 611px;
  display: flex;
  justify-content: space-between;
`;

const LeftContainer = styled.div`
  width: 690px;
`;

const RightContainer = styled.div`
  width: 440px;
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
const InnerWrap = styled.div`
  height: auto;
  margin-bottom: 20px;
`;
const ContentWrap = styled.div`
  margin-top: 12px;
  height: 44px;
  font-size: 14px;
  width: 100%;
  display: flex;
  justify-content: space-between;
`;
const ContentLabel = styled.div`
  color: #747474;
  width: 160px;
  margin-top: 10px;
  text-align: right;
`;
const ContentValue = styled.div`
  color: #16242a;
  margin-top: 10px;
  margin-left: 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const ContentButton = styled.div`
  min-width: 89px;
  padding: 0 10px
  height: 32px;
  border-radius: 3.8px;
  color: #fff;
  margin-right: 5px;
  border-radius: 6px;
  background-color: ${(props) => props.theme.primary};
  &:hover {
    cursor: pointer;
    filter: grayscale(1);
  }
`;
// const ButtonDisable = styled(ContentButton)`
//   color: #747474;
//   background-color: #fff;
//   &:hover {
//     background: #fff;
//   }
// `;
const ContentButtonLabel = styled.div`
  text-align: center;
  margin-top: 5px;
`;

const VerifiedSpan = styled.span`
  color: ${({ theme }) => theme.primary};
  user-select: none;
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

function GetContentWrap(accountInfo, label, attr, func, edit, disable) {
  let attrValue = accountInfo[attr];
  let isMemberName = false;
  let verified = accountInfo["check_pass_account"];
  let containMemberName = accountInfo["member_name"];
  if (attr === "member_address") {
    if (attrValue !== "") {
      attrValue +=
        " | " +
        accountInfo["member_address_surename"] +
        " | " +
        accountInfo["member_address_phone"];
    }
  }

  if (attr === "member_fb") {
    if (attrValue !== "") {
      attrValue = accountInfo["member_fb"]
        ? accountInfo["member_fb"].substring(0, 1) + "**"
        : "";
    }
  }

  if (attr === "member_telegram") {
    if (attrValue !== "") {
      attrValue = accountInfo["member_telegram"]
        ? accountInfo["member_telegram"].substring(0, 1) + "**"
        : "";
    }
  }

  if (attr === "member_line") {
    if (attrValue !== "") {
      attrValue = accountInfo["member_line"]
        ? accountInfo["member_line"].substring(0, 1) + "**"
        : "";
    }
  }

  if (attr === "member_viber") {
    if (attrValue !== "") {
      attrValue = accountInfo["member_viber"]
        ? accountInfo["member_viber"].substring(0, 1) + "**"
        : "";
    }
  }

  if (attr === "member_whatsapp") {
    if (attrValue !== "") {
      attrValue = accountInfo["member_whatsapp"]
        ? accountInfo["member_whatsapp"].substring(0, 1) + "**"
        : "";
    }
  }

  if (attr === "member_wechat") {
    if (attrValue !== "") {
      attrValue = accountInfo["member_wechat"]
        ? accountInfo["member_wechat"].substring(0, 1) + "**"
        : "";
    }
  }

  if (attr === "member_qq") {
    if (attrValue !== "") {
      attrValue = accountInfo["member_qq"]
        ? accountInfo["member_qq"].substring(0, 1) + "**"
        : "";
    }
  }
  if (attr === "member_phone") {
    if (attrValue !== "") {
      attrValue = accountInfo["member_phone"]
        ? accountInfo["member_phone"].substring(0, 1) + "**"
        : "";
    }
  }

  if (attr === "member_name") {
    isMemberName = true;

    if (attrValue !== "") {
      attrValue = accountInfo["member_name"] ? accountInfo["member_name"] : "";
    }
  }

  let isDisable = false;
  let buttonValue = i18n.t("profile.edit");
  let requiredVerify =
    attr === "member_name" ||
    // attr === "member_email" ||
    attr === "member_phone" ||
    attr === "member_birthday";

  let isVerify = false;
  let hide = false;

  if (requiredVerify) {
    if (attr === "member_name" || attr === "member_birthday") {
      isVerify = !config.features.ICVerification
        ? accountInfo.check_pass_account
        : accountInfo.member_name !== "";
    }
    if (attr === "member_email") {
      isVerify = accountInfo.check_pass_email;
    }
    if (attr === "member_phone") {
      isVerify = accountInfo.check_pass_phone;
      if (config.features.Profile_NotAllowChangePhone && isVerify) {
        hide = true;
      }
    }
  }

  if (attr === "member_question") {
    if (attrValue === 0) {
      attrValue = "";
    } else {
      attrValue = i18n.t("profile.setted");
      buttonValue = i18n.t("profile.edit");
    }
  }
  if (attrValue === "" || attrValue == null) {
    if (requiredVerify) {
      attrValue = i18n.t("profile.notVerify");
      buttonValue = i18n.t("profile.nowVerify");
    } else {
      attrValue = i18n.t("profile.notSet");
      buttonValue = i18n.t("profile.setNow");
    }
    isDisable = true;
  } else {
    if (config.features.Profile_ExistingDetails_ViewOnly) {
      if (attr !== "member_password") {
        buttonValue = i18n.t("profile.details");
      }
    }
  }
  if (attr === "member_password") {
    attrValue = i18n.t("profile.setted");
    buttonValue = i18n.t("profile.edit");
    isDisable = false;
  } else if (attr === "member_safe_password") {
    if (attrValue === "set") {
      attrValue = i18n.t("profile.setted");
      buttonValue = i18n.t("common.reset");
      isDisable = false;
    }
  } else if (
    attr === "member_name" ||
    attr === "member_birthday" ||
    attr === "member_phone"
  ) {
    if (attr === "member_name" || attr === "member_phone") {
      if (isVerify === false) {
        buttonValue = i18n.t("profile.nowVerify");
      } else {
        buttonValue = i18n.t("profile.details");
      }
    }
  }

  var currentFormStatus = accountInfo.identityformstatus;
  var hasSubmitted = accountInfo.identityformid ? true : false;

  var status = "";

  if (currentFormStatus === 0 && hasSubmitted === false) {
    //api沒給表單id ，表示可以上傳
    status = "no";
  }
  if (
    (currentFormStatus === 1 && hasSubmitted === true) ||
    currentFormStatus === 1
  ) {
    status = "yes";
  }
  if (
    (currentFormStatus === 2 && hasSubmitted === true) ||
    currentFormStatus === 2
  ) {
    //有給表單id但是狀態是拒絕，也可以上傳
    status = "rejected";
  }
  if (currentFormStatus === 0 && hasSubmitted === true) {
    //有給表單id但狀態沒驗證，不能上傳
    status = "verifying";
  }

  return (
    <ContentWrap>
      <div style={{ display: "flex" }}>
        <ContentLabel>{label}:</ContentLabel>
        <ContentValue style={isDisable ? { color: "#acacac" } : {}}>
          {attrValue}{" "}
          {
            <VerifiedSpan>
              {isMemberName &&
                containMemberName &&
                "(" + i18n.t("verified." + status) + ")"}
            </VerifiedSpan>
          }
        </ContentValue>
      </div>
      <ButtonWrapper>
        {(() => {
          if (buttonValue !== "" && hide !== true) {
            return (
              <ContentButton onClick={() => func(attr, !isVerify)}>
                <ContentButtonLabel>{buttonValue}</ContentButtonLabel>
              </ContentButton>
            );
          }
        })()}
        {((status === "verifying" &&
          attr === "member_name" &&
          config.features.Profile_DisplayEditNameButton) ||
          (attr === "member_phone" && isVerify && edit && !disable)) && (
          <ContentButton onClick={() => func(attr, edit)}>
            <ContentButtonLabel>{i18n.t("profile.edit")}</ContentButtonLabel>
          </ContentButton>
        )}
      </ButtonWrapper>
    </ContentWrap>
  );
}

const BankCardContainer = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  gap: 10px;
`;

const BankCardItem = styled.div`
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
const BankCardAdd = styled.div`
  padding-left: 10px;
  display: flex;
  height: 100%;
  align-items: center;
  &:hover {
    cursor: pointer;
  }
`;
const BankCardAddIcon = styled.div`
  width: 30px;
  height: 30px;
  background: url(${IconAddCardPNG}) no-repeat center;
  background-size: contain;
`;
const BankCardAddText = styled.div`
  margin-left: 15px;
  font-size: 20px;
  font-weight: 500;
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
const BankCardAction = styled.div`
  border: 1px solid #000000;
  border-radius: 5px;
  color: #000000;
  cursor: pointer;
  height: 40px;
  line-height: 40px;
  margin-left: 10px;
  text-align: center;
  width: 114px;
`;

const WalletContainer = styled.div``;

const AllWalletItem = styled.div`
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
`;
const AllWalletTitle = styled.div`
  background-image: linear-gradient(
    180deg,
    ${({ theme }) => theme.primaryGradient},
    ${({ theme }) => theme.primary}
  );
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

const AllWalletInfo = styled.div`
  flex: 1;
  font-size: 28px;
  font-weight: 300;
  line-height: 100px;
  text-align: right;
`;

const WalletItemList = styled.div`
  border: 1px solid #ccc;
  border-bottom-left-radius: 2px;
  border-bottom-right-radius: 2px;
  border-top: 0;
  overflow: hidden;
`;

const WalletItem = styled.div`
  height: 45px;
  padding: 0 20px;
  align-items: center;
  display: flex;
  justify-content: space-between;
  background-color: #ffffff;
  &:nth-child(2n) {
    background-color: #f5f5f5;
  }
`;

const WalletItemTitle = styled.div`
  color: #282828;
  font-size: 14px;
  font-stretch: normal;
  font-style: normal;
  font-weight: 300;
  text-align: left;
`;

const WalletItemInfo = styled.div`
  text-align: right;
`;

const StyledDialog = withStyles({
  root: {
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
  },
  paper: {
    backgroundSize: "cover",
    borderRadius: "5px",
    width: "420px",
  },
})(Dialog);
const DialogContainer = styled.div`
  padding: 27px 32px;

  display: table;
`;
const DialogCloseIconContainer = styled.div`
  //background: url(${IconLoginClosePNG}) no-repeat center;
  width: 50px;
  height: 100%;
  float: right;
  position: absolute;
  right: 5px;
  top: 0px;
  user-select: none;
  cursor: pointer;
  font-size: 24px;
  padding: 8px 12px;
  color: #fff;
`;
const DialogHeader = styled.div`
  height: 50px;
  background-color: ${({ theme }) => theme.primary};
`;
const DialogHeadertitle = styled.div`
  text-align: center;
  margin-left: 45px;
  padding-top: 12px;
  float: left;
  font-size: 18px;
  font-weight: bold;
  color: #ffffff;
  width: 320px;
`;
class Profile extends Component {
  state = {
    openDialog: false,
    dialogTitle: "",
  };
  async componentDidMount() {
    if (this.props.popup) {
      if (
        this.props.popup === "member_phone" &&
        config.features.PromoRoulette_SMSVerification
      ) {
        this.handleButtonClick(this.props.popup, true);
      } else {
        this.handleButtonClick(this.props.popup);
      }
    }
    if (this.props.wallet.bankCardList.length === 0)
      this.props.getBankCardList();
  }
  componentDidUpdate(preProps) {
    if (preProps.popup !== this.props.popup) {
      if (
        this.props.popup === "member_phone" &&
        config.features.PromoRoulette_SMSVerification
      ) {
        this.handleButtonClick(this.props.popup, true);
      } else {
        this.handleButtonClick(this.props.popup);
      }
    }
  }
  // handleVerifyByQuestion = () => {
  //   this.setState({
  //     ...this.state,
  //     openDialog: true,
  //     dialogTitle: "安全问题验证",
  //     dialogComponent: (
  //       <SecurityQuestion
  //         handleCloseDialog={this.handleCloseDialog}
  //         token={this.props.account.token}
  //         memberQuestion={this.props.account.info.member_question}
  //         isVerify={true}
  //         onVerifySuccess={this.handleVerifySuccess}
  //       ></SecurityQuestion>
  //     ),
  //   });
  // };
  // handleEmailVerificationClick = () => {
  //   this.setState({
  //     ...this.state,
  //     openDialog: true,
  //     dialogTitle: "邮件验证",
  //     dialogComponent: (
  //       <Email
  //         handleCloseDialog={this.handleCloseDialog}
  //         email={this.props.account.info.member_email}
  //         token={this.props.account.token}
  //         onhandleVerifySuccess={this.handleVerifySuccess}
  //         isForSecurityQuestion={true}
  //       ></Email>
  //     ),
  //   });
  // };
  handlePhoneVerificationClick = () => {
    this.setState({
      ...this.state,
      openDialog: true,
      dialogTitle: i18n.t("account.phoneVerification"),
      dialogComponent: (
        <PhoneVerification
          handleCloseDialog={this.handleCloseDialog}
          phone={this.props.account.info.member_phone}
          token={this.props.account.token}
          onhandleVerifySuccess={this.handleVerifySuccess}
          isForSecurityQuestion={true}
        ></PhoneVerification>
      ),
    });
  };
  backPhoneVerify = () => {
    this.handleButtonClick("member_safe_password");
  };

  handleVerifySuccess = (
    isForSecurityQuestion,
    isForWithdrawalPassword,
    smsCode
  ) => {
    if (isForSecurityQuestion) {
      // this.setState({
      //   ...this.state,
      //   openDialog: true,
      //   dialogTitle: "设置安全问题",
      //   dialogComponent: (
      //     <SecurityQuestion
      //       handleCloseDialog={this.handleCloseDialog}
      //       token={this.props.account.token}
      //       memberQuestion={0}
      //       isVerify={false}
      //       isReset={true}
      //     ></SecurityQuestion>
      //   ),
      // });
    } else if (isForWithdrawalPassword) {
      this.setState({
        ...this.state,
        openDialog: true,
        dialogTitle: i18n.t("profile.phoneVerification"),
        dialogComponent: (
          <ChangeWithdrawalPassword
            phone={this.props.account.info.member_phone}
            handleCloseDialog={this.handleCloseDialog}
            handleChangeTitle={this.handleChangeTitle}
            token={this.props.account.token}
          ></ChangeWithdrawalPassword>
        ),
      });
    }
  };
  handleButtonClick = (type, edit) => {
    let title = "";
    let component = null;

    switch (type) {
      case "member_fb":
        title = i18n.t("profile.fb.fbAccount");
        component = (
          <FacebookMessenger
            handleCSClick={this.props.onhandleCSClick}
            handleCloseDialog={this.handleCloseDialog}
            account={this.props.account}
          ></FacebookMessenger>
        );
        break;
      case "member_telegram":
        title = i18n.t("profile.telegram.telegramAccount");
        component = (
          <Telegram
            handleCSClick={this.props.onhandleCSClick}
            handleCloseDialog={this.handleCloseDialog}
            account={this.props.account}
          ></Telegram>
        );
        break;
      case "member_line":
        title = i18n.t("profile.line.lineAccount");
        component = (
          <Line
            handleCSClick={this.props.onhandleCSClick}
            handleCloseDialog={this.handleCloseDialog}
            account={this.props.account}
          ></Line>
        );
        break;
      case "member_viber":
        title = i18n.t("profile.viber.viberAccount");
        component = (
          <Viber
            handleCSClick={this.props.onhandleCSClick}
            handleCloseDialog={this.handleCloseDialog}
            account={this.props.account}
          ></Viber>
        );
        break;
      case "member_whatsapp":
        title = i18n.t("profile.whatsapp.whatsappAccount");
        component = (
          <Whatsapp
            handleCSClick={this.props.onhandleCSClick}
            handleCloseDialog={this.handleCloseDialog}
            account={this.props.account}
          ></Whatsapp>
        );
        break;
      case "member_wechat":
        title = i18n.t("profile.wechat.weChatAccount");
        component = (
          <Wechat
            handleCSClick={this.props.onhandleCSClick}
            handleCloseDialog={this.handleCloseDialog}
            account={this.props.account}
          ></Wechat>
        );
        break;
      case "member_qq":
        title = i18n.t("profile.qq.qqAccount");
        component = (
          <QQ
            handleCSClick={this.props.onhandleCSClick}
            handleCloseDialog={this.handleCloseDialog}
            account={this.props.account}
          ></QQ>
        );
        break;
      // case "member_address":
      //   title = "收货地址";
      //   component = (
      //     <Address
      //       handleCloseDialog={this.handleCloseDialog}
      //       account={this.props.account}
      //     ></Address>
      //   );
      //   break;
      case "member_password":
        title = i18n.t("profile.changePassword.title");
        component = (
          <ChangePassword
            handleCloseDialog={this.handleCloseDialog}
            token={this.props.account.token}
          ></ChangePassword>
        );
        break;
      case "member_email":
        title = i18n.t("profile.email.bindEmail");
        component = (
          <Email
            handleCloseDialog={this.handleCloseDialog}
            email={this.props.account.info.member_email}
            token={this.props.account.token}
            isForSecurityQuestion={false}
          ></Email>
        );
        break;
      case "member_birthdate":
        title = i18n.t("profile.birthdate.title");
        component = (
          <Birthdate
            handleCSClick={this.props.onhandleCSClick}
            handleCloseDialog={this.handleCloseDialog}
            account={this.props.account}
          ></Birthdate>
        );
        break;
      case "member_safe_password":
        if (!this.props.account.info.check_pass_email) {
          title = i18n.t("profile.email.bindEmail");
          component = (
            <Email
              handleCloseDialog={this.handleCloseDialog}
              email={this.props.account.info.member_email}
              token={this.props.account.token}
              isForSecurityQuestion={false}
            ></Email>
          );
        } else {
          if (this.props.account.info.member_safe_password !== "set") {
            // first time
            title = i18n.t("profile.withdrawalPassword.title");
            component = (
              <WithdrawalPassword
                value={this.props.account.info.member_safe_password}
                handleCloseDialog={this.handleCloseDialog}
                token={this.props.account.token}
              ></WithdrawalPassword>
            );
          } else {
            // reset
            title = i18n.t("profile.emailVerification");
            component = (
              <ChangeWithdrawalPassword
                email={this.props.account.info.member_email}
                handleCloseDialog={this.handleCloseDialog}
                handleChangeTitle={this.handleChangeTitle}
                token={this.props.account.token}
              ></ChangeWithdrawalPassword>
            );
          }
        }

        break;
      case "member_name":
        title = i18n.t("profile.nameVerify.title");
        component = (
          <IDVerification
            getIDCardNo={this.props.getIDCardNo}
            handleCSClick={this.props.onhandleCSClick}
            handleCloseDialog={this.handleCloseDialog}
            account={this.props.account}
            edit={edit}
          ></IDVerification>
        );
        break;
      case "member_phone":
        title = i18n.t("profile.phone.bindMobile");
        component = (
          <PhoneVerification
            handleCSClick={this.props.onhandleCSClick}
            handleCloseDialog={this.handleCloseDialog}
            phone={this.props.account.info.member_phone}
            token={this.props.account.token}
            isForSecurityQuestion={false}
            account={this.props.account}
            edit={edit}
          ></PhoneVerification>
        );
        break;
      // case "member_question":
      //   component = null;

      //   if (this.props.account.info.member_question === 0) {
      //     // first time
      //     title = "设置安全问题";
      //     component = (
      //       <SecurityQuestion
      //         handleCloseDialog={this.handleCloseDialog}
      //         token={this.props.account.token}
      //         memberQuestion={this.props.account.info.member_question}
      //         isVerify={false}
      //         isReset={false}
      //       ></SecurityQuestion>
      //     );
      //   } else {
      //     // reset
      //     title = "修改安全问题";
      //     component = (
      //       <ResetSecurityQuestion
      //         handleCloseDialog={this.handleCloseDialog}
      //         token={this.props.account.token}
      //         memberQuestion={this.props.account.info.member_question}
      //         passEmail={this.props.account.info.check_pass_email}
      //         passPhone={this.props.account.info.check_pass_phone}
      //         onhandleVerifyByQuestion={this.handleVerifyByQuestion}
      //         onhandlePhoneVerificationClick={this.handlePhoneVerificationClick}
      //         onhandleEmailVerificationClick={this.handleEmailVerificationClick}
      //         onhandleCSClick={this.props.onhandleCSClick}
      //       ></ResetSecurityQuestion>
      //     );
      //   }

      //   break;

      default:
        component = null;
        break;
    }
    this.setState({
      ...this.state,
      openDialog: true,
      dialogTitle: title,
      dialogComponent: component,
    });
  };
  handleChangeTitle = (title) => {
    this.setState({
      dialogTitle: title,
    });
  };
  handleCloseDialog = () => {
    this.setState({ ...this.state, openDialog: false });
  };
  handleManageCard = (cardId) => {
    this.props.onhandleManageCardClick(cardId);
  };
  handleAddCard = () => {
    if (config.features.ChangesNotAllowed) {
      this.props.enqueueSnackbar(i18n.t("card.toEdit"), {
        variant: "error",
      });
    } else {
      this.props.onhandleAddCardClick();
    }
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
    } else if (item.banktype === "Pulsa" || item.banktype === "EWallet") {
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
  gpNameSwitcher = ({ gpcode, name }) => {
    if (gpcode && gpcode.toLowerCase() === "wgfm" && config.brand === "TIGER")
      return "Tiger Sports";
    else return name ? name : "";
  };
  render() {
    const forcedverify =
      (this.props.account.registercompleted === false &&
        config.features.Register_ShowPhone &&
        config.features.ForcedVerification &&
        this.props.popup === "member_phone") ||
      (this.props.account.registercompleted === false &&
        config.features.Register_CustomFlow_IDR &&
        (this.props.popup === "member_phone" ||
          this.props.popup === "member_email"));

    return (
      <Container>
        <LeftContainer>
          <Header>
            <Title>
              <h3>{i18n.t("profile.title")}</h3>
            </Title>
          </Header>
          <InnerWrap>
            {config.features.ICVerification &&
              GetContentWrap(
                this.props.account.info,
                i18n.t("profile.nameVerify.title"),
                "member_name",
                this.handleButtonClick,
                true
              )}
            {GetContentWrap(
              this.props.account.info,
              i18n.t("profile.birthdate.title"),
              "member_birthdate",
              this.handleButtonClick
            )}
            {/* {GetContentWrap(
            this.props.account.info,
            i18n.t("profile.phone.title"),
            "member_phone",
            this.handleButtonClick
          )} */}
            {(config.features.SMSVerification ||
              config.features.PromoRoulette_SMSVerification ||
              config.features.Register_ShowPhone) &&
              GetContentWrap(
                this.props.account.info,
                i18n.t("common.phoneNumber"),
                "member_phone",
                this.handleButtonClick,
                !config.features.Profile_DisableEditPhone,
                config.features.Profile_DisableVerifyPhone
              )}

            {(config.features.EmailVerification ||
              config.features.Register_ShowEmail) &&
              GetContentWrap(
                this.props.account.info,
                i18n.t("common.emailAddress"),
                "member_email",
                this.handleButtonClick
              )}
            {config.features.QQWeChat &&
              GetContentWrap(
                this.props.account.info,
                "QQ",
                "member_qq",
                this.handleButtonClick
              )}

            {config.features.QQWeChat &&
              GetContentWrap(
                this.props.account.info,
                i18n.t("common.wechatNumber"),
                "member_wechat",
                this.handleButtonClick
              )}

            {config.features.CustomMessaging.length > 0 &&
              config.features.CustomMessaging.map((platform) => {
                return GetContentWrap(
                  this.props.account.info,
                  i18n.t("common." + platform),
                  "member_" + platform,
                  this.handleButtonClick
                );
              })}
            {/* {GetContentWrap(
            this.props.account.info,
            "电子邮件",
            "member_email",
            this.handleButtonClick
          )}
          {GetContentWrap(
            this.props.account.info,
            "QQ",
            "member_qq",
            this.handleButtonClick
          )}
          {GetContentWrap(
            this.props.account.info,
            "Wechat",
            "member_wechat",
            this.handleButtonClick
          )}
          {GetContentWrap(
            this.props.account.info,
            "您的生日",
            "member_birthday",
            this.handleButtonClick
          )} */}
            {/* {(() => {
            if (config.brand !== "HKJP" && config.brand !== "GPI") {
              return GetContentWrap(
                this.props.account.info,
                i18n.t("profile.withdrawalPassword.title"),
                "member_safe_password",
                this.handleButtonClick,
                i18n.t("profile.edit")
              );
            }
          })()} */}

            {GetContentWrap(
              this.props.account.info,
              i18n.t("profile.password.title"),
              "member_password",
              this.handleButtonClick
            )}
            {/* {GetContentWrap(
            this.props.account.info,
            "安全问题",
            "member_question",
            this.handleButtonClick
          )}
          {GetContentWrap(
            this.props.account.info,
            "收货地址",
            "member_address",
            this.handleButtonClick
          )} */}
          </InnerWrap>
          <InnerWrap>
            <BankCardContainer>
              {this.props.wallet.bankCardList.map((item, index) => {
                return (
                  <BankCardItem key={index}>
                    <BankCardTitle>
                      {i18n.t("withdrawal.bankCard")}
                    </BankCardTitle>
                    <BankCardInfo>
                      <BankCardNumber>
                        <DynamicFont
                          content={this.handleFilterBankNumber(item)}
                        ></DynamicFont>
                      </BankCardNumber>
                      <BankCardAccount>
                        {" "}
                        {i18n.t("deposit.details.account")}
                      </BankCardAccount>
                      <BankCardType>
                        {item.banktype === "bank"
                          ? item.detail.bankName
                          : item.banktype}
                      </BankCardType>
                    </BankCardInfo>
                    <BankCardAction
                      onClick={() => {
                        this.handleManageCard(item.id);
                      }}
                    >
                      {i18n.t("card.checkDetails")}
                    </BankCardAction>
                  </BankCardItem>
                );
              })}
              {console.log(
                this.props.wallet.bankCardList.length >=
                  config.features.AddCard_MaximumCardAllowed
              )}
              {!(
                this.props.wallet.bankCardList.length >=
                config.features.AddCard_MaximumCardAllowed
              ) && (
                <BankCardItem>
                  <BankCardTitle>{i18n.t("withdrawal.bankCard")}</BankCardTitle>
                  <BankCardAdd
                    onClick={() => {
                      this.handleAddCard();
                    }}
                  >
                    <BankCardAddIcon></BankCardAddIcon>
                    <BankCardAddText>
                      {i18n.t("card.msgAddCard")}
                    </BankCardAddText>
                  </BankCardAdd>
                </BankCardItem>
              )}
            </BankCardContainer>
          </InnerWrap>
        </LeftContainer>
        <RightContainer>
          <WalletContainer>
            <AllWalletItem>
              <AllWalletTitle>
                {i18n.t("web.account.header.total")}
              </AllWalletTitle>
              <AllWalletInfo>
                <DynamicFont
                  content={Common.formatNumberWithThousand(
                    this.props.game.providerList.reduce(
                      (total, item) =>
                        item.transferwallet === true
                          ? (total += item.balance)
                          : (total += 0),
                      0
                    ) + this.props.wallet.mainBalance
                  ).toString()}
                />
              </AllWalletInfo>
            </AllWalletItem>
            <WalletItemList>
              <WalletItem>
                <WalletItemTitle>
                  {i18n.t("web.account.header.mainWallet")}
                </WalletItemTitle>
                <WalletItemInfo>
                  {" "}
                  <DynamicFont
                    content={
                      this.props.wallet.mainSymbol +
                      Common.formatNumberWithThousand(
                        this.props.wallet.mainBalance
                      )
                    }
                  />
                </WalletItemInfo>
              </WalletItem>
              {this.props.game.providerList
                .filter(
                  (item) => item.status === 0 && item.transferwallet === true
                )
                .filter((e) => {
                  if (config.features.MergeEVORTNT) {
                    if (!(e.gpcode === "NTTF" || e.gpcode === "RTTF")) {
                      return e;
                    }
                  } else {
                    return e;
                  }
                })
                .map((item, key) => (
                  <WalletItem key={item.id}>
                    <WalletItemTitle>
                      {this.gpNameSwitcher(item)}
                    </WalletItemTitle>
                    <WalletItemInfo>
                      <DynamicFont
                        content={
                          item.maintenance === 1
                            ? i18n.t("transfer.maintenance")
                            : Common.formatNumberWithCommas(
                                item.balance
                              ).toString()
                        }
                      />
                    </WalletItemInfo>
                  </WalletItem>
                ))}
            </WalletItemList>
          </WalletContainer>
        </RightContainer>
        <StyledDialog
          open={this.state.openDialog}
          onClose={forcedverify ? "" : this.handleCloseDialog}
          onEntering={() => this.props.showDialog(true)}
          onExited={() => this.props.showDialog(false)}
        >
          <DialogHeader>
            <DialogHeadertitle>{this.state.dialogTitle}</DialogHeadertitle>
            {!forcedverify && (
              <DialogCloseIconContainer onClick={this.handleCloseDialog}>
                ✖
              </DialogCloseIconContainer>
            )}
          </DialogHeader>
          <DialogContainer>{this.state.dialogComponent}</DialogContainer>
        </StyledDialog>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    account: state.account,
    wallet: state.wallet,
    game: state.game,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getBalanceList: (token) => dispatch(walletAction.getBalanceList()),
    getBankCardList: () => dispatch(walletAction.getBankCardList()),
    deleteBankCard: (id) => dispatch(walletAction.deleteBankCard(id)),
    addBankCard: (channelid, bankType, detail) =>
      dispatch(walletAction.addBankCard(channelid, bankType, detail)),
    getIDCardNo: () => dispatch(accountAction.getIDCardNo()),
    showDialog: (payload) => {
      dispatch({ type: SHOWING_DIALOG, payload });
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Profile);
