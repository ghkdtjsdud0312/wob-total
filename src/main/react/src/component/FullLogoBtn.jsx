import React from "react";
import styled from "styled-components";

const Container = styled.div`
  margin: 0 auto;
`;

const LogoImages = styled.img`
  width: 300px;
  height: 300px;
`;

const FullLogoBth = () => {
  return (
    <Container>
      <LogoImages
        src="https://firebasestorage.googleapis.com/v0/b/mini-project-1f72d.appspot.com/o/8.png?alt=media&token=1e2813e1-5faf-4090-a86f-5854e8262ae8"
        alt="logo2"
      />
    </Container>
  );
};

export default FullLogoBth;
