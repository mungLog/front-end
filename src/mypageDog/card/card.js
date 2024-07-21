import React, { useState, useEffect } from "react";
import style from "./card.module.css";

function Card() {
  const dogs = [
    {
      name: "곰돌이",
      maxMetabolism: 1500,
      nowMetabolism: 1000,
      sex: "수컷",
      age: 42,
      weight: 14,
    },
    {
      name: "토순이",
      maxMetabolism: 2000,
      nowMetabolism: 800,
      sex: "암컷",
      age: 14,
      weight: 8,
    },
    {
      name: "하루",
      maxMetabolism: 1000,
      nowMetabolism: 300,
      sex: "암컷",
      age: 2,
      weight: 3,
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [expandedDog, setExpandedDog] = useState(null);

  const handleNext = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentIndex((prevIndex) => (prevIndex + 1) % dogs.length);
    }
  };

  const handlePrev = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentIndex(
        (prevIndex) => (prevIndex - 1 + dogs.length) % dogs.length
      );
    }
  };

  useEffect(() => {
    if (isAnimating) {
      const timer = setTimeout(() => setIsAnimating(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [isAnimating]);

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
        <button
          className={`${style.arrow} ${style.left}`}
          onClick={handlePrev}
          disabled={isAnimating}
        >
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
              <div className={style.info}>{dog.sex}</div>
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
          disabled={isAnimating}
        >
          &gt;
        </button>
      )}
      {expandedDog && (
        <div className={style.expandedCard}>
          <button className={style.closeButton} onClick={handleClose}>
            X
          </button>
          <div className={style.expandedContent}>
            <div className={style.expandedAvatar}></div>
            <div className={style.expandedName}>{expandedDog.name}</div>
            <div className={style.expandedLabel}>기초대사량</div>
            <div className={style.expandedBarWrapper}>
              <div className={style.expandedMaxBar}>
                <span
                  className={style.expandedMetabolismBar}
                  style={{ width: getMetabolismWidth(expandedDog) }}
                >
                  <span className={style.expandedPersent}>
                    {getMetabolismWidth(expandedDog)}
                  </span>
                </span>
              </div>
              <span
                className={style.expandedNowMeta}
                style={{ left: getMetabolismWidth(expandedDog) }}
              >
                {expandedDog.nowMetabolism}
              </span>
              <span className={style.expandedMaxMeta}>
                {expandedDog.maxMetabolism}
              </span>
            </div>
            <div className={style.expandedInfo}>{expandedDog.sex}</div>
            <div className={style.expandedInfo}>{expandedDog.age}</div>
            <div className={style.expandedInfo}>{expandedDog.weight}</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Card;
