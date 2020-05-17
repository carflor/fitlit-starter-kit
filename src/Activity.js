class Activity {
  constructor(activityData) {
    this.activityData = activityData;
    this.dataPerUser = this.grabDataPerUser()
  }

  grabDataPerUser() {
    let result = this.activityData.reduce((acc, activity) => {
      if (!acc[activity.userID]) {
        acc[activity.userID] = []
      }
      acc[activity.userID].push(activity)
      return acc
    }, {})
    return result
  }

  // SINGLE USER SECTION

  getMilesByDate(allData, user, date) {
    const filtered = allData.filter(data => data.userID === user.id)
    const dateEntry = filtered.find(data => data.date === date)
    const userMile = 5280/user.strideLength
    const userDistance = dateEntry.numSteps/userMile
    return Number(userDistance.toFixed(2))
  }

  getUserMinutesActive(allData, user, date) {
    const filtered = allData.filter(data => data.userID === user.id)
    const dateEntry = filtered.find(data => data.date === date)
    return dateEntry.minutesActive
  }

  getUserAvgMinActiveByWeek(allData, user, date) {
    const filtered = allData.filter(data => data.userID === user.id)
    const finder = filtered.find(data => data.date === date)
    const index = filtered.indexOf(finder)
    const weekData = filtered.slice(index - 6, index + 1)
    const avgMinActive = weekData.reduce((acc, data) => {
      acc += data.minutesActive
      return acc
    }, 0) / weekData.length
    return Math.floor(avgMinActive)
  }

  getUserStepGoalAchievement(allData, user, date) {
    const filtered = allData.filter(data => data.userID === user.id)
    const finder = filtered.find(data => data.date === date)
    if (finder.numSteps < user.dailyStepGoal) {
      return `Epic Fail. You did not meet your step goal!`
    } else {
      return `Nice job! You completed your step goal for today!`
    }
  }
  
  getUserStepGoalWins(allData, user) {
    const filtered = allData.filter(data => data.userID === user.id)
    const dateWins = filtered.filter(data => data.numSteps > user.dailyStepGoal).map(data => {return data.date})
    return dateWins
  }

  getUserStairRecord(allData, user) {
    const filtered = allData.filter(data => data.userID === user.id)
    const sorted = filtered.sort((a, b) => b.flightsOfStairs - a.flightsOfStairs)[0]
    return sorted.flightsOfStairs
    // does this require the date to be displayed for the record?
  }

  getAllUserAvgData(allData, date) {
    // create helper function that is generic avg template fn
    // and we pass in the three diff measures
    const dateData = allData.filter(data => data.date === date)
    console.log(dateData)
    const results = []
    const avgSteps = dateData.reduce((acc, user) => {
      acc += user.numSteps
      return acc
    }, 0) / dateData.length
    results.push(Math.floor(avgSteps))
    const avgMinActive = dateData.reduce((acc, user) => {
      acc += user.minutesActive
      return acc
    }, 0) / dateData.length
    results.push(Math.floor(avgMinActive))
    const avgStairs = dateData.reduce((acc, user) => {
      acc += user.flightsOfStairs
      return acc
    }, 0) / dateData.length
    results.push(Math.floor(avgStairs))
    console.log(results)
    return results
  }

//   For all users, what is the average number of:

//  stairs climbed for a specified date
//  steps taken for a specific date
//  minutes active for a specific date
  
}

if (typeof module !== 'undefined') {
  module.exports = Activity;
}