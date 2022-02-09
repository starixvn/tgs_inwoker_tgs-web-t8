import React from 'react'
import styled from 'styled-components'

const GameLister = styled.div`
  display: grid;
  grid-template-columns: auto auto;
`

const GameListItem = styled.div`
  margin: 20px;
  display: flex;
  align-items: center;
  position: relative;
  justify-content: center;
`

const GameListName = styled.div`
  position: absolute;
  font-size: 50px;
  color: #243648;
  font-weight: bold;
  ${({ big }) => {
    return big
      ? `
      right: 25px;
      bottom: 25px;
      text-align: right;
        `
      : `
      left: 110px;
      bottom: 44px;  
       `
  }};
`

const Template5 = ({ gameMenu, shiftScene, changeShowGame, template }) => {
  return (
    <div>
      <GameLister>
        {gameMenu.map((i, index) => {
          return (
            <GameListItem
              onClick={() => {
                shiftScene(2, i.type)
                changeShowGame(i.type)
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
        })}
      </GameLister>
    </div>
  )
}

export default Template5
