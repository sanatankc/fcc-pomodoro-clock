import styled, {css} from 'styled-components'

const size = (size) => {
  return `
    height: ${size};
    width: ${size};
  `
}

const center = css`
  display: flex;
  justify-content: center;
  align-items: center;
`
const circle = css`
  border-radius: 50%;
`
export const Main = styled.div`
  display: flex;
  align-items: center;
  background: #F8FAFD;
  height: 100vh;
  width: 100vw;
`
export const Container = styled.div`
  display: flex;
  justify-content: center;
  height: auto;
  width: 100%;
  background: papayawhip;
`
export const OuterCard = styled.div`
  ${size('350px')}
  ${center}
  background: white;
  box-shadow: 0px 0px 75px 11px rgba(236, 176, 198, 0.27);
  border-radius: 90px;
`
export const LightCircle = styled.div`
  ${size('280px')}
  ${circle}
  ${center}
  position: relative;
  background: #FFE3EB;
`
export const TopCircle = styled.div`
  ${size('170px')}
  ${circle}
  ${center}
  color: #FF799F;
  position: relative;
  background: #FF0060;
  box-shadow: 0px 0px 75px 11px rgba(0, 0, 0, 0.18);
  font-size: 43px;
  text-shadow: 3px 3px 0px rgba(0, 0, 0, 0.1)
`
export const ButtonsContainer = styled.div`
  width: 10px;
  height: 10px;
  bakground: red;
`