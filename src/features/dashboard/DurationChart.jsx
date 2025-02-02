import styled from "styled-components";
import Heading from "../../ui/Heading";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  // Tooltip,
} from "recharts";
import { useDarkMode } from "../../context/DarkModeContext";

const ChartBox = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  padding: 2.4rem 3.2rem;
  grid-column: 3 / span 2;

  & > *:first-child {
    margin-bottom: 2.6rem;
  }

  & .recharts-pie-label-text {
    font-weight: 600;
  }
`;

const startDataLight = [
  {
    duration: "Atletas ativos",
    value: 0,
    color: "#1ED96F",
  },
  {
    duration: "Atletas inativos",
    value: 0,
    color: "#D9042B",
  },
]

const startDataDark = [
  {
    duration: "Atletas ativos",
    value: 0,
    color: "#6FD904",
  },
  {
    duration: "Atletas inativos",
    value: 0,
    color: "#F22E52",
  }
];

function prepareData(startData, stays) {

  function incArrayValue(arr, field) {
    const index = arr.findIndex((obj) => obj.duration === field);
    if (index !== -1) {
      arr[index].value += 1;
    } else {
      arr.push({ duration: field, value: 1 });
    }
    return arr;
  }

  const data = stays.reduce((acc, stay) => {
    const today = new Date()
    const paymentDate = new Date(stay.created_at)
    const diffTime = Math.abs(today - paymentDate)
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays <= 30) {
      return incArrayValue(acc, "Atletas ativos");
    }
    else if (diffDays > 30) {
      return incArrayValue(acc, "Atletas inativos");
    }
  }, startData);

  return data;
}

function DurationChart({ confirmedStays }) {
  const { isDarkMode } = useDarkMode();
  const startData = isDarkMode ? startDataDark : startDataLight;
  const data = prepareData(startData, confirmedStays);

  return (
    <ChartBox>
      <Heading as="h2">Status dos Atletas</Heading>
      <ResponsiveContainer width="100%" height={240}>
        <PieChart>
          <Pie
            data={data}
            nameKey="duration"
            dataKey="value"
            innerRadius={85}
            outerRadius={110}
            cx="40%"
            cy="50%"
            paddingAngle={3}
          >
            {data.map((entry) => (
              <Cell
                fill={entry.color}
                stroke={entry.color}
                key={entry.duration}
              />
            ))}
          </Pie>
          {/* <Tooltip /> */}
          <Legend
            verticalAlign="middle"
            align="right"
            width="30%"
            layout="vertical"
            iconSize={15}
            iconType="circle"
          />
        </PieChart>
      </ResponsiveContainer>
    </ChartBox>
  );
}

export default DurationChart;
