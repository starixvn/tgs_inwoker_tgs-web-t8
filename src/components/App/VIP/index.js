import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { generalAction } from "../../../api-services/actions/generalAction";
import i18n from "../../../utils/i18n";
import IconVIPPNG from "../../../assets/images/icon-vip.png";
import config from "../../../config/config";
const Container = styled.div`
  padding: 20px 28px;
  box-sizing: border-box
  background-color: #eaeaea;
  width: 100%;
  min-height: 611px;
 
`;
const Title = styled.div`
  color: #676767;
`;
const TitleIcon = styled.div`
  width: 34px;
  height: 25px;

  background: url(${IconVIPPNG}) no-repeat left center;
  background-size: 24px 24px;

  float: left;
`;
const InnerWrap = styled.div`
  //width: 935px;
  min-height: 610px;
  margin-top: 18px;
  box-sizing: border-box;
  background-color: #f7f7f7;
  padding: 25px;
  border-radius: 10px;
`;

const VipLevelContainer = styled.div`
  display: grid;
  grid-template-columns: 200px auto;
`;

const VipLevelContainer2 = styled.div`
  display: grid;
  grid-template-columns: 125px auto;
`;

const VIPOverflow = styled.div`
  display: flex;
  flex-direction: column;
  overflow: visible;
  box-shadow: 0 20px 25px -5px rgb(0 0 0/0.1), 0 8px 10px -6px rgb(0 0 0/0.1);
`;

const VIPOverflowData = styled(VIPOverflow)`
  ${(props) => {
    return props.total > 6
      ? `  width: calc(
      100%
       
    );`
      : ` 
       width: calc(100% / ${props.total} );
       `;
  }}

  box-shadow: none;
`;

const VIPOverflowContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  overflow-x: auto;
`;

const VIPContent = styled.div`
  min-width: 125px;
  text-align: center;
  padding: 10px 20px;
`;

const TitleContent = styled(VIPContent)`
  background: #d9d9d9;
  color: #404040;
  font-weight: bold;

  padding: 10px 20px;

  width: 200px;
  display: block;
  text-decoration: none;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

const TableWrapper = styled.div`
  border-radius: 8px;
  cursor: default;
  border: solid 1px #b7c7cc;
  margin-bottom: 20px;

  & ::-webkit-scrollbar {
    width: 4px;
    height: 4px;
  }

  & ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  & ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.primary};
  }

  & ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

const VipEmblemContainer = styled(VIPContent)`
  min-height: 175px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const VipEmblemContainerTitle = styled(VipEmblemContainer)`
  background: #d9d9d9;
  color: #404040;
  font-weight: bold;
`;

const VIPLevelImage = styled.div`
  height: 95px;
`;

const DataRow = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const TitleRow = styled(DataRow)`
  background: #d9d9d9;
  color: #404040;
  font-weight: bold;
  align-items: center;
  text-transform: capitalize;
  height: 55px;
`;

const StandardDataCol = styled.div`
  padding: 10px 20px;
  text-align: center;
`;

const DataCol = styled(StandardDataCol)`
  width: calc(100% / 6);
`;

const VIP = (props) => {
  const { getVIP } = props;
  const [vipBenefit, setVipBenefits] = useState([]);
  useEffect(() => {
    if (vipBenefit.length === 0) {
      getVIP().then((result) => {
        if (result.IsSuccess) {
          setVipBenefits(result.data);
        }
      });
    }
  }, []);

  var vipBenefitList =
    vipBenefit.items &&
    vipBenefit.items.sort((a, b) => {
      return a.level < b.level ? -1 : a.level > b.level ? 1 : 0;
    });

  const getVIPTitle = (level) => {
    // currently bunny only has 6 levels
    if (config.features.VIP_CustomLevel_BUNNY && level < 7)
      return i18n.t("vip.bunny.level" + level);
    else return "VIP" + level;
  };

  return (
    <Container>
      <Title>
        <TitleIcon></TitleIcon>
        VIP
      </Title>
      <InnerWrap>
        {vipBenefit.items && vipBenefit.items.length > 0 && (
          <TableWrapper>
            <VipLevelContainer>
              <VIPOverflow>
                <VipEmblemContainerTitle title={i18n.t("vip.level")}>
                  {i18n.t("vip.level")}
                </VipEmblemContainerTitle>
                <TitleContent
                  title={i18n.t("vip.levelKeepAccumulateBetAmount")}
                >
                  {i18n.t("vip.levelKeepAccumulateBetAmount")}
                </TitleContent>
                <TitleContent title={i18n.t("vip.levelKeepAccumulateDeposit")}>
                  {i18n.t("vip.levelKeepAccumulateDeposit")}
                </TitleContent>
                <TitleContent title={i18n.t("vip.levelUpAccumulateBetAmount")}>
                  {i18n.t("vip.levelUpAccumulateBetAmount")}
                </TitleContent>
                <TitleContent title={i18n.t("vip.levelUpAccumulateDeposit")}>
                  {i18n.t("vip.levelUpAccumulateDeposit")}
                </TitleContent>
                <TitleContent title={i18n.t("vip.birthBenefit")}>
                  {i18n.t("vip.birthBenefit")}
                </TitleContent>

                <TitleContent title={i18n.t("vip.promotionBenefit")}>
                  {i18n.t("vip.promotionBenefit")}
                </TitleContent>
                <TitleContent title={i18n.t("vip.quarterlyBenefit")}>
                  {i18n.t("vip.quarterlyBenefit")}
                </TitleContent>
              </VIPOverflow>
              <VIPOverflowContainer>
                {vipBenefitList.map((data, index) => {
                  return (
                    <VIPOverflowData
                      key={index}
                      total={vipBenefit.items.length}
                    >
                      <VipEmblemContainer>
                        <VIPLevelImage>
                          <img
                            src={
                              process.env.PUBLIC_URL +
                              `/assets/images/vip/${data.level}.png`
                            }
                          />
                        </VIPLevelImage>
                          {getVIPTitle(data.level)}
                      </VipEmblemContainer>
                      <VIPContent>
                        {data.levelKeepAccumulateBetAmount}
                      </VIPContent>
                      <VIPContent>{data.levelKeepAccumulateDeposit}</VIPContent>
                      <VIPContent>{data.levelUpAccumulateBetAmount}</VIPContent>
                      <VIPContent>{data.levelUpAccumulateDeposit}</VIPContent>
                      <VIPContent>{data.birthBenefit}</VIPContent>
                      <VIPContent>{data.promotionBenefit}</VIPContent>
                      <VIPContent>{data.quarterlyBenefit}</VIPContent>
                    </VIPOverflowData>
                  );
                })}
              </VIPOverflowContainer>
            </VipLevelContainer>
          </TableWrapper>
        )}

        {vipBenefit.items && vipBenefit.items.length > 0 && (
          <TableWrapper>
            <VipLevelContainer2>
              <div>
                <TitleRow>
                  <StandardDataCol>{i18n.t("vip.vipBenefit")}</StandardDataCol>
                </TitleRow>
                {vipBenefitList.map((data, index) => {
                  return (
                    <StandardDataCol key={index}>{data.level}</StandardDataCol>
                  );
                })}
              </div>
              <div>
                <TitleRow>
                  <DataCol>{i18n.t("vip.cardGameRebate")}</DataCol>
                  <DataCol>{i18n.t("vip.liveDealerRebate")}</DataCol>
                  <DataCol>{i18n.t("vip.lotteryRebate")}</DataCol>
                  <DataCol>{i18n.t("vip.slotRebate")}</DataCol>
                  <DataCol>{i18n.t("vip.sportsRebate")}</DataCol>
                  <DataCol>{i18n.t("vip.virtualSportsRebate")}</DataCol>
                </TitleRow>
                {vipBenefitList.map((data, index) => {
                  return (
                    <DataRow key={index}>
                      <DataCol>{data.cardGameRebate}%</DataCol>
                      <DataCol>{data.liveDealerRebate}%</DataCol>
                      <DataCol>{data.lotteryRebate}%</DataCol>
                      <DataCol>{data.slotRebate}%</DataCol>
                      <DataCol>{data.sportsRebate}%</DataCol>
                      <DataCol>{data.virtualSportsRebate}%</DataCol>
                    </DataRow>
                  );
                })}
              </div>
            </VipLevelContainer2>
          </TableWrapper>
        )}
      </InnerWrap>
    </Container>
  );
};
const mapDispatchToProps = (dispatch) => {
  return {
    getVIP: () => dispatch(generalAction.getVIP()),
  };
};
const mapStateToProps = (state) => {
  return "";
};
export default connect(mapStateToProps, mapDispatchToProps)(VIP);
