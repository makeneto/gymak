import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import { useCabins } from "./useCabins";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";
import Empty from "../../ui/Empty";

function CabinTable({ searchAthletes }) {
  const { isLoading, cabins } = useCabins();
  const [searchParams] = useSearchParams();

  if (isLoading) return <Spinner />;
  if (!cabins.length) return <Empty resourceName="atleta" />;

  // 1) FILTER
  const filterValue = searchParams.get("created_at") || "all";

  let filteredCabins;
  if (filterValue === "all") filteredCabins = cabins;

  if (filterValue === "debt") {
    filteredCabins = cabins.filter((cabin) => {
      const createdAt = new Date(cabin.created_at);
      const today = new Date();

      createdAt.setHours(0, 0, 0, 0);
      today.setHours(0, 0, 0, 0);

      const diffTime = today - createdAt;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      const isDebt = diffDays >= 30;

      return isDebt && createdAt < today;
    });
  }

  // 3) SEARCH
  const searchValue = searchAthletes.toLowerCase();
  if (searchValue) {
    filteredCabins = filteredCabins.filter((cabin) => {
      const name = cabin.name.toLowerCase();
      return name.includes(searchValue);
    });
  }

  // 2) SORT
  let sortedCabins;
  const sortBy = searchParams.get("sortBy") || "name-desc";
  const [field, direction] = sortBy.split("-");
  const modifier = direction === "asc" ? 1 : -1;
  sortedCabins = filteredCabins.sort((a, b) => {
    if (a[field] < b[field]) return -1 * modifier;
    if (a[field] > b[field]) return 1 * modifier;
    return 0;
  });

  // Ordena os itens, colocando os itens com o nome "Makene Neto" no topo
  const makeneCabins = filteredCabins.filter(
    (cabin) => cabin.name === "Makene Neto"
  );
  const otherCabins = filteredCabins.filter(
    (cabin) => cabin.name !== "Makene Neto"
  );
  sortedCabins = [...makeneCabins, ...otherCabins];

  return (
    <Menus>
      <Table>
        <Table.Header>
          <div></div>
          <div>Atleta</div>
          <div>Contacto</div>
          <div>Data de Vencimento</div>
          <div>Método de pagam.</div>
          <div>Valor pago</div>
        </Table.Header>

        <Table.Body
          data={sortedCabins}
          render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
        />
      </Table>
    </Menus>
  );
}

export default CabinTable;
