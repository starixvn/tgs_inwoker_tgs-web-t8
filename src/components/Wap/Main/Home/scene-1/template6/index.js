import React from 'react'
import styled from 'styled-components'
import i18n from '../../../../../../utils/i18n'

const GameLister = styled.div`
  display: grid;
  grid-template-columns: auto auto;
`

const GameListItem = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  justify-content: center;
`

const GameListName = styled.div`
  position: absolute;
  font-size: 35px;
  color: #000;
  font-weight: bold;
  left: 60px;
  bottom: 70px;
`

const Images = styled.img`
  zoom: 1.8;
`

const Row = styled.div`
  display: grid;
  grid-template-columns: auto auto auto auto auto;
  color: white;
  padding: 0px 40px;
`

const RowContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin: 25px 0px 50px 0px;
`

const StepIcons = styled.img`
  width: auto;
  zoom: 2;
`

const StepText = styled.div`
  font-size: 26px;
  margin-top: 10px;
`

const DescriptionText = styled.div`
  color: white;
  text-align: center;
  font-size: 32px;
  margin: 50px 0px 25px 0px;
`

const Centered = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 50px;
`

const Template6 = ({
  gameMenu,
  shiftScene,
  changeShowGame,
  template,
  handleSignupClick
}) => {
  const steps = [
    {
      step: 1,
      title: i18n.t('wap.main.home.steps.step1'),
      icon: 'register'
    },
    {
      icon: 'next'
    },
    {
      step: 2,
      title: i18n.t('wap.main.home.steps.step2'),
      icon: 'deposit'
    },
    {
      icon: 'next'
    },
    {
      step: 3,
      title: i18n.t('wap.main.home.steps.step3'),
      icon: 'start'
    }
  ]

  return (
    <div>
      <DescriptionText>
        {i18n.t('wap.main.home.steps.desc')}
      </DescriptionText>
      <Row>
        {steps.map((data, index) => {
          return (
            <RowContent>
              <StepIcons
                src={
                  process.env.PUBLIC_URL +
                  `/assets/images/wapp/home/T${template}/${data.icon}.png`
                }
              />
              <StepText>{data.title}</StepText>
            </RowContent>
          )
        })}
      </Row>
      <Centered>
        <StepIcons
          onClick={() => {
            handleSignupClick()
          }}
          src={
            process.env.PUBLIC_URL +
            `/assets/images/wapp/home/T${template}/join.png`
          }
        />
      </Centered>
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
                  `/assets/images/wapp/home/T${template}/${i.image}.png`
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

export default Template6
