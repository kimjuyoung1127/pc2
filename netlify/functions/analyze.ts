import type { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";
import { GoogleGenAI } from "@google/genai";
import { quizResultRequestSchema, type QuizAnswer, type UserDemographics } from "../../shared/schema";

const ai = new GoogleGenAI({ 
  apiKey: process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY || "" 
});

export interface AnalysisResult {
  orientation: string;
  score: number;
  progressivePercentage: number;
  moderatePercentage: number;
  conservativePercentage: number;
  aiAnalysis: string;
  categoryAnalysis: Array<{
    category: string;
    orientation: string;
    description: string;
    percentage: number;
  }>;
}

async function analyzePoliticalOrientation(
  answers: QuizAnswer[],
  demographics: UserDemographics
): Promise<AnalysisResult> {
  try {
    // Calculate basic scores
    const totalScore = answers.reduce((sum, answer) => sum + answer.weight, 0);
    const normalizedScore = totalScore / answers.length;
    
    // Determine orientation
    let orientation: string;
    if (normalizedScore < -0.3) {
      orientation = "보수 성향";
    } else if (normalizedScore > 0.3) {
      orientation = "진보 성향";
    } else {
      orientation = "중도 성향";
    }

    // Calculate percentages
    const progressivePercentage = Math.max(0, Math.min(100, (normalizedScore + 1) * 50));
    const conservativePercentage = Math.max(0, Math.min(100, (1 - normalizedScore) * 50));
    const moderatePercentage = 100 - progressivePercentage - conservativePercentage;

    // Prepare context for AI analysis
    const answerSummary = answers.map((answer, index) => 
      `질문 ${index + 1}: ${answer.selectedOption} 선택 (가중치: ${answer.weight})`
    ).join('\n');

    const demographicInfo = [
      demographics.age && `연령대: ${demographics.age}`,
      demographics.gender && `성별: ${demographics.gender}`,
      demographics.region && `지역: ${demographics.region}`
    ].filter(Boolean).join(', ') || '미입력';

    const systemPrompt = `당신은 한국의 정치 성향을 분석하는 전문가입니다. 
사용자의 정치 성향 밸런스 게임 결과를 바탕으로 개인 맞춤 분석 리포트를 작성해주세요.

분석 기준:
- 진보 성향: 정부 개입 선호, 사회 변화 지지, 평등 중시
- 보수 성향: 시장 자율 선호, 전통 가치 중시, 안정성 추구
- 중도 성향: 균형잡힌 접근, 실용적 해결책 선호

응답은 반드시 JSON 형식으로 작성하고, 다음 구조를 따라주세요:
{
  "analysis": "상세한 정치 성향 분석 (200-300자)",
  "categoryAnalysis": [
    {
      "category": "경제 / 복지",
      "orientation": "진보/중도/보수",
      "description": "해당 분야 성향 설명",
      "percentage": 숫자값
    }
  ]
}`;

    const userPrompt = `사용자 정보:
- 인구통계학적 정보: ${demographicInfo}
- 전체 성향: ${orientation}
- 정규화 점수: ${normalizedScore.toFixed(2)}

답변 내역:
${answerSummary}

이 정보를 바탕으로 한국어로 개인 맞춤 정치 성향 분석을 제공해주세요.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-pro",
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: "application/json",
        responseSchema: {
          type: "object",
          properties: {
            analysis: { type: "string" },
            categoryAnalysis: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  category: { type: "string" },
                  orientation: { type: "string" },
                  description: { type: "string" },
                  percentage: { type: "number" }
                },
                required: ["category", "orientation", "description", "percentage"]
              }
            }
          },
          required: ["analysis", "categoryAnalysis"]
        }
      },
      contents: userPrompt,
    });

    const aiResult = JSON.parse(response.text || "{}");

    return {
      orientation,
      score: normalizedScore,
      progressivePercentage: Math.round(progressivePercentage),
      moderatePercentage: Math.round(moderatePercentage),
      conservativePercentage: Math.round(conservativePercentage),
      aiAnalysis: aiResult.analysis || "분석 결과를 불러올 수 없습니다.",
      categoryAnalysis: aiResult.categoryAnalysis || []
    };

  } catch (error) {
    console.error("Failed to analyze political orientation:", error);
    
    // Fallback analysis
    const totalScore = answers.reduce((sum, answer) => sum + answer.weight, 0);
    const normalizedScore = totalScore / answers.length;
    
    let orientation: string;
    if (normalizedScore < -0.3) {
      orientation = "보수 성향";
    } else if (normalizedScore > 0.3) {
      orientation = "진보 성향";
    } else {
      orientation = "중도 성향";
    }

    const progressivePercentage = Math.max(0, Math.min(100, (normalizedScore + 1) * 50));
    const conservativePercentage = Math.max(0, Math.min(100, (1 - normalizedScore) * 50));
    const moderatePercentage = 100 - progressivePercentage - conservativePercentage;

    return {
      orientation,
      score: normalizedScore,
      progressivePercentage: Math.round(progressivePercentage),
      moderatePercentage: Math.round(moderatePercentage),
      conservativePercentage: Math.round(conservativePercentage),
      aiAnalysis: "현재 AI 분석 서비스에 일시적인 문제가 발생하여 기본 분석 결과를 제공합니다. 나중에 다시 시도해주세요.",
      categoryAnalysis: []
    };
  }
}

const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Method Not Allowed' }),
    };
  }

  try {
    if (!event.body) {
      return { statusCode: 400, body: JSON.stringify({ message: 'Bad Request: No body provided' }) };
    }
    const { answers, demographics } = quizResultRequestSchema.parse(JSON.parse(event.body));
    
    const result = await analyzePoliticalOrientation(answers, demographics);
    
    return {
      statusCode: 200,
      body: JSON.stringify(result),
    };
  } catch (error) {
    console.error("Political orientation analysis failed:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        message: "정치 성향 분석 중 오류가 발생했습니다. 다시 시도해주세요.",
        error: error instanceof Error ? error.message : "Unknown error"
      }),
    };
  }
};

export { handler };