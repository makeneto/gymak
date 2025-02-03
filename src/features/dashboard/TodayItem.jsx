import styled from "styled-components";
import supabase from "../../services/supabase";
import { useMediaQuery } from 'react-responsive'
import { useState } from "react";

import Tag from "../../ui/Tag";
import Button from "../../ui/Button";
import { IoIosArrowForward } from 'react-icons/io';
import SpinnerMini from "../../ui/SpinnerMini";

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

  @media (max-width: 832px) {
    grid-template-columns: 8rem 18rem 10rem 11rem 1rem 11rem 0;
  }
`;

const Input = styled.input`
  border: none;
  border-radius: 4px;
  padding: 3px 6px;
`;

const StyledLinkButton = styled(Button).attrs({
  // as: Link,
  variation: "primary",
  size: "small",
})``;

const Guest = styled.div`
  font-weight: 500;
`;

function TodayItem({ athlete }) {
  const { name, created_at, contacto, id } = athlete;
  const isMobile = useMediaQuery({ maxWidth: 832 })

  const [loading, setLoading] = useState(false);

  const handlePay = async (id) => {
    setLoading(true);
    const { error } = await supabase
      .from('cabins')
      .update({ created_at: new Date().toISOString() })
      .eq('id', id); // Substitua 'your-cabin-id' pelo ID da cabine que você deseja atualizar

    if (error) {
      console.error('Erro ao atualizar a cabine:', error);
    } else {
      console.log('Cabine atualizada com sucesso');
    }
    setLoading(false);
  };

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

      {isMobile && <Input type="text" disabled style={{ textAlign: "center" }} value={createdAt.toLocaleDateString('pt-BR')} />}

      {isMobile && <p><IoIosArrowForward /></p>}

      {statusType === "green" && <Input type="text" disabled style={{ textAlign: "center" }} value={oneMonthLater.toLocaleDateString('pt-BR')} />}

      {statusType === "red" &&
        <StyledLinkButton
          // to="/cabins"
          variation="primary"
          size="small"
          onClick={() => handlePay(id)}
          disabled={loading}
        >
          {loading ? <SpinnerMini /> : 'Pagar'}
        </StyledLinkButton>
      }
      <div></div>
    </StyledTodayItem>
  );
}

export default TodayItem;