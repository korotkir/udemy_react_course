import React, {useState} from 'react'
import {connect} from 'react-redux'
import {add2} from './redux/actions/actions'

function Counter(props)  {
    return (
      <div style={{padding: 20, border: '1px solid #ccc'}}>
          <h1>Counter {props.counter}</h1>
          <hr/>
          <div>
              <button className="btn btn-primary" onClick={() => props.onAdd(43)}>Add 43</button>
          </div>
      </div>
    )
}

function mapStateToProps(state) {
 return {
   counter: state.counter2.counter
 }
}

function mapDispatchToProps(dispatch) {
  return {
    onAdd: number => dispatch(add2(number)),
    // onSub: () => dispatch({type: 'SUB2'})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Counter)
