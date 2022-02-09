import React from 'react'
import styled from 'styled-components'

const GameLister = styled.div`
  display: grid;
  grid-template-columns: auto;
`

const GameListItem = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  justify-content: center;
  margin-bottom: 20px;
`

const GameListName = styled.div`
  position: absolute;
  font-size: 60px;
  color: #fff;
  font-weight: bold;
  left: 80px;
  bottom: 70px;
`

const Images = styled.img`
  zoom: 1.8;
`

const Template7 = ({ gameMenu, shiftScene, changeShowGame, template }) => {
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
              <Images
                src={
                  process.env.PUBLIC_URL +
                  `/assets/images/wapp/home/T${template}/${i.image}.jpg`
                }
              />
              <GameListName>{i.title}</GameListName>
            </GameListItem>
          )
        })}
      </GameLister>
    </div>
  )
}

export default Template7
