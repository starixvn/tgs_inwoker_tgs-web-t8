import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import CustomTextField from "../../../../../Share/TextField";
import CustomButton from "../../../../../Share/Button";
import IconInputIDPNG from "../../../../../../assets/images/icon-input-id.png";
import IconInputReceivePNG from "../../../../../../assets/images/icon-input-receive.png";
import { withSnackbar } from "notistack";

import i18n from "../../../../../../utils/i18n";
import config from "../../../../../../config/config";
const Container = styled.div``;

const CustomInput = styled.input`
  color: #000;
  font-size: 14px;
  text-align: right;

  font-weight: 500;
  border: 0;
  padding: 10px 20px;
  margin-right: 20px;
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

const InputWrapper = styled.div`
  background: #fff;
  border: solid 1px #b6b6b6;
  margin-top: 10px;
  padding-right: 100px;
  border-radius: 4px;
  width: 350px;
  display: inline-block;
`;

function Default(props) {
  return (
    <Container>
      <CustomTextField
        placeholder={
          config.features.Profile_CustomIdentityPageTranslation
            ? i18n.t("piso.profile.enterFullName")
            : i18n.t("profile.nameVerify.msgPlsEnterName")
        }
        adornment={IconInputReceivePNG}
        handleTextFieldChange={props.onhandleNameChange}
        defaultValue={
          props.check_pass_account ? props.account.info.member_name : ""
        }
        readOnly={props.check_pass_account}
        maxLength={256}
      ></CustomTextField>

      {(() => {
        if (config.features.ICVerification) {
          return (
            <>
              <CustomTextField
                placeholder={
                  config.features.Profile_CustomIdentityPageTranslation
                    ? i18n.t("piso.profile.enterDocumentNumber")
                    : i18n.t("profile.nameVerify.msgPlsEnterICNum")
                }
                adornment={IconInputIDPNG}
                handleTextFieldChange={props.onhandleIDChange}
                defaultValue={props.account.info.member_card_no}
                readOnly={props.account.info.check_pass_account}
                maxLength={256}
              ></CustomTextField>
              {config.features.ICVerificationUpload && (
                <InputWrapper style={{}}>
                  <CustomInput
                    type="file"
                    accept="image/jpg, image/jpeg, image/png, image/tiff"
                    onChange={props.handleFileChange}
                  ></CustomInput>
                </InputWrapper>
              )}
            </>
          );
        }
      })()}
      {(() => {
        if (props.check_pass_account === false) {
          return (
            <CustomButton
              name={i18n.t("common.submit")}
              handleClick={props.onhandleClick}
            ></CustomButton>
          );
        } else return null;
      })()}
    </Container>
  );
}

export default connect(null, null)(withSnackbar(Default));
