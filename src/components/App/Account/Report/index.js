import React, { Component } from "react";
import styled from "styled-components";
import IconReportRedPNG from "../../../../assets/images/icon-report.png";

import { ReportService } from "../../../../api-services/services/ReportService";
import { GameService } from "../../../../api-services/services/GameService";
import { GeneralService } from "../../../../api-services/services/GeneralService";
import AccountDetails from "./AccountDetails";
import WithdrawalReport from "./WithdrawalReport";
import DepositReport from "./DepositReport";
import RebateReport from "./RebateReport";
import TransactionDetails from "./TransactionDetails";
import i18n from "../../../../utils/i18n";
import TransferReport from "./TransferReport";
import JoinedPromoReport from "./JoinedPromoReport";
import config from "../../../../config/config";
const moment = require("moment");
const Container = styled.div`
  padding: 20px 28px;
  box-sizing: border-box;

  width: 100%;
  min-height: 611px;
`;

const Header = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  height: 38px;
  margin-bottom: 10px;
  padding: 0 10px 10px;
`;
const Title = styled.div`
  align-items: baseline;
  display: flex;
  & h3 {
    color: #676767;
    font-size: 24px;
    font-weight: 400;
  }
`;

const InnerWrap = styled.div`
  box-sizing: border-box;
  background-color: #f7f7f7;
  position: relative;
  border-radius: 10px;
`;

const TabContainer = styled.div`
  align-items: center;
  display: flex;
  justify-content: flex-start;
  border-bottom: 2px solid #ccc;
  box-sizing: border-box;
  overflow: visible;
`;

const TabButton = styled.span`
  box-sizing: border-box;
  color: #666;
  cursor: pointer;
  display: block;
  font-size: 16px;
  font-stretch: normal;
  font-style: normal;
  font-weight: 300;
  min-width: 100px;
  padding: 16px;
  position: relative;

  ${(props) =>
    props.active
      ? ` 
      &:after {
        background-color: ${props.theme.primary};
    bottom: -2px;
    content: "";
    height: 3px;
    left: 0;
    position: absolute;
    width: 100%;
      }
      color: ${props.theme.primary};`
      : ` `};
  &:hover {
    cursor: pointer;
    color: ${(props) => props.theme.primary};
    &:after {
      background-color: ${(props) => props.theme.primary};
      bottom: -2px;
      content: "";
      height: 3px;
      left: 0;
      position: absolute;
      width: 100%;
    }
  }
`;
const SplitLine = styled.div`
  width: 100%;
  height: 1px;
  background-color: #e1dfdf;
  margin: 20px 0;
`;
class Report extends Component {
  state = {
    tab: 2,
    isGetNewBonusList: false,
    newBonusList: [],
    completedBonusList: [],
    type: 0,
    limit: 20,
    accountList: {
      list: [],
      count: 0,
    },
    transactionList: {
      list: [],
      count: 0,
    },
    dailyList: {
      list: [],
      count: 0,
    },
    withdrawalList: {
      list: [],
      count: 0,
    },
    depositList: {
      list: [],
      count: 0,
    },
    rebateList: {
      list: [],
      count: 0,
    },

    transferReport: {
      list: [],
      count: 0,
    },

    joinedReport: {
      list: [],
      count: 0,
    },

    isLoaded: false,
    gameList: [],
    depositStatusList: {},
    withdrawalStatusList: {},
  };
  GetGameList = () => {
    GameService.GetGameList(this.props.token).then((response) => {
      if (response.IsSuccess) {
        this.setState({ ...this.state, gameList: response.data });
      }
    });
  };
  GetDepositWithdrawalStatus = () => {
    ReportService.GetDepositStatus().then((response) => {
      if (response.IsSuccess) {
        this.setState({ ...this.state, depositStatusList: response.data });
      }
    });
    ReportService.GetWithdrawalStatus().then((response) => {
      if (response.IsSuccess) {
        this.setState({ ...this.state, withdrawalStatusList: response.data });
      }
    });
  };
  componentDidMount() {
    if (this.state.isLoaded === false && this.props.token != null) {
      this.setState({ ...this.state, isLoaded: true });
      this.GetDepositWithdrawalStatus();
    }
  }

  componentDidUpdate() {
    if (this.state.isLoaded === false && this.props.token != null) {
      this.setState({ ...this.state, isLoaded: true });
      this.GetDepositWithdrawalStatus();
    }
  }

  handleAccountGetReportTrigger = (dateFrom, dateTo, page, type) => {
    ReportService.GetAccountDetails(dateFrom, dateTo, page, type).then(
      (response) => {
        if (response.IsSuccess) {
          this.setState({ ...this.state, accountList: response.data });
        }
      }
    );
  };
  handleTransactionGetReportTrigger = (
    dateFrom,
    dateTo,
    page,
    game_platform_id
  ) => {
    config.features.Report_ShowRoundsTotal &&
      this.handleGetRoundReportTrigger(dateFrom, dateTo);
    ReportService.GetTransactionDetails(
      moment(dateFrom).utc().format(),
      moment(dateTo).utc().add(1, "days").format(),
      page,
      this.state.limit,
      true,
      "",
      false
    ).then((response) => {
      if (response.IsSuccess) {
        this.setState({
          ...this.state,
          transactionList: {
            ...this.state.transactionList,
            list: response.data.items,
            count: response.data.totalcount,
          },
        });
      }
    });
  };

  handleGetRoundReportTrigger = (dateFrom, dateTo) => {
    ReportService.GetRoundsTotal(
      moment(dateFrom).utc().format(),
      moment(dateTo).utc().add(1, "days").format()
    ).then((result) => {
      if (result.IsSuccess) {
        this.setState({
          ...this.state,
          transactionList: {
            ...this.state.transactionList,
            roundTotal: result.data,
          },
        });
      }
    });
  };

  handleWithdrawalGetReportTrigger = (dateFrom, dateTo, page, status) => {
    ReportService.GetWithdrawalDetails(
      status,
      moment(dateFrom).utc().format(),
      moment(dateTo).utc().add(1, "days").format(),
      page,
      this.state.limit,
      true,
      "CreatedOn",
      false,
      "1"
    ).then((response) => {
      if (response.IsSuccess) {
        this.setState({
          ...this.state,
          withdrawalList: {
            list: response.data.items,
            count: response.data.totalCount,
          },
        });
      }
    });
  };
  handleDepositGetReportTrigger = (dateFrom, dateTo, page, status) => {
    ReportService.GetDepositDetails(
      status,
      moment(dateFrom).utc().format(),
      moment(dateTo).utc().add(1, "days").format(),
      page,
      this.state.limit,
      true,
      "CreatedOn",
      false,
      "1"
    ).then((response) => {
      if (response.IsSuccess) {
        this.setState({
          ...this.state,
          depositList: {
            list: response.data.items,
            count: response.data.totalCount,
          },
        });
      }
    });
  };

  handleRebateGetReportTrigger = (dateFrom, dateTo, page) => {
    ReportService.GetRebateDetails(dateFrom, dateTo, page).then((response) => {
      if (response.IsSuccess) {
        this.setState({ ...this.state, rebateList: response.data });
      }
    });
  };

  handleGetTransferReportTrigger = (dateFrom, dateTo, page, order) => {
    ReportService.GetTransferReport(
      moment(dateFrom).utc().format(),
      moment(dateTo).utc().add(1, "days").format(),
      page,
      this.state.limit,
      order,
      true,
      "BalanceTime",
      false
    ).then((response) => {
      if (response.IsSuccess) {
        this.setState({
          ...this.state,
          transferReport: {
            list: response.data.items,
            count: response.data.totalCount,
          },
        });
      }
    });
  };

  handleGetJoinedPromo = (dateFrom, dateTo, page) => {
    GeneralService.GetJoinedPromoReport(
      moment(dateFrom).utc().format(),
      moment(dateTo).utc().add(1, "days").format(),
      page,
      this.state.limit,
      false,
      "",
      false
    ).then((response) => {
      if (response.IsSuccess) {
        this.setState({
          ...this.state,
          joinedReport: {
            list: response.data.items,
            count: response.data.totalcount,
          },
        });
      }
    });
  };

  handleTabClick = (tab) => {
    this.setState({ ...this.state, tab: tab });
  };
  render() {
    return (
      <Container>
        <Header>
          <Title>
            <h3>{i18n.t("report.title")}</h3>
          </Title>
        </Header>
        <InnerWrap>
          <TabContainer>
            {/* <TabButton
            active={this.state.tab === 1}
            onClick={() => this.handleTabClick(1)}
          >
            {i18n.t("report.transferDetails")}
          </TabButton> */}
            <TabButton
              active={this.state.tab === 2}
              onClick={() => this.handleTabClick(2)}
            >
              {i18n.t("report.bettingDetails")}
            </TabButton>
            <TabButton
              active={this.state.tab === 3}
              onClick={() => this.handleTabClick(3)}
            >
              {i18n.t("report.withdrawalDetails")}
            </TabButton>
            <TabButton
              active={this.state.tab === 4}
              onClick={() => this.handleTabClick(4)}
            >
              {i18n.t("report.depositDetails")}
            </TabButton>
            {/*  <TabButton
            active={this.state.tab === 5}
            onClick={() => this.handleTabClick(5)}
          >
            {i18n.t("report.rebateDetails")}
          </TabButton> */}
            {this.props.transferwallet && (
              <TabButton
                active={this.state.tab === 6}
                onClick={() => this.handleTabClick(6)}
              >
                {i18n.t("report.transfer.title")}
              </TabButton>
            )}

            <TabButton
              active={this.state.tab === 7}
              onClick={() => this.handleTabClick(7)}
            >
              {i18n.t("report.joinedPromo.title")}
            </TabButton>
          </TabContainer>

          {(() => {
            switch (this.state.tab) {
              case 1:
                return (
                  <AccountDetails
                    gameList={this.state.gameList}
                    onhandleGetReportTrigger={
                      this.handleAccountGetReportTrigger
                    }
                    accountList={this.state.accountList}
                  />
                );
              case 2:
                return (
                  <TransactionDetails
                    onhandleGetReportTrigger={
                      this.handleTransactionGetReportTrigger
                    }
                    transactionList={this.state.transactionList}
                  />
                );
              case 3:
                return (
                  <WithdrawalReport
                    onhandleGetReportTrigger={
                      this.handleWithdrawalGetReportTrigger
                    }
                    withdrawalList={this.state.withdrawalList}
                    withdrawalStatusList={this.state.withdrawalStatusList}
                  />
                );
              case 4:
                return (
                  <DepositReport
                    onhandleGetReportTrigger={
                      this.handleDepositGetReportTrigger
                    }
                    depositList={this.state.depositList}
                    depositStatusList={this.state.depositStatusList}
                  />
                );
              case 5:
                return "";
              case 6:
                return (
                  <TransferReport
                    onhandleGetReportTrigger={
                      this.handleGetTransferReportTrigger
                    }
                    transferReportList={this.state.transferReport}
                  />
                );

              case 7:
                return (
                  <JoinedPromoReport
                    onhandleGetReportTrigger={this.handleGetJoinedPromo}
                    joinedReport={this.state.joinedReport}
                  />
                );
              default:
                return (
                  <RebateReport
                    token={this.props.token}
                    onhandleGetReportTrigger={this.handleRebateGetReportTrigger}
                    rebateList={this.state.rebateList}
                  />
                );
            }
          })()}
        </InnerWrap>
      </Container>
    );
  }
}

export default Report;
