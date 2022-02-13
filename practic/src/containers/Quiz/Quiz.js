import { Component } from "react";
import styles from "./Quiz.module.css"
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";
import FinishedQuiz from "../../components/FinishedQuiz/FinishedQuiz";
import axios from '../../axios/axios-quiz'
import Loader from '../../components/UI/Loader/Loaders'
import {useParams} from 'react-router-dom'

// TODO: Для работоспособности приложения необходимо удалить импорт,
//  функцию withParams, удалить переменную { id } и поменять строку
//  отправки на сервер. Не забудь убрать hoc функцию в экспорте!
//  Также удали react-router!




function withParams(Component) {
  return props => <Component {...props} params={useParams()}/>
}


class Quiz extends Component {
  state = {
    results: {}, // {[id: success || error]}
    isFinished: false,
    activeQuestion: 0,
    answerState: null, // { [id]: 'success' || 'error' }
    quiz: [],
    loading: true,
  }

  onAnswerClickHandler = (answerId) => {
    if (this.state.answerState) {
      const key = Object.keys(this.state.answerState)[0]
      if (this.state.answerState[key] === 'success') {
        return
      }
    }

    const question = this.state.quiz[this.state.activeQuestion]
    const results = this.state.results

    if (question.rightAnswerId === answerId) {
      if (!results[question.id]) {
        results[question.id] = 'success'
      }

      this.setState( {
        answerState: {[answerId]: 'success'},
        results
      } )

      const timeout = window.setTimeout(() => {
        if (this.isQuizFinished()) {
          this.setState({
            isFinished: true,
          })
        } else {
          this.setState({
            activeQuestion: this.state.activeQuestion + 1,
            answerState: null
          })
        }

        window.clearTimeout(timeout)
      }, 1000)

    } else {
      results[question.id] = 'error'
      this.setState( {
        answerState: {[answerId]: 'error'},
        results
      } )
    }

    console.log('answerState ', this.state.answerState)

  }

  isQuizFinished() {
    return this.state.activeQuestion + 1 === this.state.quiz.length
  }

  retryHandler = () => {
    this.setState({
      activeQuestion: 0,
      answerState: null,
      isFinished: false,
      results: {}
    })
  }

  async componentDidMount() {
    console.log(this.props.match)
    try {
      let { id } = this.props.params
      // const response = await axios.get(`/quizes/${this.props.match.params.id}.json`)
      const response = await axios.get(`/quizes/${id}.json`)
      const quiz = response.data
      console.log(id)

      this.setState({
        quiz,
        loading: false
      })
    } catch (e) {
      console.log(e)
    }
  }

  render() {
    return (
      <div className={styles.Quiz}>

        <div className={styles.QuizWrapper}>
          <h1>Ответьте на все вопросы!</h1>

          {
            this.state.loading
              ? <Loader />
              : this.state.isFinished
                ? <FinishedQuiz
                  results={this.state.results}
                  quiz={this.state.quiz}
                  onRetry={this.retryHandler}
                />
                : <ActiveQuiz
                  answers={this.state.quiz[this.state.activeQuestion].answers}
                  question={this.state.quiz[this.state.activeQuestion].question}
                  onAnswerClick={this.onAnswerClickHandler}
                  quizLength={this.state.quiz.length}
                  answerNumber={this.state.activeQuestion + 1}
                  state={this.state.answerState}
                />
          }

        </div>
      </div>
    )
  }
}

export default withParams(Quiz)
