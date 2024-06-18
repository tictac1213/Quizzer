


const startBtn = document.querySelector('[start]');
const takeQuizBtn = document.querySelector('[TakeQuiz]');
const nextBtn = document.querySelector('[Next]');
const warnings = document.querySelector('[warnings]');
const topic_nextBtn = document.querySelector('[NextT]');
const exitBtn = document.querySelector('[Exit]');
const topic_exitBtn = document.querySelector('[ExitT]');
const startPage = document.querySelector('#start_page');
const infoPage = document.querySelector('#info_page');
const topicsPage = document.querySelector('#topics_page');
const quizPage = document.querySelector('#quiz_page');
const AI = document.querySelector('[AI]');
const CPP = document.querySelector('[CPP]');
const DBMS = document.querySelector('[DBMS]');
const DataScience = document.querySelector('[DataScience]');
const RDBMS = document.querySelector('[RDBMS]');
const Js = document.querySelector('[Js]');
const MySql = document.querySelector('[MySql]');
const BasicDSA_I = document.querySelector('[BasicDSA-I]');
const BasicDSA_II = document.querySelector('[BasicDSA-II]');
const clock = document.querySelector('#Timer');
const quesNo = document.querySelector('#quesNo');
const question = document.querySelector('#question');
const option1 = document.querySelector('#option1');
const option2 = document.querySelector('#option2');
const option3 = document.querySelector('#option3');
const option4 = document.querySelector('#option4');

const topics = {
    'AI': AI,
    'CPP': CPP,
    'DBMS': DBMS,
    'DataScience': DataScience,
    'RDBMS': RDBMS,
    'Js': Js,
    'MySql': MySql,
    'BasicDSA-I': BasicDSA_I,
    'BasicDSA-II': BasicDSA_II
};

// const currPage = startPage;
const selection = "";
let topic;
function startQuiz() {
    startPage.style.display = 'none';
    topicsPage.style.display = 'flex';
    // currPage = topicsPage;
}
// startQuiz();
function exitQuiz_Topic(){
    topicsPage.style.display ='none';
    startPage.style.display = 'block';
    // currPage = startPage;
    if(topic){
        topics[topic].style.backgroundColor = 'white';
        topic="";
    }
}
function exitQuiz_Info(){
    infoPage.style.display ='none';
    startPage.style.display = 'block';
    if(topic){
        topics[topic].style.backgroundColor = 'white';
        topic="";
    }
    // currPage = startPage;
}
let questions = "";

async function getQuestions(topic){
    const url = `https://quizzbackend.onrender.com/api/questions/` + topic;
    
    await fetch(url).then(response => response.json())
    .then(data => {
        questions = data;
        
    })
    .catch(error => {
        // Handle any errors
        questions = "";
        console.error('Error: Cant fetch Questions', error);
    });
}

function continue_Topic(){
    if(topic){
        topicsPage.style.display ='none';
        infoPage.style.display = 'flex';
    }
    else{
        warnings.style.display='block';
        
        
    }
    // currPage = startPage;
}

async function continue_Info() {
    if (questions) {
        infoPage.style.display = 'none';
        quizPage.style.display = 'flex';
        displayQuestion();
    } else {
        try {
            await getQuestions(topic);

            if (questions) {
                infoPage.style.display = 'none';
                quizPage.style.display = 'flex';
                displayQuestion();
            } else {
                console.error('Questions not fetched successfully.');
            }
        } catch (error) {
            console.error('Error fetching questions:', error);
        }
    }
}



function toggleSelection(val){
    console.log(val);
    
    for( key in topics){
        if(key === val){
            topics[key].style.backgroundColor = 'yellow'
        }
        else{
            topics[key].style.backgroundColor = 'white'
        }
    }
    warnings.style.display='none';
    topic = val;
    getQuestions(topic);
}

let totalNo = 1;
let questionNo = -1;

let timer; // global variable for the timer

function displayQuestion() {
    explanationDiv.classList.add('hidden');
    resetOptionsBackground();
    input_flag = 1;
    questionNo++;
    resetTimer(); // Reset timer for each new question
    startTimer(30); // Start timer for 30 seconds
    quesNo.innerHTML = totalNo;
    const currQuestion = questions[questionNo];
    if (currQuestion.Question) {
        question.innerHTML = currQuestion.Question;
        const codeBlock = question.querySelector('div');
        if(codeBlock){
            // console.log(codeBlock);
            codeBlock.classList.add('highlight','max-w-[95%]','overflow-scroll', 'mt-4', 'text-sm', 'max-h-[80%]');
            // Prism.highlightAllUnder(codeBlock);
        }

        question.innerHTML = currQuestion.Question;
        option1.innerHTML = currQuestion.Options[0];
        option2.innerHTML = currQuestion.Options[1];
        option3.innerHTML = currQuestion.Options[2];
        option4.innerHTML = currQuestion.Options[3];
        totalNo++;
    } else {
        displayQuestion();
    }
}

function startTimer(duration) {
    let timeLeft = duration;
    timer = setInterval(function() {
        clock.innerHTML = timeLeft + ' seconds';
        timeLeft--;

        if (timeLeft < 0 || !input_flag) {
            clearInterval(timer);
            // displayNext(); // Auto display next question or handle timeout
            input_flag = "";
        }
    }, 1000);
}
let input_flag = 0;
function resetTimer() {
    clearInterval(timer);
    clock.innerHTML = '30 seconds';
}

const explanationDiv = document.querySelector('[Explaination]');
function selectAnswer(val) {
   if(input_flag){
    const currQuestion = questions[questionNo];
    const correctAnswer = currQuestion.Answer.split(" ")[1];
    
    // console.log('option' + (val-'a'+1));
    const map ={
        'a' : 1,
        'b' : 2,
        'c' : 3,
        'd' : 4,
    }
    console.log(val, " ", correctAnswer[0]);
    if (val === correctAnswer[0]) {
        document.getElementById('option' + map[val]).style.backgroundColor = 'lightgreen';
        console.log("Correct");
        
    } else {
        document.getElementById('option' + map[val]).style.backgroundColor = 'lightcoral';
        console.log("Incorrect");
    }

    explanationDiv.classList.remove('hidden');
    explanationDiv.querySelector('[expContent]').innerHTML = currQuestion.Answer;
    input_flag = "";
   }
}

function displayNext() {
    clearInterval(timer); 
    resetOptionsBackground(); 
    displayQuestion();
}

function resetOptionsBackground() {
    option1.style.backgroundColor = 'white';
    option2.style.backgroundColor = 'white';
    option3.style.backgroundColor = 'white';
    option4.style.backgroundColor = 'white';
}


    function displayNext(){
        displayQuestion();
        // console.log("questionNo");
        
    }
