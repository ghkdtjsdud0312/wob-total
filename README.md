<img src="https://firebasestorage.googleapis.com/v0/b/kh-miniproject.appspot.com/o/wob-logo.png?alt=media&token=53d56dac-cf54-4fdf-9842-a5d367a8e67d" width="300"></img>

# WOB(WorkOut Buddy)
🔗사이트로 이동 | https://workoutbuddys.store/signin
🔗프로젝트 상세 정보 - 노션 참고! |
https://www.notion.so/WOB-WorkOut-Buddy-9293ded1d23f4528b01df10358bee2d5
🔗발표 PPT PDF | 

## 🔍 프로젝트 소개
🏋🏻‍내 주변 운동 메이트 구하기 🏋🏻
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

#### 작업 진행 현황 
- 캘린더 일정1
  - <img src="https://github.com/ghkdtjsdud0312/wob-total/assets/142463073/f84cb984-31e0-459d-b98d-93470cef9da7" width="300" alt="일정2" >
  - <img src="https://github.com/ghkdtjsdud0312/wob-total/assets/142463073/13a1a345-ff4a-4cba-96ae-66d09f0b179e" width="300" alt="일정1" >

### 👨‍👩‍👧‍👦 역할 분담 및 나의 역할
- **황선영(팀원)** : 지도API(현재 위치 가져오기, 키워드 검색, 종목 내용 및 마커), 관리자 페이지(회원,결제,채팅,광고(등록),문의 CRUD 관리)

- 송우희(조장) : 메인 페이지, Header 생성, 일반과 레슨 게시글(일정 등록, 목록, 상세), 광고 등록 페이지(광고 등록 신청)
- 김현수(팀원) : 설정 페이지, 채팅, 결제 시스템
- 허한비(팀원) : 내 일정, 내가 쓴 글, 내 정보 수정, footer
- 황준호(팀원) : 로그인(일반 로그인, 제3자 로그인), 회원가입, 보안(jwt), 게시글 검색 기능

### ⚙️ 사용 기술 및 환경
- 사용 언어 : HTML, CSS(SCSS), JavaScript(JSX) / Java / Python
- 프론트엔드 라이브러리 : React
- 백엔드 프레임워크 : Spring Boot - JPA / Flask
- RDBMS : MySQL
- 클라우드 스토리지 : Firebase Storage
- IDE : IntelliJ, VScode, MySQL WorkBench, DBeaver, Pycharm
- 협업 도구 : GitHub, Notion, Figma, Google Spreadsheet
- MockUp Tool : Figma
- 형상 관리 : Git, GitHub
- 테스트 : Postman, swagger IU

### 🙋🏻‍개인 담당 역할
- 내용
- 사진

### 📌 문서 작업
- wbs
  - <img src="https://github.com/ghkdtjsdud0312/wob-total/assets/142463073/9f135e6c-fd04-4b0b-8c10-5ac30aac503a" width="300" alt="wbs" >

- 단위 테스트(front)
  - <img src="https://github.com/ghkdtjsdud0312/wob-total/assets/142463073/6dabf9ab-e8fe-4d1e-b37e-d8441cba3d1e" width="300" alt="단위테스트 -front" >
  - <img src="https://github.com/ghkdtjsdud0312/wob-total/assets/142463073/115574b6-5c19-4ee7-91b3-a7317e7f536c" width="300" alt="단위테스트 - front2" >
- 단위 테스트(back)
  - <img src="https://github.com/ghkdtjsdud0312/wob-total/assets/142463073/f4e3aa1f-673b-4908-b6e3-92922338fb43" width="300" alt="단위테스트 - back1">
  - <img src="https://github.com/ghkdtjsdud0312/wob-total/assets/142463073/1144ffc3-2850-4484-93df-28089b496bbb" width="300" alt="단위테스트 - back2" >
- 단위 테스트(종합)
  - <img src="https://github.com/ghkdtjsdud0312/wob-total/assets/142463073/6e39c82d-5766-44c4-963f-1cf5832e1801" width="300" alt="단위 테스트 - 종합" >
  - <img src="https://github.com/ghkdtjsdud0312/wob-total/assets/142463073/ee25a150-1be7-40c8-8f74-be61e2e21dbc" width="300" alt="단위 테스트 - 종합2" >

### 📌 작업 리스트
- 스토리보드
  - <img src="https://github.com/ghkdtjsdud0312/wob-total/assets/142463073/909e1565-03bb-4ce9-a6e8-b79ec614b437" width="300" alt="스토리보드">
- 애자일 방법론
  - <img src="https://github.com/ghkdtjsdud0312/wob-total/assets/142463073/f5e2111e-26a5-4429-89c0-ab134e0ae0b8" width="300" alt="애자일 방법론">
- 회의록
  - <img src="https://github.com/ghkdtjsdud0312/wob-total/assets/142463073/2be8fa2e-1388-41a8-b4a4-62ccec8591d3" width="300" alt="회의록">

### 🙋🏻기술 발표
🔗노션 | https://www.notion.so/d3a139f942494498b6ac4f39a3059599