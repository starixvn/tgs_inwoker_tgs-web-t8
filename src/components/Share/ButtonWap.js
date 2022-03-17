import React, { Component } from "react";
import styled from "styled-components";
const StyleButton = styled.div`
  width: 637px;
  height: 94px;
  border-radius: 8px;

  ${(props) =>
    props.styledtype === "2"
      ? "background: #ABABAB;"
      : `background: ${props.theme.primary}`}

  margin:0 auto;
  font-size: 34px;

  color: ${({ theme }) => theme.buttonText};

  padding-top: 20px;
  text-align: center;

  ${({ disabled }) => {
    return disabled ? " opacity: 0.6;pointer-events: none;" : "";
  }}
`;

class ButtonWap extends Component {
  render() {
    return (
      <StyleButton
        onClick={this.props.onClick}
        {...this.props}
        disabled={this.props.disableButton}
      >
        {this.props.name}
      </StyleButton>
    );
  }
}
export default ButtonWap;
