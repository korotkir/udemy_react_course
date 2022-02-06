import React, {Component} from 'react'
import styles from './QuizList.module.css'
import {NavLink} from 'react-router-dom'
import axios from 'axios'
import {logDOM} from '@testing-library/react'

export default class QuizList extends Component {

    state = {
        quizes: []
    }

    renderQuizes() {
        return this.state.quizes.map((quiz) => {
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
            const response = await axios.get('https://react-quiz-f412a-default-rtdb.firebaseio.com/quizes.json')
            const quizes = []
            Object.keys(response.data).forEach((key, index) => {
                let data = response.data
                console.log(data)
                quizes.push({
                    id: key,
                    name: `Тест №${index + 1}`
                })
            })

            this.setState({ quizes })
        } catch (e) {
            console.log(e)
        }

    }

    render() {
        return (
            <div className={styles.QuizList}>
                <div>
                    <h1>Список тестов</h1>

                    <ul>
                        {this.renderQuizes()}
                    </ul>
                </div>
            </div>
        )
    }
}
