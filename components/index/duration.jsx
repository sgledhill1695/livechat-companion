import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

async function getData() {

    try {

        const todayStart = new Date();
        todayStart.setHours(0, 0, 0, 0);
        const currentTime = new Date();

        const requestData = {
            "filters": {
                "from": todayStart,
                "to": currentTime
            }
        };

        const response = await fetch(`${process.env.LIVECHAT_API_URL}/reports/chats/duration`, {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json',
                "Authorization": `Basic ${btoa(`${process.env.LIVECHAT_API_USERNAME}:${process.env.LIVECHAT_API_PASSWORD}`)}`
            }),
            body: JSON.stringify(requestData)
        });

        return response.json();

    }
    catch (err) {

        console.log(err);

    }
}


export default async function Duration(){

    const data = await getData();

    let avgChatDuration = 0;

    Object.keys(data.records).forEach(record => {
        avgChatDuration = data.records[record].agents_chatting_duration;
    });

    const avgChatMins = Math.floor(avgChatDuration / 60);
    const avgChatSeconds = avgChatDuration - avgChatMins * 60;

    return(
        <Card className="w-full rounded-[10px] bg-[#09090B] text-[#FAFAFA] border-[#46464a] h-full">

            <CardHeader className="pb-0">
                <CardTitle className="text-md flex justify-between items-center">
                    Avg chat duration
                    <svg xmlns="http://www.w3.org/2000/svg" className="fill-[#A1A1AA] w-4" viewBox="0 0 512 512"><path d="M256 0a256 256 0 1 1 0 512A256 256 0 1 1 256 0zM232 120V256c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2V120c0-13.3-10.7-24-24-24s-24 10.7-24 24z" /></svg>
                </CardTitle>
            </CardHeader>

            <CardContent className="mt-2">
                <p className="text-4xl font-bold text-[#ff7c92]">
                    {avgChatMins}m {avgChatMins}s
                </p>
                <CardDescription className="mt-2">+5% from last month</CardDescription>
            </CardContent>

        </Card>
    )
}