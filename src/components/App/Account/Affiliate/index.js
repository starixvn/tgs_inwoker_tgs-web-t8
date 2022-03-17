import React, { Component } from "react";
import styled from "styled-components";

import IconBonusRedPNG from "../../../../assets/images/icon-bonus.png";
import Member from "./Member";
import Report from "./Report";
import Guide from "./Guide";
import Details from "./Details";
import i18n from "../../../../utils/i18n";
import { withSnackbar } from "notistack";
const Container = styled.div`
  padding: 20px 28px;
  box-sizing: border-box

  width: 100%;
  min-height: 611px;
`;
const Header = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #ccc;
  height: 38px;
  margin-bottom: 10px;
  padding: 0 10px 10px;
`;

const Title = styled.div`
  align-items: baseline;
  display: flex;
  & h3 {
    color: ${({ theme }) => theme.secondary};
    font-size: 24px;
    font-weight: 400;
  }
`;

const TabButton = styled.div`
  width: 161px;
  height: 50px;
  font-size: 16px;

  color: #151a34;
  background-color: #f7f7f7;
  text-align: center;
  padding-top: 14px;
  box-sizing: border-box;
  float: left;
  margin-right: 8px;
  margin-bottom: 20px;

  box-shadow: 0px 3px 5px 0 rgba(0, 0, 0, 0.3);
  background-color: #f2f2f2;
  background-position: center 14px;
  background-repeat: no-repeat;

  ${(props) =>
    props.active
      ? `    border: solid 1px #ffffff;
      color:#fff;
      background-color: ` +
        props.theme.primary +
        `;`
      : `   `};
  &:hover {
    cursor: pointer;
  }
`;
const SplitLine = styled.div`
  width: 100%;
  height: 1px;
  background-color: #e1dfdf;
  margin: 20px 0;
`;
const InnerWrap = styled.div`
  margin-top: 18px;
  box-sizing: border-box;
  background-color: #f7f7f7;
  padding: 25px;
  position: relative;
  border-radius: 10px;
`;

class Affiliate extends Component {
  state = {
    tab: 1,
    newBonusList: [],
  };

  componentDidMount() {
    if (this.props.token != null) {
    }
  }

  componentDidUpdate(preProps) {
    if (preProps.token == null && this.props.token != null) {
    }
  }

  handleTabClick = (tab) => {
    this.setState({ ...this.state, tab: tab });
  };

  handleReceiveBonus = () => {};

  render() {
    return (
      <Container>
      <Header>
        <Title>
          <h3>{i18n.t("affiliate.title")}</h3>
        </Title>
      </Header>

        <InnerWrap>
          {
            //     <TabButton
            //     active={this.state.tab === 1}
            //     onClick={() => this.handleTabClick(1)}
            //   >
            //     {i18n.t("affiliate.details")}
            //   </TabButton>
            //   <TabButton
            //     active={this.state.tab === 2}
            //     onClick={() => this.handleTabClick(2)}
            //   >
            //     {i18n.t("affiliate.downline")}
            //   </TabButton>
            //   <TabButton
            //     active={this.state.tab === 3}
            //     onClick={() => this.handleTabClick(3)}
            //   >
            //     {i18n.t("affiliate.report")}
            //   </TabButton>
            //   <TabButton
            //     active={this.state.tab === 4}
            //     onClick={() => this.handleTabClick(4)}
            //   >
            //     {i18n.t("affiliate.info")}
            //   </TabButton>
            //   <SplitLine></SplitLine>
          }
          {(() => {
            switch (this.state.tab) {
              case 1:
                return (
                  <Details
                    list={this.state.newBonusList}
                    onhandleReceiveBonus={this.handleReceiveBonus}
                  />
                );
              case 2:
                return (
                  <Member
                    token={this.props.token}
                    list={this.state.newBonusList}
                    onhandleReceiveBonus={this.handleReceiveBonus}
                  />
                );
              case 3:
                return (
                  <Report
                    token={this.props.token}
                    list={this.state.newBonusList}
                    onhandleReceiveBonus={this.handleReceiveBonus}
                  />
                );
              case 4:
                return (
                  <Guide
                    token={this.props.token}
                    list={this.state.newBonusList}
                    onhandleReceiveBonus={this.handleReceiveBonus}
                  />
                );
              default:
                return <div />;
            }
          })()}
        </InnerWrap>
      </Container>
    );
  }
}
// const mapStateToProps = state => {
//   return {
//     token: state.account.token
//     // bonus: state.bonus
//   };
// };

export default withSnackbar(Affiliate);
