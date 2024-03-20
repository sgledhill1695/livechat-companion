//Function to return the number of days in the given filter
export function getFilter(userFilter){

    let filter = 0;

    switch (userFilter) {

        case 'today':
            filter = 1
            break;

        case 'week':
            filter = 7
            break;


        case 'month':
            filter = 30
            break;

        case '3 Months':
            filter = 90
            break;

        case 'year':
            filter = 365
            break;
    };

    return filter;

};

export function getFromDateTime(userFilter){

    const fromDateTime = new Date();

    switch (userFilter) {

        case "today":
            fromDateTime.setHours(0, 0, 0, 0);
            break;

        case "week":
            fromDateTime.setDate(fromDateTime.getDate() - 6);
            fromDateTime.setHours(0, 0, 0, 0);
            break;

        case "month":
            fromDateTime.setDate(fromDateTime.getDate() - 29);
            fromDateTime.setHours(0, 0, 0, 0);
            break;

        case "3 Months":
            fromDateTime.setDate(fromDateTime.getDate() - 89);
            fromDateTime.setHours(0, 0, 0, 0);
            break;

        case "year":
            fromDateTime.setDate(fromDateTime.getDate() - 364);
            fromDateTime.setHours(0, 0, 0, 0);
            break;
    };

    return fromDateTime;
    
};

export function secondsToTimestamp(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
};

export function getIncreaseDecreasePercentage(firstValue, secondValue){

    let res = (firstValue - secondValue) / firstValue * 100.0;
    res = Math.abs(res);
    return Math.round(res);

};

export function calulateAverageResponseTime(data){

    let avgResponseTime = 0;
    let count = 0;
    let average = 0

    Object.keys(data.records).forEach(record => {
        if (data.records[record].first_response_time){
            count++
            avgResponseTime = avgResponseTime + data.records[record].first_response_time;
        }    
    });

    average = avgResponseTime / count;
    average = Math.round(average);

    return average;


};
