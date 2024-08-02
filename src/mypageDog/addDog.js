import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../header/AuthContext";
import { useNavigate } from "react-router-dom";
import * as S from "./addDog.Style";
import icon from "./img/icon.png";
import dog from "./img/dog.png"; // 기본 이미지 임포트

const AddDog = () => {
  const navigate = useNavigate();
  const { state } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    birthdate: "",
    weight: "",
    breed: "",
    gender: "",
    neutered: "",
    photo: null,
  });

  // 파일 입력 필드를 참조하기 위한 ref
  const fileInputRef = React.createRef();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "photo") {
      setFormData({
        ...formData,
        photo: files[0],
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleFileButtonClick = () => {
    // 파일 입력 필드를 클릭하여 파일 선택 대화상자를 열기
    fileInputRef.current.click();
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
    <S.Page>
      <S.Title>반려동물 추가하기</S.Title>

      <S.InputWrapPic>
        <input
          type="file"
          name="photo"
          onChange={handleChange}
          ref={fileInputRef}
          style={{ display: "none" }} // 파일 입력 필드를 숨깁니다.
        />

        <S.ImagePreview
          src={formData.photo ? URL.createObjectURL(formData.photo) : dog} // 기본 이미지 사용
          alt="미리보기"
          style={{ width: "114px", height: "114px" }}
        />

        <S.Button2 onClick={handleFileButtonClick}>
          <img src={icon} alt="아이콘" />
          추가하기
        </S.Button2>
      </S.InputWrapPic>

      <S.ContentWrap onSubmit={handleSubmit}>
        <S.BoxForm>
          <S.InputWrap>이름</S.InputWrap>
          <S.BoxBig>
            <S.Input
              type="text"
              placeholder="반려견 이름을 입력해 주세요."
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </S.BoxBig>
        </S.BoxForm>

        <S.BoxForm>
          <S.InputWrap>생년월일</S.InputWrap>
          <S.Box>
            <S.Input
              type="text"
              placeholder="8자리를 입력해 주세요."
              name="birthdate"
              value={formData.birthdate}
              onChange={handleChange}
              required
              pattern="\d{8}"
              title="생년월일은 숫자 8자리로 입력해주세요."
            />
          </S.Box>
        </S.BoxForm>

        <S.BoxForm>
          <S.InputWrap>몸무게</S.InputWrap>
          <S.Box>
            <S.Input
              type="text"
              placeholder="몸무게를 입력해주세요."
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              required
            />
          </S.Box>
        </S.BoxForm>

        <S.BoxForm>
          <S.InputWrap>품종</S.InputWrap>
          <S.Box>
            <S.Select
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
            </S.Select>
          </S.Box>
        </S.BoxForm>

        <S.BoxForm>
          <S.InputWrap>성별</S.InputWrap>
          <S.Box2>
            <S.RadioLabel>
              <S.RadioInput
                type="radio"
                name="gender"
                value="1"
                checked={formData.gender === "1"}
                onChange={handleChange}
                required
              />
              남아 <S.male>♂</S.male>
            </S.RadioLabel>
            <S.RadioLabel>
              <S.RadioInput
                type="radio"
                name="gender"
                value="0"
                checked={formData.gender === "0"}
                onChange={handleChange}
                required
              />
              여아 <S.female>♀</S.female>
            </S.RadioLabel>
          </S.Box2>
        </S.BoxForm>

        <S.BoxForm>
          <S.InputWrap>중성화 여부</S.InputWrap>
          <S.Box2>
            <S.RadioLabel>
              <S.RadioInput
                type="radio"
                name="neutered"
                value="1"
                checked={formData.neutered === "1"}
                onChange={handleChange}
                required
              />
              예
            </S.RadioLabel>
            <S.RadioLabel>
              <S.RadioInput
                type="radio"
                name="neutered"
                value="0"
                checked={formData.neutered === "0"}
                onChange={handleChange}
                required
              />
              아니오
            </S.RadioLabel>
          </S.Box2>
        </S.BoxForm>
      </S.ContentWrap>
      <S.Button onClick={handleSubmit}>등록하기</S.Button>
    </S.Page>
  );
};

export default AddDog;
