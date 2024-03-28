'use client'

//Components
import { BarChart, XAxis, YAxis, Bar, Tooltip } from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import Spinner from "../ui/spinner";


//Functions
import { useState, useEffect } from "react";
import { getFromDateTime, convertKeyToTeamName } from "@/lib/functions";

export default function AgentsAvailability({filter}) {

    //States
    const [loading, setLoading] = useState(true);
    const [totalTimeAvailable, setTotalTimeAvailable] = useState('');
    const [chartData, setChartData] = useState([]);
    const [showHoursChart, setShowHoursChart] = useState(false);
    const [showMinsChart, setShowMinsChart] = useState(false);

    
    useEffect(() => {

        setLoading(true)
        const fromDateTime = getFromDateTime(filter);
        const toDateTime = new Date();

        const getData = async () => {

            try {

                const res = await fetch(`/api/agent-availability?from=${fromDateTime.toISOString()}&to=${toDateTime.toISOString()}&filter=${filter}`);
                const data = await res.json();

                if (data.status !== 200) {
                    throw new Error("An Error Occurred");
                };

                const dataRetrieved = [];

                console.log(data)

                Object.keys(data.data.records).forEach(record => {

                    let totalTimeAcceptingChats =  Math.floor(data.data.records[record].accepting_chats_time);

                    if (totalTimeAcceptingChats >= 3600) {
                        totalTimeAcceptingChats = Math.floor(totalTimeAcceptingChats / 3600);
                    } else {
                        totalTimeAcceptingChats = 0;
                    }

                    let agent = convertKeyToTeamName(record);

                    const recordToPush = {
                        agent: agent,
                        "Hours available": totalTimeAcceptingChats,
                    };

                    console.log(recordToPush)

                    if (recordToPush.agent === 'Digital' || recordToPush.agent === 'Office' || recordToPush.agent === 'Sales') {
                        dataRetrieved.push(recordToPush);
                    };

                });

                setChartData(dataRetrieved)


                setLoading(false);

            } catch (err) {

                console.log(err)
                alert('error on avail')

            }
        };

        getData();


    }, [filter]);


    return (
        <Card className={`${loading && 'flex justify-center items-center h-[348px]'} w-full rounded-[10px] bg-[#09090B] text-[#FAFAFA] border-[#46464a]`}>

            {loading ? (
                <div>
                    <Spinner />
                </div>
            ) : (
                <>
                
                    <CardHeader>
                        <CardTitle className="flex justify-between">
                            Team availability
                            <svg xmlns="http://www.w3.org/2000/svg" className="fill-[#A1A1AA] w-5" viewBox="0 0 512 512"><path d="M256 0c-8.8 0-16 7.2-16 16v96c0 8.8 7.2 16 16 16s16-7.2 16-16V32.6C388.2 40.8 480 137.7 480 256c0 123.7-100.3 224-224 224S32 379.7 32 256c0-61.9 25.1-117.8 65.6-158.4c6.2-6.2 6.2-16.4 0-22.6s-16.4-6.2-22.6 0C28.7 121.3 0 185.3 0 256C0 397.4 114.6 512 256 512s256-114.6 256-256S397.4 0 256 0zM171.3 148.7c-6.2-6.2-16.4-6.2-22.6 0s-6.2 16.4 0 22.6l96 96c6.2 6.2 16.4 6.2 22.6 0s6.2-16.4 0-22.6l-96-96z" /></svg>
                        </CardTitle>
                    </CardHeader>


                    <CardContent className="px-0">

                        <BarChart width={420} height={285} data={chartData}>
                            <Tooltip contentStyle={{ backgroundColor: '#09090B', color: 'white', borderRadius: '10px' }} />
                            <XAxis dataKey="agent" tickLine={false} axisLine={false} allowDecimals={false} />
                            <YAxis dataKey="Hours available" tickLine={false} axisLine={false} allowDecimals={false} />
                            <Bar dataKey="Hours available" fill="#FFFFFF" radius={[8, 8, 0, 0]} />
                        </BarChart>

                    </CardContent>

                </>
            )}

        </Card>
    )


}






