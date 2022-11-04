import React, { Component } from "react";
import { connect } from "react-redux";
import styled, { keyframes } from "styled-components";
import DynamicFont from "react-dynamic-font";
import { withSnackbar } from "notistack";
import ArrowRightPNG from "../../../../assets/images/arrow-right.png";
import { withStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import Switch from "@material-ui/core/Switch";
import Select from "@material-ui/core/Select";
import { walletAction } from "../../../../api-services/actions/walletAction";
import { RESET_WALLETRESULT } from "../../../../api-services/constant/actionType";
import IconRefreshPNG from "../../../../assets/images/icon-refresh.png";
import Loading from "../../Loading";
import Common from "../../../../utils/Common";
import Messagebox from "../../Messagebox";
import i18n from "../../../../utils/i18n";
import ErrorSwitcher from "../../../../utils/ErrorSwitcher";
import config from "../../../../config/config";

export const rotateKeyFrame = keyframes`
  0% {
    transform:rotate(0deg)
  }
  100% {
    transform:rotate(-359deg)
  }
`;
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
  margin: 20px 0;
  display: flex;
  justify-content: center;
  padding-bottom: 20px;
`;

const WalletWrap = styled(InnerWrap)`
  justify-content: space-around;
`;

const AllWalletItem = styled.div`
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 2px;
  overflow: hidden;
  position: relative;
  align-items: center;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  height: 100px;
  padding-right: 20px;
`;
const AllWalletTitle = styled.div`
  background-image: linear-gradient(
    180deg,
    ${({ theme }) => theme.primaryGradient},
    ${({ theme }) => theme.primary}
  );
  border-bottom: 1px solid #ccc;
  box-sizing: border-box;
  color: #fff;
  display: flex;
  flex-direction: column;
  height: 100px;
  justify-content: center;
  padding: 0 16px;
  position: relative;
  width: 105px;
  font-size: 14px;
  &:after {
    border-bottom: 99px solid #fff;
    border-left: 16px solid transparent;
    content: "";
    height: 0;
    position: absolute;
    right: 0;
    top: 0;
  }
`;

const AllWalletInfo = styled.div`
  flex: 1;
  width: 200px;
`;

const WalletNumber = styled.div`
  font-weight: 300;
  font-size: 28px;
  word-break: break-all;
  text-align: right;
`;

const RefreshButton = styled.div`
  width: 28px;
  height: 29px;
  border-radius: 4.7px;

  float: right;
  margin: auto 0 auto 10px;
  background-image: linear-gradient(
    to top,
    ${({ theme }) => theme.primaryGradient},
    ${({ theme }) => theme.primary}
  );
  &:hover {
    cursor: pointer;
  }
`;
const RefreshButtonIcon = styled.div`
  width: 28px;
  height: 29px;
  background: url(${IconRefreshPNG}) no-repeat center;
  &:hover {
    animation: ${rotateKeyFrame} 1s linear 0s infinite;
  }
`;

const QuickTransferWrap = styled(InnerWrap)``;

const QuickTransferContainer = styled.div`
  float: left;
  margin: 30px 0 0 40px;
`;
const QuickTransferArrow = styled.div`
  width: 23px;
  height: 18px;
  float: left;
  background: url(${ArrowRightPNG}) no-repeat;
  margin: 10px 10px 0 8px;
`;
const QuickTransferLabel = styled.div`
  float: left;

  font-size: 16px;
  margin: 8px 10px 0 18px;
  color: #818181;
`;
const QuickTransferButton = styled.div`
  display: inline-block;
  vertical-align: middle;
  text-align: center;
  padding: 10px;

  color: #fff;
  font-size: 14px;
  margin-left: 12px;

  width: 118px;
  max-height: 39px;
  border-radius: 6px;
  ${(props) => (props.disabled === false ? " " : "pointer-events: none;")}
  ${(props) =>
    props.disabled === true
      ? "background-blend-mode: multiply, normal; background-image:  linear-gradient(to bottom, #bfbfbf, #bfbfbf), linear-gradient(to top, #797979, #c3c3c3);"
      : "background-image: linear-gradient(to top, " +
        props.theme.primaryGradient +
        ", " +
        props.theme.primary +
        ");"}
  &:hover {
    ${(props) =>
      props.disabled === true
        ? " "
        : "cursor: pointer;box-shadow: inset 1px 1px 9px 0  rgba(255, 255, 255, 0.75);"}
  }
`;

const GameWalletWrap = styled(InnerWrap)``;

const GameTranferWallet = styled.div`
  width: 280px;
  height: 98px;
  border-radius: 4px;
  border: solid 1px #dddedf;
  background-image: linear-gradient(to top, #f4f4f4, #ffffff);
  margin: 0 10px 10px 0;
  float: left;
`;
const GameTranferLeftWrap = styled.div`
  width: 100px;
  padding: 10px 0;
  float: left;
  background-image: linear-gradient(
    180deg,
    ${({ theme }) => theme.primaryGradient},
    ${({ theme }) => theme.primary}
  );
  border-bottom: 1px solid #ccc;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  height: 100px;
  justify-content: center;
  padding: 0 16px;
  position: relative;
  width: 105px;
  font-size: 14px;
  &:after {
    border-bottom: 99px solid #f6f6f6;
    border-left: 16px solid transparent;
    content: "";
    height: 0;
    position: absolute;
    right: 0;
    top: 0;
  }
`;
const GameIcon = styled.div`
  height: 50px;
  width: 50px;
  background: url(${(props) => props.src}) no-repeat;
  background-size: contain;
  background-position: center;
  margin: 0 auto;
  display: block;
`;
const GameName = styled.div`
  font-size: 14px;
  text-align: center;
  color: #fff;
  margin-top: 5px;
`;
const GameWalletAmount = styled.div`
  font-family: Arial;
  font-size: 22px;
  text-align: right;
  color: #29356c;
  margin: 21px 0 0 0px;
  width: 170px;
  display: inline-block;
`;
const GameWalletButton = styled.div`
  font-size: 12px;
  ${(props) =>
    props.disabled
      ? "    background-blend-mode: multiply, normal; background-image:  linear-gradient(to bottom, #bfbfbf, #bfbfbf), linear-gradient(to top, #797979, #c3c3c3);"
      : "background-color: " + props.theme.primary + ";"}

  display:inline-block;
  vertical-align: middle;
  text-align: center;
  padding: 5px;

  margin: 8px 5px 0 0;
  color: #fff;
  float: right;

  min-width: 79px;
  height: 28px;
  border-radius: 5px;
  border: solid 1px #ffffff;

  &:hover {
    cursor: pointer;
    background-blend-mode: screen, normal;
    ${(props) =>
      props.disabled
        ? "   background-image: linear-gradient(to top, #797979, #c3c3c3);"
        : " box-shadow: inset 1px 1px 9px 0  rgba(255, 255, 255, 0.75);"}
  }
`;
const TransferContainer = styled.div`
  min-height: 91px;
`;
const CustomFormControl = withStyles((theme) => ({
  root: {
    width: "193px",
    height: "38px",

    marginRight: "5px",
    float: "left",
    backgroundColor: "#fff",
    padding: 0,
    "&:before": {
      borderRight: "1px solid #b6b6b6",
      content: '"\\00a0"',
      position: "absolute",
      top: "1px",
      right: "36px",
      zIndex: " 1",
      display: "block",
      height: "100%",
    },
    "& label.Mui-focused": {
      color: "#b6b6b6",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#b6b6b6",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#b6b6b6",
        marginTop: "1px",
      },
      "&:hover fieldset": {
        borderColor: "#b6b6b6",
        marginTop: "1px",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#b6b6b6",
        marginTop: "1px",
      },
    },
  },
}))(FormControl);
const CustomSelect = withStyles((theme) => ({
  root: {
    fontSize: "14px",

    color: "#818181",
  },
}))(Select);

const CustomSwitch = withStyles((theme) => ({
  root: {
    width: 42,
    height: 26,
    padding: 0,
    marginLeft: 8,
  },
  switchBase: {
    padding: 1,
    "&$checked": {
      transform: "translateX(16px)",
      color: theme.palette.common.white,
      "& + $track": {
        backgroundColor: theme.palette.primary.main,
        opacity: 1,
        border: "none",
      },
    },
    "&$focusVisible $thumb": {
      color: "#52d869",
      border: "6px solid #fff",
    },
  },
  thumb: {
    width: 24,
    height: 24,
  },
  track: {
    borderRadius: 26 / 2,
    border: `1px solid ${theme.palette.grey[400]}`,
    backgroundColor: theme.palette.grey[50],
    opacity: 1,
    transition: theme.transitions.create(["background-color", "border"]),
  },
  checked: {},
  focusVisible: {},
}))(({ classes, ...props }) => {
  return (
    <Switch
      focusVisibleClassName={classes.focusVisible}
      disableRipple
      classes={{
        root: classes.root,
        switchBase: classes.switchBase,
        thumb: classes.thumb,
        track: classes.track,
        checked: classes.checked,
      }}
      {...props}
    />
  );
});

const CurrencyTextFieldReplacement = styled.input`
  height: 35px;
  width: 154px;
  border-radius: 4px;
  border: solid 1px #b6b6b6;
  padding: 0px 10px;

  ::placeholder {
    color: #818181;
  }

  :focus {
    outline: none;
  }
`;

const CustomSwitchContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: normal;
  margin-bottom: 10px;
`;

class Transfer extends Component {
  state = {
    mainWalletAmount: "0.00",
    transferWalletAmount: "0.00",
    totalAmount: "0.00",
    singleWalletGameName: "",
    loading: false,
    transferFrom: "",
    transferTo: 0,
    transferAmount: "",
    showMessagebox: false,
    messageboxText: "",
    mainAccountId: "0",
    disabled: false,
  };

  componentDidUpdate(preProps) {
    if (
      preProps.wallet.transferResult !== this.props.wallet.transferResult &&
      this.props.wallet.transferResult !== null
    ) {
      if (this.props.wallet.transferResult.IsSuccess) {
        this.props.resetResult();
        this.props.getBalanceList();
        this.props.getAllGameBalance();
        this.setState({
          ...this.state,
          fromWallet: "",
          toWallet: "",
          loading: false,
          open: false,
          disabled: false,
        });
        // AppHistory.replace("/" + i18n.language + "/withdrawal");
      } else {
        this.props.enqueueSnackbar(
          ErrorSwitcher.getTranslation(this.props.wallet.transferResult.info),
          {
            variant: "error",
          }
        );
        this.setState({
          ...this.state,
          disabled: false,
        });
      }
    }

    // withdrawal all response
    if (
      preProps.wallet.withdrawalAllResult !==
        this.props.wallet.withdrawalAllResult &&
      this.props.wallet.withdrawalAllResult !== null
    ) {
      if (this.props.wallet.withdrawalAllResult.IsSuccess) {
        this.props.resetResult();
        this.props.getBalanceList();
        this.setState({
          transferAmount: "0.00",
          fromWallet: "",
          toWallet: "",
          loading: false,
          open: false,
        });
        // AppHistory.replace("/" + i18n.language + "/withdrawal");
      } else {
        this.props.enqueueSnackbar(
          ErrorSwitcher.getTranslation(
            this.props.wallet.withdrawalAllResult.info
          ),
          {
            variant: "error",
          }
        );
      }
    }
  }

  handleTransferFromChange = (e) => {
    const fromWallet = e.target.value;
    if (fromWallet !== this.state.mainAccountId) {
      this.setState({
        ...this.state,
        transferFrom: fromWallet,
        transferTo: this.state.mainAccountId,
      });
    } else {
      this.setState({
        ...this.state,
        transferFrom: fromWallet,
        transferTo: "",
      });
    }
  };
  handleTransferToChange = (e) => {
    const toWallet = e.target.value;
    if (toWallet !== this.state.mainAccountId) {
      this.setState({
        ...this.state,
        transferFrom: this.state.mainAccountId,
        transferTo: toWallet,
      });
    } else {
      this.setState({
        ...this.state,
        transferFrom: "",
        transferTo: toWallet,
      });
    }
  };
  handleTransferAmountChange = (e) => {};
  handleTranferClick = (e) => {
    this.setState({ ...this.state, disabled: true });
    const transferFrom = this.state.transferFrom;
    const transferTo = this.state.transferTo;
    const transferAmount = parseFloat(
      this.state.transferAmount.replace(/,/g, "")
    );
    const balance = this.props.wallet.mainBalance;
    if (parseFloat(transferAmount) <= 0) {
      this.props.enqueueSnackbar(i18n.t("transfer.invalidAmount"), {
        variant: "error",
      });
      this.setState({ ...this.state, disabled: false });
      return;
    }
    if (
      parseFloat(transferAmount) > parseFloat(balance) &&
      transferFrom === this.state.mainAccountId
    ) {
      if (parseFloat(transferAmount) <= 0) {
        this.props.enqueueSnackbar(i18n.t("transfer.invalidAmount"), {
          variant: "error",
        });
      } else {
        this.props.enqueueSnackbar(i18n.t("transfer.insufficient"), {
          variant: "error",
        });
      }
      this.setState({ ...this.state, disabled: false });
    } else {
      if (transferFrom === this.state.mainAccountId)
        this.props.doTransfer(transferTo, transferAmount);
      else this.props.doWithdrawalFromGame(transferFrom, transferAmount);
    }
  };
  transfer = (transferFrom, transferTo, transferAmount) => {
    this.props.doTransfer(
      transferAmount,
      this.state.mainAccountId,
      transferTo === this.state.mainAccountId ? transferFrom : transferTo,
      transferFrom === this.state.mainAccountId ? 1 : 2
    );
  };
  handleWithdrawAllClick = (e) => {
    this.props.doWithdrawAll();
  };
  handleTranferIn = (gpcode) => {
    this.props.doTransfer(gpcode, this.props.wallet.mainBalance);
  };

  handleSwitchAutoTransfer = () => {
    this.props.updateAutoTransferStatus().then(() => {
      //   this.props.getAutoTransferStatus();
    });
  };
  gpNameSwitcher = ({ gpcode, name }) => {
    if (gpcode && gpcode.toLowerCase() === "wgfm" && config.brand === "TIGER")
      return "Tiger Sports";
    else return name ? name : "";
  };
  render() {
    return (
      <Container>
        <Header>
          <Title>
            <h3>{i18n.t("transfer.title")}</h3>
          </Title>
        </Header>

        <WalletWrap>
          <AllWalletItem>
            <AllWalletTitle>{i18n.t("transfer.mainAccount")}</AllWalletTitle>
            <AllWalletInfo>
              <WalletNumber>
                <DynamicFont
                  content={Common.formatNumberWithThousand(
                    this.props.wallet.mainBalance
                  ).toString()}
                />
              </WalletNumber>
            </AllWalletInfo>
            <RefreshButton
              onClick={() => {
                this.props.getAllGameBalance();
                this.props.getBalanceList();
              }}
            >
              <RefreshButtonIcon></RefreshButtonIcon>
            </RefreshButton>
          </AllWalletItem>

          {this.props.game.containTransferWallet && (
            <AllWalletItem>
              <AllWalletTitle>
                {i18n.t("transfer.transferWallet")}
              </AllWalletTitle>
              <AllWalletInfo>
                <WalletNumber>
                  <DynamicFont
                    content={Common.formatNumberWithThousand(
                      this.props.game.providerList.reduce(
                        (total, item) =>
                          item.transferwallet === true
                            ? (total += item.balance)
                            : (total += 0),
                        0
                      )
                    ).toString()}
                  />
                </WalletNumber>
              </AllWalletInfo>
            </AllWalletItem>
          )}

          <AllWalletItem>
            <AllWalletTitle>{i18n.t("transfer.totalFund")}</AllWalletTitle>
            <AllWalletInfo>
              <WalletNumber>
                <DynamicFont
                  content={Common.formatNumberWithThousand(
                    this.props.game.providerList.reduce(
                      (total, item) =>
                        item.transferwallet === true
                          ? (total += item.balance)
                          : (total += 0),
                      0
                    ) + this.props.wallet.mainBalance
                  ).toString()}
                />
              </WalletNumber>
            </AllWalletInfo>
          </AllWalletItem>
        </WalletWrap>

        <Header>
          <Title>
            <h3>{i18n.t("transfer.quickTransfer")}</h3>
          </Title>
        </Header>

        <QuickTransferWrap>
          <QuickTransferContainer>
            <CustomFormControl>
              <CustomSelect
                native
                variant="outlined"
                value={this.state.transferFrom}
                displayEmpty
                onChange={this.handleTransferFromChange}
              >
                <option value={this.state.mainAccountId}>
                  {i18n.t("transfer.mainAccount")}
                </option>
                {this.props.game.providerList
                  .filter(
                    (item) => item.status === 0 && item.transferwallet === true
                  )
                  .filter((e) => {
                    if (config.features.MergeEVORTNT) {
                      if (!(e.gpcode === "NTTF" || e.gpcode === "RTTF")) {
                        return e;
                      }
                    } else {
                      return e;
                    }
                  })
                  .map((item, index) => (
                    <option value={item.gpcode} key={index}>
                      {this.gpNameSwitcher(item)}
                    </option>
                  ))}
              </CustomSelect>
            </CustomFormControl>

            <QuickTransferArrow></QuickTransferArrow>
            <CustomFormControl>
              <CustomSelect
                native
                variant="outlined"
                value={this.state.transferTo}
                displayEmpty
                onChange={this.handleTransferToChange}
              >
                <option value={this.state.mainAccountId}>
                  {i18n.t("transfer.mainAccount")}
                </option>
                {this.props.game.providerList
                  .filter(
                    (item) => item.status === 0 && item.transferwallet === true
                  )
                  .filter((e) => {
                    if (config.features.MergeEVORTNT) {
                      if (!(e.gpcode === "NTTF" || e.gpcode === "RTTF")) {
                        return e;
                      }
                    } else {
                      return e;
                    }
                  })
                  .map((item, index) => (
                    <option value={item.gpcode} key={index}>
                      {this.gpNameSwitcher(item)}
                    </option>
                  ))}
              </CustomSelect>
            </CustomFormControl>

            <QuickTransferLabel>{i18n.t("common.amount")}</QuickTransferLabel>
            <CurrencyTextFieldReplacement
              value={this.state.transferAmount}
              placeholder="0.00"
              onChange={(e) => {
                this.setState({
                  ...this.state,
                  transferAmount: e.target.value,
                });
              }}
              autoComplete="off"
              minimumValue="0"
              inputProps={{
                maxLength: 15,
              }}
            ></CurrencyTextFieldReplacement>
            <QuickTransferButton
              disabled={
                this.state.transferFrom === "" ||
                this.state.transferTo === "" ||
                this.state.disabled
              }
              onClick={this.handleTranferClick}
            >
              {i18n.t("transfer.transfer")}
            </QuickTransferButton>
          </QuickTransferContainer>
        </QuickTransferWrap>
        <Header>
          <Title>
            <h3>{i18n.t("transfer.transferWallet")}</h3>
          </Title>
        </Header>
        {/* <SubTitle>{i18n.t("transfer.transferWallet")}</SubTitle>{" "} */}
        <CustomSwitchContainer>
          <div>
            {i18n.t("transfer.autoTransfer")} (
            {this.props.wallet.autotransfer === true
              ? i18n.t("transfer.on")
              : i18n.t("transfer.off")}
            )
          </div>
          <CustomSwitch
            checked={this.props.wallet.autotransfer === true}
            onChange={this.handleSwitchAutoTransfer}
          />
          <GameWalletButton
            style={{ marginTop: 0, marginLeft: 10 }}
            onClick={() => {
              this.props.performWithdrawFromEveryBrand();
            }}
          >
            {i18n.t("transfer.oneKeyTransferOut")}
          </GameWalletButton>
        </CustomSwitchContainer>

        <GameWalletWrap>
          <TransferContainer>
            {this.props.game.providerList
              .filter(
                (item) => item.status === 0 && item.transferwallet === true
              )
              .filter((e) => {
                if (config.features.MergeEVORTNT) {
                  if (!(e.gpcode === "NTTF" || e.gpcode === "RTTF")) {
                    return e;
                  }
                } else {
                  return e;
                }
              })
              .map((item, key) => {
                const displayLogo = () => {
                  if (
                    item.gpcode.toLowerCase() === "evotf" &&
                    config.features.MergeEVORTNT
                  ) {
                    return "evontrt";
                  } else {
                    return item.gpcode.toLowerCase();
                  }
                };
                return (
                  <GameTranferWallet key={item.id}>
                    <GameTranferLeftWrap>
                      <GameIcon
                        src={
                          process.env.PUBLIC_URL +
                          `/assets/images/provider/transfer/${displayLogo()}.png`
                        }
                      ></GameIcon>
                      <GameName>
                        <DynamicFont
                          content={this.gpNameSwitcher(item)}
                        ></DynamicFont>
                      </GameName>
                    </GameTranferLeftWrap>

                    <GameWalletButton
                      disabled={item.maintenance === 1}
                      onClick={() => this.handleTranferIn(item.gpcode)}
                    >
                      {i18n.t("transfer.oneKeyTransferIn")}
                    </GameWalletButton>
                    <GameWalletAmount>
                      {item.maintenance === 1
                        ? i18n.t("transfer.maintenance")
                        : "$" + Common.formatNumberWithCommas(item.balance)}
                    </GameWalletAmount>
                  </GameTranferWallet>
                );
              })}
          </TransferContainer>
        </GameWalletWrap>
        <Loading
          show={
            this.state.loading ||
            this.props.wallet.transferLoading ||
            this.props.wallet.updateBalanceloading
          }
        ></Loading>
        <Messagebox
          open={this.state.showMessagebox}
          message={this.state.messageboxText}
          onhandleCloseDialog={() =>
            this.setState({ ...this.state, showMessagebox: false })
          }
        ></Messagebox>
      </Container>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    account: state.account,
    wallet: state.wallet,
    game: state.game,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getBalanceList: () => dispatch(walletAction.getBalanceList()),
    resetResult: () =>
      dispatch({
        type: RESET_WALLETRESULT,
      }),
    doTransfer: (gpcode, amount) =>
      dispatch(walletAction.doTransfer(gpcode, amount)),
    doWithdrawalFromGame: (gpcode, amount) =>
      dispatch(walletAction.doWithdrawalFromGame(gpcode, amount)),
    getGameBalance: (gpcode) => dispatch(walletAction.getGameBalance(gpcode)),
    doWithdrawAll: () => dispatch(walletAction.doWithdrawAll()),
    updateAutoTransferStatus: () =>
      dispatch(walletAction.updateAutoTransferStatus()),
    getAutoTransferStatus: () => dispatch(walletAction.getAutoTransferStatus()),
    performWithdrawFromEveryBrand: () =>
      dispatch(walletAction.performWithdrawFromEveryBrand()),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withSnackbar(Transfer));
