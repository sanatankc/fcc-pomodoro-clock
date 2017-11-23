import React, { Component } from 'react'
import styled from 'styled-components'

const Main = styled.div`
  display: flex;
  box-shadow: 0px 0px 75px 11px rgba(236, 176, 198, 0.27);
  border-radius: 30px 30px 30px 30px;
`
const StyledButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 60px;
  background: #FF0060;
  color: white;
  font-size: 42px;
  cursor: pointer;
  span {
    height: 55px;
  }
`
const PlusButton = StyledButton.extend`
  border-radius: 30px 0px 0px 30px;
  margin-right: 2px;
`
const Status = styled.div`
  display: flex;
  flex-direction: column;
  width: 60px;
  height: 60px;
  background: #fff;
  color: #FF0060;
`

const MinusButton = StyledButton.extend`
  border-radius: 0px 30px 30px 0px;
  margin-left: 2px;
`
const Label = styled.div`
  margin-top: 5px;
  font-size: 12px;
  text-align: center;
  text-transform: capitalize;
`
const Time = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
`

export default class Button extends Component {
  render() {
    return(
      <Main>
        <PlusButton>
          <span>+</span>
        </PlusButton>
        <Status>
          <Label>{this.props.label}</Label>
          <Time>{this.props.time}</Time>
        </Status>
        <MinusButton>
          <span>-</span>
        </MinusButton>
      </Main>
    )
  }
}