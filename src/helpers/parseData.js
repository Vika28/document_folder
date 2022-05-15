const parseData = (allDate) => {
    allDate = new Date(allDate);
    let date = allDate.getDate();
    if (date < 10) {
        date = '0' + date;
    }

    let month = allDate.getMonth() + 1;
    if (month < 10) {
        month = '0' + month;
    }

    const year = allDate.getFullYear();

    let hours = allDate.getHours();
    if (hours < 10) {
        hours = '0' + hours;
    }

    let minutes = allDate.getMinutes();

    if (minutes < 10) {
        minutes = '0' + minutes;
    }
    return `${date}.${month}.${year} ${hours}:${minutes}`
}

export default parseData;