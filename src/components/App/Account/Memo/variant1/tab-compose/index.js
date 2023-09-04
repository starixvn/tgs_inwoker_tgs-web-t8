import React from "react";
import { TabContentTitle, TabsContent } from "..";
import styled from "styled-components";
import { useState } from "react";
import i18n from "../../../../../../utils/i18n";

const InputRow = styled.div`
  display: grid;
  grid-template-columns: 20% 1fr;
  padding-bottom: 10px;
`;

const CustomTextArea = styled.textarea`
  outline: none;
  padding: 5px 10px;
  border: solid 1px #b7c7cc;
  width: -webkit-fill-available;
`;

const CustomButton = styled.button`
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
  outline: none;
  padding: 5px 10px;
  border: solid 1px #b7c7cc;

  ::placeholder {
    color: #eaeaea;
  }
`;

const Compose = ({ composeMemo }) => {
  const [memoContent, setMemoContent] = useState("");
  const [memoSubject, setMemoSubject] = useState("");

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
              onClick={() => {
                composeMemo(memoSubject, memoContent);
              }}
            >
              {i18n.t("common.submit")}
            </CustomButton>
          </div>
        </InputRow>
      </TabsContent>
    </>
  );
};

export default Compose;
