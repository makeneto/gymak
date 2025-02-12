import styled from 'styled-components';

const TableOperations = styled.div`
  display: flex;
  align-items: center;
  gap: 1.6rem;
  
  @media (max-width: 832px) {
    justify-content: end;
  }

  @media (max-width: 480px) {
    overflow-x: scroll;
    display: grid;
    grid-template-columns: 17rem 15rem;
  }
`;

export default TableOperations;
