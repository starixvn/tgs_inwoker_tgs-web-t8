import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import DynamicFont from "react-dynamic-font";
import { withStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";

import AppBar from "@material-ui/core/AppBar";

import IconDepositPNG from "../../../assets/images/icon-deposit.png";
import IconWithdrawPNG from "../../../assets/images/icon-withdraw.png";
import IconTransferPNG from "../../../assets/images/icon-transfer.png";
import IconReportPNG from "../../../assets/images/icon-report.png";
import IconProfilePNG from "../../../assets/images/icon-profile.png";

import IconBonusPNG from "../../../assets/images/icon-bonus.png";
import IconInboxPNG from "../../../assets/images/icon-inbox.png";

import IconDepositActivePNG from "../../../assets/images/icon-deposit-active.png";
import IconWithdrawActivePNG from "../../../assets/images/icon-withdraw-active.png";
import IconTransferActivePNG from "../../../assets/images/icon-transfer-active.png";
import IconReportActivePNG from "../../../assets/images/icon-report-active.png";
import IconProfileActivePNG from "../../../assets/images/icon-profile-active.png";

import IconBonusActivePNG from "../../../assets/images/icon-bonus-active.png";
import IconInboxActivePNG from "../../../assets/images/icon-inbox-active.png";

import i18n from "../../../utils/i18n";
import Common from "../../../utils/Common";
import config from "../../../config/config";

export const rotateKeyFrame = keyframes`
  0% {
    transform:rotate(0deg)
  }
  100% {
    transform:rotate(-359deg)
  }
`;

const StyledAppBar = withStyles((theme) => ({
  root: {
    backgroundColor: "#000000",
    "& .MuiToolbar-regular": {
      margin: "0 auto",
    },
  },
}))(AppBar);

const CustomAppBar = styled(StyledAppBar)`
  display: ${({ hide }) => {
    return hide ? "none" : "block";
  }};
`;

const InnerWrap = styled.div`
  margin: 0 auto;
  width: 100%;
  font-size: 14px;
`;

const TopContainerWrap = styled.div`
  background-color: #2c2c2c;
`;
const TopContainer = styled.div`
  height: 21px;
  background-color: #2c2c2c;
  display: flex;
  justify-content: space-between;
  padding: 2px 10px;
  font-size: 11px;
  float: right;
`;


const BottomContainer = styled.div`
  margin: 0 auto;
  height: 85px;
  max-width: 1280px;
  display: grid;
  grid-template-columns: 230px auto;
  grid-gap: 5px;
  @media (max-width: 1279px) {
    grid-template-columns: auto;
  }
`;
const LogoContainer = styled.div`
  background-image: url("${(props) => props.img}");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: left center;
  width: 100%;
  height: 48px;
  margin-top: 10px;
  float: left;
  &:hover {
    cursor: pointer;
  }
  @media (max-width: 1279px) {
    display: none;
  }
`;

const RightMenuContainer = styled.div`
  margin-left: 70px;
  float: right;
`;
const RightMenuUL = styled.ul`
  display: flex;
  align-items: stretch; /* Default */
  justify-content: flex-end;
  width: 100%;
  list-style: none;
  padding: 8px 0;
  margin: 0;
  height: 68px;
`;

const RightMenuTextSpan = styled.span`
  font-size: ${(props) => (i18n.language === "vi-VN" ? "15px" : "16px")};

  margin: 0 auto;
  display: block;

  padding-top: 6px;
  text-align: center;
`;


const RightMenuLI = styled.li`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 130px;
  height: 95%;
  color: #f6f6f6;
  border-bottom: solid 4px transparent;
  @media (max-width: 925px) {
    width: 100px;
  }
  @media (max-width: 770px) {
    width: 80px;
  }
  @media (max-width: 650px) {
    width: 100px;
  }
  
  &:hover {
    color: #20d0ff;
    cursor: pointer;
  }
  background-repeat: no-repeat;
  background-position: 15% center;
  ${(props) =>
    props.active
      ? `
  color: #20d0ff;

  `
      : `
  
  `}
`;

const MenuImgFrame = styled.div`
  height: 41px;
  width: 45px;
  float: left;
  display: block;
  background-size: 25px 25px;
  ${(props) =>
    props.active
      ? `background: url(${props.activeImg}) no-repeat center center;`
      : `background: url(${props.img}) no-repeat center center;`}

  ${RightMenuLI}:hover & {
    background: url(${(props) => props.activeImg}) no-repeat center center;
  }
`;

const styles = {
  root: {
    flexGrow: 1,
  },
  show: {
    transform: "translateY(0)",
    transition: "transform .5s",
  },
  hide: {
    transform: "translateY(-110%)",
    transition: "transform .5s",
  },
  minIcon: {
    width: "25px",
    height: "25px",
    margin: "20px 0 0 15px",
    transition: "all .3s",
  },
  maxIcon: {
    width: "100%",
    height: "40px",
    margin: "30px 0 0 0",
    transition: "all .3s",
  },
  maxLabel: {
    transition: "all .3s",
  },
  minLabel: {
    transition: "all .3s",
    transform: "translate(18px, -30px)",
  },
  maxMenu: {
    height: "110px",
    transition: "height .3s",
  },
  minMenu: {
    height: "64px",
    transition: "height .3s",
  },
};

function Header(props) {
  const { classes } = props;
  const [selected, setSelected] = useState("/");
  const [shouldShow, setShouldShow] = useState(null);
  const MenuItemList = [
    {
      path: "profile",
      title: i18n.t("web.account.profile"),
      canDisplay: true,
      img: IconProfilePNG,
      activeImg: IconProfileActivePNG
    },
    {
      path: "deposit",
      title: i18n.t("web.account.deposit"),
      canDisplay: true,
      img: IconDepositPNG,
      activeImg: IconDepositActivePNG
    },
    {
      path: "withdrawal",
      title: i18n.t("web.account.withdrawal"),
      canDisplay: true,
      img: IconWithdrawPNG,
      activeImg: IconWithdrawActivePNG
    },
    {
      path: "transfer",
      title: i18n.t("web.account.transfer"),
      canDisplay: props.game.containTransferWallet,
      img: IconTransferPNG,
      activeImg: IconTransferActivePNG
    },
    {
      path: "report",
      title: i18n.t("web.account.report"),
      canDisplay: true,
      img: IconReportPNG,
      activeImg: IconReportActivePNG
    },
    {
      path: "affiliate",
      title: i18n.t("web.account.affiliate"),
      canDisplay: config.features.HaveAffiliateFeature,
      img: IconBonusPNG,
      activeImg: IconBonusActivePNG
    },
    {
      path: "inbox",
      title: i18n.t("web.account.inbox"),
      canDisplay: true,
      img: IconInboxPNG,
      activeImg: IconInboxActivePNG
    },
  ];

  useEffect(() => {
    console.log(props.activePage)
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScroll = (evt) => {
    const lastScroll = window.scrollY;
    if (lastScroll > 160) {
      setShouldShow(false);
      this.setState({ ...this.state, shouldShow: false });
    } else {
      setShouldShow(true);
    }
    return;
  };

  const onhandleLogoClick = () => {
    props.setActivePage("/")
    props.history.push("/" + i18n.language + "/");
  };

  return (
    <CustomAppBar>
      <InnerWrap>
        <TopContainerWrap>
          <TopContainer> {i18n.t("web.header.welcomBack")}{" "} {props.info.member_username}</TopContainer>
        </TopContainerWrap>
        <BottomContainer>
          <LogoContainer
            img={props.general.brand && props.general.brand.desktopLogoUrl}
            onClick={onhandleLogoClick}
            className={`${
              shouldShow === null
                ? classes.maxMenu
                : shouldShow
                ? classes.maxMenu
                : classes.minMenu
            }`}
          ></LogoContainer>
          <RightMenuContainer>
            <RightMenuUL
              className="top-menu"
              className={`${
                shouldShow === null
                  ? classes.maxMenu
                  : shouldShow
                  ? classes.maxMenu
                  : classes.minMenu
              }`}
            >
              {MenuItemList.map((item, index) => {
                return item.canDisplay ? (
                  <RightMenuLI
                    key={index}
                    active={props.activePage === `${item.path}`}
                    activeImg={item.activeImg}
                    onClick={() => props.onhandleClickTab(item.path)}
                  >
                    <MenuImgFrame active={props.activePage === `${item.path}`} img={item.img} activeImg={item.activeImg}></MenuImgFrame>
                    <RightMenuTextSpan
                      className={`${
                        shouldShow === null
                          ? classes.maxLabel
                          : shouldShow
                          ? classes.maxLabel
                          : classes.minLabel
                      }`}
                    >
                      {item.title}
                    </RightMenuTextSpan>
                  </RightMenuLI>
                ) : null;
              })}
            </RightMenuUL>
          </RightMenuContainer>
        </BottomContainer>
      </InnerWrap>
    </CustomAppBar>
  );
}

export default withRouter(withStyles(styles)(Header));
