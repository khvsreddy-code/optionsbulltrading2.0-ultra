import React from 'react';
import type { Pattern } from './bullishPatternsContent';
import { Search, DollarSign, Shield, TrendingUp, Users, Scale, GitPullRequest, Sliders, Dna, Globe, FileText, BarChart2 } from '../../components/common/Icons';

export const fundamentalAnalysisTopics: Pattern[] = [
  {
    id: 'qoe',
    title: 'Quality of Earnings (QoE)',
    emoji: '🔍',
    icon: Search,
    content: (
        <>
            <h3 className="text-2xl font-bold mb-4">Quality of Earnings (QoE)</h3>
            <h4 className="text-xl font-semibold mt-6 mb-2">Description</h4>
            <p className="mb-4">Quality of Earnings (QoE) is a qualitative and quantitative assessment of the net income figure reported on the income statement. It examines how reliable, sustainable, and transparent a company's reported profit is. QoE analysts look beyond the GAAP (Generally Accepted Accounting Principles) net income to identify non-recurring events, aggressive accounting choices, and mismatches between accrual earnings and actual cash flow.</p>
            <h4 className="text-xl font-semibold mt-6 mb-2">Deep Learning Insight</h4>
            <p className="mb-4">High-quality earnings are backed by real cash flow from core operations (CFO). Low-quality earnings often rely on non-cash items, one-time asset sales, or aggressive accruals that inflate the current period's profit at the expense of future periods. A key test is the Accruals Ratio:</p>
            <div className="bg-gray-100 p-3 rounded-lg my-4 text-center">
                <code className="text-lg text-gray-700">Accruals Ratio = (Net Income - CFO) / Average Total Assets</code>
            </div>
            <p className="mb-4">A high or rapidly increasing Accruals Ratio signals that a large portion of earnings is not being converted into cash, indicating a potentially low-quality, unsustainable profit that may lead to a future write-down or restatement. Analysts must also scrutinize Discretionary Accruals like changes in warranty reserves or inventory valuation methods.</p>
        </>
    ),
  },
  {
    id: 'fcf-analysis',
    title: 'Free Cash Flow (FCF) Analysis',
    emoji: '💵',
    icon: DollarSign,
    content: (
        <>
            <h3 className="text-2xl font-bold mb-4">Free Cash Flow (FCF) Analysis</h3>
            <h4 className="text-xl font-semibold mt-6 mb-2">Description</h4>
            <p className="mb-4">Free Cash Flow (FCF) is the cash a company generates after accounting for cash outflows to support its operations and maintain its capital assets. It is calculated as: FCF = Cash Flow from Operations (CFO) - Capital Expenditures (CapEx). FCF is the true measure of a business's ability to create wealth for its shareholders.</p>
            <h4 className="text-xl font-semibold mt-6 mb-2">Deep Learning Insight</h4>
            <p className="mb-4">FCF is the ultimate non-GAAP profitability metric because it is far harder to manipulate than net income. It represents the cash available for discretionary uses: paying dividends, buying back stock, reducing debt, or pursuing non-essential acquisitions. Valuation is often centered on FCF through the Discounted Cash Flow (DCF) model. A key analysis is the FCF Yield (FCF / Market Cap), which provides an equity return rate analogous to a dividend yield but based on all free cash. A healthy company should show consistent FCF growth that outpaces Net Income growth, demonstrating superior operational efficiency and high-quality earnings.</p>
        </>
    ),
  },
  {
    id: 'moat',
    title: 'Sustainable Competitive Advantage (The Moat)',
    emoji: '🛡️',
    icon: Shield,
    content: (
        <>
            <h3 className="text-2xl font-bold mb-4">Sustainable Competitive Advantage (The Moat)</h3>
            <h4 className="text-xl font-semibold mt-6 mb-2">Description</h4>
            <p className="mb-4">The "moat" refers to the structural business qualities that allow a company to generate consistently high returns on capital (ROIC) and maintain high profitability over long periods, protecting it from competition.</p>
            <h4 className="text-xl font-semibold mt-6 mb-2">Deep Learning Insight</h4>
            <p className="mb-4">Moats are categorized into five types: 1) Intangible Assets (patents, brand equity, regulatory licenses); 2) Switching Costs (high cost or hassle for customers to switch to a competitor); 3) Network Effects (value increases as more people use it); 4) Cost Advantage (structurally lower production costs); and 5) Efficient Scale (serving a limited market efficiently). The analysis involves assessing the durability and width of the moat. A wide, stable moat is the single greatest predictor of long-term superior investment returns, as it minimizes competition-driven price erosion.</p>
        </>
    ),
  },
  {
    id: 'roic',
    title: 'Return on Invested Capital (ROIC)',
    emoji: '💰',
    icon: TrendingUp,
    content: (
        <>
            <h3 className="text-2xl font-bold mb-4">Return on Invested Capital (ROIC)</h3>
            <h4 className="text-xl font-semibold mt-6 mb-2">Description</h4>
            <p className="mb-4">ROIC measures how effectively a company uses all the capital at its disposal (both debt and equity) to generate profits. It is calculated as: ROIC = Net Operating Profit After Taxes (NOPAT) / Invested Capital. It is the gold standard for measuring management's efficiency in capital allocation.</p>
            <h4 className="text-xl font-semibold mt-6 mb-2">Deep Learning Insight</h4>
            <p className="mb-4">The true test of wealth creation is comparing ROIC to the company's Weighted Average Cost of Capital (WACC). If ROIC &gt; WACC, the company is generating economic value. If ROIC &lt; WACC, the company is destroying value. Investors seek companies that can maintain an ROIC consistently greater than their cost of capital, demonstrating a durable competitive advantage. ROIC should be analyzed over a cycle (5-10 years) to filter out cyclical noise.</p>
        </>
    ),
  },
  {
    id: 'management-governance',
    title: 'Management & Governance Analysis',
    emoji: '👔',
    icon: Users,
    content: (
        <>
            <h3 className="text-2xl font-bold mb-4">Management & Governance Analysis</h3>
            <h4 className="text-xl font-semibold mt-6 mb-2">Description</h4>
            <p className="mb-4">This involves assessing the quality, integrity, and capital allocation skills of the executive leadership (CEO, CFO) and the Board of Directors (BOD). This is the subjective, qualitative core of fundamental analysis.</p>
            <h4 className="text-xl font-semibold mt-6 mb-2">Deep Learning Insight</h4>
            <p className="mb-4">Analysts scrutinize the management's track record, shareholder alignment (high insider ownership, compensation linked to long-term ROIC or FCF), and capital allocation decisions. Poor Governance is a major red flag, including issues like BOD independence, aggressive accounting policies, or related-party transactions. A high-quality CEO views the retained earnings as capital to be allocated strategically, seeking the highest possible ROIC projects.</p>
        </>
    ),
  },
  {
    id: 'leverage-solvency',
    title: 'Financial Leverage and Solvency Analysis',
    emoji: '⚖️',
    icon: Scale,
    content: (
        <>
            <h3 className="text-2xl font-bold mb-4">Financial Leverage and Solvency Analysis</h3>
            <h4 className="text-xl font-semibold mt-6 mb-2">Description</h4>
            <p className="mb-4">Solvency analysis determines a company's ability to meet its long-term financial obligations and measures the extent to which it uses debt (leverage) to finance its assets.</p>
            <h4 className="text-xl font-semibold mt-6 mb-2">Deep Learning Insight</h4>
            <p className="mb-4">The Debt-to-EBITDA Ratio is often more insightful than Debt-to-Equity, showing the number of years of operating profit required to pay off debt. Another crucial metric is the Interest Coverage Ratio (EBIT / Interest Expense), which shows how easily a company can meet its interest payments. A low ratio indicates high risk. Optimal leverage is industry-specific; overly high leverage in cyclical industries is a recipe for bankruptcy during downturns.</p>
        </>
    ),
  },
  {
    id: 'dcf-valuation',
    title: 'Discounted Cash Flow (DCF) Valuation',
    emoji: '🔮',
    icon: BarChart2,
    content: (
        <>
            <h3 className="text-2xl font-bold mb-4">Discounted Cash Flow (DCF) Valuation Model</h3>
            <h4 className="text-xl font-semibold mt-6 mb-2">Description</h4>
            <p className="mb-4">The DCF model is the cornerstone of intrinsic valuation. It estimates the value of an asset based on the sum of all its future expected Free Cash Flows, discounted back to their present value using an appropriate discount rate (WACC).</p>
            <h4 className="text-xl font-semibold mt-6 mb-2">Deep Learning Insight</h4>
            <p className="mb-4">The DCF forces the analyst to make explicit assumptions about the company's future: Growth Rate, FCF Margins, and Terminal Value. The DCF is highly sensitive to the chosen Terminal Growth Rate and the Discount Rate (WACC). For deep analysis, one must perform Sensitivity Analysis (varying these inputs) to determine a range of plausible intrinsic values, not just a single point estimate.</p>
        </>
    ),
  },
  {
    id: 'wcm',
    title: 'Working Capital Management (WCM)',
    emoji: '⚙️',
    icon: GitPullRequest,
    content: (
        <>
            <h3 className="text-2xl font-bold mb-4">Working Capital Management (WCM)</h3>
            <h4 className="text-xl font-semibold mt-6 mb-2">Description</h4>
            <p className="mb-4">WCM is the monitoring and management of a company's current assets and current liabilities to maximize efficiency and ensure short-term liquidity.</p>
            <h4 className="text-xl font-semibold mt-6 mb-2">Deep Learning Insight</h4>
            <p className="mb-4">WCM is assessed using metrics like Days Sales Outstanding (DSO), Days Inventory Outstanding (DIO), and Days Payables Outstanding (DPO). These combine into the Cash Conversion Cycle (CCC = DSO + DIO - DPO). A shorter CCC indicates the company converts its resources into cash faster, minimizing the need for external financing. A negative CCC (e.g., Amazon) is a sign of immense operational power.</p>
        </>
    ),
  },
  {
    id: 'industry-lifecycle',
    title: 'Sector and Industry Life Cycle Analysis',
    emoji: '🌳',
    icon: Dna,
    content: (
        <>
            <h3 className="text-2xl font-bold mb-4">Sector and Industry Life Cycle Analysis</h3>
            <h4 className="text-xl font-semibold mt-6 mb-2">Description</h4>
            <p className="mb-4">Analyzing the macro environment, including the company's specific sector and where that industry currently sits in its life cycle (e.g., Embryonic, Growth, Shakeout, Maturity, Decline).</p>
            <h4 className="text-xl font-semibold mt-6 mb-2">Deep Learning Insight</h4>
            <p className="mb-4">Investment strategy must align with the industry life cycle. Growth stage companies require high CapEx and have low P/E ratios but high P/S ratios. Maturity stage companies have high FCF, lower CapEx, and often pay high dividends. The Shakeout stage is critical, as competitive forces eliminate weaker firms, often marked by massive mergers and acquisitions. Investors must determine if the company can survive the shakeout to reach the stable maturity stage.</p>
        </>
    ),
  },
  {
    id: 'eps-decomposition',
    title: 'EPS Growth Decomposition',
    emoji: '💹',
    icon: Sliders,
    content: (
        <>
            <h3 className="text-2xl font-bold mb-4">EPS Growth Decomposition</h3>
            <h4 className="text-xl font-semibold mt-6 mb-2">Description</h4>
            <p className="mb-4">Analyzing EPS growth is essential, but deeper analysis decomposes this growth into its components to determine its quality and sustainability.</p>
            <h4 className="text-xl font-semibold mt-6 mb-2">Deep Learning Insight</h4>
            <p className="mb-4">EPS growth can come from three sources: 1) Internal Growth (organic growth from reinvested profits); 2) External Growth (mergers and acquisitions); and 3) Share Count Reduction (stock buybacks). The most sustainable and highest quality growth comes from internal growth, as it leverages the company's existing high ROIC (moat). Growth driven solely by debt-funded acquisitions or excessive share count reduction is often unsustainable and can lead to financial distress, demanding a lower valuation multiple.</p>
        </>
    ),
  },
];