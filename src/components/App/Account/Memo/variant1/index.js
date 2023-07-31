import React from "react";
import styled from "styled-components";
import i18n from "../../../../../utils/i18n";
import { useState } from "react";
import Compose from "./tab-compose";
import Inbox from "./tab-inbox";
import Sent from "./tab-sent";

const Container = styled.div`
  padding: 20px 28px;
  box-sizing: border-box
  width: 100%;
  min-height: 611px;     
  font-size: 14px;
  background-color:#f7f7f7;
`;

const InnerWrap = styled.div`
  width: 100%;
  margin-top: 18px;
  box-sizing: border-box;
  background-color: ${({ theme }) => {
    return theme.darkMode ? theme.customProfileBackground80 : "#f7f7f7;";
  }}

  position: relative;
  

`;

const Tab = styled.div`
  display: flex;
  border-bottom: 1px solid #eaeaea;
  width: 100%;
`;

export const TabContentTitle = styled.div`
  border-bottom: 1px solid #eaeaea;
  padding: 10px 20px;
`;
const TabsButton = styled.div`
  padding: 10px 20px;
  ${({ selected }) => {
    return selected ? "background-color: #fff" : "background-color: #f7f7f7";
  }}
  cursor: pointer;
  user-select: none;
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

export const TabsContent = styled.div`
  padding: 15px 25px;
  width: 100%;
  background: #fff;
`;

const MemoVariant1 = ({
  sent,
  memo,
  getMemoV2,
  readMemo,
  deliveryBox,
  performComposeMemo,
  performReplyMemo,
}) => {
  const [selected, setSelected] = useState("compose");

  const tabContentSwitcher = (text) => {
    switch (text) {
      case "compose":
        return <Compose composeMemo={performComposeMemo} />;
      case "memoinbox":
        return (
          <Inbox
            readMemo={readMemo}
            memo={memo}
            getmemo={getMemoV2}
            performReplyMemo={performReplyMemo}
          />
        );
      case "sent":
        return <Sent sent={sent} action={deliveryBox} />;
      default:
        return <Compose />;
    }
  };

  const Tabs = ({ icon, text }) => {
    return (
      <TabsButton
        selected={selected === text}
        onClick={() => {
          setSelected(text);
        }}
      >
        <div>{icon}</div>
        <div>{i18n.t(text)}</div>
      </TabsButton>
    );
  };

  return (
    <Container>
      <Header>
        <Title>
          <h3>{i18n.t("memo")}</h3>
        </Title>
      </Header>
      <InnerWrap>
        <div style={{ width: "inherit" }}>
          <Tab>
            <Tabs text="compose" />
            <Tabs text="memoinbox" />
            <Tabs text="sent" />
          </Tab>
          {tabContentSwitcher(selected)}
        </div>
      </InnerWrap>
    </Container>
  );
};

export default MemoVariant1;
