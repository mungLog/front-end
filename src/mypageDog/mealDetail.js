import React, { useState, useEffect } from "react";

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
    <div>
      <div>
        <label>
          식사 종류:
          <select
            value={mealType}
            onChange={(e) => setMealType(e.target.value)}
          >
            {mealTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div>
        <label>
          사료 이름:
          <input
            type="text"
            value={foodName}
            onChange={(e) => setFoodName(e.target.value)}
            required
          />
        </label>
      </div>
      <div>
        <label>
          배당량 (g):
          <input
            type="number"
            value={portion}
            onChange={handlePortionChange}
            required
          />
        </label>
      </div>
      {mealType === "기타" && (
        <div>
          <label>
            1g당 칼로리 (kcal):
            <input
              type="number"
              value={customCalories}
              onChange={handleCustomCaloriesChange}
              required
            />
          </label>
        </div>
      )}
      <div>
        <label>
          총 칼로리 (kcal):
          <input type="number" value={calories} readOnly />
        </label>
      </div>
    </div>
  );
}

export default MealDetail;
