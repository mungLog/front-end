import React from "react";

function WaterDetails({ waterAmount, setWaterAmount }) {
  return (
    <div>
      <label>
        음수량 (ml):
        <input
          type="number"
          value={waterAmount}
          onChange={(e) => setWaterAmount(e.target.value)}
          required
        />
      </label>
    </div>
  );
}

export default WaterDetails;
