import { Type } from "@google/genai";
import type { QuizTopic } from '../types';

export const topicContentMap: Record<Exclude<QuizTopic, 'all'>, string[]> = {
    basics: ["What is a Stock? 🏡"],
    bullish: ["Hammer","Bullish Engulfing","Morning Star","Piercing Pattern","Three White Soldiers","Bullish Harami","Three Inside Up","Tweezer Bottom","Bullish Kicker","Inverted Hammer","Dragonfly Doji","Bullish Counterattack","Bullish Abandoned Baby","Morning Doji Star","Homing Pigeon","Stick Sandwich","Matching Low","Three Stars in the South","Concealing Baby Swallow","Ladder Bottom","Bullish Marubozu","Rising Window (Gap Up)","Rising Three Methods","Bullish Belt Hold","Bullish Separating Lines","Bullish Meeting Line","Bullish Tri-Star","Bullish Doji Star","Upside Tasuki Gap","Side-by-Side White Lines (Bullish)","Frypan Bottom","Tower Bottom","On Neck Line (Bullish Context)","In Neck Line (Bullish Context)","Thrusting Line (Bullish Context)","Bullish Harami Cross","Three River Bottom","Unique Three River Bottom","Kicking Up (Bullish Kicker)"],
    bearish: ["Shooting Star","Bearish Engulfing","Dark Cloud Cover","Evening Star","Three Black Crows","Bearish Harami","Three Inside Down","Tweezer Top","Bearish Kicker","Hanging Man","Gravestone Doji","Bearish Counterattack","Bearish Abandoned Baby","Evening Doji Star","Upside Gap Two Crows","Two Black Gapping","Falling Three Methods","Deliberation Pattern","Advance Block","Bearish Breakaway","Bearish Marubozu","Falling Window (Gap Down)","Bearish Belt Hold","Bearish Separating Lines","Bearish Meeting Line","Bearish Tri-Star","Bearish Doji Star","Downside Tasuki Gap","Side-by-Side White Lines (Bearish)","Dumpling Top","Tower Top","On Neck Line","In Neck Line","Thrusting Line","Bearish Harami Cross","Kicking Down (Bearish Kicker)","Mat Hold (Bearish)","Three Line Strike (Bearish)","Concealing Baby Swallow (Bearish)"],
    indicators: ["Simple Moving Average (SMA)","Exponential Moving Average (EMA)","Moving Average Convergence Divergence (MACD)","Bollinger Bands (BB)","Parabolic SAR (PSAR)","Relative Strength Index (RSI)","Stochastic Oscillator","Average Directional Index (ADX)","Williams %R","Commodity Channel Index (CCI)","On-Balance Volume (OBV)","Chaikin Money Flow (CMF)","Average True Range (ATR)","Money Flow Index (MFI)","Arms Index (TRIN)","Ichimoku Kinko Hyo (Cloud)","Keltner Channels","Elder Ray Index","Fibonacci Retracement","Projection Bands","Ultimate Oscillator (UO)","Detrended Price Oscillator (DPO)","Fisher Transform","TRIX","Aroon Indicator","Chaikin Oscillator (CO)","Volume Profile (VP)","Commitment of Traders (COT) Index","Negative Volume Index (NVI)","Positive Volume Index (PVI)","Hull Moving Average (HMA)","Zig Zag Indicator","Coppock Curve","Know Sure Thing (KST)","Gann HiLo Activator","Price Rate of Change (ROC)","Open Interest (OI)","High-Low Index (HLI)","Volume Profile (Value Area)","Candlestick Patterns (Contextual Analysis)","Adaptive Moving Average (Kaufman's AMA)","Zero-Lag Exponential Moving Average (ZLEMA)","Volume-Weighted Average Price (VWAP)","Vortex Indicator (VI)","Gann Angles and Fans","Hilbert Transform (Instantaneous Trendline)","Ehlers' Cyber Cycle","Klinger Oscillator","Market Facilitation Index (BW MFI)","ROC as a Confirmation Tool"],
    fundamental: ["Quality of Earnings (QoE)","Free Cash Flow (FCF) Analysis","Sustainable Competitive Advantage (The Moat)","Return on Invested Capital (ROIC)","Management & Governance Analysis","Financial Leverage and Solvency Analysis","Discounted Cash Flow (DCF) Valuation","Working Capital Management (WCM)","Sector and Industry Life Cycle Analysis","EPS Growth Decomposition","Relative Valuation","Dividend Discount Model (DDM)","Porter's Five Forces","SWOT Analysis","Dupont Analysis (ROE Decomposition)","Beneish M-Score","Altman Z-Score","Piotroski F-Score","Scenario Analysis & Monte Carlo","Economic Cycle Analysis","Industry Concentration","Supply Chain Analysis","ESG Analysis","Regulatory Risk Analysis","Technological Disruption Analysis","Customer Concentration Risk","Geographic Revenue Breakdown","Shareholder Structure & Activism","Off-Balance Sheet Financing","Pension Accounting Analysis","Stock-Based Compensation (SBC)","Tax Rate Analysis","Capital Expenditure (CapEx) Analysis","Asset Turnover Ratios","Inventory Analysis (LIFO vs. FIFO)","Profit Margin Analysis","PEG Ratio","Sum-of-the-Parts (SOTP) Valuation","M&A (Mergers & Acquisitions) Analysis","Book Value vs. Market Value"]
};

export const getTopicTitles = (topic: QuizTopic): string => {
    if (topic === 'all') {
        return Object.values(topicContentMap).flat().join(', ');
    }
    return topicContentMap[topic as Exclude<QuizTopic, 'all'>].join(', ');
};

export const quizSchema = {
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
