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

const defaultpomodoroTimerLimit = 0.1
const defaultbreakTimerLimit = 0.1
class App extends Component {
  constructor(props) {
    super(props)

    this.handlePausePlay = this.handlePausePlay.bind(this)
  }
  state = {
    progress: 1,
    timer: 6000,
    title: '',
    pomodoroTimerLimit: defaultpomodoroTimerLimit,
    breakTimerLimit: defaultbreakTimerLimit,
    currentPomodoro: `${String(defaultpomodoroTimerLimit).padStart(2, 0)}:00`,
    currentBreak: `${String(defaultbreakTimerLimit).padStart(2, 0)}:00`,
    pomodoroStatus: 'session',
    themeColor: '#FF0060',
  }

  componentDidMount() {
    this.startPomodoro()
  }

  convertReadbleMS(timeInMs) {
    const parsedTime = parseMs(timeInMs)
    const timeStr = parsedTime.hours
      ? `${parsedTime.hours + parsedTime.days * 24}:${parsedTime.minutes}:${parsedTime.seconds}`
      : `${parsedTime.minutes}:${parsedTime.seconds}`
    return timeStr
      .split(':')
      .map((num) => `${num}`.padStart(2, '0'))
      .join(':')
  }

  startPomodoro() {
    const timerInMS = this.state.pomodoroTimerLimit * 60 * 1000
    this.pomodoroTimer = new StopWatch(timerInMS)
    this.setState({pomodoroStatus: 'session'})
    this.pomodoroTimer.onTime((time) => {
      const progress = mapRange({
        from: [timerInMS, 0],
        to: [1, 0]
      }, time.ms)
      this.setState({
        progress,
        currentPomodoro: this.convertReadbleMS(time.ms),
      })
    })
    this.pomodoroTimer.onDone(() => {
      this.setState({themeColor: '#0CCE6B'})
      setTimeout(() => {
        this.startBreak()
        this.breakTimer.start()
      }, 1000)
    })
  }

  startBreak() {
    const timerInMS = this.state.breakTimerLimit * 60 * 1000
    this.breakTimer = new StopWatch(timerInMS)
    this.setState({pomodoroStatus: 'break'})
    this.breakTimer.onTime((time) => {
      const progress = mapRange({
        from: [timerInMS, 0],
        to: [0, 1]
      }, time.ms)

      this.setState({
        progress,
        currentBreak: this.convertReadbleMS(time.ms)
      })
    })
    this.breakTimer.onDone(() => {
      this.setState({themeColor: '#FF0060'})
      setTimeout(() => {
        this.startPomodoro()
        this.pomodoroTimer.start()
      }, 1000)
    })
  }

  handlePausePlay() {
    if (this.state.pomodoroStatus === 'session') {
      if (this.pomodoroTimer.state === 1) {
        //if timer is running
        this.pomodoroTimer.stop()
      } else {
        this.pomodoroTimer.start()
      }
    } else {
        if (this.breakTimer.state === 1) {
          this.breakTimer.stop()
        } else {
          this.breakTimer.start()
        }
    }
  }

  componentWillUnmount() {
    this.pomodoroTimerLimit.stop()
    this.breakTimerLimit.stop()
  }

  render() {
    const shouldbuttonDisable =
      !((this.pomodoroTimer && this.pomodoroTimer.state === 0) ||
      (this.breakTimer && this.breakTimer.state === 0))

    return (
      <Main>
        <ButtonsContainer>
          <Button color={this.state.themeColor} label='session' time={this.state.pomodoroTimerLimit} disable={shouldbuttonDisable} />
        </ButtonsContainer>
        <Container>
          <OuterCard>
            <LightCircle color={this.state.themeColor}>
              <AnimatedCircle size={280} color={this.state.themeColor} progress={this.state.progress} />
              <TopCircle onClick={this.handlePausePlay} color={this.state.themeColor}>
                <div>{this.state.pomodoroStatus}</div>
                {(this.state.pomodoroStatus === 'session')
                  ? this.state.currentPomodoro
                  : this.state.currentBreak}
              </TopCircle>
            </LightCircle>
          </OuterCard>
        </Container>
        <ButtonsContainer>
          <Button color={this.state.themeColor} label='break' time={this.state.breakTimerLimit} disable={shouldbuttonDisable} />
        </ButtonsContainer>
      </Main>
    )
  }
}

export default App
