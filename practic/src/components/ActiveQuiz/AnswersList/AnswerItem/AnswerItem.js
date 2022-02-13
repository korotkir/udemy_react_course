import styles from './AnswerItem.module.css'

const AnswerItem = props => {
  const cls = [styles.AnswerItem]

  if (props.state) {
    cls.push(styles[props.state])
    console.log(cls)
  }
  
  return (
    <li 
    className={cls.join(' ')}
    onClick={() => props.onAnswerClick(props.answer.id)}
    >
      { props.answer.text }
    </li>
  )
}

export default AnswerItem