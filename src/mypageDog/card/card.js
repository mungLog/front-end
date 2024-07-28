import React, { useState, useEffect } from "react";
import axios from "axios";
import style from "./card.module.css";
import DetailCard from "./detailCard";

function Card({ onAddSchedule, selectedPetId, onUpdateDog, resetExpandedDog }) {
  const [dogs, setDogs] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [expandedDog, setExpandedDog] = useState(null);

  // useEffect(() => {
  //   const initialDogs = [
  //     {
  //       petId: 1,
  //       name: "곰돌이",
  //       maxMetabolism: 1500,
  //       nowMetabolism: 1000,
  //       gender: "1",
  //       age: 42,
  //       weight: 14,
  //       breed: "시추",
  //       birth: "20150504",
  //       neutered: "1",
  //     },
  //     {
  //       petId: 2,
  //       name: "토순이",
  //       maxMetabolism: 2000,
  //       nowMetabolism: 800,
  //       gender: "0",
  //       age: 14,
  //       weight: 8,
  //       breed: "푸들",
  //       birth: "20180905",
  //       neutered: "1",
  //     },
  //     {
  //       petId: 3,
  //       name: "하루",
  //       maxMetabolism: 1000,
  //       nowMetabolism: 300,
  //       gender: "0",
  //       age: 2,
  //       weight: 3,
  //       breed: "말티즈",
  //       birth: "20240205",
  //       neutered: "0",
  //     },
  //   ];

  //   setDogs(initialDogs);
  // }, []);
  const awsIP = process.env.REACT_APP_BACKEND_URL;
  const familyId = 1;
  useEffect(() => {
    const fetchDogs = async () => {
      try {
        const response = await axios.get(`${awsIP}/pets/${familyId}`);
        setDogs(response.data);
      } catch (error) {
        console.error("반려견 데이터 불러오기 실패", error);
      }
    };
    fetchDogs();
  }, []);
  useEffect(() => {
    console.log(selectedPetId);
    if (selectedPetId !== null && selectedPetId !== undefined) {
      const index = dogs.findIndex((dog) => dog.petId === selectedPetId);
      if (index !== -1) {
        setCurrentIndex(index);
        if (resetExpandedDog) {
          setExpandedDog(null);
        } else {
          setExpandedDog(dogs[index]);
        }
      }
    }
  }, [selectedPetId, dogs, resetExpandedDog]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % dogs.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + dogs.length) % dogs.length);
  };

  const handleCardClick = (dog) => {
    setExpandedDog(dog);
  };

  const handleClose = () => {
    setExpandedDog(null);
  };

  const getTransformStyle = (index) => {
    const positionIndex = (index - currentIndex + dogs.length) % dogs.length;
    const zIndex = dogs.length - positionIndex;
    const scale = 1 - positionIndex * 0.05;
    const translateX = positionIndex * 20;
    return {
      transform: `scale(${scale}) translateX(${translateX}px)`,
      zIndex,
      opacity: positionIndex === 0 ? 1 : 0.7,
    };
  };

  const getMetabolismWidth = (dog) => {
    const ratio = dog.nowMetabolism / dog.maxMetabolism;
    const roundedPercentage = Math.round(ratio * 100);
    return `${roundedPercentage}%`;
  };

  return (
    <div className={style.scene}>
      {dogs.length > 1 && (
        <button className={`${style.arrow} ${style.left}`} onClick={handlePrev}>
          &lt;
        </button>
      )}
      <div className={style.carousel}>
        {dogs.map((dog, index) => (
          <div
            key={index}
            className={`${style.item} ${
              currentIndex === index ? style.active : ""
            }`}
            style={getTransformStyle(index)}
            onClick={() => handleCardClick(dog)}
          >
            <div className={style.card}>
              <button onClick={() => onUpdateDog(dog)}>정보 수정</button>
              <div className={style.avatar}></div>
              <div className={style.name}>{dog.name}</div>
              <div className={style.label}>기초대사량</div>
              <div className={style.barWrapper}>
                <div className={style.maxBar}>
                  <span
                    className={style.metabolismBar}
                    style={{ width: getMetabolismWidth(dog) }}
                  >
                    <span className={style.persent}>
                      {getMetabolismWidth(dog)}
                    </span>
                  </span>
                </div>
                <span
                  className={style.nowMeta}
                  style={{ left: getMetabolismWidth(dog) }}
                >
                  {dog.nowMetabolism}
                </span>
                <span className={style.maxMeta}>{dog.maxMetabolism}</span>
              </div>
              <div className={style.info}>
                {dog.gender === "1" ? "수컷" : "암컷"}
              </div>
              <div className={style.info}>{dog.age}</div>
              <div className={style.info}>{dog.weight}</div>
            </div>
          </div>
        ))}
      </div>
      {dogs.length > 1 && (
        <button
          className={`${style.arrow} ${style.right}`}
          onClick={handleNext}
        >
          &gt;
        </button>
      )}
      {expandedDog && (
        <DetailCard
          petId={expandedDog.petId}
          onClose={handleClose}
          onAddSchedule={onAddSchedule}
        />
      )}
    </div>
  );
}

export default Card;
