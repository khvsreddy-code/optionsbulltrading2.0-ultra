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
  subChapters: SubChapter[];
}

export const learningCurriculum: Chapter[] = [
  {
    id: 'ch1',
    title: 'Chapter 1: The Basics of Stocks',
    subChapters: [
      { 
        id: '1.1', 
        title: '1.1: What is a Stock? 🏡',
        readingTime: '1m 2s To Read',
        content: (
            <>
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
      { 
        id: '1.2', 
        title: '1.2: Why do Companies Issue Stocks? 💰',
        readingTime: '1m 15s To Read',
        content: (
            <>
                <h3 className="text-2xl font-bold mb-4">The purpose of raising capital for growth and operations.</h3>
                <p className="mb-4">Companies issue stock as a critical strategy to secure the massive amounts of capital needed to execute ambitious business plans. This is known as equity financing.</p>
                <h4 className="text-xl font-semibold mt-6 mb-2">The Core Motivation: Funding Growth Without Debt</h4>
                <p className="mb-4">When a company needs money, it faces a fundamental choice: Debt or Equity.</p>
                <div className="overflow-x-auto my-4">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-700">
                                <th className="p-2 border border-slate-600">Feature</th>
                                <th className="p-2 border border-slate-600">Debt Financing (Bonds/Loans)</th>
                                <th className="p-2 border border-slate-600">Equity Financing (Stocks)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="p-2 border border-slate-600 font-semibold">Repayment Obligation</td>
                                <td className="p-2 border border-slate-600">Must be paid back (with interest)</td>
                                <td className="p-2 border border-slate-600">No obligation to pay back</td>
                            </tr>
                             <tr className="bg-slate-800">
                                <td className="p-2 border border-slate-600 font-semibold">Risk to Company</td>
                                <td className="p-2 border border-slate-600">High; failure to pay can lead to bankruptcy</td>
                                <td className="p-2 border border-slate-600">Low; no fixed payment requirements</td>
                            </tr>
                            <tr>
                                <td className="p-2 border border-slate-600 font-semibold">Company Control</td>
                                <td className="p-2 border border-slate-600">None lost; only a commitment to pay</td>
                                <td className="p-2 border border-slate-600">Control is diluted (shared with new owners)</td>
                            </tr>
                             <tr className="bg-slate-800">
                                <td className="p-2 border border-slate-600 font-semibold">Capital Type</td>
                                <td className="p-2 border border-slate-600">Temporary capital</td>
                                <td className="p-2 border border-slate-600">Permanent capital</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <p className="mb-4"><strong>The Initial Public Offering (IPO):</strong> The landmark event where a private company transitions to public. The company, often advised by investment banks (underwriters), sells its shares to the public for the first time. The cash raised in the IPO is crucial for:</p>
                <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li><strong>Massive Expansion:</strong> Funding the building of new factories, data centers, or retail stores globally.</li>
                    <li><strong>Research & Development (R&D):</strong> Investing in long-term, high-cost projects like drug development or cutting-edge technology.</li>
                    <li><strong>Acquisitions:</strong> Buying out smaller, innovative companies to gain market share or technology.</li>
                    <li><strong>Paying Down Debt:</strong> Sometimes, equity capital is used to reduce high-interest debt, strengthening the balance sheet.</li>
                </ul>
                <p><strong>The Cost of Issuance (Dilution):</strong> While stocks don't require repayment, they aren't "free" money. Issuing new stock dilutes the ownership of existing shareholders. If a CEO previously owned 10% of the company, and the company issues new shares that double the total outstanding shares, the CEO's ownership automatically drops to 5%—they own a smaller piece of a larger pie.</p>
            </>
        )
      },
      { 
        id: '1.3', 
        title: '1.3: Investor Rights as a Shareholder 🏛️',
        readingTime: '1m 6s To Read',
        content: (
            <>
                <h3 className="text-2xl font-bold mb-4">Understanding voting rights and claims on company earnings.</h3>
                <p className="mb-4">Owning a share bestows legal rights that protect the investor and define their relationship with the company's management.</p>
                <h4 className="text-xl font-semibold mt-6 mb-2">A. Governance Rights (Voting)</h4>
                <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li><strong>The Board of Directors (BOD):</strong> The most significant right is the ability to elect the BOD. The board is responsible for overseeing the CEO and the overall strategic direction. A vote for a director is a vote on management's accountability.</li>
                    <li><strong>Proxy Voting:</strong> For most retail investors (you and me), voting occurs through a proxy ballot, a form that allows you to cast your vote remotely on board nominees and other proposals.</li>
                    <li><strong>Voting Methods:</strong>
                        <ul className="list-circle pl-6 mt-2 space-y-1">
                            <li><strong>Cumulative Voting:</strong> Allows shareholders to pool their votes and allocate them to a single director nominee. This gives minority shareholders a better chance of electing a representative.</li>
                            <li><strong>Statutory Voting:</strong> Requires the shareholder to vote their full share count for each director position separately. This generally favors majority shareholders.</li>
                        </ul>
                    </li>
                    <li><strong>Shareholder Proposals:</strong> Investors can submit proposals on corporate governance, environmental, or social issues to be voted on at the annual meeting, giving them a voice on company policy.</li>
                </ul>
                <h4 className="text-xl font-semibold mt-6 mb-2">B. Economic Rights (Claims)</h4>
                <ul className="list-disc pl-6 space-y-2">
                    <li><strong>The Right to Inspection:</strong> Shareholders have the right to examine certain corporate records (like financial statements and shareholder lists) to ensure transparency and proper management.</li>
                    <li><strong>Preemptive Right (Less Common):</strong> In some cases, existing shareholders have the right to purchase a proportional number of any newly issued shares before they are offered to the public, allowing them to maintain their percentage of ownership and avoid dilution.</li>
                    <li><strong>Dividend Rights:</strong> The right to receive any proportional cash or stock distribution that the board declares.</li>
                </ul>
            </>
        )
      },
      { 
        id: '1.4', 
        title: '1.4: Different Types of Stocks ⚖️',
        readingTime: '1m 21s To Read',
        content: (
            <>
                <h3 className="text-2xl font-bold mb-4">Exploring Common vs. Preferred Stock.</h3>
                <p className="mb-4">The distinction between common and preferred stock centers on the trade-off between control (voting) and priority (getting paid first).</p>
                <h4 className="text-xl font-semibold mt-6 mb-2">A. Common Stock: The True Owner's Share</h4>
                <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li><strong>Voting Power:</strong> This is the primary distinction. Common stockholders are the only ones with meaningful voting rights, making them the ultimate decision-makers in the company.</li>
                    <li><strong>Variable Return:</strong> Their dividends are not guaranteed and are highly dependent on the company's profitability and board discretion. However, they enjoy unlimited upside; if the company's value explodes, the common stock price soars.</li>
                    <li><strong>The Riskiest Position:</strong> Common stock is the most subordinate (lowest priority) security. In bankruptcy, common stockholders are paid absolutely last, often receiving nothing.</li>
                </ul>

                <h4 className="text-xl font-semibold mt-6 mb-2">B. Preferred Stock: The Hybrid Security</h4>
                <p className="mb-4">Preferred stock is often called a hybrid because it possesses characteristics of both equity and debt:</p>
                <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li><strong>Fixed Dividends:</strong> Preferred stock usually pays a fixed dividend, similar to a bond's interest payment. These dividends must be paid before any common stockholders receive theirs.</li>
                    <li><strong>No Voting Rights:</strong> In exchange for payment priority, preferred stockholders generally give up the right to vote.</li>
                    <li><strong>Cumulative vs. Non-Cumulative:</strong>
                        <ul className="list-circle pl-6 mt-2 space-y-1">
                            <li><strong>Cumulative Preferred Stock:</strong> If the company skips a dividend payment (an arrearage), it must pay all missed dividends to cumulative preferred stockholders before paying any common dividends.</li>
                            <li><strong>Non-Cumulative Preferred Stock:</strong> If a dividend is skipped, the company is not obligated to pay it back later.</li>
                        </ul>
                    </li>
                    <li><strong>Liquidation Priority:</strong> Preferred stockholders are ahead of common stockholders in the event of liquidation but still behind all creditors. They are a "safer" equity investment than common stock.</li>
                </ul>
            </>
        )
      },
      { 
        id: '1.5', 
        title: '1.5: How Stocks Make You Money 📈',
        readingTime: '1m 33s To Read',
        content: (
            <>
                <h3 className="text-2xl font-bold mb-4">A deep dive into Capital Gains vs. Dividends.</h3>
                <p className="mb-4">An investor's total return from a stock is the sum of two major, distinct streams of income. Understanding these helps you choose stocks that match your financial goals.</p>
                
                <h4 className="text-xl font-semibold mt-6 mb-2">I. Capital Gains (The Growth Component)</h4>
                <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li><strong>Mechanism:</strong> This is the profit you realize when the stock's market price increases. It's an unrealized gain while you hold the stock and a realized gain only when you sell it.</li>
                    <li><strong>Formula:</strong> <code className="bg-slate-700 p-1 rounded text-sm">Total Return from Capital Gain = (Selling Price - Purchase Price) × Number of Shares</code></li>
                    <li><strong>Driving Factors:</strong> Price movement is driven by future expectations. When a company's prospects improve (successful product launch, higher earnings forecasts, favorable economic conditions), demand for the stock increases, driving up the share price.</li>
                    <li><strong>The Growth Investor's Focus:</strong> Growth stocks (like high-tech companies) often do not pay dividends. Investors buy them purely for the expectation of massive capital appreciation. Their return is 100% reliant on the stock price going up.</li>
                </ul>

                <h4 className="text-xl font-semibold mt-6 mb-2">II. Dividends (The Income Component)</h4>
                <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li><strong>Mechanism:</strong> A direct cash payout of a portion of the company's profits, decided by the board. They are typically paid quarterly.</li>
                    <li><strong>Dividend Yield:</strong> This is the cash return measured as a percentage of the stock's price, providing a standardized way to compare income streams. <code className="bg-slate-700 p-1 rounded text-sm">Dividend Yield = Annual Dividend Per Share / Current Stock Price</code></li>
                    <li><strong>The Income Investor's Focus:</strong> Income or Value stocks (like banks, utilities, or established consumer goods companies) are often mature, stable, and generate consistent cash flow. They choose to distribute a large portion of those earnings to investors.</li>
                    <li><strong>Dividend Reinvestment Plans (DRIPs):</strong> Many investors opt to automatically use their cash dividends to purchase additional shares of the same stock, compounding their returns and growing their ownership over time.</li>
                </ul>

                 <div className="overflow-x-auto my-4">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-700">
                                <th className="p-2 border border-slate-600">Stock Type</th>
                                <th className="p-2 border border-slate-600">Primary Return Source</th>
                                <th className="p-2 border border-slate-600">Reinvestment Priority</th>
                                <th className="p-2 border border-slate-600">Typical Company Profile</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="p-2 border border-slate-600 font-semibold">Growth Stock</td>
                                <td className="p-2 border border-slate-600">Capital Gains (Price Rise)</td>
                                <td className="p-2 border border-slate-600">Reinvest 100% of profits back into the company</td>
                                <td className="p-2 border border-slate-600">Early-stage, high-tech, rapid expansion</td>
                            </tr>
                             <tr className="bg-slate-800">
                                <td className="p-2 border border-slate-600 font-semibold">Income Stock</td>
                                <td className="p-2 border border-slate-600">Dividends (Cash Payout)</td>
                                <td className="p-2 border border-slate-600">Distribute a large portion of profit to shareholders</td>
                                <td className="p-2 border border-slate-600">Mature, stable, low growth potential</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </>
        )
      },
    ]
  },
  {
    id: 'ch2',
    title: 'Chapter 2: Market Concepts',
    subChapters: []
  },
];
