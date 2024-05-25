  // Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCDAaN_pWBvGp9hcCVZl-kdb_wyEl5OtaA",
  authDomain: "js-calculator-486c1.firebaseapp.com",
  databaseURL: "https://js-calculator-486c1-default-rtdb.firebaseio.com",
  projectId: "js-calculator-486c1",
  storageBucket: "js-calculator-486c1.appspot.com",
  messagingSenderId: "722695056202",
  appId: "1:722695056202:web:a21b9f84dc53b40d3cefb3",
  measurementId: "G-4BMS4EE7G7"
};

// Initialize Firebase
var app = firebase.initializeApp(firebaseConfig);
var questions = [
    {
      question: "Q1 : HTML Stands for",
      option1: "Hyper Text Markup Language",
      option2: "Hyper Tech Markup Language",
      option3: "Hyper Touch Markup Language",
      corrAnswer: "Hyper Text Markup Language",
    },
    {
      question: "Q2 : CSS Stands for",
      option1: "Cascoding Style Sheets",
      option2: "Cascading Style Sheets",
      option3: "Cascating Style Sheets",
      corrAnswer: "Cascading Style Sheets",
    },
    {
      question: "Q3 : Which tag is used for most large heading",
      option1: "<h6>",
      option2: "<h2>",
      option3: "<h1>",
      corrAnswer: "<h1>",
    },
    {
      question: "Q4 : Which tag is used to make element unique ",
      option1: "id",
      option2: "class  ",
      option3: "label",
      corrAnswer: "id",
    },
    {
      question: "Q5 : Any element assigned with id, can be get in css ",
      option1: "by # tag",
      option2: "by @ tag",
      option3: "by & tag",
      corrAnswer: "by # tag",
    },
    {
      question: "Q6 : CSS can be used with ______ methods ",
      option1: "8",
      option2: "3",
      option3: "4",
      corrAnswer: "3",
    },
    {
      question: "Q7 : In JS variable types are ____________ ",
      option1: "6",
      option2: "3",
      option3: "8",
      corrAnswer: "8",
    },
    {
      question: "Q8 : In array we can use key name and value ",
      option1: "True",
      option2: "False",
      option3: "None of above",
      corrAnswer: "False",
    },
    {
      question: "Q9 : toFixed() is used to define length of decimal ",
      option1: "True",
      option2: "False",
      option3: "None of above",
      corrAnswer: "True",
    },
    {
      question: "Q10 : push() method is used to add element in the start of array ",
      option1: "True",
      option2: "False",
      option3: "None of above",
      corrAnswer: "False",
    },
  ];


var ques = document.getElementById("ques");
var opt1 = document.getElementById("opt1");
var opt2 = document.getElementById("opt2");
var opt3 = document.getElementById("opt3");
var btn = document.getElementById("btn");
var timer = document.getElementById(`timer`)
var index = 0;
var score = 0;
var min = 1;
var sec = 29;

setInterval(function(){
    timer.innerHTML = `${min}:${sec}`;
    sec--;
    // sec=59;
    if(sec<0){
        min--;
        // min = 1;
        sec = 59;
        if(min<0){
            min = 1;
            sec = 59
            nextQuestion();
        }
    }
},1000);




function saveQuestionData(index, userAnswer, isCorrect) {
  var userId = "user_" + new Date().getTime();
  var questionData = {
      question: questions[index].question,
      correctAnswer: questions[index].corrAnswer,
      userAnswer: userAnswer,
      isCorrect: isCorrect,
      timestamp: new Date().toISOString()
  };
  firebase.database().ref('quizResults/' + userId + '/questions/' + index).set(questionData);
}

function nextQuestion() {
  var getOptions = document.getElementsByName("option");
  var selectedAns = null;
  var isCorrect = false;

  for (var i = 0; i < getOptions.length; i++) {
      if (getOptions[i].checked) {
          selectedAns = getOptions[i].value;
          var selectedOpt = questions[index][`option${selectedAns}`];
          var corrAns = questions[index][`corrAnswer`];

          if (selectedOpt === corrAns) {
              isCorrect = true;
              score++;
          }
          getOptions[i].checked = false;
          break;
      }
  }

  // Save question data to Firebase
  saveQuestionData(index, selectedAns ? questions[index][`option${selectedAns}`] : null, isCorrect);

  if (index >= questions.length - 1) {
      Swal.fire({
          title: "Good job!",
          text: ((score / questions.length) * 100).toFixed(2),
          icon: "success"
      });
  } else {
      index++;
      loadQuestion();
  }
}

function loadQuestion() {
  if (index < questions.length) {
      ques.innerText = questions[index].question;
      opt1.innerText = questions[index].option1;
      opt2.innerText = questions[index].option2;
      opt3.innerText = questions[index].option3;
      btn.disabled = true;
      min = 1;
      sec = 59;
  }
}

function target() {
  btn.disabled = false;
}

document.addEventListener("DOMContentLoaded", function() {
  loadQuestion();
});



// -------------------------------------------------- 



