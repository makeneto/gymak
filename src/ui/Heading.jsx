import styled, { css } from "styled-components";

const Heading = styled.h1`
  ${(props) =>
    props.as === "h1" &&
    css`
      font-size: 3rem;
      font-weight: 600;

      & span {
        font-size: 12px;
        font-weight: 400;
        border-radius: 50%;
        padding: 4px 5px 4px;
        color: white;
        background-color: var(--color-brand-600);
        position: absolute;
        top: 49%;
        transform: translateY(-50%);
        right: -29px;
      }

      @media (max-width: 832px) {
        font-size: 2.7rem;
      }
    `
  }

  ${(props) =>
    props.as === "h2" &&
    css`
      font-size: 2rem;
      font-weight: 600;
    `}
    
    ${(props) =>
    props.as === "h3" &&
    css`
      font-size: 2rem;
      font-weight: 500;
    `}
    
    ${(props) =>
    props.as === "h4" &&
    css`
      font-size: 3rem;
      font-weight: 600;
      text-align: center;
    `}
    
  line-height: 1.4;
`;

export default Heading;
