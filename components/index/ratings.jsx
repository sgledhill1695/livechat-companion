'use client'

//Functions
import { useState, useEffect } from "react";
import { getFromDateTime } from "@/lib/functions";

//Components
import { Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import { Skeleton } from "../ui/skeleton";

export default function Ratings({filter}){

    //State
    const [data, setData] = useState(null);
    const [dataTwo, setDataTwo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [goodChats, setGoodChats] = useState(0);
    const [badChats, setBadChats] = useState(0);


    useEffect(() => {

        setLoading(true);
        const fromDateTime = getFromDateTime(filter);
        const toDateTime = new Date();

        const getData = async () => {

            try {
                const res = await fetch(`/api/ratings?from=${fromDateTime.toISOString()}&to=${toDateTime.toISOString()}&filter=${filter}`);
                const data = await res.json();

                if (data.status !== 200) {
                    throw new Error("An Error Occurred");
                };

                let good = 0;
                let bad = 0;

                Object.keys(data.data.records).forEach(record => {                     
                    if (data.data.records[record].good) {
                        good = good + data.data.records[record].good;
                    };
                    if (data.data.records[record].bad) {
                        bad = bad + data.data.records[record].bad;
                    };
                });

                setGoodChats(good);
                setBadChats(bad);
                setLoading(false);

            } catch (err) {

                console.log(err)
                alert('')

            }
        }

        getData();


    }, [filter])



    return (
        <Card className="w-full rounded-[10px] bg-[#09090B] text-[#FAFAFA] border-[#46464a] h-full">

            <CardHeader className="pb-0">
                <CardTitle className="text-md flex justify-between items-center">
                    {loading ? (
                        <Skeleton className="h-5 w-full rounded-lg  bg-[#7a7a7d] mb-2" />
                    ) : (
                        <>
                            Chat ratings
                            <svg xmlns="http://www.w3.org/2000/svg" className="fill-[#A1A1AA] w-4" viewBox="0 0 576 512"><path d="M226.5 168.8L287.9 42.3l61.4 126.5c4.6 9.5 13.6 16.1 24.1 17.7l137.4 20.3-99.8 98.8c-7.4 7.3-10.8 17.8-9 28.1l23.5 139.5L303 407.7c-9.4-5-20.7-5-30.2 0L150.2 473.2l23.5-139.5c1.7-10.3-1.6-20.7-9-28.1L65 206.8l137.4-20.3c10.5-1.5 19.5-8.2 24.1-17.7zM424.9 509.1c8.1 4.3 17.9 3.7 25.3-1.7s11.2-14.5 9.7-23.5L433.6 328.4 544.8 218.2c6.5-6.4 8.7-15.9 5.9-24.5s-10.3-14.9-19.3-16.3L378.1 154.8 309.5 13.5C305.5 5.2 297.1 0 287.9 0s-17.6 5.2-21.6 13.5L197.7 154.8 44.5 177.5c-9 1.3-16.5 7.6-19.3 16.3s-.5 18.1 5.9 24.5L142.2 328.4 116 483.9c-1.5 9 2.2 18.1 9.7 23.5s17.3 6 25.3 1.7l137-73.2 137 73.2z" /></svg>
                        </>
                    )}
                </CardTitle>
            </CardHeader>

            <CardContent className="mt-2 flex gap-5">

                {loading ? (
                    <Skeleton className="h-9 w-full rounded-lg  bg-[#7a7a7d]" />
                ) : (
                    <>
                        <div className="flex gap-2 items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="fill-[#30a000] w-6" viewBox="0 0 512 512"><path d="M313.4 32.9c26 5.2 42.9 30.5 37.7 56.5l-2.3 11.4c-5.3 26.7-15.1 52.1-28.8 75.2H464c26.5 0 48 21.5 48 48c0 18.5-10.5 34.6-25.9 42.6C497 275.4 504 288.9 504 304c0 23.4-16.8 42.9-38.9 47.1c4.4 7.3 6.9 15.8 6.9 24.9c0 21.3-13.9 39.4-33.1 45.6c.7 3.3 1.1 6.8 1.1 10.4c0 26.5-21.5 48-48 48H294.5c-19 0-37.5-5.6-53.3-16.1l-38.5-25.7C176 420.4 160 390.4 160 358.3V320 272 247.1c0-29.2 13.3-56.7 36-75l7.4-5.9c26.5-21.2 44.6-51 51.2-84.2l2.3-11.4c5.2-26 30.5-42.9 56.5-37.7zM32 192H96c17.7 0 32 14.3 32 32V448c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32V224c0-17.7 14.3-32 32-32z" /></svg>
                            <p className="text-xl font-bold text-[#30a000]">
                                {goodChats}
                            </p>
                        </div>

                        <div className="flex gap-2 items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="fill-[red] w-6" viewBox="0 0 512 512"><path d="M313.4 479.1c26-5.2 42.9-30.5 37.7-56.5l-2.3-11.4c-5.3-26.7-15.1-52.1-28.8-75.2H464c26.5 0 48-21.5 48-48c0-18.5-10.5-34.6-25.9-42.6C497 236.6 504 223.1 504 208c0-23.4-16.8-42.9-38.9-47.1c4.4-7.3 6.9-15.8 6.9-24.9c0-21.3-13.9-39.4-33.1-45.6c.7-3.3 1.1-6.8 1.1-10.4c0-26.5-21.5-48-48-48H294.5c-19 0-37.5 5.6-53.3 16.1L202.7 73.8C176 91.6 160 121.6 160 153.7V192v48 24.9c0 29.2 13.3 56.7 36 75l7.4 5.9c26.5 21.2 44.6 51 51.2 84.2l2.3 11.4c5.2 26 30.5 42.9 56.5 37.7zM32 384H96c17.7 0 32-14.3 32-32V128c0-17.7-14.3-32-32-32H32C14.3 96 0 110.3 0 128V352c0 17.7 14.3 32 32 32z" /></svg>
                            <p className="text-xl font-bold text-[red]">
                                {badChats}
                            </p>
                        </div>
                    </>
                )}
            </CardContent>

        </Card>
    )
}