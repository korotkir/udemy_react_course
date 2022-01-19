import styles from './FinishedQuiz.module.css'

const FinishedQuiz = props => {
  return (
    <div className={styles.FinishedQuiz}>
      <ul>
        <li>
          <strong>1.</strong>
          How are you?
          <i className={'fa fa-times error'} />
        </li>
        <li>
          <strong>1.</strong>
          How are you?
          <i className={'fa fa-check success'} />
        </li>
      </ul>
      <p>Правильно 4 из 5</p>

      <div>
        <button>Повторить</button>
      </div>
    </div>
  )
}

export default FinishedQuiz