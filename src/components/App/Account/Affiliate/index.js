import React, { Component } from "react";
import styled from "styled-components";
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
    color: #676767;
    font-size: 24px;
    font-weight: 400;
  }
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
          {(() => {
            switch (this.state.tab) {
              case 1:
                return (
                  <Details
                    list={this.state.newBonusList}
                    onhandleReceiveBonus={this.handleReceiveBonus}
                  />
                );

              default:
                return (
                  <Details
                    list={this.state.newBonusList}
                    onhandleReceiveBonus={this.handleReceiveBonus}
                  />
                );
            }
          })()}
        </InnerWrap>
      </Container>
    );
  }
}

export default withSnackbar(Affiliate);
