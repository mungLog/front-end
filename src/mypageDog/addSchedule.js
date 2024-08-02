import React, { useState } from "react";
import axios from "axios";
import MealDetail from "./mealDetail";
import WaterDetails from "./waterDetail";
import WalkDetails from "./walkDetail";
import food from "./card/img/cardIcon/food.svg";
import bath from "./card/img/cardIcon/bath.svg";
import ear from "./card/img/cardIcon/ear.svg";
import foot from "./card/img/cardIcon/foot.svg";
import hospital from "./card/img/cardIcon/hospital.svg";
import injection from "./card/img/cardIcon/injection.svg";
import medi from "./card/img/cardIcon/medi.svg";
import snack from "./card/img/cardIcon/snack.svg";
import tooth from "./card/img/cardIcon/tooth.svg";
import walk from "./card/img/cardIcon/walk.svg";
import water from "./card/img/cardIcon/water.svg";
import { useAuth } from "../header/AuthContext";

import style from "./addSchedule.module.css";

function AddSchedule({ petId, onAddComplete }) {
  const [time, setTime] = useState("");
  const [activity, setActivity] = useState("밥");
  const [memo, setMemo] = useState("");
  const [mealType, setMealType] = useState("건사료");
  const [foodName, setFoodName] = useState("");
  const [portion, setPortion] = useState("");
  const [calories, setCalories] = useState(0);
  const [customCalories, setCustomCalories] = useState("");
  const [waterAmount, setWaterAmount] = useState("");
  const [walkAmount, setWalkAmount] = useState("");
  const { state } = useAuth();
  const author = state.user.nickname;
  const activities = [
    "밥",
    "물",
    "산책",
    "약/영양제",
    "병원",
    "예방접종",
    "간식",
    "양치",
    "목욕",
    "발톱",
    "귀청소",
  ];

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

  const awsIP = process.env.REACT_APP_BACKEND_URL;
  const handleSubmit = async (e) => {
    e.preventDefault();
    const record = {
      author,
      time,
      activity,
      memo,
      meal_cta: activity === "밥" ? mealType : null,
      meal_name: activity === "밥" ? foodName : null,
      meal_amount: activity === "밥" ? portion : null,
      calories: activity === "밥" ? calories : null,
      water_amount: activity === "물" ? waterAmount : null,
      walk_duration: activity === "산책" ? walkAmount : null,
    };

    try {
      await axios.post(`${awsIP}/nutrition/${petId}`, record);
      console.log("일정 추가 성공");
      onAddComplete(petId);
    } catch (error) {
      console.error("일정 추가 에러", error);
    }
  };

  return (
    <form id={style.wrapper} onSubmit={handleSubmit}>
      <h2 id={style.title}>반려동물 일정추가</h2>
      <div className={style.addTable}>
        <span>작성자</span>
        <div id={style.author}>
          <input type="hidden" value={author} />
          {author}
        </div>
      </div>
      <div className={style.addTable}>
        <span>활동 시간</span>
        <div id={style.time}>
          <input
            type="text"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            placeholder="18:00"
            required
          />
        </div>
      </div>
      <div className={style.addTable} id={style.exercise}>
        <span>활동명</span>
        <div className={style.exerciseGrid}>
          {activities.map((activityName) => (
            <label
              key={activityName}
              className={`${style.activityLabel} ${
                activity === activityName ? style.selected : ""
              }`}
              onClick={() => setActivity(activityName)}
            >
              <img src={categoryIcons[activityName]} alt={activityName} />
              <div>
                <input
                  type="radio"
                  value={activityName}
                  checked={activity === activityName}
                  onChange={(e) => setActivity(e.target.value)}
                />
                <span>{activityName}</span>
              </div>
            </label>
          ))}
        </div>
      </div>
      {activity === "밥" && (
        <MealDetail
          mealType={mealType}
          setMealType={setMealType}
          foodName={foodName}
          setFoodName={setFoodName}
          portion={portion}
          setPortion={setPortion}
          customCalories={customCalories}
          setCustomCalories={setCustomCalories}
          calories={calories}
          setCalories={setCalories}
        />
      )}
      {activity === "물" && (
        <WaterDetails
          waterAmount={waterAmount}
          setWaterAmount={setWaterAmount}
        />
      )}
      {activity === "산책" && (
        <WalkDetails walkAmount={walkAmount} setWalkAmount={setWalkAmount} />
      )}
      <div className={style.addTable} id={style.memoWrap}>
        <span>활동내용</span>
        <textarea
          id={style.memo}
          value={memo}
          onChange={(e) => setMemo(e.target.value)}
          placeholder="100자 이내로 작성해 주세요."
        />
      </div>
      <div className={style.addTable}>
        <span></span>
        <button type="submit" id={style.addBtn}>
          추가하기
        </button>
      </div>
    </form>
  );
}

export default AddSchedule;
