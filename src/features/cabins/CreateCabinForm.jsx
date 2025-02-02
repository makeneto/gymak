import { useForm } from "react-hook-form";
import styled from "styled-components";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import FormRow from "../../ui/FormRow";

import { useCreateCabin } from "./useCreateCabin";
import { useEditCabin } from "./useEditCabin";

function CreateCabinForm({ cabinToEdit = {}, onCloseModal }) {
  const { isCreating, createCabin } = useCreateCabin();
  const { isEditing, editCabin } = useEditCabin();
  const isWorking = isCreating || isEditing;

  const { id: editId, ...editValues } = cabinToEdit;
  const isEditSession = Boolean(editId);

  const { register, handleSubmit, reset, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });
  const { errors } = formState;

  function onSubmit(data) {
    const image = typeof data.image === "string" ? data.image : data.image[0];

    if (isEditSession)
      editCabin(
        { newCabinData: { ...data, image }, id: editId },
        {
          onSuccess: (data) => {
            reset();
            onCloseModal?.();
          },
        }
      );
    else
      createCabin(
        { ...data, image: image },
        {
          onSuccess: (data) => {
            reset();
            onCloseModal?.();
          },
        }
      );
  }

  function onError(errors) {
    // console.log(errors);
  }

  const Select = styled.select`
    cursor: pointer;
    font-size: 1.4rem;
    padding: 0.8rem 1.2rem;
    border: 1px solid
    ${(props) =>
      props.type === "white"
        ? "var(--color-grey-100)"
        : "var(--color-grey-300)"};
    border-radius: var(--border-radius-sm);
    background-color: var(--color-grey-0);
    box-shadow: var(--shadow-sm);
  `

  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <FormRow label="Nome do atleta" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isWorking}
          {...register("name", {
            required: "Este campo é obrigatório",
          })}
        />
      </FormRow>

      <FormRow label="Contacto" error={errors?.contacto?.message}>
        <Input
          type="number"
          id="contacto"
          disabled={isWorking}
          {...register("contacto", {
            required: "Este campo é obrigatório",
            validate: {
              startsWithNine: (value) =>
                value.toString().startsWith("9") || "Contacto inválido",
              length: (value) =>
                value.toString().length === 9 || "O contacto deve ter 9 dígitos",
            },
          })}
        />
      </FormRow>

      <FormRow label="Método de pagamento" error={errors?.paymentMethod?.message}>
        <Select
          id="paymentMethod"
          disabled={isWorking}
          {...register("paymentMethod", {
            required: "Este campo é obrigatório",
          })}
        >
          <option value="Cache">Cache</option>
          <option value="Transferência">Transferência</option>
          <option value="Depósito">Depósito</option>
        </Select>
      </FormRow>

      {isEditSession &&
        <FormRow label="Data do pagamento" error={errors?.created_at?.message}>
          <Input
            type="datetime-local"
            id="created_at"
            disabled={isWorking}
            {...register("created_at", {
              required: "Este campo é obrigatório",
              setValueAs: (value) => {
                const date = new Date(value);
                return date.toISOString().slice(0, 16);
              },
            })}
          />
        </FormRow>
      }

      <FormRow
        label="Valor a pagar"
        error={errors?.amountPaid?.message}
      >
        <Input
          type="number"
          id="amountPaid"
          disabled={isWorking}
          defaultValue={11000}
          {...register("amountPaid", {
            required: "Este campo é obrigatório",
          })}
        />
      </FormRow>

      <FormRow label="Cabin photo">
        <FileInput
          id="image"
          accept="image/*"
          {...register("image", {
            required: isEditSession ? false : "Este campo é obrigatório",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          variation="secondary"
          size="medium"
          type="reset"
          onClick={() => onCloseModal?.()}
        >
          Cancelar
        </Button>
        <Button
          variation="primary"
          size="medium"
          disabled={isWorking}>
          {isEditSession ? "Editar atleta" : "Confirmar"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
