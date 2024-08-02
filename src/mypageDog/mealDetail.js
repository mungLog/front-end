import React, { useState, useEffect } from "react";
import style from "./addSchedule.module.css";
function MealDetail({
  mealType,
  setMealType,
  foodName,
  setFoodName,
  portion,
  setPortion,
  customCalories,
  setCustomCalories,
  calories,
  setCalories,
}) {
  const mealTypes = ["건사료", "습식사료", "기타"];

  const handlePortionChange = (e) => {
    const value = e.target.value;
    setPortion(value);
    calculateCalories(value, mealType, customCalories);
  };

  const handleCustomCaloriesChange = (e) => {
    const value = e.target.value;
    setCustomCalories(value);
    calculateCalories(portion, mealType, value);
  };

  const calculateCalories = (portionValue, type, customKcal) => {
    let kcal = 0;
    if (type === "건사료") {
      kcal = portionValue * 4.4;
    } else if (type === "습식사료") {
      kcal = portionValue * 1.14;
    } else if (type === "기타") {
      kcal = portionValue * (customKcal || 0);
    }
    setCalories(Math.floor(kcal));
  };

  useEffect(() => {
    calculateCalories(portion, mealType, customCalories);
  }, [mealType]);

  return (
    <div id={style.wrapper}>
      <div className={style.addTable}>
        <span>식사 종류</span>
        <select value={mealType} onChange={(e) => setMealType(e.target.value)}>
          <option>종류를 선택해주세요.</option>
          {mealTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>
      <div className={style.addTable}>
        <span>사료 이름</span>
        <input
          type="text"
          value={foodName}
          onChange={(e) => setFoodName(e.target.value)}
          required
          id={style.foodName}
          placeholder="이름을 입력해주세요."
        />
      </div>
      <div className={style.addTable}>
        <span>배당량</span>
        <div>
          <div className={style.inputWrap}>
            <input
              type="text"
              value={portion}
              onChange={handlePortionChange}
              required
            />
            g
          </div>
        </div>
      </div>
      {mealType === "기타" && (
        <div className={style.addTable}>
          <span>1g당 kcal</span>
          <div>
            <div className={style.inputWrap}>
              <input
                type="number"
                value={customCalories}
                onChange={handleCustomCaloriesChange}
                required
              />
              kcal
            </div>
          </div>
        </div>
      )}
      <div className={style.addTable}>
        <span>칼로리 계산</span>
        <div>
          <div className={style.inputWrap}>
            <input type="number" value={calories} readOnly />
            kcal
          </div>
        </div>
      </div>
    </div>
  );
}

export default MealDetail;
