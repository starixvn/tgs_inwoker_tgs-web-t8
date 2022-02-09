import React from "react";
import { connect } from "react-redux";
import { Grid } from "@material-ui/core";
import styled from "styled-components";
import { withRouter } from "react-router-dom";

import HomeFooterIcon1PNG from "../../assets/images/home-footer-icon1.png";
import HomeFooterIcon1ActivePNG from "../../assets/images/home-footer-icon1-active.png";
import Common from "../../utils/Common";
import config from "../../config/config";
import i18n from "../../utils/i18n";
import Slider from "react-slick";
import { AppHistory } from "../../history/History";
const Container = styled.div`
  width: 100%;
  height: 250px;
  background: #414755;
  display: ${({ hide }) => {
    return hide ? "none" : "block";
  }};
`;
const InnerWrap = styled.div`
  margin: 0 auto;
  width: 1280px;
  font-size: 14px;
`;
const TopContainer = styled.div`
  width: 1100px;
  margin: 0 auto;
  padding-top: 18px;
`;
const TopLeftContainer = styled.div`
  width: 205px;
  margin-left: 10px;
  float: left;
`;
const TopLeftContent = styled.div`
  width: 200px;
  height: 155px;
  border-radius: 20px;
  border: dashed 1px #f6f6f6;
`;
const TopLeftContentTopContainer = styled.div``;
const RestricContainer = styled.div`
  padding-top: 11px;
`;
const RestricImage = styled.img`
  margin: 0 18px;
`;
const TopLeftContentBottomContainer = styled.div`
  font-size: 11px;
  ${(props) =>
    props.language === "en-US" ? `line-height:0.95em;` : `line-height:1.6;`}
  text-align: justify;
  color: #f6f6f6;
  padding: ${(props) =>
      props.language === "en-US" ? `0px  10px` : `10px 20px`}
    0 ${(props) => (props.language === "en-US" ? `10px` : `20px`)};
`;

const TopCenterContainer = styled.div`
  float: left;
  margin-left: 42px;
  padding-top: 28px;
`;
const TopRightContainer = styled.div`
  width: 250px;
  height: 180px;
  float: right;
  margin-right: 0px;
`;
const AffAndCSContainer = styled.div`
  width: 238px;
  height: 62px;
  border-radius: 3px;
  border: solid 1px #f6f6f6;
  color: #f6f6f6;
`;
const AffContainer = styled(AffAndCSContainer)`
  margin-top: 17px;

  &:hover {
    cursor: pointer;
  }
`;
const AffImg = styled.div`
  background: url(${(props) => props.img}) no-repeat;
  background-position: center;
  width: 60px;
  height: 100%;
  float: left;
`;
const CSImg = styled.div`
  background: url(${(props) => props.img}) no-repeat;
  background-position: center;
  width: 60px;
  height: 100%;
  float: left;
`;
const AffCSRightContent = styled(Grid)`
  height: 63px;
  width: 170px;
  float: right;
`;
const AffCSRightContentLine1 = styled(Grid)`
  font-size: 14px;

  display: block;
`;
const AffCSRightContentLine2 = styled(Grid)`
  font-size: 14px;
  display: block;
`;
const AffRightContentLine1 = styled(AffCSRightContentLine1)``;
const AffRightContentLine2 = styled(AffCSRightContentLine2)``;
const CSContainer = styled(AffAndCSContainer)`
  margin-top: 5px;
`;
const MiddleContainer = styled.div`
  width: 100%;
`;
const MiddleInnerWrap = styled.div`
  display: block;
  margin: 0 auto;
  width: 1280px;
  padding: 50px 0px;
`;
const ProductUL = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0px auto;
  display: table;
`;

const ProductLI = styled.li`
  list-style: none;
  padding: 20px 0px;
  margin: 0;
  display: inline-block;
`;
const BrandsImage = styled.div`
  opacity: 1;
  height: 80px;
  width: 150px;
  background: url(${(props) => props.img}) no-repeat center;
  background-size: contain;
  border: none;
`;
const BottomContainer = styled.div`
  height: 70px;
  width: 1280px;
  padding-top: 16px;
  margin: 0 auto;
  color: #f6f6f6;
`;
const CopyRightLine1 = styled.span`
  font-size: 12px;

  margin: 0 auto;
  display: block;
  text-align: center;
`;
const CopyRightLine2 = styled.span`
  font-size: 12px;

  margin: 0 auto;
  display: block;
  text-align: center;
`;
const Version = styled.span`
  font-size: 12px;

  margin: 0 auto;
  display: block;
  text-align: center;
`;

const FooterLabelCotanier = styled.div`
  text-align: center;
`;
const FooterIconFrame = styled.div`
  width: 100%;
  height: 50px;
`;

const FooterIcon1 = styled(FooterIconFrame)`
  background: url(${HomeFooterIcon1PNG}) no-repeat center;
`;
const FooterColumn = styled.div`
  border-right: solid 1px #f6f6f6;
  padding-right: 30px;
  float: left;
  padding-top: 15px;
  width: 200px;
  &:hover ${FooterIcon1} {
    background: url(${HomeFooterIcon1ActivePNG}) no-repeat center;
  }
`;
const FooterATag = styled.div`
  font-size: 14px;
  color: #f6f6f6;
  display: inline-block;

  &:hover {
    cursor: pointer;
  }
  &:hover ${FooterColumn} {
    color: #fde73f;
  }
`;

const QRContainerVisit = styled.div`
  float: left;
  margin: 0 20px;
`;
const QRImg = styled.div`
  width: 80px;
  height: 80px;
  margin: 0 auto;
  display: block;
  padding: 5px;
  background-color: #ffffff;
`;

const QRDownloadImg = styled.div`
  width: 80px;
  height: 80px;
  margin: 0 auto;
  display: block;
  background: url(${(props) => props.src}) no-repeat;
  background-size: contain;
  text-align: center;
  color: #000;
  font-size: 18px;
  font-weight: bold;
  line-height: 80px;
`;
const QRRedTitle = styled.div`
  text-align: center;
  font-size: 12px;
  color: #f6f6f6;
  margin-top: 5px;
`;
function handleOpenLink(url) {
  Common.PopupCenter(url, "", 1280, 720);
}

const ThirdPartyLogoHolder = styled.div`
  display: flex !important;
  justify-content: center;
  width: 175px;
`;

function Footer(props) {
  const settings = {
    className: "footer",
    dots: false,
    arrows: false,
    slidesToShow: 6,
    slidesToScroll: 6,
    autoplay: true,
    speed: 500,
    autoplaySpeed: 222000,
    cssEase: "linear",

    infinite: true,
  };
  return (
    <Container hide={props.hide}>
      {
        //  <InnerWrap>
        //  <TopContainer>
        //    <TopLeftContainer>
        //      <TopLeftContent>
        //        <TopLeftContentTopContainer>
        //          <RestricContainer>
        //            <RestricImage src={FooterHandIconPNG}></RestricImage>
        //            <RestricImage src={FooterArrowIconPNG}></RestricImage>
        //            <RestricImage src={Footer18plusIconPNG}></RestricImage>
        //          </RestricContainer>
        //        </TopLeftContentTopContainer>
        //        <TopLeftContentBottomContainer language={i18n.language}>
        //          {i18n
        //            .t("web.footer.cautionText")
        //            .replace(/{brand}/g, config.brand)}
        //        </TopLeftContentBottomContainer>
        //      </TopLeftContent>
        //    </TopLeftContainer>
        //    <TopCenterContainer>
        //      <FooterATag
        //        onClick={() => {
        //          AppHistory.push("/" + i18n.language + "/download");
        //          window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        //        }}
        //      >
        //        <FooterColumn>
        //          <FooterIcon1></FooterIcon1>
        //          <FooterLabelCotanier>
        //            {i18n.t("web.footer.appDownload")}
        //            <br />
        //            {i18n.t("web.footer.appDownloadLine2")}
        //          </FooterLabelCotanier>
        //        </FooterColumn>
        //        <QRContainerVisit>
        //          <QRImg>
        //            <QRCode
        //              value={`${window.location.protocol}//${window.location.hostname}`}
        //              size={70}
        //            />
        //          </QRImg>
        //          <QRRedTitle>{i18n.t("web.footer.wapQRCodeDesc")}</QRRedTitle>
        //        </QRContainerVisit>
        //        <QRContainerVisit>
        //          <QRDownloadImg
        //            src={`${process.env.PUBLIC_URL}/assets/images/qrcode/appdownload-qr-soon.png`}
        //          >
        //            {i18n.t("common.comingSoon")}
        //          </QRDownloadImg>
        //          <QRRedTitle>{i18n.t("web.footer.appQRCodeDesc")}</QRRedTitle>
        //        </QRContainerVisit>
        //      </FooterATag>
        //    </TopCenterContainer>
        //    <TopRightContainer>
        //      <AffContainer onClick={() => alert(i18n.t("common.comingSoon"))}>
        //        <AffImg img={FooterAffIconPNG}></AffImg>
        //        <AffCSRightContent
        //          direction="row"
        //          justifyContent="flex-start"
        //          alignItems="center"
        //        >
        //          <AffRightContentLine1>
        //            {i18n.t("web.footer.affiliateCampaign")}
        //          </AffRightContentLine1>
        //          <AffRightContentLine2>
        //            {i18n.t("web.footer.affiliateCampaignLine2")}
        //          </AffRightContentLine2>
        //        </AffCSRightContent>
        //      </AffContainer>
        //      <CSContainer>
        //        <CSImg img={Footer24CSIconPNG}></CSImg>
        //        <AffCSRightContent
        //          container
        //          direction="row"
        //          justifyContent="flex-start"
        //          alignItems="center"
        //        >
        //          <AffCSRightContentLine1>
        //            {i18n.t("common.csPhoneNumber")}
        //          </AffCSRightContentLine1>
        //          <AffCSRightContentLine2>
        //            {i18n.t("web.footer.customerServiceHotline")}
        //          </AffCSRightContentLine2>
        //        </AffCSRightContent>
        //      </CSContainer>
        //    </TopRightContainer>
        //  </TopContainer>
        //</InnerWrap>
      }

      <MiddleContainer>
        <MiddleInnerWrap>
          <Slider {...settings}>
            {(() => {
              return props.game.providerList
                .filter((gp) => {
                  if (gp.abbreviation.includes("TCG")) {
                    return gp.abbreviation === "TCG_SEA";
                  } else {
                    return gp;
                  }
                })
                .map((item, index) => {
                  return (
                    <ThirdPartyLogoHolder>
                      <BrandsImage
                        img={
                          process.env.PUBLIC_URL +
                          `/assets/images/provider/${item.abbreviation.toLowerCase()}.png`
                        }
                      />
                    </ThirdPartyLogoHolder>
                  );
                });
            })()}
          </Slider>
        </MiddleInnerWrap>
      </MiddleContainer>
      <BottomContainer>
        <CopyRightLine1>{i18n.t("web.footer.copyright")}</CopyRightLine1>
        <CopyRightLine2>
          {i18n
            .t("web.footer.copyrightLine2")
            .replace(/{brand}/g, config.brand)}
        </CopyRightLine2>
        <Version>Version {process.env.REACT_APP_VERSION}</Version>
      </BottomContainer>
    </Container>
  );
}
const mapStateToProps = (state) => {
  return {
    game: state.game,
  };
};
export default connect(mapStateToProps, null)(withRouter(Footer));
