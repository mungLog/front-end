// QuestionPage.js
import React from "react";
import "./MbtiPage.css";

const QuestionPage = ({ question, options, onAnswer }) => (
  <div className="QcontainerBig">
    <div className="QcontainerSmall">
      <div className="QTitlebox">
        <h2>{question.text}</h2>
      </div>
      <div className="Qpic"></div>
    </div>
    <div className="AcontainerBig">
      {options.map((option, index) => (
        <div key={index} className="option">
          <button className="Abutton" onClick={() => onAnswer(option)}>
            {option.text}
          </button>
        </div>
      ))}
    </div>
  </div>
);

export default QuestionPage;
