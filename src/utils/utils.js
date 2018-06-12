var adList = [];
var uniqueRandomNumbers = [];
var month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

//generate unique random number
let getUniqueRandomNumber = () => {
    let randomId = Math.floor(Math.random() * 1000);
    if (adList.includes(randomId)) {
        getUniqueRandomNumber();
    }
    else {
        uniqueRandomNumbers.push(randomId);
        return randomId;
    }
}

// return ad according to index number
let getAdId = (index) => {
    if (adList[index] != null) {
        return adList[index];
    }
    else {
        adList[index] = getUniqueRandomNumber();
        return adList[index];
    }

};

//convert integer date to '12 Jun 2018' format
let getFormattedDate = (dateInteger) => {
    let date = new Date(dateInteger);
    let formattedDate = date.getDate() + ' ' + month[date.getMonth()] + ' ' + date.getFullYear();
    return formattedDate;
};

//convert integer date to X time ago or formatted date if it is more than 7 days ago 
let timeSince = (date) => {

    var seconds = Math.floor((new Date() - date) / 1000);
    var interval = Math.floor(seconds / 31536000);

    if (interval > 1) {
        return getFormattedDate(date);
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
        return getFormattedDate(date);
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
        return interval > 7 ? getFormattedDate(date) : interval + " days ago";
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
        return interval + " hours ago";
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
        return interval + " minutes ago";
    }
    return Math.floor(seconds) + " seconds ago";
};

// convert time string into X time ago or formatted date if it is more than 7 days ago 
let getTimeSince = (dateString) => {
    let date = new Date(dateString);
    let integerDate = date.getTime();
    let dateSince = timeSince(integerDate);

    return dateSince;
};

export {
    getTimeSince,
    getAdId
}