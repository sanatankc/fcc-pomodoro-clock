import React, { Component } from 'react'
import StopWatch from 'timer-stopwatch'
import parseMs from 'parse-ms'
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

const defaultpomodoroTimerLimit = 5
const defaultbreakTimerLimit = 5
class App extends Component {
  state = {
    progress: 0,
    timer: 6000,
    title: '',
    pomodoroTimerLimit: defaultpomodoroTimerLimit,
    breakTimerLimit: defaultbreakTimerLimit,
    currentPomodoro: `${defaultpomodoroTimerLimit}:00`,
    currentBreak: `${defaultbreakTimerLimit}:00`,
    pomodoroStatus: 'session'
  }

  componentDidMount() {
    this.startPomodoro()
  }

  startPomodoro() {
    const timerInMS = this.state.pomodoroTimerLimit * 60 * 1000
    this.pomodoroTimerLimit = new StopWatch(timerInMS)
    this.pomodoroTimerLimit.start()
    this.setState({pomodoroStatus: 'session'})
    this.pomodoroTimerLimit.onTime((time) => {

      const progress = mapRange({
        from: [timerInMS, 0],
        to: [0, 1]
      }, time.ms)
      this.setState({
        progress
      })
    })
    this.pomodoroTimerLimit.onDone(() => {
      this.startBreak()
    })
  }

  startBreak() {
    const timerInMS = this.state.breakTimerLimit * 60 * 1000
    this.breakTimerLimit = new StopWatch(timerInMS)
    this.breakTimerLimit.start()
    this.setState({pomodoroStatus: 'break'})
    this.breakTimerLimit.onTime((time) => {
      console.log(time)
      const progress = mapRange({
        from: [timerInMS, 0],
        to: [1, 0]
      }, time.ms)

      this.setState({
        progress,
      })
    })
    this.breakTimerLimit.onDone(() => {
      this.startPomodoro()
    })
  }

  componentWillUnmount() {
    this.pomodoroTimerLimit.stop()
    this.breakTimerLimit.stop()
  }

  render() {
    return (
      <Main>
        <ButtonsContainer>
          <Button label='session' time={this.state.pomodoroTimerLimit} />
        </ButtonsContainer>
        <Container>
          <OuterCard>
            <LightCircle>
              <AnimatedCircle size={280} color={'#FF0060'} progress={this.state.progress} />
              <TopCircle>{(this.state.pomodoroStatus === 'session')
                ? this.state.currentPomodoro
                : this.state.currentBreak
              }</TopCircle>
            </LightCircle>
          </OuterCard>
        </Container>
        <ButtonsContainer>
          <Button label='break' time={this.state.breakTimerLimit} />
        </ButtonsContainer>
      </Main>
    )
  }
}

export default App
