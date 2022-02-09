import React from "react";
import styled from "styled-components";

const SpecialContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const GameLister = styled.div`
  display: grid;
  grid-template-columns: auto auto auto;
`;

const GameListItem = styled.div`
  display: flex;
  margin: 20px 20px 0px 20px
  align-items: center;
  position: relative;
  justify-content: center;
`;

const GameListName = styled.div`
  color: white;
  font-weight: bold;
  font-size: 32px;
  margin-top: -20px;
  text-align: center;
`;

const CustomSize = styled.img`
  height: 144px;
  zoom: 2;
`;

const Template4 = ({ gameMenu, shiftScene, changeShowGame, template }) => {
  return (
    <div>
      <GameLister>
        {gameMenu.map((i, index) => {
          return (
            <SpecialContainer>
              <GameListItem
                onClick={() => {
                  shiftScene(2, i.type);
                  changeShowGame(i.type);
                }}
              >
                <CustomSize
                  src={
                    process.env.PUBLIC_URL +
                    `/assets/images/wapp/home/T${template}/${i.image}.svg`
                  }
                />
              </GameListItem>
              <GameListName>{i.title}</GameListName>
            </SpecialContainer>
          );
        })}
      </GameLister>
    </div>
  );
};

export default Template4;
