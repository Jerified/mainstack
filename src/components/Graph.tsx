"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Dot,
} from "recharts";
import React from "react";

const data = [
  { date: "Apr 1, 2022", value: 0 },
  { date: "Apr 5, 2022", value: 60 },
  { date: "Apr 10, 2022", value: 20 },
  { date: "Apr 15, 2022", value: 80 },
  { date: "Apr 20, 2022", value: 40 },
  { date: "Apr 25, 2022", value: 90 },
  { date: "Apr 30, 2022", value: 0 },
];

export default function Graph() {
  return (
    <div className="w-full h-[300px] flex items-center justify-center">
      <ResponsiveContainer width="100%" height={320}>
        <LineChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 60 }} 
        >
          <XAxis
            dataKey="date"
            tickLine={false}
            axisLine={{ stroke: "#EAEAEA", strokeWidth: 1 }}
            tick={(props) => {
              const { x, y, payload, index } = props;
              const dx = index === 0 ? 20 : index === data.length - 1 ? -20 : 0;
              return (
                <text
                  x={x}
                  y={y}
                  dx={dx}
                  dy={16} // Push tick labels downward
                  fill="#6B7280"
                  fontSize={12}
                  textAnchor="middle"
                >
                  {index === 0 || index === data.length - 1 ? payload.value : ""}
                </text>
              );
            }}
            interval={0}
            tickMargin={20}
          />

          <YAxis hide />
          <Tooltip />

          <Line
            type="monotone"
            dataKey="value"
            stroke="#FF6600"
            strokeWidth={1}
            dot={(props) => {
              return props.index === 0 || props.index === data.length - 1 ? (
                <Dot {...props} r={4} fill="#FF6600" />
              ) : (
                <Dot {...props} r={0} fill="transparent" opacity={0} />
              );
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
