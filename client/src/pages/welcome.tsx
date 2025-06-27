import { useState } from "react";
import { Scale, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLocation } from "wouter";
import type { UserDemographics } from "@shared/schema";

interface WelcomeProps {
  onStartQuiz: (demographics: UserDemographics) => void;
}

export default function Welcome({ onStartQuiz }: WelcomeProps) {
  const [, setLocation] = useLocation();
  const [demographics, setDemographics] = useState<UserDemographics>({
    age: "none",
    gender: "none",
    region: "none"
  });

  const handleStartQuiz = () => {
    // Filter out "none" values and convert to optional fields
    const filteredDemographics: UserDemographics = {
      age: demographics.age === "none" ? undefined : demographics.age,
      gender: demographics.gender === "none" ? undefined : demographics.gender,
      region: demographics.region === "none" ? undefined : demographics.region,
    };
    onStartQuiz(filteredDemographics);
    setLocation("/quiz");
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-primary rounded-full mb-6">
          <Scale className="text-white text-2xl" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
          정치 성향 밸런스 게임
        </h1>
        <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
          12개의 질문으로 알아보는 나의 정치적 성향<br />
          AI가 분석하는 개인 맞춤 해석 리포트
        </p>
      </div>

      <Card className="mb-8">
        <CardContent className="p-8">
          <h2 className="text-2xl font-semibold text-slate-800 mb-6">게임 방식</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-4">
                <span className="text-primary font-bold text-xl">1</span>
              </div>
              <h3 className="font-semibold text-slate-800 mb-2">12개 질문</h3>
              <p className="text-slate-600 text-sm">한국 사회 이슈에 대한 밸런스 게임 질문</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 rounded-full mb-4">
                <span className="text-secondary font-bold text-xl">2</span>
              </div>
              <h3 className="font-semibold text-slate-800 mb-2">양자택일</h3>
              <p className="text-slate-600 text-sm">각 질문마다 두 가지 선택지 중 선택</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-4">
                <span className="text-success font-bold text-xl">3</span>
              </div>
              <h3 className="font-semibold text-slate-800 mb-2">AI 분석</h3>
              <p className="text-slate-600 text-sm">개인 맞춤 정치 성향 해석 리포트</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-8">
        <div className="flex items-start space-x-3">
          <Shield className="text-success text-xl mt-1" />
          <div>
            <h3 className="font-semibold text-green-800 mb-2">개인정보 보호</h3>
            <p className="text-green-700 text-sm leading-relaxed">
              • 모든 데이터는 저장되지 않으며 일회성 분석에만 사용됩니다<br />
              • 이름, 이메일 등 민감 정보는 절대 수집하지 않습니다<br />
              • 선택 입력된 정보는 AI 분석 향상을 위한 용도일 뿐입니다
            </p>
          </div>
        </div>
      </div>

      <Card className="mb-8">
        <CardContent className="p-8">
          <h2 className="text-2xl font-semibold text-slate-800 mb-4">추가 정보 (선택사항)</h2>
          <p className="text-slate-600 mb-6">더 정확한 분석을 위해 아래 정보를 입력하실 수 있습니다. 입력하지 않아도 게임 진행이 가능합니다.</p>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">연령대</label>
              <Select value={demographics.age} onValueChange={(value) => setDemographics({...demographics, age: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="선택 안함" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">선택 안함</SelectItem>
                  <SelectItem value="10s">10대</SelectItem>
                  <SelectItem value="20s">20대</SelectItem>
                  <SelectItem value="30s">30대</SelectItem>
                  <SelectItem value="40s">40대</SelectItem>
                  <SelectItem value="50s">50대</SelectItem>
                  <SelectItem value="60s">60대 이상</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">성별</label>
              <Select value={demographics.gender} onValueChange={(value) => setDemographics({...demographics, gender: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="선택 안함" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">선택 안함</SelectItem>
                  <SelectItem value="male">남성</SelectItem>
                  <SelectItem value="female">여성</SelectItem>
                  <SelectItem value="other">기타</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">거주 지역</label>
              <Select value={demographics.region} onValueChange={(value) => setDemographics({...demographics, region: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="선택 안함" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">선택 안함</SelectItem>
                  <SelectItem value="seoul">서울</SelectItem>
                  <SelectItem value="busan">부산</SelectItem>
                  <SelectItem value="daegu">대구</SelectItem>
                  <SelectItem value="incheon">인천</SelectItem>
                  <SelectItem value="gwangju">광주</SelectItem>
                  <SelectItem value="daejeon">대전</SelectItem>
                  <SelectItem value="ulsan">울산</SelectItem>
                  <SelectItem value="gyeonggi">경기</SelectItem>
                  <SelectItem value="gangwon">강원</SelectItem>
                  <SelectItem value="chungbuk">충북</SelectItem>
                  <SelectItem value="chungnam">충남</SelectItem>
                  <SelectItem value="jeonbuk">전북</SelectItem>
                  <SelectItem value="jeonnam">전남</SelectItem>
                  <SelectItem value="gyeongbuk">경북</SelectItem>
                  <SelectItem value="gyeongnam">경남</SelectItem>
                  <SelectItem value="jeju">제주</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="text-center">
        <Button onClick={handleStartQuiz} className="bg-primary hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-xl text-lg">
          게임 시작하기
        </Button>
      </div>
    </div>
  );
}
