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
                setData(data.data);

                if(data.dataTwo){
                    const avgTwo = calulateAverageResponseTime(data.dataTwo);
                    setAverageTwo(avgTwo);
                    setPercentage(getIncreaseDecreasePercentage(average, avgTwo));
                    setDataTwo(data.dataTwo);
                };

                setLoading(false);

            }catch(err){

                alert('An error occured fetching total chats');
                console.log(err);

            }
        }

        getData();

    }, [filter]);



    return (
        <Card className="w-full rounded-[10px] bg-[#09090B] text-[#FAFAFA] border-[#46464a] h-full">

            <CardHeader className="pb-0">
                <CardTitle className="text-md flex justify-between items-center">
                    {loading ? ( 
                        <Skeleton className="h-5 w-full rounded-lg  bg-[#7a7a7d] mb-2" />
                    ) : (
                        <>
                            Avg wait time
                            <svg xmlns="http://www.w3.org/2000/svg" className="fill-[#A1A1AA] w-4" viewBox="0 0 448 512"><path d="M128 16c0-8.8 7.2-16 16-16H304c8.8 0 16 7.2 16 16s-7.2 16-16 16H240V96.6c49.4 3.8 94 24.8 127.7 57l37-37c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6l-38.2 38.2C416 212.6 432 256.4 432 304c0 114.9-93.1 208-208 208S16 418.9 16 304c0-109.5 84.6-199.2 192-207.4V32H144c-8.8 0-16-7.2-16-16zM48 304a176 176 0 1 0 352 0A176 176 0 1 0 48 304zm192-96V320c0 8.8-7.2 16-16 16s-16-7.2-16-16V208c0-8.8 7.2-16 16-16s16 7.2 16 16z" /></svg>
                        </>
                    )}
                </CardTitle>
            </CardHeader>


            <CardContent className="mt-2" >

                {loading ? (
                    <Skeleton className="h-9 w-full rounded-lg  bg-[#7a7a7d]" />
                ) : (

                    <p className="text-4xl font-bold text-[#FAFAFA]">
                        {averageResponseTime}
                    </p>
                )}

                {filter !== 'today' && (
                    <>
                        {loading ? (
                            <Skeleton className="h-4 w-full rounded-lg bg-[#7a7a7d] mt-3 items-center" />
                        ) : (
                            <CardDescription className="mt-2 flex items-center">

                                {dataTwo && (
                                    <>
                                        {averageOne >= averageTwo && (
                                            <>
                                                <svg xmlns="http://www.w3.org/2000/svg" className="fill-[red] w-2" viewBox="0 0 384 512"><path d="M56 416c-13.3 0-24-10.7-24-24V152c0-13.3 10.7-24 24-24s24 10.7 24 24V334.1L311 103c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-231 231H296c13.3 0 24 10.7 24 24s-10.7 24-24 24H56z" /></svg>
                                                {percentage}% Slower than last {filter}
                                            </>
                                        )}

                                        {averageTwo > averageOne && (
                                            <>
                                                <svg xmlns="http://www.w3.org/2000/svg" className="fill-[#30a000] w-2" viewBox="0 0 384 512"><path d="M352 128c0-17.7-14.3-32-32-32L96 96c-17.7 0-32 14.3-32 32s14.3 32 32 32l146.7 0L41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L288 205.3 288 352c0 17.7 14.3 32 32 32s32-14.3 32-32l0-224z" /></svg>
                                                {percentage}% Quicker than last {filter}
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