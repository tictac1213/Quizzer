


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
function continue_Info(){
    infoPage.style.display ='none';
    if(questions){
        quizPage.style.display = 'flex';
        displayQuestion();

    }
    // currPage = startPage;
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

function displayQuestion(){
    questionNo++;
    quesNo.textContent = totalNo;
    const currQuestion = questions[questionNo];
    if(currQuestion.Question){
        // const startTagIndex = currQuestion.Question.indexOf("<");

        question.innerHTML = currQuestion.Question;
        const codeBlock = question.querySelector('div');
        if(codeBlock){
            // console.log(codeBlock);
            codeBlock.classList.add('highlight','max-w-[95%]','overflow-scroll', 'mt-4', 'text-sm','max-h-[50%]');
            // Prism.highlightAllUnder(codeBlock);
        }
        option1.textContent = currQuestion.Options[0];
        option2.textContent = currQuestion.Options[1];
        option3.textContent = currQuestion.Options[2];
        option4.textContent = currQuestion.Options[3];
        totalNo++;
    }
    else{
        // questionNo++;
        display(questionNo);
    }

}

    
    function selectAnswer(val){
        const currQuestion = questions[questionNo];
        const correctAnswer = currQuestion.Answer.split(" ")[1];
        console.log(val , " ", correctAnswer);
        
        if(val === correctAnswer[0] ){
            console.log("Correct");
            
        }
        else{
            console.log("Incorrect");
        }
        
    }

    function displayNext(){
        displayQuestion();
        // console.log("questionNo");
        
    }
