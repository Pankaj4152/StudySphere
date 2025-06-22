'use server';

/**
 * @fileOverview An AI agent for analyzing the sentiment of comments.
 *
 * - analyzeCommentSentiment - A function that analyzes the sentiment of a comment.
 * - AnalyzeCommentSentimentInput - The input type for the analyzeCommentSentiment function.
 * - AnalyzeCommentSentimentOutput - The return type for the analyzeCommentSentiment function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeCommentSentimentInputSchema = z.object({
  comment: z.string().describe('The comment to analyze.'),
});
export type AnalyzeCommentSentimentInput = z.infer<typeof AnalyzeCommentSentimentInputSchema>;

const AnalyzeCommentSentimentOutputSchema = z.object({
  sentiment: z
    .string()
    .describe(
      'The sentiment of the comment, e.g., positive, negative, or neutral.'
    ),
  confidence: z
    .number()
    .describe(
      'The confidence level of the sentiment analysis, as a number between 0 and 1.'
    ),
});
export type AnalyzeCommentSentimentOutput = z.infer<typeof AnalyzeCommentSentimentOutputSchema>;

export async function analyzeCommentSentiment(
  input: AnalyzeCommentSentimentInput
): Promise<AnalyzeCommentSentimentOutput> {
  return analyzeCommentSentimentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeCommentSentimentPrompt',
  input: {schema: AnalyzeCommentSentimentInputSchema},
  output: {schema: AnalyzeCommentSentimentOutputSchema},
  prompt: `You are a sentiment analysis expert. Analyze the sentiment of the following comment and provide a sentiment (positive, negative, or neutral) and a confidence level (0-1).

Comment: {{{comment}}}

Output format: { \"sentiment\": \"<sentiment>\", \"confidence\": <confidence> }`,
});

const analyzeCommentSentimentFlow = ai.defineFlow(
  {
    name: 'analyzeCommentSentimentFlow',
    inputSchema: AnalyzeCommentSentimentInputSchema,
    outputSchema: AnalyzeCommentSentimentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
