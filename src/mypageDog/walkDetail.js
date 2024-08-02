import React from "react";
import style from "./addSchedule.module.css";

function WalkDetails({ walkAmount, setWalkAmount }) {
  return (
    <div id={style.wrapper}>
      <div className={style.addTable}>
        <span>산책량</span>
        <div>
          <div className={style.inputWrap}>
            <input
              type="text"
              value={walkAmount}
              onChange={(e) => setWalkAmount(e.target.value)}
              required
            />
            분
          </div>
        </div>
      </div>
    </div>
  );
}

export default WalkDetails;
