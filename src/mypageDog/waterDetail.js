import React from "react";
import style from "./addSchedule.module.css";

function WaterDetails({ waterAmount, setWaterAmount }) {
  return (
    <div id={style.wrapper}>
      <div className={style.addTable}>
        <span>음수량</span>
        <div>
          <div className={style.inputWrap}>
            <input
              type="text"
              value={waterAmount}
              onChange={(e) => setWaterAmount(e.target.value)}
              required
            />
            ml
          </div>
        </div>
      </div>
    </div>
  );
}

export default WaterDetails;
