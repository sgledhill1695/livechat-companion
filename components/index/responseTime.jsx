'use client'

//Functions
import { useEffect, useState } from "react";
import { getFromDateTime, secondsToTimestamp, calulateAverageResponseTime, getIncreaseDecreasePercentage } from "@/lib/functions";

//Components
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function ResponseTime({filter}){

    //State
    const [data, setData] = useState(null);
    const [dataTwo, setDataTwo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [percentage, setPercentage] = useState(null);
    const [averageResponseTime, setAverageResponseTime] = useState(null);
    const [averageOne, setAverageOne] = useState(null);
    const [averageTwo, setAverageTwo] = useState(null)

    //Effects
    useEffect(() => {
        
        setLoading(true);
        const fromDateTime = getFromDateTime(filter);
        const toDateTime = new Date();

        const getData = async () => {

            try {

                const res = await fetch(`/api/avg-response-time?from=${fromDateTime.toISOString()}&to=${toDateTime.toISOString()}&filter=${filter}`);
                const data = await res.json();

                if (data.status !== 200) {
                    throw new Error("An Error Occurred");
                };

                const average = calulateAverageResponseTime(data.data);
                setAverageOne(average)
                setAverageResponseTime(secondsToTimestamp(average));

                if(data.dataTwo){
                    const avgTwo = calulateAverageResponseTime(data.dataTwo);
                    setAverageTwo(avgTwo)
                    setPercentage(getIncreaseDecreasePercentage(average, avgTwo));
                };

                setData(data.data);
                setDataTwo(data.dataTwo)
                setLoading(false);

            }catch(err){

                alert('An error occured fetching total chats');
                console.log(err)

            }
        }

        getData();

    }, [filter]);



    return (
        <Card className="w-full rounded-[10px] bg-[#09090B] text-[#FAFAFA] border-[#46464a] h-full">

            <CardHeader className="pb-0">
                <CardTitle className="text-md flex justify-between items-center">
                    Avg response time
                    <svg xmlns="http://www.w3.org/2000/svg" className="fill-[#A1A1AA] w-4" viewBox="0 0 448 512"><path d="M176 0c-17.7 0-32 14.3-32 32s14.3 32 32 32h16V98.4C92.3 113.8 16 200 16 304c0 114.9 93.1 208 208 208s208-93.1 208-208c0-41.8-12.3-80.7-33.5-113.2l24.1-24.1c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L355.7 143c-28.1-23-62.2-38.8-99.7-44.6V64h16c17.7 0 32-14.3 32-32s-14.3-32-32-32H224 176zm72 192V320c0 13.3-10.7 24-24 24s-24-10.7-24-24V192c0-13.3 10.7-24 24-24s24 10.7 24 24z" /></svg>
                </CardTitle>
            </CardHeader>


            <CardContent className="mt-2" >

                {loading ? (
                    <Skeleton className="h-10 w-full rounded-lg  bg-[#7a7a7d] mb-2" />
                ) : (

                    <p className="text-4xl font-bold text-[#FAFAFA]">
                        {averageResponseTime}
                    </p>
                )}

                {filter !== 'today' && (
                    <>
                        {loading ? (
                            <Skeleton className="h-4 w-full rounded-lg bg-[#7a7a7d]" />
                        ) : (
                            <CardDescription className="mt-2 flex items-center">

                                {dataTwo && (
                                    <>

                                        {averageOne >= averageTwo && (
                                            <>
                                                <svg xmlns="http://www.w3.org/2000/svg" className="fill-[red] w-2" viewBox="0 0 384 512"><path d="M56 416c-13.3 0-24-10.7-24-24V152c0-13.3 10.7-24 24-24s24 10.7 24 24V334.1L311 103c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-231 231H296c13.3 0 24 10.7 24 24s-10.7 24-24 24H56z" /></svg>
                                                {percentage}% slower than last {filter}
                                            </>
                                        )}

                                        {averageTwo > averageOne && (
                                            <>
                                                <svg xmlns="http://www.w3.org/2000/svg" className="fill-[#30a000] w-2" viewBox="0 0 384 512"><path d="M352 128c0-17.7-14.3-32-32-32L96 96c-17.7 0-32 14.3-32 32s14.3 32 32 32l146.7 0L41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L288 205.3 288 352c0 17.7 14.3 32 32 32s32-14.3 32-32l0-224z" /></svg>
                                                {percentage}% quicker than last {filter}
                                            </>
                                        )}


                                    </>
                                )}

                            </CardDescription>
                        )}
                    </>
                )}

            </CardContent>

        </Card>   
    )
}