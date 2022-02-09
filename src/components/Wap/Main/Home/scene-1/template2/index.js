import React from "react";
import styled from "styled-components";
import Common from "../../../../../../utils/Common";
import i18n from "../../../../../../utils/i18n";
import config from "../../../../../../config/config";
import { GameTypeEnum } from "../../../../../../api-services/utils/Enum";
const ButtonStartGame = styled.div`
  width: 148px;
  height: 43px;
  background: url(${({ brand }) => {
      return (
        process.env.PUBLIC_URL +
        `/assets/images/wapp/${
          brand === "WLGHK" ? "wlghk-btn" : "btn-start-game-T1T2"
        }.png`
      );
    }})
    no-repeat;
  background-size: 100%;
  margin: 150px 0 0 76px;
  font-size: 16px;
  font-weight: bold;
  line-height: 37px;
  text-align: center;
  color: #fff;
  zoom: 1.3;
`;
const GameSelectionContainer = styled.div`
  font-size: 48px;
  position: fixed;
  top: 550px;
  left: 0;
`;
const GameSelectionUL = styled.div`
  position: fixed;
  top: 525px;
  font-size: 35px;
  font-weight: bold;
  color: #cdcdcd;
  margin: 0 0 0 20px;
  background: white;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  border-radius: 20px;
  padding: 10px 0px;
  padding: 0 0px;
  width: 176px;
  overflow-y: auto;
  height: calc(100vh - 640px);
`;

const TheIcon = styled.div`
  width: 60px;
  height: 80px;
  mask: ${({ icon }) => {
    return `url(${icon}) no-repeat center /
  contain;`;
  }};
`;
const GameSelectionLI = styled.div`
  width: 130px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 16px auto 0 auto;
  text-align: center;
  font-size: 24px;
  line-height: 1.7;
  color: ${({ selected, theme }) => {
    return selected ? theme.primary : theme.secondary;
  }};
  padding: 10px 0px;

  ${TheIcon} {
    background-color: ${({ selected, theme }) => {
      return selected ? theme.primary : theme.secondary;
    }};
  }
`;

const GameListWrap = styled.div`
  width: 560px;
  padding: 0px 20px 0px 20px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.body};
`;

const GameFrameImg = styled.div`
  margin: 0 auto 10px auto;
  display: block;
  width: 100%;
  height: 320px;
  border-radius: 20px;
  background: url(${(props) => props.src}) no-repeat;
  background-position: center;
  background-size: 100%;
  position: relative;
`;
const GameName = styled.div`
  color: #fff;
  position: absolute;
  top: 62px;
  left: 20px;
  width: 260px;
  font-size: 40px;
  font-weight: bold;
  text-align: center;
  text-transform: capitalize;
`;
const GameListWrap2 = styled(GameListWrap)`
  margin-left: 188px;
  margin-top: 510px;
  padding-top: 10px;
  overflow: auto;
`;

const GameFrameImg2 = styled(GameFrameImg)`
  height: 240px;
`;

const ButtonStartGame2 = styled(ButtonStartGame)`
  margin: 170px 0 0 70px;
  background: url(${({ brand }) => {
      return (
        process.env.PUBLIC_URL +
        `/assets/images/wapp/${
          brand === "WLGHK" ? "wlghk-btn" : "btn-start-game-T1T2"
        }.png`
      );
    }})
    no-repeat center;
  zoom: 1;
  color: #fff;
  background-size: 95%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Maintenance = styled.div`
  display: none;
  position: absolute;
  width: 520px;
  height: 240px;
  justify-content: center;
  align-items: center;
  color: white;
  z-index: 1;
  font-size: 40px;
  font-weight: bold;
  text-transform: capitalize;
`;

const NewWrapper = styled.div`
  ${({ maintenance }) => {
    return maintenance
      ? `
      ${GameFrameImg2}{
        filter: brightness(40%) grayscale(200%);
      }
      ${Maintenance}{
        display: flex;
    
    }`
      : ``;
  }}
`;

const Template2 = ({
  gameTypeListSorting,
  homePageGameList,
  getImgPrefix,
  selectedGameType,
  convertGameTypeToText,
  handleGameTypeClick,
  handleGameClick,
  scrollRef,
}) => {
  return (
    <div style={{ position: "relative" }}>
      <GameSelectionContainer>
        <GameSelectionUL ref={scrollRef}>
          {(() => {
            return gameTypeListSorting.map((type, index) => {
              return (
                <GameSelectionLI
                  style={
                    i18n.language === "en-US"
                      ? { fontSize: "29px", paddingTop: "6px" }
                      : {}
                  }
                  key={index}
                  selected={selectedGameType === type}
                  onClick={() => handleGameTypeClick(type)}
                >
                  <TheIcon
                    icon={
                      process.env.PUBLIC_URL +
                      `/assets/images/wapGame/icon/${type}.svg`
                    }
                  />
                  <div> {convertGameTypeToText(type)}</div>
                </GameSelectionLI>
              );
            });
          })()}
        </GameSelectionUL>
      </GameSelectionContainer>
      <GameListWrap2>
        {(() => {
          var displayGameType = Common.GetDisplayGameType();
          var currentType = -1;
          return homePageGameList
            .filter((a) => displayGameType.indexOf(a.type) >= 0)
            .sort(function (a, b) {
              return a.type - b.type;
            })
            .map((row, index) => {
              var gameCode = row.abbreviation.toLowerCase();
              var jsx = (
                <NewWrapper maintenance={row.status != 0}>
                  <Maintenance>{i18n.t("transfer.maintenance")}</Maintenance>
                  <GameFrameImg2
                    src={`${
                      process.env.PUBLIC_URL
                    }/assets/images/wapGame/T1T2/${getImgPrefix(
                      row.type
                    )}-${gameCode}${
                      (gameCode === "wgvia" || gameCode === "wgfm") &&
                      config.features.SportsHideLogo
                        ? "-hkjp"
                        : ""
                    }.jpg`}
                    key={index}
                    id={
                      currentType !== row.type
                        ? `gameType${row.type}`
                        : `gameId${row.abbreviation + row.type}`
                    }
                    onClick={() =>
                      handleGameClick(
                        row.type,
                        row.abbreviation,
                        row.game_platform_id
                      )
                    }
                  >
                    {(() => {
                      if (config.features.SportsHideLogo) {
                        if (gameCode === "wgvia") {
                          return (
                            <GameName index={index}>
                              {i18n.t("common.horserace")}
                            </GameName>
                          );
                        } else if (gameCode === "wgfm") {
                          return (
                            <GameName index={index}>
                              {i18n.t("common.sport")}
                            </GameName>
                          );
                        }
                      }
                    })()}
                    <ButtonStartGame2 brand={config.brand}>
                      {i18n.t("common.startGame")}
                    </ButtonStartGame2>
                  </GameFrameImg2>
                </NewWrapper>
              );
              currentType = row.type;
              return jsx;
            });
        })()}
      </GameListWrap2>
    </div>
  );
};

export default Template2;
