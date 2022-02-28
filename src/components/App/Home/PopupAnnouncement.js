import React, { Component } from "react";
import Dialog from "@material-ui/core/Dialog";
import styled from "styled-components";
import { withStyles } from "@material-ui/core/styles";
import LoginBGPNG from "../../../assets/images/login-bg.png";
import IconLoginClosePNG from "../../../assets/images/icon-login-close.png";
const StyledDialog = withStyles({
  root: {
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",

    "& .MuiPaper-root": {
      backgroundColor: "transparent",
      borderRadius: "15px",
    },
  },
})(Dialog);
const Container = styled.div`
  width: 506px;
  background: #fff;//url(${LoginBGPNG});
  background-attachment: fixed;
  background-position: center;
  display: table;
`;
const CloseIconContainer = styled.div`
  background: url(${IconLoginClosePNG}) no-repeat;
  width: 28px;
  height: 28px;
  float: right;
  margin: 10px 10px 0 0;
  &:hover {
    cursor: pointer;
  }
`;
const TitleContainer = styled.div`
  text-align: center;

  font-size: 30px;

  color: ${({ theme }) => theme.secondary};
`;
const FormContainer = styled.div`
  margin: 30px 60px 40px 60px;
  padding: 0 3px;
`;
class PopupAnnouncement extends Component {
  render() {
    return (
      <StyledDialog open={this.props.open} onClose={this.props.onClose}>
        <Container>
          <CloseIconContainer
            viewBox="4 4 16 16"
            onClick={this.props.onClose}
          ></CloseIconContainer>
          <div className="clear"></div>
          <TitleContainer>{this.props.header}</TitleContainer>
          <FormContainer
            dangerouslySetInnerHTML={{
              __html: this.props.text.replace(/\n/g, "<br />"),
            }}
          ></FormContainer>
        </Container>
      </StyledDialog>
    );
  }
}

export default PopupAnnouncement;
