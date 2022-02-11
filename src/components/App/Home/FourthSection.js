import React from "react";
import { Grid, Container as MContainer } from "@material-ui/core";
import styled from "styled-components";

import Common from "../../../utils/Common";
import ScrollAnimation from "react-animate-on-scroll";

import IconFeature1 from "../../../assets/images/home/section/icon-feature1.png";
import IconFeature2 from "../../../assets/images/home/section/icon-feature2.png";
import IconFeature3 from "../../../assets/images/home/section/icon-feature3.png";
import IconFeature4 from "../../../assets/images/home/section/icon-feature4.png";
import FeatureBackgroundPNG from "../../../assets/images/home/section/section4-rectangle.png";

const Container = styled(Grid)`
  width: 1280px;
  margin: 0 auto;
  margin-top: 175px;
  position: relative;
  display: flex;
`;

const FeatureContainer = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  grid-gap: 75px 25px;
`;

const FeatureBg = styled.div`
  width: 599px;
  height: 205px;
  background: url(${FeatureBackgroundPNG}) no-repeat;
  display: flex;
  align-items: center;
  color: #fff;
`;

const FeatureIcon = styled.img`
  width: 72px;
  height: 72px;
  margin: 0 35px;
  object-fit: contain;
`;

const FeatureRightContainer = styled.div`
  margin-right: 34px;
`;
const FeatureTitle = styled.div`
  font-size: 2em;
  font-weight: bold;
  padding-bottom: 10px;
`;
const FeatureDesc = styled.div`
  font-size: 1.2em;
`;

const FourthSection = (props) => {
  var featureList = [
    {
      icon: IconFeature1,
      title: "更專業",
      description:
        "每天為您提供近千場精彩體育、電競賽事，玩法多元極致享受，更有真人、棋牌、彩票、電子遊戲等多種娛樂方式隨心選擇。",
    },
    {
      icon: IconFeature2,
      title: "更安全",
      description:
        "獨家開發，採用128位加密技術和嚴格的安全管理體系，客戶資金得到最完善的保障，讓您全情盡享娛樂、賽事投注，無後顧之憂！",
    },
    {
      icon: IconFeature3,
      title: "更便捷",
      description:
        "自主研發的 Web、H5，更有iOS、Android原生App，讓您隨時隨地，娛樂投注隨心所欲！7×24小時在線客服提供最貼心、最優質的服務。",
    },
    {
      icon: IconFeature4,
      title: "更快速",
      description:
        "最新技術自主研發的財務處理系統，真正做到極速存、取、轉。獨家網路優化技術，為您提供一流的遊戲體驗，最大優化網路延遲。",
    },
  ];

  return (
    <Container>
      <ScrollAnimation
        animateIn="fadeInLeft"
        duration={1}
        animateOnce={true}
        style={{ overflow: "visible", position: "relative" }}
      >
        <FeatureContainer>
          {featureList.map((feature, index) => {
            return (
              <FeatureBg>
                <FeatureIcon src={feature.icon} alt={index}></FeatureIcon>
                <FeatureRightContainer>
                  <FeatureTitle>{feature.title}</FeatureTitle>
                  <FeatureDesc>{feature.description}</FeatureDesc>
                </FeatureRightContainer>
              </FeatureBg>
            );
          })}
        </FeatureContainer>
      </ScrollAnimation>
    </Container>
  );
};

export default FourthSection;
