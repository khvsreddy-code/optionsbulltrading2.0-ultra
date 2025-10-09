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
    content: (
      <>
        <Image 
            src="https://twiojujlmgannxhmrbou.supabase.co/storage/v1/object/public/app%20images/learning/shootingstar_context.png" 
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
            src="https://twiojujlmgannxhmrbou.supabase.co/storage/v1/object/public/app%20images/learning/shootingstar_diagram.png"
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
    content: (
        <>
            <Image 
                src="https://twiojujlmgannxhmrbou.supabase.co/storage/v1/object/public/app%20images/learning/bearishengulfing_context.png" 
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
                src="https://twiojujlmgannxhmrbou.supabase.co/storage/v1/object/public/app%20images/learning/bearishengulfing_diagram.png"
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
    content: (
        <>
            <Image 
                src="https://twiojujlmgannxhmrbou.supabase.co/storage/v1/object/public/app%20images/learning/darkcloud_context.png" 
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
                src="https://twiojujlmgannxhmrbou.supabase.co/storage/v1/object/public/app%20images/learning/darkcloud_diagram.png"
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
    content: (
        <>
            <Image 
                src="https://twiojujlmgannxhmrbou.supabase.co/storage/v1/object/public/app%20images/learning/eveningstar_context.png" 
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
                src="https://twiojujlmgannxhmrbou.supabase.co/storage/v1/object/public/app%20images/learning/eveningstar_diagram.png"
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
    content: (
        <>
            <Image 
                src="https://twiojujlmgannxhmrbou.supabase.co/storage/v1/object/public/app%20images/learning/3blackcrows_context.png" 
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
                src="https://twiojujlmgannxhmrbou.supabase.co/storage/v1/object/public/app%20images/learning/3blackcrows_diagram.png"
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
];
