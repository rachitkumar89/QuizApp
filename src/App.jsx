import { useState } from 'react';
import QuestionCard from "./components/QuestionCard";
import { questions } from "./data/questions";

function App(){
  const [currentQuestion, setCurrentQuestion]= useState(0);
  const [selectedAnswer, setSelectAnswer] = useState(null);
  const [score, setScore]= useState(0);
  const [isFinished, setIsFinished]= useState(false);
  const [showFeedback, setShowFeedback]= useState(false);

  const handleAnswer=(Option)=>{
    if (showFeedback) return ;
    
    setSelectAnswer(Option);
    setShowFeedback(true);

    if(Option === questions[currentQuestion].correctAnswer){

      setScore(score + 1);
    }
  };

  const goNext=()=>{
    if (currentQuestion + 1 < questions.length){
      setCurrentQuestion(currentQuestion+1);
      setSelectAnswer(null);
      setShowFeedback(false);

    }
    else{
      setIsFinished(true);
    }
  };
  const restartQuiz=()=>{
    setCurrentQuestion(0);
    setScore(0);
    setSelectAnswer(null);
    setShowFeedback(false);
    setIsFinished(false);
  }

  const calculateProgress=()=>{
    if(isFinished) return 100;
    const baseProgress =(currentQuestion / questions.length)*100;
    const questionprogress=selectedAnswer ? (1/questions.length)* 100 : 0;
    return baseProgress + questionprogress;
  }


  return <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center">
    <div className="text-center mb-8">
      <h1 className="text-4xl font-bold text-yellow-600 mb-2">Quiz</h1>
    <p className="text-gray-400">Test your knowledge</p>
    </div>

    <div className='w-full max-w-xl'>
      <div className='bg-gray-700 h-3 rounded-full overflow-hidden'>
        <div  className='h-full bg-gradient-to-r from-rose-500 to-yellow-600  duration-500 ease-out transition-all' style={{width: `${calculateProgress()}%`}}></div>
         
      </div>

    </div>
    {!isFinished ? (
      <>
      <QuestionCard
        showFeedback={showFeedback}
        onAnswer={handleAnswer} 
        data={questions[currentQuestion]}
        current={currentQuestion}
        total={questions.length}
        selected={selectedAnswer}
        />
        <div className='mt-6 min-h-[60px]'>
          {showFeedback && (
            <button className='bg-gradient-to-r from-rose-800 to-yellow-600 py-3 px-6 rounded-lg font-medium shadow-lg cursor-pointer' onClick={goNext}>
              {currentQuestion + 1 < questions.length ? "Continue" : "See Results"}
            </button>
          )}
        </div>
        </>
    ):(
      <div className='text-center'>
        <h2 className='text-3x1 font-bold mt-3'>Quiz Completed</h2>
        <p className='text-xl'>You Scored <span>{score}</span> out of{" "} <span className='font-bold'>{questions.length}</span> and it is {" "} {Math.round((score / questions.length)*100)}</p>
        <button className='bg-gradient-to-r from-rose-600 to-yellow-600 py-3 px-6 rounded-lg font-medium shadow-lg cursor-pointer mt-4' onClick={restartQuiz}>Restart Quiz</button>      
      </div>
    )
    }
    </div>
    
};
export default App;