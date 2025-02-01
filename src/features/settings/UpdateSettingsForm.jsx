import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Spinner from "../../ui/Spinner";
import { useCabins } from "../cabins/useCabins";
import { useSettings } from "./useSettings";
import { useUpdateSetting } from "./useUpdateSetting";

function UpdateSettingsForm() {
  const { cabins } = useCabins()

  const {
    isLoading,
    settings: {
      gymName,
      gymAddress,
      gymTiming,
    } = {},
  } = useSettings();
  const { isUpdating, updateSetting } = useUpdateSetting();

  if (isLoading) return <Spinner />;

  function handleUpdate(e, field) {
    const { value } = e.target;

    if (!value) return;
    updateSetting({ [field]: value });
  }

  return (
    <Form type="medium">
      <FormRow label="Nome do ginásio">
        <Input
          type="text"
          id="gymName"
          defaultValue={gymName}
          disabled={isUpdating}
          onBlur={(e) => handleUpdate(e, "gymName")}
        />
      </FormRow>

      <FormRow label="Endereço do ginásio">
        <Input
          type="text"
          id="gymAddress"
          defaultValue={gymAddress}
          disabled={isUpdating}
          onBlur={(e) => handleUpdate(e, "gymAddress")}
        />
      </FormRow>

      <FormRow label="Horas de funcionamento">
        <Input
          type="text"
          id="gymTiming"
          defaultValue={gymTiming}
          disabled={isUpdating}
          onBlur={(e) => handleUpdate(e, "gymTiming")}
        />
      </FormRow>

      <FormRow label="Quantidade de Atletas">
        <Input
          type="text"
          id="numAthletes"
          defaultValue={`${cabins.length} Atletas`}
          disabled
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
