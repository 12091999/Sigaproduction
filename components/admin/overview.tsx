"use client"

import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  {
    name: "Jan",
    products: 4000,
    taxi: 2400,
    hotels: 2400,
    tourism: 1800,
  },
  {
    name: "Feb",
    products: 3000,
    taxi: 1398,
    hotels: 2210,
    tourism: 1500,
  },
  {
    name: "Mar",
    products: 2000,
    taxi: 9800,
    hotels: 2290,
    tourism: 1700,
  },
  {
    name: "Apr",
    products: 2780,
    taxi: 3908,
    hotels: 2000,
    tourism: 1600,
  },
  {
    name: "May",
    products: 1890,
    taxi: 4800,
    hotels: 2181,
    tourism: 1400,
  },
  {
    name: "Jun",
    products: 2390,
    taxi: 3800,
    hotels: 2500,
    tourism: 2100,
  },
  {
    name: "Jul",
    products: 3490,
    taxi: 4300,
    hotels: 2100,
    tourism: 1900,
  },
]

export function Overview() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `$${value}`}
        />
        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
        <Tooltip />
        <Legend />
        <Bar dataKey="products" name="Products" fill="#f43f5e" radius={[4, 4, 0, 0]} />
        <Bar dataKey="taxi" name="Taxi Services" fill="#f59e0b" radius={[4, 4, 0, 0]} />
        <Bar dataKey="hotels" name="Hotels & Lodges" fill="#10b981" radius={[4, 4, 0, 0]} />
        <Bar dataKey="tourism" name="Tourism" fill="#3b82f6" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}
