import React, { Component } from 'react'
import StopWatch from 'timer-stopwatch'
import 'normalize.css'

import AnimatedCircle from './components/AnimatedCircle/AnimatedCircle'
import Button from './components/Button/Button'
import {
  Main,
  Container,
  OuterCard,
  LightCircle,
  TopCircle,
  ButtonsContainer
} from './App.style'

const mapRange = (obj, num) => (((num - obj.from[0]) * (obj.to[1] - obj.to[0])) / (obj.from[1] - obj.from[0])) + obj.to[0]

class App extends Component {
  state = {
    progress: 0,
    timer: 6000,
    title: '',
    pomodoroTimer: 0.1,
    breakTimer: 0.1,
    pomodoroStatus: ''
  }

  componentDidMount() {
    this.startPomodoro()
  }

  startPomodoro() {
    const timerInMS = this.state.pomodoroTimer * 60 * 1000
    this.pomodoroTimer = new StopWatch(timerInMS)
    this.pomodoroTimer.start()
    this.setState({pomodoroStatus: 'session'})
    this.pomodoroTimer.onTime((time) => {
      const progress = mapRange({
        from: [timerInMS, 0],
        to: [0, 1]
      }, time.ms)
      console.log('helllo')
      this.setState({ progress })
    })
    this.pomodoroTimer.onDone(() => {
      this.startBreak()
    })
    console.log(this.pomodoroTimer)
  }

  startBreak() {
    console.log('sf')
    const timerInMS = this.state.breakTimer * 60 * 1000
    this.breakTimer = new StopWatch(timerInMS)
    this.breakTimer.start()
    this.setState({pomodoroStatus: 'break'})
    this.breakTimer.onTime((time) => {
      console.log('hello', 1)
      const progress = mapRange({
        from: [timerInMS, 0],
        to: [1, 0]
      }, time.ms)

      this.setState({ progress })
    })
    this.breakTimer.onDone(() => {
      this.startPomodoro()
    })
  }

  componentWillUnmount() {
    this.pomodoroTimer.stop()
    this.breakTimer.stop()
  }

  render() {
    return (
      <Main>
        <ButtonsContainer>
          <Button/>
        </ButtonsContainer>
        <Container>
          <OuterCard>
            <LightCircle>
              <AnimatedCircle size={280} color={'#FF0060'} progress={0} />
              <TopCircle>03:15</TopCircle>
            </LightCircle>
          </OuterCard>
        </Container>
        <ButtonsContainer />
      </Main>
    )
  }
}

export default App
