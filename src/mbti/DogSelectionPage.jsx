// DogSelectionPage.js
import React, { useState } from "react";
import "./MbtiPage.css";

const DogSelectionPage = ({ onSelectDog }) => {
  const [selectedDog, setSelectedDog] = useState(null);
  const dogs = ["개1", "개2"];

  const handleDogSelect = (event) => {
    setSelectedDog(event.target.value);
  };

  const handleStartClick = () => {
    if (selectedDog) {
      onSelectDog(selectedDog);
    }
  };

  return (
    <div className="mbtiBody">
      <div className="ChoseDogBox">
        <div className="ChoseTitle">
          <h1>테스트를 진행할 반려동물을 선택해 주세요</h1>
        </div>
        <div className="dog-buttons">
          {dogs.map((dog) => (
            <label key={dog} className="dog-label">
              <input
                type="radio"
                name="dog"
                value={dog}
                checked={dog === selectedDog}
                onChange={handleDogSelect}
              />
              {dog}
            </label>
          ))}
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
