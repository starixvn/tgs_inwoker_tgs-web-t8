import { Grid, Container as MContainer } from "@material-ui/core";
import React from "react";
import styled from "styled-components";

import ItemPNG from "../../../assets/images/home/section/section3-item.png"
import i18n from "../../../utils/i18n";

const Container = styled(Grid)`
  width: 1400px;
  margin: 175px auto;
  position: relative;
  display: grid;
  grid-template-columns: repeat(9, 1fr);
  grid-gap: 20px;
`;

const ProviderIMG = styled.div`
  background: url("${process.env.PUBLIC_URL}/assets/images/provider/${(props)=>props.provider}.png") no-repeat;
  width: 130px;
  height: 66px;
`;

const providerList = [
  {
    provider: 'wm',
  },
  {
    provider: 'ly',
  },
  {
    provider: 'ag',
  },
  {
    provider: 'bg',
  },
  {
    provider: 'ky',
  },
  {
    provider: 'rt',
  },
  {
    provider: 'sg',
  },
  {
    provider: 'bc',
  },
  {
    provider: 'imes',
  },
  {
    provider: 'tcg',
  },
  {
    provider: 'vr',
  },
  {
    provider: 'saba',
  },
  {
    provider: 'wm2',
  },
  {
    provider: 'tcg2',
  },
  {
    provider: 'pp',
  },
  {
    provider: 'evo',
  },
  {
    provider: 'nt',
  },
  {
    provider: 'ab',
  },
  {
    provider: 'haba',
  },
  {
    provider: 'sw',
  },
  {
    provider: 'sbo',
  },
  {
    provider: 'tf',
  },
  {
    provider: 'wgfm',
  },
  {
    provider: 'jdb',
  }
]

const FifthSection = (props) => {

  return (<Container>
    {providerList.map((item,index)=>{
      return(
        <ProviderIMG key={index} provider={item.provider}>
        </ProviderIMG>
      )
    })}
  </Container>);
};

export default FifthSection;
