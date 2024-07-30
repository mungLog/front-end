import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AddDog() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    birthdate: "",
    weight: "",
    breed: "",
    gender: "",
    neutered: "",
    photo: null, // 추가된 부분
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "photo") {
      setFormData({
        ...formData,
        photo: files[0], // 파일 처리
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const data = new FormData();
      data.append(
        "pet",
        new Blob(
          [
            JSON.stringify({
              name: formData.name,
              userId: 1, // 예시로 1 사용
              familyId: 1, // 예시로 1 사용
              breed: formData.breed,
              age: parseInt(formData.birthdate),
              weight: parseFloat(formData.weight),
              neutered: parseInt(formData.neutered),
              gender: parseInt(formData.gender),
              dailyKcal: 0, // 예시로 0 사용
              date: new Date().toISOString().split("T")[0], // 현재 날짜를 'yyyy-MM-dd' 형식으로
              timestamp: new Date().toISOString(),
            }),
          ],
          { type: "application/json" }
        )
      );
      if (formData.photo) {
        data.append("file", formData.photo);
      }

      try {
        const response = await axios.post("http://localhost:8080/pets", data);
        if (response.status === 200) {
          navigate(`/`);
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
              value="1"
              checked={formData.gender === "1"}
              onChange={handleChange}
              required
            />{" "}
            남아
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="0"
              checked={formData.gender === "0"}
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
              value="1"
              checked={formData.neutered === "1"}
              onChange={handleChange}
              required
            />{" "}
            예
          </label>
          <label>
            <input
              type="radio"
              name="neutered"
              value="0"
              checked={formData.neutered === "0"}
              onChange={handleChange}
              required
            />{" "}
            아니오
          </label>
        </div>
        <div className="InputWrap">
          사진
          <input type="file" name="photo" onChange={handleChange} />
        </div>
        <button type="submit">등록하기</button>
      </form>
    </div>
  );
}
