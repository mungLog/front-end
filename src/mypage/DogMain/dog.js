import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Card from "./../../mypageDog/card/card";
import MbtiLog from "./../../mypageDog/mbtiLog/mbtiLog";
import style from "./dogMain.module.css";
import AddSchedule from "./../../mypageDog/addSchedule";
import UpdateDog from "./../../mypageDog/update/updateDog";
import { useAuth } from "../../header/AuthContext";
import AddDog from "./../../mypageDog/addDog";

function DogMain() {
  const [selectDogpage, setSelectDogpage] = useState("check");
  const [selectedPetId, setSelectedPetId] = useState(null);
  const [dogUpdate, setDogUpdate] = useState(null);
  const [resetExpandedDog, setResetExpandedDog] = useState(false);
  const { state, dispatch } = useAuth();
  const navigate = useNavigate();

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

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/login");
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
        <button onClick={handleLogout}>로그아웃</button>
      </div>
      <div id={style.right}>
        {selectDogpage === "check" && (
          <Card
            onAddSchedule={handleAddSchedule}
            selectedPetId={selectedPetId}
            onUpdateDog={handleUpdate}
            resetExpandedDog={resetExpandedDog}
            onAddDog={() => setSelectDogpage("addDog")}
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
        {selectDogpage === "addDog" && <AddDog />}
      </div>
    </div>
  );
}

export default DogMain;
