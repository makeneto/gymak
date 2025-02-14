import styled, { css } from "styled-components";

const Form = styled.form`
  ${(props) =>
    props.type === "regular" &&
    css`
      padding: 2.4rem 4rem;
      background-color: var(--color-grey-0);
      border: 1px solid var(--color-grey-100);
      border-radius: var(--border-radius-md);

      @media (max-width: 832px) {
        padding: 1rem 2rem;
      }
    `}

  ${(props) =>
    props.type === "medium" &&
    css`
      width: 73rem;
      padding: 2.4rem 4rem;
      background-color: var(--color-grey-0);
      border: 1px solid var(--color-grey-100);
      border-radius: var(--border-radius-md);
    `}

  ${(props) =>
    props.type === "modal" &&
    css`
      overflow: hidden;
      font-size: 1.4rem;
      width: 61rem;

      @media (max-width: 832px) {
        width: 100%;
      }

      @media (max-width: 480px) {
        width: 100%;
      }
    `}
    

    @media (max-width: 480px) {
    width: 100%;
    margin: auto;
    overflow: hidden;
    padding: 2.4rem 2.1rem;
  }

  @media (max-width: 832px) {
    padding: 3.4rem 2rem;
  }
`;

Form.defaultProps = {
  type: "regular",
};

export default Form;
