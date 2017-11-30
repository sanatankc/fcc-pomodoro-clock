import React, { Component } from 'react'
import GitHubForkRibbon from 'react-github-fork-ribbon'
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

const convertReadableMS = timeInMs => {
  const parsedTime = parseMs(timeInMs)
  const timeStr = parsedTime.hours
    ? `${parsedTime.hours + parsedTime.days * 24}:${parsedTime.minutes}:${parsedTime.seconds}`
    : `${parsedTime.minutes}:${parsedTime.seconds}`
  return timeStr
    .split(':')
    .map((num) => `${num}`.padStart(2, '0'))
    .join(':')
}

const defaultpomodoroTimerLimit = 1
const defaultbreakTimerLimit = 1
class App extends Component {
  constructor(props) {
    super(props)

    this.handlePausePlay = this.handlePausePlay.bind(this)
    this.handleSessionPlusClick = this.handleSessionPlusClick.bind(this)
    this.handleSessionMinusClick = this.handleSessionMinusClick.bind(this)
    this.handleBreakPlusClick = this.handleBreakPlusClick.bind(this)
    this.handleBreakMinusClick = this.handleBreakMinusClick.bind(this)
  }
  state = {
    progress: 1,
    timer: 6000,
    title: '',
    pomodoroTimerLimit: defaultpomodoroTimerLimit,
    breakTimerLimit: defaultbreakTimerLimit,
    currentPomodoro: convertReadableMS(defaultpomodoroTimerLimit * 1000 * 60),
    currentBreak: convertReadableMS(defaultbreakTimerLimit * 1000 * 60),
    pomodoroStatus: 'session',
    themeColor: '#FF0060',
  }

  componentDidMount() {
    this.startPomodoro()
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
        currentPomodoro: convertReadableMS(time.ms),
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
        currentBreak: convertReadableMS(time.ms)
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

  resetPomodoro(progress) {
    this.setState({
      progress,
      currentPomodoro: convertReadableMS(this.state.pomodoroTimerLimit * 60 * 1000),
      currentBreak: convertReadableMS(this.state.breakTimerLimit * 60 * 1000)
    })
  }

  componentWillUnmount() {
    this.pomodoroTimerLimit.stop()
    this.breakTimerLimit.stop()
  }

  handleSessionPlusClick() {
    if (!this.shouldbuttonDisable) {
      if (this.state.pomodoroStatus === 'session') {
        this.setState(prev => ({pomodoroTimerLimit: prev.pomodoroTimerLimit + 1}), () => {
          this.resetPomodoro(1)
          this.startPomodoro()
        })
      } else {
        this.setState(prev => ({pomodoroTimerLimit: prev.pomodoroTimerLimit + 1}))
      }
    }
  }

  handleSessionMinusClick() {
    if (!this.shouldbuttonDisable && this.state.pomodoroTimerLimit > 1) {
      if (this.state.pomodoroStatus === 'session') {
        this.setState(prev => ({pomodoroTimerLimit: prev.pomodoroTimerLimit - 1}), () => {
          this.resetPomodoro(1)
          this.startPomodoro()
        })
      } else {
        this.setState(prev => ({pomodoroTimerLimit: prev.pomodoroTimerLimit - 1}))
      }
    }
  }

  handleBreakPlusClick() {
    console.log('sdksksjs')
    if (!this.shouldbuttonDisable) {
      if (this.state.pomodoroStatus === 'break') {
        this.setState(prev => ({breakTimerLimit: prev.breakTimerLimit + 1}), () => {
          this.resetPomodoro(0)
          this.startBreak()
        })
      } else {
        this.setState(prev => ({breakTimerLimit: prev.breakTimerLimit + 1}))
      }
    }
  }

  handleBreakMinusClick() {
    console.log('jkj')
    if (!this.shouldbuttonDisable && this.state.breakTimerLimit > 1) {
      if (this.state.pomodoroStatus === 'break') {
        this.setState(prev => ({breakTimerLimit: prev.breakTimerLimit - 1}), () => {
          this.resetPomodoro(0)
          this.startBreak()
        })
      } else {
        this.setState(prev => ({breakTimerLimit: prev.breakTimerLimit - 1}))
      }
    }
  }

  render() {
    this.shouldbuttonDisable =
      !((this.pomodoroTimer && this.pomodoroTimer.state === 0) ||
      (this.breakTimer && this.breakTimer.state === 0))

    return (
      <Main>
        <ButtonsContainer>
          <Button
            color={this.state.themeColor}
            label='session'
            time={this.state.pomodoroTimerLimit}
            disable={this.shouldbuttonDisable}
            onPlusClick={this.handleSessionPlusClick}
            onMinusClick={this.handleSessionMinusClick}
          />
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
          <Button
            color={this.state.themeColor}
            label='break'
            time={this.state.breakTimerLimit}
            disable={this.shouldbuttonDisable}
            onPlusClick={this.handleBreakPlusClick}
            onMinusClick={this.handleBreakMinusClick}
          />
        </ButtonsContainer>
        <GitHubForkRibbon
          href="//www.github.com/sanatankumar/fcc-pomodoro-clock"
          target="_blank"
          position="right">
          View Code On Github
        </GitHubForkRibbon>
      </Main>
    )
  }
}

export default App
