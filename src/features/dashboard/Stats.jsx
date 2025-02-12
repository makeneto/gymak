import styled from "styled-components"
import { useMediaQuery } from 'react-responsive'
import {
  HiOutlineBanknotes,
  HiOutlineUserCircle,
  HiOutlineUserGroup,
  HiOutlineXCircle,
} from "react-icons/hi2"
import { HiOutlineLightningBolt } from "react-icons/hi"

import Stat from "./Stat"
import { formatCurrency } from "../../utils/helpers"
import { useCabins } from "../cabins/useCabins"
import SpinnerMini from "../../ui/SpinnerMini"

const StatGrid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
`

function Stats() {
  const { cabins, isLoading } = useCabins()
  const isMobile = useMediaQuery({ maxWidth: 832 })

  const activeAthletes = isLoading ? <SpinnerMini /> : cabins.filter(cabin => {
    const today = new Date()
    const paymentDate = new Date(cabin.created_at)
    const diffTime = Math.abs(today - paymentDate)
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays <= 30
  }).length

  const inactiveAthletes = isLoading ? <SpinnerMini /> : cabins.filter(cabin => {
    const today = new Date()
    const paymentDate = new Date(cabin.created_at)
    const diffTime = Math.abs(today - paymentDate)
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays > 30
  }).length

  const newAthletes = isLoading ? <SpinnerMini /> : cabins.filter(cabin => {
    const today = new Date()
    const signupDate = new Date(cabin.athlete_signup)
    const diffTime = Math.abs(today - signupDate)
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays <= 30
  }).length


  const monthlyBudget = isLoading ? <SpinnerMini /> :
    cabins.reduce((total, cabin) => {
      const today = new Date()
      const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1)
      const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0)
      const paymentDate = new Date(cabin.created_at)

      if (paymentDate >= startOfMonth && paymentDate <= endOfMonth) {
        console.log(cabin);
        return total + cabin.amountPaid
      }
      return total
    }, 0)


  return (
    // <></>

    isMobile ? (
      <StatGrid>
        <Stat
          title="Atletas ativos"
          color="blue"
          icon={<HiOutlineLightningBolt />}
          value={activeAthletes}
        />
        <Stat
          title="Atletas inativos"
          color="red"
          icon={<HiOutlineUserCircle />}
          value={inactiveAthletes}
        />
        <Stat
          title="Atletas novos"
          color="indigo"
          icon={<HiOutlineUserGroup />}
          value={newAthletes}
        />
        <Stat
          title="Orçamento mensal"
          color="green"
          icon={<HiOutlineBanknotes />}
          value={formatCurrency(monthlyBudget)}
        />
      </StatGrid>
    ) : <>
      <Stat
        title="Atletas ativos"
        color="blue"
        icon={<HiOutlineLightningBolt />}
        value={activeAthletes}
      />
      <Stat
        title="Atletas inativos"
        color="red"
        icon={<HiOutlineXCircle />}
        value={inactiveAthletes}
      />
      <Stat
        title="Atletas novos"
        color="indigo"
        icon={<HiOutlineUserGroup />}
        value={newAthletes}
      />
      <Stat
        title="Orçamento mensal"
        color="green"
        icon={<HiOutlineBanknotes />}
        value={formatCurrency(monthlyBudget)}
      />
    </>
  )
}

export default Stats
