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
                    Total chats
                    <svg xmlns="http://www.w3.org/2000/svg" className="fill-[#A1A1AA] w-5" viewBox="0 0 640 512"><path d="M208 352c114.9 0 208-78.8 208-176S322.9 0 208 0S0 78.8 0 176c0 38.6 14.7 74.3 39.6 103.4c-3.5 9.4-8.7 17.7-14.2 24.7c-4.8 6.2-9.7 11-13.3 14.3c-1.8 1.6-3.3 2.9-4.3 3.7c-.5 .4-.9 .7-1.1 .8l-.2 .2 0 0 0 0C1 327.2-1.4 334.4 .8 340.9S9.1 352 16 352c21.8 0 43.8-5.6 62.1-12.5c9.2-3.5 17.8-7.4 25.3-11.4C134.1 343.3 169.8 352 208 352zM448 176c0 112.3-99.1 196.9-216.5 207C255.8 457.4 336.4 512 432 512c38.2 0 73.9-8.7 104.7-23.9c7.5 4 16 7.9 25.2 11.4c18.3 6.9 40.3 12.5 62.1 12.5c6.9 0 13.1-4.5 15.2-11.1c2.1-6.6-.2-13.8-5.8-17.9l0 0 0 0-.2-.2c-.2-.2-.6-.4-1.1-.8c-1-.8-2.5-2-4.3-3.7c-3.6-3.3-8.5-8.1-13.3-14.3c-5.5-7-10.7-15.4-14.2-24.7c24.9-29 39.6-64.7 39.6-103.4c0-92.8-84.9-168.9-192.6-175.5c.4 5.1 .6 10.3 .6 15.5z" /></svg>
                </CardTitle>
            </CardHeader>

            <CardContent className="mt-2">

                {loading ? (
                    <Skeleton className="h-10 w-full rounded-lg  bg-[#7a7a7d] mb-2" />
                ) : (
                    <p className="text-4xl font-bold text-[#FAFAFA]">
                        {data?.total}
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

                                        {data.total >= dataTwo.total && (
                                            <>
                                                <svg xmlns="http://www.w3.org/2000/svg" className="fill-[#30a000] w-2 mr-1" viewBox="0 0 384 512"><path d="M352 128c0-17.7-14.3-32-32-32L96 96c-17.7 0-32 14.3-32 32s14.3 32 32 32l146.7 0L41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L288 205.3 288 352c0 17.7 14.3 32 32 32s32-14.3 32-32l0-224z" /></svg>
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