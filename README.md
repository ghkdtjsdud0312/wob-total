<img src="https://firebasestorage.googleapis.com/v0/b/kh-miniproject.appspot.com/o/wob-logo.png?alt=media&token=53d56dac-cf54-4fdf-9842-a5d367a8e67d" width="300"></img>

# WOB(WorkOut Buddy)
🔗 **WOB 사이트** 

https://workoutbuddys.store/signin <br>

🔗 **발표 PPT**

[WOB발표자료.pdf](https://github.com/user-attachments/files/15969808/WOB.pdf)

🔗 **WOB 전체 이미지**

[WOB 전체이미지.pdf](https://github.com/user-attachments/files/15969844/WOB.pdf)


## 🔍 프로젝트 소개
**🏋🏻‍내 주변 운동 메이트 구하기 🏋🏻**<br>
→ 운동 친구가 필요할 때 집 근처나 현재 위치 주변에 같이 운동할 수 있는 사람들끼리 모여서 운동 할 수 있는 앱 형식의 웹 사이트

### ⏰ 개발 기간
2023.12.06 ~ 2024.01.03(1개월)

### 📌 프로젝트에 포함 될 주요 기능
- 주제 선정, 화면 구성(Figma)부터 프론트엔드, 백엔드, DataBase 설계, AWS 배포까지 전반적인 구현 경험
- CRUD 구현 및 다양한 API 활용
- React, Java, SpringBoot, MySQL, jwt, 웹소켓, Python을 이용한 여러 기술 익히기
- 문서 작업(wbs 및 단위 테스트 진행)
    - WBS 방식의 일정 작성
    - 스토리 보드 작성
    - 기획 문서(일정, 팀원 역할, 설계 문서(ERD), 주제 선정)
- 필수 기능 
    - 인증 및 인가(JWT)
    - 약관 동의
    - 반응형 웹
    - 외부 데이터 연동(지도 API, 캘린더 API)
    - 파이썬 플라스크 활용(날씨 API)
    - 이메일 인증
    - 결제 시스템
    - 제3자 인증 방식
    - 페이지네이션
    - 웹소켓을 활용한 채팅 기능
- 배포 
  - AWS 클라우드 서비스 배포
  - 도메인 계정 등록(가비아)

### 작업 진행 현황 
- **캘린더 일정**


  <img src="https://github.com/ghkdtjsdud0312/wob-total/assets/142463073/f84cb984-31e0-459d-b98d-93470cef9da7" width="600" alt="일정2" >
  <img src="https://github.com/ghkdtjsdud0312/wob-total/assets/142463073/13a1a345-ff4a-4cba-96ae-66d09f0b179e" width="600" alt="일정1" >

### 👨‍👩‍👧‍👦 역할 분담 및 나의 역할
| 팀원 | 역할 |
| --- | --- |
| **황선영(팀원)** | 지도API(현재 위치 가져오기, 키워드 검색, 종목 내용 및 마커)<br>관리자 페이지(회원, 결제, 채팅, 광고(등록), 문의 CRUD 관리) |
| 송우희(조장)| 메인 페이지, Header 생성<br>일반과 레슨 게시글(일정 등록, 목록, 상세)<br>광고 등록 페이지(광고 등록 신청) |
| 김현수(팀원) | 설정 페이지, 채팅, 결제 시스템 |
| 허한비(팀원) | 내 일정, 내가 쓴 글, 내 정보 수정, footer |
| 황준호(팀원) | 로그인(일반 로그인, 제3자 로그인)<br>회원가입, 보안(jwt), 게시글 검색 기능 |

### 🙋‍‍👧‍👦‍전체 구현 내용
| 구현 페이지 | 상세 페이지 소개 |
| --- | --- |
| 메인화면 | 모든 레져, 모든 지역 - 원하는 곳 3개까지 선택가능<br>날씨API와 현재 위치정보API 사용으로 실시간으로 나옴<br>캘린더<br>날짜별 운동 일정<br>목록일정 등록하기<br>전체 일정 목록보기 |
| 로그인 및 회원가입 | 회원로그인<br>관리자 로그인<br>카카오 로그인<br>회원가입(+운동 종목,지역 등록, 이메일 인증)<br>비밀번호 찾기 |
| 채팅기능 | 오픈채팅방<br>상세 운동 및 클래스 참여 시 채팅 |
| 결제기능 | 클래스 일정 결제 |
| 마이페이지(수정) | 프로필<br>닉네임<br>소개글<br>관심지역<br>관심운동<br>MBTI 선택 |
| 스케줄러 | 내가 선택한 운동등록 목록보기 |
| 관리자페이지 | (전체 : 수정,삭제, 활성화/비활성화 버튼,페이지네이션,햄버거 사이드바)<br>전체 회원관리 목록<br>전체 광고관리 목록<br>전체 종목관리 목록 및 등록<br>1:1 관리자 문의하기 목록<br>결제관리 목록 |
| 운동등록 | 일정 등록<br>클래스 등록 |
| 지도 API | 현재위치<br>검색 및 검색 내용 마커표시<br>마커 상세정보 |
| 검색기능 | 운동 목록 관련 검색 |
| 환경설정 | 계정관리<br>내가 작성한 글<br>자주 묻는 질문<br>FAQ<br>결제 내역<br>정책 및 약관 |
| jwt 보안 | 페이지 보안설정 |

### ⚙️ 사용 기술 스택 및 환경
| 분류 | 기술 |
| --- | --- |
| 사용 언어 | HTML, CSS(SCSS), JavaScript(JSX) / Java / Python |
| 프론트엔드 라이브러리 | React |
| 백엔드 프레임워크 | Spring Boot - JPA / Flask |
| RDBMS | MySQL |
| 클라우드 스토리지 | Firebase Storage |
| IDE | IntelliJ, VScode, MySQL WorkBench, DBeaver, Pycharm |
| 협업 도구 | GitHub, Notion, Figma, Google Spreadsheet |
| MockUp Tool | Figma |
| 형상 관리 | Git, GitHub |
| 테스트 | Postman, swagger IU |


### 🙋🏻‍개인 담당 역할
- 내용
- 사진

### 📌 문서 작업
- **wbs**


  <img src="https://github.com/ghkdtjsdud0312/wob-total/assets/142463073/9f135e6c-fd04-4b0b-8c10-5ac30aac503a" width="800" alt="wbs" >

- **단위 테스트(front)**


  <img src="https://github.com/ghkdtjsdud0312/wob-total/assets/142463073/6dabf9ab-e8fe-4d1e-b37e-d8441cba3d1e" width="800" alt="단위테스트 -front" >
  <img src="https://github.com/ghkdtjsdud0312/wob-total/assets/142463073/115574b6-5c19-4ee7-91b3-a7317e7f536c" width="800" alt="단위테스트 - front2" >

- **단위 테스트(back)**


  <img src="https://github.com/ghkdtjsdud0312/wob-total/assets/142463073/f4e3aa1f-673b-4908-b6e3-92922338fb43" width="800" alt="단위테스트 - back1">
  <img src="https://github.com/ghkdtjsdud0312/wob-total/assets/142463073/1144ffc3-2850-4484-93df-28089b496bbb" width="800" alt="단위테스트 - back2" >

- **단위 테스트(종합)**


  <img src="https://github.com/ghkdtjsdud0312/wob-total/assets/142463073/6e39c82d-5766-44c4-963f-1cf5832e1801" width="800" alt="단위 테스트 - 종합" >
  <img src="https://github.com/ghkdtjsdud0312/wob-total/assets/142463073/ee25a150-1be7-40c8-8f74-be61e2e21dbc" width="800" alt="단위 테스트 - 종합2" >

### 📌 작업 리스트
- **스토리보드**


  <img src="https://github.com/ghkdtjsdud0312/wob-total/assets/142463073/909e1565-03bb-4ce9-a6e8-b79ec614b437" width="800" alt="스토리보드">

  
- **애자일 방법론**


  <img src="https://github.com/ghkdtjsdud0312/wob-total/assets/142463073/f5e2111e-26a5-4429-89c0-ab134e0ae0b8" width="800" alt="애자일 방법론">

  
- **회의록**


  <img src="https://github.com/ghkdtjsdud0312/wob-total/assets/142463073/2be8fa2e-1388-41a8-b4a4-62ccec8591d3" width="800" alt="회의록">

### 🙋🏻기술 발표
🔗**노션**  https://www.notion.so/d3a139f942494498b6ac4f39a3059599