import React from 'react'
import Slider from 'react-slick'
import styled from 'styled-components'
import i18n from '../../../../../../utils/i18n'
import Marquee from '../../Marquee'

const CustomContainer = styled.div`
  height: 400px;
`

const SliderContainer = styled.div`
  padding: 20px 20px 0px 20px;
`

const NoGapContainer = styled.div`
  padding: 0;
`

const AnnouncementContainer = styled.div`
  margin: 10px 23px;
  display: flex;
  align-items: center;

  position: ${({ up }) => {
    return up ? '' : 'absolute'
  }};
  bottom: 0;
`
const AnnouncementTitle = styled.div`
  font-size: 28px;

  color: ${({ theme }) => theme.secondary};
  font-weight: bold;
  display: flex;
  flex: none;
  align-items: center;
`
const MarqueeContainer = styled.div`
  white-space: nowrap;
  letter-spacing: 1.5px;
  font-size: 21px;
  line-hight: 26px;
  overflow: hidden;
  margin: 5px 0 0 8px;

  height: 36px;
  border-radius: 17px;
`

const TheIcon = styled.div`
  width: 80px;
  height: 80px;
  mask: ${({ icon }) => {
    return `url(${icon}) no-repeat center /
  contain;`
  }};
`

const AnnounceIcon = styled(TheIcon)`
  background: ${({ theme }) => theme.primary};
  width: 40px;
  height: 40px;
  margin-right: 10px;
`

const FixedContainer = styled.div`
  position: fixed;
  top 125px;
  min-height: 390px;
  width: 100vw;
  background: ${({ theme }) => theme.body};
  z-index:2;
`

const ScrollContainer = styled.div`
  padding-top: 125px;
  height: 520px;
  position: relative;
`

const NoGapDownContainer = styled.div`
  height: 520px;
  padding-top: 125px;
`

const BannerImgs = styled.div`
  background: url(${({ src }) => src}) no-repeat center;
  background-size: cover;
  height: 300px;
`
const ATag = styled.a`
  text-decoration: none;
`
const settings = {
  dots: true,
  className: 'center',
  centerMode: true,
  infinite: true,
  centerPadding: '0',
  slidesToShow: 1,
  speed: 500,
  arrows: false,
  autoplay: true
}
const Banner = ({ updown, banner }) => {
  const SliderWrapper = () => {
    return (
      <Slider {...settings}>
        {banner.map((data, index) => {
          return (
            <ATag href={data.navurl} key={index} target='_blank'>
              <BannerImgs
                src={data.mobileurl}
                alt={data.alt}
                title={data.alt}
              />
            </ATag>
          )
        })}
      </Slider>
    )
  }
  const bannerPositionSwitcher = (position) => {
    switch (position) {
      case 'fixed':
        return (
          <FixedContainer>
            <SliderContainer>
              <SliderWrapper />
            </SliderContainer>
            <AnnouncementContainer up={false}>
              <AnnouncementTitle>
                <AnnounceIcon
                  icon={
                    process.env.PUBLIC_URL + `/assets/images/wapp/announce.svg`
                  }
                />
                <div>
                  {i18n.t('wap.main.home.profile.announcement')}
                </div>
              </AnnouncementTitle>
              <MarqueeContainer>
                <Marquee />
              </MarqueeContainer>
            </AnnouncementContainer>
          </FixedContainer>
        )
      case 'scroll':
        return (
          <ScrollContainer>
            <AnnouncementContainer up={true}>
              <AnnouncementTitle>
                <AnnounceIcon
                  icon={
                    process.env.PUBLIC_URL + `/assets/images/wapp/announce.svg`
                  }
                />
                <div>
                  {i18n.t('wap.main.home.profile.announcement')}
                </div>
              </AnnouncementTitle>
              <MarqueeContainer>
                <Marquee />
              </MarqueeContainer>
            </AnnouncementContainer>
            <SliderContainer>
              <SliderWrapper />
            </SliderContainer>
          </ScrollContainer>
        )
      case 'no-gap-down':
        return (
          <NoGapDownContainer>
            <AnnouncementContainer up={true}>
              <AnnouncementTitle>
                <AnnounceIcon
                  icon={
                    process.env.PUBLIC_URL + `/assets/images/wapp/announce.svg`
                  }
                />
                <div>
                  {i18n.t('wap.main.home.profile.announcement')}
                </div>
              </AnnouncementTitle>
              <MarqueeContainer>
                <Marquee />
              </MarqueeContainer>
            </AnnouncementContainer>
            <NoGapContainer>
              <SliderWrapper />
            </NoGapContainer>
          </NoGapDownContainer>
        )
      case 'no-gap-up':
        return (
          <ScrollContainer>
            <NoGapContainer>
              <SliderWrapper />
            </NoGapContainer>
            <AnnouncementContainer up={false}>
              <AnnouncementTitle>
                <AnnounceIcon
                  icon={
                    process.env.PUBLIC_URL + `/assets/images/wapp/announce.svg`
                  }
                />
                <div>
                  {i18n.t('wap.main.home.profile.announcement')}
                </div>
              </AnnouncementTitle>
              <MarqueeContainer>
                <Marquee />
              </MarqueeContainer>
            </AnnouncementContainer>
          </ScrollContainer>
        )
      case 'down':
        return (
          <CustomContainer>
            <SliderContainer>
              <SliderWrapper />
            </SliderContainer>
            <AnnouncementContainer up={true}>
              <AnnouncementTitle>
                <AnnounceIcon
                  icon={
                    process.env.PUBLIC_URL + `/assets/images/wapp/announce.svg`
                  }
                />
                <div>
                  {i18n.t('wap.main.home.profile.announcement')}
                </div>
              </AnnouncementTitle>
              <MarqueeContainer>
                <Marquee />
              </MarqueeContainer>
            </AnnouncementContainer>
          </CustomContainer>
        )
    }
  }

  return bannerPositionSwitcher(updown)
}

export default Banner
