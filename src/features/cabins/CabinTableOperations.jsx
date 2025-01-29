import styled from "styled-components";

import TableOperations from "../../ui/TableOperations";
import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";
import Input from "../../ui/Input";

const CounterDebt = styled.div`
  display: flex;
  position: relative;

  & p {
    position: absolute;
    right: -7px;
    top: -7px;
    background-color: #FF004C;
    border-radius: 50%;
    padding: 1px 6px;
    color: white;
    font-size: 11px;
  }
`

function CabinTableOperations({ searchAthletes, setSearchAthletes, expiredCabinsCount }) {

  return (
    <TableOperations>
      <CounterDebt>
        <Filter
          filterField="created_at"
          options={[
            { value: "all", label: "Todos" },
            { value: "debt", label: "Em dívida" },
          ]}
        />
        {expiredCabinsCount > 0 && <p>{expiredCabinsCount}</p>}
      </CounterDebt>

      <SortBy
        options={[
          { value: "name-asc", label: "Ordenar por nome (A-Z)" },
          { value: "name-desc", label: "Ordenar por nome (Z-A)" }
        ]}
      />

      <Input
        type="text"
        id="search"
        placeholder="Pesquisar atletas..."
        value={searchAthletes}
        onChange={(e) => setSearchAthletes(e.target.value)}
      />
    </TableOperations>
  );
}

export default CabinTableOperations;
