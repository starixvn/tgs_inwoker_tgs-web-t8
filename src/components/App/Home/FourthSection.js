import React from "react";
import styled from "styled-components";
import TheGirlImage from "../../../assets/images/home/section/fourth-girl.png";
import KyGame from "../../../assets/images/home/section/ky_logo.png";
import i18n from "../../../utils/i18n";

import {GameTypeEnum,GameEnum} from "../../../api-services/utils/Enum";
import Common from "../../../utils/Common";
import Button from "../../../custom/button";

const Container = styled.div`
  height: 555px;
  width: 1280px;
  margin: 0 auto;
  padding-bottom: 10px;
  background-position: 670px 160px;

  margin-top: 14px;

  position: relative;
  overflow: visible;
`;

const TheGirl = styled.img`
  position: absolute;
  bottom: 0;
  right: 0;
`;

const Content = styled.div`
  display: flex;
  width: 600px;
  text-align: center;
  flex-direction: column;
  align-items: center;
  height: 555px;
  justify-content: center;
`;

const CustomLogo = styled.img`
  width: 440px;
  height: auto;
  margin-bottom: 30px;
`;

const Description = styled.div`
  width: 400px;
  margin-bottom: 20px;
`;

const FourthSection = ({ handleJoinGameClick }) => {
  return (
    <Container>
      <Content>
        <CustomLogo src={KyGame} alt="kyLogo" />
        <Description>{i18n.t("KY.desc")}</Description>
        <Button
          click={() => {
            handleJoinGameClick(
              "",
              "",
              GameEnum.KY,
              "/" +
                i18n.language +
                "/joingame/" +
                GameTypeEnum.QIPAILOBBY +
                "/" +
                GameEnum.KY
            );
          }}
          text={i18n.t("common.joinGame")}
        ></Button>
      </Content>
      <TheGirl src={TheGirlImage} alt="girlimg" />
    </Container>
  );
};

export default FourthSection;
