import React from "react";

function WalkDetails({ walkAmount, setWalkAmount }) {
  return (
    <div>
      <label>
        산책량 (분):
        <input
          type="number"
          value={walkAmount}
          onChange={(e) => setWalkAmount(e.target.value)}
          required
        />
      </label>
    </div>
  );
}

export default WalkDetails;
