import React from "react";
import styled from "styled-components";
import { Component } from "react";
import i18n from "../../../../utils/i18n";
import config from "../../../../config/config";

const TabButtonContainer = styled.div`
  padding: 6px;
  margin-bottom: 20px;
  gap: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const TabButton = styled.div`
  color: #535353;
  text-align: left;
  width: 100%;
  border-radius: 5px;
  transition: all 0.3s;
  background-color: #fff;
  box-shadow: 0 2px 4px 0 rgb(0 0 0 / 25%);
  height: 100px;
  width: 100%;
  padding: 30px 0 0 30px;
  &:hover {
    cursor: pointer;
    background-color: #ebebeb;
    box-shadow: inset 0 0 0 1px #085e49, 0 0 2px rgb(0 0 0 / 50%);
  }
`;

const TabLabel = styled.h3`
  margin: 0;
  color: #535353;
  font-size: 20px;
  font-stretch: normal;
  font-style: normal;
  font-weight: 300;
  line-height: 1.1;
`;

const SmallTabLabel = styled.small`
  margin: 0;
  font-size: 13px;
  font-weight: 100;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: ${(props) => props.theme.primary};
`;

class DepositTypeSelection extends Component {
  render() {
    const {
      depositTypeList,
      selectedPaymentIndex,
      onhandleTabClick,
    } = this.props;

    return (
      <TabButtonContainer>
        {depositTypeList
          .sort(function (a, b) {
            return a.displayorder - b.displayorder;
          })
          .map((item, index) => {
            var customPaymentCodeName = "";
            {
              config.features.DepositCustomPaymentNames.length > 0 &&
                config.features.DepositCustomPaymentNames.map((platform) => {
                  if (platform.code === item.paymentcode.toLowerCase()) {
                    customPaymentCodeName = platform.customName;
                  }
                });
            }
            return (
              <TabButton
                key={index}
                onClick={() => onhandleTabClick(item, index)}
                active={selectedPaymentIndex === index}
              >
                <TabLabel>
                  {" "}
                  {customPaymentCodeName !== ""
                    ? customPaymentCodeName
                    : i18n.t(item.paymentcode)}
                </TabLabel>
                <SmallTabLabel>
                  {" "}
                  {customPaymentCodeName !== ""
                    ? customPaymentCodeName
                    : i18n.t(item.paymentcode)}
                </SmallTabLabel>
              </TabButton>
            );
          })}
      </TabButtonContainer>
    );
  }
}

export default DepositTypeSelection;
