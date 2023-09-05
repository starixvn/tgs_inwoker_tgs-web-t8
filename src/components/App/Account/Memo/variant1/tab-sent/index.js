import React from "react";
import { TabContentTitle, TabsContent } from "..";
import moment from "moment";
import styled from "styled-components";
import i18n from "../../../../../../utils/i18n";
import Modal from "../modal";
import { useState } from "react";
import { useEffect } from "react";
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
        padding: 10px;
      }
      &:last-child {
        border-bottom: none;
      }
    }
  }
`;

const ContentWrapper = styled.div``;

const Content = styled.div`
  padding: 20px;
  white-space: pre-wrap;
`;

const UpperSection = styled.div`
  padding: 20px;
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

const PaginationWrapper = styled.div`
  padding: 0 10px;
`;
const Sent = ({ sent, action, username, setSent }) => {
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState("");

  const [page, setPage] = useState(1);
  const [row, setRow] = useState(10);

  var maxPage = Math.ceil(sent?.totalcount / row);

  useEffect(() => {
    action("get", "", page, 10).then((result) => {
      if (result.IsSuccess) {
        setSent(result.data);
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
  const performOpenModal = (id) => {
    action("read", id).then((res) => {
      setContent(res.data);
      setOpen(true);
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
  const performCloseModal = () => {
    setOpen(false);
  };

  return (
    <>
      <TabContentTitle>{i18n.t("sent")}</TabContentTitle>
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
            {sent.items &&
              sent.items.map((item, index) => {
                return (
                  <CustomTableRow key={index}>
                    <td>{moment(item.sentOn).format("D MMMM YYYY HH:mm")}</td>
                    <td
                      onClick={() => {
                        performOpenModal(item.id);
                      }}
                    >
                      {item.subject}
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
              {i18n.t("sentBy")} {username} {dateTimeFormatter(content.sentOn)}
            </div>
          </UpperSection>

          <Content>{content.content}</Content>
        </ContentWrapper>
      </Modal>
    </>
  );
};

export default Sent;
