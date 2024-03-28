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
                            <svg xmlns="http://www.w3.org/2000/svg" className="fill-[#A1A1AA] w-5" viewBox="0 0 640 512"><path d="M32 176c0-74.8 73.7-144 176-144s176 69.2 176 144s-73.7 144-176 144c-15.3 0-30.6-1.9-46.3-5c-3.5-.7-7.1-.2-10.2 1.4c-6.1 3.1-12 6-18 8.7c-28.4 12.9-60.2 23.1-91.5 26c14.9-19 26.8-39.7 37.6-59.9c3.3-6.1 2.3-13.6-2.5-18.6C50 244.2 32 213.1 32 176zM208 0C93.1 0 0 78.9 0 176c0 44.2 19.8 80.1 46 110c-11.7 21-24 40.6-39.5 57.5l0 0-.1 .1c-6.5 7-8.2 17.1-4.4 25.8C5.8 378.3 14.4 384 24 384c43 0 86.5-13.3 122.7-29.7c4.9-2.2 9.6-4.5 14.3-6.8c15.3 2.8 30.9 4.6 47 4.6c114.9 0 208-78.9 208-176S322.9 0 208 0zM447.4 160.5C541.6 167 608 233 608 304c0 37.1-18 68.2-45.1 96.6c-4.8 5-5.8 12.5-2.5 18.6c10.9 20.2 22.7 40.8 37.6 59.9c-31.3-3-63.2-13.2-91.5-26c-6-2.7-11.9-5.6-18-8.7c-3.2-1.6-6.8-2.1-10.2-1.4c-15.6 3.1-30.9 5-46.3 5c-68.2 0-123.6-30.7-153.1-73.3c-11 3-22.3 5.2-33.8 6.8C279 439.8 349.9 480 432 480c16.1 0 31.7-1.8 47-4.6c4.6 2.3 9.4 4.6 14.3 6.8C529.5 498.7 573 512 616 512c9.6 0 18.2-5.7 22-14.5c3.8-8.7 2-18.9-4.4-25.8l-.1-.1 0 0c-15.5-17-27.8-36.5-39.5-57.5c26.2-29.9 46-65.8 46-110c0-94.4-87.8-171.5-198.2-175.8c2.8 10.4 4.7 21.2 5.6 32.3z" /></svg>
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
                                                {percentage}% Increase from last {filter}
                                            </>
                                        )}

                                        {dataTwo.total > data.total && (
                                            <>
                                                <svg xmlns="http://www.w3.org/2000/svg" className="fill-[red] w-2" viewBox="0 0 384 512"><path d="M56 416c-13.3 0-24-10.7-24-24V152c0-13.3 10.7-24 24-24s24 10.7 24 24V334.1L311 103c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-231 231H296c13.3 0 24 10.7 24 24s-10.7 24-24 24H56z" /></svg>
                                                {percentage}% Decrease from last {filter}
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