import React, { useState } from "react";
import "./MbtiPage.css";

const DogSelectionPage = ({ onSelectDog }) => {
  const [selectedDog, setSelectedDog] = useState(null);
  const [mbtiResult, setMbtiResult] = useState(null);

  // 하드코딩된 강아지 정보
  const dogs = [
    { id: 1, name: "뽀비", image: "https://via.placeholder.com/84" },
    { id: 2, name: "손오공", image: "https://via.placeholder.com/84" },
  ];

  const handleDogSelect = (event) => {
    setSelectedDog(event.target.value);
  };

  const handleStartClick = () => {
    if (selectedDog) {
      // 선택된 강아지와 MBTI 검사 결과를 저장하고 페이지를 변경하는 함수 호출
      // 여기에 실제 MBTI 검사 로직을 추가하거나 더미 결과를 설정할 수 있습니다.
      // 예를 들어:
      const dummyResult = "INFP"; // 임시 검사 결과
      setMbtiResult(dummyResult);
      onSelectDog(selectedDog, dummyResult);
    }
  };

  return (
    <div className="mbtiBody">
      <div className="ChoseDogBox">
        <div className="ChoseTitle">
          <h1>테스트를 진행할 반려동물을 선택해 주세요</h1>
        </div>
        <div className="dogcardform">
          <div className="dogcard">
            {dogs.map((dog) => (
              <label key={dog.id} className="dog-label">
                <input
                  className="dogbutton"
                  type="radio"
                  name="dog"
                  value={dog.name}
                  checked={dog.name === selectedDog}
                  onChange={handleDogSelect}
                />
                <div className="dog-info">
                  <img src={dog.image} alt={dog.name} className="dog-image" />
                  <div className="DogName">{dog.name}</div>
                  <div>
                    {selectedDog === dog.name ? mbtiResult || "-" : "-"}
                  </div>
                </div>
              </label>
            ))}
          </div>
        </div>
        <button
          className="Chose-start-button"
          onClick={handleStartClick}
          disabled={!selectedDog}
        >
          시작하기
        </button>
      </div>
    </div>
  );
};

export default DogSelectionPage;
