import React, { Component } from 'react'
import 'normalize.css'

import AnimatedCircle from './components/AnimatedCircle/AnimatedCircle'
import {
  Main,
  Container,
  OuterCard,
  LightCircle,
} from './App.style'

class App extends Component {
  render() {
    return (
      <Main>
        <Container>
          <OuterCard>
            <LightCircle>
              <AnimatedCircle size={280} color={'#FF0060'} progress={0.2} />
            </LightCircle>
          </OuterCard>
        </Container>
      </Main>
    )
  }
}

export default App
