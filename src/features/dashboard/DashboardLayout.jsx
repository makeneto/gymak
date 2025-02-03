import styled from "styled-components"
import Stats from "./Stats"
import { useCabins } from "../cabins/useCabins"
import DurationChart from "./DurationChart"
import TodayActivity from "./TodayActivity"
import { useMediaQuery } from 'react-responsive'

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 36rem auto ;
  gap: 2.4rem;

  @media (max-width: 832px) {
    grid-template-columns: repeat(1, 100%);
    grid-template-rows: auto 20rem 36rem;
    gap: 2rem;
  }
`

const ContainerStatus = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.2rem;
`

function DashboardLayout() {
  const { cabins, isLoading } = useCabins()
  const activeAthletes = cabins
  const isMobile = useMediaQuery({ maxWidth: 832 })

  return (
    <StyledDashboardLayout>
      <Stats
        bookings="12"
        confirmedStays="22000"
        numDays="3"
        cabinCount="21"
      />
      {isMobile ? (
        <ContainerStatus>
          <TodayActivity />
          {!isLoading && <DurationChart confirmedStays={activeAthletes} />}
        </ContainerStatus>
      ) : <>
        <TodayActivity />
        {!isLoading && <DurationChart confirmedStays={activeAthletes} />}
      </>}
    </StyledDashboardLayout>
  )
}

export default DashboardLayout
