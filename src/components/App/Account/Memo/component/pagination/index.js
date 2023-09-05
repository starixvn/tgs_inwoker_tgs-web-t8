import React from "react";
import styled from "styled-components";

const PaginationContainer = styled.div`
  padding: 10px 0;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  align-items: center;
`;

const Chevron = styled.div`
  mask: url(${({ position }) => {
    return (
      process.env.PUBLIC_URL +
      "/assets/images/iconpack/chev-" +
      position +
      ".svg"
    );
  }});
  mask-size: cover;
  cursor: pointer;
  background: #000;
  opacity: ${({ disabled }) => {
    return disabled ? "0.3" : "1";
  }};
  height: 25px;
  width: 25px;
`;

const Pagination = ({ next, prev, page, maxPage }) => {
  var prevDisable = page === 1;
  var nextDisable = page === maxPage;
  return (
    <PaginationContainer>
      <div onClick={prev}>
        <Chevron position="left" disabled={prevDisable} />
      </div>
      <div onClick={next}>
        <Chevron position="right" disabled={nextDisable} />
      </div>
    </PaginationContainer>
  );
};

export default Pagination;
