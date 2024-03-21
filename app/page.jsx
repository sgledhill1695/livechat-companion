'use client'

//Functions
import { useState } from 'react';

//Components
import dynamic from 'next/dynamic'
import TotalChats from "@/components/index/totalChats";
import ResponseTime from "@/components/index/responseTime";
import Duration from "@/components/index/duration";
import Ratings from "@/components/index/ratings";
import AgentsAvailability from '@/components/index/agentAvailability';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

export default function Home() {

    const [filter, setFilter] = useState('today');

    return (
        <main>

            <div className="mt-[20px] flex justify-between">
                <Tabs defaultValue="today" className="rounded-lg max-w-[500px]">
                    <TabsList className="grid w-full grid-cols-5 bg-[#27272A] rounded-lg">
                        <TabsTrigger onClick={() => setFilter('today')} value="today" className="rounded-lg">Today</TabsTrigger>
                        <TabsTrigger onClick={() => setFilter('week')} value="week" className="rounded-lg">Week</TabsTrigger>
                        <TabsTrigger onClick={() => setFilter('month')} value="month" className="rounded-lg">Month</TabsTrigger>
                        <TabsTrigger onClick={() => setFilter('3 Months')} value="3 Months" className="rounded-lg">3 Months</TabsTrigger>
                        <TabsTrigger onClick={() => setFilter('year')} value="year" className="rounded-lg">Year</TabsTrigger>
                    </TabsList>
                </Tabs>
                <Button variant="outline" className="text-[black] rounded-lg">Export</Button>
            </div>


            <div className="grid grid-cols-8 gap-x-5 gap-y-5 mt-[50px]">

                <div className="col-span-2">
                    <TotalChats 
                        filter={filter}
                    />
                </div>

                <div className="col-span-2">
                     <ResponseTime 
                        filter={filter}
                    />
                </div>

                <div className="col-span-2">
                    <Duration
                        filter={filter}
                    />
                </div>

                <div className="col-span-2">
                    <Ratings
                        filter={filter}
                    />
                </div>

                <div className='col-span-4'>
{/*                     <AgentsPerformace/>
                </div>

                <div className='col-span-4'>
{/*                     <AgentsAvailability />
 */}                </div>

            </div>

        </main>
    );
}
