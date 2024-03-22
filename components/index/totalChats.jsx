'use client'

//Functions
import { useEffect, useState } from "react";
import { getFromDateTime, getIncreaseDecreasePercentage } from "@/lib/functions";

//Components
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function TotalChats({filter}){

    //State
    const [data, setData] = useState(null);
    const [dataTwo, setDataTwo] = useState(null); 
    const [loading, setLoading] = useState(true);
    const [percentage, setPercentage] = useState(null);

    //Effects
    useEffect(() => {

        setLoading(true);
        const fromDateTime = getFromDateTime(filter);
        const toDateTime = new Date();

        const getData = async () => {

            try {

                const res = await fetch(`/api/total-chats?from=${fromDateTime.toISOString()}&to=${toDateTime.toISOString()}&filter=${filter}`);
                const data = await res.json();

                if(data.status !== 200){
                    throw new Error("An Error Occurred");
                };

                setData(data.data);

                //If a second data has been returned
                if(data.dataTwo){
                    data.dataTwo && setDataTwo(data.dataTwo);
                    setPercentage(getIncreaseDecreasePercentage(data.data.total, data.dataTwo.total));
                };

                setLoading(false);
            }
            catch(err){
                alert('An error occured fetching total chats');
            }
        };

        getData();

        
    }, [filter]);

    return(
        <Card className="w-full rounded-[10px] bg-[#09090B] text-[#FAFAFA] border-[#46464a] h-full">

            <CardHeader className="pb-0">
                <CardTitle className="text-md flex justify-between items-center">
                    {loading ? (
                        <Skeleton className="h-5 w-full rounded-lg  bg-[#7a7a7d] mb-2" />
                    ) : (
                        <>
                            Total chats
                            <svg xmlns="http://www.w3.org/2000/svg" className="fill-[#A1A1AA] w-4" viewBox="0 0 640 512"><path d="M96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3zM609.3 512H471.4c5.4-9.4 8.6-20.3 8.6-32v-8c0-60.7-27.1-115.2-69.8-151.8c2.4-.1 4.7-.2 7.1-.2h61.4C567.8 320 640 392.2 640 481.3c0 17-13.8 30.7-30.7 30.7zM432 256c-31 0-59-12.6-79.3-32.9C372.4 196.5 384 163.6 384 128c0-26.8-6.6-52.1-18.3-74.3C384.3 40.1 407.2 32 432 32c61.9 0 112 50.1 112 112s-50.1 112-112 112z" /></svg>
                        </>
                    )}
                </CardTitle>
            </CardHeader>

            <CardContent className="mt-2">

                {loading ? (
                    <Skeleton className="h-9 w-full rounded-lg  bg-[#7a7a7d]" />
                ) : (
                    <p className="text-4xl font-bold text-[#FAFAFA]">
                        {data?.total}
                    </p>
                )}

                {filter !== 'today' && (
                    <>
                        {loading ? (
                            <Skeleton className="h-4 w-full rounded-lg bg-[#7a7a7d] mt-3" />
                        ) : (
                            <CardDescription className="mt-2 flex items-center">

                                {dataTwo && (
                                    <>

                                        {data.total >= dataTwo.total && (
                                            <>
                                                <svg xmlns="http://www.w3.org/2000/svg" className="fill-[#30a000] w-2" viewBox="0 0 384 512"><path d="M352 128c0-17.7-14.3-32-32-32L96 96c-17.7 0-32 14.3-32 32s14.3 32 32 32l146.7 0L41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L288 205.3 288 352c0 17.7 14.3 32 32 32s32-14.3 32-32l0-224z" /></svg>
                                                {percentage}% increase from last {filter}
                                            </>
                                        )}

                                        {dataTwo.total > data.total && (
                                            <>
                                                <svg xmlns="http://www.w3.org/2000/svg" className="fill-[red] w-2" viewBox="0 0 384 512"><path d="M56 416c-13.3 0-24-10.7-24-24V152c0-13.3 10.7-24 24-24s24 10.7 24 24V334.1L311 103c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-231 231H296c13.3 0 24 10.7 24 24s-10.7 24-24 24H56z" /></svg>
                                                {percentage}% decrease from last {filter}
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