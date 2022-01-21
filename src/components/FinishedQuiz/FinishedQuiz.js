import styles from './FinishedQuiz.module.css'

const FinishedQuiz = props => {
  const succesCount = Object.keys(props.results).reduce((total, key) => {
   if (props.results[key] === 'success') {
    total++
   }
   return total
  }, 0)

  return (
    <div className={styles.FinishedQuiz}>
      <ul>
       { props.quiz.map((quizItem, index) => {

        const cls = [
         'fa',
         props.results[quizItem.id] === 'error' ? 'fa-times' : 'fa-check',
         styles[props.results[quizItem.id]]
        ]

        return(
         <li
          key={index}
         >
          <strong>{index + 1}</strong>.&nbsp;
          {quizItem.question}
          <i className={cls.join(' ')} />

         </li>
        )

       })}

        {/*<li>*/}
        {/*  <strong>1.</strong>*/}
        {/*  How are you?*/}
        {/*  <i className={'fa fa-times error'} />*/}
        {/*</li>*/}
        {/*<li>*/}
        {/*  <strong>1.</strong>*/}
        {/*  How are you?*/}
        {/*  <i className={'fa fa-check success'} />*/}
        {/*</li>*/}
      </ul>
      <p>Правильно {succesCount} из {props.quiz.length}</p>

      <div>
        <button onClick={props.onRetry}>Повторить</button>
      </div>
    </div>
  )
}

export default FinishedQuiz
