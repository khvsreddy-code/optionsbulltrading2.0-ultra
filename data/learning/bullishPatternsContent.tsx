import React from 'react';

export interface Pattern {
  id: string;
  title: string;
  emoji: string;
  icon?: React.FC<any>;
  content: React.ReactNode;
}

const Image: React.FC<{src: string, alt: string, caption?: string}> = ({ src, alt, caption }) => (
    <figure className="my-6">
        <img src={src} alt={alt} className="w-full rounded-lg shadow-lg border border-border" />
        {caption && <figcaption className="text-center text-sm text-text-secondary mt-2">{caption}</figcaption>}
    </figure>
);

const Diagram: React.FC<{src: string, alt: string}> = ({ src, alt }) => (
    <div className="flex justify-center my-8">
        <div className="bg-card p-4 rounded-lg border border-border">
            <img src={src} alt={alt} className="w-48" />
        </div>
    </div>
);


export const bullishPatterns: Pattern[] = [
  {
    id: 'hammer',
    title: 'Hammer',
    emoji: '🔨',
    content: (
      <>
        <Image 
            src="https://twiojujlmgannxhmrbou.supabase.co/storage/v1/object/public/app%20images/hammer_context.png" 
            alt="Hammer pattern on a chart" 
            caption="A Hammer forms after a downtrend, signaling a potential price bottom."
        />
        <h3 className="text-2xl font-bold mb-2">The Hammer Pattern</h3>
        <p className="mb-6 text-lg">The Hammer candlestick pattern is a bullish reversal pattern that signifies a potential turnaround in price. It typically forms at the end of a downtrend and signals the possibility of a bullish movement starting. It's called a "Hammer" due to its shape, which resembles a hammer with a long handle and a small head.</p>

        <h4 className="text-xl font-semibold mt-8 mb-4 border-l-4 border-primary pl-4">What The Pattern Looks Like</h4>
        <p className="mb-4">The Hammer pattern is formed of a single candlestick, which has the following characteristics:</p>
        <ul className="space-y-4 mb-6 list-disc pl-5">
            <li><strong>Small Real Body:</strong> The body of the candle, which is the difference between the opening and closing prices, should be small. This body can be either red (bearish) or green (bullish), though a green body indicates a slightly stronger reversal.</li>
            <li><strong>Long Lower Shadow:</strong> The most defining feature of a Hammer is its long lower shadow (wick). This shadow should be at least twice the length of the real body.</li>
            <li><strong>Little to No Upper Shadow:</strong> Ideally, a Hammer should have little to no upper shadow. If there's a small upper shadow, it can still be considered a Hammer, but the absence of an upper shadow is more ideal.</li>
            <li><strong>Position within a Trend:</strong> For the pattern to be considered a Hammer, it must form after a downtrend. If the same shape appears after an uptrend, it is called a "Hanging Man" and can be bearish.</li>
        </ul>

        <Diagram 
            src="https://twiojujlmgannxhmrbou.supabase.co/storage/v1/object/public/app%20images/patterns/hammer_diagram.png"
            alt="Hammer pattern diagram"
        />

        <h4 className="text-xl font-semibold mt-8 mb-4 border-l-4 border-primary pl-4">Pattern Psychology</h4>
        <p className="mb-4">To fully understand the Hammer candlestick pattern, we need to delve into the market psychology behind it:</p>
        <h5 className="text-lg font-semibold mt-4 mb-2">Previous Downtrend:</h5>
        <p className="mb-4">Before the Hammer appears, there's a prevailing downtrend. This means that the bears have been in control, and the sentiment is pessimistic.</p>
        <h5 className="text-lg font-semibold mt-4 mb-2">Intra-day Decline and Recovery:</h5>
        <p className="mb-4">On the day the Hammer is formed, prices generally open and continue to move down, suggesting that bears are still trying to push the prices lower. However, at some point during the day, a change in sentiment occurs. Buyers step in, pushing the price back up, often closing near or slightly below the opening price.</p>
        <h5 className="text-lg font-semibold mt-4 mb-2">Bulls Take Control:</h5>
        <p className="mb-4">The long lower shadow represents the distance between the lowest traded prices of that day and the closing price, showing a rejection of the lower prices. This signifies that bulls are beginning to gain control and that bears are retreating.</p>
        <h5 className="text-lg font-semibold mt-4 mb-2">Potential Reversal Confirmation:</h5>
        <p className="mb-4">While the Hammer itself is a potential reversal sign, it's essential to look for confirmation on subsequent days. A bullish candle or a gap up the next day can validate the bullish reversal signal of the Hammer.</p>

        <h4 className="text-xl font-semibold mt-8 mb-4 border-l-4 border-primary pl-4">Conclusion</h4>
        <p className="mb-4">In conclusion, the Hammer candlestick pattern is an essential tool for traders and investors to identify potential bullish reversals after a downtrend. However, like all candlestick patterns, it's crucial to use the Hammer in conjunction with other technical analysis tools and not to rely solely on it for making trading decisions.</p>
      </>
    ),
  },
  {
    id: 'bullish-engulfing',
    title: 'Bullish Engulfing',
    emoji: '🟢',
    content: (
        <>
            <Image 
                src="https://twiojujlmgannxhmrbou.supabase.co/storage/v1/object/public/app%20images/bullishengulfing_context.png" 
                alt="Bullish Engulfing pattern on a chart" 
                caption="A large green candle engulfs the prior red candle, reversing the downtrend."
            />
            <h3 className="text-2xl font-bold mb-2">The Bullish Engulfing Pattern</h3>
            <p className="mb-6 text-lg">A powerful two-candle reversal pattern that signals a potential bottom in a downtrend. This pattern visually demonstrates a dramatic shift in market sentiment from bearish to bullish control.</p>
            
            <h4 className="text-xl font-semibold mt-8 mb-4 border-l-4 border-primary pl-4">What The Pattern Looks Like</h4>
            <p className="mb-4">This pattern involves two distinct candlesticks:</p>
            <ul className="space-y-4 mb-6 list-disc pl-5">
                <li><strong>First Candle:</strong> A small bearish (red) candle that is part of the existing downtrend.</li>
                <li><strong>Second Candle:</strong> A large bullish (green) candle. Its body must open lower than the previous day's close and close higher than the previous day's open, completely "engulfing" the body of the first candle.</li>
            </ul>

            <Diagram 
                src="https://twiojujlmgannxhmrbou.supabase.co/storage/v1/object/public/app%20images/patterns/bullishengulfing_diagram.png"
                alt="Bullish Engulfing pattern diagram"
            />
            
            <h4 className="text-xl font-semibold mt-8 mb-4 border-l-4 border-primary pl-4">Pattern Psychology</h4>
            <p className="mb-4">The Bullish Engulfing pattern tells a story of a sudden and decisive power struggle:</p>
            <h5 className="text-lg font-semibold mt-4 mb-2">Bearish Continuation Fails:</h5>
            <p className="mb-4">The first red candle confirms that sellers are still in control. The second day often opens lower, giving sellers a false sense of confidence that the downtrend will continue.</p>
            <h5 className="text-lg font-semibold mt-4 mb-2">Bullish Takeover:</h5>
            <p className="mb-4">From the low point of the day, an unexpected and overwhelming wave of buying pressure enters the market. This force is so strong that it not only erases the initial losses but pushes the price well above the previous day's high.</p>
            <h5 className="text-lg font-semibold mt-4 mb-2">Sentiment Shift:</h5>
            <p className="mb-4">By the end of the day, the bulls have completely dominated the bears. The fact that the entire previous day's bearish action was "engulfed" signifies a powerful and decisive shift in market control. The bears have been totally overwhelmed.</p>
            
            <h4 className="text-xl font-semibold mt-8 mb-4 border-l-4 border-primary pl-4">What to Look For</h4>
            <ul className="space-y-2 list-disc pl-5">
                <li><strong>Prior Trend:</strong> The pattern is only significant if it appears after a clear downtrend.</li>
                <li><strong>Size:</strong> The larger the engulfing green candle, the more significant the reversal signal.</li>
                <li><strong>Volume:</strong> Higher volume on the engulfing day adds significant confirmation to the pattern's validity.</li>
            </ul>
        </>
    ),
  },
  {
    id: 'morning-star',
    title: 'Morning Star',
    emoji: '⭐',
    content: (
        <>
            <Image 
                src="https://twiojujlmgannxhmrbou.supabase.co/storage/v1/object/public/app%20images/morningstar_context.png" 
                alt="Morning Star pattern on a chart" 
                caption="A three-candle pattern signaling a bullish reversal after a period of indecision."
            />
            <h3 className="text-2xl font-bold mb-2">The Morning Star Pattern</h3>
            <p className="mb-6 text-lg">The Morning Star is a three-candle bullish reversal pattern that suggests a "dawn" is breaking after a period of darkness (a downtrend). It is a sign of hope and a potential bottoming of the market.</p>
            
            <h4 className="text-xl font-semibold mt-8 mb-4 border-l-4 border-primary pl-4">What The Pattern Looks Like</h4>
            <p className="mb-4">The pattern is composed of three distinct parts:</p>
            <ol className="space-y-4 mb-6 list-decimal pl-5">
                <li><strong>First Candle:</strong> A long red (bearish) candle that continues the downtrend, indicating strong selling pressure.</li>
                <li><strong>Second Candle:</strong> A small-bodied candle (like a Doji or spinning top), which can be red or green. It typically gaps down from the first candle. This candle represents a state of indecision or equilibrium where the selling pressure has stalled.</li>
                <li><strong>Third Candle:</strong> A long green (bullish) candle that gaps up from the small middle candle and closes well into the body of the first red candle, ideally above its midpoint.</li>
            </ol>

            <Diagram 
                src="https://twiojujlmgannxhmrbou.supabase.co/storage/v1/object/public/app%20images/patterns/morningstar_diagram.png"
                alt="Morning Star pattern diagram"
            />
            
            <h4 className="text-xl font-semibold mt-8 mb-4 border-l-4 border-primary pl-4">Pattern Psychology</h4>
            <p className="mb-4">The Morning Star illustrates a transition from bearish dominance to bullish control over three days:</p>
            <h5 className="text-lg font-semibold mt-4 mb-2">Day 1: Peak Pessimism</h5>
            <p className="mb-4">The first day is all bearish. The long red candle confirms sellers are firmly in control, and market sentiment is negative.</p>
            <h5 className="text-lg font-semibold mt-4 mb-2">Day 2: Indecision and Stall</h5>
            <p className="mb-4">The second day's gap down confirms the fear, but the small body shows sellers could not push the price much further. The market is in a state of balance; the trend's momentum has stopped. This is the "star" of the pattern, a moment of indecision.</p>
            <h5 className="text-lg font-semibold mt-4 mb-2">Day 3: Bullish Confirmation</h5>
            <p className="mb-4">The third day's gap up and strong rally signals that buyers have seized control during the period of indecision and are now aggressively reversing the downtrend. The strong close confirms the reversal is underway.</p>
            
            <h4 className="text-xl font-semibold mt-8 mb-4 border-l-4 border-primary pl-4">Conclusion</h4>
            <p className="mb-4">The Morning Star is a reliable reversal indicator because it shows not just a potential bottom but also a confirmed follow-through by the bulls. The stronger the third green candle (i.e., the further it closes into the first red candle's body), the more powerful the signal.</p>
        </>
    ),
  },
  {
    id: 'piercing-pattern',
    title: 'Piercing Pattern',
    emoji: '뚫',
    content: (
        <>
            <Image 
                src="https://twiojujlmgannxhmrbou.supabase.co/storage/v1/object/public/app%20images/piercing_context.png" 
                alt="Piercing Pattern on a chart" 
                caption="A green candle opens lower but 'pierces' more than halfway into the prior red candle."
            />
            <h3 className="text-2xl font-bold mb-2">The Piercing Pattern</h3>
            <p className="mb-6 text-lg">The Piercing Pattern is a two-candle bullish reversal pattern found at the bottom of a downtrend. It signals a potential shift in momentum from sellers to buyers, though it is generally considered less powerful than the Bullish Engulfing pattern.</p>

            <h4 className="text-xl font-semibold mt-8 mb-4 border-l-4 border-primary pl-4">What The Pattern Looks Like</h4>
            <p className="mb-4">This pattern consists of two candles with specific characteristics:</p>
            <ul className="space-y-4 mb-6 list-disc pl-5">
                <li><strong>First Candle:</strong> A strong bearish (red) candle that confirms the downtrend.</li>
                <li><strong>Second Candle:</strong> A bullish (green) candle that opens below the low of the first candle (a gap down). It then rallies strongly to close more than halfway up the real body of the first red candle (i.e., it closes above the 50% midpoint).</li>
            </ul>

            <Diagram 
                src="https://twiojujlmgannxhmrbou.supabase.co/storage/v1/object/public/app%20images/patterns/piercing_diagram.png"
                alt="Piercing Pattern diagram"
            />

            <h4 className="text-xl font-semibold mt-8 mb-4 border-l-4 border-primary pl-4">Pattern Psychology</h4>
            <p className="mb-4">The story of the Piercing Pattern is one of failed bearish continuation and a significant bullish counter-attack:</p>
            <h5 className="text-lg font-semibold mt-4 mb-2">Bearish Confidence</h5>
            <p className="mb-4">The first red candle shows that bears are in control. The gap down on the second day gives them even more confidence, as it appears the downtrend is accelerating.</p>
            <h5 className="text-lg font-semibold mt-4 mb-2">The Bullish Counter-Attack</h5>
            <p className="mb-4">Despite the bearish open, buyers enter the market with force. They not only absorb all the selling pressure at the lows but manage to drive the price significantly higher.</p>
            <h5 className="text-lg font-semibold mt-4 mb-2">The 50% Battle Line</h5>
            <p className="mb-4">Closing over the midpoint of the prior red candle is a significant psychological victory for the bulls. It demonstrates that they have taken back more than half the territory previously gained by the sellers in a single session. This strong rejection of the lows and the deep retracement signals that the bears are losing their grip.</p>

            <h4 className="text-xl font-semibold mt-8 mb-4 border-l-4 border-primary pl-4">What to Look For</h4>
            <ul className="space-y-2 list-disc pl-5">
                <li><strong>Depth of Pierce:</strong> The deeper the second candle pierces into the first candle's body, the more reliable the reversal signal.</li>
                <li><strong>Volume:</strong> Increased volume on the second day adds to the pattern's credibility.</li>
                <li><strong>Confirmation:</strong> As with many patterns, waiting for a third candle to close higher provides stronger confirmation of the reversal.</li>
            </ul>
        </>
    ),
  },
  {
    id: 'three-white-soldiers',
    title: 'Three White Soldiers',
    emoji: '🧍🧍🧍',
    content: (
        <>
            <Image 
                src="https://twiojujlmgannxhmrbou.supabase.co/storage/v1/object/public/app%20images/3whitesoldiers_context.png" 
                alt="Three White Soldiers pattern on a chart" 
                caption="Three consecutive long green candles signal a strong and steady reversal."
            />
            <h3 className="text-2xl font-bold mb-2">The Three White Soldiers Pattern</h3>
            <p className="mb-6 text-lg">This is a strong three-candle bullish reversal pattern that shows a steady and powerful advance after a downtrend. It is considered one of the more potent reversal signals due to its sustained buying pressure.</p>

            <h4 className="text-xl font-semibold mt-8 mb-4 border-l-4 border-primary pl-4">What The Pattern Looks Like</h4>
            <p className="mb-4">The pattern is formed by three consecutive long green (bullish) candles with specific characteristics:</p>
            <ul className="space-y-4 mb-6 list-disc pl-5">
                <li><strong>Three Green Candles:</strong> The pattern consists of three long-bodied bullish candles in a row.</li>
                <li><strong>Progressively Higher Closes:</strong> Each candle must close higher than the previous one.</li>
                <li><strong>Opening Within Prior Body:</strong> Each candle should open within the real body of the preceding candle.</li>
                <li><strong>Small Upper Wicks:</strong> Ideally, the candles should have very small or no upper shadows, indicating that they closed at or near their highs.</li>
            </ul>

            <Diagram 
                src="https://twiojujlmgannxhmrbou.supabase.co/storage/v1/object/public/app%20images/patterns/3whitesoldiers_diagram.png"
                alt="Three White Soldiers pattern diagram"
            />

            <h4 className="text-xl font-semibold mt-8 mb-4 border-l-4 border-primary pl-4">Pattern Psychology</h4>
            <p className="mb-4">The pattern is a very clear visual representation of sustained buying strength and a definitive shift in market sentiment:</p>
            <h5 className="text-lg font-semibold mt-4 mb-2">Steady Advance</h5>
            <p className="mb-4">Unlike sharp, volatile reversals, the Three White Soldiers pattern shows a methodical and consistent takeover by the bulls over three consecutive sessions.</p>
            <h5 className="text-lg font-semibold mt-4 mb-2">Strong Conviction</h5>
            <p className="mb-4">Each new session opens at a reasonable price, allowing new buyers to enter. Those buyers maintain strong momentum throughout each session, pushing the price to a new high. The fact that this happens three times in a row shows deep conviction.</p>
            <h5 className="text-lg font-semibold mt-4 mb-2">Lack of Selling Pressure</h5>
            <p className="mb-4">The small upper shadows indicate that there was minimal selling pressure or profit-taking during the rally. The bulls were in control from open to close each day. This pattern signifies that the market has found its footing and a new, reliable upward trend has likely begun.</p>
        </>
    ),
  },
];