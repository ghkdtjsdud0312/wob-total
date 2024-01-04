// 관리자 게시판 등록
import React from "react";
import styled from "styled-components";
import FullLogoBth from "../../component/admin/FullLogoBtn";
import { useState } from "react";
import AdminAxiosApi from "../../api/AdminAxiosApi";
import { storage } from "../../api/firebase";
import Layout from "../../component/admin/Layout";
import { useNavigate } from "react-router-dom";

// 전체 감싸는 css
const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding-top: 100px;

  // 상단바 로고와 페이지 이름
  .Logo {
    cursor: pointer;
  }
  @media screen and (max-width: 430px) {
    padding-top: 50px;
  }
`;

// 게시물 등록 제목
const Title = styled.div`
  text-align: center;
  font-size: 45px;
  padding-bottom: 50px;
  @media screen and (max-width: 430px) {
    font-size: 27px;
    padding-bottom: 30px;
  }
`;

// 게시물 등록 전체 감싸는 칸
const FormContainer = styled.div`
  height: 700px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  @media screen and (max-width: 430px) {
    border: 1px solid #ddd;
    width: 100%;
    height: 550px;
  }
`;

// 종목 감싸는 란
const FieldContainer = styled.div`
  align-items: center; // 수직 방향 중앙 정렬
  margin: 50px; // 여백 추가
  @media screen and (max-width: 430px) {
    margin: 30px 20px;
    white-space: nowrap;
  }
`;

// 제목(종목)
const StyledLabel = styled.label`
  text-align: center;
  font-weight: bold;
  font-size: 20px;
`;
// 제목 (사진,로고)
const StyledLabel2 = styled.label`
  text-align: center;
  margin: 50px 50px;
  font-weight: bold;
  font-size: 20px;
  @media screen and (max-width: 430px) {
    white-space: nowrap;
    margin: 30px 20px;
  }
`;

// 종목 칸
const StyledInput = styled.input`
  border: 1px solid #ddd;
  width: 80%;
  padding: 10px;
  border-radius: 4px;
  font-size: 16px;
  margin-left: 45px;
  @media screen and (max-width: 430px) {
    width: 80%;
    margin-left: 20px;
  }
`;
// 사진, 로고 파일선택 칸
const StyledInput2 = styled.input`
  font-size: 16px;
  color: #353535;
`;

// 사진파일, 로고파일 올리는 컨테이너
const FileUploadContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  color: #353535;
`;

// 밑에 사진 업로드 파일 뜨는 것
const UserImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 5px;
  margin: 0 140px;
`;

// 사진 업로드 버튼
const UploadButton = styled.button`
  background-color: #dfede9;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  color: #353535;
  @media screen and (max-width: 430px) {
    margin-left: -85px;
  }

  &:hover {
    background-color: #04bf8a;
  }
`;

// 글쓰기, 취소버튼 감싸는 칸
const ButtonContainer = styled.div`
  display: flex;
  justify-content: center; // 버튼을 중앙에 위치시킴
  margin-top: 20px; // 버튼 상단에 여백 추가
  gap: 10px; // 버튼 사이에 여백 추가
`;

// 각각 글쓰기, 취소 버튼
const SubmitButton = styled.button`
  padding: 10px 15px;
  background-color: #dfede9;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  color: #353535;

  &:hover {
    background-color: #04bf8a;
  }
`;

const AdminBoardRegistration = () => {
  const [name, setName] = useState(""); // 종목
  const [img, setImg] = useState(""); // 사진이미지
  const [logo, setLogo] = useState(""); // 로고
  const [file, setFile] = useState(null); // 파일1(사진이미지)
  const [file2, setFile2] = useState(null); // 파일2(로고이미지)
  const navigate = useNavigate();

  // 목록으로 돌아가기
  const handleBack = (path) => {
    navigate(path);
  };
  // 종목명 name에 저장
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  // 등록하기 버튼 클릭 시 성공여부
  const handleSubmit = async () => {
    console.log(name, img, logo);
    try {
      const rsp = await AdminAxiosApi.categorySave(
        name, // 종목
        img, // 운동 사진
        logo // 로고 사진
      );
      if (rsp.data === true) {
        alert("카테고리 등록 성공");
        navigate("/AllBoardContent");
      } else {
        alert("카테고리 등록 실패");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // 취소 버튼 누르면 목록으로 감
  const handleReset = () => {
    navigate("/AllBoardContent");
  };

  // img 파일 선택
  const handleFileInputChange = (e) => {
    setFile(e.target.files[0]);
  };
  // logo 파일 선택
  const handleFileInputChange2 = (e) => {
    setFile2(e.target.files[0]);
  };

  // img 업로드
  const handleUploadClick = async () => {
    try {
      const storageRef = storage.ref();
      const fileRef = storageRef.child(file.name);

      // 파일을 업로드하고 기다림
      await fileRef.put(file);
      console.log("File uploaded successfully!");

      // 다운로드 URL을 가져오고 기다림
      const url = await fileRef.getDownloadURL();
      console.log("img 저장경로 확인 : " + url);

      // 상태 업데이트
      setImg(url);
    } catch (error) {
      // 에러 처리
      console.error("Upload failed", error);
    }
  };

  // logo 업로드
  const handleUploadClick2 = async () => {
    try {
      const storageRef = storage.ref();
      const fileRef = storageRef.child(file2.name);

      // 파일을 업로드하고 기다립니다.
      await fileRef.put(file2);
      console.log("File uploaded successfully!");

      // 다운로드 URL을 가져오고 기다립니다.
      const url2 = await fileRef.getDownloadURL();
      console.log("logo 저장경로 확인 : " + url2);

      // 상태를 업데이트합니다.
      setLogo(url2);
    } catch (error) {
      // 에러를 처리합니다.
      console.error("Upload failed", error);
    }
  };

  return (
    <Container>
      <div className="Logo" onClick={() => handleBack("/AdminMain")}>
        <FullLogoBth />
      </div>
      {/* 게시물 등록 */}
      <Title>카테고리 등록</Title>
      {/* 게시물 등록 내용 감쌈 */}
      <FormContainer>
        {/* 종목 쓰는 란 */}
        <FieldContainer>
          <StyledLabel htmlFor="title">종목</StyledLabel>
          <StyledInput
            type="text"
            id="title"
            name="title"
            value={name}
            onChange={handleNameChange}
          />
        </FieldContainer>

        {/* 운동 사진 업로드란 */}
        <FileUploadContainer>
          <StyledLabel2 htmlFor="title">사진</StyledLabel2>
          <StyledInput2 type="file" onChange={handleFileInputChange} />
          <UploadButton onClick={handleUploadClick}>Upload</UploadButton>
        </FileUploadContainer>
        {/* 파일 업로드해서 파이어베이스에 올라감 */}
        {img && <UserImage src={img} alt="uploaded" />}

        {/* 로고 사진 업로드란 */}
        <FileUploadContainer>
          <StyledLabel2 htmlFor="title">로고</StyledLabel2>
          <StyledInput2 type="file" onChange={handleFileInputChange2} />
          <UploadButton onClick={handleUploadClick2}>Upload</UploadButton>
        </FileUploadContainer>
        {/* 파일 업로드해서 파이어베이스에 올라감 */}
        {logo && <UserImage src={logo} alt="uploaded" />}

        {/* 글쓴거 업로드, 취소 버튼 */}
        <ButtonContainer>
          <SubmitButton onClick={handleSubmit}>글쓰기</SubmitButton>
          <SubmitButton onClick={handleReset}>취소</SubmitButton>
        </ButtonContainer>
      </FormContainer>
      {/* 햄버거 토글 사이드바 */}
      <Layout />
    </Container>
  );
};

export default AdminBoardRegistration;
