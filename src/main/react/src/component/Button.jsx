import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  white-space: nowrap;
  background-color: ${({ backgroundcolor }) =>
          backgroundcolor || "var(--MINT)"};
  min-width: ${({ size }) =>
          typeof size === "number"
                  ? `${size}px`
                  : size === "small"
                          ? "70px"
                          : size === "normal"
                                  ? "100px"
                                  : size === "large"
                                          ? "130px"
                                          : size === "extra-small"
                                                  ? "50px"
                                                  : size === "category"
                                                          ? "130px"
                                                          : "100px"}; /* 최소 크기 지정 */
  min-height: ${({ size }) =>
          typeof size === "number"
                  ? `${size}px`
                  : size === "small"
                          ? "30px"
                          : size === "normal"
                                  ? "50px"
                                  : size === "large"
                                          ? "80px"
                                          : size === "extra-small"
                                                  ? "20px"
                                                  : size === "category"
                                                          ? "50px"
                                                          : "40px"}; /* 최소 크기 지정 */
  font-size: ${({ size }) =>
          typeof size === "number"
                  ? `${size / 2}px`
                  : size === "small"
                          ? "12px"
                          : size === "normal"
                                  ? "16px"
                                  : size === "large"
                                          ? "20px"
                                          : size === "extra-small"
                                                  ? "10px"
                                                  : size === "category"
                                                          ? "19px"
                                                          : "16px"}; /* 폰트 크기 지정 */
  border-radius: 25px;
  border-color: ${({ color }) => color || "var(--MINT)"};
  color: ${({ color }) => color || "var(--BLACK)"};
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  border: 0;
  outline: 0;
  margin-right: ${({ margin }) =>
          margin === "category1" ? "60px" : margin === "category2" ? "70px" : "0"};

  @media only screen and (max-width: 768px) {
    min-width: ${({ size }) =>
            typeof size === "number"
                    ? `${size}px`
                    : size === "small"
                            ? "70px"
                            : size === "normal"
                                    ? "100px"
                                    : size === "large"
                                            ? "130px"
                                            : size === "extra-small"
                                                    ? "50px"
                                                    : size === "category"
                                                            ? "88px"
                                                            : "100px"}; /* 최소 크기 지정 */
    min-height: ${({ size }) =>
            typeof size === "number"
                    ? `${size}px`
                    : size === "small"
                            ? "30px"
                            : size === "normal"
                                    ? "50px"
                                    : size === "large"
                                            ? "80px"
                                            : size === "extra-small"
                                                    ? "20px"
                                                    : size === "category"
                                                            ? "40px"
                                                            : "40px"}; /* 최소 크기 지정 */
    font-size: ${({ size }) =>
            typeof size === "number"
                    ? `${size / 2}px`
                    : size === "small"
                            ? "12px"
                            : size === "normal"
                                    ? "16px"
                                    : size === "large"
                                            ? "20px"
                                            : size === "extra-small"
                                                    ? "10px"
                                                    : size === "category"
                                                            ? "15px"
                                                            : "16px"}; /* 폰트 크기 지정 */
    margin-right: ${({ margin }) =>
            margin === "category1" ? "60px" : margin === "category2" ? "25px" : "0"};
  }
`;

const Button = ({
                    label,
                    onClick,
                    color,
                    size,
                    disabled,
                    backgroundcolor,
                    margin,
                }) => {
    return (
        <StyledButton
            onClick={onClick}
            disabled={disabled}
            backgroundcolor={backgroundcolor}
            color={color}
            size={size}
            margin={margin}
        >
            {label}
        </StyledButton>
    );
};

Button.defaultProps = {
    onClick: () => {},
    color: null,
    size: null,
    disabled: false,
};

export default Button;
