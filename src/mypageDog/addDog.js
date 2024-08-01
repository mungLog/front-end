import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../header/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";
export default function AddDog() {
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = useAuth();

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
      data.append("name", formData.name);
      data.append("breed", formData.breed);
      data.append("age", formData.birthdate);
      data.append("weight", formData.weight);
      data.append("neutered", formData.neutered);
      data.append("gender", formData.gender);

      if (formData.photo) {
        data.append("file", formData.photo);
      }

      try {
        const response = await axios.post("http://localhost:8080/pets", data, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${state.accessToken}`,
          },
        });
        alert("등록에 성공하셨습니다.");
        navigate("/mypage?mode=dog");
      } catch (error) {
        console.error("등록 요청 실패:", error);
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
