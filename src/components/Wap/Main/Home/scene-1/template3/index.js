import React from "react";
import styled from "styled-components";

const GameLister = styled.div`
  display: grid;
  grid-template-columns: auto auto;
`;

const GameListItem = styled.div`
  margin: 20px;
  display: flex;
  align-items: flex-end;
  position: relative;
  justify-content: center;
`;

const GameListName = styled.div`
  position: absolute;
  font-size: 50px;
  color: white;
  font-weight: bold;
  width: 220px;
  ${({ big }) => {
    return big
      ? `
      right: 25px;
      bottom: 25px;
      text-align: right;
        `
      : `
      left: 115px;
      top: 50%;
      transform:translateY(-50%);
       `;
  }};
`;

const Template3 = ({
  gameMenu,
  shiftScene,
  changeShowGame,
  template,
  homePageGameList,
}) => {
  return (
    <div>
      <GameLister>
        {gameMenu.map((i, index) => {
          var gameList = homePageGameList.filter(
            (game) => i.type.indexOf(game.type) >= 0
          );

          return (
            gameList.length !== 0 && (
              <GameListItem
                onClick={() => {
                  shiftScene(2, i.type);
                  changeShowGame(i.type);
                }}
              >
                <img
                  src={
                    process.env.PUBLIC_URL +
                    `/assets/images/wapp/home/T${template}/${i.image}.png`
                  }
                />
                <GameListName big={i.big}>{i.title}</GameListName>
              </GameListItem>
            )
          );
        })}
      </GameLister>
    </div>
  );
};

export default Template3;
