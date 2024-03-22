'use client'

//Functions
import { getFromDateTime } from "@/lib/functions";

//Components
import { BarChart, XAxis, YAxis, Bar, Tooltip } from "recharts";
import { Card, CardHeader, CardTitle, CardContent  } from "../ui/card";
import Spinner from "../ui/spinner";

import { useState, useEffect } from "react";

export default function AgentsPerformace({filter}){

    const [loading, setLoading] = useState(true);
    const [chartData, setChartData] = useState(null)

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

                const dataRetrieved = [];

                Object.keys(data.data.records).forEach(record => {

                    let chatCount = 0;
                    let agent = '';

                    if (data.data.records[record].chats_count){
                        chatCount = data.data.records[record].chats_count;
                    };

                    switch(record){
                        case "info@denehc.co.uk":
                            agent = 'Info'
                            break
                        case "digital@denehc.co.uk":
                            agent = 'Digital'
                            break
                        case "support@denehc.co.uk":
                            agent = 'Support'
                            break
                    };

                    const recordToPush = {
                        agent: agent,
                        totalChats: chatCount,
                    };

                    console.log(recordToPush)

                    if (recordToPush.agent === 'Digital' || recordToPush.agent === 'Info' || recordToPush.agent === 'Support' ){
                        dataRetrieved.push(recordToPush);
                    };

                    setChartData(dataRetrieved);

                })

                console.log(dataRetrieved);

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
                        <CardTitle>Chats per team</CardTitle>
                    </CardHeader>

                    <CardContent className="px-0">
                        <BarChart width={420} height={250} data={chartData}>
                                <Tooltip contentStyle={{ backgroundColor: '#09090B', color: 'white', borderRadius: '10px' }} />
                                <XAxis dataKey="agent" tickLine={false} axisLine={false} allowDecimals={false} />
                                <YAxis dataKey="totalChats" tickLine={false} axisLine={false} allowDecimals={false} />
                                <Bar dataKey="totalChats" fill="#FFFFFF" radius={[8, 8, 0, 0]} />
                        </BarChart>
                    </CardContent>
                </>
            )}


        </Card>    

    )


}