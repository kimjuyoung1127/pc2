import { PieChart, Share2, RotateCcw, Wallet, Shield, Users, GraduationCap, Building, Leaf } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import type { PoliticalOrientation } from "@shared/schema";

interface ResultsProps {
  results: PoliticalOrientation | null;
  onRestart: () => void;
}

const categoryIcons = {
  "경제 / 복지": Wallet,
  "안보 / 외교": Shield,
  "사회 / 젠더": Users,
  "교육 / 세대": GraduationCap,
  "시장 / 대기업": Building,
  "환경 / 기후": Leaf,
};

const orientationColors = {
  "진보": "text-red-600 bg-red-50",
  "중도": "text-yellow-600 bg-yellow-50",
  "보수": "text-blue-600 bg-blue-50",
};

export default function Results({ results, onRestart }: ResultsProps) {
  const [, setLocation] = useLocation();

  if (!results) {
    setLocation("/");
    return null;
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: '정치 성향 밸런스 게임',
          text: `나의 정치 성향: ${results.orientation}`,
          url: window.location.origin,
        });
      } catch (error) {
        console.log('Share failed:', error);
      }
    } else {
      // Fallback for browsers that don't support Web Share API
      const text = `나의 정치 성향: ${results.orientation}\n${window.location.origin}`;
      navigator.clipboard.writeText(text);
      alert('링크가 클립보드에 복사되었습니다!');
    }
  };

  const getOrientationColor = (orientation: string) => {
    if (orientation.includes("진보")) return orientationColors["진보"];
    if (orientation.includes("보수")) return orientationColors["보수"];
    return orientationColors["중도"];
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Results Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-primary to-secondary rounded-full mb-6">
          <PieChart className="text-white text-2xl" />
        </div>
        <h1 className="text-4xl font-bold text-slate-800 mb-4">분석 결과</h1>
        <p className="text-xl text-slate-600">당신의 정치 성향 분석 리포트</p>
      </div>

      {/* Political Orientation Result */}
      <Card className="mb-8">
        <CardContent className="p-8">
          <div className="text-center mb-8">
            <div className="inline-block bg-gradient-to-r from-primary to-secondary text-white px-6 py-3 rounded-full text-lg font-semibold mb-4">
              {results.orientation}
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-4">
              당신은 <span className="text-primary">{results.orientation}</span>입니다
            </h2>
          </div>

          {/* Political Spectrum Visualization */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-slate-600">진보</span>
              <span className="text-sm font-medium text-slate-600">중도</span>
              <span className="text-sm font-medium text-slate-600">보수</span>
            </div>
            <div className="relative">
              <div className="w-full h-4 bg-gradient-to-r from-red-400 via-yellow-400 to-blue-400 rounded-full"></div>
              <div 
                className="absolute top-0 w-6 h-6 bg-white border-4 border-slate-700 rounded-full -mt-1 transform -translate-x-1/2"
                style={{ 
                  left: `${50 + (results.score * 30)}%` 
                }}
              ></div>
            </div>
          </div>

          {/* Score Breakdown */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-red-50 rounded-xl">
              <div className="text-2xl font-bold text-red-600 mb-1">{results.progressivePercentage}%</div>
              <div className="text-sm font-medium text-red-700">진보 성향</div>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-xl">
              <div className="text-2xl font-bold text-yellow-600 mb-1">{results.moderatePercentage}%</div>
              <div className="text-sm font-medium text-yellow-700">중도 성향</div>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-xl">
              <div className="text-2xl font-bold text-blue-600 mb-1">{results.conservativePercentage}%</div>
              <div className="text-sm font-medium text-blue-700">보수 성향</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* AI Analysis Report */}
      <Card className="mb-8">
        <CardContent className="p-8">
          <div className="flex items-center space-x-3 mb-6">
            <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center">
              <PieChart className="text-white text-lg" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-800">AI 분석 리포트</h3>
              <p className="text-slate-600 text-sm">개인 맞춤 정치 성향 해석</p>
            </div>
          </div>
          
          <div className="bg-slate-50 rounded-xl p-6">
            <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">
              {results.aiAnalysis}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Category Analysis */}
      {results.categoryAnalysis.length > 0 && (
        <Card className="mb-8">
          <CardContent className="p-8">
            <h3 className="text-xl font-bold text-slate-800 mb-6">분야별 성향 분석</h3>
            <div className="space-y-6">
              {results.categoryAnalysis.map((category, index) => {
                const IconComponent = categoryIcons[category.category as keyof typeof categoryIcons] || Wallet;
                const colorClass = getOrientationColor(category.orientation);
                
                return (
                  <div key={index} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <IconComponent className="text-primary w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-800">{category.category}</h4>
                        <p className="text-sm text-slate-600">{category.description}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`text-lg font-bold ${colorClass.split(' ')[0]}`}>
                        {category.orientation}
                      </div>
                      <div className="w-24 h-2 bg-slate-200 rounded-full mt-1">
                        <div 
                          className={`h-full rounded-full ${
                            category.orientation.includes('진보') ? 'bg-red-500' :
                            category.orientation.includes('보수') ? 'bg-blue-500' : 'bg-yellow-500'
                          }`}
                          style={{ width: `${category.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Share Results */}
      <Card className="mb-8">
        <CardContent className="p-8">
          <h3 className="text-xl font-bold text-slate-800 mb-6">결과 공유하기</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="text-center p-6 border-2 border-dashed border-slate-300 rounded-xl">
              <Share2 className="text-slate-400 text-3xl mb-4 mx-auto" />
              <h4 className="font-semibold text-slate-800 mb-2">결과 공유</h4>
              <p className="text-sm text-slate-600 mb-4">친구들과 함께 테스트해보세요</p>
              <Button onClick={handleShare} className="bg-primary hover:bg-blue-700 text-white px-6 py-2 rounded-lg">
                공유하기
              </Button>
            </div>
            <div className="text-center p-6 border-2 border-dashed border-slate-300 rounded-xl">
              <RotateCcw className="text-slate-400 text-3xl mb-4 mx-auto" />
              <h4 className="font-semibold text-slate-800 mb-2">다시 시작</h4>
              <p className="text-sm text-slate-600 mb-4">새로운 분석을 받아보세요</p>
              <Button onClick={onRestart} className="bg-secondary hover:bg-purple-700 text-white px-6 py-2 rounded-lg">
                다시 시작
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="text-center">
        <Button 
          onClick={onRestart}
          variant="outline" 
          className="mr-4"
        >
          다시 시작하기
        </Button>
        <Button onClick={handleShare} className="bg-primary hover:bg-blue-700">
          다른 사람과 공유하기
        </Button>
      </div>
    </div>
  );
}
