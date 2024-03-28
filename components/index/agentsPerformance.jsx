'use client'

//Functions
import { getFromDateTime, convertKeyToTeamName } from "@/lib/functions";

//Components
import { Card, CardHeader, CardTitle, CardContent, CardFooter  } from "../ui/card";
import Spinner from "../ui/spinner";
import { PieChart, Pie, Legend, Tooltip, ResponsiveContainer, Cell } from 'recharts';


import { useState, useEffect } from "react";
import TotalChats from "./totalChats";

export default function AgentsPerformace({filter}){

    const [loading, setLoading] = useState(true);
    const [chartData, setChartData] = useState(null);
    const [totalChats, setTotalChats] = useState(0)

    const COLORS = ['#FFD04F', '#EA580C', '#3B82F6'];

    useEffect(() => {

        setLoading(true)
        const fromDateTime = getFromDateTime(filter);
        const toDateTime = new Date();

        const getData = async () => {

            try {

                const res = await fetch(`/api/agent-performance?from=${fromDateTime.toISOString()}&to=${toDateTime.toISOString()}&filter=${filter}`);
                const data = await res.json();

                if (data.status !== 200) {
                    throw new Error("An Error Occurred");
                };

                setTotalChats(data.data.summary.chats_count)

                const dataRetrieved = [];

                Object.keys(data.data.records).forEach(record => {

                    let chatCount = 0;
                    let agent = convertKeyToTeamName(record);

                    if (data.data.records[record].chats_count){
                        chatCount = data.data.records[record].chats_count;
                    };

                    const recordToPush = {
                        name: agent,
                        value: chatCount,
                    };

                    if (recordToPush.name === 'Digital' || recordToPush.name === 'Office' || recordToPush.name === 'Sales' ){
                        dataRetrieved.push(recordToPush);
                    };

                });

                setChartData(dataRetrieved);
                setLoading(false);

            } catch (err) {

                console.log(err)
                alert('error')

            }
        };

        getData();


    }, [filter]);

    return (

        <Card className={`${loading && 'flex justify-center items-center h-[348px]'} w-full rounded-[10px] bg-[#09090B] text-[#FAFAFA] border-[#46464a] `}>

            {loading ? (
                <div>
                    <Spinner/>
                </div>
            ) : (

                <>
                    <CardHeader>
                        <CardTitle className="flex justify-between">
                            Chats per team
                            <svg xmlns="http://www.w3.org/2000/svg" className="fill-[#A1A1AA] w-6" viewBox="0 0 512 512"><path class="fa-secondary" opacity=".4" d="M48 256C48 141.1 141.1 48 256 48s208 93.1 208 208V400.1c0 22.1-17.9 40-40 40L313.6 440c-8.3-14.4-23.8-24-41.6-24H240c-26.5 0-48 21.5-48 48s21.5 48 48 48h32c17.8 0 33.3-9.7 41.6-24l110.4 .1c48.6 0 88.1-39.4 88.1-88V256C512 114.6 397.4 0 256 0S0 114.6 0 256v40c0 13.3 10.7 24 24 24s24-10.7 24-24V256z" /><path class="fa-primary" d="M144 208c-35.3 0-64 28.7-64 64v48c0 35.3 28.7 64 64 64h16c17.7 0 32-14.3 32-32V240c0-17.7-14.3-32-32-32H144zm224 0H352c-17.7 0-32 14.3-32 32V352c0 17.7 14.3 32 32 32h16c35.3 0 64-28.7 64-64V272c0-35.3-28.7-64-64-64z" /></svg>
                        </CardTitle>
                    </CardHeader>

                    <CardContent className="px-0 flex flex-col">

                        <div className="ms-6">Total chats: <span className="font-bold">{totalChats}</span></div>

                        <div className="flex gap-4 ms-6">
                            

                            <div className="flex items-center gap-1">
                                <span className="w-[15px] h-[15px] bg-[#3B82F6] rounded-xl inline-block"></span>Sales
                            </div>

                            <div className="flex items-center gap-1">
                                <span className="w-[15px] h-[15px] bg-[#EA580C] rounded-xl inline-block"></span>Office
                            </div>

                            <div className="flex items-center gap-1">
                                <span className="w-[15px] h-[15px] bg-[#FFD04F] rounded-xl inline-block"></span>Digital
                            </div>


                        </div>

                        <div className="flex justify-center">
                            <PieChart width={400} height={235} >
                                <Pie
                                    dataKey="value"
                                    isAnimationActive={false}
                                    data={chartData}
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={80}
                                    fill={chartData.color}
                                    label
                                    stroke="#09090B"
                                >
                                    {chartData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                            </PieChart>
                        </div>

                    </CardContent>
                </>
            )}


        </Card>    

    )


}