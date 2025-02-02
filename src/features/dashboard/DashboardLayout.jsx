import styled from "styled-components";
import Stats from "./Stats";
import { useCabins } from "../cabins/useCabins";
import DurationChart from "./DurationChart";
import TodayActivity from "./TodayActivity";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 36rem auto;
  gap: 2.4rem;
`;

function DashboardLayout() {
  const { cabins, isLoading } = useCabins();

  console.log(isLoading)

  const activeAthletes = cabins

  return (
    <StyledDashboardLayout>
      <Stats
        bookings="12"
        confirmedStays="22000"
        numDays="3"
        cabinCount="21"
      />
      <TodayActivity />
      {!isLoading && <DurationChart confirmedStays={activeAthletes} />}
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
