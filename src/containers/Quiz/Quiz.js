import { Component } from "react";
import styles from "./Quiz.module.css"

class Quiz extends Component {
  state = {
    quiz: [],
  }

  render() {
    return (
      <div className={styles.Quiz}>
        <h1>Quiz</h1>
      </div>
    )
  }
}

export default Quiz