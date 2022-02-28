import React, {Component} from 'react'
import styles from './QuizList.module.css'
import {NavLink} from 'react-router-dom'
//import axios from '../../axios/axios-quiz'
import Loaders from '../../components/UI/Loader/Loaders'
import {connect} from 'react-redux'
import {fetchQuizes} from '../../store/actions/quiz'

class QuizList extends Component {
    renderQuizes() {
        return this.props.quizes.map(quiz => {
            return (
                <li key={quiz.id}>
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

    componentDidMount() {
        this.props.fetchQuizes()
    }

    render() {
        return (
            <div className={styles.QuizList}>
                <div>
                    <h1>Список тестов</h1>

                    {
                        this.props.loading && this.props.quizes.length !== 0
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

function mapStateToProps(state) {
    return {
        quizes: state.quiz.quizes,
        loading: state.quiz.loading
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchQuizes: () => dispatch(fetchQuizes()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizList)
