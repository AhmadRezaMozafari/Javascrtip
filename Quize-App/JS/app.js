const questionContainer=document.getElementById('question-container');
const questionHolder=document.getElementById('question');
const answerButtonsElements=document.getElementById('btn-holder');
const infoSection=document.getElementById('info');
const startButton=document.getElementById('start-btn');
const nextButton=document.getElementById('next-btn');

let shuffledQuestion,questionIndex;

const startGame=()=>{
    startButton.classList.add('hide');
    infoSection.classList.add('hide');
    questionContainer.classList.remove('hide');
    shuffledQuestion=questions.sort(()=>Math.random()-0.5);
    questionIndex=0;
    showNextQuestion();
};


const showNextQuestion=()=>{
    resetState();
    showQuestion(shuffledQuestion[questionIndex]);
}


const showQuestion=(question)=>{
    questionHolder.innerText=question.question;
    question.answers.forEach(answer=>{
        const button=document.createElement('button');
        button.classList.add('btn');
        button.innerText=answer.text;
        if(answer.correct){
            button.dataset.correct=answer.correct;
        };
        button.addEventListener('click',selectAnswer);
        answerButtonsElements.appendChild(button);
    })
}


const resetState=()=>{
    nextButton.classList.add('hide');
    clearStatusClass(document.body);
    while(answerButtonsElements.firstChild){
        answerButtonsElements.removeChild(answerButtonsElements.firstChild);
    }
}

const selectAnswer=(e)=>{
    const selectedAnswer=e.target;
    const correct=selectedAnswer.dataset.correct;
    setStatusClass(document.body,correct);
    Array.from(answerButtonsElements.children).forEach(button=>{
        setStatusClass(button,button.dataset.correct);
    });
    if(shuffledQuestion.length>questionIndex+1){
        nextButton.classList.remove('hide');
    }else{
        startButton.innerText='شروع مجدد';
        startButton.classList.remove('hide');
    }

}

const setStatusClass=(element,correct)=>{
    clearStatusClass(element)
    if(correct){
        element.classList.add('correct');
    }else{
        element.classList.add('wrong')
    }

}

const clearStatusClass=(element)=>{
    element.classList.remove('correct');
    element.classList.remove('wrong');
}


const questions=[
    {
        question:'جاوا اسکریپت چند سال سن دارد؟',
        answers:[
            {text:25 , correct:true},
            {text:19 , correct:false},
            {text:28 , correct:false},
            {text:20 , correct:false}
        ]
    },
    {
        question:'اولین نامی که برای جاوا اسکریپت انتخاب شد چه بود؟',
        answers:[
            {text:'JavaScript', correct:false},
            {text:'LiveScript', correct:false},
            {text:'Mocha', correct:true},
            {text:'هیچکدام', correct:false}
        ]
    },
    {
        question:'برای نشان دادن یک متغیر بصورت تهی آنرا به چه صورت تعریف میکنیم؟',
        answers:[
            
            {text:'undefined' ,correct:false},
            {text:'false' ,correct:false},
            {text:'null' ,correct:true},
            {text:'به آن مقدار نمی دهیم.' ,correct:false}
            
        ]
    }
]


startButton.addEventListener('click',startGame);
nextButton.addEventListener('click',()=>{
    questionIndex++;
    showNextQuestion();
})