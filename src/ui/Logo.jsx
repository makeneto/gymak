import styled from "styled-components";
// import { useDarkMode } from "../context/DarkModeContext";

const StyledLogo = styled.div`
  text-align: center;
`;

const Img = styled.img`
  width: 88px;

  @media (min-width: 768px) and (max-width: 1300px) {
    width: 75px;
  }
`;

function Logo() {
  // const { isDarkMode } = useDarkMode();

  const src = "/logo-light.png"

  return (
    <StyledLogo>
      <Img src={src} alt="Logo" />
    </StyledLogo>
  );
}

export default Logo;
