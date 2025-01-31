import styled from "styled-components";

const Input = styled.input`
  border: 1px solid var(--color-grey-300);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-sm);
  padding: 0.8rem 1.2rem;
  box-shadow: var(--shadow-sm);

  
  @media (min-width: 768px) and (max-width: 1300px) {
    font-size: 14px;
  }
  
  @media (max-width: 832px) {
    font-size: 1.2rem;
  }
`;

export default Input;
