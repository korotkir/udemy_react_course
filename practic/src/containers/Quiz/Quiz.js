import {useEffect, useState} from 'react'
import styles from "./Quiz.module.css"
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";
import FinishedQuiz from "../../components/FinishedQuiz/FinishedQuiz";
import axios from '../../axios/axios-quiz'
import Loader from '../../components/UI/Loader/Loaders'
import { useParams } from 'react-router-dom'
import {connect} from 'react-redux'
import {fetchQuizById} from '../../store/actions/quiz'

function Quiz(props) {
  // const [results, setResults] = useState({})
  // const [isFinished, setIsFinished] = useState(false)
  // const [activeQuestion, setActiveQuestion] = useState(0)
  // const [answerState, setAnswerState] = useState(null)
  // const [quiz, setQuiz] = useState([])
  // const [loading, setLoading] = useState(true)
  // const [quizTitle, setQuizTitle] = useState('Ответьте на все вопросы!')

  const { ident } = useParams()


  function onAnswerClickHandler(answerId) {
    if (props.answerState) {
      const key = Object.keys(props.answerState)[0]
      if (props.answerState[key] === 'success') {
        return
      }
    }

    const question = props.quiz[props.activeQuestion]
    const resultsClick = props.results

    if (question.rightAnswerId === answerId) {
      if (!resultsClick[question.id]) {
        resultsClick[question.id] = 'success'
      }

      props.answerState({[answerId]: 'success'})
      props.results(resultsClick)


      const timeout = window.setTimeout(() => {
        if (isQuizFinished()) {
          props.isFinished(true)
        } else {
          props.activeQuestion(props.activeQuestion + 1)
          props.answerState(null)
        }

        window.clearTimeout(timeout)
      }, 1000)

    } else {
      resultsClick[question.id] = 'error'
      props.answerState({[answerId]: 'error'})
      props.results(resultsClick)
    }
  }

  function isQuizFinished() {
    return props.activeQuestion + 1 === props.quiz.length
  }

  function retryHandler() {
    props.activeQuestion(0)
    props.answerState(null)
    props.isFinished(false)
    props.results({})
  }

  useEffect(() => {
    function didMount() {
      console.log(ident)
      fetchQuizById(ident)
    }

    didMount()
  }, [])

    return (
      <div className={styles.Quiz}>

        <div className={styles.QuizWrapper}>
          <h1>{props.quizTitle}</h1>

          {
            props.loading || !props.quiz
              ? <Loader />
              : props.isFinished
                ? <FinishedQuiz
                    results={props.results}
                    quiz={props.quiz}
                    onRetry={retryHandler}
                />
                : <ActiveQuiz
                    answers={props.quiz[props.activeQuestion].answers}
                    question={props.quiz[props.activeQuestion].question}
                    onAnswerClick={onAnswerClickHandler}
                    quizLength={props.quiz.length}
                    answerNumber={props.activeQuestion + 1}
                    state={props.answerState}
                />
          }

        </div>
      </div>
    )
  }

function mapStateToProps(state) {
  return {
    results: state.quiz.results,
    isFinished: state.quiz.isFinished,
    activeQuestion: state.quiz.activeQuestion,
    answerState: state.quiz.answerState,
    quiz: state.quiz.quiz,
    quizTitle: state.quiz.quizTitle,
    loading: state.quiz.loading
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchQuizById: ident => dispatch(fetchQuizById(ident)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz)


