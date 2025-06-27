const totalProblemsCompleteText = document.getElementById("totalProblems");
const easyProblemsCompleteText = document.getElementById("easyCount");
const mediumProblemsCompleteText = document.getElementById("mediumCount");
const hardProblemsCompleteText = document.getElementById("hardCount");

const progressBar = document.getElementById("goalProgressCompleted");

const timeSpentToday = document.getElementById("timeToday");
const totalTimeSpent = document.getElementById("totalTime");
const avgTimeSpent = document.getElementById("avgTime");

const dailyStreakText = document.getElementById("dailyStreak");
const bestStreakText = document.getElementById("bestStreak");

let goal = 100;

fetch("http://localhost:3000/api/cards")
  .then(res => res.json())
  .then(cards => {
    updateStats(cards);
  })
  .catch(err => {
    console.error("Failed to load cards:", err);
    container.innerHTML = "<p style='color:red;'>Error loading cards.</p>";
  });

function updateStats(data){
    let totalProblems = data.length;
    let easyCount = 0;
    let mediumCount = 0;
    let hardCount = 0;

    let timeToday = 0;
    let totalTime = 0; 
    let avgTime;
    let percentOfGoal = (totalProblems / goal) * 100;

    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1; // Add 1 to get the correct month
    const day = today.getDate();

    let streakData

    let currentStreakDate = new Date();
    let streakArr = [];

    data.sort((a, b) => new Date(b.date) - new Date(a.date));

    data.forEach(card => {
        if(card.difficulty == "Easy"){
            easyCount++;
        }else if(card.difficulty == "Medium"){
            mediumCount++;
        }else{
            hardCount++;
        }

        totalTime += parseInt(card.time)

        if(card.date == `${month}-${day}-${year}`){
            timeToday += parseInt(card.time);
        }

        const cardDate = new Date(card.date);

        cardDate.setHours(0, 0, 0, 0);
        currentStreakDate.setHours(0, 0, 0, 0);

        const oneDayMillis = 24 * 60 * 60 * 1000;
        const diffInDays = (currentStreakDate - cardDate) / oneDayMillis;
        streakArr.push(diffInDays)
    })
    streakData = findLongestStreak(streakArr);

    avgTime = totalTime / totalProblems;

    progressBar.style.width = `${percentOfGoal}%`;
    if(percentOfGoal < 30){
        progressBar.style.backgroundColor  = "#F8615C"
    }else if(percentOfGoal >= 30 && percentOfGoal < 75){
        progressBar.style.backgroundColor  = "#FAC31D"
    }else{
        progressBar.style.backgroundColor  = "#48C6C2"
    }


    totalProblemsCompleteText.innerHTML = totalProblems;

    easyProblemsCompleteText.innerHTML = easyCount;
    mediumProblemsCompleteText.innerHTML = mediumCount;
    hardProblemsCompleteText.innerHTML = hardCount;


    timeSpentToday.innerHTML = timeToday;
    totalTimeSpent.innerHTML = totalTime;
    avgTimeSpent.innerHTML = Math.round(avgTime);

    dailyStreakText.innerHTML = streakData[0];
    bestStreakText.innerHTML = streakData[1];
}

function findLongestStreak(arr){
    console.log(arr)
    arr = arr.filter((item, index) => {
                    return arr.indexOf(item) === index;
                    });
    console.log(arr)

    let longestStreak = 0;
    let currentStreak = 1;
    let lastNum = arr[0];

    let dailyStreak = arr[0] == 0 ? 1 : 0;
    let dailyStreakCheck = arr[0] == 0 ? true : false;

    for(let i = 1; i < arr.length; i++){
        if(arr[i] == lastNum + 1){
            currentStreak++;
            if(dailyStreakCheck){
                dailyStreak++;
            }
        }else{
            currentStreak = 1;
            if(dailyStreakCheck){
                dailyStreakCheck = false;
            }
        }

        longestStreak = currentStreak > longestStreak ? currentStreak : longestStreak;

        lastNum = arr[i];
    }

    if(arr.length == 1){
        if(arr[0] == 0){
            return [1, 1]
        }else{
            return [0, 1]
        }
    }
    return [dailyStreak, longestStreak]
}