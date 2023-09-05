import React, { useEffect } from "react";
import { TabContentTitle, TabsContent } from "..";

import styled from "styled-components";
import moment from "moment";
import Modal from "../modal";
import { useState } from "react";
import i18n from "../../../../../../utils/i18n";
import Pagination from "../../component/pagination";

const CustomTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  white-space: nowrap;

  background-color: #fff;
  text-align: left;

  tr {
    border-bottom: 1px solid #eaeaea;
  }

  thead {
    tr {
      th {
        padding: 5px 10px;
        &:last-child {
          text-align: right;
        }
      }
    }
  }

  tbody {
    tr {
      td {
        padding: 5px 10px;
      }
      &:last-child {
        border-bottom: none;
      }
    }
  }
`;

const ContentButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3px 4px;
  color: #fff;
  border-radius: 6px;
  border: solid 1px ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.primary};
  user-select: none;
  &:hover {
    cursor: pointer;
  }
`;

const CustomTableRow = styled.tr`
  cursor: pointer;
  &:hover {
    background-color: #f5f5f5;
  }
`;

const Title = styled.div`
  font-size: 34px;
  font-weight: 600;
`;

const ContentWrapper = styled.div`
  ${({ className }) => {
    return className ? `text-align: center;` : "";
  }}
`;

const Content = styled.div`
  padding: 20px;
  white-space: pre-wrap;
`;

const UpperSection = styled.div`
  padding: 20px;
`;

const InputRow = styled.div`
  display: grid;
  grid-template-columns: 20% 1fr;
  padding-bottom: 10px;
`;

const InputLabel = styled.p`
  margin: 5px;
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
  padding: 10px 32px;
  border-radius: 6px;
  cursor: pointer;
  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
  ${({ className }) => {
    return className === "right" ? `float: right;` : "";
  }}
`;

const CustomTextfield = styled.input`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  outline: none;
  padding: 5px 10px;

  ::placeholder {
    color: #eaeaea;
  }
`;

const PaginationWrapper = styled.div`
  padding: 0 10px;
`;

const Inbox = ({ memo, getmemo, performReplyMemo, readMemo, setMemo }) => {
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState("");
  const [confirmModal, setConfirmModal] = useState(false);

  const [memoSubject, setMemoSubject] = useState("");
  const [memoContent, setMemoContent] = useState("");
  const [memoOriMsg, setmemoOriMsg] = useState("");

  const [page, setPage] = useState(1);
  const [row, setRow] = useState(10);

  var maxPage = Math.ceil(memo?.totalcount / row);

  useEffect(() => {
    getmemo("", page, row).then((res) => {
      if (res.IsSuccess) {
        setMemo(res.data);
      }
    });
  }, [page]);

  const nextPage = () => {
    if (page < maxPage) {
      setPage(page + 1);
    }
  };

  const prevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const performCloseConfirmation = () => {
    setConfirmModal(false);
  };

  const performCloseModal = () => {
    setOpen(false);
    setReplyModal(false);
    //reset form
    setMemoSubject("");
    setMemoContent("");
  };

  const performReadInbox = (id) => {
    getmemo(id).then((res) => {
      if (res.IsSuccess) {
        readMemo(id);
        setContent(res.data);
        setOpen(true);
      }
    });
  };

  const dateTimeFormatter = (date) => {
    const today = moment();
    const diffInDays = today.diff(date, "days");
    return (
      moment(date).format("YYYY/MM/DD") +
      " - " +
      diffInDays +
      " " +
      i18n.t("daysago")
    );
  };
  const [replyModal, setReplyModal] = useState(false);
  const [replyId, setReplyId] = useState("");

  const getMemoMsg = (id) => {
    getmemo(id).then((res) => {
      if (res.IsSuccess) {
        setmemoOriMsg(res.data.content);
      }
    });
  };

  const performReplyClickAction = (item) => {
    setReplyModal(true);
    setMemoSubject("Re: " + item.subject);
    getMemoMsg(item.id);
    setReplyId(item.id);
  };

  return (
    <>
      <TabContentTitle>{i18n.t("memo")}</TabContentTitle>
      <TabsContent>
        <CustomTable>
          <thead>
            <tr>
              <th>{i18n.t("date")}</th>
              <th style={{ width: "60%" }}>{i18n.t("subject")}</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {memo.items &&
              memo.items.map((item, index) => {
                return (
                  <CustomTableRow key={index}>
                    <td>{moment(item.sentOn).format("D MMMM YYYY HH:mm")}</td>
                    <td
                      onClick={() => {
                        performReadInbox(item.id);
                      }}
                    >
                      {item.subject}
                    </td>
                    <td>
                      <ContentButton
                        onClick={() => {
                          performReplyClickAction(item);
                        }}
                      >
                        {i18n.t("reply")}
                      </ContentButton>
                    </td>
                  </CustomTableRow>
                );
              })}
          </tbody>
        </CustomTable>
        <PaginationWrapper>
          <Pagination
            next={nextPage}
            prev={prevPage}
            page={page}
            maxPage={maxPage}
          />
        </PaginationWrapper>
      </TabsContent>
      <Modal open={open} handleClose={performCloseModal}>
        <ContentWrapper>
          <UpperSection>
            <Title>{content.subject}</Title>
            <div>
              {i18n.t("sentBy")} {content.sender}{" "}
              {dateTimeFormatter(content.sentOn)}
            </div>
          </UpperSection>

          <Content>{content.content}</Content>
        </ContentWrapper>
      </Modal>

      <Modal open={replyModal} handleClose={performCloseModal}>
        <Content>
          <InputRow>
            <div>
              <InputLabel>{i18n.t("subject")}</InputLabel>
            </div>
            <div>
              <CustomTextfield
                value={memoSubject}
                disabled
                onChange={(e) => {
                  setMemoSubject(e.target.value);
                }}
              />
            </div>
          </InputRow>
          <InputRow>
            <div>
              <InputLabel>
                <span style={{ color: "red" }}>*</span>
                {i18n.t("yourmessage")}
              </InputLabel>
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
            <div>
              <InputLabel>{i18n.t("originalmessage")}</InputLabel>
            </div>
            <div>
              <CustomTextArea
                rows="7"
                cols="50"
                value={memoOriMsg}
                readonly
                disabled
              />
            </div>
          </InputRow>

          <InputRow>
            <div></div>
            <div>
              <CustomButton
                className={"right"}
                disabled={memoContent === ""}
                onClick={() => {
                  setConfirmModal(true);
                }}
              >
                {i18n.t("common.submit")}
              </CustomButton>
            </div>
          </InputRow>
        </Content>
      </Modal>

      <Modal open={confirmModal} handleClose={performCloseConfirmation}>
        <ContentWrapper className={"confirm-submit"}>
          <Content>
            <h3>{i18n.t("confirmSubmit")}?</h3>
          </Content>
          <CustomButton
            onClick={() => {
              performReplyMemo(replyId, memoContent);
              performCloseConfirmation();
              performCloseModal();
            }}
          >
            {i18n.t("common.submit")}
          </CustomButton>
        </ContentWrapper>
      </Modal>
    </>
  );
};

export default Inbox;
