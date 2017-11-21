import React, { Component } from 'react'
import StopWatch from 'timer-stopwatch'
import 'normalize.css'

import AnimatedCircle from './components/AnimatedCircle/AnimatedCircle'
import {
  Main,
  Container,
  OuterCard,
  LightCircle,
} from './App.style'

const mapRange = (obj, num) => (((num - obj.from[0]) * (obj.to[1] - obj.to[0])) / (obj.from[1] - obj.from[0])) + obj.to[0]

class App extends Component {
  state = {
    progress: 0
  }

  componentDidMount() {
    const timer = new StopWatch(6000)
    timer.start()
    timer.onTime((time) => {
      const progress = mapRange({
        from: [6000, 0],
        to: [0, 1]
      }, time.ms)
      this.setState({ progress })
      console.log(time.ms, progress)
    })
  }
  render() {
    return (
      <Main>
        <Container>
          <OuterCard>
            <LightCircle>
              <AnimatedCircle size={280} color={'#FF0060'} progress={this.state.progress} />
            </LightCircle>
          </OuterCard>
        </Container>
      </Main>
    )
  }
}

export default App
