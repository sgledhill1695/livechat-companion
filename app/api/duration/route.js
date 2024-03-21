import { getFilter } from "@/lib/functions";

export const dynamic = 'force-dynamic';

export async function GET(request) {

    const searchParams = request.nextUrl.searchParams;
    const from = searchParams.get('from');
    const to = searchParams.get('to');
    const filterParam = searchParams.get('filter');

    const filter = getFilter(filterParam);

    try{

        const requestData = {
            "distribution": "day",
            "filters": {
                "from": from,
                "to": to
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

        if (filter > 1) {

            const comparisonFrom = new Date(from);
            comparisonFrom.setDate(comparisonFrom.getDate() - filter);
            const comparisonTo = new Date(from);
            comparisonTo.setDate(comparisonTo.getDate() - 1);
            comparisonTo.setHours(23);

            const requestDataTwo = {
                "distribution": "day",
                "filters": {
                    "from": comparisonFrom,
                    "to": comparisonTo
                }
            };

            const responseTwo = await fetch(`${process.env.LIVECHAT_API_URL}/reports/chats/duration`, {
                method: 'POST',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    "Authorization": `Basic ${btoa(`${process.env.LIVECHAT_API_USERNAME}:${process.env.LIVECHAT_API_PASSWORD}`)}`
                }),
                body: JSON.stringify(requestDataTwo)
            });

            const data = await response.json();
            const dataTwo = await responseTwo.json();

            return Response.json(
                {
                    status: 200,
                    data: data,
                    dataTwo: dataTwo
                }
            )

        } else {

            const data = await response.json();

            return Response.json(
                {
                    status: 200,
                    data: data,
                }
            );


        }

    } catch(err){

        console.log(err)
        return Response.json(
            {
                status: 500,
                error: 'An error occurred'
            }
        )
    }


}