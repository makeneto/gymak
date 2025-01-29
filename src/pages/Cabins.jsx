/* eslint-disable no-unused-expressions */
import CabinTable from "../features/cabins/CabinTable";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import AddCabin from "../features/cabins/AddCabin";
import CabinTableOperations from "../features/cabins/CabinTableOperations";
import { useState } from "react";
import { useCabins } from "../features/cabins/useCabins";

function Cabins() {
  const { cabins } = useCabins()
  const [searchAthletes, setSearchAthletes] = useState('')

  // console.log(cabins)
  const expiredCabinsCount = (cabins || []).filter(cabin => {
    const createdAt = new Date(cabin.created_at);
    const today = new Date()

    createdAt.setHours(0, 0, 0, 0)
    today.setHours(0, 0, 0, 0)

    const diffTime = today - createdAt
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    const isDebt = diffDays >= 30

    return isDebt && createdAt < today
  }).length

  return (
    <>
      <Row type="horizontal_v1">
        <Heading as="h1">Todos Atletas</Heading>
        <CabinTableOperations
          searchAthletes={searchAthletes}
          setSearchAthletes={setSearchAthletes}
          expiredCabinsCount={expiredCabinsCount}
        />
      </Row>

      <Row type="vertical">
        <CabinTable searchAthletes={searchAthletes} />
        <AddCabin />
      </Row>
    </>
  );
}

export default Cabins;