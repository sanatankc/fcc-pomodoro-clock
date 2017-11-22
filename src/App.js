import React, { Component } from 'react'
import StopWatch from 'timer-stopwatch'
import Notification from 'react-web-notification'
import 'normalize.css'

import AnimatedCircle from './components/AnimatedCircle/AnimatedCircle'
import {
  Main,
  Container,
  OuterCard,
  LightCircle,
  TopCircle,
} from './App.style'

const mapRange = (obj, num) => (((num - obj.from[0]) * (obj.to[1] - obj.to[0])) / (obj.from[1] - obj.from[0])) + obj.to[0]

class App extends Component {
  state = {
    progress: 0,
    timer: 6000,
    title: ''
  }

  componentDidMount() {
    this.timer = new StopWatch(this.state.timer)
    this.timer.start()
    this.timer.onTime((time) => {
      const progress = mapRange({
        from: [this.state.timer, 0],
        to: [0, 1]
      }, time.ms)

      this.setState({ progress })

      if (time.ms <= 50000 && time.ms >= 49994) {
        this.timer.stop()
        window.setTimeout(() => {
          this.timer.start()
        }, 1000)
      }
      console.log(time.ms, progress)
    })
    this.timer.onDone(() => {
      this.setState({title: 'DONE!!!'})
    })
  }
  componentWillUnmount() {
    this.timer.stop()
  }

  render() {
    return (
      <Main>
        <Container>
          <OuterCard>
            <LightCircle>
              <Notification title={this.state.title} />
              <AnimatedCircle size={280} color={'#FF0060'} progress={this.state.progress} />
              <TopCircle>03:15</TopCircle>
            </LightCircle>
          </OuterCard>
        </Container>
      </Main>
    )
  }
}

export default App
