import {useEffect, useState} from 'react'
import styles from "./Quiz.module.css"
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";
import FinishedQuiz from "../../components/FinishedQuiz/FinishedQuiz";
import axios from '../../axios/axios-quiz'
import Loader from '../../components/UI/Loader/Loaders'
import { useParams } from 'react-router-dom'
import {connect} from 'react-redux'

function Quiz() {
  // const [results, setResults] = useState({})
  // const [isFinished, setIsFinished] = useState(false)
  // const [activeQuestion, setActiveQuestion] = useState(0)
  // const [answerState, setAnswerState] = useState(null)
  // const [quiz, setQuiz] = useState([])
  // const [loading, setLoading] = useState(true)
  // const [quizTitle, setQuizTitle] = useState('Ответьте на все вопросы!')

  const { ident } = useParams()

  function onAnswerClickHandler(answerId) {
    if (answerState) {
      const key = Object.keys(answerState)[0]
      if (answerState[key] === 'success') {
        return
      }
    }

    const question = quiz[activeQuestion]
    const resultsClick = results

    if (question.rightAnswerId === answerId) {
      if (!resultsClick[question.id]) {
        resultsClick[question.id] = 'success'
      }

      setAnswerState({[answerId]: 'success'})
      setResults(resultsClick)


      const timeout = window.setTimeout(() => {
        if (isQuizFinished()) {
          setIsFinished(true)
        } else {
          setActiveQuestion(activeQuestion + 1)
          setAnswerState(null)
        }

        window.clearTimeout(timeout)
      }, 1000)

    } else {
      resultsClick[question.id] = 'error'
      setAnswerState({[answerId]: 'error'})
      setResults(resultsClick)
    }
  }

  function isQuizFinished() {
    return activeQuestion + 1 === quiz.length
  }

  function retryHandler() {
    setActiveQuestion(0)
    setAnswerState(null)
    setIsFinished(false)
    setResults({})
  }

  useEffect(() => {
    async function didMount() {
      try {

        const response = await axios.get(`/quizes/${ident}.json`)
        const data = response.data

        setQuizTitle(Object.values(data)[0])

        const quiz = data.filter(el => typeof el === 'object')

        setQuiz(quiz)

        setLoading(false)

      } catch (e) {
        console.log(e)
      }
    }

    didMount()
  }, [])

    return (
      <div className={styles.Quiz}>

        <div className={styles.QuizWrapper}>
          <h1>{quizTitle}</h1>

          {
            loading
              ? <Loader />
              : isFinished
                ? <FinishedQuiz
                    results={results}
                    quiz={quiz}
                    onRetry={retryHandler}
                />
                : <ActiveQuiz
                    answers={quiz[activeQuestion].answers}
                    question={quiz[activeQuestion].question}
                    onAnswerClick={onAnswerClickHandler}
                    quizLength={quiz.length}
                    answerNumber={activeQuestion + 1}
                    state={answerState}
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
    fetchQuizById: id => dispatch(fetchQuizById())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz)

// TODO: 4:47
