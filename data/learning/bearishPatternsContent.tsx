import React from 'react';
import type { Pattern } from './bullishPatternsContent'; // Re-use the same interface

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

export const bearishPatterns: Pattern[] = [
  {
    id: 'shooting-star',
    title: 'Shooting Star',
    emoji: '☄️',
    image: 'https://twiojujlmgannxhmrbou.supabase.co/storage/v1/object/public/app images/patterns/shootingstar_diagram.png',
    content: (
      <>
        <Image 
            src="https://twiojujlmgannxhmrbou.supabase.co/storage/v1/object/public/app images/shootingstar_context.png" 
            alt="Shooting Star pattern on a chart" 
            caption="A Shooting Star forms after an uptrend, signaling a potential price peak."
        />
        <h3 className="text-2xl font-bold mb-2">The Shooting Star Pattern</h3>
        <p className="mb-6 text-lg">The Shooting Star is a single-candle bearish reversal pattern that appears after a noticeable uptrend. It is the inverted version of the bullish Hammer and warns that the top may be near.</p>

        <h4 className="text-xl font-semibold mt-8 mb-4 border-l-4 border-red-500 pl-4">What The Pattern Looks Like</h4>
        <p className="mb-4">This pattern is characterized by its distinct shape forming at the peak of a rally:</p>
        <ul className="space-y-4 mb-6 list-disc pl-5">
            <li><strong>Small Real Body:</strong> The body is small and located at the lower end of the trading range. It can be green or red, but a red body is slightly more bearish.</li>
            <li><strong>Long Upper Shadow:</strong> The key feature is a long upper shadow (wick) that should be at least twice the length of the real body.</li>
            <li><strong>Little to No Lower Shadow:</strong> Ideally, there should be no lower shadow, meaning the open and low prices are very close.</li>
            <li><strong>Position within a Trend:</strong> For the pattern to be valid, it must appear after a clear uptrend.</li>
        </ul>

        <Diagram 
            src="https://twiojujlmgannxhmrbou.supabase.co/storage/v1/object/public/app images/patterns/shootingstar_diagram.png"
            alt="Shooting Star pattern diagram"
        />

        <h4 className="text-xl font-semibold mt-8 mb-4 border-l-4 border-red-500 pl-4">Pattern Psychology</h4>
        <p className="mb-4">The Shooting Star tells a story of a failed rally and the emergence of sellers at a new high:</p>
        <h5 className="text-lg font-semibold mt-4 mb-2">Initial Bullish Push</h5>
        <p className="mb-4">The session opens, and buyers, continuing the prevailing uptrend, push the price up aggressively to a new high. At this point, bullish sentiment is strong.</p>
        <h5 className="text-lg font-semibold mt-4 mb-2">Sellers Take Over</h5>
        <p className="mb-4">At the peak of the day, powerful selling pressure suddenly enters the market. Sellers reject the higher prices and drive the price all the way back down to close near the session's low.</p>
        <h5 className="text-lg font-semibold mt-4 mb-2">Failed Rally</h5>
        <p className="mb-4">The long upper shadow represents the territory that the bulls tried to claim but ultimately lost to the bears. This failure to hold the highs is a significant sign of weakness. The resulting candle looks like a shooting star falling to Earth, signaling that the rally has run out of steam.</p>

        <h4 className="text-xl font-semibold mt-8 mb-4 border-l-4 border-red-500 pl-4">Conclusion</h4>
        <p className="mb-4">The Shooting Star is a clear warning sign of a potential top. It indicates that buyers are losing control and sellers are becoming more aggressive at higher price levels. Traders often wait for confirmation on the next day, such as a red candle or a gap down, before acting on the signal.</p>
      </>
    ),
  },
  {
    id: 'bearish-engulfing',
    title: 'Bearish Engulfing',
    emoji: '🔴',
    image: 'https://twiojujlmgannxhmrbou.supabase.co/storage/v1/object/public/app images/patterns/bearishengulfing_diagram.png',
    content: (
        <>
            <Image 
                src="https://twiojujlmgannxhmrbou.supabase.co/storage/v1/object/public/app images/bearishengulfing_context.png" 
                alt="Bearish Engulfing pattern on a chart" 
                caption="A large red candle engulfs the prior green candle, reversing the uptrend."
            />
            <h3 className="text-2xl font-bold mb-2">The Bearish Engulfing Pattern</h3>
            <p className="mb-6 text-lg">A powerful two-candle bearish reversal pattern occurring after an uptrend. It is a strong visual representation of sellers overwhelming buyers and taking control of the market.</p>
            
            <h4 className="text-xl font-semibold mt-8 mb-4 border-l-4 border-red-500 pl-4">What The Pattern Looks Like</h4>
            <p className="mb-4">This pattern involves two specific candlesticks at the end of an uptrend:</p>
            <ul className="space-y-4 mb-6 list-disc pl-5">
                <li><strong>First Candle:</strong> A small bullish (green) candle that continues the uptrend.</li>
                <li><strong>Second Candle:</strong> A large bearish (red) candle. Its body must open higher than the previous day's close and close lower than the previous day's open, completely "engulfing" the body of the first candle.</li>
            </ul>

            <Diagram 
                src="https://twiojujlmgannxhmrbou.supabase.co/storage/v1/object/public/app images/patterns/bearishengulfing_diagram.png"
                alt="Bearish Engulfing pattern diagram"
            />
            
            <h4 className="text-xl font-semibold mt-8 mb-4 border-l-4 border-red-500 pl-4">Pattern Psychology</h4>
            <p className="mb-4">The Bearish Engulfing pattern tells a story of a sudden and violent reversal of fortune for the bulls:</p>
            <h5 className="text-lg font-semibold mt-4 mb-2">Bullish Euphoria Fails</h5>
            <p className="mb-4">The first green candle shows buyers are still in charge. The second day often opens higher (gaps up), fueling more bullish optimism.</p>
            <h5 className="text-lg font-semibold mt-4 mb-2">The Bearish Ambush</h5>
            <p className="mb-4">From the high point of the day, an overwhelming wave of selling pressure enters the market. This force is so strong that it not only erases the initial gains but pushes the price far below the previous day's low.</p>
            <h5 className="text-lg font-semibold mt-4 mb-2">Complete Reversal of Sentiment</h5>
            <p className="mb-4">By the end of the session, the sellers have completely dominated the buyers. The fact that the entire previous day's bullish action was "engulfed" signifies a powerful and decisive shift in market control. The bulls have been trapped and overwhelmed.</p>
            
            <h4 className="text-xl font-semibold mt-8 mb-4 border-l-4 border-red-500 pl-4">What to Look For</h4>
            <ul className="space-y-2 list-disc pl-5">
                <li><strong>Prior Trend:</strong> The pattern is only significant if it appears after a clear uptrend.</li>
                <li><strong>Size:</strong> The larger the engulfing red candle, the more significant the reversal signal.</li>
                <li><strong>Volume:</strong> Higher volume on the engulfing day adds significant credibility to the reversal signal.</li>
            </ul>
        </>
    ),
  },
  {
    id: 'dark-cloud-cover',
    title: 'Dark Cloud Cover',
    emoji: '☁️',
    image: 'https://twiojujlmgannxhmrbou.supabase.co/storage/v1/object/public/app images/patterns/darkcloud_diagram.png',
    content: (
        <>
            <Image 
                src="https://twiojujlmgannxhmrbou.supabase.co/storage/v1/object/public/app images/darkcloud_context.png" 
                alt="Dark Cloud Cover pattern on a chart" 
                caption="A red candle opens higher but closes deep into the prior green candle's body."
            />
            <h3 className="text-2xl font-bold mb-2">The Dark Cloud Cover Pattern</h3>
            <p className="mb-6 text-lg">The Dark Cloud Cover is a two-candle bearish reversal pattern found at the top of an uptrend. It signals a potential shift in momentum as sellers begin to challenge the bulls' control.</p>
            
            <h4 className="text-xl font-semibold mt-8 mb-4 border-l-4 border-red-500 pl-4">What The Pattern Looks Like</h4>
            <p className="mb-4">This pattern consists of two candles with specific requirements:</p>
            <ul className="space-y-4 mb-6 list-disc pl-5">
                <li><strong>First Candle:</strong> A strong bullish (green) candle that confirms the uptrend.</li>
                <li><strong>Second Candle:</strong> A bearish (red) candle that opens above the high of the first candle (a gap up). It then sells off to close more than halfway down the real body of the first green candle (below the 50% midpoint).</li>
            </ul>

            <Diagram 
                src="https://twiojujlmgannxhmrbou.supabase.co/storage/v1/object/public/app images/patterns/darkcloud_diagram.png"
                alt="Dark Cloud Cover pattern diagram"
            />
            
            <h4 className="text-xl font-semibold mt-8 mb-4 border-l-4 border-red-500 pl-4">Pattern Psychology</h4>
            <p className="mb-4">The Dark Cloud Cover pattern reveals a significant challenge to the prevailing bullish sentiment:</p>
            <h5 className="text-lg font-semibold mt-4 mb-2">Initial Strength and a Bull Trap</h5>
            <p className="mb-4">The uptrend appears to continue with the gap up on the second day, giving buyers more confidence and potentially trapping them at high prices.</p>
            <h5 className="text-lg font-semibold mt-4 mb-2">The Bearish Counter-Attack</h5>
            <p className="mb-4">From the highs, sellers take control and push the price down aggressively. The close deep into the prior green candle is a significant psychological victory for the bears. This deep penetration (the "dark cloud" covering the previous bullish day) demonstrates that sellers have taken back more than half the territory previously gained by the buyers.</p>
            <h5 className="text-lg font-semibold mt-4 mb-2">Shift in Control</h5>
            <p className="mb-4">The inability of the bulls to hold the early gains and the strong sell-off signal that the balance of power is shifting. The deeper the red candle covers the green body, the more reliable the reversal signal.</p>
        </>
    ),
  },
  {
    id: 'evening-star',
    title: 'Evening Star',
    emoji: '🌃',
    image: 'https://twiojujlmgannxhmrbou.supabase.co/storage/v1/object/public/app images/patterns/eveningstar_diagram.png',
    content: (
        <>
            <Image 
                src="https://twiojujlmgannxhmrbou.supabase.co/storage/v1/object/public/app images/eveningstar_context.png" 
                alt="Evening Star pattern on a chart" 
                caption="A three-candle pattern signaling a bearish reversal after a period of indecision at the top."
            />
            <h3 className="text-2xl font-bold mb-2">The Evening Star Pattern</h3>
            <p className="mb-6 text-lg">The Evening Star is a three-candle bearish reversal pattern that suggests the "setting sun" on an uptrend. It is a strong indication of a potential market top.</p>
            
            <h4 className="text-xl font-semibold mt-8 mb-4 border-l-4 border-red-500 pl-4">What The Pattern Looks Like</h4>
            <p className="mb-4">This pattern unfolds over three trading sessions:</p>
            <ol className="space-y-4 mb-6 list-decimal pl-5">
                <li><strong>First Candle:</strong> A long green (bullish) candle, indicating strong buying pressure is still present.</li>
                <li><strong>Second Candle:</strong> A small-bodied candle (Doji or spinning top), red or green, that gaps up from the first candle. This represents market indecision.</li>
                <li><strong>Third Candle:</strong> A long red (bearish) candle that gaps down from the middle candle and closes well into the body of the first green candle.</li>
            </ol>

            <Diagram 
                src="https://twiojujlmgannxhmrbou.supabase.co/storage/v1/object/public/app images/patterns/eveningstar_diagram.png"
                alt="Evening Star pattern diagram"
            />
            
            <h4 className="text-xl font-semibold mt-8 mb-4 border-l-4 border-red-500 pl-4">Pattern Psychology</h4>
            <p className="mb-4">The Evening Star shows a clear progression from bullish control to bearish dominance:</p>
            <h5 className="text-lg font-semibold mt-4 mb-2">Day 1: Continued Bullishness</h5>
            <p className="mb-4">The first day is all bullish, with a strong green candle confirming the uptrend.</p>
            <h5 className="text-lg font-semibold mt-4 mb-2">Day 2: The Pause</h5>
            <p className="mb-4">The gap up on the second day confirms enthusiasm, but the small body shows buyers could not push the price much further. The market pauses, full of indecision at the peak.</p>
            <h5 className="text-lg font-semibold mt-4 mb-2">Day 3: The Bearish Takeover</h5>
            <p className="mb-4">The third day's gap down and strong decline signals that sellers have seized control during the period of indecision. The strong red candle confirms that the reversal is in progress and the uptrend is likely over.</p>
        </>
    ),
  },
  {
    id: 'three-black-crows',
    title: 'Three Black Crows',
    emoji: '🐦🐦🐦',
    image: 'https://twiojujlmgannxhmrbou.supabase.co/storage/v1/object/public/app images/patterns/3blackcrows_diagram.png',
    content: (
        <>
            <Image 
                src="https://twiojujlmgannxhmrbou.supabase.co/storage/v1/object/public/app images/3blackcrows_context.png" 
                alt="Three Black Crows pattern on a chart" 
                caption="Three consecutive long red candles signal a strong and steady bearish reversal."
            />
            <h3 className="text-2xl font-bold mb-2">The Three Black Crows Pattern</h3>
            <p className="mb-6 text-lg">This is a potent three-candle bearish reversal pattern that shows a steady and powerful decline after an uptrend. It is the bearish counterpart to the Three White Soldiers.</p>

            <h4 className="text-xl font-semibold mt-8 mb-4 border-l-4 border-red-500 pl-4">What The Pattern Looks Like</h4>
            <p className="mb-4">The pattern is formed by three consecutive long red (bearish) candles with specific characteristics:</p>
            <ul className="space-y-4 mb-6 list-disc pl-5">
                <li><strong>Three Red Candles:</strong> The pattern consists of three long-bodied bearish candles in a row.</li>
                <li><strong>Progressively Lower Closes:</strong> Each candle must close lower than the previous one, making new lows.</li>
                <li><strong>Opening Within Prior Body:</strong> Each candle should open within the real body of the preceding candle.</li>
                <li><strong>Small Lower Wicks:</strong> Ideally, the candles should have very small or no lower shadows, indicating they closed at or near their lows.</li>
            </ul>

            <Diagram 
                src="https://twiojujlmgannxhmrbou.supabase.co/storage/v1/object/public/app images/patterns/3blackcrows_diagram.png"
                alt="Three Black Crows pattern diagram"
            />

            <h4 className="text-xl font-semibold mt-8 mb-4 border-l-4 border-red-500 pl-4">Pattern Psychology</h4>
            <p className="mb-4">The pattern is a clear visual representation of sustained selling strength and a definitive shift in market sentiment:</p>
            <h5 className="text-lg font-semibold mt-4 mb-2">Decisive Shift to Selling</h5>
            <p className="mb-4">The Three Black Crows pattern shows a methodical and consistent takeover by the bears over three consecutive sessions, indicating a strong reversal is in place.</p>
            <h5 className="text-lg font-semibold mt-4 mb-2">Sustained Bearish Conviction</h5>
            <p className="mb-4">Each new session opens slightly higher, giving bulls a brief moment of hope before sellers step in and push the price to a new low. The fact this happens three times in a row shows deep bearish conviction.</p>
            <h5 className="text-lg font-semibold mt-4 mb-2">Lack of Buying Pressure</h5>
            <p className="mb-4">The small lower shadows indicate there was minimal buying pressure or pushback during the decline. The bears were in control from open to close each day. This pattern signifies that the market has topped out and a new, reliable downward trend has likely begun.</p>
        </>
    ),
  },
    {
    id: 'bearish-harami',
    title: 'Bearish Harami',
    emoji: '🤰',
    image: 'https://twiojujlmgannxhmrbou.supabase.co/storage/v1/object/public/app images/patterns/bearishharami_diagram.png',
    content: (
        <>
            <Image 
                src="https://twiojujlmgannxhmrbou.supabase.co/storage/v1/object/public/app images/bearishharami_context.png" 
                alt="Bearish Harami pattern on a chart" 
                caption="A small red candle forms inside the prior green candle, showing bullish momentum is fading."
            />
            <h3 className="text-2xl font-bold mb-2">The Bearish Harami Pattern</h3>
            <p className="mb-6 text-lg">A two-candle bearish reversal pattern that appears after an uptrend. The term "Harami" is an old Japanese word for "pregnant," as the pattern resembles a pregnant woman. It signals indecision and a potential loss of bullish momentum.</p>

            <h4 className="text-xl font-semibold mt-8 mb-4 border-l-4 border-red-500 pl-4">What The Pattern Looks Like</h4>
            <ul className="space-y-4 mb-6 list-disc pl-5">
                <li><strong>First Candle:</strong> A large bullish (green) candle that continues the uptrend.</li>
                <li><strong>Second Candle:</strong> A small bearish (red) candle whose body is completely contained within the real body of the first candle.</li>
            </ul>

            <Diagram 
                src="https://twiojujlmgannxhmrbou.supabase.co/storage/v1/object/public/app images/patterns/bearishharami_diagram.png"
                alt="Bearish Harami pattern diagram"
            />
            
            <h4 className="text-xl font-semibold mt-8 mb-4 border-l-4 border-red-500 pl-4">Pattern Psychology</h4>
            <p className="mb-4">The Bearish Harami tells a story of a sudden stall in bullish conviction:</p>
            <h5 className="text-lg font-semibold mt-4 mb-2">Bullish Confidence</h5>
            <p className="mb-4">The first long green candle shows the bulls are firmly in control of the market.</p>
            <h5 className="text-lg font-semibold mt-4 mb-2">Sudden Indecision</h5>
            <p className="mb-4">The second day opens lower, inside the previous day's body, and trades in a very narrow range. This indicates a sudden drop in momentum. The bulls are no longer strong enough to push prices higher, and the market pauses. This equilibrium or indecision after a strong rally is a warning sign that the trend may be about to reverse.</p>
        </>
    ),
  },
  {
    id: 'three-inside-down',
    title: 'Three Inside Down',
    emoji: '🔽',
    image: 'https://twiojujlmgannxhmrbou.supabase.co/storage/v1/object/public/app images/patterns/threeinsidedown_diagram.png',
    content: (
        <>
            <Image 
                src="https://twiojujlmgannxhmrbou.supabase.co/storage/v1/object/public/app images/threeinsidedown_context.png" 
                alt="Three Inside Down pattern on a chart" 
                caption="A bearish harami is followed by a red candle closing lower, confirming the reversal."
            />
            <h3 className="text-2xl font-bold mb-2">The Three Inside Down Pattern</h3>
            <p className="mb-6 text-lg">This is a three-candle bearish reversal pattern. It is a more reliable confirmation of the Bearish Harami pattern, providing a stronger signal that the uptrend has ended.</p>

            <h4 className="text-xl font-semibold mt-8 mb-4 border-l-4 border-red-500 pl-4">What The Pattern Looks Like</h4>
            <ol className="space-y-4 mb-6 list-decimal pl-5">
                <li><strong>First Candle:</strong> A long bullish (green) candle in an established uptrend.</li>
                <li><strong>Second Candle:</strong> A small bearish (red) candle contained within the body of the first candle (forming a Bearish Harami).</li>
                <li><strong>Third Candle:</strong> A bearish (red) candle that closes below the low of the first candle, confirming the reversal.</li>
            </ol>

            <Diagram 
                src="https://twiojujlmgannxhmrbou.supabase.co/storage/v1/object/public/app images/patterns/threeinsidedown_diagram.png"
                alt="Three Inside Down pattern diagram"
            />
            
            <h4 className="text-xl font-semibold mt-8 mb-4 border-l-4 border-red-500 pl-4">Pattern Psychology</h4>
            <p className="mb-4">The pattern shows a clear three-step transition from bullishness to a confirmed bearish reversal:</p>
            <h5 className="text-lg font-semibold mt-4 mb-2">Step 1: Bullish Momentum</h5>
            <p className="mb-4">The first candle shows the uptrend is still active.</p>
            <h5 className="text-lg font-semibold mt-4 mb-2">Step 2: Indecision</h5>
            <p className="mb-4">The Bearish Harami formation on the second day signals that the bullish momentum has stalled and the market is uncertain.</p>
            <h5 className="text-lg font-semibold mt-4 mb-2">Step 3: Bearish Confirmation</h5>
            <p className="mb-4">The third candle resolves this indecision. Sellers take decisive control, pushing the price down and closing below the range of the first day's rally. This confirms the bears have won the battle and a new downtrend is likely underway.</p>
        </>
    ),
  },
  {
    id: 'tweezer-top',
    title: 'Tweezer Top',
    emoji: '🥢',
    image: 'https://twiojujlmgannxhmrbou.supabase.co/storage/v1/object/public/app images/patterns/tweezertop_diagram.png',
    content: (
        <>
            <Image 
                src="https://twiojujlmgannxhmrbou.supabase.co/storage/v1/object/public/app images/tweezertop_context.png" 
                alt="Tweezer Top pattern on a chart" 
                caption="Two candles with matching highs signal a strong resistance level and a potential reversal."
            />
            <h3 className="text-2xl font-bold mb-2">The Tweezer Top Pattern</h3>
            <p className="mb-6 text-lg">The Tweezer Top is a two-candle (or sometimes more) bearish reversal pattern that occurs at the end of an uptrend. It is characterized by two or more candles having matching or very similar highs.</p>

            <h4 className="text-xl font-semibold mt-8 mb-4 border-l-4 border-red-500 pl-4">What The Pattern Looks Like</h4>
            <ul className="space-y-4 mb-6 list-disc pl-5">
                <li><strong>First Candle:</strong> Typically a bullish (green) candle that continues the uptrend.</li>
                <li><strong>Second Candle:</strong> Often a bearish (red) candle.</li>
                <li><strong>Matching Highs:</strong> The most crucial feature is that both candles reach the same high point, forming a clear level of resistance.</li>
            </ul>

            <Diagram 
                src="https://twiojujlmgannxhmrbou.supabase.co/storage/v1/object/public/app images/patterns/tweezertop_diagram.png"
                alt="Tweezer Top pattern diagram"
            />
            
            <h4 className="text-xl font-semibold mt-8 mb-4 border-l-4 border-red-500 pl-4">Pattern Psychology</h4>
            <p className="mb-4">The Tweezer Top indicates a failure to advance and a shift in momentum:</p>
            <p className="mb-4">On the first day, the bulls push the price up to a new high. On the second day, the bulls attempt to continue the rally but are met with strong selling pressure at the exact same high as the previous day. They are unable to push the price any higher. This failure to make a new high is a significant sign of weakness. The market is demonstrating that this price level is a strong ceiling of resistance, and sellers are stepping in to defend it. The "tweezers" have picked the top of the trend.</p>
        </>
    ),
  },
  {
    id: 'bearish-kicker',
    title: 'Bearish Kicker',
    emoji: '📉',
    image: 'https://twiojujlmgannxhmrbou.supabase.co/storage/v1/object/public/app images/patterns/bearishkicker_diagram.png',
    content: (
        <>
            <Image 
                src="https://twiojujlmgannxhmrbou.supabase.co/storage/v1/object/public/app images/bearishkicker_context.png" 
                alt="Bearish Kicker pattern on a chart" 
                caption="A sudden gap down creates a powerful bearish signal, trapping bulls."
            />
            <h3 className="text-2xl font-bold mb-2">The Bearish Kicker Pattern</h3>
            <p className="mb-6 text-lg">The Bearish Kicker is an extremely powerful two-candle reversal pattern. It signals a dramatic and sudden shift in market sentiment from bullish to bearish, often triggered by significant negative news.</p>

            <h4 className="text-xl font-semibold mt-8 mb-4 border-l-4 border-red-500 pl-4">What The Pattern Looks Like</h4>
            <ul className="space-y-4 mb-6 list-disc pl-5">
                <li><strong>First Candle:</strong> A bullish (green) candle that occurs during an uptrend.</li>
                <li><strong>Second Candle:</strong> A bearish (red) candle that opens significantly lower than the previous day's open—a large gap down. The price does not fill this gap and continues to move lower.</li>
            </ul>

            <Diagram 
                src="https://twiojujlmgannxhmrbou.supabase.co/storage/v1/object/public/app images/patterns/bearishkicker_diagram.png"
                alt="Bearish Kicker pattern diagram"
            />
            
            <h4 className="text-xl font-semibold mt-8 mb-4 border-l-4 border-red-500 pl-4">Pattern Psychology</h4>
            <p className="mb-4">The Kicker pattern shows an immediate and total reversal of market opinion:</p>
            <h5 className="text-lg font-semibold mt-4 mb-2">Established Bullish Sentiment:</h5>
            <p className="mb-4">The first green candle shows that buyers are in control and participants expect the uptrend to continue.</p>
            <h5 className="text-lg font-semibold mt-4 mb-2">The Overnight Shock:</h5>
            <p className="mb-4">Game-changing negative news is released after hours (e.g., terrible earnings, a lawsuit, etc.). The news is so bad it causes a flood of sell orders before the market opens, resulting in a large gap down.</p>
            <h5 className="text-lg font-semibold mt-4 mb-2">Trapped Bulls:</h5>
            <p className="mb-4">The price continues to fall, never giving the bulls who bought on the previous day a chance to exit without a significant loss. This panic selling from trapped bulls adds to the downward pressure. The complete directional change without any price overlap signifies an extremely powerful and committed move by the bears.</p>
        </>
    ),
  },
   {
    id: 'hanging-man',
    title: 'Hanging Man',
    emoji: ' T ',
    content: (
      <>
        <h3 className="text-2xl font-bold mb-2">The Hanging Man Pattern</h3>
        <p className="mb-6 text-lg">The Hanging Man is a single-candle bearish reversal pattern that forms at the top of an uptrend. It looks identical to a Hammer, but its position at the end of an uptrend gives it bearish implications.</p>
        <h4 className="text-xl font-semibold mt-8 mb-4 border-l-4 border-red-500 pl-4">What The Pattern Looks Like</h4>
        <ul className="space-y-4 mb-6 list-disc pl-5">
            <li><strong>Small Real Body:</strong> The body is small and located at the top of the trading range.</li>
            <li><strong>Long Lower Shadow:</strong> A long lower shadow that is at least twice the length of the body.</li>
            <li><strong>Little to No Upper Shadow:</strong> Ideally, no upper wick.</li>
            <li><strong>Position in Trend:</strong> Must occur after an uptrend.</li>
        </ul>
        <h4 className="text-xl font-semibold mt-8 mb-4 border-l-4 border-red-500 pl-4">Pattern Psychology</h4>
        <p>The Hanging Man reveals a significant increase in selling pressure. During the day, sellers managed to push the price significantly lower, but the bulls fought back to close near the open. The crucial insight is the large sell-off that occurred. It suggests that demand is drying up at these high levels and a large number of sellers are emerging. Even though the bulls managed a recovery, the presence of such a deep intra-day sell-off is a major warning that the uptrend is becoming unstable and may be vulnerable to a reversal.</p>
      </>
    ),
  },
  {
    id: 'gravestone-doji',
    title: 'Gravestone Doji',
    emoji: ' T ',
    content: (
      <>
        <h3 className="text-2xl font-bold mb-2">The Gravestone Doji Pattern</h3>
        <p className="mb-6 text-lg">A single-candle bearish reversal pattern, which is the counterpart to the Dragonfly Doji. The open, low, and close are the same, and it has a long upper shadow.</p>
        <h4 className="text-xl font-semibold mt-8 mb-4 border-l-4 border-red-500 pl-4">What The Pattern Looks Like</h4>
        <ul className="space-y-4 mb-6 list-disc pl-5">
            <li><strong>No Real Body:</strong> The open and close are at the same price.</li>
            <li><strong>Long Upper Shadow:</strong> A very long upper wick.</li>
            <li><strong>No Lower Shadow:</strong> The low of the day is the same as the open and close.</li>
        </ul>
        <h4 className="text-xl font-semibold mt-8 mb-4 border-l-4 border-red-500 pl-4">Pattern Psychology</h4>
        <p>The Gravestone Doji tells a story of a failed rally. The market opens, and buyers push the price significantly higher, continuing the uptrend. However, at the session's high, overwhelming selling pressure enters the market and pushes the price all the way back down to the opening level. This signifies a total rejection of higher prices. The bulls were decisively defeated at the peak, and the inability to hold any of the gains is a very bearish sign that the top is in.</p>
      </>
    ),
  },
  {
    id: 'bearish-counterattack',
    title: 'Bearish Counterattack',
    emoji: '⚔️',
    content: (
      <>
        <h3 className="text-2xl font-bold mb-2">The Bearish Counterattack Pattern</h3>
        <p className="mb-6 text-lg">A two-candle bearish reversal pattern that occurs in an uptrend. It is the bearish equivalent of the Bullish Counterattack.</p>
        <h4 className="text-xl font-semibold mt-8 mb-4 border-l-4 border-red-500 pl-4">What The Pattern Looks Like</h4>
        <ul className="space-y-4 mb-6 list-disc pl-5">
            <li><strong>First Candle:</strong> A long green (bullish) candle in an uptrend.</li>
            <li><strong>Second Candle:</strong> A long red (bearish) candle that opens with a significant gap up but sells off to close at or very near the close of the first candle.</li>
        </ul>
        <h4 className="text-xl font-semibold mt-8 mb-4 border-l-4 border-red-500 pl-4">Pattern Psychology</h4>
        <p>This pattern shows a stalemate after bullish control. The first day is strongly bullish. The second day opens with euphoria (a large gap up), but sellers step in with force and "counterattack," driving the price all the way back down. While they haven't completely overwhelmed the buyers, they have fought them to a draw, erasing all the day's gains. This inability to sustain the higher prices and the powerful bearish response signals that the uptrend's momentum has likely peaked.</p>
      </>
    ),
  },
  {
    id: 'bearish-abandoned-baby',
    title: 'Bearish Abandoned Baby',
    emoji: '👶',
    content: (
      <>
        <h3 className="text-2xl font-bold mb-2">The Bearish Abandoned Baby Pattern</h3>
        <p className="mb-6 text-lg">An extremely rare but powerful three-candle bearish reversal pattern. It is a more definitive version of the Evening Star.</p>
        <h4 className="text-xl font-semibold mt-8 mb-4 border-l-4 border-red-500 pl-4">What The Pattern Looks Like</h4>
        <ul className="space-y-4 mb-6 list-disc pl-5">
            <li><strong>First Candle:</strong> A long green (bullish) candle.</li>
            <li><strong>Second Candle:</strong> A Doji that gaps up, so its shadows do not overlap with the shadows of the first candle.</li>
            <li><strong>Third Candle:</strong> A long red (bearish) candle that gaps down, with no shadow overlap with the Doji.</li>
        </ul>
        <h4 className="text-xl font-semibold mt-8 mb-4 border-l-4 border-red-500 pl-4">Pattern Psychology</h4>
        <p>This pattern represents peak euphoria followed by a total reversal. The gap up to the Doji shows extreme bullishness. The Doji itself represents a pause and total indecision at the peak. The subsequent gap down on the third day shows a complete and utter shift in sentiment overnight. The price has "gapped" away from the top, leaving the period of indecision completely isolated. This signifies a violent and decisive reversal, often trapping bulls at the high.</p>
      </>
    ),
  },
  {
    id: 'evening-doji-star',
    title: 'Evening Doji Star',
    emoji: '✨',
    content: (
      <>
        <h3 className="text-2xl font-bold mb-2">The Evening Doji Star Pattern</h3>
        <p className="mb-6 text-lg">A more potent variation of the standard Evening Star pattern, where the middle candle is a Doji.</p>
        <h4 className="text-xl font-semibold mt-8 mb-4 border-l-4 border-red-500 pl-4">What The Pattern Looks Like</h4>
        <ul className="space-y-4 mb-6 list-disc pl-5">
            <li><strong>First Candle:</strong> A long green (bullish) candle.</li>
            <li><strong>Second Candle:</strong> A Doji that gaps up from the first candle.</li>
            <li><strong>Third Candle:</strong> A long red (bearish) candle that closes well into the body of the first candle.</li>
        </ul>
        <h4 className="text-xl font-semibold mt-8 mb-4 border-l-4 border-red-500 pl-4">Pattern Psychology</h4>
        <p>The Doji in the middle of this pattern makes the reversal signal stronger than a standard Evening Star. A Doji represents perfect equilibrium and maximum indecision. After a strong uptrend, this complete stall in buying pressure is more significant. When the third candle confirms a bearish move away from this point of perfect balance, it signals a more decisive and reliable reversal.</p>
      </>
    ),
  },
   {
    id: 'upside-gap-two-crows',
    title: 'Upside Gap Two Crows',
    emoji: '🐦',
    content: (
      <>
        <h3 className="text-2xl font-bold mb-2">The Upside Gap Two Crows Pattern</h3>
        <p className="mb-6 text-lg">A rare three-candle bearish reversal pattern that occurs during an uptrend.</p>
        <h4 className="text-xl font-semibold mt-8 mb-4 border-l-4 border-red-500 pl-4">What The Pattern Looks Like</h4>
        <ul className="space-y-4 mb-6 list-disc pl-5">
            <li><strong>First Candle:</strong> A long green (bullish) candle.</li>
            <li><strong>Second Candle:</strong> A small red (bearish) candle that gaps up.</li>
            <li><strong>Third Candle:</strong> Another red candle that opens higher than the second but closes lower, engulfing the second candle's body but remaining above the first day's close.</li>
        </ul>
        <h4 className="text-xl font-semibold mt-8 mb-4 border-l-4 border-red-500 pl-4">Pattern Psychology</h4>
        <p>This pattern shows a struggle at the top. The first day is strongly bullish. The second day gaps up but fails to continue, closing lower. The third day attempts another rally but fails again, closing even lower. The inability of the market to make any upward progress after the initial gap is a significant sign of weakness. The "two crows" are perched at the top, looking down, signaling that the rally has exhausted itself and sellers are taking control.</p>
      </>
    ),
  },
  {
    id: 'two-black-gapping',
    title: 'Two Black Gapping',
    emoji: '⚫⚫',
    content: (
      <>
        <h3 className="text-2xl font-bold mb-2">The Two Black Gapping Pattern</h3>
        <p className="mb-6 text-lg">A bearish continuation pattern that occurs during a downtrend, signaling that the trend is likely to continue lower.</p>
        <h4 className="text-xl font-semibold mt-8 mb-4 border-l-4 border-red-500 pl-4">What The Pattern Looks Like</h4>
        <ul className="space-y-4 mb-6 list-disc pl-5">
            <li><strong>Context:</strong> A clear downtrend must be in place.</li>
            <li><strong>First Candle:</strong> A red (bearish) candle gaps down from the previous day.</li>
            <li><strong>Second Candle:</strong> Another red candle that opens inside the body of the first candle but closes lower, making a new low.</li>
        </ul>
        <h4 className="text-xl font-semibold mt-8 mb-4 border-l-4 border-red-500 pl-4">Pattern Psychology</h4>
        <p>The gap down on the first day is a strong sign of bearish conviction. The second day shows a slight pause or minor rally at the open, but sellers quickly re-emerge and push the price to a new low. The inability of buyers to produce any meaningful rally after a significant gap down confirms the overwhelming strength of the sellers and signals that the downtrend has strong momentum to continue.</p>
      </>
    ),
  },
  {
    id: 'falling-three-methods',
    title: 'Falling Three Methods',
    emoji: '📉',
    content: (
      <>
        <h3 className="text-2xl font-bold mb-2">The Falling Three Methods Pattern</h3>
        <p className="mb-6 text-lg">A five-candle bearish continuation pattern that signals a pause or consolidation in a downtrend before it resumes.</p>
        <h4 className="text-xl font-semibold mt-8 mb-4 border-l-4 border-red-500 pl-4">What The Pattern Looks Like</h4>
        <ul className="space-y-4 mb-6 list-disc pl-5">
            <li><strong>First Candle:</strong> A long red (bearish) candle.</li>
            <li><strong>Next Three Candles:</strong> A series of three small green candles that trade within the range of the first candle's body.</li>
            <li><strong>Fifth Candle:</strong> A long red candle that closes below the close of the first candle, making a new low.</li>
        </ul>
        <h4 className="text-xl font-semibold mt-8 mb-4 border-l-4 border-red-500 pl-4">Pattern Psychology</h4>
        <p>This pattern shows a temporary pause in a strong downtrend. The initial long red candle establishes bearish control. The three small green candles represent a weak counter-trend rally or profit-taking by shorts. Crucially, this rally is unable to break above the high of the first red candle. The final long red candle shows that the bears have reasserted control after the brief pause, breaking to a new low and signaling the continuation of the primary downtrend.</p>
      </>
    ),
  },
  {
    id: 'deliberation-pattern',
    title: 'Deliberation Pattern',
    emoji: '🤔',
    content: (
      <>
        <h3 className="text-2xl font-bold mb-2">The Deliberation Pattern</h3>
        <p className="mb-6 text-lg">A three-candle pattern that can signal a potential bearish reversal or a stall in an uptrend.</p>
        <h4 className="text-xl font-semibold mt-8 mb-4 border-l-4 border-red-500 pl-4">What The Pattern Looks Like</h4>
        <ul className="space-y-4 mb-6 list-disc pl-5">
            <li><strong>First Two Candles:</strong> Two long green (bullish) candles continuing an uptrend.</li>
            <li><strong>Third Candle:</strong> A small-bodied candle (spinning top or doji) that gaps up on the open but fails to make significant upward progress.</li>
        </ul>
        <h4 className="text-xl font-semibold mt-8 mb-4 border-l-4 border-red-500 pl-4">Pattern Psychology</h4>
        <p>The first two days show strong bullish momentum. The third day gaps up, indicating continued enthusiasm, but the small body shows that buyers were unable to maintain control. The market is "deliberating" or hesitating at these new highs. This loss of momentum after a strong run-up is a warning sign that the trend is exhausted and may be vulnerable to a reversal. It's a sign of indecision that requires bearish confirmation.</p>
      </>
    ),
  },
  {
    id: 'advance-block',
    title: 'Advance Block',
    emoji: '🧱',
    content: (
      <>
        <h3 className="text-2xl font-bold mb-2">The Advance Block Pattern</h3>
        <p className="mb-6 text-lg">A three-candle bearish reversal pattern that shows a slow, struggling deterioration of an uptrend.</p>
        <h4 className="text-xl font-semibold mt-8 mb-4 border-l-4 border-red-500 pl-4">What The Pattern Looks Like</h4>
        <ul className="space-y-4 mb-6 list-disc pl-5">
            <li><strong>Three Green Candles:</strong> The pattern consists of three consecutive green (bullish) candles.</li>
            <li><strong>Worsening Condition:</strong> Each candle makes a new high, but the body of each candle is progressively smaller than the last, and the upper shadows of the second and third candles are progressively longer.</li>
        </ul>
        <h4 className="text-xl font-semibold mt-8 mb-4 border-l-4 border-red-500 pl-4">Pattern Psychology</h4>
        <p>The Advance Block shows an uptrend that is running out of steam. While the price is still managing to inch higher each day, the effort required is increasing, and the results are diminishing. The smaller bodies and longer upper wicks show that sellers are becoming more active at higher levels and are successfully pushing the price down from its highs each day. The advance is being "blocked." This visible struggle to make new highs is a clear sign of bullish exhaustion and often precedes a significant reversal.</p>
      </>
    ),
  },
  {
    id: 'breakaway-bearish',
    title: 'Bearish Breakaway',
    emoji: '📉',
    content: (
      <>
        <h3 className="text-2xl font-bold mb-2">The Bearish Breakaway Pattern</h3>
        <p className="mb-6 text-lg">A five-candle bearish reversal pattern that signals a potential top after a strong uptrend.</p>
        <h4 className="text-xl font-semibold mt-8 mb-4 border-l-4 border-red-500 pl-4">What The Pattern Looks Like</h4>
        <ul className="space-y-4 mb-6 list-disc pl-5">
            <li><strong>First Candle:</strong> A long green (bullish) candle.</li>
            <li><strong>Second Candle:</strong> A green candle that gaps up.</li>
            <li><strong>Third and Fourth Candles:</strong> Two more candles that continue the upward move, can be green or red.</li>
            <li><strong>Fifth Candle:</strong> A long red candle that closes inside the gap created between the first and second candles.</li>
        </ul>
        <h4 className="text-xl font-semibold mt-8 mb-4 border-l-4 border-red-500 pl-4">Pattern Psychology</h4>
        <p>The pattern begins with a strong, euphoric rally culminating in a gap up. This shows peak bullish sentiment. However, the follow-through over the next two days is weak. The final red candle is the key. Its powerful downward move that closes the initial gap signals a complete reversal of the prior bullish sentiment. The gap acted as a support level, and its failure is a strong technical signal that sellers have taken decisive control and the uptrend is over.</p>
      </>
    ),
  },
  // --- NEWLY ADDED 20 PATTERNS ---
  {
    id: 'bearish-marubozu',
    title: 'Bearish Marubozu',
    emoji: '🟥',
    content: (
      <>
        <h3 className="text-2xl font-bold mb-2">The Bearish Marubozu Pattern</h3>
        <p className="mb-6 text-lg">A single-candle pattern indicating extreme bearish sentiment. It is the opposite of the Bullish Marubozu.</p>
        <h4 className="text-xl font-semibold mt-8 mb-4 border-l-4 border-red-500 pl-4">What The Pattern Looks Like</h4>
        <ul className="space-y-4 mb-6 list-disc pl-5">
            <li><strong>Long Red Body:</strong> It consists of a single long red candle with no upper or lower shadows.</li>
            <li><strong>Open and High are Equal:</strong> The opening price is the high of the day.</li>
            <li><strong>Close and Low are Equal:</strong> The closing price is the low of the day.</li>
        </ul>
        <h4 className="text-xl font-semibold mt-8 mb-4 border-l-4 border-red-500 pl-4">Pattern Psychology</h4>
        <p>A Bearish Marubozu demonstrates absolute control by sellers from open to close. The price never trades above the open, and buyers are unable to push the price up from its low at any point. This signifies intense and unwavering selling pressure throughout the entire session. It can mark the start of a strong bearish move or act as a powerful continuation signal within a downtrend.</p>
      </>
    )
  },
  {
    id: 'falling-window',
    title: 'Falling Window (Gap Down)',
    emoji: '↘️',
    content: (
      <>
        <h3 className="text-2xl font-bold mb-2">The Falling Window (Gap Down) Pattern</h3>
        <p className="mb-6 text-lg">A two-candle pattern where the high of the second candle is below the low of the first candle, creating a "window" or gap. This is a strong bearish continuation signal.</p>
        <h4 className="text-xl font-semibold mt-8 mb-4 border-l-4 border-red-500 pl-4">What The Pattern Looks Like</h4>
        <ul className="space-y-4 mb-6 list-disc pl-5">
            <li><strong>Gap:</strong> A space exists between the low of the first candle and the high of the second candle.</li>
            <li><strong>Continuation:</strong> The second candle continues to trade lower, away from the gap.</li>
        </ul>
        <h4 className="text-xl font-semibold mt-8 mb-4 border-l-4 border-red-500 pl-4">Pattern Psychology</h4>
        <p>A Falling Window signifies a powerful surge in selling interest, often triggered by negative overnight news. The market is so bearish that it opens at a price significantly lower than the previous day's entire trading range. The gap itself now acts as a strong resistance zone; if the price were to rally back and "fill the gap," the bearish signal would be weakened. A gap that remains unfilled is a sign of a very strong and healthy downtrend.</p>
      </>
    )
  },
  {
    id: 'bearish-belt-hold',
    title: 'Bearish Belt Hold',
    emoji: '🥋',
    content: (
      <>
        <h3 className="text-2xl font-bold mb-2">The Bearish Belt Hold Pattern</h3>
        <p className="mb-6 text-lg">A single-candle bearish reversal pattern. It is essentially a red Marubozu that opens with a significant gap up.</p>
        <h4 className="text-xl font-semibold mt-8 mb-4 border-l-4 border-red-500 pl-4">What The Pattern Looks Like</h4>
        <ul className="space-y-4 mb-6 list-disc pl-5">
            <li><strong>Context:</strong> Occurs after an uptrend.</li>
            <li><strong>Formation:</strong> The candle opens at its high for the day (no upper shadow) and then sells off for the rest of the session, closing near its low. It looks like a tall red candle without an upper wick.</li>
        </ul>
        <h4 className="text-xl font-semibold mt-8 mb-4 border-l-4 border-red-500 pl-4">Pattern Psychology</h4>
        <p>The pattern shows a dramatic reversal of sentiment. The market opens with extreme bullishness, gapping up to a new high. However, from the very first trade, sellers step in with overwhelming force. They "hold the belt" at the high and do not let the price rise any further, driving it down for the entire session. This complete rejection of the opening high and the sustained selling pressure signifies a powerful shift in control from bulls to bears, often trapping overly optimistic buyers.</p>
      </>
    )
  },
  {
    id: 'bearish-separating-lines',
    title: 'Bearish Separating Lines',
    emoji: 'LINES',
    content: (
      <>
        <h3 className="text-2xl font-bold mb-2">The Bearish Separating Lines Pattern</h3>
        <p className="mb-6 text-lg">A two-candle bearish continuation pattern found in a downtrend.</p>
        <h4 className="text-xl font-semibold mt-8 mb-4 border-l-4 border-red-500 pl-4">What The Pattern Looks Like</h4>
        <ul className="space-y-4 mb-6 list-disc pl-5">
            <li><strong>First Candle:</strong> A long green (bullish) candle against the primary downtrend.</li>
            <li><strong>Second Candle:</strong> A long red (bearish) Marubozu that opens at the same price as the first candle's open.</li>
        </ul>
        <h4 className="text-xl font-semibold mt-8 mb-4 border-l-4 border-red-500 pl-4">Pattern Psychology</h4>
        <p>The first green candle represents a brief relief rally or short covering in a downtrend. The second day, however, opens with a powerful gap down to the same opening level as the prior day, completely erasing the previous day's gains. The sellers then maintain control for the entire session, closing at the low. This shows that the rally was insignificant and the dominant bearish trend has forcefully reasserted itself.</p>
      </>
    )
  },
  {
    id: 'bearish-meeting-line',
    title: 'Bearish Meeting Line',
    emoji: '🤝',
    content: (
      <>
        <h3 className="text-2xl font-bold mb-2">The Bearish Meeting Line Pattern</h3>
        <p className="mb-6 text-lg">A two-candle bearish reversal pattern, similar to the Dark Cloud Cover but slightly weaker. It occurs at the top of an uptrend.</p>
        <h4 className="text-xl font-semibold mt-8 mb-4 border-l-4 border-red-500 pl-4">What The Pattern Looks Like</h4>
        <ul className="space-y-4 mb-6 list-disc pl-5">
            <li><strong>First Candle:</strong> A long green (bullish) candle.</li>
            <li><strong>Second Candle:</strong> A long red (bearish) candle that opens with a gap up but sells off to close at the same price as the first candle's close.</li>
        </ul>
        <h4 className="text-xl font-semibold mt-8 mb-4 border-l-4 border-red-500 pl-4">Pattern Psychology</h4>
        <p>This pattern signifies a stalemate and a potential resistance level. The first day is strongly bullish. The second day opens with euphoria, but sellers step in and manage to drive the price all the way back down to the previous day's closing level. While they haven't managed to push into the prior day's body (like in a Dark Cloud Cover), they have successfully defended the closing price level. This shows that buying pressure has been fully absorbed at this level, indicating a potential top has formed.</p>
      </>
    )
  },
  {
    id: 'bearish-tri-star',
    title: 'Bearish Tri-Star',
    emoji: '✨✨✨',
    content: (
      <>
        <h3 className="text-2xl font-bold mb-2">The Bearish Tri-Star Pattern</h3>
        <p className="mb-6 text-lg">A rare but very significant three-candle bearish reversal pattern formed by three consecutive Doji candles at the top of an uptrend.</p>
        <h4 className="text-xl font-semibold mt-8 mb-4 border-l-4 border-red-500 pl-4">What The Pattern Looks Like</h4>
        <ul className="space-y-4 mb-6 list-disc pl-5">
            <li><strong>Three Dojis:</strong> The pattern consists of three Doji candles in a row.</li>
            <li><strong>Middle Doji:</strong> The second Doji gaps up above the first and third.</li>
        </ul>
        <h4 className="text-xl font-semibold mt-8 mb-4 border-l-4 border-red-500 pl-4">Pattern Psychology</h4>
        <p>This pattern represents extreme market indecision and exhaustion at a peak. After an uptrend, the market completely stalls for three consecutive sessions. The gap up on the second Doji shows a final bout of euphoria, but it is met with immediate indecision. The third Doji gapping back down shows the bulls are completely exhausted and unable to maintain the higher prices. This prolonged period of perfect equilibrium at a market high is a powerful sign that the trend has run its course and a reversal is imminent.</p>
      </>
    )
  },
  {
    id: 'bearish-doji-star',
    title: 'Bearish Doji Star',
    emoji: '🌟',
    content: (
      <>
        <h3 className="text-2xl font-bold mb-2">The Bearish Doji Star Pattern</h3>
        <p className="mb-6 text-lg">A two-candle bearish reversal pattern that is a precursor to the Evening Doji Star. It signals a potential top with strong indecision.</p>
        <h4 className="text-xl font-semibold mt-8 mb-4 border-l-4 border-red-500 pl-4">What The Pattern Looks Like</h4>
        <ul className="space-y-4 mb-6 list-disc pl-5">
            <li><strong>First Candle:</strong> A long green (bullish) candle in an uptrend.</li>
            <li><strong>Second Candle:</strong> A Doji that opens with a gap up from the body of the first candle.</li>
        </ul>
        <h4 className="text-xl font-semibold mt-8 mb-4 border-l-4 border-red-500 pl-4">Pattern Psychology</h4>
        <p>The first candle shows that bulls are in control. The second day's gap up confirms this bullish sentiment. However, the market then goes nowhere, closing at the same price it opened. This Doji represents a moment of perfect indecision and equilibrium. The powerful buying pressure has suddenly and completely stalled. This halt in momentum is a significant warning to the bulls that their control is slipping and a bearish reversal is possible, pending confirmation on the next candle.</p>
      </>
    )
  },
  {
    id: 'tasuki-gap-down',
    title: 'Downside Tasuki Gap',
    emoji: 'GAP',
    content: (
      <>
        <h3 className="text-2xl font-bold mb-2">The Downside Tasuki Gap Pattern</h3>
        <p className="mb-6 text-lg">A three-candle bearish continuation pattern that occurs within a downtrend.</p>
        <h4 className="text-xl font-semibold mt-8 mb-4 border-l-4 border-red-500 pl-4">What The Pattern Looks Like</h4>
        <ul className="space-y-4 mb-6 list-disc pl-5">
            <li><strong>First Candle:</strong> A long red candle in a downtrend.</li>
            <li><strong>Second Candle:</strong> Another red candle that gaps down from the first.</li>
            <li><strong>Third Candle:</strong> A green candle that opens inside the body of the second candle and closes inside the gap, but does not fully close the gap.</li>
        </ul>
        <h4 className="text-xl font-semibold mt-8 mb-4 border-l-4 border-red-500 pl-4">Pattern Psychology</h4>
        <p>The gap down between the first two candles shows strong bearish momentum. The third green candle represents a brief relief rally or short-covering. However, the buying pressure is not strong enough to close the gap. The fact that the gap holds as a resistance level confirms the underlying strength of the downtrend. This brief pause is seen as a shorting opportunity before the trend is expected to resume its downward course.</p>
      </>
    )
  },
  {
    id: 'side-by-side-white-lines-bearish',
    title: 'Side-by-Side White Lines (Bearish)',
    emoji: '||',
    content: (
      <>
        <h3 className="text-2xl font-bold mb-2">The Bearish Side-by-Side White Lines Pattern</h3>
        <p className="mb-6 text-lg">A rare but reliable three-candle bearish continuation pattern.</p>
        <h4 className="text-xl font-semibold mt-8 mb-4 border-l-4 border-red-500 pl-4">What The Pattern Looks Like</h4>
        <ul className="space-y-4 mb-6 list-disc pl-5">
            <li><strong>First Candle:</strong> A red candle in a downtrend.</li>
            <li><strong>Second Candle:</strong> A green candle that gaps down from the first.</li>
            <li><strong>Third Candle:</strong> Another green candle that opens at or near the open of the second candle and closes at or near its close. The two green candles appear "side-by-side."</li>
        </ul>
        <h4 className="text-xl font-semibold mt-8 mb-4 border-l-4 border-red-500 pl-4">Pattern Psychology</h4>
        <p>The initial gap down shows strong bearish sentiment. The following two days show attempted rallies, but they are extremely weak and contained within the gap down. The inability of buyers to push the price back up to fill the gap, despite two full sessions of trying, demonstrates their extreme weakness. This consolidation at the lows after a gap down is a strong signal that sellers are still in control and are likely to push the price lower.</p>
      </>
    )
  },
  {
    id: 'dumpling-top',
    title: 'Dumpling Top',
    emoji: '🥟',
    content: (
      <>
        <h3 className="text-2xl font-bold mb-2">The Dumpling Top Pattern</h3>
        <p className="mb-6 text-lg">A multi-candle bearish reversal pattern that is a variation of the "Rounding Top." It signifies a slow and gradual shift from an uptrend to a downtrend.</p>
        <h4 className="text-xl font-semibold mt-8 mb-4 border-l-4 border-red-500 pl-4">What The Pattern Looks Like</h4>
        <ul className="space-y-4 mb-6 list-disc pl-5">
            <li><strong>Uptrend:</strong> A preceding uptrend leads into the pattern.</li>
            <li><strong>Rounding Top:</strong> A series of small-bodied candles form an inverted saucer or "n" shape, showing a gradual topping process.</li>
            <li><strong>Breakdown:</strong> The pattern is confirmed by a final candle that gaps down and breaks below the support level formed by the rim of the "top."</li>
        </ul>
        <h4 className="text-xl font-semibold mt-8 mb-4 border-l-4 border-red-500 pl-4">Pattern Psychology</h4>
        <p>The Dumpling Top illustrates a slow death of bullish sentiment and a quiet distribution phase by sellers. The initial uptrend gives way to a period of consolidation where buying pressure dries up, but selling pressure has not yet taken over. The candles become smaller and the price action flattens out. The final gap down is the confirmation. Sellers have finally absorbed all the buyers and now have enough control to force the price significantly lower, confirming the new downtrend.</p>
      </>
    )
  },
  {
    id: 'tower-top',
    title: 'Tower Top',
    emoji: '🗼',
    content: (
      <>
        <h3 className="text-2xl font-bold mb-2">The Tower Top Pattern</h3>
        <p className="mb-6 text-lg">A multi-candle bearish reversal pattern that shows a more volatile topping process than a Rounding Top.</p>
        <h4 className="text-xl font-semibold mt-8 mb-4 border-l-4 border-red-500 pl-4">What The Pattern Looks Like</h4>
        <ul className="space-y-4 mb-6 list-disc pl-5">
            <li><strong>First Candle:</strong> A long green candle in an uptrend.</li>
            <li><strong>Consolidation:</strong> A series of smaller-bodied candles (red or green) that trade sideways after the peak.</li>
            <li><strong>Final Candle:</strong> A long red candle that breaks down below the consolidation range, often closing near the open of the first green candle. The tall candles on either side form the "towers."</li>
        </ul>
        <h4 className="text-xl font-semibold mt-8 mb-4 border-l-4 border-red-500 pl-4">Pattern Psychology</h4>
        <p>The initial long green candle signifies a climax of buying pressure. This is followed by a period of confusion and indecision where neither bulls nor bears can gain control. This sideways chop allows for distribution. The final long red candle shows that the period of indecision has been decisively resolved in favor of the bears. They have absorbed all the remaining buyers and have started a new, powerful move downwards, reversing the initial rally.</p>
      </>
    )
  },
  {
    id: 'on-neck-line-bearish',
    title: 'On Neck Line',
    emoji: 'NECK',
    content: (
      <>
        <h3 className="text-2xl font-bold mb-2">The On Neck Line Pattern</h3>
        <p className="mb-6 text-lg">A two-candle bearish continuation pattern found within a downtrend.</p>
        <h4 className="text-xl font-semibold mt-8 mb-4 border-l-4 border-red-500 pl-4">What The Pattern Looks Like</h4>
        <ul className="space-y-4 mb-6 list-disc pl-5">
            <li><strong>First Candle:</strong> A long red candle in a downtrend.</li>
            <li><strong>Second Candle:</strong> A small green candle that opens with a gap down but closes at or very near the low of the first candle.</li>
        </ul>
        <h4 className="text-xl font-semibold mt-8 mb-4 border-l-4 border-red-500 pl-4">Pattern Psychology</h4>
        <p>This pattern demonstrates the weakness of the bulls. After a strong bearish day, the next day opens even lower. Buyers attempt a rally but are so weak that they can't even push the price above the previous day's low. This failure to reclaim any meaningful ground is a strong sign that sellers are still in complete control and the downtrend is likely to continue.</p>
      </>
    )
  },
  {
    id: 'in-neck-line-bearish',
    title: 'In Neck Line',
    emoji: 'NECK',
    content: (
      <>
        <h3 className="text-2xl font-bold mb-2">The In Neck Line Pattern</h3>
        <p className="mb-6 text-lg">A two-candle bearish continuation pattern, very similar to the On Neck Line but with a slightly deeper bullish close.</p>
        <h4 className="text-xl font-semibold mt-8 mb-4 border-l-4 border-red-500 pl-4">What The Pattern Looks Like</h4>
        <ul className="space-y-4 mb-6 list-disc pl-5">
            <li><strong>First Candle:</strong> A long red candle in a downtrend.</li>
            <li><strong>Second Candle:</strong> A small green candle that opens with a gap down but closes slightly inside the body of the first candle, just above the prior day's close.</li>
        </ul>
        <h4 className="text-xl font-semibold mt-8 mb-4 border-l-4 border-red-500 pl-4">Pattern Psychology</h4>
        <p>The psychology is nearly identical to the On Neck Line. The bulls attempt a rally from a lower open, but their efforts are feeble. The fact that they can only manage to close just barely above the previous day's close is a testament to their weakness. This pathetic rally is seen by bears as a low-risk opportunity to add to their short positions, anticipating a continuation of the downtrend.</p>
      </>
    )
  },
  {
    id: 'thrusting-line-bearish',
    title: 'Thrusting Line',
    emoji: 'THRUST',
    content: (
      <>
        <h3 className="text-2xl font-bold mb-2">The Thrusting Line Pattern</h3>
        <p className="mb-6 text-lg">A two-candle pattern that is typically considered a bearish continuation in a downtrend.</p>
        <h4 className="text-xl font-semibold mt-8 mb-4 border-l-4 border-red-500 pl-4">What The Pattern Looks Like</h4>
        <ul className="space-y-4 mb-6 list-disc pl-5">
            <li><strong>First Candle:</strong> A long red candle in a downtrend.</li>
            <li><strong>Second Candle:</strong> A green candle that opens with a gap down and closes into the body of the first candle, but below its 50% midpoint.</li>
        </ul>
        <h4 className="text-xl font-semibold mt-8 mb-4 border-l-4 border-red-500 pl-4">Pattern Psychology</h4>
        <p>In a downtrend, this pattern shows a more significant rally attempt by the bulls than the In or On Neck patterns. However, the classical interpretation is that since the bulls failed to reclaim the psychologically important 50% level of the prior day's decline, the bears are still in control. The rally is seen as a temporary pullback, and the failure to cross the midpoint is taken as a sign that the downtrend will resume.</p>
      </>
    )
  },
  {
    id: 'bearish-harami-cross',
    title: 'Bearish Harami Cross',
    emoji: '✝️',
    content: (
      <>
        <h3 className="text-2xl font-bold mb-2">The Bearish Harami Cross Pattern</h3>
        <p className="mb-6 text-lg">A more powerful and significant version of the standard Bearish Harami. It signals a more profound moment of indecision at the top of an uptrend.</p>
        <h4 className="text-xl font-semibold mt-8 mb-4 border-l-4 border-red-500 pl-4">What The Pattern Looks Like</h4>
        <ul className="space-y-4 mb-6 list-disc pl-5">
            <li><strong>First Candle:</strong> A large green (bullish) candle.</li>
            <li><strong>Second Candle:</strong> A Doji candle whose entire range (high to low) is contained within the real body of the first candle.</li>
        </ul>
        <h4 className="text-xl font-semibold mt-8 mb-4 border-l-4 border-red-500 pl-4">Pattern Psychology</h4>
        <p>This pattern shows a more dramatic halt in momentum than a standard Harami. The Doji represents a moment of perfect equilibrium where buyers and sellers are in a dead heat. After a long uptrend characterized by strong buying, this sudden and complete pause is highly significant. It shows that buying pressure has not just weakened, but has been completely neutralized by sellers. This moment of perfect balance at a market peak often precedes a strong reversal.</p>
      </>
    )
  },
  {
    id: 'kicking-down',
    title: 'Kicking Down (Bearish Kicker)',
    emoji: '🦵',
    content: (
      <>
        <h3 className="text-2xl font-bold mb-2">The Kicking Down Pattern</h3>
        <p className="mb-6 text-lg">Another name for the extremely powerful Bearish Kicker pattern. It involves two Marubozu candles gapping in opposite directions.</p>
        <h4 className="text-xl font-semibold mt-8 mb-4 border-l-4 border-red-500 pl-4">What The Pattern Looks Like</h4>
        <ul className="space-y-4 mb-6 list-disc pl-5">
            <li><strong>First Candle:</strong> A green or white Marubozu (no wicks).</li>
            <li><strong>Second Candle:</strong> A red or black Marubozu that opens with a significant gap down from the first candle.</li>
        </ul>
        <h4 className="text-xl font-semibold mt-8 mb-4 border-l-4 border-red-500 pl-4">Pattern Psychology</h4>
        <p>The psychology is identical to the Bearish Kicker. It represents a sudden, violent, and complete reversal of sentiment, usually driven by a major negative news event. The lack of wicks on both candles signifies that one side was in complete control during each session. The gap between them shows the instantaneous shift in that control. There is no overlap, no indecision—just a clean break and a powerful new bearish direction.</p>
      </>
    )
  },
  {
    id: 'mat-hold-bearish',
    title: 'Mat Hold (Bearish)',
    emoji: 'HOLD',
    content: (
      <>
        <h3 className="text-2xl font-bold mb-2">The Bearish Mat Hold Pattern</h3>
        <p className="mb-6 text-lg">A five-candle bearish continuation pattern, similar to the Falling Three Methods but often considered more potent.</p>
        <h4 className="text-xl font-semibold mt-8 mb-4 border-l-4 border-red-500 pl-4">What The Pattern Looks Like</h4>
        <ul className="space-y-4 mb-6 list-disc pl-5">
            <li><strong>First Candle:</strong> A long red candle in a downtrend.</li>
            <li><strong>Next Three Candles:</strong> Three small green candles that gap up from the first candle's close but remain below its body.</li>
            <li><strong>Fifth Candle:</strong> A long red candle that gaps down and closes at a new low.</li>
        </ul>
        <h4 className="text-xl font-semibold mt-8 mb-4 border-l-4 border-red-500 pl-4">Pattern Psychology</h4>
        <p>This pattern shows a weak rally attempt that gets decisively crushed. After a strong sell-off, a weak rally begins on a gap up but fails to gain any traction. The three small green candles show the bulls are trying to fight back but lack any real power. The final long red candle shows the bears reasserting their dominance, gapping down and driving the price to new lows, confirming the continuation of the downtrend.</p>
      </>
    )
  },
  {
    id: 'three-line-strike-bearish',
    title: 'Three Line Strike (Bearish)',
    emoji: 'STRIKE',
    content: (
      <>
        <h3 className="text-2xl font-bold mb-2">The Bearish Three Line Strike Pattern</h3>
        <p className="mb-6 text-lg">A rare four-candle bearish reversal pattern that can be deceptive but is quite powerful.</p>
        <h4 className="text-xl font-semibold mt-8 mb-4 border-l-4 border-red-500 pl-4">What The Pattern Looks Like</h4>
        <ul className="space-y-4 mb-6 list-disc pl-5">
            <li><strong>First Three Candles:</strong> Three strong red candles making progressively lower lows (like Three Black Crows).</li>
            <li><strong>Fourth Candle:</strong> A single, massive green candle that opens even lower but then reverses and closes above the high of the very first candle.</li>
        </ul>
        <h4 className="text-xl font-semibold mt-8 mb-4 border-l-4 border-red-500 pl-4">Pattern Psychology</h4>
        <p>This pattern is a classic trap. The first three days build strong bearish momentum and convince many traders to go short. The fourth day opens lower, confirming their bias, but then a massive short-covering rally ensues. The single green candle erases three full days of selling, closing above the starting point. This violent reversal traps all the recent shorts, forcing them to buy back at a loss and fueling a powerful move higher. Despite its appearance after three red candles, it's a bullish reversal pattern, but its bearish variant (starting with three green candles and ending with one red) would be a bearish reversal.</p>
      </>
    )
  },
  {
    id: 'concealing-baby-swallow-bearish',
    title: 'Concealing Baby Swallow (Bearish)',
    emoji: '🐦',
    content: (
      <>
        <h3 className="text-2xl font-bold mb-2">The Bearish Concealing Baby Swallow</h3>
        <p className="mb-6 text-lg">An extremely rare four-candle bearish reversal pattern at the top of an uptrend.</p>
        <h4 className="text-xl font-semibold mt-8 mb-4 border-l-4 border-red-500 pl-4">What The Pattern Looks Like</h4>
        <ul className="space-y-4 mb-6 list-disc pl-5">
            <li><strong>First Two Candles:</strong> Two long green marubozu candles.</li>
            <li><strong>Third Candle:</strong> A green candle that opens with a gap up but then sells off to close inside the body of the second candle (a shooting star shape).</li>
            <li><strong>Fourth Candle:</strong> A long green candle that completely engulfs the third candle and makes a new high.</li>
        </ul>
        <h4 className="text-xl font-semibold mt-8 mb-4 border-l-4 border-red-500 pl-4">Pattern Psychology</h4>
        <p>This pattern represents a final, exhaustive buying climax that fails. The first two days are euphoric. The third day shows the first sign of selling pressure, as the market fails to hold its highs. The fourth day appears to be a massive bullish victory, as it engulfs the prior day's action. However, this is often a "blow-off top." All the remaining buyers have been flushed into the market in this final, dramatic push higher. With no buyers left, the market has nowhere to go but down. This extreme buying climax often marks the exact top.</p>
      </>
    )
  }
];