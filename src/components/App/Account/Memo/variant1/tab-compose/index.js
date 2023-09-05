import React from "react";
import { TabContentTitle, TabsContent } from "..";
import styled from "styled-components";
import { useState } from "react";
import i18n from "../../../../../../utils/i18n";
import Modal from "../modal";

const InputRow = styled.div`
  display: grid;
  grid-template-columns: 20% 1fr;
  padding-bottom: 10px;
`;

const CustomTextArea = styled.textarea`
  width: 100%;
  box-sizing: border-box;
  outline: none;
  padding: 5px 10px;
  border: solid 1px #b7c7cc;
  width: -webkit-fill-available;
`;

const CustomButton = styled.button`
  float: right;
  background: ${({ theme }) => theme.primary};
  color: #fff;
  border: none;
  outline: none;
  padding: 10px 20px;
  border-radius: 6px;
  cursor: pointer;
  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

const CustomTextfield = styled.input`
  width: 100%;
  box-sizing: border-box;
  outline: none;
  padding: 5px 10px;
  border: solid 1px #b7c7cc;

  ::placeholder {
    color: #eaeaea;
  }
`;

const ModalButton = styled.button`
  background: ${({ theme }) => theme.primary};
  color: #fff;
  border: none;
  outline: none;
  padding: 10px 35px;
  border-radius: 6px;
  cursor: pointer;
`;

const Content = styled.div`
  padding: 20px;

  h3 {
    margin: 30px 0;
  }
`;

const ContentWrapper = styled.div`
  text-align: center;
`;

const Compose = ({ composeMemo }) => {
  const [memoContent, setMemoContent] = useState("");
  const [memoSubject, setMemoSubject] = useState("");

  const [open, setOpen] = useState(false);

  const performCloseModal = () => {
    setOpen(false);
  };

  const confirmSubmission = () => {
    composeMemo(memoSubject, memoContent);
    setOpen(false);
    setMemoContent("");
    setMemoSubject("");
  };

  return (
    <>
      <TabsContent>
        <InputRow>
          <div>
            <span style={{ color: "red" }}>*</span>
            {i18n.t("subject")}
          </div>
          <div>
            <CustomTextfield
              value={memoSubject}
              onChange={(e) => {
                setMemoSubject(e.target.value);
              }}
            />
          </div>
        </InputRow>
        <InputRow>
          <div>
            <span style={{ color: "red" }}>*</span>
            {i18n.t("memo")}
          </div>
          <div>
            <CustomTextArea
              rows="7"
              cols="50"
              value={memoContent}
              placeholder="Enter your memo here..."
              onChange={(e) => {
                const value = e.target.value;
                const lastChar = value.charAt(value.length - 1);
                if (lastChar === "\n") {
                  setMemoContent(value + lastChar);
                } else {
                  setMemoContent(value);
                }
              }}
            />
          </div>
        </InputRow>
        <InputRow>
          <div></div>
          <div>
            <CustomButton
              disabled={memoContent === "" || memoSubject === ""}
              onClick={() => setOpen(true)}
            >
              {i18n.t("common.submit")}
            </CustomButton>
          </div>
        </InputRow>
      </TabsContent>
      <Modal open={open} handleClose={performCloseModal}>
        <ContentWrapper>
          <Content>
            <h3>{i18n.t("confirmSubmit")}?</h3>
          </Content>
          <ModalButton onClick={() => confirmSubmission()}>
            {i18n.t("common.submit")}
          </ModalButton>
        </ContentWrapper>
      </Modal>
    </>
  );
};

export default Compose;
