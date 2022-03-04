import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { Select, FormControl, withStyles } from "@material-ui/core";
import CustomTextField from "../../../Share/TextField";
import Button from "../../../Share/Button";
import i18n from "../../../../utils/i18n";
import config from "../../../../config/config";
import { withSnackbar } from "notistack";
const Container = styled.div`
  width: 100%;
`;
const SubTitle = styled.div`
  font-size: 22px;
  font-weight: bold;
  padding: 0 10px 10px;
  color: #16242a;
  margin-top: 0px;
`;

const TextFieldItem = styled.div`
  display: flex;
`;
const TextFieldLabel = styled.div`
  font-size: 16px;
  text-align: right;
  width: 280px;
  color: #818181;
  margin-right: 20px;
`;
const TextFieldContainer = styled.div`
  //margin: 0 auto;
  //display: table;
  margin-left: 10px;
`;

const ActionContainer = styled.div`
  margin: 0 auto;
  display: flex;
  justify-content: center;
`;

class ManageCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      labelList: {
        Bank:{
          name: i18n.t("card.addCard.BankAccountName"),
          bankName: i18n.t("card.addCard.BankName"),
          bankBranch: i18n.t("card.addCard.branch"),
          bankAccount: i18n.t("common.withdrawalNumber"),
          address: i18n.t("common.withdrawalNumber"),
        },
        FPS: {
          name: i18n.t("profile.nameVerify.title"),
          username: i18n.t("profile.nameVerify.title"),
          phone: i18n.t("profile.phone.title"),
        },
        Crypto: {
          address: i18n.t("common.withdrawalNumber"),
        }
      },
    };
  }

  componentDidMount() {}
  componentDidUpdate(preProps, preState) {}

  isEmpty = (obj) => {
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) return false;
    }
    return true;
  };

  genCardDetails = () => {
    if (this.isEmpty(this.props.cardDetail)) {
      return null;
    }

    return Object.keys(this.props.cardDetail.detail).map((key) => {
      let info = this.props.cardDetail.detail[key];
      let field = this.state.labelList[this.props.cardDetail.banktype][key];
      if (key === "address" || key === "phone" || key === "bankAccount") {
        let last4Digits = this.props.cardDetail.detail[key].slice(-4);
        info = last4Digits.padStart(
          this.props.cardDetail.detail[key].length,
          "*"
        );
      }
      return (
        <TextFieldItem>
          <TextFieldLabel>{field}</TextFieldLabel>
          <TextFieldContainer>{info}</TextFieldContainer>
        </TextFieldItem>
      );
    });
  };

  render() {
    return (
      <Container>
        {this.genCardDetails()}
        <ActionContainer>
          <Button
            grayMode={true}
            name={i18n.t("common.back")}
            width={257}
            marginRight={20}
            handleClick={this.props.onhandleBackClick}
          ></Button>
          {!(
            config.features.AddCard_NotAllowedEditDelete ||
            config.features.ChangesNotAllowed
          ) && (
            <Button
              name={i18n.t("card.remove")}
              width={255}
              handleClick={() =>
                this.props.onhandleDeleteCardClick(this.props.cardDetail.id)
              }
            ></Button>
          )}
        </ActionContainer>
      </Container>
    );
  }
}

export default connect(null, null)(withSnackbar(ManageCard));
