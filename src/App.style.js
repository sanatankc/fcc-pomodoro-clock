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
  justify-content: center;
  flex-direction: column;
  background: #F8FAFD;
  height: 100vh;
  width: 100vw;
`
export const Container = styled.div`
  display: flex;
  justify-content: center;
  height: auto;
  width: 100%;
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
  transition: 0.3s all ease-in-out;
  background: ${props => props.color + '2b'};
`
export const TopCircle = styled.div`
  ${size('170px')}
  ${circle}
  ${center}
  color: rgba(255, 255, 255, 0.8);
  position: relative;
  background: ${props => props.color};
  transition: 0.3s all ease-in-out;
  box-shadow: 0px 0px 75px 11px rgba(0, 0, 0, 0.18);
  font-size: 43px;
  text-shadow: 3px 3px 0px rgba(0, 0, 0, 0.1);
  text-transform: capitalize;
  cursor: pointer;
  div {
    position: absolute;
    top: 27px;
    font-size: 18px;
  }
`
export const ButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100px;
`