import React, { useState } from "react";
import StartPage from "./StartPage";
import DogSelectionPage from "./DogSelectionPage";
import QuestionPage from "./QuestionPage";
import ResultPage from "./ResultPage";
import "./MbtiPage.css";

const MbtiPage = () => {
  const [currentPage, setCurrentPage] = useState("start");
  const [answers, setAnswers] = useState([]);
  const [selectedDog, setSelectedDog] = useState("");

  const questions = [
    {
      id: 1,
      text: "1. 강아지가 새로운 사람을 만났을 때 어떻게 반응하나요?",
      options: [
        { text: "A. 사람을 무서워하고 피합니다.", value: "I" },
        { text: "B. 사람에게 다가가서 친근하게 인사합니다.", value: "E" },
      ],
    },
    {
      id: 2,
      text: "2. 강아지가 새로운 환경에 갔을 때 어떻게 행동하나요?",
      options: [
        { text: "A. 경계하고 천천히 탐색합니다.", value: "S" },
        {
          text: "B. 적극적으로 탐험하고 여기저기 냄새를 맡습니다.",
          value: "N",
        },
      ],
    },
    {
      id: 3,
      text: "3. 강아지가 놀이할 때 어떤 행동을 하나요?",
      options: [
        { text: "A. 규칙적으로 반복되는 놀이를 좋아합니다.", value: "J" },
        { text: "B. 자유롭게 새로운 놀이를 시도합니다.", value: "P" },
      ],
    },
    {
      id: 4,
      text: "4. 강아지가 친구랑 놀다가 헤어질 때 어떤 반응을 보이나요?",
      options: [
        { text: "A. 친구와 헤어지는 상황을 빠르게 받아들입니다.", value: "T" },
        {
          text: "B. 친구의 헤어짐에 대해 아쉬워하며 더 놀고 싶어합니다.",
          value: "F",
        },
      ],
    },
    {
      id: 5,
      text: "5. 강아지가 혼자 있을 때 어떻게 하나요?",
      options: [
        { text: "A. 조용히 혼자 놉니다.", value: "I" },
        { text: "B. 주인을 찾거나 외로워하는 듯 행동합니다.", value: "E" },
      ],
    },
    {
      id: 6,
      text: "6. 강아지가 간식을 받을 때 어떤 태도를 보이나요?",
      options: [
        { text: "A. 천천히 먹고 주위를 살핍니다.", value: "S" },
        { text: "B. 바로 먹고 더 달라고 합니다.", value: "N" },
      ],
    },
    {
      id: 7,
      text: "7. 강아지가 명령을 따를 때 어떤 방식으로 반응하나요?",
      options: [
        { text: "A. 규칙적으로 명령을 따릅니다.", value: "J" },
        { text: "B. 가끔은 명령을 무시하고 자기 마음대로 합니다.", value: "P" },
      ],
    },
    {
      id: 8,
      text: "8. 강아지가 혼날 때 어떤 반응을 보이나요?",
      options: [
        { text: "A. 주인의 눈치를 봅니다.", value: "F" },
        { text: "B. 짖거나 고집을 부립니다.", value: "T" },
      ],
    },
    {
      id: 9,
      text: "9. 강아지가 새로운 장난감을 받았을 때 어떻게 반응하나요?",
      options: [
        { text: "A. 처음에는 경계하고 조심스럽게 다가갑니다.", value: "I" },
        { text: "B. 즉시 흥미를 보이며 놀기 시작합니다.", value: "E" },
      ],
    },
    {
      id: 10,
      text: "10. 강아지가 주인의 기분 변화를 어떻게 느끼나요?",
      options: [
        { text: "A. 주인의 기분 변화에 민감하게 반응합니다.", value: "F" },
        { text: "B. 주인의 기분 변화에 크게 신경 쓰지 않습니다.", value: "T" },
      ],
    },
    {
      id: 11,
      text: "11. 강아지가 산책할 때 어떤 행동을 보이나요?",
      options: [
        { text: "A. 주인을 따라서 걷습니다.", value: "J" },
        { text: "B. 이리저리 돌아다니며 탐험합니다.", value: "P" },
      ],
    },
    {
      id: 12,
      text: "12. 강아지가 집안에 있을 때 주로 하는 행동은?",
      options: [
        { text: "A. 특정 장소에서 자주 쉬고 놉니다.", value: "S" },
        { text: "B. 집안 곳곳을 돌아다니며 활동합니다.", value: "N" },
      ],
    },
  ];

  const handleStart = () => {
    setCurrentPage("dogSelection");
  };

  const handleDogSelect = (dogName) => {
    setSelectedDog(dogName);
    setCurrentPage("questions");
  };

  const handleAnswer = (answer) => {
    setAnswers([...answers, answer.value]);
    if (answers.length + 1 < questions.length) {
      setCurrentPage("questions");
    } else {
      setCurrentPage("result");
    }
  };

  const calculateMbti = (answers) => {
    const counts = {
      I: 0,
      E: 0,
      S: 0,
      N: 0,
      T: 0,
      F: 0,
      J: 0,
      P: 0,
    };

    answers.forEach((answer) => {
      counts[answer]++;
    });

    const types = [
      counts.I >= counts.E ? "I" : "E",
      counts.S >= counts.N ? "S" : "N",
      counts.T >= counts.F ? "T" : "F",
      counts.J >= counts.P ? "J" : "P",
    ];

    return types.join("");
  };

  const handleRestart = () => {
    setAnswers([]);
    setSelectedDog("");
    setCurrentPage("start");
  };

  const currentQuestion = questions[answers.length] || {
    id: 1,
    text: "질문이 없습니다.",
    options: [],
  };

  return (
    <div className="mbtiBody">
      {currentPage === "start" && <StartPage onStart={handleStart} />}
      {currentPage === "dogSelection" && (
        <DogSelectionPage onSelectDog={handleDogSelect} />
      )}
      {currentPage === "questions" && (
        <QuestionPage
          question={currentQuestion}
          options={currentQuestion.options}
          onAnswer={handleAnswer}
        />
      )}
      {currentPage === "result" && (
        <ResultPage
          result={calculateMbti(answers)}
          dogName={selectedDog}
          answers={answers}
        />
      )}
    </div>
  );
};

export default MbtiPage;