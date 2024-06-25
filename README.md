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
- 캘린더 일정
  <img src="file:///Users/hwangseon-yeong/Desktop/%E1%84%8B%E1%85%B5%E1%86%AF%E1%84%8C%E1%85%A5%E1%86%BC2.png" width="350"></img>
  <img src="file:///Users/hwangseon-yeong/Desktop/%E1%84%8B%E1%85%B5%E1%86%AF%E1%84%8C%E1%85%A5%E1%86%BC1.png" width="350"></img>

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
  <img src="file:///Users/hwangseon-yeong/Desktop/wbs%E1%84%86%E1%85%A9%E1%84%83%E1%85%AE.png" width="300"></img>
- 단위 테스트(front)
  <img src="file:///Users/hwangseon-yeong/Desktop/%E1%84%83%E1%85%A1%E1%86%AB%E1%84%8B%E1%85%B1%E1%84%90%E1%85%A6%E1%84%89%E1%85%B3%E1%84%90%E1%85%B3%20-front.png" width="300"></img>
  <img src="file:///Users/hwangseon-yeong/Desktop/%E1%84%83%E1%85%A1%E1%86%AB%E1%84%8B%E1%85%B1%E1%84%90%E1%85%A6%E1%84%89%E1%85%B3%E1%84%90%E1%85%B3%20-%20front2.png" width="300"></img>
- 단위 테스트(back)
  <img src="file:///Users/hwangseon-yeong/Desktop/%E1%84%83%E1%85%A1%E1%86%AB%E1%84%8B%E1%85%B1%E1%84%90%E1%85%A6%E1%84%89%E1%85%B3%E1%84%90%E1%85%B3%20-%20back1.png" width="300"></img>
  <img src="file:///Users/hwangseon-yeong/Desktop/%E1%84%83%E1%85%A1%E1%86%AB%E1%84%8B%E1%85%B1%E1%84%90%E1%85%A6%E1%84%89%E1%85%B3%E1%84%90%E1%85%B3%20-%20back2.png" width="300"></img>
- 단위 테스트(종합)
  <img src="file:///Users/hwangseon-yeong/Desktop/%E1%84%83%E1%85%A1%E1%86%AB%E1%84%8B%E1%85%B1%20%E1%84%90%E1%85%A6%E1%84%89%E1%85%B3%E1%84%90%E1%85%B3%20-%20%E1%84%8C%E1%85%A9%E1%86%BC%E1%84%92%E1%85%A1%E1%86%B8.png" width="300"></img>
  <img src="file:///Users/hwangseon-yeong/Desktop/%E1%84%83%E1%85%A1%E1%86%AB%E1%84%8B%E1%85%B1%20%E1%84%90%E1%85%A6%E1%84%89%E1%85%B3%E1%84%90%E1%85%B3%20-%20%E1%84%8C%E1%85%A9%E1%86%BC%E1%84%92%E1%85%A1%E1%86%B82.png" width="300"></img>

### 📌 작업 리스트
- 스토리보드
  <img src="file:///Users/hwangseon-yeong/Desktop/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202024-06-25%20%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE%203.52.30.png" width="300"></img>
- 애자일 방법론
  <img src="file:///Users/hwangseon-yeong/Desktop/%E1%84%8B%E1%85%A2%E1%84%8C%E1%85%A1%E1%84%8B%E1%85%B5%E1%86%AF%20%E1%84%87%E1%85%A1%E1%86%BC%E1%84%87%E1%85%A5%E1%86%B8%E1%84%85%E1%85%A9%E1%86%AB.png" width="300"></img>
- 회의록
  <img src="file:///Users/hwangseon-yeong/Desktop/%E1%84%92%E1%85%AC%E1%84%8B%E1%85%B4%E1%84%85%E1%85%A9%E1%86%A8.png" width="300"></img>

### 🙋🏻기술 발표
🔗노션 | https://www.notion.so/d3a139f942494498b6ac4f39a3059599