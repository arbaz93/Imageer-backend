const msInMonth = 2592000000;

function timeDifference(previousTime) {
    const currentTime = Date.now(); 
    const difference = currentTime - previousTime;

    return difference;
}

function monthIsPassedSinceUpload(previousTime) {
    const isMonthPassed = timeDifference(previousTime) >= msInMonth;
    return isMonthPassed;
}
module.exports = { timeDifference, monthIsPassedSinceUpload }