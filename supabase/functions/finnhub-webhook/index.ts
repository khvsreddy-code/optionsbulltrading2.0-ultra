// This file has been repurposed to act as a secure backend endpoint for generating AI quizzes.
// It securely handles the Gemini API key and prevents it from being exposed in the browser.

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { GoogleGenAI, Type } from "https://esm.sh/@google/genai@1.23.0";

// FIX: Add a type declaration for the Deno global to resolve TypeScript errors.
declare const Deno: any;

type QuizTopic = 'all' | 'basics' | 'bullish' | 'bearish' | 'indicators' | 'fundamental';

// Hardcoded topic titles, as this serverless function cannot import from client-side data files.
const topicContentMap = {
    basics: ["What is a Stock? 🏡"],
    bullish: ["Hammer","Bullish Engulfing","Morning Star","Piercing Pattern","Three White Soldiers","Bullish Harami","Three Inside Up","Tweezer Bottom","Bullish Kicker","Inverted Hammer","Dragonfly Doji","Bullish Counterattack","Bullish Abandoned Baby","Morning Doji Star","Homing Pigeon","Stick Sandwich","Matching Low","Three Stars in the South","Concealing Baby Swallow","Ladder Bottom","Bullish Marubozu","Rising Window (Gap Up)","Rising Three Methods","Bullish Belt Hold","Bullish Separating Lines","Bullish Meeting Line","Bullish Tri-Star","Bullish Doji Star","Upside Tasuki Gap","Side-by-Side White Lines (Bullish)","Frypan Bottom","Tower Bottom","On Neck Line (Bullish Context)","In Neck Line (Bullish Context)","Thrusting Line (Bullish Context)","Bullish Harami Cross","Three River Bottom","Unique Three River Bottom","Kicking Up (Bullish Kicker)"],
    bearish: ["Shooting Star","Bearish Engulfing","Dark Cloud Cover","Evening Star","Three Black Crows","Bearish Harami","Three Inside Down","Tweezer Top","Bearish Kicker","Hanging Man","Gravestone Doji","Bearish Counterattack","Bearish Abandoned Baby","Evening Doji Star","Upside Gap Two Crows","Two Black Gapping","Falling Three Methods","Deliberation Pattern","Advance Block","Bearish Breakaway","Bearish Marubozu","Falling Window (Gap Down)","Bearish Belt Hold","Bearish Separating Lines","Bearish Meeting Line","Bearish Tri-Star","Bearish Doji Star","Downside Tasuki Gap","Side-by-Side White Lines (Bearish)","Dumpling Top","Tower Top","On Neck Line","In Neck Line","Thrusting Line","Bearish Harami Cross","Kicking Down (Bearish Kicker)","Mat Hold (Bearish)","Three Line Strike (Bearish)","Concealing Baby Swallow (Bearish)"],
    indicators: ["Simple Moving Average (SMA)","Exponential Moving Average (EMA)","Moving Average Convergence Divergence (MACD)","Bollinger Bands (BB)","Parabolic SAR (PSAR)","Relative Strength Index (RSI)","Stochastic Oscillator","Average Directional Index (ADX)","Williams %R","Commodity Channel Index (CCI)","On-Balance Volume (OBV)","Chaikin Money Flow (CMF)","Average True Range (ATR)","Money Flow Index (MFI)","Arms Index (TRIN)","Ichimoku Kinko Hyo (Cloud)","Keltner Channels","Elder Ray Index","Fibonacci Retracement","Projection Bands","Ultimate Oscillator (UO)","Detrended Price Oscillator (DPO)","Fisher Transform","TRIX","Aroon Indicator","Chaikin Oscillator (CO)","Volume Profile (VP)","Commitment of Traders (COT) Index","Negative Volume Index (NVI)","Positive Volume Index (PVI)","Hull Moving Average (HMA)","Zig Zag Indicator","Coppock Curve","Know Sure Thing (KST)","Gann HiLo Activator","Price Rate of Change (ROC)","Open Interest (OI)","High-Low Index (HLI)","Volume Profile (Value Area)","Candlestick Patterns (Contextual Analysis)","Adaptive Moving Average (Kaufman's AMA)","Zero-Lag Exponential Moving Average (ZLEMA)","Volume-Weighted Average Price (VWAP)","Vortex Indicator (VI)","Gann Angles and Fans","Hilbert Transform (Instantaneous Trendline)","Ehlers' Cyber Cycle","Klinger Oscillator","Market Facilitation Index (BW MFI)","ROC as a Confirmation Tool"],
    fundamental: ["Quality of Earnings (QoE)","Free Cash Flow (FCF) Analysis","Sustainable Competitive Advantage (The Moat)","Return on Invested Capital (ROIC)","Management & Governance Analysis","Financial Leverage and Solvency Analysis","Discounted Cash Flow (DCF) Valuation","Working Capital Management (WCM)","Sector and Industry Life Cycle Analysis","EPS Growth Decomposition","Relative Valuation","Dividend Discount Model (DDM)","Porter's Five Forces","SWOT Analysis","Dupont Analysis (ROE Decomposition)","Beneish M-Score","Altman Z-Score","Piotroski F-Score","Scenario Analysis & Monte Carlo","Economic Cycle Analysis","Industry Concentration","Supply Chain Analysis","ESG Analysis","Regulatory Risk Analysis","Technological Disruption Analysis","Customer Concentration Risk","Geographic Revenue Breakdown","Shareholder Structure & Activism","Off-Balance Sheet Financing","Pension Accounting Analysis","Stock-Based Compensation (SBC)","Tax Rate Analysis","Capital Expenditure (CapEx) Analysis","Asset Turnover Ratios","Inventory Analysis (LIFO vs. FIFO)","Profit Margin Analysis","PEG Ratio","Sum-of-the-Parts (SOTP) Valuation","M&A (Mergers & Acquisitions) Analysis","Book Value vs. Market Value"]
};

const quizTopicsMeta = [
    { id: 'all', name: 'Comprehensive Quiz' }, { id: 'basics', name: 'Trading Basics' },
    { id: 'bullish', name: 'Bullish Patterns' }, { id: 'bearish', name: 'Bearish Patterns' },
    { id: 'indicators', name: 'Technical Indicators' }, { id: 'fundamental', name: 'Fundamental Analysis' },
];

const getTopicTitles = (topic: QuizTopic): string => {
    let titles: string[] = [];
    switch (topic) {
        case 'basics': titles = topicContentMap.basics; break;
        case 'bullish': titles = topicContentMap.bullish; break;
        case 'bearish': titles = topicContentMap.bearish; break;
        case 'indicators': titles = topicContentMap.indicators; break;
        case 'fundamental': titles = topicContentMap.fundamental; break;
        case 'all': default:
            titles = [...topicContentMap.basics, ...topicContentMap.bullish, ...topicContentMap.bearish, ...topicContentMap.indicators, ...topicContentMap.fundamental];
            break;
    }
    return titles.join(', ');
};

const quizSchema = {
  type: Type.ARRAY,
  items: {
    type: Type.OBJECT,
    properties: {
      question: { type: Type.STRING },
      options: { type: Type.ARRAY, items: { type: Type.STRING } },
      correctAnswer: { type: Type.STRING },
    },
    required: ["question", "options", "correctAnswer"],
  },
};

serve(async (req: Request) => {
  // Handle CORS preflight request
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: { 
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
    } });
  }

  try {
    const { topic } = await req.json();
    if (!topic) {
        throw new Error("Missing 'topic' in request body.");
    }

    const apiKey = Deno.env.get('API_KEY');
    if (!apiKey) {
        throw new Error("Gemini API key is not configured on the server.");
    }
    
    const ai = new GoogleGenAI({ apiKey });

    const topicName = quizTopicsMeta.find(t => t.id === topic)?.name || 'Stock Market Trading';
    const numberOfQuestions = topic === 'all' ? 25 : 10;
    
    const QUIZ_GENERATION_PROMPT = `
You are an expert quizmaster specializing in stock market trading education.
Your task is to generate a challenging quiz of ${numberOfQuestions} multiple-choice questions on the general topic of "${topicName}".
The specific concepts to be tested are included in the following list: {{CONTEXT}}.
Each question must have exactly 4 options, and only one correct answer.
The questions should be diverse and cover the concepts from the provided list.
You must use your general knowledge about these trading concepts to formulate the questions and answers.
The output must be a JSON array of objects, strictly following the provided schema.
`;
    
    const content = getTopicTitles(topic as QuizTopic);
    const prompt = QUIZ_GENERATION_PROMPT.replace('{{CONTEXT}}', content);

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: quizSchema,
        },
    });

    const jsonString = response.text.trim();
    
    return new Response(jsonString, {
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      status: 200,
    });
  } catch (error) {
    console.error("Error in Supabase function:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      status: 500,
    });
  }
});
