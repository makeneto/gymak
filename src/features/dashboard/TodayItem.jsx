import styled from "styled-components";
import { Link } from "react-router-dom";

import Tag from "../../ui/Tag";
import Button from "../../ui/Button";

const StyledTodayItem = styled.li`
  display: grid;
  grid-template-columns: 8rem 16rem 1fr 11rem 0;
  gap: 1.2rem;
  align-items: center;

  font-size: 1.4rem;
  padding: 0.8rem 0;
  border-bottom: 1px solid var(--color-grey-100);

  &:first-child {
    border-top: 1px solid var(--color-grey-100);
  }
`;

const Input = styled.input`
  border: none;
  border-radius: 4px;
  padding: 3px 6px;
`;

const StyledLinkButton = styled(Button).attrs({
  as: Link,
  variation: "primary",
  size: "small",
})``;

const Guest = styled.div`
  font-weight: 500;
`;

function TodayItem({ athlete }) {
  const { name, created_at, contacto } = athlete;

  const createdAt = new Date(created_at);
  const today = new Date();
  const oneMonthLater = new Date(createdAt);
  oneMonthLater.setMonth(createdAt.getMonth() + 1);

  if (!(createdAt.toDateString() === today.toDateString() || oneMonthLater.toDateString() === today.toDateString())) {
    return null;
  }

  let statusType;
  if (createdAt <= today && today <= oneMonthLater) {
    statusType = "green";
  } else {
    statusType = "red";
  }

  return (
    <StyledTodayItem>
      <Tag type={statusType}>{statusType === "green" ? "Pago" : "Vencido"}</Tag>
      <Guest>{name}</Guest>
      <div>{contacto}</div>
      {statusType === "green" && <Input type="text" disabled style={{ textAlign: "center" }} value={oneMonthLater.toLocaleDateString()} />}
      {statusType === "red" && <StyledLinkButton to="/cabins" variation="primary" size="small">Pagar</StyledLinkButton>}
      <div></div>
    </StyledTodayItem>
  );
}

export default TodayItem;