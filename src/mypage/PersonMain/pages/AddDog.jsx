import React, { useState } from "react";
import axios from "axios";

export default function AddDog() {
  const [formData, setFormData] = useState({
    name: "",
    birthdate: "",
    weight: "",
    breed: "",
    gender: "",
    neutered: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await axios.post("http://localhost:8080/pets", {
          name: formData.name,
          birthdate: formData.birthdate,
          weight: formData.weight,
          breed: formData.breed,
          gender: formData.gender,
          neutered: formData.neutered,
        });
        if (response.status === 200) {
          alert("등록이 성공적으로 완료되었습니다.");
          // 추가로 수행할 로직 (예: 폼 초기화, 다른 페이지로 이동 등)
        }
      } catch (error) {
        console.error("서버에 데이터를 보내는 중 오류 발생:", error);
        alert("등록 중 오류가 발생했습니다. 다시 시도해주세요.");
      }
    }
  };

  const validateForm = () => {
    const { name, birthdate, weight, breed, gender, neutered } = formData;
    if (!name || !birthdate || !weight || !breed || !gender || !neutered) {
      alert("모든 필드를 입력해주세요.");
      return false;
    }
    if (!/^\d{8}$/.test(birthdate)) {
      alert("생년월일은 숫자 8자리로 입력해주세요.");
      return false;
    }
    return true;
  };

  return (
    <div className="Page">
      <form onSubmit={handleSubmit} className="ContentWrap">
        <div className="InputWrap">
          이름
          <input
            type="text"
            placeholder="반려견 이름을 입력해 주세요."
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="InputWrap">
          생년월일
          <input
            type="text"
            placeholder="생년월일 8자리를 입력해 주세요. (YYYYMMDD)"
            name="birthdate"
            value={formData.birthdate}
            onChange={handleChange}
            required
            pattern="\d{8}"
            title="생년월일은 숫자 8자리로 입력해주세요."
          />
        </div>
        <div className="InputWrap">
          몸무게
          <input
            type="text"
            placeholder="몸무게를 입력해주세요."
            name="weight"
            value={formData.weight}
            onChange={handleChange}
            required
          />
        </div>
        <div className="InputWrap">
          품종
          <select
            name="breed"
            id="breed"
            value={formData.breed}
            onChange={handleChange}
            required
          >
            <option value="">품종을 선택해 주세요.</option>
            <option value="말티즈">말티즈</option>
            <option value="포메라니안">포메라니안</option>
            <option value="푸들">푸들</option>
            <option value="요크셔테리어">요크셔테리어</option>
            <option value="시추">시추</option>
          </select>
        </div>
        <div className="InputWrap">
          성별
          <label>
            <input
              type="radio"
              name="gender"
              value="남아"
              checked={formData.gender === "남아"}
              onChange={handleChange}
              required
            />{" "}
            남아
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="여아"
              checked={formData.gender === "여아"}
              onChange={handleChange}
              required
            />{" "}
            여아
          </label>
        </div>
        <div className="InputWrap">
          중성화 여부
          <label>
            <input
              type="radio"
              name="neutered"
              value="예"
              checked={formData.neutered === "예"}
              onChange={handleChange}
              required
            />{" "}
            예
          </label>
          <label>
            <input
              type="radio"
              name="neutered"
              value="아니오"
              checked={formData.neutered === "아니오"}
              onChange={handleChange}
              required
            />{" "}
            아니오
          </label>
        </div>
        <button type="submit">등록하기</button>
      </form>
    </div>
  );
}
