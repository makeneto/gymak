import { createContext, useContext } from "react";
import styled from "styled-components";

const StyledTable = styled.div`
  border: 1px solid var(--color-grey-200);
  position: relative;
  font-size: 1.4rem;
  background-color: var(--color-grey-0);
  border-radius: 7px;
  overflow: hidden;
`;

const CommonRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.5fr 1.2fr 1.8fr 1.2fr 1fr 0.2fr;
  column-gap: 2.4rem;
  align-items: center;
  transition: none;

  @media (min-width: 768px) and (max-width: 1300px) {
    grid-template-columns: 0.6fr 1.5fr 1.1fr 2.4fr 1.4fr 1fr 0.2fr;
  }
`;

const StyledHeader = styled(CommonRow)`
  width: 63%;
  position: fixed;
  margin-top: -1px;
  z-index: 2;
  padding: 1.6rem 2.4rem;
  background: var(--cabin-header);
  backdrop-filter: blur(10px);
  border: 1px solid var(--color-grey-200);
  border-radius: 7px 7px 0 0;
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);

  @media (min-width: 768px) and (max-width: 1300px) {
    width: 74%;
    margin-left: -1px;
    padding: 1.2rem 2.4rem;

    & div {
      font-size: 11px;
    }
  }
`;

const StyledRow = styled(CommonRow)`
  padding: 1.6rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  @media (min-width: 768px) and (max-width: 1300px) {
    padding: 1.2rem 2.4rem;

    & div {
      font-size: 11px;
    }
  }
`;

const StyledBody = styled.section`
  margin: 5.4rem 0 0.4rem;

  @media (min-width: 768px) and (max-width: 1300px) {
    margin: 4.4rem 0 0.4rem;
  }
`;

const Footer = styled.footer`
  background-color: var(--color-grey-50);
  display: flex;
  justify-content: center;
  padding: 1.2rem;

  &:not(:has(*)) {
    display: none;
  }
`;

const Empty = styled.p`
  padding-top: 5rem;
  font-size: 1.6rem;
  font-weight: 500;
  text-align: center;
  margin: 2.4rem;
`;

const CabinsContainer = styled.div`
  max-height: 66dvh;
  overflow-y: auto;

  @media (min-width: 768px) and (max-width: 1300px) {
    max-height: 60dvh;
  }
`;

const TableContext = createContext();

function Table({ columns, children }) {
  return (
    <CabinsContainer>
      <TableContext.Provider value={{ columns }}>
        <StyledTable role="table">{children}</StyledTable>
      </TableContext.Provider>
    </CabinsContainer>
  );
}

function Header({ children }) {
  const { columns } = useContext(TableContext);
  return (
    <StyledHeader role="row" columns={columns} as="header">
      {children}
    </StyledHeader>
  );
}
function Row({ children }) {
  const { columns } = useContext(TableContext);
  return (
    <StyledRow role="row" columns={columns}>
      {children}
    </StyledRow>
  );
}

function Body({ data, render }) {
  if (!data.length)
    return <Empty>Nenhum atleta para mostrar no momento.</Empty>;

  return <StyledBody>{data.map(render)}</StyledBody>;
}

Table.Header = Header;
Table.Body = Body;
Table.Row = Row;
Table.Footer = Footer;

export default Table;
