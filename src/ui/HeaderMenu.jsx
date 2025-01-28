import styled from "styled-components";
import Logout from "../features/authentication/Logout";
// import DarkModeToggle from "./DarkModeToggle";

const StyledHeaderMenu = styled.ul`
  display: flex;
  gap: 0.4rem;
`;

function HeaderMenu() {
  // const navigate = useNavigate();

  return (
    <StyledHeaderMenu>
      <li>
      </li>
      <li>
        {/* <DarkModeToggle /> */}
      </li>
      <li>
        <Logout />
      </li>
    </StyledHeaderMenu>
  );
}

export default HeaderMenu;
