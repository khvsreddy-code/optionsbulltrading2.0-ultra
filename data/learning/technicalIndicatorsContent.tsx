import React from 'react';
import type { Pattern } from './bullishPatternsContent'; // Re-use the same interface

export const technicalIndicators: Pattern[] = [
    // --- 1. Core Trend-Following Indicators ---
    {
        id: 'sma',
        title: 'Simple Moving Average (SMA)',
        emoji: '📈',
        content: (
            <>
                <h3 className="text-2xl font-bold mb-4">Simple Moving Average (SMA) 📈</h3>
                <p className="mb-4">The SMA represents the purest, most unadulterated average of a security's closing price over a defined lookback period, N. Its calculation is straightforward: sum the closing prices of the last N periods and divide by N. This creates a rolling average that constantly updates by dropping the oldest price data and adding the newest.</p>
                <h4 className="text-xl font-semibold mt-6 mb-2">Deep Learning & Psychology</h4>
                <p className="mb-4">Its defining characteristic is that every data point within the lookback window holds precisely equal weight. This democratic approach to data makes the SMA inherently slow to react to sudden price shocks—a trait known as <strong>lag</strong>. This lag makes the SMA generally unsuitable for generating nimble, quick entry signals. However, its sluggishness is its greatest strength. It excels at filtering out market noise and defining the underlying, macro-trend, acting as a crucial barometer for institutional sentiment.</p>
                <p className="mb-4">The <strong>200-period SMA</strong>, for instance, is the undisputed gold standard for separating long-term secular bull markets (price consistently above) from bear markets (price consistently below). Its importance is a self-fulfilling prophecy, heavily watched by media and hard-coded into institutional trading algorithms. Crossover strategies, like the <strong>Golden Cross</strong> (faster 50-period SMA crosses above the slower 200-period SMA) and the <strong>Death Cross</strong>, are major, albeit delayed, signals of a structural shift in market dominance. In active trends, shorter SMAs (like the 20 or 50) act as powerful, dynamic zones of support and resistance, providing objective areas for traders to add to positions or take profits. The SMA essentially acts as a psychological center of gravity for the market.</p>
            </>
        ),
    },
    {
        id: 'ema',
        title: 'Exponential Moving Average (EMA)',
        emoji: '⚡',
        content: (
            <>
                <h3 className="text-2xl font-bold mb-4">Exponential Moving Average (EMA) ⚡</h3>
                <p className="mb-4">The EMA is a sophisticated evolution of the SMA, meticulously engineered to reduce lag by applying an exponentially greater weighting to the most recent price data. While it still incorporates all historical data points in its lookback window, their influence diminishes exponentially over time.</p>
                <h4 className="text-xl font-semibold mt-6 mb-2">Deep Learning & Psychology</h4>
                <p className="mb-4">The weighting is governed by a smoothing constant (α= 2 / (N+1)), which ensures that the most recent price has the most significant impact on the average. This sensitivity makes the EMA track price action far more closely than the SMA, making it the preferred tool for generating more responsive, short-term trade signals. It functions as a highly effective dynamic support level in uptrends and resistance in downtrends (e.g., the 9- and 21-period EMAs are staples for momentum traders).</p>
                <p className="mb-4">The <strong>slope</strong> of the EMA line provides an immediate, clear visual measure of the trend's velocity and health. A key advanced technique is observing the <strong>'fanning out'</strong> or compression of a series of EMAs (e.g., plotting the 8, 13, 21, and 55 EMAs together to form an 'EMA ribbon'). When the ribbon expands, it signifies growing consensus and accelerating momentum. When it compresses, it signals consolidation and a potential trend change. The distance of the price from a key EMA also serves as an indicator of short-term overextension, often leading to a reversion back to the mean (the EMA itself).</p>
            </>
        ),
    },
    {
        id: 'macd',
        title: 'Moving Average Convergence Divergence (MACD)',
        emoji: '🌊',
        content: (
            <>
                <h3 className="text-2xl font-bold mb-4">Moving Average Convergence Divergence (MACD) 🌊</h3>
                <p className="mb-4">The MACD is a multi-faceted indicator that measures both the momentum and the trend direction by analyzing the relationship between two EMAs. The <strong>MACD Line</strong> (the 'engine' of the indicator) is the difference between the 12-period EMA and the 26-period EMA. The <strong>Signal Line</strong> is a 9-period EMA of the MACD Line, acting as a smoothed trigger line.</p>
                <h4 className="text-xl font-semibold mt-6 mb-2">Deep Learning & Psychology</h4>
                <p className="mb-4">Its true power is visualized through the <strong>MACD Histogram</strong>, which plots the difference between the MACD Line and the Signal Line. The histogram represents the *rate of change* of momentum. A rising histogram above the zero line shows accelerating bullish momentum. Its most powerful and predictive signal is <strong>Divergence</strong>. When the price makes a new high but the MACD indicator fails to make a corresponding higher high, it reveals a critical disconnect: the force behind the move is deteriorating, signaling a high-probability reversal. This divergence exposes the underlying weakness in a trend that price action alone conceals. The zero line acts as a long-term equilibrium; a crossover confirms that the underlying EMA structure has officially flipped from bullish to bearish, or vice-versa, representing a major shift in the intermediate-term trend.</p>
            </>
        ),
    },
    {
        id: 'bollinger-bands',
        title: 'Bollinger Bands (BB)',
        emoji: '।।',
        content: (
            <>
                <h3 className="text-2xl font-bold mb-4">Bollinger Bands (BB) ।।</h3>
                <p className="mb-4">Developed by John Bollinger, this indicator is a volatility-based channel that provides a relative definition of high and low prices. It consists of a middle band (typically a 20-period SMA) and two outer bands set at two Standard Deviations (2σ) away from it.</p>
                <h4 className="text-xl font-semibold mt-6 mb-2">Deep Learning & Psychology</h4>
                <p className="mb-4">Standard Deviation is a statistical measure of price dispersion. Because two standard deviations encompass approximately 95% of all price data over the lookback period, any price touch on the outer bands is a statistically significant event, signaling that the asset is becoming overextended relative to its recent average. The distance between the bands is a direct visual representation of market volatility. When the bands contract into a narrow channel (the <strong>Bollinger Squeeze</strong>), it signifies a period of extremely low volatility, which often acts as the calm before the storm, preceding a powerful, explosive breakout. The primary trading principle is mean reversion: prices tend to revert to the middle SMA. However, in exceptionally strong trends, the price can "walk the band," continuously touching the outer band, which paradoxically becomes a signal of immense trend strength, not reversal.</p>
            </>
        ),
    },
    {
        id: 'parabolic-sar',
        title: 'Parabolic SAR (PSAR)',
        emoji: '🛑',
        content: (
            <>
                <h3 className="text-2xl font-bold mb-4">Parabolic SAR (PSAR) 🛑</h3>
                <p className="mb-4">The PSAR is a time-and-price based stop-and-reverse system designed to provide objective, emotionless trailing stop-loss placements within a trend. It appears on the chart as a series of dots either below the price (in an uptrend) or above the price (in a downtrend).</p>
                <h4 className="text-xl font-semibold mt-6 mb-2">Deep Learning & Psychology</h4>
                <p className="mb-4">The dots are calculated using the previous period's dot, the trend's Extreme Point (the highest high in an uptrend, or lowest low in a downtrend), and an <strong>Acceleration Factor (AF)</strong>. The AF is the adaptive engine of the PSAR; it starts at a low value and increases incrementally each time a new Extreme Point is reached. This unique mechanic causes the trailing stop (the dots) to accelerate and tighten its proximity to the price as the trend matures and extends. This is designed to lock in profits more aggressively as the trend becomes older and more susceptible to reversal. The most important signal is the <strong>dot flip</strong>—when the dot crosses over the price—which provides a definitive, mechanical signal to exit the current position and potentially reverse to the other side. Its primary weakness is its tendency to generate frequent false signals (whipsaws) in sideways, non-trending markets.</p>
            </>
        ),
    },
    // --- 2. Core Momentum & Oscillators ---
    {
        id: 'rsi',
        title: 'Relative Strength Index (RSI)',
        emoji: '💪',
        content: (
            <>
                <h3 className="text-2xl font-bold mb-4">Relative Strength Index (RSI) 💪</h3>
                <p className="mb-4">The RSI, developed by J. Welles Wilder Jr., is a premier momentum oscillator that measures the speed and change of price movements. It achieves this by comparing the magnitude of an asset's recent gains to its recent losses over a specified lookback period (typically 14), then normalizing this ratio into a value between 0 and 100.</p>
                <h4 className="text-xl font-semibold mt-6 mb-2">Deep Learning & Psychology</h4>
                <p className="mb-4">The RSI is not just an overbought/oversold indicator; it is a direct measure of the internal strength and velocity of buying versus selling pressure. Traditional interpretation designates readings above 70 as <strong>overbought</strong> and below 30 as <strong>oversold</strong>, suggesting the current trend is becoming overextended and may be due for a correction or reversal. However, its most powerful and predictive signal is <strong>Divergence</strong>. A <strong>Bearish Divergence</strong> occurs when the price charts a new higher high, but the RSI charts a lower high. This reveals that the buying enthusiasm that drove the price to its new peak is critically weakening; the move is hollow and unsupported by momentum, providing a high-probability warning of an imminent reversal. Conversely, a <strong>Bullish Divergence</strong> (lower price low, higher RSI low) signals that selling pressure is exhausted. The RSI can also be used to define trend structure: in a strong, healthy bull market, the RSI will often remain consistently between the 40 and 90 levels, using the 40-50 zone as a support area during pullbacks.</p>
            </>
        ),
    },
    {
        id: 'stochastic-oscillator',
        title: 'Stochastic Oscillator',
        emoji: '🔄',
        content: (
             <>
                <h3 className="text-2xl font-bold mb-4">Stochastic Oscillator 🔄</h3>
                <p className="mb-4">The Stochastic Oscillator is a momentum indicator founded on the principle that in a healthy uptrend, closing prices should consistently be near the high of the recent trading range, and in a downtrend, near the low. It compares a security's closing price to its price range over N periods (typically 14), scaled from 0 to 100.</p>
                <h4 className="text-xl font-semibold mt-6 mb-2">Deep Learning & Psychology</h4>
                <p className="mb-4">It utilizes two lines: <strong>%K</strong> (the main line, showing the current close's position within the range) and <strong>%D</strong> (a 3-period SMA of %K, acting as a smoother signal line). Key thresholds are 80 (overbought) and 20 (oversold). The highest-probability signals are generated by line crossovers that occur within these extreme zones. For maximum reliability, traders look for a Bullish Crossover (%K crossing above %D) only *after* both lines have been deeply oversold below the 20 level, confirming that bullish momentum is accelerating from a state of exhaustion. The Stochastic is known for being a leading indicator, often peaking and troughing before the underlying price, providing an early warning system for trend fatigue.</p>
            </>
        ),
    },
    {
        id: 'adx',
        title: 'Average Directional Index (ADX)',
        emoji: '🧭',
        content: (
            <>
                <h3 className="text-2xl font-bold mb-4">Average Directional Index (ADX) 🧭</h3>
                <p className="mb-4">The ADX is a unique and widely misunderstood indicator that measures the <strong>strength</strong> or <strong>power</strong> of a trend, not its direction. It is plotted alongside two companion lines: the Positive Directional Indicator (+DI) and the Negative Directional Indicator (−DI), which define the direction.</p>
                <h4 className="text-xl font-semibold mt-6 mb-2">Deep Learning & Psychology</h4>
                <p className="mb-4">The ADX value itself is derived from the smoothed average of the difference between the +DI and −DI lines. An ADX value rising above 25 confirms that a strong, sustainable trend is in place, making trend-following strategies (like using moving averages) highly effective. Conversely, an ADX value below 20 confirms a weak, ranging, or choppy market, where trend strategies will fail and range-bound strategies (using oscillators like Stochastics) become more appropriate. The ADX line itself tells you *if* you should be trading a trend, while the relationship between the ±DI lines tells you *which* direction to trade. If +DI is above −DI, the trend is bullish; if −DI is above +DI, the trend is bearish. A rising ADX coupled with +DI > −DI is the signature of a powerful, healthy uptrend.</p>
            </>
        ),
    },
    {
        id: 'williams-r',
        title: 'Williams %R',
        emoji: '🎯',
        content: (
            <>
                <h3 className="text-2xl font-bold mb-4">Williams %R 🎯</h3>
                <p className="mb-4">Developed by Larry Williams, Williams %R is a highly sensitive, inverted momentum oscillator that is essentially a mirror image of the Stochastic Oscillator, scaled from 0 to −100.</p>
                <h4 className="text-xl font-semibold mt-6 mb-2">Deep Learning & Psychology</h4>
                <p className="mb-4">It measures the closing price relative to the highest high over the lookback period. This specific calculation makes it exceptionally reactive to price changes. Readings between 0 and −20 are considered <strong>overbought</strong> (the close is very near the highest high of the range), and readings between −80 and −100 are <strong>oversold</strong> (the close is very near the lowest low). Because its formula focuses solely on the relationship to the period's highest high (unlike the Stochastic which uses the full range), Williams %R is often considered faster and more sensitive. This makes it a powerful tool for scalpers and short-term traders looking to identify aggressive reversals or quick momentum failures at market extremes. It can signal trend exhaustion a few bars before other oscillators.</p>
            </>
        ),
    },
    {
        id: 'cci',
        title: 'Commodity Channel Index (CCI)',
        emoji: '➿',
        content: (
            <>
                <h3 className="text-2xl font-bold mb-4">Commodity Channel Index (CCI) ➿</h3>
                <p className="mb-4">The CCI, developed by Donald Lambert, is a versatile momentum oscillator that measures the price's deviation from its statistical mean (an SMA of the Typical Price) relative to the Average Deviation of the price.</p>
                <h4 className="text-xl font-semibold mt-6 mb-2">Deep Learning & Psychology</h4>
                <p className="mb-4">Unlike RSI or Stochastics, the CCI is an <strong>unbounded</strong> oscillator, meaning it has no theoretical upper or lower limit. This makes it exceptionally good at identifying extreme statistical outliers in price. While standard thresholds are +100 and −100, a critical trading insight is that a sustained move above +100 is often interpreted not just as an overbought condition, but as the <strong>initiation of a strong new uptrend</strong>. It signals that the price has achieved a significant "escape velocity" from its average, suggesting powerful, sustained momentum. The primary reversal signal is a crossover back toward the zero line from an extreme reading (e.g., crossing back below +100 after being above it).</p>
            </>
        ),
    },
    // --- 3. Core Volume & Breadth Indicators ---
    {
        id: 'obv',
        title: 'On-Balance Volume (OBV)',
        emoji: '📊',
        content: (
            <>
                <h3 className="text-2xl font-bold mb-4">On-Balance Volume (OBV) 📊</h3>
                <p className="mb-4">OBV is a simple yet powerful cumulative volume flow indicator built on the foundational principle that volume precedes price. It operates on the premise that significant moves by institutional 'smart money' are first visible in volume before they manifest in large price changes. The calculation is a running total: if today's close is higher than yesterday's, today's volume is added to the OBV total. If the close is lower, the volume is subtracted.</p>
                <h4 className="text-xl font-semibold mt-6 mb-2">Deep Learning & Psychology</h4>
                <p className="mb-4">The absolute numerical value of the OBV line is entirely irrelevant; its sole purpose is to show a trend. The slope of the OBV line must move in harmony with the price trend to confirm its validity. A rising price accompanied by a rising OBV confirms a healthy, volume-backed uptrend (accumulation). Its most critical and actionable signal is <strong>Divergence</strong>. A <strong>Non-Confirmation</strong> or <strong>Bearish Divergence</strong> occurs when the price rallies to a new high, but the OBV line fails to make a corresponding new high. This is a red flag, suggesting that the move is not being supported by significant volume (i.e., institutional participation is absent) and is likely being driven by retail speculation. This indicates that distribution may be occurring into strength, and the rally has a high probability of failing. OBV provides a look 'under the hood' of the market to gauge the conviction behind a price move.</p>
            </>
        ),
    },
    {
        id: 'cmf',
        title: 'Chaikin Money Flow (CMF)',
        emoji: '💰',
        content: (
            <>
                <h3 className="text-2xl font-bold mb-4">Chaikin Money Flow (CMF) 💰</h3>
                <p className="mb-4">The CMF measures the degree of accumulation (buying pressure) versus distribution (selling pressure) over a lookback period (typically 20 or 21), heavily weighted by volume.</p>
                <h4 className="text-xl font-semibold mt-6 mb-2">Deep Learning & Psychology</h4>
                <p className="mb-4">It first calculates the <strong>Close Location Value (CLV)</strong>, which determines where the closing price finished within the bar's high-low range. A close at the high is +1; at the low is -1. This CLV is then multiplied by the period's volume to determine the "money flow" for that bar. CMF then sums this money flow over N periods. Readings consistently above the zero line signal net accumulation; below zero signal net distribution. The zero line acts as the crucial bull/bear equilibrium point. Sustained readings above +0.25 or below −0.25 are highly indicative of strong, underlying institutional conviction driving the trend, as it confirms that the majority of trading volume is consistently occurring at one extreme of the price bar, day after day.</p>
            </>
        ),
    },
    {
        id: 'atr',
        title: 'Average True Range (ATR)',
        emoji: '📏',
        content: (
            <>
                <h3 className="text-2xl font-bold mb-4">Average True Range (ATR) 📏</h3>
                <p className="mb-4">The ATR is a non-directional, pure measure of market volatility. It was developed by J. Welles Wilder Jr. to capture the full volatility of the market, including any price gaps between trading sessions. It is calculated by smoothing the <strong>True Range</strong>, which is the greatest of three values: (Current High - Current Low), |Current High - Previous Close|, or |Current Low - Previous Close|.</p>
                <h4 className="text-xl font-semibold mt-6 mb-2">Deep Learning & Psychology</h4>
                <p className="mb-4">ATR is fundamentally a risk management and position sizing tool, not a trade signal generator. A high ATR value means high volatility and large, unpredictable market swings; a low ATR signals a compressed, quiet, and low-risk market environment. Its primary application is in setting volatility-adjusted stop-losses. For example, instead of a fixed percentage stop, a trader might place a stop 2×ATR away from their entry price. This ensures the stop is wide enough to accommodate normal market noise in a volatile market but tight enough in a quiet one. It is also essential for position sizing, allowing a trader to adjust their trade size to maintain a consistent dollar risk per trade regardless of the asset's volatility.</p>
            </>
        ),
    },
    {
        id: 'mfi',
        title: 'Money Flow Index (MFI)',
        emoji: '💸',
        content: (
            <>
                <h3 className="text-2xl font-bold mb-4">Money Flow Index (MFI) 💸</h3>
                <p className="mb-4">The MFI is often called the "volume-weighted RSI." It is a momentum oscillator that measures the rate and intensity of money flowing into or out of a security by incorporating both price and volume data.</p>
                <h4 className="text-xl font-semibold mt-6 mb-2">Deep Learning & Psychology</h4>
                <p className="mb-4">It first calculates the Typical Price for each period, then determines if money flow was positive or negative based on whether the Typical Price was higher or lower than the previous period's. This flow is then multiplied by volume. Finally, it uses a formula similar to the RSI to create an oscillator scaled from 0 to 100. By integrating volume, the MFI provides a more robust confirmation of overbought (above 80) and oversold (below 20) conditions. A high RSI reading might just be a price spike, but a high MFI reading confirms that the spike was backed by significant volume. Its most reliable signals come from <strong>volume-backed divergence</strong>: if the price makes a new high but the MFI doesn't, it provides powerful confirmation that large money is not supporting the final push, making the reversal signal highly credible.</p>
            </>
        ),
    },
    {
        id: 'cot-index',
        title: 'Commitment of Traders (COT) Index',
        emoji: '🏛️',
        content: (
            <>
                <h3 className="text-2xl font-bold mb-4">Commitment of Traders (COT) Index 🏛️</h3>
                <p className="mb-4">The COT Index is a powerful, long-term sentiment indicator based on the weekly Commitment of Traders report for futures and commodities, published by the CFTC. It transforms the raw positioning data of two key market groups—<strong>Large Speculators</strong> (trend-following funds) and <strong>Commercials</strong> (hedgers, or 'smart money')—into a percentile rank over a multi-year lookback period.</p>
                <h4 className="text-xl font-semibold mt-6 mb-2">Deep Learning & Psychology</h4>
                <p className="mb-4">The COT Index is primarily a <strong>contrarian signal</strong>. The theory is that Large Speculators are trend-followers who tend to become overly crowded and euphoric at market tops and overly pessimistic at bottoms. Commercials, who use the futures markets to hedge real-world assets, are typically on the correct side of major trend changes. Therefore, when Large Speculators reach an extreme net long position (an index reading of 80-100%) while Commercials are at an extreme net short position, it signals a major market top is likely due to speculative overcrowding. The reverse—extreme Speculator short positions—signals a major bottom is near, as there are few participants left to sell.</p>
            </>
        ),
    },
    // --- 4. System & Composite Indicators ---
    {
        id: 'ichimoku',
        title: 'Ichimoku Kinko Hyo (Cloud)',
        emoji: '☁️',
        content: (
            <>
                <h3 className="text-2xl font-bold mb-4">Ichimoku Kinko Hyo (Cloud) ☁️</h3>
                <p className="mb-4">The Ichimoku system ("one-look equilibrium chart") is a comprehensive, multi-layered trend-following system designed to provide a deep, immediate understanding of trend, momentum, and support/resistance. It consists of five primary components: <strong>Tenkan-Sen</strong> (fast line), <strong>Kijun-Sen</strong> (slow line), <strong>Chikou Span</strong> (lagging span), and the <strong>Senkou Span A & B</strong>, which form the <strong>Kumo (Cloud)</strong>.</p>
                <h4 className="text-xl font-semibold mt-6 mb-2">Deep Learning & Psychology</h4>
                <p className="mb-4">The system offers a powerful, three-dimensional confirmation process: 1) <strong>Trend Confirmation:</strong> The price's location relative to the Kumo is the primary filter. Price above the Cloud is bullish; below is bearish; inside is neutral. 2) <strong>Momentum:</strong> The crossover of the Tenkan-Sen and Kijun-Sen provides short-term momentum signals, similar to a moving average crossover. 3) <strong>Structure & Confirmation:</strong> The Chikou Span (current price plotted 26 periods in the past) must be free from interacting with past price action to confirm a clear trend. The Kumo itself is the most crucial element, projecting a thick, dynamic band of future support and resistance. The thickness and color of the future Cloud predict future volatility and the anticipated strength of that support/resistance zone.</p>
            </>
        ),
    },
    {
        id: 'keltner-channels',
        title: 'Keltner Channels',
        emoji: ' kênh',
        content: (
            <>
                <h3 className="text-2xl font-bold mb-4">Keltner Channels  kênh</h3>
                <p className="mb-4">Keltner Channels are volatility-based envelopes plotted above and below a central EMA (typically 20-period), with the bands set at a multiple of the Average True Range (ATR) away from the center line (typically 2×ATR).</p>
                <h4 className="text-xl font-semibold mt-6 mb-2">Deep Learning & Psychology</h4>
                <p className="mb-4">Unlike Bollinger Bands, which use Standard Deviation (a measure of price dispersion), Keltner Channels use ATR (a measure of absolute dollar volatility). This key difference makes them less susceptible to being skewed by single, sharp price spikes and provides a smoother, more uniform channel. They are primarily used to identify strong, sustained trend breakouts: a definitive candle close above the upper channel is a high-conviction buy signal that suggests the trend has enough momentum to continue. They are also essential components in volatility squeeze setups when used in conjunction with Bollinger Bands. A "TTM Squeeze" occurs when the Bollinger Bands contract to trade *inside* the Keltner Channels, signaling an imminent volatility explosion.</p>
            </>
        ),
    },
    {
        id: 'elder-ray',
        title: 'Elder Ray Index',
        emoji: '☀️',
        content: (
            <>
                <h3 className="text-2xl font-bold mb-4">Elder Ray Index ☀️</h3>
                <p className="mb-4">Developed by Dr. Alexander Elder, this indicator is designed to measure the underlying power of buyers and sellers relative to a central EMA (typically 13-period). It achieves this through two separate components plotted as a histogram: <strong>Bull Power</strong> (Current High − EMA) and <strong>Bear Power</strong> (Current Low − EMA).</p>
                <h4 className="text-xl font-semibold mt-6 mb-2">Deep Learning & Psychology</h4>
                <p className="mb-4">The indicator quantifies the market's ability to push prices to new extremes beyond the recent average (the EMA). A rising Bull Power histogram indicates increasing buying strength, while a falling Bear Power histogram (moving towards zero) indicates diminishing selling pressure. Its most reliable and actionable signal is <strong>Divergence</strong>. A new high in price that is not confirmed by a new, higher peak in Bull Power suggests that buyers are exhausting their force and are failing to push the high significantly above the EMA, signaling an imminent reversal. The Zero Line acts as the equilibrium point; a healthy uptrend is characterized by consistently positive Bull Power and Bear Power that oscillates near the zero line.</p>
            </>
        ),
    },
    {
        id: 'fibonacci-retracement',
        title: 'Fibonacci Retracement',
        emoji: '🌀',
        content: (
            <>
                <h3 className="text-2xl font-bold mb-4">Fibonacci Retracement 🌀</h3>
                <p className="mb-4">This is a premier technical tool used to identify potential static support and resistance levels. It works by taking two extreme points on a chart (a major swing high and a major swing low) and dividing the vertical distance by the key Fibonacci ratios: 23.6%, 38.2%, 50.0%, 61.8%, and 78.6%.</p>
                <h4 className="text-xl font-semibold mt-6 mb-2">Deep Learning & Psychology</h4>
                <p className="mb-4">The ratios are derived from a mathematical sequence found throughout nature and art, and their application in finance is based on the theory that market movements are not random but often retrace a predictable portion of a prior move before continuing in the original direction. These levels become powerful, self-fulfilling psychological zones where traders anticipate reactions. The <strong>61.8% level</strong> is considered the most critical "golden" retracement point. A pullback that holds this level and reverses is considered a very strong confirmation that the original trend is healthy and likely to resume. A break below the 61.8% level often suggests the original trend has failed and a larger reversal is underway.</p>
            </>
        ),
    },
    {
        id: 'projection-bands',
        title: 'Projection Bands',
        emoji: '📽️',
        content: (
            <>
                <h3 className="text-2xl font-bold mb-4">Projection Bands 📽️</h3>
                <p className="mb-4">Projection Bands are advanced volatility envelopes based on Linear Regression Analysis. The central line is not a simple average, but the <strong>Linear Regression Line</strong>—the statistical "line of best fit" for the price data over the lookback period.</p>
                <h4 className="text-xl font-semibold mt-6 mb-2">Deep Learning & Psychology</h4>
                <p className="mb-4">The outer bands are then plotted at a set distance away from this central regression line. This distance is determined by the maximum deviation of the price from the regression line observed during the lookback period. This methodology creates a statistically significant trading channel that adapts to the price's trend and volatility. They are highly effective for identifying when the price is overextended (hitting an outer band) and due for a mean reversion back to the central regression line. A breakout beyond the bands signals a total failure of the established statistical norm and the start of a new, powerful trend that has broken free from its prior regression channel.</p>
            </>
        ),
    },
    // --- 5. Advanced Oscillators and Cycle Indicators ---
    {
        id: 'ultimate-oscillator',
        title: 'Ultimate Oscillator (UO)',
        emoji: '⚙️',
        content: (
            <>
                <h3 className="text-2xl font-bold mb-4">Ultimate Oscillator (UO) ⚙️</h3>
                <p className="mb-4">Developed by Larry Williams, the UO is a complex momentum oscillator that addresses a common flaw of many oscillators: their sensitivity to short-term price spikes. It achieves this by using a weighted average of momentum calculated over three distinct timeframes (short, medium, and long—typically 7, 14, and 28 periods).</p>
                <h4 className="text-xl font-semibold mt-6 mb-2">Deep Learning & Psychology</h4>
                <p className="mb-4">Instead of just comparing gains and losses, the UO calculates momentum by measuring "Buying Pressure" relative to the "True Range" for each of the three timeframes. This provides a more nuanced view of momentum. These three momentum readings are then combined using inverse weights (4:2:1), meaning the shortest-term momentum (7-period) has the most significant impact on the final value. This multi-period weighting system ensures that a signal is only triggered when momentum is confirmed across multiple time horizons, making the UO less prone to false readings from a single volatile day. Its most powerful application is identifying <strong>Divergence</strong>: when the price makes a new low but the UO makes a higher low (especially from an oversold level below 30), it signals a high-conviction reversal because buying pressure is improving across all three cycles simultaneously. The key signal is Bullish Divergence confirmed across all three cycles, offering a high-conviction reversal signal at oversold levels (&lt;30).</p>
            </>
        ),
    },
    {
        id: 'dpo',
        title: 'Detrended Price Oscillator (DPO)',
        emoji: '〽️',
        content: (
            <>
                <h3 className="text-2xl font-bold mb-4">Detrended Price Oscillator (DPO) 〽️</h3>
                <p className="mb-4">The DPO is explicitly designed to isolate short-term price cycles by completely removing the influence of the long-term trend from the price data (hence "detrended"). It achieves this by comparing the current price to a Simple Moving Average that has been displaced (shifted) to the left, typically by half the lookback period plus one.</p>
                <h4 className="text-xl font-semibold mt-6 mb-2">Deep Learning & Psychology</h4>
                <p className="mb-4">The resulting oscillator is centered around a zero line and effectively visualizes the cyclicality of the market without being dominated by the primary trend's upward or downward slope. This makes it an unparalleled tool for identifying the length and rhythm of historical market cycles (by measuring the distance between peaks or troughs on the DPO). Swing traders use it to anticipate short-term turning points. A move from below the zero line to above it can signal the start of a new short-term upswing within a larger trend, making it excellent for timing entries on pullbacks. It is not a trend-following tool; it is a cycle-identification tool.</p>
            </>
        ),
    },
    {
        id: 'fisher-transform',
        title: 'Fisher Transform',
        emoji: '🎣',
        content: (
            <>
                <h3 className="text-2xl font-bold mb-4">Fisher Transform 🎣</h3>
                <p className="mb-4">The Fisher Transform is a mathematical method that takes any price data or indicator output and converts it into a Gaussian normal distribution (a bell curve). This non-linear transformation creates an indicator line (the Fisher line) and a Signal Line that visually appear to oscillate in a sharp, almost square-wave pattern.</p>
                <h4 className="text-xl font-semibold mt-6 mb-2">Deep Learning & Psychology</h4>
                <p className="mb-4">The primary purpose of this transformation is to exaggerate price extremes, making turning points exceptionally clear and minimizing lag. In a normal distribution, extreme events are rare. Therefore, when the Fisher Transform reaches a high value (e.g., above +2) or a low value (e.g., below -2), it is signaling a statistically significant price outlier that is highly likely to revert to the mean. The sharp, clear crossovers of the Fisher line and its Signal Line are widely used as definitive, low-lag entry and exit signals based on this principle of extreme statistical deviation. It is highly sensitive and best used for short-term swing trading.</p>
            </>
        ),
    },
    {
        id: 'trix',
        title: 'TRIX',
        emoji: '💯',
        content: (
            <>
                <h3 className="text-2xl font-bold mb-4">TRIX 💯</h3>
                <p className="mb-4">TRIX is a powerful momentum oscillator that plots the percentage rate-of-change of a Triple Exponentially Smoothed Moving Average (TEMA) of the closing price. The "Triple" smoothing is key to its character.</p>
                <h4 className="text-xl font-semibold mt-6 mb-2">Deep Learning & Psychology</h4>
                <p className="mb-4">The extensive triple smoothing of the price data before calculating the rate-of-change ensures that the TRIX indicator is exceptionally filtered and virtually immune to minor price fluctuations and market noise. This makes TRIX a very slow, stable, and reliable indicator best suited for identifying major, long-term trend reversals and the momentum behind them. Its primary signal is the <strong>zero-line crossover</strong>: a move from negative to positive territory is often delayed but provides a highly confirmed and low-noise indication of the end of a primary bear market phase. Similarly, a cross below zero signals the start of a major downtrend. It is the preferred tool for position traders who need to filter out the noise of daily and weekly fluctuations to focus on the primary market trend.</p>
            </>
        ),
    },
    {
        id: 'aroon',
        title: 'Aroon Indicator',
        emoji: '🌅',
        content: (
            <>
                <h3 className="text-2xl font-bold mb-4">Aroon Indicator 🌅</h3>
                <p className="mb-4">The Aroon indicator, developed by Tushar Chande, is designed to measure the strength and duration of the current trend. It consists of two lines: <strong>Aroon Up</strong>, which calculates the number of periods since the highest high within the lookback period, and <strong>Aroon Down</strong>, which calculates the number of periods since the lowest low.</p>
                <h4 className="text-xl font-semibold mt-6 mb-2">Deep Learning & Psychology</h4>
                <p className="mb-4">Aroon (Sanskrit for "Dawn's Early Light") ranges from 0 to 100. Aroon Up consistently near 100 with Aroon Down near 0 confirms a strong, sustained uptrend where new highs are being continuously made. The crossover of the two lines is the core signal: when Aroon Up crosses above Aroon Down, it confirms the start of a new uptrend. When both lines run parallel and are close to the 50 level, it signals a ranging market that lacks directional conviction, warning traders to avoid trend-following strategies. The Aroon Oscillator, which is simply Aroon Up - Aroon Down, provides a single-line visualization of this relationship.</p>
            </>
        ),
    },
    // --- 6. Advanced Volume & Supply/Demand Indicators ---
    {
        id: 'chaikin-oscillator',
        title: 'Chaikin Oscillator (CO)',
        emoji: '💸',
        content: (
            <>
                <h3 className="text-2xl font-bold mb-4">Chaikin Oscillator (CO) 💸</h3>
                <p className="mb-4">The CO is a second-derivative indicator that measures the momentum of the Accumulation/Distribution Line (A/D Line). It is calculated as the difference between a short-term EMA (typically 3-period) and a long-term EMA (typically 10-period) of the A/D Line itself.</p>
                <h4 className="text-xl font-semibold mt-6 mb-2">Deep Learning & Psychology</h4>
                <p className="mb-4">Because the A/D Line reflects the underlying buying and selling pressure (volume flow), the Chaikin Oscillator essentially tracks the *acceleration and deceleration* of that flow. Its primary use is to spot <strong>Divergence</strong>. If the price is making a new high, but the Chaikin Oscillator is making a lower high, it provides an early warning of impending trend failure. This divergence reveals a slowdown in the institutional volume commitment that is not yet visible in the price itself. Zero-line crossovers can be used to confirm the shift in the underlying accumulation (buying) or distribution (selling) momentum from positive to negative.</p>
            </>
        ),
    },
    {
        id: 'volume-profile',
        title: 'Volume Profile (VP)',
        emoji: '📊',
        content: (
            <>
                <h3 className="text-2xl font-bold mb-4">Volume Profile (VP) 📊</h3>
                <p className="mb-4">The Volume Profile is a crucial, non-time-series analytical tool that plots a horizontal histogram of the total volume traded at each specific price level within a defined period (e.g., a daily session or a full trend swing).</p>
                <h4 className="text-xl font-semibold mt-6 mb-2">Deep Learning & Psychology</h4>
                <p className="mb-4">The VP is the foundation of market structure analysis, as it reveals areas of high and low liquidity. The <strong>Point of Control (POC)</strong> is the single price level with the highest traded volume, representing the "fairest" price where the most business was conducted. The <strong>Value Area (VA)</strong> is the range of prices (typically centered around the POC) where 70% of the total volume occurred. The POC and the upper/lower boundaries of the VA serve as highly predictive static support and resistance zones, as institutional traders are psychologically and financially motivated to defend these high-liquidity price levels where they have built large positions.</p>
            </>
        ),
    },
    {
        id: 'arms-index',
        title: 'Arms Index (TRIN)',
        emoji: '⚖️',
        content: (
            <>
                <h3 className="text-2xl font-bold mb-4">Arms Index (TRIN) ⚖️</h3>
                <p className="mb-4">The TRIN (or Traders' Index) is a market breadth indicator that measures the ratio of the Advance/Decline Ratio to the Advance Volume/Decline Volume Ratio. It is typically used for index-level analysis (e.g., S&P 500) to gauge overall market sentiment.</p>
                <h4 className="text-xl font-semibold mt-6 mb-2">Deep Learning & Psychology</h4>
                <p className="mb-4">TRIN quantifies the severity and conviction of market-wide buying or selling pressure. A reading below 1.0 is considered strongly bullish, as it indicates that the volume is disproportionately concentrated in advancing (rising) stocks. A reading above 1.0 is bearish. Extreme readings are often contrarian signals. An extremely low reading (e.g., &lt;0.5) can signal a buying climax or over-enthusiasm, while an extremely high reading (e.g., &gt;2.0) often signals a panic selling climax and a high-probability short-term bottom, as sellers have been completely exhausted by immediate buying volume.</p>
            </>
        ),
    },
    {
        id: 'nvi',
        title: 'Negative Volume Index (NVI)',
        emoji: '🤫',
        content: (
            <>
                <h3 className="text-2xl font-bold mb-4">Negative Volume Index (NVI) 🤫</h3>
                <p className="mb-4">The NVI is a cumulative indicator built on the theory that smart, informed institutional money is most active on days when trading volume decreases, as they adjust their large positions quietly without causing major price disruptions.</p>
                <h4 className="text-xl font-semibold mt-6 mb-2">Deep Learning & Psychology</h4>
                <p className="mb-4">The NVI's value only changes on days where the current volume is lower than the previous day's volume. If the price rises on such a low-volume day, the NVI increases. It is designed to track the long-term, subtle actions of informed traders. A sustained rise of the NVI, especially when it is trading above its long-term moving average (e.g., 255-day EMA), confirms that institutional accumulation is taking place. This often provides a powerful, underlying confirmation of a primary bull market trend that may not be apparent in the noisy day-to-day price action.</p>
            </>
        ),
    },
    {
        id: 'pvi',
        title: 'Positive Volume Index (PVI)',
        emoji: '📢',
        content: (
            <>
                <h3 className="text-2xl font-bold mb-4">Positive Volume Index (PVI) 📢</h3>
                <p className="mb-4">The PVI is the direct counterpart to the NVI, based on the belief that uninformed, emotional public (retail) traders are most active on high-volume days, often reacting to news or chasing trends.</p>
                <h4 className="text-xl font-semibold mt-6 mb-2">Deep Learning & Psychology</h4>
                <p className="mb-4">The PVI's value only changes on days where the current volume is higher than the previous day's volume. If the price rises on such a high-volume day, the PVI increases. Analyzing the PVI and NVI together allows for a sophisticated analysis of who is participating in a price move. If both are rising, it confirms a healthy trend supported by both smart money (NVI) and the public (PVI). If the PVI is rising sharply while the NVI is falling, it could signal a speculative bubble driven by retail hype that lacks institutional support, a classic warning sign of a market top.</p>
            </>
        ),
    },
     // --- 7. Advanced Trend Visualization and Filtering Tools ---
    {
        id: 'hma',
        title: 'Hull Moving Average (HMA)',
        emoji: '🏎️',
        content: (
            <>
                <h3 className="text-2xl font-bold mb-4">Hull Moving Average (HMA) 🏎️</h3>
                <p className="mb-4">Developed by Alan Hull, the HMA is an extremely sophisticated and fast-moving average designed to virtually eliminate the inherent lag of traditional MAs while retaining their smoothing characteristics. It prioritizes responsiveness above all else.</p>
                <h4 className="text-xl font-semibold mt-6 mb-2">Deep Learning & Psychology</h4>
                <p className="mb-4">Its complex formula involves calculating the difference between two Weighted Moving Averages (WMAs) of different periods and then applying another WMA to that result (specifically, a WMA with a period equal to the square root of the original lookback period). This multi-step process makes the HMA "hug" the price action much more closely than an SMA or EMA of the same period. The HMA's slope direction and color change are often used as definitive, low-lag trend direction signals, making it one of the most responsive trend-following indicators available, especially for scalping and very short-term day trading where speed is critical.</p>
            </>
        ),
    },
    {
        id: 'zig-zag',
        title: 'Zig Zag Indicator',
        emoji: '📈',
        content: (
            <>
                <h3 className="text-2xl font-bold mb-4">Zig Zag Indicator 📈</h3>
                <p className="mb-4">The Zig Zag indicator is a filtering tool that connects significant swing highs and swing lows on a chart, ignoring all price movements that are smaller than a user-defined minimum percentage or point value (e.g., it will only draw a new line if the price reverses by at least 3%).</p>
                <h4 className="text-xl font-semibold mt-6 mb-2">Deep Learning & Psychology</h4>
                <p className="mb-4">Its primary function is noise filtering and pattern visualization. By ignoring all minor fluctuations below the defined threshold, it clearly highlights the true, significant swing highs and swing lows of the market structure. This makes it an invaluable tool for cleanly identifying classical chart patterns (like Head and Shoulders or Double Tops) and for counting waves in Elliott Wave Theory without the distraction of minor price noise. Crucially, it must be understood that the Zig Zag is a <strong>non-predictive, repainting indicator</strong>. Its final line can change if a new price extreme is made, so it is used for historical analysis and structure identification, not for generating real-time entry signals.</p>
            </>
        ),
    },
    {
        id: 'coppock-curve',
        title: 'Coppock Curve',
        emoji: '🔄',
        content: (
            <>
                <h3 className="text-2xl font-bold mb-4">Coppock Curve 🔄</h3>
                <p className="mb-4">The Coppock Curve is a long-term momentum indicator designed specifically to identify major trend turning points and bottoms in broad market indices (like the S&P 500 or Nifty 50), not individual stocks. It is typically used on a monthly chart.</p>
                <h4 className="text-xl font-semibold mt-6 mb-2">Deep Learning & Psychology</h4>
                <p className="mb-4">It is calculated as a 10-period Weighted Moving Average (WMA) of the sum of the 14-period Rate of Change (ROC) and the 11-period ROC of the index. Its creator, Edwin Coppock, intended for the indicator's long, smooth wave to reflect the psychological cycle of market grief and recovery, with the periods chosen to approximate the average time it takes for a market to bottom out after a major shock. The primary signal is the <strong>zero-line crossover</strong>: a move from negative territory back up through the zero line is considered a major, long-term, high-confidence buy signal for entering a new bull market.</p>
            </>
        ),
    },
    {
        id: 'kst',
        title: 'Know Sure Thing (KST)',
        emoji: '👍',
        content: (
            <>
                <h3 className="text-2xl font-bold mb-4">Know Sure Thing (KST) 👍</h3>
                <p className="mb-4">The KST, developed by Martin Pring, is a sophisticated, multi-layered momentum oscillator that combines four different Rates of Change (ROC), each smoothed by its own SMA, to create a highly filtered yet responsive momentum line.</p>
                <h4 className="text-xl font-semibold mt-6 mb-2">Deep Learning & Psychology</h4>
                <p className="mb-4">By combining the momentum (ROC) over four distinct time horizons (short-term, intermediate-term, and two long-term cycles), the KST provides a comprehensive view of the market's underlying strength. This makes it excellent at identifying major, significant momentum shifts while filtering out the minor, misleading noise from any single time frame. The primary signal is the crossover of the KST line and its Signal Line (a 9-period SMA of the KST), providing a robust, long-term signal for entry and exit that is more reliable than a simple moving average crossover. A zero-line crossover is also a significant confirmation of a major trend change.</p>
            </>
        ),
    },
    {
        id: 'gann-hilo',
        title: 'Gann HiLo Activator',
        emoji: '🔥',
        content: (
            <>
                <h3 className="text-2xl font-bold mb-4">Gann HiLo Activator 🔥</h3>
                <p className="mb-4">The Gann HiLo Activator is a simple but effective volatility-adjusted trailing stop-loss indicator. It plots a line that adjusts based on a smoothed moving average of the high and low prices (not the close) over the last N periods.</p>
                <h4 className="text-xl font-semibold mt-6 mb-2">Deep Learning & Psychology</h4>
                <p className="mb-4">It provides a simple, visual, and highly responsive definition of the trend's immediate direction. When the price is consistently closing above the HiLo Activator line, the trend is considered bullish and active. When the price closes below the line, the trend is considered bearish. A flip in the line's position from below the price to above the price acts as a clear and immediate signal for a trend reversal and a mandatory exit for a long position (or entry for a short position). It is excellent for traders who want a mechanical, objective, and unemotional trend-following and stop-loss management system.</p>
            </>
        ),
    },
     // --- 8. Advanced Market Structure and Sentiment Tools ---
    {
        id: 'roc',
        title: 'Price Rate of Change (ROC)',
        emoji: '🚀',
        content: (
            <>
                <h3 className="text-2xl font-bold mb-4">Price Rate of Change (ROC) 🚀</h3>
                <p className="mb-4">The ROC is a pure momentum oscillator that measures the percentage change in price between the current price and the price N periods ago. It is calculated as: ((Current Price - Price N periods ago) / Price N periods ago) * 100.</p>
                <h4 className="text-xl font-semibold mt-6 mb-2">Deep Learning & Psychology</h4>
                <p className="mb-4">It is an unbounded oscillator centered around a zero line. A positive ROC indicates upward price momentum, while a negative ROC indicates downward momentum. The ROC is crucial for identifying the <strong>acceleration and deceleration</strong> of a trend. A rising ROC above zero confirms that a trend's momentum is increasing. Like RSI, its most predictive feature is <strong>Divergence</strong>: if the price makes a new high but the ROC fails to make a new, higher peak, it shows that the momentum behind the rally is fading, providing a highly reliable reversal signal. ROC is often used as a filter to confirm the health of a trend identified by other indicators.</p>
            </>
        ),
    },
    {
        id: 'open-interest',
        title: 'Open Interest (OI)',
        emoji: '📂',
        content: (
            <>
                <h3 className="text-2xl font-bold mb-4">Open Interest (OI) 📂</h3>
                <p className="mb-4">Open Interest is a fundamental, non-price indicator used exclusively in futures and options markets. It represents the total number of outstanding (unclosed) contracts for a particular derivative. It is not the same as volume; OI is a running total, while volume resets daily.</p>
                <h4 className="text-xl font-semibold mt-6 mb-2">Deep Learning & Psychology</h4>
                <p className="mb-4">OI is a vital tool for assessing the depth of commitment and flow of money behind a trend. The relationship between price, volume, and OI provides a complete picture:</p>
                <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Price Up + Volume Up + OI Up:</strong> Strong conviction. New money is entering the market to support the rally (healthy trend).</li>
                    <li><strong>Price Up + Volume Down + OI Down:</strong> Weak conviction. The rally is caused by traders closing short positions (short covering), not new buying. The trend is likely to reverse.</li>
                    <li><strong>Price Down + Volume Up + OI Up:</strong> Strong conviction. New money is entering to short the market (healthy downtrend).</li>
                    <li><strong>Price Down + Volume Down + OI Down:</strong> Weak conviction. The decline is caused by longs liquidating their positions, not new shorting. The downtrend is likely to end.</li>
                </ul>
            </>
        ),
    },
    {
        id: 'high-low-index',
        title: 'High-Low Index (HLI)',
        emoji: '🔝',
        content: (
            <>
                <h3 className="text-2xl font-bold mb-4">High-Low Index (HLI) 🔝</h3>
                <p className="mb-4">The HLI is a market breadth indicator that compares the number of stocks on a major exchange making new 52-week highs to the number of stocks making new 52-week lows. The result is often smoothed by a moving average (e.g., 10-day SMA) to create a clearer oscillator.</p>
                <h4 className="text-xl font-semibold mt-6 mb-2">Deep Learning & Psychology</h4>
                <p className="mb-4">This index measures the overall health and participation of stocks across an entire market. If a major price index (like the S&P 500) is rallying to a new high, but the High-Low Index is declining, it signals a lack of internal market breadth. This is a significant bearish divergence, indicating that only a few large-cap stocks are pushing the index higher while the majority of smaller stocks are weakening. This signals a significant underlying weakness in the market's foundation and a high probability of a broad market correction or top.</p>
            </>
        ),
    },
    {
        id: 'volume-profile-va',
        title: 'Volume Profile (Value Area)',
        emoji: '💎',
        content: (
            <>
                <h3 className="text-2xl font-bold mb-4">Volume Profile (Value Area) 💎</h3>
                <p className="mb-4">While the Point of Control (POC) is the highest volume price, the <strong>Value Area (VA)</strong> in the Volume Profile is the specific range of prices where 70% of the total volume was traded during a defined period. The edges of this area are known as the Value Area High (VAH) and Value Area Low (VAL).</p>
                <h4 className="text-xl font-semibold mt-6 mb-2">Deep Learning & Psychology</h4>
                <p className="mb-4">The VA represents the price range that the majority of market participants (especially institutions) agreed was "fair value" during that period. When the price moves outside of the VA, it is considered a significant deviation from this accepted fair value. Traders use the VAH and VAL as primary, high-probability support and resistance levels. The market is expected to either be rejected at these levels and revert back into the Value Area (mean reversion) or, if it breaks out with conviction, to accelerate away from it, seeking a new area of value (breakout trading). The Value Area provides an objective, volume-based framework for understanding market structure.</p>
            </>
        ),
    },
    {
        id: 'candlestick-context',
        title: 'Candlestick Patterns (Contextual Analysis)',
        emoji: '🕯️',
        content: (
            <>
                <h3 className="text-2xl font-bold mb-4">Candlestick Patterns (Contextual Analysis) 🕯️</h3>
                <p className="mb-4">This is not a single indicator but an advanced analytical framework. It involves the automated or manual recognition of classic candlestick patterns (e.g., Engulfing, Doji, Hammer) but only acting on them when they form at specific, pre-identified structural price levels.</p>
                <h4 className="text-xl font-semibold mt-6 mb-2">Deep Learning & Psychology</h4>
                <p className="mb-4">The predictive value of a candlestick pattern is entirely dependent on its context. A Hammer pattern that appears in the middle of a random price range is just market noise and has little meaning. However, a perfect Hammer pattern that forms precisely at a major, pre-calculated support level (like a 200-period EMA, a Fibonacci 61.8% retracement, or a Volume Profile POC) is an extremely high-probability reversal signal. Contextual analysis uses the slower, more quantitative indicators to identify the "battleground" zones, and then uses the candlestick patterns as the final, most precise confirmation layer to signal which side (buyers or sellers) has won the battle at that specific level.</p>
            </>
        ),
    },
    // --- 9. Advanced Moving Averages and Volatility Tools ---
    {
        id: 'kama',
        title: "Adaptive Moving Average (Kaufman's AMA)",
        emoji: '🦎',
        content: (
            <>
                <h3 className="text-2xl font-bold mb-4">Adaptive Moving Average (AMA or KAMA) 🦎</h3>
                <p className="mb-4">The AMA, developed by Perry Kaufman, is a highly sophisticated moving average designed to dynamically adjust its own smoothing period based on prevailing market volatility and "noise."</p>
                <h4 className="text-xl font-semibold mt-6 mb-2">Deep Learning & Psychology</h4>
                <p className="mb-4">It uses an <strong>Efficiency Ratio (ER)</strong>, which compares the net price change over N periods (the "signal") to the sum of the absolute price changes over the same period (the "noise"). When the ER is high (indicating a strong, efficient trend with low noise), the AMA automatically shortens its smoothing period to follow the price closely with very low lag. When the ER is low (indicating a choppy, sideways market with high noise), the AMA lengthens its smoothing period to heavily filter the data and avoid generating false signals. This adaptive nature makes the AMA an ideal trend-following tool that minimizes whipsaws during consolidation while remaining highly responsive during strong trending phases, effectively giving you the "best of both worlds."</p>
            </>
        ),
    },
    {
        id: 'zlema',
        title: 'Zero-Lag Exponential Moving Average (ZLEMA)',
        emoji: '💨',
        content: (
            <>
                <h3 className="text-2xl font-bold mb-4">Zero-Lag EMA (ZLEMA) 💨</h3>
                <p className="mb-4">The ZLEMA is a specialized, fast-acting moving average meticulously designed to address the inherent lag of the traditional EMA. It achieves this by mathematically removing the smoothing period's delay from the price data *before* the main calculation is performed.</p>
                <h4 className="text-xl font-semibold mt-6 mb-2">Deep Learning & Psychology</h4>
                <p className="mb-4">The indicator is calculated by first determining the "lag" factor of a standard EMA. It then subtracts this lag factor from the current price data before applying the final EMA smoothing. This "lag compensation" is mathematically equivalent to plotting the average forward in time, causing it to align almost perfectly with the current price. The result is an incredibly smooth line that tracks price movement with virtually zero delay. This makes ZLEMA crossovers and slope changes highly valuable for low-latency trend confirmation, especially for traders who require the earliest possible signal of a trend change.</p>
            </>
        ),
    },
    {
        id: 'vwap',
        title: 'Volume-Weighted Average Price (VWAP)',
        emoji: '🏦',
        content: (
            <>
                <h3 className="text-2xl font-bold mb-4">Volume-Weighted Average Price (VWAP) 🏦</h3>
                <p className="mb-4">VWAP is a crucial intraday institutional benchmark that calculates the average price of an asset throughout the day, weighted by the volume traded at each specific price level. It resets at the beginning of each new trading session.</p>
                <h4 className="text-xl font-semibold mt-6 mb-2">Deep Learning & Psychology</h4>
                <p className="mb-4">VWAP is used by institutional trading desks (pension funds, mutual funds) to measure the quality of their trade execution. Their goal is to buy below VWAP and sell above VWAP to minimize their market impact and get a "fair" price. For the retail trader, VWAP acts as a powerful dynamic support/resistance level and the definitive intraday mean or "fair value" for the session. A price trading consistently above VWAP indicates a strong bullish intraday bias, with institutions likely accumulating. A price below VWAP indicates a bearish bias. Significant deviations from VWAP often signal mean reversion opportunities, as the price is statistically likely to return to this institutional center of gravity.</p>
            </>
        ),
    },
    {
        id: 'vortex',
        title: 'Vortex Indicator (VI)',
        emoji: '🌪️',
        content: (
            <>
                <h3 className="text-2xl font-bold mb-4">Vortex Indicator (VI) 🌪️</h3>
                <p className="mb-4">Developed by Etienne Botes and Douglas Siepman, the VI is designed to identify the presence of a trend and confirm its direction using two oscillating lines: +VI (representing upward trend movement) and −VI (representing downward trend movement).</p>
                <h4 className="text-xl font-semibold mt-6 mb-2">Deep Learning & Psychology</h4>
                <p className="mb-4">The VI's calculation is focused on the distance between the current high/low and the previous period's high/low, using the True Range for normalization. This captures the expansion and contraction of price ranges, which is the essence of a trend. The core signal is a crossover: when the +VI line crosses above the −VI line, it confirms the start of a new uptrend. When −VI crosses above +VI, a new downtrend is confirmed. The greater the separation between the two lines, the stronger the conviction and momentum of the current trend, making the Vortex Indicator an excellent filter for avoiding weak, low-conviction trends.</p>
            </>
        ),
    },
    {
        id: 'gann-angles',
        title: 'Gann Angles and Fans',
        emoji: '📐',
        content: (
            <>
                <h3 className="text-2xl font-bold mb-4">Gann Angles and Fans 📐</h3>
                <p className="mb-4">Developed by the legendary trader W. D. Gann, this is a geometric technical analysis method that projects lines (or "angles") from significant tops and bottoms. It is based on Gann's core concept that price and time are inextricably linked and should be viewed in harmony.</p>
                <h4 className="text-xl font-semibold mt-6 mb-2">Deep Learning & Psychology</h4>
                <p className="mb-4">The <strong>45° angle</strong> (or the <strong>1x1 angle</strong>) is the most crucial line, representing the perfect balance where one unit of time progression equals one unit of price movement. According to Gann theory, if the price is trading above this ascending 1x1 angle, the bull market is strong and healthy. If the price breaks below the 1x1 angle, it signals a structural shift and a significant weakening of the trend. Gann Fans utilize other key angles derived from this principle (e.g., 2x1 for a steeper trend, 1x2 for a shallower trend) to define a web of future dynamic support and resistance levels based on this time-price harmony.</p>
            </>
        ),
    },
    // --- 10. Exotic and Cyclical Indicators ---
    {
        id: 'hilbert-transform',
        title: 'Hilbert Transform (Instantaneous Trendline)',
        emoji: '〰️',
        content: (
            <>
                <h3 className="text-2xl font-bold mb-4">Hilbert Transform (HT) 〰️</h3>
                <p className="mb-4">The HT is a highly advanced mathematical process rooted in digital signal processing that converts a price series into its component parts, treating price as a continuous wave with properties like amplitude, phase, and frequency.</p>
                <h4 className="text-xl font-semibold mt-6 mb-2">Deep Learning & Psychology</h4>
                <p className="mb-4">The HT is primarily used to calculate the <strong>Instantaneous Trendline</strong>, which aims to identify the current trend with almost zero lag by tracking the instantaneous phase of the price "wave." The resulting line is exceptionally smooth and responsive, adapting immediately to changes in market direction. Its primary use is in the creation of highly-filtered, almost lag-free oscillators and for precisely determining the dominant market cycle length. By identifying the length of the current cycle, traders can develop advanced strategies that anticipate cyclical turning points with greater accuracy.</p>
            </>
        ),
    },
    {
        id: 'cyber-cycle',
        title: "Ehlers' Cyber Cycle",
        emoji: '🔄',
        content: (
            <>
                <h3 className="text-2xl font-bold mb-4">Ehlers' Cyber Cycle 🔄</h3>
                <p className="mb-4">Developed by John Ehlers, a pioneer of applying digital signal processing to financial markets, the Cyber Cycle is a predictive oscillator designed to isolate the market's dominant cycle length and anticipate its turning points.</p>
                <h4 className="text-xl font-semibold mt-6 mb-2">Deep Learning & Psychology</h4>
                <p className="mb-4">It uses a complex calculation involving multiple band-pass filters to isolate the strongest periodic component of the price movement, effectively filtering out both very long-term trend information and very short-term noise. The resulting indicator is a smooth, cyclical wave that helps predict near-term peaks and troughs. When the Cyber Cycle line peaks, a short-term price peak is statistically expected to follow within a few bars, offering a time-based entry/exit signal for traders who focus on market cycles rather than simple price-based momentum.</p>
            </>
        ),
    },
    {
        id: 'klinger-oscillator',
        title: 'Klinger Oscillator',
        emoji: '🔊',
        content: (
            <>
                <h3 className="text-2xl font-bold mb-4">Klinger Oscillator 🔊</h3>
                <p className="mb-4">The Klinger Oscillator is a sophisticated volume-based indicator that combines price movement with volume to identify the long-term flow of money ("smart money") while remaining sensitive enough to spot short-term reversals.</p>
                <h4 className="text-xl font-semibold mt-6 mb-2">Deep Learning & Psychology</h4>
                <p className="mb-4">It first calculates <strong>Volume Force</strong> (a metric combining volume with the daily trend direction and range) and then plots the difference between a fast and slow EMA (typically 34 and 55 periods) of this Volume Force. A crossover of the Klinger line above its signal line signals that the underlying volume-based trend is turning positive. The Klinger's unique power is its ability to reveal <strong>Divergence</strong>—when the price makes a new extreme high or low, but the Klinger fails to follow—confirming that the price move is not being supported by meaningful volume flow, a classic sign of trend exhaustion.</p>
            </>
        ),
    },
    {
        id: 'bw-mfi',
        title: 'Market Facilitation Index (BW MFI)',
        emoji: '🚦',
        content: (
            <>
                <h3 className="text-2xl font-bold mb-4">Market Facilitation Index (BW MFI) 🚦</h3>
                <p className="mb-4">Developed by Bill Williams, the BW MFI is a unique indicator that measures the change in price per unit of volume. Its core purpose is to assess the efficiency of the market's movement.</p>
                <h4 className="text-xl font-semibold mt-6 mb-2">Deep Learning & Psychology</h4>
                <p className="mb-4">The MFI seeks to answer the question: How effectively is the current volume moving the price? A high MFI reading means the price moved a large distance on a relatively low amount of volume, suggesting easy movement and little resistance. It is typically analyzed alongside a four-color coding system that compares the MFI bar to the volume bar to confirm market action. For example, a "Squat" bar (low MFI and high volume) indicates a major battle between buyers and sellers is occurring at a specific price level, often signaling heavy accumulation or distribution before a major move.</p>
            </>
        ),
    },
    {
        id: 'roc-confirmation',
        title: 'ROC as a Confirmation Tool',
        emoji: '✅',
        content: (
            <>
                <h3 className="text-2xl font-bold mb-4">ROC as a Confirmation Tool ✅</h3>
                <p className="mb-4">While the Price Rate of Change (ROC) is a standard momentum indicator, its most advanced utility is not for generating direct signals, but as a confirmation filter for other trend-following systems.</p>
                <h4 className="text-xl font-semibold mt-6 mb-2">Deep Learning & Psychology</h4>
                <p className="mb-4">ROC is an unbounded oscillator that quantifies the acceleration and deceleration of a trend. Traders rarely use its crossovers for absolute buy/sell signals. Instead, they use a continuously rising ROC above the zero line to confirm that the momentum of an existing uptrend is strong and increasing. Its real power lies in pullbacks. If a stock in an uptrend experiences a sharp price pullback, but its ROC indicator remains firmly above the zero line, it provides powerful confirmation that the primary uptrend's long-term momentum is still intact. This suggests the price drop is merely a healthy, temporary correction and a potential buying opportunity, not a true reversal.</p>
            </>
        ),
    },
];
