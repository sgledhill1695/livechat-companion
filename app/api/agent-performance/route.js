import { getFilter } from "@/lib/functions";

export const dynamic = 'force-dynamic';

export async function GET(request) {

    const searchParams = request.nextUrl.searchParams;
    const from = searchParams.get('from');
    const to = searchParams.get('to');
    const filterParam = searchParams.get('filter');

    const filter = getFilter(filterParam);

    try {

        const requestData = {
            "distribution": "day",
            "filters": {
                "from": from,
                "to": to
            }
        };

        const response = await fetch(`${process.env.LIVECHAT_API_URL}/reports/agents/performance`, {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json',
                "Authorization": `Basic ${btoa(`${process.env.LIVECHAT_API_USERNAME}:${process.env.LIVECHAT_API_PASSWORD}`)}`
            }),
            body: JSON.stringify(requestData)
        });

        const data = await response.json();

        return Response.json(
            {
                status: 200,
                data: data,
            }
        );





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
