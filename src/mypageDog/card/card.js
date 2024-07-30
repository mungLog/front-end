import React, { useState, useEffect } from "react";
import axios from "axios";
import style from "./card.module.css";
import DetailCard from "./detailCard";
import { Link } from "react-router-dom";
import addDog from "./img/addDog.svg";
import Update from "./img/updateIcon.svg";
import boy from "./img/boyIcon.svg";
import girl from "./img/girlIcon.svg";
import line from "./img/yellowLine.svg";
import left from "./img/leftArrow.svg";
import right from "./img/rightArrow.svg";

// 반려동물 추가하기 링크 추가

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
        const response = await axios.get(
          `${awsIP}/families/${familyId}/animals`
        );
        setDogs(response.data);
        console.log(response);
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
    const scale = 1 - positionIndex * 0.0955;
    const translateX = positionIndex * 67;
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

  const calculateAge = (birth) => {
    const today = new Date();
    const ageYears = today.getFullYear() - parseInt(birth.substring(0, 4));
    const ageMonths = today.getMonth() + 1 - parseInt(birth.substring(4, 6));
    const ageDays = today.getDate() - parseInt(birth.substring(6, 8));

    let adjustedYears = ageYears;
    let adjustedMonths = ageMonths;

    if (ageMonths < 0 || (ageMonths === 0 && ageDays < 0)) {
      adjustedYears -= 1;
      adjustedMonths += 12;
    }

    if (ageDays < 0) {
      adjustedMonths -= 1;
    }

    if (adjustedYears === 0 && adjustedMonths <= 12) {
      return `${adjustedMonths}개월`;
    } else {
      return `${adjustedYears}살 ${adjustedMonths}개월`;
    }
  };

  return (
    <div className={style.wrapper}>
      <h2 className={style.title}>열량체크/기록일지</h2>
      <Link to="/addDog" className={style.addDog}>
        <img src={addDog} alt="반려동물 추가 아이콘" />
        반려동물 추가하기
      </Link>
      {dogs.length === 0 ? (
        <div className={style.noPetsMessage}>
          등록된 반려견이 없습니다. <br />
          반려동물을 추가해 주세요.
        </div>
      ) : (
        <div id={style.cardCenter}>
          {dogs.length > 1 && (
            <button
              className={`${style.arrow} ${style.left}`}
              onClick={handlePrev}
            >
              <img src={left} alt="왼쪽 화살표" />
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
                  <div className={style.avatar}></div>
                  <div id={style.nameFlex}>
                    <div style={{ width: "57px" }}></div>
                    <div className={style.name}>{dog.name}</div>
                    <button
                      className={style.update}
                      onClick={() => onUpdateDog(dog)}
                    >
                      수정 <img src={Update} alt="수정 아이콘" />
                    </button>
                  </div>
                  <div className={style.infoFlex}>
                    <div className={style.info}>
                      {dog.gender === "1" ? (
                        <div id={style.gender}>
                          남아 <img src={boy} alt="남" />
                        </div>
                      ) : (
                        <div id={style.gender}>
                          여아 <img src={girl} alt="여" />
                        </div>
                      )}
                    </div>
                    <img src={line} alt="경계선 이미지" />
                    <div className={style.info}>{calculateAge(dog.birth)}</div>
                    <img src={line} alt="경계선 이미지" />
                    <div className={style.info}>{dog.weight}kg</div>
                  </div>
                  <div className={style.kcalTitle}>총 섭취량</div>
                  <div className={style.maxBar}>
                    <span
                      className={style.metabolismBar}
                      style={{ width: getMetabolismWidth(dog) }}
                    ></span>
                  </div>
                  <div id={style.persentFlex}>
                    <div>0%</div>
                    <div>50%</div>
                    <div>100%</div>
                  </div>
                  <div id={style.maxMeta}>{dog.maxMetabolism}kcal</div>
                </div>
              </div>
            ))}
          </div>
          {dogs.length > 1 && (
            <button
              className={`${style.arrow} ${style.right}`}
              onClick={handleNext}
            >
              <img src={right} alt="오른쪽 화살표" />
            </button>
          )}
        </div>
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
