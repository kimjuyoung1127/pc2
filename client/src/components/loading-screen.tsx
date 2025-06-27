import { Brain, Loader2 } from "lucide-react";

export default function LoadingScreen() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="text-center py-20">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-primary to-secondary rounded-full mb-8 animate-pulse">
          <Brain className="text-white text-2xl" />
        </div>
        <h2 className="text-3xl font-bold text-slate-800 mb-4">AI 분석 중...</h2>
        <p className="text-xl text-slate-600 mb-8">
          당신의 정치 성향을 분석하고 있습니다
        </p>
        <div className="flex justify-center">
          <Loader2 className="animate-spin h-12 w-12 text-primary" />
        </div>
        <p className="text-sm text-slate-500 mt-8">
          잠시만 기다려주세요. 분석에는 몇 초가 소요됩니다.
        </p>
      </div>
    </div>
  );
}
