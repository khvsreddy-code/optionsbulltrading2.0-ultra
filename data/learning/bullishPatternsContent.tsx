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
    emoji: ' piercing',
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
   {
    id: 'bullish-harami',
    title: 'Bullish Harami',
    emoji: '🤰',
    content: (
        <>
            <Image 
                src="https://twiojujlmgannxhmrbou.supabase.co/storage/v1/object/public/app%20images/bullishharami_context.png" 
                alt="Bullish Harami pattern on a chart" 
                caption="A small green candle inside the prior red candle signals a potential end to the selling pressure."
            />
            <h3 className="text-2xl font-bold mb-2">The Bullish Harami Pattern</h3>
            <p className="mb-6 text-lg">The Bullish Harami is a two-candle reversal pattern that signals a potential end to a downtrend. "Harami" is an old Japanese word for "pregnant," and the pattern visually resembles a pregnant woman, with the small second candle being the "baby" inside the larger first one.</p>

            <h4 className="text-xl font-semibold mt-8 mb-4 border-l-4 border-primary pl-4">What The Pattern Looks Like</h4>
            <ul className="space-y-4 mb-6 list-disc pl-5">
                <li><strong>First Candle:</strong> A large bearish (red) candle that is part of the ongoing downtrend.</li>
                <li><strong>Second Candle:</strong> A small bullish (green) candle whose entire body is contained within the real body of the first candle.</li>
            </ul>

            <Diagram 
                src="https://twiojujlmgannxhmrbou.supabase.co/storage/v1/object/public/app%20images/patterns/bullishharami_diagram.png"
                alt="Bullish Harami pattern diagram"
            />
            
            <h4 className="text-xl font-semibold mt-8 mb-4 border-l-4 border-primary pl-4">Pattern Psychology</h4>
            <p className="mb-4">The Bullish Harami represents a sudden loss of momentum by sellers:</p>
            <h5 className="text-lg font-semibold mt-4 mb-2">Bearish Control</h5>
            <p className="mb-4">The first long red candle confirms that sellers are in complete control, pushing the price lower.</p>
            <h5 className="text-lg font-semibold mt-4 mb-2">The Sudden Halt</h5>
            <p className="mb-4">The second day opens higher than the previous close and trades within a very narrow range, unable to push lower. This small candle represents a sudden state of equilibrium or indecision. The powerful selling pressure has abruptly stopped, and bears are no longer able to drive the market down. This pause is often the first sign that the downtrend is losing steam and a reversal could be near.</p>
        </>
    ),
  },
  {
    id: 'three-inside-up',
    title: 'Three Inside Up',
    emoji: '🔼',
    content: (
        <>
            <Image 
                src="https://twiojujlmgannxhmrbou.supabase.co/storage/v1/object/public/app%20images/threeinsideup_context.png" 
                alt="Three Inside Up pattern on a chart" 
                caption="A bullish harami followed by a strong green candle confirms the reversal."
            />
            <h3 className="text-2xl font-bold mb-2">The Three Inside Up Pattern</h3>
            <p className="mb-6 text-lg">This is a three-candle bullish reversal pattern that is a more reliable confirmation of the Bullish Harami. It provides a stronger signal that the downtrend has concluded and an uptrend is beginning.</p>

            <h4 className="text-xl font-semibold mt-8 mb-4 border-l-4 border-primary pl-4">What The Pattern Looks Like</h4>
            <ol className="space-y-4 mb-6 list-decimal pl-5">
                <li><strong>First Candle:</strong> A long bearish (red) candle continuing the downtrend.</li>
                <li><strong>Second Candle:</strong> A small bullish (green) candle contained within the body of the first candle (forming a Bullish Harami).</li>
                <li><strong>Third Candle:</strong> A bullish (green) candle that closes above the high of the first candle, providing bullish confirmation.</li>
            </ol>

            <Diagram 
                src="https://twiojujlmgannxhmrbou.supabase.co/storage/v1/object/public/app%20images/patterns/threeinsideup_diagram.png"
                alt="Three Inside Up pattern diagram"
            />
            
            <h4 className="text-xl font-semibold mt-8 mb-4 border-l-4 border-primary pl-4">Pattern Psychology</h4>
            <p className="mb-4">The pattern shows a clear three-step process from bearish control to a confirmed bullish reversal:</p>
            <h5 className="text-lg font-semibold mt-4 mb-2">Step 1: Bearish Dominance</h5>
            <p className="mb-4">The first candle shows the downtrend is intact.</p>
            <h5 className="text-lg font-semibold mt-4 mb-2">Step 2: Indecision</h5>
            <p className="mb-4">The Bullish Harami on the second day shows that the selling momentum has stalled and the market is pausing.</p>
            <h5 className="text-lg font-semibold mt-4 mb-2">Step 3: Bullish Confirmation</h5>
            <p className="mb-4">The third candle resolves the indecision in favor of the bulls. Buyers take decisive control, pushing the price up and closing above the range of the first day's decline. This confirms the reversal and signals that a new uptrend is likely beginning.</p>
        </>
    ),
  },
  {
    id: 'tweezer-bottom',
    title: 'Tweezer Bottom',
    emoji: '🥢',
    content: (
        <>
            <Image 
                src="https://twiojujlmgannxhmrbou.supabase.co/storage/v1/object/public/app%20images/tweezerbottom_context.png" 
                alt="Tweezer Bottom pattern on a chart" 
                caption="Two candles with matching lows signal a strong support level and potential reversal."
            />
            <h3 className="text-2xl font-bold mb-2">The Tweezer Bottom Pattern</h3>
            <p className="mb-6 text-lg">The Tweezer Bottom is a two-candle (or more) bullish reversal pattern that forms at the end of a downtrend. It is identified by two or more candles having matching or very similar low prices.</p>

            <h4 className="text-xl font-semibold mt-8 mb-4 border-l-4 border-primary pl-4">What The Pattern Looks Like</h4>
            <ul className="space-y-4 mb-6 list-disc pl-5">
                <li><strong>First Candle:</strong> Typically a bearish (red) candle that continues the downtrend.</li>
                <li><strong>Second Candle:</strong> Often a bullish (green) candle.</li>
                <li><strong>Matching Lows:</strong> The critical feature is that both candles have almost identical low points, indicating a strong level of support.</li>
            </ul>

            <Diagram 
                src="https://twiojujlmgannxhmrbou.supabase.co/storage/v1/object/public/app%20images/patterns/tweezerbottom_diagram.png"
                alt="Tweezer Bottom pattern diagram"
            />
            
            <h4 className="text-xl font-semibold mt-8 mb-4 border-l-4 border-primary pl-4">Pattern Psychology</h4>
            <p className="mb-4">The Tweezer Bottom indicates a strong rejection of lower prices:</p>
            <p className="mb-4">On the first day, the bears successfully push the price down. On the second day, the price opens and sellers again attempt to push it lower, but they are met with strong buying pressure at the exact same low as the previous day. The market refuses to go any lower and reverses to close higher. This failure to break the previous low is a significant sign that a strong support level has been established. The "tweezers" signify that the market is picking a bottom, and the bears are losing their power.</p>
        </>
    ),
  },
  {
    id: 'bullish-kicker',
    title: 'Bullish Kicker',
    emoji: '🚀',
    content: (
        <>
            <Image 
                src="https://twiojujlmgannxhmrbou.supabase.co/storage/v1/object/public/app%20images/bullishkicker_context.png" 
                alt="Bullish Kicker pattern on a chart" 
                caption="A sudden gap up creates a powerful bullish signal, leaving bears trapped."
            />
            <h3 className="text-2xl font-bold mb-2">The Bullish Kicker Pattern</h3>
            <p className="mb-6 text-lg">The Bullish Kicker is one of the most powerful two-candle reversal patterns. It signals a dramatic and often violent shift in market sentiment from bearish to bullish, typically triggered by a significant news event or change in fundamentals overnight.</p>

            <h4 className="text-xl font-semibold mt-8 mb-4 border-l-4 border-primary pl-4">What The Pattern Looks Like</h4>
            <ul className="space-y-4 mb-6 list-disc pl-5">
                <li><strong>First Candle:</strong> A bearish (red) candle that occurs during a downtrend.</li>
                <li><strong>Second Candle:</strong> A bullish (green) candle that opens significantly higher than the previous day's open—a large gap up. The price does not fill this gap and continues to move higher.</li>
            </ul>

            <Diagram 
                src="https://twiojujlmgannxhmrbou.supabase.co/storage/v1/object/public/app%20images/patterns/bullishkicker_diagram.png"
                alt="Bullish Kicker pattern diagram"
            />
            
            <h4 className="text-xl font-semibold mt-8 mb-4 border-l-4 border-primary pl-4">Pattern Psychology</h4>
            <p className="mb-4">The Kicker pattern illustrates an instantaneous and decisive change of heart in the market:</p>
            <h5 className="text-lg font-semibold mt-4 mb-2">Established Bearish Sentiment:</h5>
            <p className="mb-4">The first red candle shows that sellers are in control, and participants go home expecting the downtrend to continue.</p>
            <h5 className="text-lg font-semibold mt-4 mb-2">The Overnight Shock:</h5>
            <p className="mb-4">Some game-changing news is released after market hours (e.g., positive earnings surprise, FDA approval, etc.). This news is so overwhelmingly positive that it causes a flood of buy orders before the market even opens, resulting in a large gap up.</p>
            <h5 className="text-lg font-semibold mt-4 mb-2">No Second Chances:</h5>
            <p className="mb-4">The price never looks back. It continues to rally throughout the day, leaving no opportunity for bears to exit their short positions at a reasonable price. This creates a short squeeze, adding fuel to the fire as trapped shorts are forced to buy back their shares at higher and higher prices. The complete directional change without any overlap in price range signifies an extremely powerful and committed move by the bulls.</p>
        </>
    ),
  },
  {
    id: 'inverted-hammer',
    title: 'Inverted Hammer',
    emoji: ' T ',
    content: (
      <>
        <h3 className="text-2xl font-bold mb-2">The Inverted Hammer Pattern</h3>
        <p className="mb-6 text-lg">The Inverted Hammer is a single-candle bullish reversal pattern that, like the Hammer, appears at the bottom of a downtrend. While it looks like a bearish Shooting Star, its position in a downtrend gives it bullish implications.</p>
        <h4 className="text-xl font-semibold mt-8 mb-4 border-l-4 border-primary pl-4">What The Pattern Looks Like</h4>
        <ul className="space-y-4 mb-6 list-disc pl-5">
            <li><strong>Small Real Body:</strong> The body is small and located at the lower end of the trading range.</li>
            <li><strong>Long Upper Shadow:</strong> A long upper shadow that is at least twice the length of the real body.</li>
            <li><strong>Little to No Lower Shadow:</strong> Ideally, there is no lower shadow.</li>
            <li><strong>Position in Trend:</strong> Must occur after a downtrend.</li>
        </ul>
        <h4 className="text-xl font-semibold mt-8 mb-4 border-l-4 border-primary pl-4">Pattern Psychology</h4>
        <p>The Inverted Hammer shows that buyers are beginning to test the waters. During the session, buyers pushed the price significantly higher, but sellers were still strong enough to push it back down near the open. The key insight is that the bears were unable to make a new low. The bulls' ability to rally the price so high intra-day, even if they couldn't hold it, is the first sign of buying interest and a potential shift in sentiment. Confirmation is required the next day.</p>
      </>
    ),
  },
  {
    id: 'dragonfly-doji',
    title: 'Dragonfly Doji',
    emoji: ' T ',
    content: (
      <>
        <h3 className="text-2xl font-bold mb-2">The Dragonfly Doji Pattern</h3>
        <p className="mb-6 text-lg">A powerful single-candle bullish reversal pattern. It's a specific type of Doji where the open, high, and close prices are the same (or very close), and there is a long lower shadow.</p>
        <h4 className="text-xl font-semibold mt-8 mb-4 border-l-4 border-primary pl-4">What The Pattern Looks Like</h4>
        <ul className="space-y-4 mb-6 list-disc pl-5">
            <li><strong>No Real Body:</strong> The open and close are at the same price, forming a horizontal line.</li>
            <li><strong>Long Lower Shadow:</strong> A very long lower wick.</li>
            <li><strong>No Upper Shadow:</strong> The high of the day is the same as the open and close.</li>
        </ul>
        <h4 className="text-xl font-semibold mt-8 mb-4 border-l-4 border-primary pl-4">Pattern Psychology</h4>
        <p>The Dragonfly Doji tells a story of a dramatic intra-day reversal. The market opens, and sellers take immediate control, pushing the price significantly lower. However, at the session's low, buying pressure emerges with incredible force, pushing the price all the way back up to the opening level by the close. This signifies a total rejection of lower prices by the market. The bears were decisively defeated, and the bulls managed to reclaim all lost ground, signaling a very strong potential bottom.</p>
      </>
    ),
  },
  {
    id: 'bullish-counterattack',
    title: 'Bullish Counterattack',
    emoji: '⚔️',
    content: (
      <>
        <h3 className="text-2xl font-bold mb-2">The Bullish Counterattack Pattern</h3>
        <p className="mb-6 text-lg">A two-candle bullish reversal pattern. It's similar to the Piercing Pattern but with a less stringent requirement for the second candle's close.</p>
        <h4 className="text-xl font-semibold mt-8 mb-4 border-l-4 border-primary pl-4">What The Pattern Looks Like</h4>
        <ul className="space-y-4 mb-6 list-disc pl-5">
            <li><strong>First Candle:</strong> A long red (bearish) candle in a downtrend.</li>
            <li><strong>Second Candle:</strong> A long green (bullish) candle that opens with a significant gap down but rallies to close at or very near the close of the first candle.</li>
        </ul>
        <h4 className="text-xl font-semibold mt-8 mb-4 border-l-4 border-primary pl-4">Pattern Psychology</h4>
        <p>This pattern shows a stalemate after a period of bearish control. The first day is strongly bearish. The second day opens with panic selling (a large gap down), but buyers step in with force and "counterattack," driving the price all the way back up to the previous day's close. While they haven't completely overwhelmed the sellers (as in an Engulfing pattern), they have fought them to a draw, completely erasing the day's losses. This sudden halt to the downward momentum and the powerful bullish response signals that the downtrend is likely over.</p>
      </>
    ),
  },
  {
    id: 'bullish-abandoned-baby',
    title: 'Bullish Abandoned Baby',
    emoji: '👶',
    content: (
      <>
        <h3 className="text-2xl font-bold mb-2">The Bullish Abandoned Baby Pattern</h3>
        <p className="mb-6 text-lg">A rare but extremely powerful three-candle bullish reversal pattern. It is a more definitive version of the Morning Star.</p>
        <h4 className="text-xl font-semibold mt-8 mb-4 border-l-4 border-primary pl-4">What The Pattern Looks Like</h4>
        <ul className="space-y-4 mb-6 list-disc pl-5">
            <li><strong>First Candle:</strong> A long red (bearish) candle.</li>
            <li><strong>Second Candle:</strong> A Doji that gaps down, so its shadows do not overlap with the shadows of the first candle. This is the "abandoned baby."</li>
            <li><strong>Third Candle:</strong> A long green (bullish) candle that gaps up, with no shadow overlap with the Doji.</li>
        </ul>
        <h4 className="text-xl font-semibold mt-8 mb-4 border-l-4 border-primary pl-4">Pattern Psychology</h4>
        <p>This pattern represents complete panic selling followed by a total reversal. The gap down to the Doji shows extreme bearishness and capitulation. The market is so one-sided that it opens far from the previous close. The Doji itself represents a pause and total indecision. The subsequent gap up on the third day shows a complete and utter shift in sentiment overnight. The price has "gapped" away from the bottom, leaving the period of indecision completely isolated. This signifies a violent and decisive reversal.</p>
      </>
    ),
  },
  {
    id: 'morning-doji-star',
    title: 'Morning Doji Star',
    emoji: '✨',
    content: (
      <>
        <h3 className="text-2xl font-bold mb-2">The Morning Doji Star Pattern</h3>
        <p className="mb-6 text-lg">A more potent variation of the standard Morning Star pattern. The key difference is that the middle candle is a Doji, not a spinning top.</p>
        <h4 className="text-xl font-semibold mt-8 mb-4 border-l-4 border-primary pl-4">What The Pattern Looks Like</h4>
        <ul className="space-y-4 mb-6 list-disc pl-5">
            <li><strong>First Candle:</strong> A long red (bearish) candle.</li>
            <li><strong>Second Candle:</strong> A Doji that gaps down from the first candle.</li>
            <li><strong>Third Candle:</strong> A long green (bullish) candle that closes well into the body of the first candle.</li>
        </ul>
        <h4 className="text-xl font-semibold mt-8 mb-4 border-l-4 border-primary pl-4">Pattern Psychology</h4>
        <p>The psychology is similar to the Morning Star, but the Doji in the middle makes the signal stronger. A Doji represents a moment of perfect equilibrium and maximum indecision—buyers and sellers are in a dead heat. After a long downtrend, this complete stall in selling pressure is more significant than a spinning top (which has a small body). When the third candle confirms a bullish move away from this point of perfect balance, it signals a more decisive and reliable reversal.</p>
      </>
    ),
  },
   {
    id: 'homing-pigeon',
    title: 'Homing Pigeon',
    emoji: '🕊️',
    content: (
      <>
        <h3 className="text-2xl font-bold mb-2">The Homing Pigeon Pattern</h3>
        <p className="mb-6 text-lg">The Homing Pigeon is a two-candle bullish reversal pattern that is a weaker version of the Bullish Harami. It suggests a potential slowdown in the downtrend.</p>
        <h4 className="text-xl font-semibold mt-8 mb-4 border-l-4 border-primary pl-4">What The Pattern Looks Like</h4>
        <ul className="space-y-4 mb-6 list-disc pl-5">
            <li><strong>First Candle:</strong> A long red (bearish) candle.</li>
            <li><strong>Second Candle:</strong> A small red (bearish) candle whose body is completely contained within the body of the first candle.</li>
        </ul>
        <h4 className="text-xl font-semibold mt-8 mb-4 border-l-4 border-primary pl-4">Pattern Psychology</h4>
        <p>The Homing Pigeon signals that the selling pressure is waning. The first candle shows strong bearish control. The second candle, while still bearish (closing lower than its open), has a much smaller range and fails to make a new low. It's "homing" back towards the safety of the previous day's range. This indicates that the conviction of the sellers is significantly reduced, and the market is losing its downward momentum. It's a sign of a potential bottom, but requires strong bullish confirmation.</p>
      </>
    ),
  },
  {
    id: 'stick-sandwich',
    title: 'Stick Sandwich',
    emoji: '🥪',
    content: (
      <>
        <h3 className="text-2xl font-bold mb-2">The Stick Sandwich Pattern</h3>
        <p className="mb-6 text-lg">A rare three-candle bullish reversal pattern where a middle candle is "sandwiched" between two outer candles with the same closing price.</p>
        <h4 className="text-xl font-semibold mt-8 mb-4 border-l-4 border-primary pl-4">What The Pattern Looks Like</h4>
        <ul className="space-y-4 mb-6 list-disc pl-5">
            <li><strong>First Candle:</strong> A long red (bearish) candle.</li>
            <li><strong>Second Candle:</strong> A green (bullish) candle that trades above the close of the first candle.</li>
            <li><strong>Third Candle:</strong> A red (bearish) candle whose closing price is the same as the first candle's close.</li>
        </ul>
        <h4 className="text-xl font-semibold mt-8 mb-4 border-l-4 border-primary pl-4">Pattern Psychology</h4>
        <p>This pattern identifies a key support level. The first day shows strong selling. The second day shows a bullish rally. On the third day, sellers try to regain control but are stopped dead at the exact same closing price as the first day. The market is refusing to close any lower than this level. This successful defense of a support level, creating the "sandwich," suggests that buyers are stepping in at this price and a reversal is likely.</p>
      </>
    ),
  },
  {
    id: 'matching-low',
    title: 'Matching Low',
    emoji: '==',
    content: (
      <>
        <h3 className="text-2xl font-bold mb-2">The Matching Low Pattern</h3>
        <p className="mb-6 text-lg">A two-candle bullish reversal pattern that, like the Tweezer Bottom, signifies a strong support level. It is considered a more reliable signal than some other two-stick patterns.</p>
        <h4 className="text-xl font-semibold mt-8 mb-4 border-l-4 border-primary pl-4">What The Pattern Looks Like</h4>
        <ul className="space-y-4 mb-6 list-disc pl-5">
            <li><strong>First Candle:</strong> A long red (bearish) candle in a downtrend.</li>
            <li><strong>Second Candle:</strong> Another red (bearish) candle that has the exact same closing price as the first candle.</li>
        </ul>
        <h4 className="text-xl font-semibold mt-8 mb-4 border-l-4 border-primary pl-4">Pattern Psychology</h4>
        <p>The Matching Low demonstrates a clear and definitive halt to selling pressure. After a strong bearish move on day one, sellers continue to push on day two. However, they are completely unable to push the price to a close below the previous day's close. This failure to achieve a lower close, despite a full session of trying, is a significant sign of exhaustion. The fact that buyers stepped in to hold the exact same closing price level demonstrates the establishment of a strong support floor, often leading to a reversal.</p>
      </>
    ),
  },
  {
    id: 'three-stars-in-the-south',
    title: 'Three Stars in the South',
    emoji: ' T ',
    content: (
      <>
        <h3 className="text-2xl font-bold mb-2">The Three Stars in the South Pattern</h3>
        <p className="mb-6 text-lg">A rare and complex three-candle bullish reversal pattern that shows a slow and grinding loss of bearish momentum.</p>
        <h4 className="text-xl font-semibold mt-8 mb-4 border-l-4 border-primary pl-4">What The Pattern Looks Like</h4>
        <ul className="space-y-4 mb-6 list-disc pl-5">
            <li><strong>First Candle:</strong> A long red candle with a long lower shadow.</li>
            <li><strong>Second Candle:</strong> A smaller red candle with a lower low than the first, but a higher close (its body is within the range of the first candle's lower shadow).</li>
            <li><strong>Third Candle:</strong> A small red marubozu (no shadows) that is contained within the range of the second candle's body.</li>
        </ul>
        <h4 className="text-xl font-semibold mt-8 mb-4 border-l-4 border-primary pl-4">Pattern Psychology</h4>
        <p>This pattern shows a gradual and definitive exhaustion of selling pressure. Each day, the bears make a new low, but their progress is less and less significant. The range of each candle gets progressively smaller, and the closes start to move up. The final, tiny marubozu shows the bears have run completely out of steam and are unable to push the price anywhere. This methodical deceleration of downward momentum signals that the trend is dying and a reversal is imminent.</p>
      </>
    ),
  },
  {
    id: 'concealing-baby-swallow',
    title: 'Concealing Baby Swallow',
    emoji: '🐦',
    content: (
      <>
        <h3 className="text-2xl font-bold mb-2">The Concealing Baby Swallow Pattern</h3>
        <p className="mb-6 text-lg">An extremely rare four-candle bullish reversal pattern. Its complexity makes it hard to spot, but it is considered a very potent signal.</p>
        <h4 className="text-xl font-semibold mt-8 mb-4 border-l-4 border-primary pl-4">What The Pattern Looks Like</h4>
        <ul className="space-y-4 mb-6 list-disc pl-5">
            <li><strong>First Two Candles:</strong> Two long red marubozu candles, continuing a downtrend.</li>
            <li><strong>Third Candle:</strong> A red candle that opens with a gap down but rallies to close inside the body of the second candle (like an inverted hammer).</li>
            <li><strong>Fourth Candle:</strong> A long red candle that completely engulfs the third candle, making a new low.</li>
        </ul>
        <h4 className="text-xl font-semibold mt-8 mb-4 border-l-4 border-primary pl-4">Pattern Psychology</h4>
        <p>This pattern represents a final, exhaustive push by the bears that ultimately fails. The first two days are extremely bearish. The third day shows the first sign of life from bulls, who manage to push the price up intra-day. The fourth day appears to be a massive bearish victory, as it completely engulfs the prior day's action. However, this is often a "capitulation" move. All the remaining sellers have been flushed out in this final, dramatic push lower. With no sellers left, the market has nowhere to go but up. The sheer extremity of the final candle often signals the bottom.</p>
      </>
    ),
  },
  {
    id: 'ladder-bottom',
    title: 'Ladder Bottom',
    emoji: '🪜',
    content: (
      <>
        <h3 className="text-2xl font-bold mb-2">The Ladder Bottom Pattern</h3>
        <p className="mb-6 text-lg">A five-candle bullish reversal pattern indicating a potential bottom after a strong downtrend.</p>
        <h4 className="text-xl font-semibold mt-8 mb-4 border-l-4 border-primary pl-4">What The Pattern Looks Like</h4>
        <ul className="space-y-4 mb-6 list-disc pl-5">
            <li><strong>First Three Candles:</strong> Three long red candles with progressively lower opens and closes (similar to Three Black Crows, but in a downtrend).</li>
            <li><strong>Fourth Candle:</strong> A red candle with a long upper shadow (an inverted hammer shape).</li>
            <li><strong>Fifth Candle:</strong> A green candle that opens with a gap up above the body of the fourth candle.</li>
        </ul>
        <h4 className="text-xl font-semibold mt-8 mb-4 border-l-4 border-primary pl-4">Pattern Psychology</h4>
        <p>The "ladder rungs" of the first three days show a strong, orderly decline. The fourth candle is the first sign of a problem for the bears; although the day closes lower, bulls managed an intra-day rally, showing their first signs of strength. The fifth day is the confirmation. The gap up shows a complete shift in sentiment overnight, and the subsequent bullish close confirms that buyers have taken control from the exhausted sellers.</p>
      </>
    ),
  },
  // --- NEWLY ADDED 20 PATTERNS ---
  {
    id: 'bullish-marubozu',
    title: 'Bullish Marubozu',
    emoji: '🟩',
    content: (
      <>
        <h3 className="text-2xl font-bold mb-2">The Bullish Marubozu Pattern</h3>
        <p className="mb-6 text-lg">A single-candle pattern indicating extreme bullish sentiment. "Marubozu" means "bald head" in Japanese, referring to the lack of shadows (wicks).</p>
        <h4 className="text-xl font-semibold mt-8 mb-4 border-l-4 border-primary pl-4">What The Pattern Looks Like</h4>
        <ul className="space-y-4 mb-6 list-disc pl-5">
            <li><strong>Long Green Body:</strong> It consists of a single long green candle with no upper or lower shadows.</li>
            <li><strong>Open and Low are Equal:</strong> The opening price is the low of the day.</li>
            <li><strong>Close and High are Equal:</strong> The closing price is the high of the day.</li>
        </ul>
        <h4 className="text-xl font-semibold mt-8 mb-4 border-l-4 border-primary pl-4">Pattern Psychology</h4>
        <p>A Bullish Marubozu demonstrates absolute control by the buyers from the opening bell to the closing bell. The price never trades below the open, and sellers are unable to push the price down from its high at any point. This signifies intense and unwavering buying pressure throughout the entire session. It can mark the start of a strong bullish move or act as a powerful continuation signal within an existing uptrend.</p>
      </>
    )
  },
  {
    id: 'rising-window',
    title: 'Rising Window (Gap Up)',
    emoji: '↗️',
    content: (
      <>
        <h3 className="text-2xl font-bold mb-2">The Rising Window (Gap Up) Pattern</h3>
        <p className="mb-6 text-lg">A two-candle pattern where the low of the second candle is above the high of the first candle, creating a "window" or gap in price action. This is a strong bullish continuation signal.</p>
        <h4 className="text-xl font-semibold mt-8 mb-4 border-l-4 border-primary pl-4">What The Pattern Looks Like</h4>
        <ul className="space-y-4 mb-6 list-disc pl-5">
            <li><strong>Gap:</strong> A space exists between the high of the first candle and the low of the second candle.</li>
            <li><strong>Continuation:</strong> The second candle continues to trade higher, away from the gap.</li>
        </ul>
        <h4 className="text-xl font-semibold mt-8 mb-4 border-l-4 border-primary pl-4">Pattern Psychology</h4>
        <p>A Rising Window signifies a powerful surge in buying interest, often triggered by overnight news. The market is so bullish that it opens at a price significantly higher than the previous day's entire trading range. The gap itself now acts as a strong support zone; the theory is that if the price were to fall back and "fill the gap," the bullish signal would be negated. A gap that remains unfilled is a sign of a very strong and healthy uptrend.</p>
      </>
    )
  },
  {
    id: 'rising-three-methods',
    title: 'Rising Three Methods',
    emoji: '⏯️',
    content: (
      <>
        <h3 className="text-2xl font-bold mb-2">The Rising Three Methods Pattern</h3>
        <p className="mb-6 text-lg">A five-candle bullish continuation pattern that signals a temporary pause or consolidation within a strong uptrend before it resumes.</p>
        <h4 className="text-xl font-semibold mt-8 mb-4 border-l-4 border-primary pl-4">What The Pattern Looks Like</h4>
        <ul className="space-y-4 mb-6 list-disc pl-5">
            <li><strong>First Candle:</strong> A long green (bullish) candle.</li>
            <li><strong>Next Three Candles:</strong> A series of three small red candles that trade within the range of the first candle's body.</li>
            <li><strong>Fifth Candle:</strong> A long green candle that closes above the close of the first candle, making a new high.</li>
        </ul>
        <h4 className="text-xl font-semibold mt-8 mb-4 border-l-4 border-primary pl-4">Pattern Psychology</h4>
        <p>This pattern shows a healthy pause in a strong uptrend. The initial long green candle establishes bullish control. The three small red candles represent a weak counter-trend pullback or profit-taking. Crucially, this selling is unable to break below the low of the first green candle. The final long green candle shows that the bulls have reasserted control after the brief rest, breaking to a new high and signaling the continuation of the primary uptrend.</p>
      </>
    )
  },
  {
    id: 'bullish-belt-hold',
    title: 'Bullish Belt Hold',
    emoji: '🥋',
    content: (
      <>
        <h3 className="text-2xl font-bold mb-2">The Bullish Belt Hold Pattern</h3>
        <p className="mb-6 text-lg">A single-candle bullish reversal pattern. It is essentially a green Marubozu that opens with a significant gap down.</p>
        <h4 className="text-xl font-semibold mt-8 mb-4 border-l-4 border-primary pl-4">What The Pattern Looks Like</h4>
        <ul className="space-y-4 mb-6 list-disc pl-5">
            <li><strong>Context:</strong> Occurs after a downtrend.</li>
            <li><strong>Formation:</strong> The candle opens at its low for the day (no lower shadow) and then rallies for the rest of the session, closing near its high. It looks like a tall green candle without a lower wick.</li>
        </ul>
        <h4 className="text-xl font-semibold mt-8 mb-4 border-l-4 border-primary pl-4">Pattern Psychology</h4>
        <p>The pattern shows a dramatic and sudden reversal of sentiment. The market opens with extreme bearishness, gapping down to a new low. However, from the very first trade of the day, buyers step in with overwhelming force. They "hold the belt" at the low and do not let the price fall any further, driving it up for the entire session. This complete rejection of the opening low and the sustained buying pressure throughout the day signals a powerful shift in control from bears to bulls.</p>
      </>
    )
  },
  {
    id: 'bullish-separating-lines',
    title: 'Bullish Separating Lines',
    emoji: 'LINES',
    content: (
      <>
        <h3 className="text-2xl font-bold mb-2">The Bullish Separating Lines Pattern</h3>
        <p className="mb-6 text-lg">A two-candle bullish continuation pattern found in an uptrend.</p>
        <h4 className="text-xl font-semibold mt-8 mb-4 border-l-4 border-primary pl-4">What The Pattern Looks Like</h4>
        <ul className="space-y-4 mb-6 list-disc pl-5">
            <li><strong>First Candle:</strong> A long red (bearish) candle against the primary uptrend.</li>
            <li><strong>Second Candle:</strong> A long green (bullish) Marubozu that opens at the same price as the first candle's open.</li>
        </ul>
        <h4 className="text-xl font-semibold mt-8 mb-4 border-l-4 border-primary pl-4">Pattern Psychology</h4>
        <p>The first red candle represents profit-taking or a temporary pullback in an uptrend. The second day, however, opens with a powerful gap up to the same opening level as the prior day, completely erasing the previous day's negativity. The bulls then maintain control for the entire session, closing at the high. This shows that the pullback was insignificant and the dominant bullish trend has forcefully reasserted itself.</p>
      </>
    )
  },
  {
    id: 'bullish-meeting-line',
    title: 'Bullish Meeting Line',
    emoji: '🤝',
    content: (
      <>
        <h3 className="text-2xl font-bold mb-2">The Bullish Meeting Line Pattern</h3>
        <p className="mb-6 text-lg">A two-candle bullish reversal pattern, similar to the Piercing Pattern but slightly weaker. It occurs at the bottom of a downtrend.</p>
        <h4 className="text-xl font-semibold mt-8 mb-4 border-l-4 border-primary pl-4">What The Pattern Looks Like</h4>
        <ul className="space-y-4 mb-6 list-disc pl-5">
            <li><strong>First Candle:</strong> A long red (bearish) candle.</li>
            <li><strong>Second Candle:</strong> A long green (bullish) candle that opens with a gap down but rallies to close at the same price as the first candle's close.</li>
        </ul>
        <h4 className="text-xl font-semibold mt-8 mb-4 border-l-4 border-primary pl-4">Pattern Psychology</h4>
        <p>This pattern signifies a stalemate and a potential support level. The first day is strongly bearish. The second day opens with panic selling, but buyers step in and manage to drive the price all the way back up to the previous day's closing level. While they haven't managed to push into the prior day's body (like in a Piercing Pattern), they have successfully defended the closing price level. This shows that selling pressure has been fully absorbed at this level, indicating a potential bottom has formed.</p>
      </>
    )
  },
  {
    id: 'bullish-tri-star',
    title: 'Bullish Tri-Star',
    emoji: '✨✨✨',
    content: (
      <>
        <h3 className="text-2xl font-bold mb-2">The Bullish Tri-Star Pattern</h3>
        <p className="mb-6 text-lg">A rare but very significant three-candle bullish reversal pattern formed by three consecutive Doji candles at the bottom of a downtrend.</p>
        <h4 className="text-xl font-semibold mt-8 mb-4 border-l-4 border-primary pl-4">What The Pattern Looks Like</h4>
        <ul className="space-y-4 mb-6 list-disc pl-5">
            <li><strong>Three Dojis:</strong> The pattern consists of three Doji candles in a row.</li>
            <li><strong>Middle Doji:</strong> The second Doji gaps down below the first and third.</li>
        </ul>
        <h4 className="text-xl font-semibold mt-8 mb-4 border-l-4 border-primary pl-4">Pattern Psychology</h4>
        <p>This pattern represents extreme market indecision and exhaustion. After a downtrend, the market completely stalls for three consecutive sessions. The gap down on the second Doji shows a final attempt by bears, but it is met with immediate indecision. The third Doji gapping back up shows the bears are completely exhausted and unable to maintain the lower prices. This prolonged period of perfect equilibrium at a market low is a powerful sign that the trend has run its course and a reversal is imminent.</p>
      </>
    )
  },
  {
    id: 'bullish-doji-star',
    title: 'Bullish Doji Star',
    emoji: '🌟',
    content: (
      <>
        <h3 className="text-2xl font-bold mb-2">The Bullish Doji Star Pattern</h3>
        <p className="mb-6 text-lg">A two-candle bullish reversal pattern that is a precursor to the Morning Doji Star. It signals a potential bottom with strong indecision.</p>
        <h4 className="text-xl font-semibold mt-8 mb-4 border-l-4 border-primary pl-4">What The Pattern Looks Like</h4>
        <ul className="space-y-4 mb-6 list-disc pl-5">
            <li><strong>First Candle:</strong> A long red (bearish) candle in a downtrend.</li>
            <li><strong>Second Candle:</strong> A Doji that opens with a gap down from the body of the first candle.</li>
        </ul>
        <h4 className="text-xl font-semibold mt-8 mb-4 border-l-4 border-primary pl-4">Pattern Psychology</h4>
        <p>The first candle shows that bears are in control. The second day's gap down confirms this bearish sentiment. However, the market then goes nowhere, closing at the same price it opened. This Doji represents a moment of perfect indecision and equilibrium. The powerful selling pressure has suddenly and completely stalled. This halt in momentum is a significant warning to the bears that their control is slipping and a bullish reversal is possible, pending confirmation on the next candle.</p>
      </>
    )
  },
  {
    id: 'tasuki-gap-up',
    title: 'Upside Tasuki Gap',
    emoji: 'GAP',
    content: (
      <>
        <h3 className="text-2xl font-bold mb-2">The Upside Tasuki Gap Pattern</h3>
        <p className="mb-6 text-lg">A three-candle bullish continuation pattern that occurs within an uptrend.</p>
        <h4 className="text-xl font-semibold mt-8 mb-4 border-l-4 border-primary pl-4">What The Pattern Looks Like</h4>
        <ul className="space-y-4 mb-6 list-disc pl-5">
            <li><strong>First Candle:</strong> A long green candle in an uptrend.</li>
            <li><strong>Second Candle:</strong> Another green candle that gaps up from the first.</li>
            <li><strong>Third Candle:</strong> A red candle that opens inside the body of the second candle and closes inside the gap, but does not fully close the gap.</li>
        </ul>
        <h4 className="text-xl font-semibold mt-8 mb-4 border-l-4 border-primary pl-4">Pattern Psychology</h4>
        <p>The gap up between the first two candles shows strong bullish momentum. The third red candle represents a period of profit-taking. However, the selling pressure is not strong enough to close the gap. The fact that the gap holds as a support level confirms the underlying strength of the uptrend. This brief pause is seen as a buying opportunity before the trend is expected to resume its upward course.</p>
      </>
    )
  },
  {
    id: 'side-by-side-white-lines-bullish',
    title: 'Side-by-Side White Lines (Bullish)',
    emoji: '||',
    content: (
      <>
        <h3 className="text-2xl font-bold mb-2">The Bullish Side-by-Side White Lines Pattern</h3>
        <p className="mb-6 text-lg">A rare but reliable three-candle bullish continuation pattern.</p>
        <h4 className="text-xl font-semibold mt-8 mb-4 border-l-4 border-primary pl-4">What The Pattern Looks Like</h4>
        <ul className="space-y-4 mb-6 list-disc pl-5">
            <li><strong>First Candle:</strong> A green candle in an uptrend.</li>
            <li><strong>Second Candle:</strong> A second green candle that gaps up from the first.</li>
            <li><strong>Third Candle:</strong> A third green candle that opens at or near the open of the second candle and closes at or near the close of the second candle. The second and third candles are roughly the same size and appear "side-by-side."</li>
        </ul>
        <h4 className="text-xl font-semibold mt-8 mb-4 border-l-4 border-primary pl-4">Pattern Psychology</h4>
        <p>The initial gap up shows strong bullish sentiment. The third day opens surprisingly low, back at the previous day's open, which might cause some concern. However, buyers immediately step in at that level and drive the price right back up to the previous day's close, showing strong support and a refusal to let the price fall. This powerful defense of the previous day's gains confirms the strength of the bullish conviction and suggests the uptrend will continue.</p>
      </>
    )
  },
  {
    id: 'frypan-bottom',
    title: 'Frypan Bottom',
    emoji: '🍳',
    content: (
      <>
        <h3 className="text-2xl font-bold mb-2">The Frypan Bottom Pattern</h3>
        <p className="mb-6 text-lg">A multi-candle bullish reversal pattern that is a variation of the "Rounding Bottom." It signifies a slow and gradual shift from a downtrend to an uptrend.</p>
        <h4 className="text-xl font-semibold mt-8 mb-4 border-l-4 border-primary pl-4">What The Pattern Looks Like</h4>
        <ul className="space-y-4 mb-6 list-disc pl-5">
            <li><strong>Downtrend:</strong> A preceding downtrend leads into the pattern.</li>
            <li><strong>Rounding Bottom:</strong> A series of small-bodied candles form a saucer or "U" shape, showing a gradual bottoming process.</li>
            <li><strong>Breakout:</strong> The pattern is confirmed by a final candle that gaps up and breaks above the resistance level formed by the rim of the "pan."</li>
        </ul>
        <h4 className="text-xl font-semibold mt-8 mb-4 border-l-4 border-primary pl-4">Pattern Psychology</h4>
        <p>The Frypan Bottom illustrates a slow death of bearish sentiment and a quiet accumulation phase by buyers. The initial downtrend gives way to a period of consolidation where selling pressure dries up, but buying pressure has not yet taken over. The candles become smaller and the price action flattens out. This is the "pan." The final gap up is the "handle" and signifies the definitive end of the consolidation. Buyers have finally absorbed all the sellers and now have enough control to force the price significantly higher, confirming the new uptrend.</p>
      </>
    )
  },
  {
    id: 'tower-bottom',
    title: 'Tower Bottom',
    emoji: '🗼',
    content: (
      <>
        <h3 className="text-2xl font-bold mb-2">The Tower Bottom Pattern</h3>
        <p className="mb-6 text-lg">A multi-candle bullish reversal pattern that shows a more volatile bottoming process than a Rounding Bottom.</p>
        <h4 className="text-xl font-semibold mt-8 mb-4 border-l-4 border-primary pl-4">What The Pattern Looks Like</h4>
        <ul className="space-y-4 mb-6 list-disc pl-5">
            <li><strong>First Candle:</strong> A long red candle in a downtrend.</li>
            <li><strong>Consolidation:</strong> A series of smaller-bodied candles (red or green) that trade sideways, contained within the range of the initial red candle.</li>
            <li><strong>Final Candle:</strong> A long green candle that breaks out above the consolidation range, often closing near the open of the first red candle. The tall candles on either side form the "towers."</li>
        </ul>
        <h4 className="text-xl font-semibold mt-8 mb-4 border-l-4 border-primary pl-4">Pattern Psychology</h4>
        <p>The initial long red candle signifies a climax of selling pressure. This is followed by a period of confusion and indecision where neither bulls nor bears can gain control. This sideways chop allows sentiment to reset. The final long green candle shows that the period of indecision has been decisively resolved in favor of the bulls. They have absorbed all the remaining sellers and have started a new, powerful move upwards, reversing the initial decline.</p>
      </>
    )
  },
  {
    id: 'on-neck-line-bullish',
    title: 'On Neck Line (Bullish Context)',
    emoji: 'NECK',
    content: (
      <>
        <h3 className="text-2xl font-bold mb-2">The On Neck Line Pattern (Bullish Context)</h3>
        <p className="mb-6 text-lg">While typically a bearish continuation pattern, in certain contexts, its failure can have bullish implications. The pattern itself is bearish, but a bullish move immediately following it is a sign of strength.</p>
        <h4 className="text-xl font-semibold mt-8 mb-4 border-l-4 border-primary pl-4">What The Pattern Looks Like</h4>
        <ul className="space-y-4 mb-6 list-disc pl-5">
            <li><strong>First Candle:</strong> A long red candle in a downtrend.</li>
            <li><strong>Second Candle:</strong> A small green candle that opens with a gap down but closes at or very near the low of the first candle.</li>
        </ul>
        <h4 className="text-xl font-semibold mt-8 mb-4 border-l-4 border-primary pl-4">Pattern Psychology</h4>
        <p>The standard interpretation is bearish: bulls tried to rally but were so weak they couldn't even push the price above the previous day's low. However, the bullish insight comes from what happens next. The fact that the bears could not push the price any lower forms a temporary support level. If the next candle is strongly bullish and breaks above the high of this two-candle pattern, it signifies a "failed" bearish pattern. This failure traps the bears who shorted on the pattern, forcing them to cover and adding fuel to a new bullish rally.</p>
      </>
    )
  },
  {
    id: 'in-neck-line-bullish',
    title: 'In Neck Line (Bullish Context)',
    emoji: 'NECK',
    content: (
      <>
        <h3 className="text-2xl font-bold mb-2">The In Neck Line Pattern (Bullish Context)</h3>
        <p className="mb-6 text-lg">Similar to the On Neck Line, the In Neck Line is technically a bearish continuation pattern whose failure can signal a bullish reversal.</p>
        <h4 className="text-xl font-semibold mt-8 mb-4 border-l-4 border-primary pl-4">What The Pattern Looks Like</h4>
        <ul className="space-y-4 mb-6 list-disc pl-5">
            <li><strong>First Candle:</strong> A long red candle in a downtrend.</li>
            <li><strong>Second Candle:</strong> A small green candle that opens with a gap down but closes slightly inside the body of the first candle, just above the prior day's close.</li>
        </ul>
        <h4 className="text-xl font-semibold mt-8 mb-4 border-l-4 border-primary pl-4">Pattern Psychology</h4>
        <p>The bearish view is that the bulls' rally was pathetic, barely closing above the prior day's close. The bullish reversal interpretation comes from the failure of this pattern. By closing just inside the prior day's body, the bulls have established a foothold. If they can build on this with a strong green candle on the third day that breaks the pattern's high, it shows that the bears' inability to create a new low was significant. This failure can trigger a short squeeze and a powerful reversal.</p>
      </>
    )
  },
  {
    id: 'thrusting-line-bullish',
    title: 'Thrusting Line (Bullish Context)',
    emoji: 'THRUST',
    content: (
      <>
        <h3 className="text-2xl font-bold mb-2">The Thrusting Line Pattern (Bullish Context)</h3>
        <p className="mb-6 text-lg">A more potent version of the In Neck line. It is still considered a bearish continuation pattern by classical definition, but its failure is a stronger bullish signal.</p>
        <h4 className="text-xl font-semibold mt-8 mb-4 border-l-4 border-primary pl-4">What The Pattern Looks Like</h4>
        <ul className="space-y-4 mb-6 list-disc pl-5">
            <li><strong>First Candle:</strong> A long red candle in a downtrend.</li>
            <li><strong>Second Candle:</strong> A green candle that opens with a gap down and "thrusts" upwards, closing well into the body of the first candle but below its midpoint.</li>
        </ul>
        <h4 className="text-xl font-semibold mt-8 mb-4 border-l-4 border-primary pl-4">Pattern Psychology</h4>
        <p>The standard view is that because the bulls failed to close above the 50% midpoint, the bears are still in control. However, the bullish interpretation focuses on the strength of the intra-day rally. The bulls showed significant power by pushing the price so far into the prior day's range. This action often shakes the confidence of the bears. If the next day sees a bullish follow-through, the Thrusting Line is re-categorized as the foundation of a reversal, marking the point where buyers showed their first sign of real strength.</p>
      </>
    )
  },
  {
    id: 'bullish-harami-cross',
    title: 'Bullish Harami Cross',
    emoji: '✝️',
    content: (
      <>
        <h3 className="text-2xl font-bold mb-2">The Bullish Harami Cross Pattern</h3>
        <p className="mb-6 text-lg">A more powerful and significant version of the standard Bullish Harami. It signals a more profound moment of indecision at the bottom of a downtrend.</p>
        <h4 className="text-xl font-semibold mt-8 mb-4 border-l-4 border-primary pl-4">What The Pattern Looks Like</h4>
        <ul className="space-y-4 mb-6 list-disc pl-5">
            <li><strong>First Candle:</strong> A large red (bearish) candle.</li>
            <li><strong>Second Candle:</strong> A Doji candle whose entire range (high to low) is contained within the real body of the first candle.</li>
        </ul>
        <h4 className="text-xl font-semibold mt-8 mb-4 border-l-4 border-primary pl-4">Pattern Psychology</h4>
        <p>This pattern shows a more dramatic halt in momentum than a standard Harami. The Doji represents a moment of perfect equilibrium where buyers and sellers are in a dead heat. After a long downtrend characterized by strong selling, this sudden and complete pause is highly significant. It shows that selling pressure has not just weakened, but has been completely neutralized by buyers, even if only for one session. This moment of perfect balance often precedes a strong reversal as the market re-evaluates its direction.</p>
      </>
    )
  },
  {
    id: 'three-river-bottom',
    title: 'Three River Bottom',
    emoji: '🏞️',
    content: (
      <>
        <h3 className="text-2xl font-bold mb-2">The Three River Bottom Pattern</h3>
        <p className="mb-6 text-lg">A rare but notable three-candle bullish reversal pattern. It is a complex pattern indicating a potential bottom.</p>
        <h4 className="text-xl font-semibold mt-8 mb-4 border-l-4 border-primary pl-4">What The Pattern Looks Like</h4>
        <ul className="space-y-4 mb-6 list-disc pl-5">
            <li><strong>First Candle:</strong> A long red candle in a downtrend.</li>
            <li><strong>Second Candle:</strong> A red Hammer that makes a new low.</li>
            <li><strong>Third Candle:</strong> A small green candle that opens above the low of the second candle and closes below its close. Its body is contained within the range of the second candle's body.</li>
        </ul>
        <h4 className="text-xl font-semibold mt-8 mb-4 border-l-4 border-primary pl-4">Pattern Psychology</h4>
        <p>This pattern shows a complex struggle at the lows. The first candle is bearish. The second candle is a Hammer, showing an intra-day rejection of lower prices, but it still closes bearish. The third day, bulls are unable to push the price much higher, but crucially, bears are unable to push it to a new low. This failure by the bears to capitalize on the weak bullish follow-through is the key. It shows that selling pressure is completely exhausted, even when the buyers are not yet strong. This exhaustion often leads to a bullish reversal.</p>
      </>
    )
  },
  {
    id: 'unique-three-river-bottom',
    title: 'Unique Three River Bottom',
    emoji: '🏞️✨',
    content: (
      <>
        <h3 className="text-2xl font-bold mb-2">The Unique Three River Bottom Pattern</h3>
        <p className="mb-6 text-lg">A very specific and rare three-candle bullish reversal pattern that is a stronger variation of the standard Three River Bottom.</p>
        <h4 className="text-xl font-semibold mt-8 mb-4 border-l-4 border-primary pl-4">What The Pattern Looks Like</h4>
        <ul className="space-y-4 mb-6 list-disc pl-5">
            <li><strong>First Candle:</strong> A long red candle in a downtrend.</li>
            <li><strong>Second Candle:</strong> A Bullish Harami Cross (a Doji inside the body of the first candle).</li>
            <li><strong>Third Candle:</strong> A short green candle with a close below the close of the second day's Doji, but still showing bullish intent.</li>
        </ul>
        <h4 className="text-xl font-semibold mt-8 mb-4 border-l-4 border-primary pl-4">Pattern Psychology</h4>
        <p>The first candle establishes the downtrend. The second candle's Harami Cross signals a powerful moment of indecision and a halt to the bearish momentum. The third day, bears try to push the price down but fail to make a new low. The bulls then push back to close green. The inability of sellers to break the low after a clear Doji signal is a very strong sign that the downtrend has lost all its power. This pattern is considered a high-probability reversal signal due to this confirmed failure of the bears.</p>
      </>
    )
  },
  {
    id: 'kicking-up',
    title: 'Kicking Up (Bullish Kicker)',
    emoji: '🦵',
    content: (
      <>
        <h3 className="text-2xl font-bold mb-2">The Kicking Up Pattern</h3>
        <p className="mb-6 text-lg">Another name for the extremely powerful Bullish Kicker pattern. It involves two Marubozu candles gapping in opposite directions.</p>
        <h4 className="text-xl font-semibold mt-8 mb-4 border-l-4 border-primary pl-4">What The Pattern Looks Like</h4>
        <ul className="space-y-4 mb-6 list-disc pl-5">
            <li><strong>First Candle:</strong> A red or black Marubozu (no wicks).</li>
            <li><strong>Second Candle:</strong> A green or white Marubozu that opens with a significant gap up from the first candle.</li>
        </ul>
        <h4 className="text-xl font-semibold mt-8 mb-4 border-l-4 border-primary pl-4">Pattern Psychology</h4>
        <p>The psychology is identical to the Bullish Kicker. It represents a sudden, violent, and complete reversal of sentiment, usually driven by a major news event. The lack of wicks on both candles signifies that one side was in complete control during each session. The gap between them shows the instantaneous shift in that control. There is no overlap, no indecision—just a clean break and a powerful new direction.</p>
      </>
    )
  }
];