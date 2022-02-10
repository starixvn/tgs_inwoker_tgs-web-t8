import { Grid, Container as MContainer } from "@material-ui/core";
import React from "react";
import styled from "styled-components";

import ItemPNG from "../../../assets/images/home/section/section3-item.png"
import i18n from "../../../utils/i18n";

const Container = styled(Grid)`
  width: 1280px;
  margin: 0 auto;
  margin-top: 175px;
  position: relative;
  display: flex;
  justify-content: space-between;
`;

const ItemInnerLabel = styled.div`
  font-size: 38px;
  font-weight: bold;
  padding-bottom: 100px;
`;

const ItemBottomLabel = styled.div`
  color: #BABABA;
  font-size: 30px;
`;

const ItemContainer = styled.div`
  background: url(${ItemPNG}) no-repeat;
  background-position-x: center;
  width: 235px;
  height: 280px;
  color: #ffffff;
  text-align: center;
  padding-top: 80px;
`;

const itemList = [
  {
    innerText: '30秒',
    bottomText: '平均存款时间',
  },
  {
    innerText: '50秒',
    bottomText: '平均取款时间',
  },
  {
    innerText: '60家',
    bottomText: '合作支付平台',
  },
  {
    innerText: '80家',
    bottomText: '合作游戏平台',
  }
]

const ThirdSection = (props) => {

  return (<Container>
    {itemList.map((item,index)=>{
      return(
        <ItemContainer key={index}>
          <ItemInnerLabel>{item.innerText}</ItemInnerLabel>
          <ItemBottomLabel>{item.bottomText}</ItemBottomLabel>
        </ItemContainer>
      )
    })}
  </Container>);
};

export default ThirdSection;
