import React, { Component } from 'react'
import styled from 'styled-components'

const Canvas =  styled.canvas`
  position: absolute;
  transform: rotate(-90deg);
`

class AnimatedCircleObj {
  constructor(canvas, context, size, color, progress) {
    this.canvas = canvas
    this.c = context
    this.r = size / 4
    this.x = this.canvas.width / 2
    this.y = this.canvas.height / 2
    this.line = size / 2
    this.progress = progress
    this.color = color
  }


  draw() {
    this.c.beginPath()
    this.c.arc(this.x, this.y, this.r, 0, Math.PI*2*this.progress, false)
    this.c.lineWidth = this.line
    this.c.strokeStyle = this.color
    this.c.stroke()
  }
}

export default class AnimatedCircle extends Component {
  constructor(props) {
    super(props)
    this.draw = this.draw.bind(this)
  }

  componentDidMount() {
    this.draw()
  }
  componentDidUpdate() {
    this.draw()
  }

  draw() {
    const canvas = document.querySelector('canvas#animatedCircle')
    canvas.width = this.props.size
    canvas.height = this.props.size
    this.c = canvas.getContext('2d')
    this.circle = new AnimatedCircleObj(canvas, this.c, this.props.size, this.props.color, this.props.progress)
    this.c.clearRect(0, 0, window.innerWidth, window.innerHeight)
    this.circle.draw()
  }

  render() {
    return <Canvas id='animatedCircle' />
  }
}
