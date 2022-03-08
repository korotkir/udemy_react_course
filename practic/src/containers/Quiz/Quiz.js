import {useEffect, useState} from 'react'
import styles from "./Quiz.module.css"
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";
import FinishedQuiz from "../../components/FinishedQuiz/FinishedQuiz";
import Loader from '../../components/UI/Loader/Loaders'
import { useParams } from 'react-router-dom'
import {connect} from 'react-redux'
import {fetchQuizById, quizAnswerClick, retryQuiz} from '../../store/actions/quiz'
import {cleanup} from '@testing-library/react'

function Quiz(props) {
  // const [results, setResults] = useState({})
  // const [isFinished, setIsFinished] = useState(false)
  // const [activeQuestion, setActiveQuestion] = useState(0)
  // const [answerState, setAnswerState] = useState(null)
  // const [quiz, setQuiz] = useState([])
  // const [loading, setLoading] = useState(true)
  // const [quizTitle, setQuizTitle] = useState('Ответьте на все вопросы!')

  const { ident } = useParams()

  useEffect(() => {
    props.fetchQuizById(ident)
    return cleanup => props.retryQuiz()
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
                    onRetry={props.retryQuiz}
                />
                : <ActiveQuiz
                    answers={props.quiz[props.activeQuestion].answers}
                    question={props.quiz[props.activeQuestion].question}
                    onAnswerClick={props.quizAnswerClick}
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
    quizAnswerClick: answerId => dispatch(quizAnswerClick(answerId)),
    retryQuiz: () => dispatch(retryQuiz())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz)


