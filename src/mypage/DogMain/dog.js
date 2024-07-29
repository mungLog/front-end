import React, { useState } from "react";
import { Link } from "react-router-dom";
import Card from "./../../mypageDog/card/card";
import MbtiLog from "./../../mypageDog/mbtiLog/mbtiLog";
import style from "./dogMain.module.css";
import AddSchedule from "./../../mypageDog/addSchedule";
import UpdateDog from "./../../mypageDog/update/updateDog";

function DogMain() {
  const [selectDogpage, setSelectDogpage] = useState("check");
  const [selectedPetId, setSelectedPetId] = useState(null);
  const [dogUpdate, setDogUpdate] = useState(null);
  const [resetExpandedDog, setResetExpandedDog] = useState(false);

  const handleAddSchedule = (petId) => {
    setSelectDogpage("addSchedule");
    setSelectedPetId(petId);
    setResetExpandedDog(false);
  };

  const handleAddComplete = (petId) => {
    //일정 추가 후 원래 페이지로
    setSelectDogpage("check");
    setSelectedPetId(petId);
    setResetExpandedDog(false);
  };

  const handleUpdate = (dog) => {
    setDogUpdate(dog);
    setSelectDogpage("updateDog");
    setResetExpandedDog(true);
  };

  const handleUpdateComplete = (updatedDog) => {
    setDogUpdate(null);
    setSelectDogpage("check");
    setSelectedPetId(updatedDog.petId);
    setResetExpandedDog(true);
  };
  const handleCancelUpdate = (petId) => {
    setDogUpdate(null);
    setSelectDogpage("check");
    setSelectedPetId(petId);
    setResetExpandedDog(true);
  };
  return (
    <div id={style.flex}>
      <div id={style.left}>
        <button
          onClick={() => setSelectDogpage("check")}
          className={selectDogpage === "check" ? style.selected : ""}
        >
          열량체크/기록일지
        </button>
        <button
          onClick={() => setSelectDogpage("mbtiLog")}
          className={selectDogpage === "mbtiLog" ? style.selected : ""}
        >
          멍BIT 기록보기
        </button>
        <Link>로그아웃</Link>
      </div>
      <div id={style.right}>
        {selectDogpage === "check" && (
          <Card
            onAddSchedule={handleAddSchedule}
            selectedPetId={selectedPetId}
            onUpdateDog={handleUpdate}
            resetExpandedDog={resetExpandedDog}
          />
        )}
        {selectDogpage === "mbtiLog" && <MbtiLog />}
        {selectDogpage === "addSchedule" && (
          <AddSchedule
            petId={selectedPetId}
            onAddComplete={handleAddComplete}
          />
        )}
        {selectDogpage === "updateDog" && (
          <UpdateDog
            dog={dogUpdate}
            onSave={handleUpdateComplete}
            onCancel={handleCancelUpdate}
          />
        )}
      </div>
    </div>
  );
}

export default DogMain;
