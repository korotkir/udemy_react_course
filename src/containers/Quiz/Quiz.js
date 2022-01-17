import { Component } from "react";
import styles from "./Quiz.module.css"
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";

class Quiz extends Component {
  state = {
    activeQuestion: 0,
    quiz: [
      { 
        question: 'Какого цвета небо?',
        rightAnswerId: 2,
        answers: [
          {text: 'Черный', id: 1},
          {text: 'Синий', id: 2},
          {text: 'Красный', id: 3},
          {text: 'Зеленый', id: 4},
        ]
      }
    ],
  }

  onAnswerClickHandler = (answerId) => {
    console.log('AnswerId ', answerId)
  }

  render() {
    return (
      <div className={styles.Quiz}>
        
        <div className={styles.QuizWrapper}>
          <h1>Ответьте на все вопросы!</h1>
          <ActiveQuiz 
            answers={this.state.quiz[0].answers}
            question={this.state.quiz[0].question}
            onAnswerClick={this.onAnswerClickHandler}
            quizLength={this.state.quiz.length}
            answerNumber={this.state.activeQuestion + 1}
          />
        </div>
      </div>
    )
  }
}

export default Quiz