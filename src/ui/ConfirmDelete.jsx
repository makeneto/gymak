import styled from "styled-components";
import Button from "./Button";
import Heading from "./Heading";

const StyledConfirmDelete = styled.div`
  width: 40rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  & p {
    color: var(--color-grey-500);
    margin-bottom: 1.2rem;
  }

  & div {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

function ConfirmDelete({ onConfirm, disabled, onCloseModal }) {
  return (
    <StyledConfirmDelete>
      <Heading as="h3">Excluir Atleta</Heading>
      <p>
        Tem certeza de que deseja excluir o atleta?
        Esta ação é irreversível e todos os dados relacionados a este atleta serão permanentemente removidos do sistema.
      </p>

      <div>
        <Button
          variation="secondary"
          size="small"
          disabled={disabled}
          onClick={onCloseModal}
        >
          Cancelar
        </Button>
        <Button
          variation="danger"
          size="small"
          disabled={disabled} onClick={onConfirm}>
          Excluir
        </Button>
      </div>
    </StyledConfirmDelete>
  );
}

export default ConfirmDelete;
