import { makeStyles } from '@material-ui/styles';
import React from 'react';
import {
  CartesianGrid,
  Line,
  LineChart as LChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

interface LineChartProps {
  data: {
    value: React.ReactText;
    label?: React.ReactNode;
    time?: string;
  }[];
  label: React.ReactText;
}

export default function LineChart({ data, label }: LineChartProps) {
  const c = useStyles();
  return (
    <div className={c.root}>
      <span className={c.label}>{label}</span>
      <ResponsiveContainer height={360}>
        <LChart data={data}>
          <CartesianGrid
            vertical={true}
            stroke="#e5e5e5"
            className={c.wrapper}
          />
          <XAxis
            dataKey="label"
            strokeWidth={0}
            interval={0}
            style={{ fontSize: 10 }}
          />
          <YAxis
            strokeWidth={0}
            textAnchor="start"
            tickCount={11}
            // minTickGap={10}
            padding={{ bottom: 15, top: 15 }}
            fontSize={13}
            // dx => margin
            dx={-26}
          />
          <Tooltip
            cursor={false}
            content={({ payload }) => (
              <div className={c.tooltip}>
                <p>{(payload?.[0]?.payload?.value || 0) + 100}</p>
                <p style={{ fontSize: 11, color: '#888' }}>
                  {payload?.[0]?.payload?.time?.split('T')?.[0]}
                </p>
                <p style={{ fontSize: 11, color: '#888' }}>
                  {payload?.[0]?.payload?.time?.split('=')?.[1]}
                </p>
              </div>
            )}
          />
          <Line
            type="linear"
            strokeWidth={2}
            dataKey="value"
            fill="blue"
            underlineThickness={0}
            dot={false}
          />
        </LChart>
      </ResponsiveContainer>
    </div>
  );
}

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    borderRadius: 4,
    backgroundColor: 'white',
    padding: '.75rem 4rem 0 1rem',
    gap: 64,
    '& .recharts-yAxis': {},
  },
  wrapper: {
    '&:last-child,&:nth-last-child(2)': {
      display: 'none',
    },
  },
  label: {
    backgroundColor: '#264653',
    alignSelf: 'flex-start',
    color: 'white',
    padding: '.3rem 1rem',
    borderRadius: 4,
  },
  tooltip: {
    backgroundColor: '#ffffffaa',
    padding: '4px 6px',
    textAlign: 'center',
  },
}));
