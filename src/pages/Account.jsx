import UpdatePasswordForm from "../features/authentication/UpdatePasswordForm";
import UpdateUserDataForm from "../features/authentication/UpdateUserDataForm";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

function Account() {
  return (
    <>
      <Heading as="h1">Atualizar sua conta</Heading>

      <Row type="vertical">
        <Heading as="h3">Atualizar seus dados</Heading>
        <UpdateUserDataForm />
      </Row>

      <Row type="vertical">
        <Heading as="h3">Atualizar password</Heading>
        <UpdatePasswordForm />
      </Row>
    </>
  );
}

export default Account;
