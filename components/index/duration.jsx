'use client'

//functions
import { useState, useEffect } from "react";
import { getFromDateTime, calulateAverageChatDuration, secondsToTimestamp, getIncreaseDecreasePercentage } from "@/lib/functions";

//Components
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import { Skeleton } from "../ui/skeleton";

export default function Duration({filter}){

    //States
    const [data, setData] = useState(null);
    const [dataTwo, setDataTwo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [percentage, setPercentage] = useState(null);
    const [averageChatDuration, setAverageChatDuration] = useState(null);
    const [durationOne, setDurationOne] = useState(0);
    const [durationTwo, setDurationTwo] = useState(0);

    //Effects
    useEffect(() => {

        setLoading(true);
        const fromDateTime = getFromDateTime(filter);
        const toDateTime = new Date();

        const getData = async () => {

            const res = await fetch(`/api/duration?from=${fromDateTime.toISOString()}&to=${toDateTime.toISOString()}&filter=${filter}`);
            const data = await res.json();

            if (data.status !== 200) {
                throw new Error("An Error Occurred");
            };

            const drOne = calulateAverageChatDuration(data.data);
            setDurationOne(durationOne)
            setAverageChatDuration(secondsToTimestamp(drOne));

            if (data.dataTwo) {
                const drTwo = calulateAverageChatDuration(data.dataTwo);
                setDurationTwo(drTwo);
                setPercentage(getIncreaseDecreasePercentage(drOne, drTwo));
                setDataTwo(data.dataTwo)
            };

            setLoading(false);

        };

        getData();

    }, [filter]);

    return(
        <Card className="w-full rounded-[10px] bg-[#09090B] text-[#FAFAFA] border-[#46464a] h-full">

            <CardHeader className="pb-0">
                <CardTitle className="text-md flex justify-between items-center">
                    Avg chat duration
                    <svg xmlns="http://www.w3.org/2000/svg" className="fill-[#A1A1AA] w-4" viewBox="0 0 512 512"><path d="M256 0a256 256 0 1 1 0 512A256 256 0 1 1 256 0zM232 120V256c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2V120c0-13.3-10.7-24-24-24s-24 10.7-24 24z" /></svg>
                </CardTitle>
            </CardHeader>

            <CardContent className="mt-2">

                {loading ? (
                    <Skeleton className="h-10 w-full rounded-lg  bg-[#7a7a7d] mb-2" />
                ) : (

                    <p className="text-4xl font-bold text-[#FAFAFA]">
                        {averageChatDuration}
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
                                    {durationOne >= durationTwo && (
                                        <>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="fill-[red] w-2" viewBox="0 0 384 512"><path d="M56 416c-13.3 0-24-10.7-24-24V152c0-13.3 10.7-24 24-24s24 10.7 24 24V334.1L311 103c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-231 231H296c13.3 0 24 10.7 24 24s-10.7 24-24 24H56z" /></svg>
                                            {percentage}% longer than last {filter}
                                        </>
                                    )}

                                    {durationTwo > durationOne && (
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