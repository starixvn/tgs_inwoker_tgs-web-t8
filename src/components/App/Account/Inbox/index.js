import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import Dialog from "@material-ui/core/Dialog";
import IconInboxRedPNG from "../../../../assets/images/icon-inbox.png";
import IconRefreshPNG from "../../../../assets/images/icon-refresh.png";

import LoginBGPNG from "../../../../assets/images/login-bg.png";
import IconLoginClosePNG from "../../../../assets/images/icon-login-close.png";
import { withStyles } from "@material-ui/core/styles";
import { withSnackbar } from "notistack";

import List from "./List";
import Details from "./Details";

import { accountAction } from "../../../../api-services/actions/accountAction";
import { inboxAction } from "../../../../api-services/actions/inboxAction";
import { InboxService } from "../../../../api-services/services/InboxService";
import { SHOWING_DIALOG } from "../../../../api-services/constant/actionType";
import i18n from "../../../../utils/i18n";

const Container = styled.div` 
  padding: 20px 28px;
  box-sizing: border-box
  width: 100%;
  height: auto;
`;

const HeaderContainer = styled.div`
  background-color: #aaa;
  width: 100%;
  position: absolute;
  top: 106px;
  right: 0;
  height: 90px;
  border-bottom: none;
  box-sizing: border-box;
`;
const Header = styled.div`
  width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  margin-top: 26px;
`;
const HeaderTab = styled.div`
  box-sizing: border-box;
  cursor: pointer;
  display: block;
  font-size: 16px;
  font-stretch: normal;
  font-style: normal;
  font-weight: 300;
  margin: 0 60px;
  min-width: 150px;
  padding: 20px;
  background-color: #f7f7f7;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  box-shadow: 0 2px 4px 0 rgb(0 0 0 / 25%);
  color: #777;
`;

const RefreshInboxButton = styled.div`
  border-radius: 5px;
  float: left;
  margin: 10px 10px;
  border: 1px solid #272727;
  background-color: rgba(0,0,0,.3);
  border-color: #fff;
  font-size: 0;
  padding: 4px;
  text-align: center;
  width: 36px;
  height: 36px;
  &:hover {
    cursor: pointer;
  }
`;
const RefreshInboxButtonIcon = styled.div`
  width: 28px;
  height: 29px;
  background: url(${IconRefreshPNG}) no-repeat center;
`;
const InnerWrap = styled.div`
  width: 100%;
  padding: 25px;
  margin-top: 35px;
  position: relative;
  background-color: #f7f7f7;
  min-height: 600px;
  border-bottom-right-radius: 5px;
  border-bottom-left-radius: 5px;
`;
const StyledDialog = withStyles({
  root: {
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
  },
  paper: {
    background: `url(${LoginBGPNG}) no-repeat transparent`,
    backgroundSize: "cover",
    borderRadius: "5px",
    width: "420px",
  },
})(Dialog);
const DialogContainer = styled.div`
  padding: 27px 32px;

  display: table;
`;
const DialogCloseIconContainer = styled.div`
  //background: url(${IconLoginClosePNG}) no-repeat center;
  width: 50px;
  height: 100%;
  float: right;
  position: absolute;
  right: 5px;
  top: 0px;
  user-select: none;
  cursor: pointer;
  font-size: 24px;
  padding: 8px 12px;
  color: #fff;
`;
const DialogHeader = styled.div`
  height: 50px;
  background-color: #0091fe;
`;
const DialogHeadertitle = styled.div`
  text-align: center;
  margin-left: 45px;
  padding-top: 12px;
  float: left;
  font-size: 18px;
  font-weight: bold;
  color: #ffffff;
  width: 320px;
`;
class Inbox extends Component {
  state = {
    selectAll: false,
    openDialog: false,
    dialogTitle: "收件箱",
    selectedRecord: null,
    page: 0,
    selected: [],
    inbox: {
      list: [],
      count: 0,
      page_size: 10,
    },
    limit: 10,
  };
  handleChangePage = (newPage) => {
    this.setState({ ...this.state, page: newPage - 1 });
    this.GetInboxList(newPage - 1);
  };
  GetInboxList = (page) => {
    this.props.getMessages(i18n.language, page + 1, this.state.limit);
  };

  componentDidMount() {
    if (this.props.token != null) {
      this.GetInboxList(0);
    }
  }
  componentDidUpdate(preProps) {
    if (preProps.token == null && this.props.token != null) {
      this.GetInboxList(0);
    }
  }

  handleCloseDialog = () => {
    this.setState({ ...this.state, openDialog: false });
  };

  handleDeleteSelected = () => {
    this.DeleteSelectedInbox(this.state.selected.join());
  };
  handleReadSelected = () => {
    this.ReadSelectedInbox(this.state.selected.join());
  };
  handleClickDelete = (id) => {
    this.DeleteSelectedInbox(id);
    this.setState({ ...this.state, openDialog: false });
  };
  handleRowClick = (row) => {
    InboxService.UpdateReadMessage([row.id]).then((response) => {
      this.GetInboxList(this.state.page);
    });
    this.setState({
      ...this.state,
      selectedRecord: row,
      openDialog: true,
    });
  };

  handleRefreshClick = () => {
    this.GetInboxList(this.state.page);
  };

  render() {
    return (
      <React.Fragment>
        <HeaderContainer>
          <Header>
            <HeaderTab>{i18n.t("inbox.title")}</HeaderTab>
            <RefreshInboxButton onClick={() => this.handleRefreshClick()}>
              <RefreshInboxButtonIcon></RefreshInboxButtonIcon>
            </RefreshInboxButton>
          </Header>
        </HeaderContainer>
        <Container>
          <InnerWrap>
            <List
              inbox={this.props.inbox}
              page={this.state.page}
              rows={this.state.inbox.list}
              total={this.state.inbox.count}
              selected={this.state.selected}
              onhandleChangePage={this.handleChangePage}
              onhandleRowClick={this.handleRowClick}
              onhandleSelectedChange={this.handleSelectedChange}
            ></List>
          </InnerWrap>
          <StyledDialog
            open={this.state.openDialog}
            onClose={this.handleCloseDialog}
            onEntering={() => this.props.showDialog(true)}
            onExited={() => this.props.showDialog(false)}
          >
            <DialogHeader>
              <DialogHeadertitle>{i18n.t("inbox.title")}</DialogHeadertitle>
              <DialogCloseIconContainer onClick={this.handleCloseDialog}>
                ✖
              </DialogCloseIconContainer>
            </DialogHeader>
            <DialogContainer>
              <Details inbox={this.state.selectedRecord}></Details>
            </DialogContainer>
          </StyledDialog>
        </Container>
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    inbox: state.account.inbox,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    showDialog: (payload) => {
      dispatch({ type: SHOWING_DIALOG, payload });
    },
    getAccountInfo: () => dispatch(accountAction.getAccountInfo()),
    getMessages: (language, page, limit) =>
      dispatch(inboxAction.getMessages(language, page, limit, true, false)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withSnackbar(Inbox));
