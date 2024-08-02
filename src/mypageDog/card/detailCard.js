import React, { useState, useEffect } from "react";
import axios from "axios";
import style from "./detailCard.module.css";
import add from "./img/addSchedule.svg";
import back from "./img/back.svg";
import rotate from "./img/rotate.svg";
import AddSchedule from "./../addSchedule";
import boy from "./img/boyIcon.svg";
import girl from "./img/girlIcon.svg";
import line from "./img/yellowLine.svg";
import goodWalk from "./img/walk.png";
import breedInfo from "./breedInfo";
import user from "./img/user.svg";
import food from "./img/cardIcon/food.svg";
import bath from "./img/cardIcon/bath.svg";
import ear from "./img/cardIcon/ear.svg";
import foot from "./img/cardIcon/foot.svg";
import hospital from "./img/cardIcon/hospital.svg";
import injection from "./img/cardIcon/injection.svg";
import medi from "./img/cardIcon/medi.svg";
import snack from "./img/cardIcon/snack.svg";
import tooth from "./img/cardIcon/tooth.svg";
import walk from "./img/cardIcon/walk.svg";
import water from "./img/cardIcon/water.svg";

function DetailCard({ petId, onClose, onAddSchedule }) {
  const [petDetails, setPetDetails] = useState(null);
  const [petCareRecords, setPetCareRecords] = useState([]);
  const [isFlipped, setIsFlipped] = useState(false);
  const categoryIcons = {
    밥: food,
    물: water,
    산책: walk,
    "약/영양제": medi,
    병원: hospital,
    예방접종: injection,
    간식: snack,
    양치: tooth,
    목욕: bath,
    발톱: foot,
    귀청소: ear,
  };
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
    breed: "시추",
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
      author: "동생",
      category: "간식",
      TimeStamp: "2024-07-25T10:35:00Z",
    },
    {
      author: "동생",
      category: "발톱",
      TimeStamp: "2024-07-25T10:45:00Z",
    },
    {
      author: "동생",
      category: "약/영양제",
      TimeStamp: "2024-07-25T10:45:00Z",
      memo: "xxx먹임",
    },
    {
      author: "엄마",
      category: "물",
      TimeStamp: "2024-07-25T12:00:00Z",
      memo: "미지근하게 줬어",
      water_amount: "200ml",
    },
    {
      author: "엄마",
      category: "물",
      TimeStamp: "2024-07-25T12:00:00Z",
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
  const getPercentageWidth = (current, max) => {
    if (max === 0) return "0%";
    const ratio = current / max;
    const roundedPercentage = Math.round(ratio * 100);
    return `${roundedPercentage}%`;
  };
  const getFormattedDate = () => {
    const today = new Date();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${month}/${day}`;
  };
  return (
    <div id={style.all}>
      <div id={style.btnFlex}>
        <button className={style.addBtn} onClick={handleAddSchedule}>
          <img src={add} alt="일정 추가" />
          일정 추가하기
        </button>
        <button className={style.closeBtn} onClick={onClose}>
          나가기
          <img src={back} alt="닫기" />
        </button>
      </div>
      <div className={`${style.cardWrapper} ${isFlipped ? style.flipped : ""}`}>
        <div className={style.frontCard}>
          {/* <div>{petId}</div> */}
          {petDetails ? (
            <>
              <div className={style.avatarFlex}>
                <div style={{ width: "123px" }}></div>
                <div className={style.avatar}></div>
                <button className={style.rotate} onClick={handleFlip}>
                  기록일지 보기 <img src={rotate} alt="" />
                </button>
              </div>
              <div className={style.name}>{petDetails.name}</div>
              <div className={style.infoFlex}>
                <div>
                  {petDetails.gender === "1" ? (
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
                <div>{calculateAge(petDetails.birth)}</div>
                <img src={line} alt="경계선 이미지" />
                <div>{petDetails.weight}kg</div>
              </div>
              <div className={style.kcalTitle}>총 섭취량</div>
              <div className={style.maxBar}>
                <span
                  id={style.yellowBar}
                  className={style.fillBar}
                  style={{
                    width: getPercentageWidth(
                      petDetails.nowMetabolism,
                      petDetails.maxMetabolism
                    ),
                  }}
                ></span>
              </div>
              <div id={style.persentFlex}>
                <div>0%</div>
                <div>50%</div>
                <div>100%</div>
              </div>
              <div id={style.maxMeta}>
                {petDetails.nowMetabolism}/{petDetails.maxMetabolism}kcal
              </div>
              <div className={style.infoDetail}>
                <div id={style.detailLeft}>
                  <div className={style.detailTitle}>권장 활동량</div>
                  <div id={style.goodWalk}>
                    <>
                      <img src={goodWalk} alt="산책 이미지" />
                      30분 X 2
                    </>
                  </div>
                  <div className={style.barTitle}>
                    <span>산책량</span>
                    <span>
                      {petDetails.nowWalk}/{petDetails.maxWalk}분
                    </span>
                  </div>
                  <div className={style.maxBar}>
                    <span
                      id={style.blueBar}
                      className={style.fillBar}
                      style={{
                        width: getPercentageWidth(
                          petDetails.nowWater,
                          petDetails.maxWater
                        ),
                      }}
                    ></span>
                  </div>
                  <div id={style.persentFlex}>
                    <div>0%</div>
                    <div>50%</div>
                    <div>100%</div>
                  </div>
                  <div className={style.barTitle}>
                    <span>음수량</span>
                    <span>
                      {petDetails.nowWater}/{petDetails.maxWater}ml
                    </span>
                  </div>
                  <div className={style.maxBar}>
                    <span
                      id={style.blueBar}
                      className={style.fillBar}
                      style={{
                        width: getPercentageWidth(
                          petDetails.nowWalk,
                          petDetails.maxWalk
                        ),
                      }}
                    ></span>
                  </div>
                  <div id={style.persentFlex}>
                    <div>0%</div>
                    <div>50%</div>
                    <div>100%</div>
                  </div>
                </div>
                <svg
                  width="2"
                  height="202"
                  viewBox="0 0 2 202"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M1 1L1.00001 201"
                    stroke="#F7F8FB"
                    stroke-width="1.3"
                    stroke-linecap="round"
                  ></path>
                </svg>
                <div id={style.detailRight}>
                  <div className={style.detailTitle}>주의사항</div>
                  <div id={style.caution}>{breedInfo[petDetails.breed]}</div>
                </div>
              </div>
            </>
          ) : (
            <div>반려견 정보 로딩중</div>
          )}
        </div>
        <div className={style.backCard}>
          {petDetails ? (
            <>
              <div className={style.avatarFlex}>
                <div style={{ width: "123px" }}></div>
                <div className={style.avatar}></div>
                <button className={style.rotate} onClick={handleFlip}>
                  열량체크 하기 <img src={rotate} alt="" />
                </button>
              </div>
              <div className={style.name}>{petDetails.name}</div>
            </>
          ) : (
            <div>반려견 정보 로딩중</div>
          )}
          {petCareRecords.length > 0 ? (
            <div className={style.backContent}>
              <div id={style.today}>{getFormattedDate()}</div>
              {petCareRecords.map((record, index) => (
                <div key={index} className={style.record}>
                  <div className={style.recordTop}>
                    <div className={style.user}>
                      <img src={user} alt="유저" />
                      {record.author}
                    </div>
                    <div className={style.ctg}>
                      {categoryIcons[record.category] && (
                        <img
                          src={categoryIcons[record.category]}
                          alt={record.category}
                        />
                      )}
                      {record.category}
                    </div>
                    <div className={style.time}>
                      {formatTime(record.TimeStamp)}
                    </div>
                  </div>
                  {record.memo && (
                    <>
                      <div className={style.memoTitle}>메모</div>
                      <div className={style.memoContent}>
                        {record.category === "밥"
                          ? `${record.meal_name} ${record.meal_amount} / ${record.memo}`
                          : record.category === "물"
                          ? `${record.water_amount} / ${record.memo}`
                          : record.category === "산책"
                          ? `${record.walk_duration} / ${record.memo}`
                          : record.memo}
                      </div>
                    </>
                  )}
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
