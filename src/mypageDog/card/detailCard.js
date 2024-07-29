import React, { useState, useEffect } from "react";
import axios from "axios";
import style from "./detailCard.module.css";

function DetailCard({ petId, onClose, onAddSchedule }) {
  const [petDetails, setPetDetails] = useState(null);
  const [petCareRecords, setPetCareRecords] = useState([]);
  const [isFlipped, setIsFlipped] = useState(false);

  const testPetDetails = {
    name: "곰돌이",
    imgUrl: "abc",
    nowMetabolism: 1000,
    maxMetabolism: 1500,
    nowWater: 500,
    maxWater: 800,
    nowWalk: 30,
    maxWalk: 50,
    gender: "1",
    birth: "20240105",
    weight: 10,
  };

  const testPetCareRecords = [
    {
      author: "엄마",
      category: "밥",
      TimeStamp: "2024-07-25T07:00:00Z",
      memo: "아침밥~~",
      meal_name: "잘먹고 잘싸개",
      meal_amount: "80g",
    },
    {
      author: "아빠",
      category: "산책",
      TimeStamp: "2024-07-25T08:00:00Z",
      memo: "동네한바퀴",
      walk_duration: "30분",
    },
    {
      author: "동생",
      category: "간식",
      TimeStamp: "2024-07-25T10:30:00Z",
      memo: "개껌하나줬어",
    },
    {
      author: "엄마",
      category: "물",
      TimeStamp: "2024-07-25T12:00:00Z",
      memo: "미지근하게 줬어",
      water_amount: "200ml",
    },
  ];
  const awsIP = process.env.REACT_APP_BACKEND_URL;
  const fetchPetDetails = async () => {
    try {
      // const response = await axios.get(`${awsIP}/pets/${petId}`);
      // setPetDetails(response.data);
      setPetDetails(testPetDetails);
    } catch (error) {
      console.error("반려견 정보 조회 에러", error);
    }
  };

  const fetchPetCareRecords = async () => {
    try {
      // const response = await axios.get(`${awsIP}/nutrition/${petId}`);
      // setPetCareRecords(response.data);
      setPetCareRecords(testPetCareRecords);
    } catch (error) {
      console.error("반려견 케어 기록 조회 에러", error);
    }
  };

  useEffect(() => {
    if (petId) {
      // petId가 비었으면 호출하지 않음
      fetchPetDetails();
      fetchPetCareRecords();
    }
  }, [petId]);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleAddSchedule = async () => {
    await onAddSchedule(petId);
    fetchPetDetails();
    fetchPetCareRecords();
  };

  const formatTime = (timeString) => {
    const options = { hour: "2-digit", minute: "2-digit", hour12: false };
    return new Date(timeString).toLocaleTimeString("ko-KR", options);
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
    <div id={style.cardCenter}>
      <div className={`${style.cardWrapper} ${isFlipped ? style.flipped : ""}`}>
        <div className={style.frontCard}>
          <div>{petId}</div>
          <button onClick={handleFlip}>뒷면보기</button>
          <button onClick={handleAddSchedule}>일정 추가</button>
          <button className={style.closeButton} onClick={onClose}>
            X
          </button>
          {petDetails ? (
            <div className={style.content}>
              <div className={style.avatar}></div>
              <div className={style.name}>{petDetails.name}</div>
              <div className={style.info}>
                기초대사량: {petDetails.nowMetabolism}/
                {petDetails.maxMetabolism}
              </div>
              <div className={style.info}>
                음수량: {petDetails.nowWater}/{petDetails.maxWater}
              </div>
              <div className={style.info}>
                산책량: {petDetails.nowWalk}/{petDetails.maxWalk}
              </div>
              <div className={style.info}>
                성별: {petDetails.gender === "1" ? "수컷" : "암컷"}
              </div>
              <div className={style.info}>
                나이: {calculateAge(petDetails.birth)}
              </div>
              <div className={style.info}>무게: {petDetails.weight}</div>
            </div>
          ) : (
            <div>반려견 정보 로딩중</div>
          )}
        </div>
        <div className={style.backCard}>
          <button onClick={handleAddSchedule}>일정 추가</button>
          <button className={style.closeButton} onClick={onClose}>
            X
          </button>
          <button onClick={handleFlip}>앞면보기</button>
          {petDetails ? (
            <div>
              <div>이름 : {petDetails.name}</div>
              <div>사진 : {petDetails.imgUrl}</div>
            </div>
          ) : (
            <div>반려견 정보 로딩중</div>
          )}
          {petCareRecords.length > 0 ? (
            <div className={style.content}>
              {petCareRecords.map((record, index) => (
                <div key={index} className={style.record}>
                  <div className={style.info}>작성자: {record.author}</div>
                  <div className={style.info}>카테고리: {record.category}</div>
                  <div className={style.info}>
                    시간: {formatTime(record.TimeStamp)}
                  </div>
                  <div className={style.info}>
                    {record.category === "밥"
                      ? `${record.meal_name} ${record.meal_amount} / ${record.memo}`
                      : record.category === "물"
                      ? `${record.water_amount} / ${record.memo}`
                      : record.category === "산책"
                      ? `${record.walk_duration} / ${record.memo}`
                      : record.memo}
                  </div>
                  <br />
                </div>
              ))}
            </div>
          ) : (
            <div>케어 기록 로딩중</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DetailCard;
