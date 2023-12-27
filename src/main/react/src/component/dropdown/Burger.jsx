import { Divide as Hamburger } from "hamburger-react";
import { useState, useEffect } from "react";
import Menu from "./menu";

const Burger = () => {
  const [isOpen, setOpen] = useState(false);
  const customer = "user";
  const handleToggle = () => {
    setOpen(!isOpen); // 현재 isOpen의 반대값으로 설정
  };

  return (
    <>
      <Hamburger
        color="#ed342e"
        size={20}
        toggled={isOpen}
        toggle={handleToggle}
      />
      {<Menu user={customer} open={isOpen} />}
    </>
  );
};

export default Burger;
