import React, { useState } from "react";
import axios from "axios";
import MealDetail from "./mealDetail";
import WaterDetails from "./waterDetail";
import WalkDetails from "./walkDetail";

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

  const author = "작성자 닉네임"; // 로그인한 사용자 가족내 닉네임 불러와야됨

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
      // await axios.post(`/nutrition/${petId}`, record);
      console.log("일정 추가 성공");
      onAddComplete(petId);
    } catch (error) {
      console.error("일정 추가 에러", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>일정 추가 petId {petId}</h2>
      <div>
        작성자 :
        <input type="hidden" value={author} />
        {author}
      </div>
      <div>
        <label>
          활동 시간 (hh:mm):
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
          />
        </label>
      </div>
      <div>
        <label>
          활동명:
          {activities.map((activityName) => (
            <label key={activityName}>
              <input
                type="radio"
                value={activityName}
                checked={activity === activityName}
                onChange={(e) => setActivity(e.target.value)}
              />
              {activityName}
            </label>
          ))}
        </label>
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
      <div>
        <label>
          활동 내용:
          <textarea value={memo} onChange={(e) => setMemo(e.target.value)} />
        </label>
      </div>
      <button type="submit">추가하기</button>
    </form>
  );
}

export default AddSchedule;
