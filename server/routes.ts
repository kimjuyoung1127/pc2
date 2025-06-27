import type { Express } from "express";
import { createServer, type Server } from "http";
import { quizResultRequestSchema } from "@shared/schema";
import { analyzePoliticalOrientation } from "./services/gemini";

export async function registerRoutes(app: Express): Promise<Server> {
  app.post("/api/analyze-political-orientation", async (req, res) => {
    try {
      const { answers, demographics } = quizResultRequestSchema.parse(req.body);
      
      const result = await analyzePoliticalOrientation(answers, demographics);
      
      res.json(result);
    } catch (error) {
      console.error("Political orientation analysis failed:", error);
      res.status(500).json({ 
        message: "정치 성향 분석 중 오류가 발생했습니다. 다시 시도해주세요.",
        error: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
