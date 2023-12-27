import { createContext, useEffect, useState } from "react";

export const UserContext = createContext("");

const UserStore = (props) => {
  const [nickname, setNickname] = useState(
    localStorage.getItem("nickname") || "닉네임을 입력하세요."
  );

  useEffect(() => {
    localStorage.setItem("nickname 닉네임 바꿀 때 : ", nickname);
  }, [nickname]);
  console.log(
    "user nickname in userStore : ",
    localStorage.setItem("nickname")
  );

  // 관리자 페이지에 사용하는 이름
  const [name, setName] = useState(
    localStorage.getItem("name") || "이름을 입력해주세요."
  );

  useEffect(() => {
    localStorage.setItem("name", name);
  }, [name]);

  return (
    <UserContext.Provider
      value={{
        nickname,
        setNickname,
        name,
        setName,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserStore;
