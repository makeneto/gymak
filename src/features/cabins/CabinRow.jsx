import styled from "styled-components";
import React from "react";

import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";

import CreateCabinForm from "./CreateCabinForm";
import { useDeleteCabin } from "./useDeleteCabin";
import { formatCurrency, formatDateTime } from "../../utils/helpers";
import { useCreateCabin } from "./useCreateCabin";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.7) translateX(-7px);

  @media (min-width: 768px) and (max-width: 1300px) {
    width: 5.3rem;
  }
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";

  @media (min-width: 768px) and (max-width: 1300px) {
    font-size: 13px;
  }
`;

const Price = styled.div`
    font-family: "Sono";
    font-weight: 500;
    color: var(--color-green-700);
`;

const CabinRow = React.memo(({ cabin }) => {
  const { isDeleting, deleteCabin } = useDeleteCabin();
  const { createCabin } = useCreateCabin();

  const {
    id: cabinId,
    created_at,
    name,
    contacto,
    paymentMethod,
    amountPaid,
    image,
  } = cabin;

  function handleDuplicate() {
    createCabin({
      created_at,
      name: `Cópia de ${name}`,
      contacto,
      paymentMethod,
      amountPaid,
      image,
    });
  }

  const isDateOlderThan30Days = (date) => {
    const dateToCheck = new Date(date);
    const today = new Date();
    const differenceInTime = today.getTime() - dateToCheck.getTime();
    const differenceInDays = differenceInTime / (1000 * 3600 * 24);

    return differenceInDays > 30;
  }

  /* Se o Nome for Makene Neto, Altere sempre a data para a data atual */
  if (name === "Makene Neto") {
    const newDate = new Date();
    newDate.setFullYear(newDate.getFullYear() + 3);
    cabin.created_at = newDate.toISOString();
  }

  // Apagar Todas as Cabines que não sejam do `Makene Neto`
  // if (name !== "Makene Neto") {
  //   deleteCabin(cabinId);
  // }

  return (
    <Table.Row>
      <Img src={image} />
      <Cabin>{name}</Cabin>
      <div>{contacto}</div>
      <div className={isDateOlderThan30Days(created_at) ? 'text-red' : ''}>{formatDateTime(created_at)}</div>
      <div>{paymentMethod}</div>
      <Price>{formatCurrency(amountPaid)}</Price>

      {name !== "Makene Neto" ? (
        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={cabinId} />

            <Menus.List id={cabinId}>
              <Menus.Button icon={<HiSquare2Stack />} onClick={handleDuplicate}>
                Duplicar
              </Menus.Button>

              <Modal.Open opens="edit">
                <Menus.Button icon={<HiPencil />}>Editar</Menus.Button>
              </Modal.Open>

              <Modal.Open opens="delete">
                <Menus.Button icon={<HiTrash />}>Excluir</Menus.Button>
              </Modal.Open>
            </Menus.List>

            <Modal.Window name="edit">
              <CreateCabinForm cabinToEdit={cabin} />
            </Modal.Window>

            <Modal.Window name="delete">
              <ConfirmDelete
                resourceName="cabins"
                disabled={isDeleting}
                onConfirm={() => deleteCabin(cabinId)}
              />
            </Modal.Window>
          </Menus.Menu>
        </Modal>
      ) : (
        <Modal>
          <span style={{ color: 'transparent' }}>none</span>
        </Modal>
      )}
    </Table.Row>
  );
})

export default CabinRow;
