import styled from 'styled-components';

const TableOperations = styled.div`
  display: flex;
  align-items: center;
  gap: 1.6rem;
  
  @media (max-width: 832px) {
    justify-content: end;
  }
`;

export default TableOperations;
