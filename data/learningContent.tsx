import React from 'react';

export interface SubChapter {
  id: string;
  title: string;
  content: React.ReactNode;
  readingTime: string;
}

export interface Chapter {
  id: string;
  title: string;
  image?: string; // NEW: Image for the card
  isExternalLink?: boolean; 
  subChapters: SubChapter[];
}

export const learningCurriculum: Chapter[] = [
  {
    id: 'ch1',
    title: 'Module 1: Basics',
    image: 'https://images.unsplash.com/photo-1642049924522-f2a33e84d3b8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    subChapters: [
      { 
        id: '1.1', 
        title: '1.1: What is a Stock? 🏡',
        readingTime: '1m 2s To Read',
        content: (
            <>
                <p className="mb-4 text-slate-300 italic">Welcome to the first step of your trading journey! Understanding what a stock is forms the bedrock of everything that follows. Don't worry, we'll break it down in a simple way.</p>
                <h3 className="text-2xl font-bold mb-4">Defining a share as fractional ownership in a company.</h3>
                <p className="mb-4">A stock, also referred to as equity or a share, is the most fundamental unit of ownership in a public corporation. It is a financial instrument that represents a claim on the company's assets and earnings.</p>
                <h4 className="text-xl font-semibold mt-6 mb-2">The Analogy of the Family Business</h4>
                <p className="mb-4">Imagine a small, successful family bakery. If the family decides to expand into a chain of bakeries across the country, they need millions of dollars. To get this money, they decide to "incorporate" and sell ownership. If they divide the entire business into 1 million units, each unit is one share of stock. When you buy one share, you become a 1/1,000,000th owner of the bakery empire.</p>
                <p className="mb-4"><strong>Residual Claim:</strong> A key concept in stock ownership is the residual claim. This means that shareholders have a claim on the company's assets and profits only after all other obligations—like wages, supplier invoices, taxes, and debt payments to bondholders—have been fulfilled. They are at the end of the line, which is why stocks carry higher risk but also offer the highest potential return.</p>
                <p className="mb-4"><strong>Shares Outstanding:</strong> This is the total number of shares that have been issued by the company and are currently held by investors (including insiders and the general public). The market price of a single share multiplied by the shares outstanding gives you the company's market capitalization (or "market cap"), which is the total value of the company in the stock market.</p>
                <h4 className="text-xl font-semibold mt-6 mb-2">The Market Structure:</h4>
                <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Primary Market:</strong> Where stocks are first sold by the company to the public (e.g., during an IPO). The money goes directly to the company.</li>
                    <li><strong>Secondary Market:</strong> Where the stocks are subsequently traded among investors (e.g., on the NASDAQ or NYSE). This is the market you interact with daily. The price fluctuations here do not directly generate cash for the company; they reflect investor sentiment about the company's future.</li>
                </ul>
            </>
        )
      },
      // Other sub-chapters removed for brevity
    ]
  },
  {
    id: 'ch3',
    title: 'Module 3: Bullish Candlesticks',
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    isExternalLink: true,
    subChapters: []
  },
  {
    id: 'ch4',
    title: 'Module 4: Bearish Candlesticks',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    isExternalLink: true,
    subChapters: []
  },
  {
    id: 'ch5',
    title: 'Module 5: Technical Analysis',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    isExternalLink: true,
    subChapters: []
  },
  {
    id: 'ch6',
    title: 'Module 6: Fundamental Analysis',
    image: 'https://images.unsplash.com/photo-1664575599736-c5197c684128?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    isExternalLink: true,
    subChapters: []
  },
];