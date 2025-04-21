const msInMonth = 2592000000;

function timeDifference(previousTime) {
    const currentTime = Date.now(); 
    const difference = currentTime - previousTime;

    return difference;
}

module.exports = { timeDifference }