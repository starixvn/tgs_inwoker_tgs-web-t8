import React from 'react'
import Template2 from './template2'
import Template3 from './template3'
import Template4 from './template4'
import Template5 from './template5'
import Template6 from './template6'
import Template7 from './template7'

const TemplateSwitcher = ({
  template,
  gameTypeListSorting,
  homePageGameList,
  getImgPrefix,
  selectedGameType,
  convertGameTypeToText,
  handleGameTypeClick,
  handleGameClick,
  gameMenu,
  shiftScene,
  changeShowGame,
  scrollRef,
  handleSignupClick
}) => {
  const commonprops = {
    gameTypeListSorting: gameTypeListSorting,
    homePageGameList: homePageGameList,
    getImgPrefix: getImgPrefix,
    selectedGameType: selectedGameType,
    convertGameTypeToText: convertGameTypeToText,
    handleGameTypeClick: handleGameTypeClick,
    handleGameClick: handleGameClick,
    gameMenu: gameMenu,
    shiftScene: shiftScene,
    changeShowGame: changeShowGame,
    template: template,
    scrollRef: scrollRef,
    handleSignupClick: handleSignupClick
  }

  const switchTemplate = (template) => {
    switch (template) {
      case 2:
        return <Template2 {...commonprops} />
      case 3:
        return <Template3 {...commonprops} />
      case 4:
        return <Template4 {...commonprops} />
      case 5:
        return <Template5 {...commonprops} />
      case 6:
        return <Template6 {...commonprops} />
      case 7:
        return <Template7 {...commonprops} />
    }
  }
  return switchTemplate(template)
}

export default TemplateSwitcher
