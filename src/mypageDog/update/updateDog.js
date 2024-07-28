import React, { useState } from "react";
import axios from "axios";
import style from "./updateDog.module.css";

function UpdateDog({ dog, onSave, onCancel }) {
  const [name, setName] = useState(dog.name);
  const [sex, setSex] = useState(dog.sex);
  const [birth, setBirth] = useState(dog.birth);
  const [weight, setWeight] = useState(dog.weight);
  const [breed, setBreed] = useState(dog.breed || "");
  const [neutered, setNeutered] = useState(dog.neutered);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedDog = {
      ...dog,
      name,
      sex,
      birth,
      weight,
      breed,
      neutered,
    };
    const awsIP = process.env.REACT_APP_BACKEND_URL;
    try {
      await axios.put(`${awsIP}/pets/update/${dog.petId}`, updatedDog);
      console.log("반려견 정보 수정 성공");
      onSave(updatedDog);
    } catch (error) {
      console.error("반려견 정보 수정 실패", error);
    }
  };

  return (
    <div className={style.editForm}>
      <h2>정보 수정</h2>
      <form onSubmit={handleSubmit}>
        <label>
          이름:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          생년월일:
          <input
            type="number"
            value={birth}
            onChange={(e) => setBirth(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          무게:
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          품종:
          <select
            value={breed}
            onChange={(e) => setBreed(e.target.value)}
            required
          >
            <option value="">품종을 선택해주세요.</option>
            <option value="말티즈">말티즈</option>
            <option value="포메라니안">포메라니안</option>
            <option value="푸들">푸들</option>
            <option value="요크셔테리어">요크셔테리어</option>
            <option value="시추">시추</option>
          </select>
        </label>
        <br />
        <label>
          성별:
          <label>
            <input
              type="radio"
              value="수컷"
              checked={sex === "수컷"}
              onChange={(e) => setSex(e.target.value)}
            />
            수컷
          </label>
          <label>
            <input
              type="radio"
              value="암컷"
              checked={sex === "암컷"}
              onChange={(e) => setSex(e.target.value)}
            />
            암컷
          </label>
        </label>
        <br />
        <label>
          중성화 여부:
          <label>
            <input
              type="radio"
              value="true"
              checked={neutered === "true"}
              onChange={() => setNeutered("true")}
            />
            예
          </label>
          <label>
            <input
              type="radio"
              value="false"
              checked={neutered === "false"}
              onChange={() => setNeutered("false")}
            />
            아니오
          </label>
        </label>
        <br />
        <button type="submit">저장</button>
        <button type="button" onClick={() => onCancel(dog.petId)}>
          취소
        </button>
      </form>
    </div>
  );
}

export default UpdateDog;
