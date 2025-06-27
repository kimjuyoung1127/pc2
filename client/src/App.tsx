import { useState } from "react";
import { Switch, Route, useLocation } from "wouter";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "./lib/queryClient";
import Welcome from "@/pages/welcome";
import Quiz from "@/pages/quiz";
import Results from "@/pages/results";
import LoadingScreen from "@/components/loading-screen";
import NotFound from "@/pages/not-found";
import type { UserDemographics, QuizAnswer, PoliticalOrientation } from "@shared/schema";

function AppContent() {
  const [, setLocation] = useLocation();
  const [demographics, setDemographics] = useState<UserDemographics>({});
  const [quizAnswers, setQuizAnswers] = useState<QuizAnswer[]>([]);
  const [results, setResults] = useState<PoliticalOrientation | null>(null);

  const analysisMutation = useMutation({
    mutationFn: async (data: { answers: QuizAnswer[]; demographics: UserDemographics }) => {
      const response = await apiRequest("POST", "/api/analyze-political-orientation", data);
      return response.json();
    },
    onSuccess: (data: PoliticalOrientation) => {
      setResults(data);
    },
    onError: (error) => {
      console.error("Analysis failed:", error);
      // Show error message to user
    },
  });

  const handleStartQuiz = (userDemographics: UserDemographics) => {
    setDemographics(userDemographics);
  };

  const handleQuizComplete = (answers: QuizAnswer[]) => {
    setQuizAnswers(answers);
    analysisMutation.mutate({ answers, demographics });
  };

  const handleRestart = () => {
    setDemographics({});
    setQuizAnswers([]);
    setResults(null);
    setLocation("/");
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Switch>
        <Route path="/" component={() => <Welcome onStartQuiz={handleStartQuiz} />} />
        <Route path="/quiz" component={() => <Quiz onQuizComplete={handleQuizComplete} />} />
        <Route path="/results">
          {analysisMutation.isPending ? (
            <LoadingScreen />
          ) : (
            <Results results={results} onRestart={handleRestart} />
          )}
        </Route>
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

function App() {
  return <AppContent />;
}

export default App;
