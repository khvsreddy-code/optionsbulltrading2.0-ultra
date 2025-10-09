import React from 'react';
import type { Pattern } from './bullishPatternsContent';
import { Search, DollarSign, Shield, TrendingUp, Users, Scale, GitPullRequest, Sliders, Dna, Globe, FileText, BarChart2, Calendar, Zap, Building, CheckCircle } from '../../components/common/Icons';

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
  {
    id: 'relative-valuation',
    title: 'Relative Valuation',
    emoji: '📊',
    icon: BarChart2,
    content: (
        <>
            <h3 className="text-2xl font-bold mb-4">Relative Valuation (Multiples Analysis)</h3>
            <h4 className="text-xl font-semibold mt-6 mb-2">Description</h4>
            <p className="mb-4">Relative valuation is a method of determining a company's value by comparing it to the market values of similar, publicly-traded companies. This is done using valuation multiples or ratios, such as Price-to-Earnings (P/E), Price-to-Sales (P/S), Price-to-Book (P/B), and Enterprise Value-to-EBITDA (EV/EBITDA).</p>
            <h4 className="text-xl font-semibold mt-6 mb-2">Deep Learning Insight</h4>
            <p className="mb-4">No single multiple tells the whole story. A skilled analyst triangulates value using several multiples appropriate for the company's industry and life-cycle stage. For example:</p>
            <ul className="list-disc pl-6 space-y-2">
                <li><strong>P/E:</strong> Best for mature, profitable companies. Can be misleading due to accounting choices and non-cash charges.</li>
                <li><strong>P/S:</strong> Useful for valuing growth companies that are not yet profitable. Doesn't account for differences in profitability or debt.</li>
                <li><strong>P/B:</strong> Ideal for capital-intensive industries like banking and insurance, where book value is a good proxy for asset value.</li>
                <li><strong>EV/EBITDA:</strong> The preferred multiple for comparing companies with different capital structures (debt levels) and tax rates, as it is capital-structure-neutral.</li>
            </ul>
            <p className="mt-4">The key is to compare a company's multiples not just to its peers, but also to its own historical average, to determine if it is currently cheap or expensive relative to its own history and its industry.</p>
        </>
    ),
  },
  {
    id: 'ddm-valuation',
    title: 'Dividend Discount Model (DDM)',
    emoji: '➗',
    icon: DollarSign,
    content: (
        <>
            <h3 className="text-2xl font-bold mb-4">Dividend Discount Model (DDM)</h3>
            <h4 className="text-xl font-semibold mt-6 mb-2">Description</h4>
            <p className="mb-4">The DDM values a company based on the theory that its stock is worth the sum of all of its future dividend payments, discounted back to their present value. It's a form of absolute valuation.</p>
            <h4 className="text-xl font-semibold mt-6 mb-2">Deep Learning Insight</h4>
            <p className="mb-4">The most common DDM is the Gordon Growth Model, which assumes a constant dividend growth rate (g). The formula is: `Value = D1 / (k - g)`, where D1 is the next year's dividend and k is the required rate of return. The model is extremely sensitive to the inputs for `k` and `g`. It is most suitable for valuing stable, mature, non-cyclical, dividend-paying companies (like utilities or consumer staples). It is entirely unsuitable for growth companies that do not pay dividends or have unpredictable payout policies.</p>
        </>
    ),
  },
  {
    id: 'porters-five-forces',
    title: "Porter's Five Forces",
    emoji: '🖐️',
    icon: Shield,
    content: (
        <>
            <h3 className="text-2xl font-bold mb-4">Porter's Five Forces</h3>
            <h4 className="text-xl font-semibold mt-6 mb-2">Description</h4>
            <p className="mb-4">A framework developed by Michael Porter for analyzing the level of competition within an industry to determine its attractiveness and long-term profitability. It helps identify where power lies in a business situation.</p>
            <h4 className="text-xl font-semibold mt-6 mb-2">Deep Learning Insight</h4>
            <p className="mb-4">The five forces holistically define an industry's structure:</p>
            <ul className="list-disc pl-6 space-y-2">
                <li><strong>Industry Rivalry:</strong> High rivalry (many competitors, slow growth) erodes profits.</li>
                <li><strong>Threat of New Entrants:</strong> High barriers to entry (e.g., patents, high capital costs) protect existing firms.</li>
                <li><strong>Bargaining Power of Suppliers:</strong> Powerful suppliers can raise input costs.</li>
                <li><strong>Bargaining Power of Buyers:</strong> Powerful buyers can drive down prices.</li>
                <li><strong>Threat of Substitutes:</strong> Products from other industries that can meet the same customer need.</li>
            </ul>
            <p className="mt-4">A company with a strong moat will be favorably positioned against these five forces, allowing it to sustain high profitability.</p>
        </>
    ),
  },
  {
    id: 'swot-analysis',
    title: 'SWOT Analysis',
    emoji: '📝',
    icon: FileText,
    content: (
        <>
            <h3 className="text-2xl font-bold mb-4">SWOT Analysis</h3>
            <h4 className="text-xl font-semibold mt-6 mb-2">Description</h4>
            <p className="mb-4">A strategic planning technique used to identify a company's internal Strengths and Weaknesses, as well as its external Opportunities and Threats.</p>
            <h4 className="text-xl font-semibold mt-6 mb-2">Deep Learning Insight</h4>
            <p className="mb-4">While often seen as a basic business school exercise, a rigorous SWOT analysis is a powerful tool for an investor. It provides a qualitative framework for understanding a company's strategic position. A high-quality investment thesis is often built on identifying a company that can leverage its unique internal Strengths (e.g., a strong brand, a low-cost structure) to capitalize on external Opportunities (e.g., a new market, a changing consumer trend) while having a plan to mitigate its Weaknesses and defend against external Threats.</p>
        </>
    ),
  },
  {
    id: 'dupont-analysis',
    title: 'Dupont Analysis (ROE Decomposition)',
    emoji: '🧩',
    icon: Sliders,
    content: (
        <>
            <h3 className="text-2xl font-bold mb-4">Dupont Analysis</h3>
            <h4 className="text-xl font-semibold mt-6 mb-2">Description</h4>
            <p className="mb-4">Dupont analysis is a framework that breaks down Return on Equity (ROE) into three distinct components: Profitability, Operating Efficiency, and Financial Leverage.</p>
            <h4 className="text-xl font-semibold mt-6 mb-2">Deep Learning Insight</h4>
            <p className="mb-4">The formula `ROE = (Net Profit Margin) x (Asset Turnover) x (Equity Multiplier)` reveals the *source* of a company's returns. Two companies can have the same high ROE, but for very different reasons. One might have a high ROE due to exceptional profitability (high margins), while another might have the same ROE due to taking on excessive debt (high Equity Multiplier). The Dupont analysis allows an investor to immediately identify the riskier, lower-quality source of returns (leverage) versus the more sustainable, higher-quality sources (profitability and efficiency).</p>
        </>
    ),
  },
    {
    id: 'beneish-m-score',
    title: 'Beneish M-Score',
    emoji: '🕵️',
    icon: Search,
    content: (
        <>
            <h3 className="text-2xl font-bold mb-4">Beneish M-Score</h3>
            <h4 className="text-xl font-semibold mt-6 mb-2">Description</h4>
            <p className="mb-4">A mathematical model that uses eight financial ratios calculated from a company's financial statements to create a score that indicates the probability of earnings manipulation.</p>
            <h4 className="text-xl font-semibold mt-6 mb-2">Deep Learning Insight</h4>
            <p className="mb-4">This is a crucial forensic accounting tool. The eight variables include metrics like Days' Sales in Receivables Index (DSRI), which can indicate premature revenue recognition, and Total Accruals to Total Assets (TATA). A score greater than -1.78 suggests a higher probability that the company is a "manipulator." While not definitive proof of fraud, a high M-Score is a major red flag that warrants a much deeper investigation into the company's accounting practices before investing.</p>
        </>
    ),
  },
  {
    id: 'altman-z-score',
    title: 'Altman Z-Score',
    emoji: '🚨',
    icon: Shield,
    content: (
        <>
            <h3 className="text-2xl font-bold mb-4">Altman Z-Score</h3>
            <h4 className="text-xl font-semibold mt-6 mb-2">Description</h4>
            <p className="mb-4">A formula developed by Edward Altman to predict the likelihood of a company going into bankruptcy within two years. It uses a blend of five financial ratios.</p>
            <h4 className="text-xl font-semibold mt-6 mb-2">Deep Learning Insight</h4>
            <p className="mb-4">The Z-Score combines measures of liquidity, profitability, leverage, solvency, and activity into a single score. A score below 1.8 indicates a company is in financial distress with a high probability of bankruptcy. A score above 3.0 indicates a company is in a safe zone. For value investors, the Z-Score is an essential tool for avoiding "value traps" – companies that look cheap but are actually on the verge of financial collapse.</p>
        </>
    ),
  },
  {
    id: 'piotroski-f-score',
    title: 'Piotroski F-Score',
    emoji: '✅',
    icon: CheckCircle,
    content: (
        <>
            <h3 className="text-2xl font-bold mb-4">Piotroski F-Score</h3>
            <h4 className="text-xl font-semibold mt-6 mb-2">Description</h4>
            <p className="mb-4">A nine-point scoring system developed by Joseph Piotroski to measure a firm's financial strength. A company gets one point for each of nine criteria it meets related to profitability, leverage, and operating efficiency.</p>
            <h4 className="text-xl font-semibold mt-6 mb-2">Deep Learning Insight</h4>
            <p className="mb-4">The F-Score is a powerful quantitative tool for value investors. It helps to differentiate between strong and weak companies among a basket of seemingly cheap (low Price-to-Book) stocks. A score of 8 or 9 is considered very strong, while a score of 0-2 is very weak. A rising F-Score over time is a strong indicator that a company's fundamental health is improving, often before the market recognizes it.</p>
        </>
    ),
  },
  {
    id: 'scenario-analysis',
    title: 'Scenario Analysis & Monte Carlo',
    emoji: '🎲',
    icon: Sliders,
    content: (
        <>
            <h3 className="text-2xl font-bold mb-4">Scenario Analysis & Monte Carlo Simulation</h3>
            <h4 className="text-xl font-semibold mt-6 mb-2">Description</h4>
            <p className="mb-4">These are methods for stress-testing a valuation model (like a DCF). Scenario Analysis involves creating discrete "best case," "base case," and "worst case" scenarios by changing key assumptions. Monte Carlo simulation runs thousands of iterations, randomly varying inputs within a defined probability distribution.</p>
            <h4 className="text-xl font-semibold mt-6 mb-2">Deep Learning Insight</h4>
            <p className="mb-4">These techniques shift valuation from a single, misleadingly precise number to a more realistic probabilistic range. They force an analyst to identify the key drivers of value and risk in their model. For example, a simulation might reveal that the company's valuation is far more sensitive to changes in operating margin than to changes in the growth rate, directing further research to the most critical area.</p>
        </>
    ),
  },
  {
    id: 'economic-cycle-analysis',
    title: 'Economic Cycle Analysis',
    emoji: '🔄',
    icon: Globe,
    content: (
        <>
            <h3 className="text-2xl font-bold mb-4">Economic Cycle Analysis</h3>
            <h4 className="text-xl font-semibold mt-6 mb-2">Description</h4>
            <p className="mb-4">Analyzing where the broad economy is in its cycle (Expansion, Peak, Contraction, Trough) and how that macro environment is likely to impact a company or sector's performance.</p>
            <h4 className="text-xl font-semibold mt-6 mb-2">Deep Learning Insight</h4>
            <p className="mb-4">Understanding the macro backdrop is crucial. Cyclical sectors like Industrials, Materials, and Consumer Discretionary thrive during economic expansions but suffer greatly during contractions. Defensive sectors like Utilities, Healthcare, and Consumer Staples tend to outperform during contractions as their demand is less sensitive to the economic cycle. A top-down analyst first determines the current economic phase to decide which sectors to overweight or underweight before selecting individual stocks.</p>
        </>
    ),
  },
    {
    id: 'industry-concentration',
    title: 'Industry Concentration',
    emoji: '🏢',
    icon: Building,
    content: (
        <>
            <h3 className="text-2xl font-bold mb-4">Industry Concentration (HHI)</h3>
            <h4 className="text-xl font-semibold mt-6 mb-2">Description</h4>
            <p className="mb-4">A measure of the competitiveness of an industry. A highly concentrated industry is dominated by a few large firms (an oligopoly), while a fragmented industry has many small players.</p>
            <h4 className="text-xl font-semibold mt-6 mb-2">Deep Learning Insight</h4>
            <p className="mb-4">Concentration is often measured by the Herfindahl-Hirschman Index (HHI). High concentration is a key component of a moat. Companies in concentrated, oligopolistic industries often have significant pricing power, leading to higher and more stable profit margins. In contrast, firms in highly fragmented, competitive industries (like restaurants) have very little pricing power and typically earn lower returns on capital.</p>
        </>
    ),
  },
  {
    id: 'supply-chain-analysis',
    title: 'Supply Chain Analysis',
    emoji: '🔗',
    icon: GitPullRequest,
    content: (
        <>
            <h3 className="text-2xl font-bold mb-4">Supply Chain Analysis</h3>
            <h4 className="text-xl font-semibold mt-6 mb-2">Description</h4>
            <p className="mb-4">A qualitative analysis of a company's network of suppliers and distributors to identify potential risks and competitive advantages.</p>
            <h4 className="text-xl font-semibold mt-6 mb-2">Deep Learning Insight</h4>
            <p className="mb-4">A fragile supply chain with heavy reliance on a single supplier or geographic region is a major risk (e.g., reliance on a single factory in a politically unstable country). Conversely, a highly efficient, vertically integrated, or globally diversified supply chain can be a significant cost advantage. Analyzing the health of a company's key suppliers and customers can provide leading indicators about the company's own future performance.</p>
        </>
    ),
  },
  {
    id: 'esg-factors',
    title: 'ESG Analysis',
    emoji: '🌱',
    icon: Globe,
    content: (
        <>
            <h3 className="text-2xl font-bold mb-4">ESG (Environmental, Social, Governance)</h3>
            <h4 className="text-xl font-semibold mt-6 mb-2">Description</h4>
            <p className="mb-4">The evaluation of a company's performance on environmental, social, and corporate governance issues. It is a framework for assessing non-financial risks and opportunities.</p>
            <h4 className="text-xl font-semibold mt-6 mb-2">Deep Learning Insight</h4>
            <p className="mb-4">ESG is increasingly seen as a critical component of long-term risk management. Poor environmental practices can lead to massive fines and reputational damage. Bad social practices (e.g., labor issues) can disrupt operations. Weak governance (the 'G' in ESG) is the most critical pillar for fundamental analysts, as it directly relates to shareholder alignment, board independence, and management integrity, which are key determinants of long-term value creation.</p>
        </>
    ),
  },
  {
    id: 'regulatory-risk',
    title: 'Regulatory Risk Analysis',
    emoji: '📜',
    icon: FileText,
    content: (
        <>
            <h3 className="text-2xl font-bold mb-4">Regulatory Risk Analysis</h3>
            <h4 className="text-xl font-semibold mt-6 mb-2">Description</h4>
            <p className="mb-4">Assessing the risk that a change in laws or regulations will materially impact a company's business, profits, or competitive landscape.</p>
            <h4 className="text-xl font-semibold mt-6 mb-2">Deep Learning Insight</h4>
            <p className="mb-4">This risk is particularly high in sectors like pharmaceuticals (FDA approvals), banking (capital requirements), and technology (antitrust laws). For some companies, regulation can be a moat (e.g., a government-granted license to operate). For others, it is a constant threat. Analysts must monitor pending legislation and political trends to assess the probability and potential impact of adverse regulatory changes on their investment thesis.</p>
        </>
    ),
  },
  {
    id: 'tech-disruption',
    title: 'Technological Disruption Analysis',
    emoji: '⚡',
    icon: Zap,
    content: (
        <>
            <h3 className="text-2xl font-bold mb-4">Technological Disruption Analysis</h3>
            <h4 className="text-xl font-semibold mt-6 mb-2">Description</h4>
            <p className="mb-4">Evaluating the risk that a company's products or business model will become obsolete due to new technology.</p>
            <h4 className="text-xl font-semibold mt-6 mb-2">Deep Learning Insight</h4>
            <p className="mb-4">This is one of the greatest threats to a company's long-term moat. An analyst must assess a company's R&D spending, patent portfolio, and adaptability to change. Is management investing to lead the next wave of technology, or are they defending an outdated model? History is littered with dominant companies (e.g., Kodak, Blockbuster) that were destroyed by technological shifts they failed to anticipate.</p>
        </>
    ),
  },
   {
    id: 'customer-concentration',
    title: 'Customer Concentration Risk',
    emoji: '🎯',
    icon: Users,
    content: (
        <>
            <h3 className="text-2xl font-bold mb-4">Customer Concentration Risk</h3>
            <h4 className="text-xl font-semibold mt-6 mb-2">Description</h4>
            <p className="mb-4">The risk that a company faces from having a large portion of its revenue derived from a very small number of customers.</p>
            <h4 className="text-xl font-semibold mt-6 mb-2">Deep Learning Insight</h4>
            <p className="mb-4">Companies must disclose in their financial reports if any single customer accounts for 10% or more of total revenue. High customer concentration gives those few customers immense bargaining power to demand lower prices. More importantly, the loss of a single one of these customers could be catastrophic to the company's revenue and stock price. A diversified customer base is a sign of a much healthier, lower-risk business.</p>
        </>
    ),
  },
  {
    id: 'geographic-revenue',
    title: 'Geographic Revenue Breakdown',
    emoji: '🌍',
    icon: Globe,
    content: (
        <>
            <h3 className="text-2xl font-bold mb-4">Geographic Revenue Breakdown</h3>
            <h4 className="text-xl font-semibold mt-6 mb-2">Description</h4>
            <p className="mb-4">Analyzing a company's revenues by geographic segment to understand its exposure to different economies, currencies, and political risks.</p>
            <h4 className="text-xl font-semibold mt-6 mb-2">Deep Learning Insight</h4>
            <p className="mb-4">Geographic diversification can be a strength, as it reduces reliance on a single economy. However, it also exposes a company to foreign exchange (FX) risk and geopolitical instability. An analyst must consider the growth prospects and risks of each region a company operates in. For example, a company with high exposure to a fast-growing emerging market may have higher growth potential but also faces higher political and currency risk.</p>
        </>
    ),
  },
  {
    id: 'shareholder-structure',
    title: 'Shareholder Structure & Activism',
    emoji: '🏛️',
    icon: Users,
    content: (
        <>
            <h3 className="text-2xl font-bold mb-4">Shareholder Structure & Activism</h3>
            <h4 className="text-xl font-semibold mt-6 mb-2">Description</h4>
            <p className="mb-4">Analyzing who the major shareholders of a company are (e.g., founders, institutions, retail) and the potential for activist investors to influence company strategy.</p>
            <h4 className="text-xl font-semibold mt-6 mb-2">Deep Learning Insight</h4>
            <p className="mb-4">High insider or founder ownership can be a strong sign of alignment with long-term shareholder interests. A high concentration of institutional ownership can provide stability. The presence of an activist investor can be a catalyst for positive change (e.g., forcing a sale of the company, demanding a dividend increase), but it can also lead to short-term-focused decisions that harm long-term value.</p>
        </>
    ),
  },
  {
    id: 'off-balance-sheet',
    title: 'Off-Balance Sheet Financing',
    emoji: '👻',
    icon: FileText,
    content: (
        <>
            <h3 className="text-2xl font-bold mb-4">Off-Balance Sheet Financing</h3>
            <h4 className="text-xl font-semibold mt-6 mb-2">Description</h4>
            <p className="mb-4">An accounting practice where a company creates special purpose entities (SPEs) to hold assets or liabilities that are not reported on its main balance sheet.</p>
            <h4 className="text-xl font-semibold mt-6 mb-2">Deep Learning Insight</h4>
            <p className="mb-4">While sometimes used for legitimate reasons, off-balance sheet financing is a massive red flag for potential accounting fraud (as seen with Enron). It can be used to hide debt and artificially inflate profitability and leverage ratios. A diligent analyst must carefully read the footnotes of financial statements to identify the existence and purpose of any SPEs and assess their potential impact on the company's true financial health.</p>
        </>
    ),
  },
  {
    id: 'pension-accounting',
    title: 'Pension Accounting Analysis',
    emoji: '👴',
    icon: Users,
    content: (
        <>
            <h3 className="text-2xl font-bold mb-4">Pension Accounting Analysis</h3>
            <h4 className="text-xl font-semibold mt-6 mb-2">Description</h4>
            <p className="mb-4">For companies with defined-benefit pension plans, this involves analyzing the pension's funded status (assets vs. liabilities) and the assumptions used in its accounting.</p>
            <h4 className="text-xl font-semibold mt-6 mb-2">Deep Learning Insight</h4>
            <p className="mb-4">A large, underfunded pension plan is a hidden form of debt that can be a major drain on future cash flows. Companies can also manipulate earnings by using aggressive assumptions for the "expected return on plan assets." If the assumed return is unrealistically high, it can artificially boost the company's reported net income. An analyst must check these assumptions and adjust earnings for any aggressive accounting.</p>
        </>
    ),
  },
  {
    id: 'stock-based-comp',
    title: 'Stock-Based Compensation (SBC)',
    emoji: '💸',
    icon: DollarSign,
    content: (
        <>
            <h3 className="text-2xl font-bold mb-4">Stock-Based Compensation (SBC)</h3>
            <h4 className="text-xl font-semibold mt-6 mb-2">Description</h4>
            <p className="mb-4">A non-cash expense where companies pay employees with stock options or restricted stock units (RSUs) instead of cash salaries.</p>
            <h4 className="text-xl font-semibold mt-6 mb-2">Deep Learning Insight</h4>
            <p className="mb-4">SBC is a very real expense that dilutes existing shareholders. Many tech companies report a positive "Adjusted EBITDA" by adding back SBC, which can be highly misleading. A key metric is to calculate FCF after subtracting SBC to get a true picture of shareholder cash flow. Excessive SBC relative to revenue is a red flag that management is diluting shareholders to a significant degree.</p>
        </>
    ),
  },
  {
    id: 'tax-rate-analysis',
    title: 'Tax Rate Analysis',
    emoji: '🧾',
    icon: FileText,
    content: (
        <>
            <h3 className="text-2xl font-bold mb-4">Tax Rate Analysis</h3>
            <h4 className="text-xl font-semibold mt-6 mb-2">Description</h4>
            <p className="mb-4">Analyzing a company's effective tax rate compared to the statutory rate and its peers, and assessing the sustainability of its tax situation.</p>
            <h4 className="text-xl font-semibold mt-6 mb-2">Deep Learning Insight</h4>
            <p className="mb-4">A company with an abnormally low tax rate may be benefiting from temporary tax credits or loopholes that are not sustainable. An analyst must assess if the current low tax rate is a permanent feature of the business or a temporary boost to earnings. An increase in the effective tax rate in the future could significantly reduce net income and FCF, so valuation models should often use a normalized, long-term tax rate assumption.</p>
        </>
    ),
  },
  {
    id: 'capex-analysis',
    title: 'Capital Expenditure (CapEx) Analysis',
    emoji: '🏗️',
    icon: Building,
    content: (
        <>
            <h3 className="text-2xl font-bold mb-4">Capital Expenditure (CapEx) Analysis</h3>
            <h4 className="text-xl font-semibold mt-6 mb-2">Description</h4>
            <p className="mb-4">CapEx are funds used by a company to acquire, upgrade, and maintain physical assets like property, buildings, or equipment. It's found on the cash flow statement.</p>
            <h4 className="text-xl font-semibold mt-6 mb-2">Deep Learning Insight</h4>
            <p className="mb-4">CapEx must be split into two types: Maintenance CapEx (cost to keep the business running) and Growth CapEx (investment in new projects). FCF is calculated using total CapEx. However, a company with high Growth CapEx may have low FCF today but is investing for the future. An analyst must assess the ROIC on this Growth CapEx. If the ROIC on new projects is high, then high Growth CapEx is a very positive sign of a healthy, growing company.</p>
        </>
    ),
  },
  {
    id: 'asset-turnover',
    title: 'Asset Turnover Ratios',
    emoji: '🔄',
    icon: GitPullRequest,
    content: (
        <>
            <h3 className="text-2xl font-bold mb-4">Asset Turnover Ratios</h3>
            <h4 className="text-xl font-semibold mt-6 mb-2">Description</h4>
            <p className="mb-4">These ratios measure how efficiently a company is using its assets to generate sales revenue. Key ratios include the Total Asset Turnover, Fixed Asset Turnover, and Working Capital Turnover.</p>
            <h4 className="text-xl font-semibold mt-6 mb-2">Deep Learning Insight</h4>
            <p className="mb-4">A higher asset turnover ratio signifies greater efficiency. A low-margin business (like a supermarket) must have a very high asset turnover to be profitable. A high-margin business (like a luxury brand) can have a lower turnover. The most important analysis is the trend. A declining asset turnover ratio is a major red flag, suggesting that the company's efficiency is deteriorating and its investments are becoming less productive.</p>
        </>
    ),
  },
  {
    id: 'inventory-analysis',
    title: 'Inventory Analysis (LIFO vs. FIFO)',
    emoji: '📦',
    icon: FileText,
    content: (
        <>
            <h3 className="text-2xl font-bold mb-4">Inventory Analysis</h3>
            <h4 className="text-xl font-semibold mt-6 mb-2">Description</h4>
            <p className="mb-4">Analyzing the level of inventory on the balance sheet and the accounting method used to value it (e.g., LIFO - Last-In, First-Out; FIFO - First-In, First-Out).</p>
            <h4 className="text-xl font-semibold mt-6 mb-2">Deep Learning Insight</h4>
            <p className="mb-4">A rapid build-up of inventory relative to sales is a major warning sign that demand is falling and the company may be forced to write down the value of its inventory in the future. The accounting method also matters, especially in inflationary times. LIFO will result in a higher Cost of Goods Sold (COGS) and lower reported profit, but a more realistic balance sheet. FIFO will show higher profits but may understate the true cost of replacing inventory.</p>
        </>
    ),
  },
    {
    id: 'profit-margins',
    title: 'Profit Margin Analysis',
    emoji: '%',
    icon: BarChart2,
    content: (
        <>
            <h3 className="text-2xl font-bold mb-4">Profit Margin Analysis</h3>
            <h4 className="text-xl font-semibold mt-6 mb-2">Description</h4>
            <p className="mb-4">Analyzing the three key levels of profitability: Gross Margin, Operating Margin, and Net Profit Margin. Each tells a different story about the company's health.</p>
            <h4 className="text-xl font-semibold mt-6 mb-2">Deep Learning Insight</h4>
            <ul className="list-disc pl-6 space-y-2">
                <li><strong>Gross Margin</strong> ((Revenue - COGS) / Revenue): Measures the profitability of the core product itself. A high and stable gross margin is a sign of a strong brand or cost advantage (a moat).</li>
                <li><strong>Operating Margin</strong> (Operating Income / Revenue): Measures profitability after factoring in operating expenses like R&D and SG&A. It reflects management's efficiency in running the business.</li>
                <li><strong>Net Profit Margin</strong> (Net Income / Revenue): The bottom line, after interest and taxes. Can be skewed by leverage and tax strategies.</li>
            </ul>
            <p className="mt-4">Analyzing the trend of these margins over time is more important than a single period's value.</p>
        </>
    ),
  },
  {
    id: 'peg-ratio',
    title: 'PEG Ratio',
    emoji: '📈',
    icon: TrendingUp,
    content: (
        <>
            <h3 className="text-2xl font-bold mb-4">PEG (Price/Earnings to Growth) Ratio</h3>
            <h4 className="text-xl font-semibold mt-6 mb-2">Description</h4>
            <p className="mb-4">The PEG ratio enhances the standard P/E ratio by incorporating the company's earnings growth rate. It is calculated as: PEG = (P/E Ratio) / Annual EPS Growth Rate.</p>
            <h4 className="text-xl font-semibold mt-6 mb-2">Deep Learning Insight</h4>
            <p className="mb-4">The PEG ratio provides a more complete picture for valuing growth stocks. A high P/E ratio might seem expensive, but if the company is growing its earnings very quickly, it might actually be cheap. A common rule of thumb is that a PEG ratio of 1.0 represents a fair valuation. A PEG below 1.0 is considered undervalued, while a PEG above 1.0 may be overvalued. It helps to normalize P/E ratios across companies with different growth profiles.</p>
        </>
    ),
  },
  {
    id: 'sotp-valuation',
    title: 'Sum-of-the-Parts (SOTP) Valuation',
    emoji: '➕',
    icon: Sliders,
    content: (
        <>
            <h3 className="text-2xl font-bold mb-4">Sum-of-the-Parts (SOTP) Valuation</h3>
            <h4 className="text-xl font-semibold mt-6 mb-2">Description</h4>
            <p className="mb-4">A valuation method used for companies that have multiple distinct divisions or business segments (conglomerates). It involves valuing each segment separately and then adding them together to get the total value of the company.</p>
            <h4 className="text-xl font-semibold mt-6 mb-2">Deep Learning Insight</h4>
            <p className="mb-4">SOTP is useful because different business segments may have very different growth profiles, risk levels, and appropriate valuation multiples. For example, one could value a company's stable manufacturing division using an EV/EBITDA multiple and its high-growth software division using a P/S multiple. After summing the values of all segments and subtracting net debt, the analyst can compare the result to the company's current market cap. If the SOTP value is significantly higher, it may indicate the market is undervaluing the company due to a "conglomerate discount."</p>
        </>
    ),
  },
  {
    id: 'ma-analysis',
    title: 'M&A (Mergers & Acquisitions) Analysis',
    emoji: '🤝',
    icon: Users,
    content: (
        <>
            <h3 className="text-2xl font-bold mb-4">M&A Analysis</h3>
            <h4 className="text-xl font-semibold mt-6 mb-2">Description</h4>
            <p className="mb-4">Analyzing a company's history of mergers and acquisitions to assess management's capital allocation skill and the strategic rationale behind its deals.</p>
            <h4 className="text-xl font-semibold mt-6 mb-2">Deep Learning Insight</h4>
            <p className="mb-4">Most M&A deals fail to create shareholder value. An analyst must scrutinize past acquisitions: Did the company overpay (look at the goodwill on the balance sheet)? Was the acquired company successfully integrated? Did the deal generate the promised synergies? A history of value-destructive, overpriced acquisitions is a major red flag about management's competence. Conversely, a track record of smart, accretive "bolt-on" acquisitions at reasonable prices is a sign of a skilled management team.</p>
        </>
    ),
  },
  {
    id: 'book-vs-market-value',
    title: 'Book Value vs. Market Value',
    emoji: '⚖️',
    icon: Scale,
    content: (
        <>
            <h3 className="text-2xl font-bold mb-4">Book Value vs. Market Value</h3>
            <h4 className="text-xl font-semibold mt-6 mb-2">Description</h4>
            <p className="mb-4">Book Value (or Shareholders' Equity) is the accounting value of a company's assets minus its liabilities. Market Value (or Market Cap) is the total value of the company's shares in the stock market.</p>
            <h4 className="text-xl font-semibold mt-6 mb-2">Deep Learning Insight</h4>
            <p className="mb-4">The difference between market value and book value represents the value of the company's intangible assets and future growth prospects that are not captured on the balance sheet (e.g., brand value, intellectual property). For asset-heavy industrial companies, a low Price-to-Book ratio might indicate a value opportunity. For technology or consumer companies, whose value is primarily in intangibles, the book value is often meaningless. The key is to understand *why* the market value differs from the book value.</p>
        </>
    ),
  },
];