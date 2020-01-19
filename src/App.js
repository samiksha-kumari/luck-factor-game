import React from 'react'
import { Button, Jumbotron, Modal, ModalBody } from 'reactstrap'
import './index.css'

export default class LuckCalculator extends React.Component {
  constructor() {
    super()
    this.state = {
      optionOne: null,
      optionTwo: null,
      optionThree: null,
      luckyNumber: null,
      numberOfAttempts: 0,
      luckyAttempts: 0,
      wrongAttempts: 0,
      isCompleted: false,
      randomNumber: false,
      show: false
    }

  }
  setOptions = () => {
    const options = ['optionOne', 'optionTwo', 'optionThree']
    let sparse = [...options]
    let j = this.generateRandom(), k = this.generateRandom(); //j72 k85

    while (j === this.state.luckyNumber || k === this.state.luckyNumber) {
      if (j === this.state.luckyNumber) {
        j = this.generateRandom() //72
      } else {
        k = this.generateRandom()
      }

    }
    let correctoption = Math.floor(Math.random() * 3);// 0
    sparse.splice(correctoption, 1) //[]
    console.log(sparse)
    this.setState({
      [options[correctoption]]: this.state.luckyNumber, // optionOne: 72
      [sparse[0]]: j, // optionTwo: 72
      [sparse[1]]: k, //optionThree: 85
    })

  }

  componentDidMount() {
    this.setState({ luckyNumber: this.generateRandom() }, () => {     //72
      this.setOptions()
    })


  }

  generateRandom = () => {
    return Math.floor(Math.random() * 100);

  }

  generateLuckFactor = () => {

    if (this.state.luckyAttempts >= 0 && this.state.luckyAttempts <= 3) {
      return (
        <h3>Bad Luck</h3>
      )
    } else if (this.state.luckyAttempts >= 4 && this.state.luckyAttempts <= 7) {
      return (
        <h3>Good Luck</h3>
      )
    } else if (this.state.luckyAttempts >= 7) {
      return (
        <h3>Excellent Luck</h3>
      )
    }
    return null

  }

  resetData = () => {
    this.setState({
      show: false,
      luckyNumber: this.generateRandom()
    }, () => {
      this.setOptions()
    })
  }


  handleClick = async (key) => {
    if (this.state.luckyAttempts + this.state.wrongAttempts < 10) {
      console.log('key', key)
      await this.setState({ show: !this.state.show })
      if (this.state[key] === this.state.luckyNumber) {
        this.setState(prevState => ({
          luckyAttempts: prevState.luckyAttempts + 1,

        }))
      } else {
        this.setState(prevState => ({
          wrongAttempts: prevState.wrongAttempts + 1
        }))

      }

      setTimeout(() => {
        this.resetData()
      }, 1200)

    }
    if (this.state.luckyAttempts + this.state.wrongAttempts === 10) {
      this.setState({ isCompleted: true })
    }


  }

  render() {
    return (
      <div className="container">
        <Jumbotron className="border border-dark" >
          <h2 className="header">Luck Factor</h2><hr className="border-dark " />
          <div className="btndiv"><h3 >{this.state.luckyNumber}</h3>
          </div>

          <p>Attempts: {this.state.luckyAttempts + this.state.wrongAttempts}/10 </p>
          <p className="attempts1">Lucky attempts: {this.state.luckyAttempts}</p>
          <p className="attempts2">Wrong attempts: {this.state.wrongAttempts}</p>

          {this.state.isCompleted &&
            <Modal isOpen={true}>
              <ModalBody>
                {this.generateLuckFactor()}
              </ModalBody>
            </Modal>
          }
          <div className="btndiv">
            <Button color="btn btn-success" className="border border-dark mr-4 btnn" disabled={this.state.show} onClick={() => this.handleClick('optionOne')}>{this.state.show ? this.state.optionOne : "?"}</Button>
            <Button color="btn btn-success" className="border border-dark mr-4 btnn" disabled={this.state.show} onClick={() => this.handleClick('optionTwo')}>{this.state.show ? this.state.optionTwo : "?"}</Button>
            <Button color="btn btn-success" className="border border-dark btnn" disabled={this.state.show} onClick={() => this.handleClick('optionThree')}>{this.state.show ? this.state.optionThree : "?"}</Button><br />
          </div>
        </Jumbotron>
      </div >

    )

  }
}
