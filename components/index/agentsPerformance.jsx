'use client'

import { BarChart, XAxis, YAxis, Bar, Tooltip, Legend, ResponsiveContainer} from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";

const data = [
    {
        name: "Info",
        calls: 60,
    },
    {
        name: "Digital",
        calls: 30,
    },
    {
        name: "Support",
        calls: 16,
    },


];


export default function AgentsPerformace(){

    return (
        <Card className="w-full rounded-[10px] bg-[#09090B] text-[#FAFAFA] border-[#46464a]">
            <CardHeader>
                <CardTitle>Agent Performace</CardTitle>
            </CardHeader>
            <CardContent className="px-0">
                <BarChart width={600} height={250} data={data}>
                    <XAxis dataKey="name" tickLine={false} axisLine={false} />
                    <YAxis tickLine={false} axisLine={false} />
                    <Bar dataKey="calls" fill="#FFFFFF" />
                </BarChart>
            </CardContent>
        </Card>    
    )


}