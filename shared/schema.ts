import { z } from "zod";

export const userDemographicsSchema = z.object({
  age: z.string().optional(),
  gender: z.string().optional(),
  region: z.string().optional(),
});

export const quizAnswerSchema = z.object({
  questionIndex: z.number(),
  selectedOption: z.enum(['A', 'B']),
  weight: z.number(),
});

export const quizResultRequestSchema = z.object({
  answers: z.array(quizAnswerSchema),
  demographics: userDemographicsSchema,
});

export const politicalOrientationSchema = z.object({
  orientation: z.string(),
  score: z.number(),
  progressivePercentage: z.number(),
  moderatePercentage: z.number(),
  conservativePercentage: z.number(),
  aiAnalysis: z.string(),
  categoryAnalysis: z.array(z.object({
    category: z.string(),
    orientation: z.string(),
    description: z.string(),
    percentage: z.number(),
  })),
});

export const shareableResultSchema = z.object({
  id: z.string(),
  orientation: z.string(),
  progressivePercentage: z.number(),
  moderatePercentage: z.number(),
  conservativePercentage: z.number(),
  createdAt: z.string(),
});

export type UserDemographics = z.infer<typeof userDemographicsSchema>;
export type QuizAnswer = z.infer<typeof quizAnswerSchema>;
export type QuizResultRequest = z.infer<typeof quizResultRequestSchema>;
export type PoliticalOrientation = z.infer<typeof politicalOrientationSchema>;
export type ShareableResult = z.infer<typeof shareableResultSchema>;
