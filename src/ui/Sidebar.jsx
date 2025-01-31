import styled from "styled-components";
import Logo from "./Logo";
import MainNav from "./MainNav";
import { HiOutlineLockClosed } from "react-icons/hi2";
import { useState } from "react";
import { BsMenuButton } from "react-icons/bs";

function Sidebar() {
  const [menu, setMenu] = useState(window.innerWidth > 832);

  function handleMenu() {
    setMenu(!menu);
  }

  const StyledSidebar = styled.aside`
    background-color: var(--color-grey-0);
    padding: 3.2rem 2.4rem;
    border-right: 1px solid var(--color-grey-100);
    
    grid-row: ${menu ? '1 / -1' : ''};
    display: flex;
    flex-direction: column;
    gap: 3.2rem;

    ${menu && `
      & > *:not(:first-child) {
        display: none;
      }
    `}

    @media (max-width: 832px) {
      height: 200dvh;
      padding: 3.2rem 2.4rem 5rem;
    }
  `;

  return (
    <StyledSidebar>
      {window.innerWidth <= 832 && (
        !menu ? (
          <HiOutlineLockClosed onClick={handleMenu} style={{ position: "absolute", top: "2.5rem", left: "4.3rem", width: "24px", height: "24px", cursor: "pointer" }} />
        ) : (
          <BsMenuButton onClick={handleMenu} style={{ position: "absolute", top: "2.5rem", left: "4.5rem", width: "20px", height: "20px", cursor: "pointer" }} />
        )
      )}
      <Logo />
      <MainNav handleMenu={handleMenu} />
    </StyledSidebar>
  );
}

export default Sidebar;
