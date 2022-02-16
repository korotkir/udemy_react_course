import React, {Component} from 'react'
import styles from './QuizList.module.css'
import {NavLink} from 'react-router-dom'
import axios from '../../axios/axios-quiz'
import Loaders from '../../components/UI/Loader/Loaders'

export default class QuizList extends Component {

    state = {
        quizes: [],
        loading: true
    }

    renderQuizes() {
        return this.state.quizes.map(quiz => {
            return (
                <li
                    key={quiz.id}
                >
                    <NavLink to={'/quiz/' + quiz.id}>
                        {quiz.name}
                    </NavLink>
                </li>
            )
        })
    }

    // componentDidMount() {
    //     axios.get('https://react-quiz-f412a-default-rtdb.firebaseio.com/quiz.json').then(response => {
    //         console.log(response)
    //     })
    // }

    async componentDidMount() {
        try {
            const response = await axios.get('/quizes.json')
            const quizes = []
            Object.keys(response.data).forEach((key, index) => {
                let data = response.data
                quizes.push({
                    id: key,
                    // TODO: РАЗ!
                    // name: `Тест №${index + 1}`,
                    name: Object.values(data)[index][0] === ''
                            ? `Тест №${index + 1}`
                            : Object.values(data)[index][0]
                })
            })

            this.setState({
                quizes,
                loading: false
            })
        } catch (e) {
            console.log(e)
        }

    }

    render() {
        return (
            <div className={styles.QuizList}>
                <div>
                    <h1>Список тестов</h1>

                    {
                        this.state.loading
                            ? <Loaders />
                            :  <ul>
                              {this.renderQuizes()}
                          </ul>
                    }

                </div>
            </div>
        )
    }
}
