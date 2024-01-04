import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Common from "./utils/Common";
import Schedule from "./page/schedule/Schedule";
import MyPost from "./page/schedule/MyPost";
import JoinPost from "./page/schedule/JoinPost";
import CalendarComp from "./component/CalendarComp";
import GlobalStyle from "./globalStyle";
import Main from "./page/Main";
import Layout from "./layout/Layout";
import MyPageEdit from "./page/MyPageEdit";
import KakaoMaps from "./page/map/Maps";
import PostSubmit from "./page/PostSubmit";
import AdminMain from "./page/admin/AdminMain";
import Advertising from "./page/admin/Advertising";
import AllBoardContent from "./page/admin/AllBoardContent";
import AllMemberInfo from "./page/admin/AllMemberInfo";
import TestLoginPage from "./page/Login";
import AdminBoardRegistration from "./page/admin/AdminBoardRegistration";
import AllPaymentList from "./page/admin/AllPaymentList";
import InterestEnter from "./page/login/interestEnter";
import PostList from "./page/PostList";
import PostPreview from "./component/PostPreview";
import Setting from "./page/Setting/Setting";
import SettingLayout from "./layout/SettingLayout";
import Account from "./page/Setting/Account";
import PaymentDatails from "./page/Setting/PaymentDetails";
import Policy from "./page/Setting/Policy";
import Questions from "./page/Setting/Questions";
import PasswordChange from "./page/Setting/PasswordChange";
import Withdrawal from "./page/Setting/Withdrawal";
import SignIn from "./page/login/SignIn";
import SignUp from "./page/login/SignUp";
import Address from "./component/Address";
import Chatting from "./page/Chatting/Chatting";
import CompletePayment from "./page/Payment/CompletePayment";
import Payment from "./component/Payment";
import PostDetail from "./page/PostDetail";
import FreeChat from "./page/Chatting/FreeChat";
import ChatCreate from "./page/Chatting/ChatCreate";
import Condition from "./page/login/Condition";
import ForgotPassword from "./page/login/ForgotPassword";
import AdSubmit from "./page/AdSubmit";
import Loading from "./component/Loading";
import AllChatContent from "./page/admin/AllChatContent";
import SearchMain from "./page/SearchMain";

function App() {
  return (
    <>
      <GlobalStyle />
      <Router>
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgot-pw" element={<ForgotPassword />} />
          <Route path="/interestenter" element={<InterestEnter />} />
          <Route path="/condition" element={<Condition />} />
          <Route path="/login" element={<TestLoginPage />} />
          <Route path="/searchmain" element={<SearchMain />} />
          <Route element={<Layout />}>
            <Route path="/" element={<Main />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/postlist" element={<PostList />} />
            <Route path="/postdetail/:postId" element={<PostDetail />} />
            <Route path="/MyPost" element={<MyPost />} />
            <Route path="/JoinPost" element={<JoinPost />} />
            <Route path="/postpreview" element={<PostPreview />} />
            <Route path="/adsubmit/:postId" element={<AdSubmit />} />
            {/* 선영 지도 */}
            <Route path="/KakaoMap" element={<KakaoMaps />} />
          </Route>
          <Route path="/MyPage" element={<MyPageEdit />} />
          <Route path="/postsubmit" element={<PostSubmit />} />
          {/* 환경설정 */}
          <Route element={<SettingLayout />}>
            <Route path="/Setting" element={<Setting />} />
            <Route path="/Account" element={<Account />} />
            <Route path="/PaymentDetails" element={<PaymentDatails />} />
            <Route path="/Policy" element={<Policy />} />
            <Route path="/Questions" element={<Questions />} />
            <Route path="/PasswordChange" element={<PasswordChange />} />
            <Route path="/Withdrawal" element={<Withdrawal />} />
            <Route path="/FreeChat" element={<FreeChat />} />
            <Route path="/ChatCreate" element={<ChatCreate />} />

            {/* 주소Api */}
            <Route path="/Address" element={<Address />} />
          </Route>
          <Route path="/Chatting/:roomId" element={<Chatting />} />
          <Route>
            {/* 선영 관리자페이지 */}
            {/* 관리자 메인 메뉴 페이지 */}
            <Route path="/AdminMain" element={<AdminMain />} />
            {/* 광고 관리 */}
            <Route path="/Advertising" element={<Advertising />} />
            {/* 전체 게시글 관리 */}
            <Route path="/AllBoardContent" element={<AllBoardContent />} />
            <Route
              path="/AdminBoardRegistration"
              element={<AdminBoardRegistration />}
            />
            {/* 전체 회원 관리 */}
            <Route path="/AllMemberInfo" element={<AllMemberInfo />} />

            {/* 전체 결제 내역 관리 */}
            <Route path="/AllPaymentList" element={<AllPaymentList />} />
          </Route>
          {/* 전체 채팅 내역 관리 */}
          <Route path="/AllChatContent" element={<AllChatContent />} />

          <Route
            path="/CompletePayment/:paymentId"
            element={<CompletePayment />}
          />
          <Route path="/Payment" element={<Payment />} />

          <Route path="/Loading" element={<Loading />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
