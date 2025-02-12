import styled, { css } from "styled-components";

const Row = styled.div`
  display: flex;

  ${(props) =>
    props.type === "horizontal" &&
    css`
      justify-content: space-between;
      align-items: center;
    `}

  ${(props) =>
    props.type === "horizontal_v1" &&
    css`
      margin-bottom: 2.6rem;
      justify-content: space-between;
      align-items: center;
    `}

  ${(props) =>
    props.type === "vertical" &&
    css`
      flex-direction: column;
      gap: 3.6rem;

      @media (max-width: 1300px) {
        gap: 2rem;
      }
    `}
`;

Row.defaultProps = {
  type: "vertical",
};

export default Row;
