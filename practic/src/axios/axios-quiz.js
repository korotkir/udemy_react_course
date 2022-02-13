import axios from 'axios'

export default axios.create({
  baseURL: 'https://react-quiz-f412a-default-rtdb.firebaseio.com/'
})
