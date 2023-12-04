import { useState } from 'react'
//import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import '../App.css'

import allQuestions from "../../../server/data/questionsList.js";
function Questions() {

  return (
    <div>
    {allQuestions.map((question, index) => (
      <div className='question' key={index}>
        <input
          type='checkbox'
        />
        <a href={question.link} target='_blank' rel='noopener noreferrer'>
          <h4>{question.title}</h4>
        </a>
      </div>
    ))}
  </div>
  )
}

export default Questions
