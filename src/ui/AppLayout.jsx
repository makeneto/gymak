import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import styled from "styled-components";

const StyledAppLayout = styled.div`
  display: grid;
  grid-template-columns: 26rem 1fr;
  grid-template-rows: auto 1fr;
  height: 100vh;

  @media (min-width: 768px) and (max-width: 1300px) {
    grid-template-columns: 23.4rem 1fr;
  }
`;

const Main = styled.main`
  background-color: var(--color-grey-50);
  padding: 4rem 4.8rem 6.4rem;
  overflow: ${(props) => (props.isCabinsPage ? 'hidden' : 'scroll')};
`;

const Container = styled.div`
  max-width: 120rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;

  @media (min-width: 768px) and (max-width: 1300px) {
    gap: 1.2rem;
  }
`;

function AppLayout() {
  const location = useLocation();
  const isCabinsPage = location.pathname.includes('cabins');

  return (
    <StyledAppLayout>
      <Header />
      <Sidebar />
      <Main isCabinsPage={isCabinsPage}>
        <Container>
          <Outlet />
        </Container>
      </Main>
    </StyledAppLayout>
  );
}

export default AppLayout;
