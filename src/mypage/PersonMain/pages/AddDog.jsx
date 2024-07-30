import React, { useState, useRef } from "react";
import axios from "axios";
import styled from "styled-components";

// 환경 변수에서 API URL 가져오기
const apiUrl = process.env.REACT_APP_API_URL;

const Page = styled.div`
  padding: 20px;
`;

const InputWrap = styled.div`
  margin-bottom: 20px;
`;

const Button = styled.button`
  background-color: #4caf50; /* Green */
  color: white;
  border: none;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 4px;
`;

const FileInputWrap = styled.div`
  margin-bottom: 20px;
  display: flex;
  flex-direction: column; /* 수직 정렬 */
  align-items: center;
`;

const FileInput = styled.input`
  display: none; /* 파일 입력을 숨김 */
`;

const ImagePreview = styled.img`
  width: 200px; /* 일정한 너비 */
  height: 200px; /* 일정한 높이 */
  margin-bottom: 10px;
  border: 1px solid #ccc; /* 이미지에 테두리 추가 */
  border-radius: 50%; /* 동그랗게 만들기 */
  object-fit: cover; /* 이미지가 동그랗게 잘리도록 조정 */
`;

export default function AddDog() {
  const [formData, setFormData] = useState({
    name: "",
    birthdate: "",
    weight: "",
    breed: "",
    gender: "",
    neutered: "",
    profilePicture: null, // 프로필 사진 상태 추가
  });

  const [imagePreview, setImagePreview] = useState(null); // 이미지 미리보기 상태 추가
  const fileInputRef = useRef(null); // 파일 입력 참조를 위한 ref

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      const file = files[0];
      setFormData({
        ...formData,
        [name]: file, // 파일 입력 처리
      });
      // 파일 URL 생성하여 미리보기 상태 업데이트
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      if (file) {
        reader.readAsDataURL(file);
      }
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
      const formDataToSubmit = new FormData();
      Object.keys(formData).forEach((key) => {
        formDataToSubmit.append(key, formData[key]);
      });

      try {
        const response = await axios.post(`${apiUrl}/pets`, formDataToSubmit, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
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

  const triggerFileInput = () => {
    fileInputRef.current.click(); // 파일 입력 클릭 트리거
  };

  return (
    <Page>
      <form onSubmit={handleSubmit}>
        <FileInputWrap>
          {imagePreview && (
            <ImagePreview src={imagePreview} alt="Profile Preview" />
          )}
          <Button type="button" onClick={triggerFileInput}>
            사진 추가
          </Button>
          <FileInput
            type="file"
            name="profilePicture"
            ref={fileInputRef}
            onChange={handleChange}
            accept="image/*"
          />
        </FileInputWrap>

        <InputWrap>
          <label>
            이름
            <input
              type="text"
              placeholder="반려견 이름을 입력해 주세요."
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </label>
        </InputWrap>
        <InputWrap>
          <label>
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
          </label>
        </InputWrap>
        <InputWrap>
          <label>
            몸무게
            <input
              type="text"
              placeholder="몸무게를 입력해주세요."
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              required
            />
          </label>
        </InputWrap>
        <InputWrap>
          <label>
            품종
            <select
              name="breed"
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
          </label>
        </InputWrap>
        <InputWrap>
          <label>
            성별
            <div>
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
          </label>
        </InputWrap>
        <InputWrap>
          <label>
            중성화 여부
            <div>
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
          </label>
        </InputWrap>
        <Button type="submit">등록하기</Button>
      </form>
    </Page>
  );
}
