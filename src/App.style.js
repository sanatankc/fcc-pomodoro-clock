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
  position: relative;
  background: #FFE3EB;
`