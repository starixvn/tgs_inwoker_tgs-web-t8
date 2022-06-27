import React, { Component } from "react";
import { connect } from "react-redux";
import styled, { keyframes } from "styled-components";
import InboxIconPNG from "../../assets/images/inbox-icon.png";
import IconRefreshBalancePNG from "../../assets/images/icon-refresh-balance.png";
import IconRefreshBalanceHoverPNG from "../../assets/images/icon-refresh-balance-hover.png";
import { Link } from "react-router-dom";
import i18n from "../../utils/i18n";
import Common from "../../utils/Common";
import config from "../../config/config";
import { SortedMenuList } from "../../utils/HeaderSorting";
import CustomPopover from "../Share/custompopover";
import { Textfit } from "react-textfit";
export const rotateKeyFrame = keyframes`
  0% {
    transform:rotate(0deg)
  }
  100% {
    transform:rotate(-359deg)
  }
`;
const Container = styled.div`
  font-size: 14px;
  float: right;
  width: 650px;
  display: flex;
  flex-direction: row-reverse;
  line-height: 38px;
  justify-content: space-evenly;
`;
const BtnStyle1 = styled.div`
  width: 68px;
  height: 35px;
  border-radius: 4px;

  float: right;
  margin-right: 10px;
  text-align: center;
  line-height: 220%;
  border: solid 1px #ffffff;
  color: #fff;
  background-image: linear-gradient(
    to top,
    ${({ theme }) => theme.primaryGradient},
    ${({ theme }) => theme.primary}
  );
  &:hover {
    border: solid 1px #fde73f;
    color: #fde73f;
    cursor: pointer;
  }
`;

const TabButton = styled.div`
  color: rgba(255, 255, 255, 0.6);
  &:hover {
    color: rgba(255, 255, 255, 1);
    cursor: pointer;
  }
`;

const BtnLogout = styled.button`
  background-color: ${(props) => props.theme.primary};
  border-radius: 7px;
  color: #fff;
  font-size: 13px;
  line-height: 30px;
  margin: 4px 5px;
  height: 30px;
  padding: 0 20px;
  user-select: none;
  appearance: none;
  border: 0;
  cursor: pointer;
  &:hover {
    filter: grayscale(0.3);
  }
`;

const BtnTransfer = styled(BtnStyle1)``;
const BtnDeposit = styled(BtnStyle1)``;

const BalanceContainer = styled.div`
  color: #ffffff;
  text-align: right;
  float: right;
  &:hover {
    cursor: pointer;
  }
`;

const RefreshBalance = styled.div`
  width: 16px;
  height: 16px;
  float: right;
  margin-top: 12px;
  margin-left: 5px;

  &:hover {
    cursor: pointer;
  }
`;
const RefreshBalanceIcon = styled.div`
  background-image: url(${IconRefreshBalancePNG});
  background-repeat: no-repeat;
  background-position: center;
  width: 16px;
  height: 16px;

  &:hover {
    background-image: url(${IconRefreshBalanceHoverPNG});
    animation: ${rotateKeyFrame} 1s linear 0s infinite;
  }
`;
const BalanceAmountLabel = styled.span`
  color: #edd092;
  font-weight: 700;
`;
const MemberUserName = styled.span`
  color: #edd092;
  font-weight: 700;
`;
const Spliter = styled.div`
  width: 2px;
  height: 16px;
  margin: 12px 10px 0px 10px;
  float: right;
  background-color: rgba(255, 255, 255, 0.2);
`;
const InboxContainer = styled(BalanceContainer)`
  color: #ffffff;
  text-align: right;
  padding: 10px 0px 0 0;
  &:hover {
    cursor: pointer;
  }
`;
const InboxIconImg = styled.img`
  display: inline-block;
  float: right;
  margin-top: 2px;
`;
const InboxCountLabel = styled.span`
  margin-left: 6px;
  color: #fde73f;
  display: inline-block;
  float: right;
`;
const WelcomeContainer = styled(BalanceContainer)`
  color: #f6f6f6;
  float: right;
  margin-right: 0px;
  max-width: 300px;
`;
const CustomLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  &:hover {
    cursor: pointer;
  }
`;

const CustomPopoverContent = styled.div`
  min-width: 225px;
  padding: 10px;
  display: grid;
  max-height: 400px;
  overflow: auto;
  user-select: none;
  ::-webkit-scrollbar {
    width: 5px;
  }

  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  ::-webkit-scrollbar-thumb {
    background: #888;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

const GameType = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 10px;
`;

const GameTypeName = styled.div`
  padding-bottom: 10px;
  color: ${({ theme }) => theme.popoverGameTypeText};
  opacity: 0.65;
`;

const BrandAndBalance = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 2.5px 0;
  color: ${({ theme }) => theme.popoverText};
`;

const Brand = styled.div`
  padding-left: 5px;
  font-size: 12px;
`;

const Balance = styled.div`
  text-align: right;
  opacity: 0.75;
`;

const BrandAndBalanceButBigger = styled(BrandAndBalance)`
  border-bottom: solid 1px #000;
  margin-bottom: 10px;
  padding-bottom: 10px;
  font-weight: bold;
  color: ${({ theme }) => theme.primary};
  font-size: 20px;
`;

const MemberContainer = (props) => {
  const vipSwitcher = (rank) => {
    switch (rank) {
      case 1:
        return "VIP 1";
      case 2:
        return "Silver";
      case 3:
        return "Gold";
      case 4:
        return "Platinum";
      case 5:
        return "Diamond";
      default:
        return;
    }
  };

  const handleTransfer = (e) => {
    if (config.features.NewTransferUI) {
      handleClick(e);
    } else {
      props.onhandleTransfer();
    }
  };

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const totalBalance =
    props.wallet.mainBalance +
    props.game.providerList
      .filter((item) => item.status === 0 && item.transferwallet === true)
      .reduce((a, v) => (a = a + v.balance), 0);

  return (
    <Container>
      <BalanceContainer>
        <span>{i18n.t("web.header.mainAccount")}:</span>
        <BalanceAmountLabel
          onClick={(e) => {
            handleTransfer(e);
          }}
        >
          {Common.formatNumberWithThousand(
            props.wallet.mainBalance +
              props.game.providerList
                .filter(
                  (item) => item.status === 0 && item.transferwallet === true
                )
                .reduce((a, v) => (a = a + v.balance), 0)
          )}
        </BalanceAmountLabel>

        <RefreshBalance onClick={props.onhandleRefreshBalanceClick}>
          <RefreshBalanceIcon></RefreshBalanceIcon>
        </RefreshBalance>
        <CustomPopover
          open={open}
          anchorEl={anchorEl}
          handleClose={handleClose}
        >
          <div>
            <BrandAndBalanceButBigger>
              <div style={{ paddingRight: 30 }}>
                {i18n.t("web.header.mainAccount")}
              </div>
              <div
                style={{
                  width: 150,
                  display: "flex",
                  alignSelf: "flex-end",
                  justifyContent: "flex-end",
                }}
              >
                <Textfit mode="single">
                  {Common.formatNumberWithThousand(totalBalance)}
                </Textfit>
              </div>
            </BrandAndBalanceButBigger>
          </div>
          {SortedMenuList.map((item, key) => {
            return (
              <GameType>
                <GameTypeName>{i18n.t(item.title)}</GameTypeName>
                {props.game.homePageGameList
                  .filter((game) => {
                    return item.gameType.indexOf(game.type) >= 0;
                  })
                  .map((brand, index) => {
                    return props.game.providerList
                      .filter((item) => {
                        return (
                          item.abbreviation === brand.abbreviation &&
                          item.transferwallet === true
                        );
                      })
                      .map((data, index) => {
                        return (
                          <BrandAndBalance>
                            <Brand>
                              {i18n.t(`${data.abbreviation}.${item.path}`)}
                            </Brand>
                            <Balance>
                              {data.maintenance === 1
                                ? i18n.t("transfer.maintenance")
                                : Common.formatNumberWithCommas(data.balance)}
                            </Balance>
                          </BrandAndBalance>
                        );
                      });
                  })}
              </GameType>
            );
          })}
        </CustomPopover>
      </BalanceContainer>

      <BtnLogout onClick={props.onhandleLogout}>
        {i18n.t("web.header.logout")}
      </BtnLogout>

      <WelcomeContainer>
        <CustomLink to={"/" + i18n.language + "/account/profile"}>
          {/* {i18n.t("web.header.welcomBack")}{" "} */}
          <MemberUserName>
            {props.account.info.member_username}(
            {config.features.CustomVIP
              ? vipSwitcher(props.account.info.member_level_id)
              : "VIP" + props.account.info.member_level_id}
            )
          </MemberUserName>
        </CustomLink>
      </WelcomeContainer>

      <TabButton onClick={props.onhandleInboxClick}>
        {i18n.t("web.account.inbox")} ({props.account.info.message_num})
      </TabButton>

      {props.game.containTransferWallet && !config.features.NewTransferUI && (
        <TabButton onClick={props.onhandleTransfer}>
          {i18n.t("web.header.transfer")}
        </TabButton>
      )}

      <TabButton onClick={props.onhandleWithdrawal}>
        {i18n.t("web.account.withdrawal")}
      </TabButton>

      <TabButton onClick={props.onhandleDeposit}>
        {i18n.t("web.header.deposit")}
      </TabButton>

      {/* <InboxContainer onClick={props.onhandleInboxClick}>
          <InboxCountLabel>
            {props.account.info.message_num}
          </InboxCountLabel>
          <InboxIconImg src={InboxIconPNG}></InboxIconImg>
        </InboxContainer> */}
    </Container>
  );
};

export default MemberContainer;
