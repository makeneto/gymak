import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useSignup } from "./useSignup";

// Email regex: /\S+@\S+\.\S+/
function SignupForm() {
  const { signup, isLoading } = useSignup();
  const { register, formState, getValues, handleSubmit, reset } = useForm();
  const { errors } = formState;

  function onSubmit({ fullName, email, password }) {
    signup(
      { fullName, email, password },
      {
        onSettled: () => reset(),
      }
    );
  }

  return (
    <Form type="medium" onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Nome Completo" error={errors?.fullName?.message}>
        <Input
          type="text"
          id="fullName"
          disabled={isLoading}
          {...register("fullName", { required: "Este Campo é obrigatório" })}
        />
      </FormRow>

      <FormRow label="Email" error={errors?.email?.message}>
        <Input
          type="email"
          id="email"
          disabled={isLoading}
          {...register("email", {
            required: "Este Campo é obrigatório",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Por favor, forneça um email válido",
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Password (min 8 caracteres)"
        error={errors?.password?.message}
      >
        <Input
          type="password"
          id="password"
          disabled={isLoading}
          {...register("password", {
            required: "Este Campo é obrigatório",
            minLength: {
              value: 8,
              message: "Password precisa no mínimo de 8 caracteres",
            },
          })}
        />
      </FormRow>

      <FormRow label="Repetir password" error={errors?.passwordConfirm?.message}>
        <Input
          type="password"
          id="passwordConfirm"
          disabled={isLoading}
          {...register("passwordConfirm", {
            required: "Este Campo é obrigatório",
            validate: (value) =>
              value === getValues().password || "As passwords precisam ser iguais",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          variation="secondary"
          size="medium"
          type="reset"
          disabled={isLoading}
          onClick={reset}
        >
          Limpar
        </Button>
        <Button
          variation="primary"
          size="medium"
          disabled={isLoading}
        >
          Criar novo admin
        </Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
