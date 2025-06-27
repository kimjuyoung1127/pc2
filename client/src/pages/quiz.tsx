import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLocation } from "wouter";
import { questions } from "@/lib/questions";
import type { QuizAnswer } from "@shared/schema";

interface QuizProps {
  onQuizComplete: (answers: QuizAnswer[]) => void;
}

export default function Quiz({ onQuizComplete }: QuizProps) {
  const [, setLocation] = useLocation();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswer[]>([]);
  const [selectedOption, setSelectedOption] = useState<'A' | 'B' | null>(null);

  const question = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  useEffect(() => {
    // Reset selection when question changes
    setSelectedOption(null);
  }, [currentQuestion]);

  const handleOptionSelect = (option: 'A' | 'B') => {
    setSelectedOption(option);
    
    const answer: QuizAnswer = {
      questionIndex: currentQuestion,
      selectedOption: option,
      weight: option === 'A' ? question.leftWeight : question.rightWeight
    };

    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answer;
    setAnswers(newAnswers);

    // Auto-advance after selection
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        onQuizComplete(newAnswers);
        setLocation("/results");
      }
    }, 500);
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1 && selectedOption) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-slate-600">진행률</span>
          <span className="text-sm font-medium text-slate-600">
            {currentQuestion + 1} / {questions.length}
          </span>
        </div>
        <Progress value={progress} className="h-3" />
      </div>

      {/* Question Card */}
      <Card className="mb-8">
        <CardContent className="p-8">
          <div className="text-center mb-8">
            <span className="inline-block bg-secondary/10 text-secondary px-4 py-2 rounded-full text-sm font-medium mb-4">
              {question.category}
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-800 leading-tight">
              다음 두 가지 중 어느 것에 더 동의하시나요?
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Option A */}
            <button
              onClick={() => handleOptionSelect('A')}
              className={`group bg-slate-50 hover:bg-blue-50 hover:border-primary border-2 rounded-xl p-6 text-left transition-all duration-200 transform hover:scale-105 hover:shadow-lg ${
                selectedOption === 'A' ? 'border-primary bg-blue-50' : 'border-slate-200'
              }`}
            >
              <div className="flex items-start space-x-4">
                <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${
                  selectedOption === 'A' ? 'bg-primary' : 'bg-blue-100 group-hover:bg-primary'
                }`}>
                  <span className={`font-bold text-lg ${
                    selectedOption === 'A' ? 'text-white' : 'text-primary group-hover:text-white'
                  }`}>A</span>
                </div>
                <div className="flex-1">
                  <p className="text-slate-800 font-medium leading-relaxed">
                    {question.optionA}
                  </p>
                </div>
              </div>
            </button>

            {/* Option B */}
            <button
              onClick={() => handleOptionSelect('B')}
              className={`group bg-slate-50 hover:bg-purple-50 hover:border-secondary border-2 rounded-xl p-6 text-left transition-all duration-200 transform hover:scale-105 hover:shadow-lg ${
                selectedOption === 'B' ? 'border-secondary bg-purple-50' : 'border-slate-200'
              }`}
            >
              <div className="flex items-start space-x-4">
                <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${
                  selectedOption === 'B' ? 'bg-secondary' : 'bg-purple-100 group-hover:bg-secondary'
                }`}>
                  <span className={`font-bold text-lg ${
                    selectedOption === 'B' ? 'text-white' : 'text-secondary group-hover:text-white'
                  }`}>B</span>
                </div>
                <div className="flex-1">
                  <p className="text-slate-800 font-medium leading-relaxed">
                    {question.optionB}
                  </p>
                </div>
              </div>
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <Button
          variant="ghost"
          onClick={handlePrevious}
          disabled={currentQuestion === 0}
          className="flex items-center space-x-2"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>이전</span>
        </Button>
        
        <div className="flex space-x-2">
          {questions.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                index < currentQuestion ? 'bg-primary' : 
                index === currentQuestion ? 'bg-primary/50' : 'bg-slate-200'
              }`}
            />
          ))}
        </div>
        
        <Button
          variant="ghost"
          onClick={handleNext}
          disabled={!selectedOption}
          className="flex items-center space-x-2"
        >
          <span>다음</span>
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
