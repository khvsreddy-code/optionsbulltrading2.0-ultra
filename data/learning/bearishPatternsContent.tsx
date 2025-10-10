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

const BASE_URL = 'https://twiojujlmgannxhmrbou.supabase.co/storage/v1/object/public/candlestick%20patterns/';

const generatePatternUrl = (name: string) => `${BASE_URL}${name.toLowerCase().replace(/ /g, '%20')}.png`;
const generateExampleUrl = (name: string) => `${BASE_URL}${name.toLowerCase().replace(/ /g, '%20')}%20example.png`;

export const bearishPatterns: Pattern[] = [
  {
    id: 'shooting-star',
    title: 'Shooting Star',
    emoji: '☄️',
    image: 'https://twiojujlmgannxhmrbou.supabase.co/storage/v1/object/public/candlestick%20patterns/Shooting-star.jpg',
    content: (
      <>
        <Image 
            src={'https://twiojujlmgannxhmrbou.supabase.co/storage/v1/object/public/candlestick%20patterns/How-to-trade-a-Shooting-Star-pattern%20example.jpg'}
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
            src={'https://twiojujlmgannxhmrbou.supabase.co/storage/v1/object/public/candlestick%20patterns/Shooting-star.jpg'}
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
    image: 'https://twiojujlmgannxhmrbou.supabase.co/storage/v1/object/public/candlestick%20patterns/red-and-black-dark-gamer-sports-youtube-thumbnail-2.webp',
    content: (
        <>
            <Image 
                src={'https://twiojujlmgannxhmrbou.supabase.co/storage/v1/object/public/candlestick%20patterns/bearish-engulfing-trade%20example.jpg'}
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
                src={'https://twiojujlmgannxhmrbou.supabase.co/storage/v1/object/public/candlestick%20patterns/red-and-black-dark-gamer-sports-youtube-thumbnail-2.webp'}
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
    image: 'https://twiojujlmgannxhmrbou.supabase.co/storage/v1/object/public/candlestick%20patterns/4.-Dark-cloud-cover-follow-through-1.png',
    content: (
        <>
            <Image 
                src={'https://twiojujlmgannxhmrbou.supabase.co/storage/v1/object/public/candlestick%20patterns/DarkCloudCover-example.webp'}
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
                src={'https://twiojujlmgannxhmrbou.supabase.co/storage/v1/object/public/candlestick%20patterns/4.-Dark-cloud-cover-follow-through-1.png'}
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
    image: 'https://twiojujlmgannxhmrbou.supabase.co/storage/v1/object/public/candlestick%20patterns/evening%20star.png',
    content: (
        <>
            <Image 
                src={generateExampleUrl('Evening Star')}
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
                src={'https://twiojujlmgannxhmrbou.supabase.co/storage/v1/object/public/candlestick%20patterns/evening%20star.png'}
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
    image: generatePatternUrl('Three Black Crows'),
    content: (
        <>
            <Image 
                src={generateExampleUrl('Three Black Crows')}
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
                src={generatePatternUrl('Three Black Crows')}
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
    image: 'https://twiojujlmgannxhmrbou.supabase.co/storage/v1/object/public/candlestick%20patterns/bearish-harami.jpg',
    content: (
        <>
            <Image 
                src={'https://twiojujlmgannxhmrbou.supabase.co/storage/v1/object/public/candlestick%20patterns/bearish-harami-example.jpg'}
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
                src={'https://twiojujlmgannxhmrbou.supabase.co/storage/v1/object/public/candlestick%20patterns/bearish-harami.jpg'}
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
    image: 'https://twiojujlmgannxhmrbou.supabase.co/storage/v1/object/public/candlestick%20patterns/Three-Inside-down-1024x842.png',
    content: (
        <>
            <Image 
                src={'https://twiojujlmgannxhmrbou.supabase.co/storage/v1/object/public/candlestick%20patterns/Three-inside-down-example.png'}
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
                src={'https://twiojujlmgannxhmrbou.supabase.co/storage/v1/object/public/candlestick%20patterns/Three-Inside-down-1024x842.png'}
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
    image: 'https://twiojujlmgannxhmrbou.supabase.co/storage/v1/object/public/candlestick%20patterns/Tweezer_Top_Candlestick_Pattern_9bc2ccf6a8.webp',
    content: (
        <>
            <Image 
                src={generateExampleUrl('Tweezer Top')}
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
                src={'https://twiojujlmgannxhmrbou.supabase.co/storage/v1/object/public/candlestick%20patterns/Tweezer_Top_Candlestick_Pattern_9bc2ccf6a8.webp'}
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
    image: 'https://twiojujlmgannxhmrbou.supabase.co/storage/v1/object/public/candlestick%20patterns/bearish%20kicker.jpg',
    content: (
        <>
            <Image 
                src={'https://twiojujlmgannxhmrbou.supabase.co/storage/v1/object/public/candlestick%20patterns/bearish%20kicker%20example%20(2).jpg'}
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
                src={'https://twiojujlmgannxhmrbou.supabase.co/storage/v1/object/public/candlestick%20patterns/bearish%20kicker.jpg'}
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
    image: generatePatternUrl('Hanging Man'),
    content: (
      <>
        <Image 
            src={generateExampleUrl('Hanging Man')}
            alt="Hanging Man pattern on a chart" 
            caption="A Hanging Man after an uptrend is a warning of potential weakness."
        />
        <h3 className="text-2xl font-bold mb-2">The Hanging Man Pattern</h3>
        <p className="mb-6 text-lg">The Hanging Man is a single-candle bearish reversal pattern that forms at the top of an uptrend. It looks identical to a bullish Hammer, but its position at the end of an uptrend gives it bearish implications. It serves as a warning that the market's support is becoming precarious.</p>
        <h4 className="text-xl font-semibold mt-8 mb-4 border-l-4 border-red-500 pl-4">What The Pattern Looks Like</h4>
        <ul className="space-y-4 mb-6 list-disc pl-5">
            <li><strong>Small Real Body:</strong> The body is small and located at the top of the trading range. It can be red or green.</li>
            <li><strong>Long Lower Shadow:</strong> A long lower shadow that is at least twice the length of the body.</li>
            <li><strong>Little to No Upper Shadow:</strong> Ideally, there should be no upper wick.</li>
            <li><strong>Position in Trend:</strong> Must occur after a clear uptrend.</li>
        </ul>
        <Diagram 
            src={generatePatternUrl('Hanging Man')}
            alt="Hanging Man pattern diagram"
        />
        <h4 className="text-xl font-semibold mt-8 mb-4 border-l-4 border-red-500 pl-4">Pattern Psychology</h4>
        <p>The Hanging Man reveals a significant increase in selling pressure at a market top. During the day, sellers managed to push the price significantly lower, indicating a substantial shift in power. Although the bulls fought back to push the price back up to close near the open, the crucial insight is the large sell-off that occurred. It suggests that demand is drying up at these high levels and a large number of sellers are emerging. Even though the bulls managed a recovery, the presence of such a deep intra-day sell-off is a major warning that the uptrend is becoming unstable and may be vulnerable to a reversal. Confirmation with a bearish candle on the next day is strongly recommended.</p>
      </>
    ),
  },
  {
    id: 'gravestone-doji',
    title: 'Gravestone Doji',
    emoji: ' T ',
    image: 'https://twiojujlmgannxhmrbou.supabase.co/storage/v1/object/public/candlestick%20patterns/bearish-abandoned-baby-example.jpg',
    content: (
      <>
        <Image 
            src={'https://twiojujlmgannxhmrbou.supabase.co/storage/v1/object/public/candlestick%20patterns/gravestone%20doji%20example.jpeg'}
            alt="Gravestone Doji pattern on a chart" 
            caption="A strong rejection of higher prices, forming a 'gravestone' for the uptrend."
        />
        <h3 className="text-2xl font-bold mb-2">The Gravestone Doji Pattern</h3>
        <p className="mb-6 text-lg">A powerful single-candle bearish reversal pattern, which is the counterpart to the Dragonfly Doji. The open, low, and close are the same, and it has a long upper shadow, signifying a total rejection of higher prices.</p>
        <h4 className="text-xl font-semibold mt-8 mb-4 border-l-4 border-red-500 pl-4">What The Pattern Looks Like</h4>
        <ul className="space-y-4 mb-6 list-disc pl-5">
            <li><strong>No Real Body:</strong> The open and close are at the same price, forming a horizontal line at the bottom of the range.</li>
            <li><strong>Long Upper Shadow:</strong> A very long upper wick, showing a significant intra-day rally.</li>
            <li><strong>No Lower Shadow:</strong> The low of the day is the same as the open and close, forming an inverted 'T' shape.</li>
        </ul>
        <Diagram 
            src={'https://twiojujlmgannxhmrbou.supabase.co/storage/v1/object/public/candlestick%20patterns/bearish-abandoned-baby-example.jpg'}
            alt="Gravestone Doji pattern diagram"
        />
        <h4 className="text-xl font-semibold mt-8 mb-4 border-l-4 border-red-500 pl-4">Pattern Psychology</h4>
        <p>The Gravestone Doji tells a story of a failed rally and a decisive bearish victory. The market opens, and buyers, full of confidence from the uptrend, push the price significantly higher. However, at the session's high, overwhelming selling pressure enters the market. Sellers take complete control and push the price all the way back down to the opening level. This signifies a total rejection of higher prices. The bulls were decisively defeated at the peak, and their inability to hold any of the day's gains is a very bearish sign that the top is in and the uptrend is likely over.</p>
      </>
    ),
  },
  {
    id: 'bearish-counterattack',
    title: 'Bearish Counterattack',
    emoji: '⚔️',
    image: 'https://twiojujlmgannxhmrbou.supabase.co/storage/v1/object/public/candlestick%20patterns/Bearish-counterattack.jpg',
    content: (
      <>
        <Image 
            src={'https://twiojujlmgannxhmrbou.supabase.co/storage/v1/object/public/candlestick%20patterns/Bearish-Counterattack-example.jpg'}
            alt="Bearish Counterattack pattern on a chart" 
            caption="Two candles with the same closing price signal a stalemate at the top."
        />
        <h3 className="text-2xl font-bold mb-2">The Bearish Counterattack Pattern</h3>
        <p className="mb-6 text-lg">A two-candle bearish reversal pattern that occurs in an uptrend, also known as a Bearish Meeting Line. It is the bearish equivalent of the Bullish Counterattack and signals a stall in momentum.</p>
        <h4 className="text-xl font-semibold mt-8 mb-4 border-l-4 border-red-500 pl-4">What The Pattern Looks Like</h4>
        <ul className="space-y-4 mb-6 list-disc pl-5">
            <li><strong>First Candle:</strong> A long green (bullish) candle in an uptrend.</li>
            <li><strong>Second Candle:</strong> A long red (bearish) candle that opens with a significant gap up but sells off to close at or very near the close of the first candle.</li>
        </ul>
        <Diagram 
            src={'https://twiojujlmgannxhmrbou.supabase.co/storage/v1/object/public/candlestick%20patterns/Bearish-counterattack.jpg'}
            alt="Bearish Counterattack pattern diagram"
        />
        <h4 className="text-xl font-semibold mt-8 mb-4 border-l-4 border-red-500 pl-4">Pattern Psychology</h4>
        <p>This pattern shows a stalemate after a period of bullish control. The first day is strongly bullish. The second day opens with euphoria (a large gap up), but sellers step in with force and "counterattack," driving the price all the way back down. While they haven't completely overwhelmed the buyers (as in an Engulfing pattern), they have fought them to a draw, erasing all the day's gains. This inability to sustain the higher prices and the powerful bearish response signals that the uptrend's momentum has likely peaked and a reversal may be imminent.</p>
      </>
    ),
  },
  {
    id: 'bearish-abandoned-baby',
    title: 'Bearish Abandoned Baby',
    emoji: '👶',
    image: 'https://twiojujlmgannxhmrbou.supabase.co/storage/v1/object/public/candlestick%20patterns/Bullish-abandoned-baby-1.jpg',
    content: (
      <>
        <Image 
            src={'https://twiojujlmgannxhmrbou.supabase.co/storage/v1/object/public/candlestick%20patterns/bearish-abandoned-baby-example.jpg'}
            alt="Bearish Abandoned Baby pattern on a chart" 
            caption="A doji gapping above the trend signals a powerful, isolated top."
        />
        <h3 className="text-2xl font-bold mb-2">The Bearish Abandoned Baby Pattern</h3>
        <p className="mb-6 text-lg">An extremely rare but powerful three-candle bearish reversal pattern. It is a more definitive and potent version of the Evening Star pattern, signaling a very likely top.</p>
        <h4 className="text-xl font-semibold mt-8 mb-4 border-l-4 border-red-500 pl-4">What The Pattern Looks Like</h4>
        <ul className="space-y-4 mb-6 list-disc pl-5">
            <li><strong>First Candle:</strong> A long green (bullish) candle continuing the uptrend.</li>
            <li><strong>Second Candle:</strong> A Doji that gaps up, so its shadows do not overlap with the shadows of the first candle.</li>
            <li><strong>Third Candle:</strong> A long red (bearish) candle that gaps down, with no shadow overlap with the Doji.</li>
        </ul>
        <Diagram 
            src={'https://twiojujlmgannxhmrbou.supabase.co/storage/v1/object/public/candlestick%20patterns/Bullish-abandoned-baby-1.jpg'}
            alt="Bearish Abandoned Baby pattern diagram"
        />
        <h4 className="text-xl font-semibold mt-8 mb-4 border-l-4 border-red-500 pl-4">Pattern Psychology</h4>
        <p>This pattern represents peak euphoria followed by a total and violent reversal. The gap up to the Doji shows extreme bullishness and capitulation buying. The Doji itself represents a pause and total indecision at the point of maximum optimism. The subsequent gap down on the third day shows a complete and utter shift in sentiment overnight. The price has "gapped" away from the top, leaving the period of indecision completely isolated. This signifies a violent and decisive reversal, often trapping bulls at the high.</p>
      </>
    ),
  },
  {
    id: 'evening-doji-star',
    title: 'Evening Doji Star',
    emoji: '✨',
    image: 'https://twiojujlmgannxhmrbou.supabase.co/storage/v1/object/public/candlestick%20patterns/Evening-Doji-Star.jpg',
    content: (
      <>
        <Image 
            src={'https://twiojujlmgannxhmrbou.supabase.co/storage/v1/object/public/candlestick%20patterns/Evening-Doji-Star-example%20(2).jpg'}
            alt="Evening Doji Star pattern on a chart" 
            caption="An Evening Star with a Doji in the middle is a stronger reversal signal."
        />
        <h3 className="text-2xl font-bold mb-2">The Evening Doji Star Pattern</h3>
        <p className="mb-6 text-lg">A more potent variation of the standard Evening Star pattern, where the middle candle is a Doji. This signifies maximum indecision at the peak, making the subsequent reversal more reliable.</p>
        <h4 className="text-xl font-semibold mt-8 mb-4 border-l-4 border-red-500 pl-4">What The Pattern Looks Like</h4>
        <ul className="space-y-4 mb-6 list-disc pl-5">
            <li><strong>First Candle:</strong> A long green (bullish) candle in an uptrend.</li>
            <li><strong>Second Candle:</strong> A Doji that gaps up from the first candle.</li>
            <li><strong>Third Candle:</strong> A long red (bearish) candle that closes well into the body of the first candle.</li>
        </ul>
        <Diagram 
            src={'https://twiojujlmgannxhmrbou.supabase.co/storage/v1/object/public/candlestick%20patterns/Evening-Doji-Star.jpg'}
            alt="Evening Doji Star pattern diagram"
        />
        <h4 className="text-xl font-semibold mt-8 mb-4 border-l-4 border-red-500 pl-4">Pattern Psychology</h4>
        <p>The Doji in the middle of this pattern makes the reversal signal stronger than a standard Evening Star. A Doji represents perfect equilibrium and maximum indecision. After a strong uptrend, this complete stall in buying pressure is more significant than a spinning top. When the third candle confirms a bearish move away from this point of perfect balance, it signals a more decisive and reliable reversal, as the market has resolved its uncertainty to the downside.</p>
      </>
    ),
  },
   {
    id: 'upside-gap-two-crows',
    title: 'Upside Gap Two Crows',
    emoji: '🐦',
    image: 'https://twiojujlmgannxhmrbou.supabase.co/storage/v1/object/public/candlestick%20patterns/Upside-Gap-Two-Crows-Pattern.png',
    content: (
      <>
        <Image 
            src={'https://twiojujlmgannxhmrbou.supabase.co/storage/v1/object/public/candlestick%20patterns/UpsideGapTwoCrows%20example.webp'}
            alt="Upside Gap Two Crows pattern on a chart" 
            caption="Two bearish candles after a gap up show a failure to continue the rally."
        />
        <h3 className="text-2xl font-bold mb-2">The Upside Gap Two Crows Pattern</h3>
        <p className="mb-6 text-lg">A rare three-candle bearish reversal pattern that occurs during an uptrend and signals a failure of the rally to continue, despite a gap up.</p>
        <h4 className="text-xl font-semibold mt-8 mb-4 border-l-4 border-red-500 pl-4">What The Pattern Looks Like</h4>
        <ul className="space-y-4 mb-6 list-disc pl-5">
            <li><strong>First Candle:</strong> A long green (bullish) candle continuing the uptrend.</li>
            <li><strong>Second Candle:</strong> A small red (bearish) candle that opens with a gap up from the first candle.</li>
            <li><strong>Third Candle:</strong> Another red candle that opens higher than the second candle's open but then closes lower, engulfing the second candle's body but remaining above the first day's close.</li>
        </ul>
        <Diagram 
            src={'https://twiojujlmgannxhmrbou.supabase.co/storage/v1/object/public/candlestick%20patterns/Upside-Gap-Two-Crows-Pattern.png'}
            alt="Upside Gap Two Crows pattern diagram"
        />
        <h4 className="text-xl font-semibold mt-8 mb-4 border-l-4 border-red-500 pl-4">Pattern Psychology</h4>
        <p>This pattern shows a significant struggle at the top. The first day is strongly bullish. The second day gaps up, showing continued enthusiasm, but fails to continue higher and closes lower. The third day attempts another rally but fails again, closing even lower than the second day. The inability of the market to make any upward progress after the initial powerful gap is a significant sign of weakness. The "two crows" are perched at the top, looking down, signaling that the rally has exhausted itself and sellers are quietly taking control at the highs.</p>
      </>
    ),
  },
  {
    id: 'two-black-gapping',
    title: 'Two Black Gapping',
    emoji: '⚫⚫',
    image: generatePatternUrl('Two Black Gapping'),
    content: (
      <>
        <Image 
            src={generateExampleUrl('Two Black Gapping')}
            alt="Two Black Gapping pattern on a chart" 
            caption="The pattern confirms the continuation of a downtrend with strong bearish momentum."
        />
        <h3 className="text-2xl font-bold mb-2">The Two Black Gapping Pattern</h3>
        <p className="mb-6 text-lg">A bearish continuation pattern that occurs during a downtrend, signaling that the trend is likely to continue lower.</p>
        <h4 className="text-xl font-semibold mt-8 mb-4 border-l-4 border-red-500 pl-4">What The Pattern Looks Like</h4>
        <ul className="space-y-4 mb-6 list-disc pl-5">
            <li><strong>Context:</strong> A clear downtrend must be in place.</li>
            <li><strong>First Candle:</strong> A red (bearish) candle gaps down from the previous day.</li>
            <li><strong>Second Candle:</strong> Another red candle that opens inside the body of the first candle but closes lower, making a new low.</li>
        </ul>
        <Diagram 
            src={generatePatternUrl('Two Black Gapping')}
            alt="Two Black Gapping pattern diagram"
        />
        <h4 className="text-xl font-semibold mt-8 mb-4 border-l-4 border-red-500 pl-4">Pattern Psychology</h4>
        <p className="mb-4">The pattern tells a clear story of bearish power and bullish weakness:</p>
        <h5 className="text-lg font-semibold mt-4 mb-2">The Power of the Gap</h5>
        <p className="mb-4">The initial gap down is a powerful statement of intent from the sellers. It shows such overwhelming bearish sentiment (perhaps due to overnight news) that the market opens significantly lower than where it previously traded. This move traps any remaining bulls and reinforces the downtrend.</p>
        <h5 className="text-lg font-semibold mt-4 mb-2">A Feeble Rally Attempt</h5>
        <p className="mb-4">On the second day, the price opens slightly higher, inside the range of the first day's body. This represents a brief moment of hope for the bulls or some minor profit-taking from the bears. This is a critical test for the market.</p>
        <h5 className="text-lg font-semibold mt-4 mb-2">Bearish Confirmation</h5>
        <p className="mb-4">The buyers' attempt is quickly and decisively crushed. Sellers re-enter the market with force, not only erasing the small opening gain but pushing the price to a new low. This failure of the bulls to generate any meaningful upward momentum, even for a short period, is a very bearish sign. It confirms that sellers are still in complete control and are using any minor strength as an opportunity to sell more aggressively. The pattern signals that the downtrend has strong momentum and is very likely to continue.</p>
      </>
    ),
  },
  {
    id: 'falling-three-methods',
    title: 'Falling Three Methods',
    emoji: '📉',
    image: 'https://twiojujlmgannxhmrbou.supabase.co/storage/v1/object/public/candlestick%20patterns/Three-Falling-Method-Candlestick-Pattern-1024x1024.png',
    content: (
      <>
        <Image 
            src={'https://twiojujlmgannxhmrbou.supabase.co/storage/v1/object/public/candlestick%20patterns/Three-Falling-Method-Candlestick-Pattern-example-1024x756.png'}
            alt="Falling Three Methods pattern on a chart" 
            caption="A brief pause within a downtrend confirms the trend's strength when it resumes."
        />
        <h3 className="text-2xl font-bold mb-2">The Falling Three Methods Pattern</h3>
        <p className="mb-6 text-lg">A five-candle bearish continuation pattern that signals a pause or consolidation in a downtrend before it resumes. It is the bearish counterpart to the Rising Three Methods.</p>
        <h4 className="text-xl font-semibold mt-8 mb-4 border-l-4 border-red-500 pl-4">What The Pattern Looks Like</h4>
        <ul className="space-y-4 mb-6 list-disc pl-5">
            <li><strong>First Candle:</strong> A long red (bearish) candle that establishes the downtrend.</li>
            <li><strong>Next Three Candles:</strong> A series of three small green candles that trade within the range of the first candle's body, representing a weak counter-rally.</li>
            <li><strong>Fifth Candle:</strong> A long red candle that closes below the close of the first candle, making a new low and resuming the trend.</li>
        </ul>
        <Diagram 
            src={'https://twiojujlmgannxhmrbou.supabase.co/storage/v1/object/public/candlestick%20patterns/Three-Falling-Method-Candlestick-Pattern-1024x1024.png'}
            alt="Falling Three Methods pattern diagram"
        />
        <h4 className="text-xl font-semibold mt-8 mb-4 border-l-4 border-red-500 pl-4">Pattern Psychology</h4>
        <p>This pattern shows a healthy and sustainable downtrend. The initial long red candle establishes bearish control. The three small green candles represent a weak counter-trend rally or short-covering. Crucially, this rally is contained and unable to break above the high of the first powerful red candle, showing that sellers are simply waiting for a better price to sell again. The final long red candle shows that the bears have reasserted control after the brief pause, breaking to a new low and signaling the confident continuation of the primary downtrend.</p>
      </>
    ),
  },
  {
    id: 'deliberation-pattern',
    title: 'Deliberation Pattern',
    emoji: '🤔',
    image: 'https://twiojujlmgannxhmrbou.supabase.co/storage/v1/object/public/candlestick%20patterns/deliberation%20pattern.jpg',
    content: (
      <>
        <Image 
            src={'https://twiojujlmgannxhmrbou.supabase.co/storage/v1/object/public/candlestick%20patterns/deliberation%20pattern%20example.webp'}
            alt="Deliberation pattern on a chart" 
            caption="A stall in momentum after two strong green candles signals bullish exhaustion."
        />
        <h3 className="text-2xl font-bold mb-2">The Deliberation Pattern</h3>
        <p className="mb-6 text-lg">A three-candle pattern that can signal a potential bearish reversal or a significant stall in an uptrend. It is also known as a Stalled Pattern and shows buyer exhaustion.</p>
        <h4 className="text-xl font-semibold mt-8 mb-4 border-l-4 border-red-500 pl-4">What The Pattern Looks Like</h4>
        <ul className="space-y-4 mb-6 list-disc pl-5">
            <li><strong>First Two Candles:</strong> Two long green (bullish) candles continuing an uptrend.</li>
            <li><strong>Third Candle:</strong> A small-bodied candle (spinning top or doji) that gaps up on the open but fails to make significant upward progress and closes near its open.</li>
        </ul>
        <Diagram 
            src={'https://twiojujlmgannxhmrbou.supabase.co/storage/v1/object/public/candlestick%20patterns/deliberation%20pattern.jpg'}
            alt="Deliberation pattern diagram"
        />
        <h4 className="text-xl font-semibold mt-8 mb-4 border-l-4 border-red-500 pl-4">Pattern Psychology</h4>
        <p>The first two days show strong bullish momentum and confidence. The third day gaps up, indicating continued enthusiasm at the open, but the small body shows that buyers were unable to maintain control and push the price higher throughout the day. The market is "deliberating" or hesitating at these new highs. This loss of momentum after a strong run-up is a clear warning sign that the trend is exhausted and may be vulnerable to a reversal. It's a sign of indecision that requires bearish confirmation on the next candle to be actionable.</p>
      </>
    ),
  },
  {
    id: 'advance-block',
    title: 'Advance Block',
    emoji: '🧱',
    image: 'https://twiojujlmgannxhmrbou.supabase.co/storage/v1/object/public/candlestick%20patterns/advance-block-candle-1.png',
    content: (
      <>
        <Image 
            src={'https://twiojujlmgannxhmrbou.supabase.co/storage/v1/object/public/candlestick%20patterns/AdvanceBlock-example.webp'}
            alt="Advance Block pattern on a chart" 
            caption="Three weakening green candles with long upper wicks show a struggling uptrend."
        />
        <h3 className="text-2xl font-bold mb-2">The Advance Block Pattern</h3>
        <p className="mb-6 text-lg">A three-candle bearish reversal pattern that shows a slow, struggling deterioration of an uptrend's momentum, signaling buyer exhaustion.</p>
        <h4 className="text-xl font-semibold mt-8 mb-4 border-l-4 border-red-500 pl-4">What The Pattern Looks Like</h4>
        <ul className="space-y-4 mb-6 list-disc pl-5">
            <li><strong>Three Green Candles:</strong> The pattern consists of three consecutive green (bullish) candles in an uptrend.</li>
            <li><strong>Worsening Condition:</strong> Each candle makes a new high, but the body of each candle is progressively smaller than the last, and the upper shadows of the second and third candles are progressively longer.</li>
        </ul>
        <Diagram 
            src={'https://twiojujlmgannxhmrbou.supabase.co/storage/v1/object/public/candlestick%20patterns/advance-block-candle-1.png'}
            alt="Advance Block pattern diagram"
        />
        <h4 className="text-xl font-semibold mt-8 mb-4 border-l-4 border-red-500 pl-4">Pattern Psychology</h4>
        <p>The Advance Block shows an uptrend that is running out of steam. While the price is still managing to inch higher each day, the effort required is increasing, and the results are diminishing. The smaller bodies and longer upper wicks show that sellers are becoming more active at higher levels and are successfully pushing the price down from its highs each day. The advance is being "blocked" by this emerging selling pressure. This visible struggle to make new highs is a clear sign of bullish exhaustion and often precedes a significant reversal to the downside.</p>
      </>
    ),
  },
  {
    id: 'breakaway-bearish',
    title: 'Bearish Breakaway',
    emoji: '📉',
    image: 'https://twiojujlmgannxhmrbou.supabase.co/storage/v1/object/public/candlestick%20patterns/Bearish-Breakaway-1024x1024.png',
    content: (
      <>
        <Image 
            src={'https://twiojujlmgannxhmrbou.supabase.co/storage/v1/object/public/candlestick%20patterns/Bearish-Breakaway-example-1024x563.png'}
            alt="Bearish Breakaway pattern on a chart" 
            caption="A final red candle closes a gap from earlier in the rally, signaling a reversal."
        />
        <h3 className="text-2xl font-bold mb-2">The Bearish Breakaway Pattern</h3>
        <p className="mb-6 text-lg">A five-candle bearish reversal pattern that signals a potential top after a strong uptrend. It represents a final gasp of bullish momentum that ultimately fails.</p>
        <h4 className="text-xl font-semibold mt-8 mb-4 border-l-4 border-red-500 pl-4">What The Pattern Looks Like</h4>
        <ul className="space-y-4 mb-6 list-disc pl-5">
            <li><strong>First Candle:</strong> A long green (bullish) candle continuing the uptrend.</li>
            <li><strong>Second Candle:</strong> A green candle that gaps up from the first.</li>
            <li><strong>Third and Fourth Candles:</strong> Two more candles that continue the upward move, which can be green or red, showing a stall in momentum.</li>
            <li><strong>Fifth Candle:</strong> A long red candle that opens and then sells off, closing inside the gap that was created between the first and second candles.</li>
        </ul>
        <Diagram 
            src={'https://twiojujlmgannxhmrbou.supabase.co/storage/v1/object/public/candlestick%20patterns/Bearish-Breakaway-1024x1024.png'}
            alt="Bearish Breakaway pattern diagram"
        />
        <h4 className="text-xl font-semibold mt-8 mb-4 border-l-4 border-red-500 pl-4">Pattern Psychology</h4>
        <p>The pattern begins with a strong, euphoric rally culminating in a gap up. This shows peak bullish sentiment. However, the follow-through over the next two days is weak and indecisive. The final red candle is the key. Its powerful downward move that "breaks away" from the highs and closes the initial gap signals a complete reversal of the prior bullish sentiment. The gap acted as a support level, and its failure is a strong technical signal that sellers have taken decisive control and the uptrend is over.</p>
      </>
    ),
  },
  // --- NEWLY ADDED 20 PATTERNS ---
  {
    id: 'bearish-marubozu',
    title: 'Bearish Marubozu',
    emoji: '🟥',
    image: 'https://twiojujlmgannxhmrbou.supabase.co/storage/v1/object/public/candlestick%20patterns/Bearish-Marubozu.jpg',
    content: (
      <>
        <Image 
            src={'https://twiojujlmgannxhmrbou.supabase.co/storage/v1/object/public/candlestick%20patterns/Bearish-Marubozu-example.jpg'}
            alt="Bearish Marubozu on a chart" 
            caption="A red candle with no wicks shows complete bearish control for the session."
        />
        <h3 className="text-2xl font-bold mb-2">The Bearish Marubozu Pattern</h3>
        <p className="mb-6 text-lg">A single-candle pattern indicating extreme bearish sentiment. It is the opposite of the Bullish Marubozu and is a strong sign of selling pressure.</p>
        <h4 className="text-xl font-semibold mt-8 mb-4 border-l-4 border-red-500 pl-4">What The Pattern Looks Like</h4>
        <ul className="space-y-4 mb-6 list-disc pl-5">
            <li><strong>Long Red Body:</strong> It consists of a single long red candle with no upper or lower shadows.</li>
            <li><strong>Open and High are Equal:</strong> The opening price is the high of the day.</li>
            <li><strong>Close and Low are Equal:</strong> The closing price is the low of the day.</li>
        </ul>
        <Diagram 
            src={'https://twiojujlmgannxhmrbou.supabase.co/storage/v1/object/public/candlestick%20patterns/Bearish-Marubozu.jpg'}
            alt="Bearish Marubozu pattern diagram"
        />
        <h4 className="text-xl font-semibold mt-8 mb-4 border-l-4 border-red-500 pl-4">Pattern Psychology</h4>
        <p>A Bearish Marubozu demonstrates absolute control by sellers from open to close. The price never trades above the open, indicating that there was no buying interest from the start. Throughout the session, sellers consistently pushed the price lower, and buyers were unable to push the price up from its low at any point before the close. This signifies intense and unwavering selling pressure throughout the entire session. It can mark the start of a strong bearish move or act as a powerful continuation signal within a downtrend.</p>
      </>
    )
  },
  {
    id: 'falling-window',
    title: 'Falling Window (Gap Down)',
    emoji: '↘️',
    image: 'https://twiojujlmgannxhmrbou.supabase.co/storage/v1/object/public/candlestick%20patterns/falling-window.jpg',
    content: (
      <>
        <Image 
            src={'https://twiojujlmgannxhmrbou.supabase.co/storage/v1/object/public/candlestick%20patterns/falling-window-example.jpg'}
            alt="Falling Window on a chart" 
            caption="A gap between two candles acts as a strong resistance zone."
        />
        <h3 className="text-2xl font-bold mb-2">The Falling Window (Gap Down) Pattern</h3>
        <p className="mb-6 text-lg">A two-candle pattern where the high of the second candle is below the low of the first candle, creating a "window" or gap. This is a strong bearish continuation signal, indicating a surge in selling momentum.</p>
        <h4 className="text-xl font-semibold mt-8 mb-4 border-l-4 border-red-500 pl-4">What The Pattern Looks Like</h4>
        <ul className="space-y-4 mb-6 list-disc pl-5">
            <li><strong>Gap:</strong> A clear space exists between the low of the first candle and the high of the second candle.</li>
            <li><strong>Continuation:</strong> The second candle continues to trade lower, away from the gap, confirming the bearish sentiment.</li>
        </ul>
        <Diagram 
            src={'https://twiojujlmgannxhmrbou.supabase.co/storage/v1/object/public/candlestick%20patterns/falling-window.jpg'}
            alt="Falling Window pattern diagram"
        />
        <h4 className="text-xl font-semibold mt-8 mb-4 border-l-4 border-red-500 pl-4">Pattern Psychology</h4>
        <p>A Falling Window signifies a powerful surge in selling interest, often triggered by negative overnight news. The market is so bearish that it opens at a price significantly lower than the previous day's entire trading range. The gap itself now acts as a strong psychological and technical resistance zone; if the price were to rally back and "fill the gap," the bearish signal would be weakened. A gap that remains unfilled is a sign of a very strong and healthy downtrend.</p>
      </>
    )
  },
  {
    id: 'bearish-belt-hold',
    title: 'Bearish Belt Hold',
    emoji: '🥋',
    image: generatePatternUrl('Bearish Belt Hold'),
    content: (
      <>
        <Image 
            src={'https://twiojujlmgannxhmrbou.supabase.co/storage/v1/object/public/candlestick%20patterns/BeltHoldLine-352%20example.webp'}
            alt="Bearish Belt Hold on a chart" 
            caption="Opening at the high and selling off all day shows a powerful bearish reversal."
        />
        <h3 className="text-2xl font-bold mb-2">The Bearish Belt Hold Pattern</h3>
        <p className="mb-6 text-lg">A single-candle bearish reversal pattern. It is essentially a red Opening Marubozu that opens with a significant gap up at the top of an uptrend.</p>
        <h4 className="text-xl font-semibold mt-8 mb-4 border-l-4 border-red-500 pl-4">What The Pattern Looks Like</h4>
        <ul className="space-y-4 mb-6 list-disc pl-5">
            <li><strong>Context:</strong> Occurs after an uptrend.</li>
            <li><strong>Formation:</strong> The candle opens at its high for the day (no upper shadow) and then sells off for the rest of the session, forming a long red body and closing near its low.</li>
        </ul>
        <Diagram 
            src={generatePatternUrl('Bearish Belt Hold')}
            alt="Bearish Belt Hold pattern diagram"
        />
        <h4 className="text-xl font-semibold mt-8 mb-4 border-l-4 border-red-500 pl-4">Pattern Psychology</h4>
        <p>The pattern shows a dramatic reversal of sentiment. The market opens with extreme bullishness, often gapping up to a new high. However, from the very first trade, sellers step in with overwhelming force. They "hold the belt" at the high and do not let the price rise any further, driving it down for the entire session. This complete rejection of the opening high and the sustained selling pressure signifies a powerful shift in control from bulls to bears, often trapping overly optimistic buyers who bought at the open.</p>
      </>
    )
  },
  {
    id: 'bearish-separating-lines',
    title: 'Bearish Separating Lines',
    emoji: 'LINES',
    image: 'https://twiojujlmgannxhmrbou.supabase.co/storage/v1/object/public/candlestick%20patterns/separating-line-pattern-1-1024x648.png',
    content: (
      <>
        <Image 
            src={'https://twiojujlmgannxhmrbou.supabase.co/storage/v1/object/public/candlestick%20patterns/SeparatingLines-352%20bearish%20example.webp'}
            alt="Bearish Separating Lines on a chart" 
            caption="A red marubozu opens at the same level as a prior green candle, negating the rally."
        />
        <h3 className="text-2xl font-bold mb-2">The Bearish Separating Lines Pattern</h3>
        <p className="mb-6 text-lg">A two-candle bearish continuation pattern found in a downtrend. It shows a brief relief rally being decisively rejected.</p>
        <h4 className="text-xl font-semibold mt-8 mb-4 border-l-4 border-red-500 pl-4">What The Pattern Looks Like</h4>
        <ul className="space-y-4 mb-6 list-disc pl-5">
            <li><strong>First Candle:</strong> A long green (bullish) candle against the primary downtrend (a relief rally).</li>
            <li><strong>Second Candle:</strong> A long red (bearish) Marubozu that opens at the same price as the first candle's open.</li>
        </ul>
        <Diagram 
            src={'https://twiojujlmgannxhmrbou.supabase.co/storage/v1/object/public/candlestick%20patterns/separating-line-pattern-1-1024x648.png'}
            alt="Bearish Separating Lines pattern diagram"
        />
        <h4 className="text-xl font-semibold mt-8 mb-4 border-l-4 border-red-500 pl-4">Pattern Psychology</h4>
        <p>The first green candle represents a brief relief rally or short covering in a downtrend. The second day, however, opens with a powerful gap down to the same opening level as the prior day, completely erasing the previous day's gains in an instant. The sellers then maintain complete control for the entire session, closing at the low. This powerful rejection of the rally shows that it was insignificant and the dominant bearish trend has forcefully reasserted itself.</p>
      </>
    )
  },
  {
    id: 'bearish-meeting-line',
    title: 'Bearish Meeting Line',
    emoji: '🤝',
    image: 'https://twiojujlmgannxhmrbou.supabase.co/storage/v1/object/public/candlestick%20patterns/meeting%20tines.png',
    content: (
      <>
        <Image 
            src={generateExampleUrl('Bearish Meeting Line')}
            alt="Bearish Meeting Line on a chart" 
            caption="A red candle sells off to 'meet' the prior day's close, forming a resistance level."
        />
        <h3 className="text-2xl font-bold mb-2">The Bearish Meeting Line Pattern</h3>
        <p className="mb-6 text-lg">A two-candle bearish reversal pattern, similar to the Dark Cloud Cover but slightly weaker. It occurs at the top of an uptrend and signals a stalemate.</p>
        <h4 className="text-xl font-semibold mt-8 mb-4 border-l-4 border-red-500 pl-4">What The Pattern Looks Like</h4>
        <ul className="space-y-4 mb-6 list-disc pl-5">
            <li><strong>First Candle:</strong> A long green (bullish) candle.</li>
            <li><strong>Second Candle:</strong> A long red (bearish) candle that opens with a gap up but sells off to close at the same price as the first candle's close.</li>
        </ul>
        <Diagram 
            src={'https://twiojujlmgannxhmrbou.supabase.co/storage/v1/object/public/candlestick%20patterns/meeting%20tines.png'}
            alt="Bearish Meeting Line pattern diagram"
        />
        <h4 className="text-xl font-semibold mt-8 mb-4 border-l-4 border-red-500 pl-4">Pattern Psychology</h4>
        <p>This pattern signifies a stalemate and the formation of a potential resistance level. The first day is strongly bullish. The second day opens with euphoria (gap up), but sellers step in and manage to drive the price all the way back down to the previous day's closing level. While they haven't managed to push into the prior day's body (like in a Dark Cloud Cover), they have successfully defended the closing price level. This shows that buying pressure has been fully absorbed at this level, indicating a potential top has formed and the bulls have lost control.</p>
      </>
    )
  },
  {
    id: 'bearish-tri-star',
    title: 'Bearish Tri-Star',
    emoji: '✨✨✨',
    image: 'https://twiojujlmgannxhmrbou.supabase.co/storage/v1/object/public/candlestick%20patterns/Bearish-Tri-Star-884x1024.png',
    content: (
      <>
        <Image 
            src={'https://twiojujlmgannxhmrbou.supabase.co/storage/v1/object/public/candlestick%20patterns/TriStar-352%20example.webp'}
            alt="Bearish Tri-Star on a chart" 
            caption="Three consecutive dojis at a high point signal extreme indecision and reversal."
        />
        <h3 className="text-2xl font-bold mb-2">The Bearish Tri-Star Pattern</h3>
        <p className="mb-6 text-lg">A rare but very significant three-candle bearish reversal pattern formed by three consecutive Doji candles at the top of an uptrend. It signals extreme market indecision and buyer exhaustion.</p>
        <h4 className="text-xl font-semibold mt-8 mb-4 border-l-4 border-red-500 pl-4">What The Pattern Looks Like</h4>
        <ul className="space-y-4 mb-6 list-disc pl-5">
            <li><strong>Three Dojis:</strong> The pattern consists of three Doji candles in a row.</li>
            <li><strong>Middle Doji:</strong> The second Doji gaps up above the first and third, forming the peak of the pattern.</li>
        </ul>
        <Diagram 
            src={'https://twiojujlmgannxhmrbou.supabase.co/storage/v1/object/public/candlestick%20patterns/Bearish-Tri-Star-884x1024.png'}
            alt="Bearish Tri-Star pattern diagram"
        />
        <h4 className="text-xl font-semibold mt-8 mb-4 border-l-4 border-red-500 pl-4">Pattern Psychology</h4>
        <p>This pattern represents extreme market indecision and the exhaustion of the uptrend. After a rally, the market completely stalls for three consecutive sessions. The gap up on the second Doji shows a final bout of euphoria, but it is met with immediate indecision. The third Doji gapping back down shows the bulls are completely exhausted and unable to maintain the higher prices. This prolonged period of perfect equilibrium at a market high is a powerful sign that the trend has run its course and a reversal is imminent.</p>
      </>
    )
  },
  {
    id: 'bearish-doji-star',
    title: 'Bearish Doji Star',
    emoji: '🌟',
    image: generatePatternUrl('Bearish Doji Star'),
    content: (
      <>
        <Image 
            src={generateExampleUrl('Bearish Doji Star')}
            alt="Bearish Doji Star on a chart" 
            caption="A doji gapping up from a green candle signals a stall in bullish momentum."
        />
        <h3 className="text-2xl font-bold mb-2">The Bearish Doji Star Pattern</h3>
        <p className="mb-6 text-lg">A two-candle bearish reversal pattern that is a precursor to the Evening Doji Star. It signals a potential top with strong indecision, warning that the uptrend's momentum has faded.</p>
        <h4 className="text-xl font-semibold mt-8 mb-4 border-l-4 border-red-500 pl-4">What The Pattern Looks Like</h4>
        <ul className="space-y-4 mb-6 list-disc pl-5">
            <li><strong>First Candle:</strong> A long green (bullish) candle in an uptrend.</li>
            <li><strong>Second Candle:</strong> A Doji that opens with a gap up from the body of the first candle.</li>
        </ul>
        <Diagram 
            src={generatePatternUrl('Bearish Doji Star')}
            alt="Bearish Doji Star pattern diagram"
        />
        <h4 className="text-xl font-semibold mt-8 mb-4 border-l-4 border-red-500 pl-4">Pattern Psychology</h4>
        <p>The first candle shows that bulls are in firm control. The second day's gap up confirms this bullish sentiment. However, the market then goes nowhere, closing at the same price it opened. This Doji represents a moment of perfect indecision and equilibrium. The powerful buying pressure has suddenly and completely stalled. This halt in momentum is a significant warning to the bulls that their control is slipping and a bearish reversal is possible, pending confirmation on the next candle (which would complete an Evening Doji Star pattern).</p>
      </>
    )
  },
  {
    id: 'tasuki-gap-down',
    title: 'Downside Tasuki Gap',
    emoji: 'GAP',
    image: 'https://twiojujlmgannxhmrbou.supabase.co/storage/v1/object/public/candlestick%20patterns/Downside-Tasuki-1024x1024.png',
    content: (
      <>
        <Image 
            src={'https://twiojujlmgannxhmrbou.supabase.co/storage/v1/object/public/candlestick%20patterns/Downside-Tasuki-Example-1024x756.png'}
            alt="Downside Tasuki Gap on a chart" 
            caption="A minor rally into a gap that holds as resistance is a bearish continuation signal."
        />
        <h3 className="text-2xl font-bold mb-2">The Downside Tasuki Gap Pattern</h3>
        <p className="mb-6 text-lg">A three-candle bearish continuation pattern that occurs within a downtrend. It indicates a pause or minor relief rally before the trend resumes.</p>
        <h4 className="text-xl font-semibold mt-8 mb-4 border-l-4 border-red-500 pl-4">What The Pattern Looks Like</h4>
        <ul className="space-y-4 mb-6 list-disc pl-5">
            <li><strong>First Candle:</strong> A long red candle in a downtrend.</li>
            <li><strong>Second Candle:</strong> Another red candle that gaps down from the first, creating a Falling Window.</li>
            <li><strong>Third Candle:</strong> A green candle that opens inside the body of the second candle and closes inside the gap, but does not fully close it.</li>
        </ul>
        <Diagram 
            src={'https://twiojujlmgannxhmrbou.supabase.co/storage/v1/object/public/candlestick%20patterns/Downside-Tasuki-1024x1024.png'}
            alt="Downside Tasuki Gap pattern diagram"
        />
        <h4 className="text-xl font-semibold mt-8 mb-4 border-l-4 border-red-500 pl-4">Pattern Psychology</h4>
        <p>The gap down between the first two candles shows strong bearish momentum and conviction. The third green candle represents a brief relief rally or short-covering. However, the buying pressure is not strong enough to close the gap created by the panicked sellers. The fact that the gap holds as a resistance level confirms the underlying strength of the downtrend. This brief pause is seen as a shorting opportunity by trend-followers before the trend is expected to resume its downward course.</p>
      </>
    )
  },
  {
    id: 'side-by-side-white-lines-bearish',
    title: 'Side-by-Side White Lines (Bearish)',
    emoji: '||',
    image: 'https://twiojujlmgannxhmrbou.supabase.co/storage/v1/object/public/candlestick%20patterns/Bearish-side-by-side-white-lines.png',
    content: (
      <>
        <Image 
            src={'https://twiojujlmgannxhmrbou.supabase.co/storage/v1/object/public/candlestick%20patterns/bearish%20side%20by%20side%20example.png'}
            alt="Side-by-Side White Lines on a chart" 
            caption="Two weak green candles after a gap down show a lack of buying power."
        />
        <h3 className="text-2xl font-bold mb-2">The Bearish Side-by-Side White Lines Pattern</h3>
        <p className="mb-6 text-lg">A rare but reliable three-candle bearish continuation pattern that shows a failure to rally after a gap down in a downtrend.</p>
        <h4 className="text-xl font-semibold mt-8 mb-4 border-l-4 border-red-500 pl-4">What The Pattern Looks Like</h4>
        <ul className="space-y-4 mb-6 list-disc pl-5">
            <li><strong>First Candle:</strong> A red candle in a downtrend.</li>
            <li><strong>Second Candle:</strong> A green candle that gaps down from the first.</li>
            <li><strong>Third Candle:</strong> Another green candle that opens at or near the open of the second candle and closes at or near its close. The two green candles appear "side-by-side."</li>
        </ul>
        <Diagram 
            src={'https://twiojujlmgannxhmrbou.supabase.co/storage/v1/object/public/candlestick%20patterns/Bearish-side-by-side-white-lines.png'}
            alt="Side-by-Side White Lines pattern diagram"
        />
        <h4 className="text-xl font-semibold mt-8 mb-4 border-l-4 border-red-500 pl-4">Pattern Psychology</h4>
        <p>The initial gap down shows strong bearish sentiment. The following two days show attempted rallies, but they are extremely weak and contained within the gap down range. The inability of buyers to push the price back up to fill the gap, despite two full sessions of trying, demonstrates their extreme weakness. This consolidation at the lows after a gap down is a strong signal that sellers are still in complete control and are likely to push the price even lower.</p>
      </>
    )
  },
  {
    id: 'dumpling-top',
    title: 'Dumpling Top',
    emoji: '🥟',
    image: 'https://twiojujlmgannxhmrbou.supabase.co/storage/v1/object/public/candlestick%20patterns/dumpling%20tops%20pattern.jpg',
    content: (
      <>
        <Image 
            src={generateExampleUrl('Dumpling Top')}
            alt="Dumpling Top on a chart" 
            caption="A rounding top followed by a gap down signals a powerful bearish breakdown."
        />
        <h3 className="text-2xl font-bold mb-2">The Dumpling Top Pattern</h3>
        <p className="mb-6 text-lg">A multi-candle bearish reversal pattern that is a variation of the classic "Rounding Top." It signifies a slow, gradual shift from an uptrend to a downtrend, culminating in a decisive breakdown.</p>
        <h4 className="text-xl font-semibold mt-8 mb-4 border-l-4 border-red-500 pl-4">What The Pattern Looks Like</h4>
        <ul className="space-y-4 mb-6 list-disc pl-5">
            <li><strong>Uptrend:</strong> A preceding uptrend leads into the pattern.</li>
            <li><strong>Rounding Top:</strong> A series of small-bodied candles form an inverted saucer or "n" shape over a prolonged period, showing a gradual topping process.</li>
            <li><strong>Breakdown:</strong> The pattern is confirmed by a final candle that gaps down and breaks below the support level formed by the rim of the "top."</li>
        </ul>
        <Diagram 
            src={'https://twiojujlmgannxhmrbou.supabase.co/storage/v1/object/public/candlestick%20patterns/dumpling%20tops%20pattern.jpg'}
            alt="Dumpling Top pattern diagram"
        />
        <h4 className="text-xl font-semibold mt-8 mb-4 border-l-4 border-red-500 pl-4">Pattern Psychology</h4>
        <p>The Dumpling Top illustrates a slow death of bullish sentiment and a quiet distribution phase by sellers. The initial uptrend gives way to a period of consolidation where buying pressure dries up, but selling pressure has not yet taken over. The candles become smaller and the price action flattens out. The final gap down is the confirmation. Sellers have finally absorbed all the buyers and now have enough control to force the price significantly lower, confirming the new downtrend has begun with conviction.</p>
      </>
    )
  },
  {
    id: 'tower-top',
    title: 'Tower Top',
    emoji: '🗼',
    image: 'https://twiojujlmgannxhmrbou.supabase.co/storage/v1/object/public/candlestick%20patterns/tower%20top.webp',
    content: (
      <>
        <Image 
            src={generateExampleUrl('Tower Top')}
            alt="Tower Top on a chart" 
            caption="A sharp rise followed by consolidation and a sharp fall forms a 'tower' reversal."
        />
        <h3 className="text-2xl font-bold mb-2">The Tower Top Pattern</h3>
        <p className="mb-6 text-lg">A multi-candle bearish reversal pattern that shows a more volatile and V-shaped topping process than a Rounding Top, framed by two tall candles.</p>
        <h4 className="text-xl font-semibold mt-8 mb-4 border-l-4 border-red-500 pl-4">What The Pattern Looks Like</h4>
        <ul className="space-y-4 mb-6 list-disc pl-5">
            <li><strong>First Candle:</strong> A long green candle in an uptrend, forming the first "tower."</li>
            <li><strong>Consolidation:</strong> A series of smaller-bodied candles (red or green) that trade sideways at the highs after the peak.</li>
            <li><strong>Final Candle:</strong> A long red candle that breaks down below the consolidation range, forming the second "tower" and often closing near the open of the first green candle.</li>
        </ul>
        <Diagram 
            src={'https://twiojujlmgannxhmrbou.supabase.co/storage/v1/object/public/candlestick%20patterns/tower%20top.webp'}
            alt="Tower Top pattern diagram"
        />
        <h4 className="text-xl font-semibold mt-8 mb-4 border-l-4 border-red-500 pl-4">Pattern Psychology</h4>
        <p>The initial long green candle signifies a climax of buying pressure or euphoria. This is followed by a period of confusion and indecision where neither bulls nor bears can gain control. This sideways chop allows for distribution, where smart money sells to late buyers. The final long red candle shows that the period of indecision has been decisively resolved in favor of the bears. They have absorbed all the remaining buyers and have started a new, powerful move downwards, reversing the initial sharp rally.</p>
      </>
    )
  },
  {
    id: 'on-neck-line-bearish',
    title: 'On Neck Line',
    emoji: 'NECK',
    image: 'https://twiojujlmgannxhmrbou.supabase.co/storage/v1/object/public/candlestick%20patterns/In-neck-Candlestick-Patterns.jpg',
    content: (
      <>
        <Image 
            src={generateExampleUrl('On Neck Line')}
            alt="On Neck Line on a chart" 
            caption="A weak rally that fails at the prior low signals strong bearish continuation."
        />
        <h3 className="text-2xl font-bold mb-2">The On Neck Line Pattern</h3>
        <p className="mb-6 text-lg">A two-candle bearish continuation pattern found within a downtrend. It signals that a brief rally attempt was extremely weak and that the downtrend is likely to continue.</p>
        <h4 className="text-xl font-semibold mt-8 mb-4 border-l-4 border-red-500 pl-4">What The Pattern Looks Like</h4>
        <ul className="space-y-4 mb-6 list-disc pl-5">
            <li><strong>First Candle:</strong> A long red candle in a downtrend.</li>
            <li><strong>Second Candle:</strong> A small green candle that opens with a gap down but closes at or very near the low of the first candle.</li>
        </ul>
        <Diagram 
            src={'https://twiojujlmgannxhmrbou.supabase.co/storage/v1/object/public/candlestick%20patterns/In-neck-Candlestick-Patterns.jpg'}
            alt="On Neck Line pattern diagram"
        />
        <h4 className="text-xl font-semibold mt-8 mb-4 border-l-4 border-red-500 pl-4">Pattern Psychology</h4>
        <p>This pattern demonstrates the extreme weakness of the bulls. After a strong bearish day, the next day opens even lower. Buyers attempt a rally but are so weak that they can't even push the price above the previous day's low. This failure to reclaim any meaningful ground is a strong sign that sellers are still in complete control and the downtrend is highly likely to continue. It shows that any buying pressure is being immediately absorbed by sellers.</p>
      </>
    )
  },
  {
    id: 'in-neck-line-bearish',
    title: 'In Neck Line',
    emoji: 'NECK',
    image: 'https://twiojujlmgannxhmrbou.supabase.co/storage/v1/object/public/candlestick%20patterns/In-neck-Candlestick-Patterns.jpg',
    content: (
      <>
        <Image 
            src={generateExampleUrl('In Neck Line')}
            alt="In Neck Line on a chart" 
            caption="A feeble rally that closes just above the prior close is a bearish sign."
        />
        <h3 className="text-2xl font-bold mb-2">The In Neck Line Pattern</h3>
        <p className="mb-6 text-lg">A two-candle bearish continuation pattern, very similar to the On Neck Line but with a slightly deeper bullish close. It still signals that the downtrend will likely resume.</p>
        <h4 className="text-xl font-semibold mt-8 mb-4 border-l-4 border-red-500 pl-4">What The Pattern Looks Like</h4>
        <ul className="space-y-4 mb-6 list-disc pl-5">
            <li><strong>First Candle:</strong> A long red candle in a downtrend.</li>
            <li><strong>Second Candle:</strong> A small green candle that opens with a gap down but closes slightly inside the body of the first candle, just above the prior day's close.</li>
        </ul>
        <Diagram 
            src={'https://twiojujlmgannxhmrbou.supabase.co/storage/v1/object/public/candlestick%20patterns/In-neck-Candlestick-Patterns.jpg'}
            alt="In Neck Line pattern diagram"
        />
        <h4 className="text-xl font-semibold mt-8 mb-4 border-l-4 border-red-500 pl-4">Pattern Psychology</h4>
        <p>The psychology is nearly identical to the On Neck Line. The bulls attempt a rally from a lower open, but their efforts are feeble. The fact that they can only manage to close just barely above the previous day's close, failing to make any significant progress into the prior day's losses, is a testament to their weakness. This pathetic rally is seen by bears as a low-risk opportunity to add to their short positions, anticipating a continuation of the downtrend.</p>
      </>
    )
  },
  {
    id: 'thrusting-line-bearish',
    title: 'Thrusting Line',
    emoji: 'THRUST',
    image: 'https://twiojujlmgannxhmrbou.supabase.co/storage/v1/object/public/candlestick%20patterns/Bearish-thrusting-pattern-1.jpg',
    content: (
      <>
        <Image 
            src={'https://twiojujlmgannxhmrbou.supabase.co/storage/v1/object/public/candlestick%20patterns/Bearish-Thrusting-pattern-example.jpg'}
            alt="Thrusting Line on a chart" 
            caption="A rally that fails to reach the midpoint of the prior red candle is a bearish continuation signal."
        />
        <h3 className="text-2xl font-bold mb-2">The Thrusting Line Pattern</h3>
        <p className="mb-6 text-lg">A two-candle pattern that is typically considered a bearish continuation in a downtrend. It shows a stronger rally attempt than the In/On Neck lines, but one that still ultimately fails.</p>
        <h4 className="text-xl font-semibold mt-8 mb-4 border-l-4 border-red-500 pl-4">What The Pattern Looks Like</h4>
        <ul className="space-y-4 mb-6 list-disc pl-5">
            <li><strong>First Candle:</strong> A long red candle in a downtrend.</li>
            <li><strong>Second Candle:</strong> A green candle that opens with a gap down and "thrusts" upwards, closing well into the body of the first candle but below its 50% midpoint.</li>
        </ul>
        <Diagram 
            src={'https://twiojujlmgannxhmrbou.supabase.co/storage/v1/object/public/candlestick%20patterns/Bearish-thrusting-pattern-1.jpg'}
            alt="Thrusting Line pattern diagram"
        />
        <h4 className="text-xl font-semibold mt-8 mb-4 border-l-4 border-red-500 pl-4">Pattern Psychology</h4>
        <p>In a downtrend, this pattern shows a more significant rally attempt by the bulls. However, the classical interpretation is that because the bulls failed to reclaim the psychologically important 50% level of the prior day's decline, the bears are still in control. The rally is seen as a temporary pullback, and the failure to cross the midpoint is taken as a sign that the downtrend will resume. It shows buyers are present, but not yet strong enough to reverse the trend.</p>
      </>
    )
  },
  {
    id: 'bearish-harami-cross',
    title: 'Bearish Harami Cross',
    emoji: '✝️',
    image: 'https://twiojujlmgannxhmrbou.supabase.co/storage/v1/object/public/candlestick%20patterns/Bearish-harami-cross.jpg',
    content: (
      <>
        <Image 
            src={'https://twiojujlmgannxhmrbou.supabase.co/storage/v1/object/public/candlestick%20patterns/Bearish-Harami-Cross-example.jpg'}
            alt="Bearish Harami Cross on a chart" 
            caption="A doji inside a green candle signals a powerful moment of indecision at the top."
        />
        <h3 className="text-2xl font-bold mb-2">The Bearish Harami Cross Pattern</h3>
        <p className="mb-6 text-lg">A more powerful and significant version of the standard Bearish Harami. It signals a more profound moment of indecision at the top of an uptrend, making a reversal more likely.</p>
        <h4 className="text-xl font-semibold mt-8 mb-4 border-l-4 border-red-500 pl-4">What The Pattern Looks Like</h4>
        <ul className="space-y-4 mb-6 list-disc pl-5">
            <li><strong>First Candle:</strong> A large green (bullish) candle continuing the uptrend.</li>
            <li><strong>Second Candle:</strong> A Doji candle whose entire range (high to low) is contained within the real body of the first candle.</li>
        </ul>
        <Diagram 
            src={'https://twiojujlmgannxhmrbou.supabase.co/storage/v1/object/public/candlestick%20patterns/Bearish-harami-cross.jpg'}
            alt="Bearish Harami Cross pattern diagram"
        />
        <h4 className="text-xl font-semibold mt-8 mb-4 border-l-4 border-red-500 pl-4">Pattern Psychology</h4>
        <p>This pattern shows a more dramatic halt in momentum than a standard Harami. The Doji represents a moment of perfect equilibrium where buyers and sellers are in a dead heat. After a long uptrend characterized by strong buying, this sudden and complete pause is highly significant. It shows that buying pressure has not just weakened, but has been completely neutralized by sellers. This moment of perfect balance at a market peak often precedes a strong reversal as the market resolves its indecision.</p>
      </>
    )
  },
  {
    id: 'kicking-down',
    title: 'Kicking Down (Bearish Kicker)',
    emoji: '🦵',
    image: generatePatternUrl('Kicking Down (Bearish Kicker)'),
    content: (
      <>
        <Image 
            src={generateExampleUrl('Kicking Down (Bearish Kicker)')}
            alt="Kicking Down on a chart" 
            caption="A gap between two opposite marubozu candles is an extremely powerful reversal signal."
        />
        <h3 className="text-2xl font-bold mb-2">The Kicking Down Pattern</h3>
        <p className="mb-6 text-lg">Another name for the extremely powerful Bearish Kicker pattern. It involves two Marubozu candles gapping in opposite directions, signifying a violent and complete change in sentiment.</p>
        <h4 className="text-xl font-semibold mt-8 mb-4 border-l-4 border-red-500 pl-4">What The Pattern Looks Like</h4>
        <ul className="space-y-4 mb-6 list-disc pl-5">
            <li><strong>First Candle:</strong> A green or white Marubozu (no wicks) during an uptrend.</li>
            <li><strong>Second Candle:</strong> A red or black Marubozu that opens with a significant gap down from the first candle.</li>
        </ul>
        <Diagram 
            src={generatePatternUrl('Kicking Down (Bearish Kicker)')}
            alt="Kicking Down pattern diagram"
        />
        <h4 className="text-xl font-semibold mt-8 mb-4 border-l-4 border-red-500 pl-4">Pattern Psychology</h4>
        <p>The psychology is identical to the Bearish Kicker. It represents a sudden, violent, and complete reversal of sentiment, usually driven by a major negative news event. The lack of wicks on both candles signifies that one side was in complete control during each session. The first day shows total bullish control. The second day shows total bearish control. The gap between them shows the instantaneous shift in that control. There is no overlap, no indecision—just a clean break and a powerful new bearish direction, trapping all bulls on the wrong side of the market.</p>
      </>
    )
  },
  {
    id: 'mat-hold-bearish',
    title: 'Mat Hold (Bearish)',
    emoji: 'HOLD',
    image: 'https://twiojujlmgannxhmrbou.supabase.co/storage/v1/object/public/candlestick%20patterns/Bearish-Mat-Hold-1024x1024.png',
    content: (
      <>
        <Image 
            src={'https://twiojujlmgannxhmrbou.supabase.co/storage/v1/object/public/candlestick%20patterns/Bearish-Mat-Hold-example-1024x756.png'}
            alt="Mat Hold on a chart" 
            caption="A weak rally attempt is crushed, confirming the downtrend will continue."
        />
        <h3 className="text-2xl font-bold mb-2">The Bearish Mat Hold Pattern</h3>
        <p className="mb-6 text-lg">A five-candle bearish continuation pattern, similar to the Falling Three Methods but often considered more potent because the weak rally starts from a gap up.</p>
        <h4 className="text-xl font-semibold mt-8 mb-4 border-l-4 border-red-500 pl-4">What The Pattern Looks Like</h4>
        <ul className="space-y-4 mb-6 list-disc pl-5">
            <li><strong>First Candle:</strong> A long red candle in a downtrend.</li>
            <li><strong>Next Three Candles:</strong> Three small green candles that gap up from the first candle's close but remain below its body, representing a failed rally.</li>
            <li><strong>Fifth Candle:</strong> A long red candle that gaps down and closes at a new low, resuming the downtrend.</li>
        </ul>
        <Diagram 
            src={'https://twiojujlmgannxhmrbou.supabase.co/storage/v1/object/public/candlestick%20patterns/Bearish-Mat-Hold-1024x1024.png'}
            alt="Mat Hold pattern diagram"
        />
        <h4 className="text-xl font-semibold mt-8 mb-4 border-l-4 border-red-500 pl-4">Pattern Psychology</h4>
        <p>This pattern shows a weak rally attempt that gets decisively crushed by the dominant bearish trend. After a strong sell-off, a weak rally begins on a gap up but fails to gain any traction. The three small green candles show the bulls are trying to fight back but lack any real power and cannot even reclaim the prior day's losses. The final long red candle shows the bears reasserting their dominance, gapping down and driving the price to new lows, confirming the continuation of the downtrend with force.</p>
      </>
    )
  },
  {
    id: 'three-line-strike-bearish',
    title: 'Three Line Strike (Bearish)',
    emoji: 'STRIKE',
    image: 'https://twiojujlmgannxhmrbou.supabase.co/storage/v1/object/public/candlestick%20patterns/Bearish-Three-Line-Strike-Candlestick-Pattern-1024x1024.png',
    content: (
      <>
        <Image 
            src={'https://twiojujlmgannxhmrbou.supabase.co/storage/v1/object/public/candlestick%20patterns/Bearish-Three-Line-Strike-Candlestick-Pattern-example-1024x756.png'}
            alt="Three Line Strike on a chart" 
            caption="One large red candle erases three days of gains, creating a powerful reversal."
        />
        <h3 className="text-2xl font-bold mb-2">The Bearish Three Line Strike Pattern</h3>
        <p className="mb-6 text-lg">A rare but powerful four-candle bearish reversal pattern. It appears after a strong uptrend and signals a dramatic shift in sentiment.</p>
        <h4 className="text-xl font-semibold mt-8 mb-4 border-l-4 border-red-500 pl-4">What The Pattern Looks Like</h4>
        <ul className="space-y-4 mb-6 list-disc pl-5">
            <li><strong>First Three Candles:</strong> Three strong green candles making progressively higher highs (like Three White Soldiers).</li>
            <li><strong>Fourth Candle:</strong> A single, massive red candle that opens even higher but then reverses and sells off, closing below the low of the very first green candle.</li>
        </ul>
        <Diagram 
            src={'https://twiojujlmgannxhmrbou.supabase.co/storage/v1/object/public/candlestick%20patterns/Bearish-Three-Line-Strike-Candlestick-Pattern-1024x1024.png'}
            alt="Three Line Strike pattern diagram"
        />
        <h4 className="text-xl font-semibold mt-8 mb-4 border-l-4 border-red-500 pl-4">Pattern Psychology</h4>
        <p>This pattern is a classic bull trap. The first three days build strong bullish momentum and convince many traders to go long. The fourth day opens higher, confirming their bias, but then a massive wave of selling hits the market. The single red candle completely erases three full days of gains, closing below the starting point. This violent reversal traps all the recent buyers, forcing them to sell at a loss and fueling a powerful move lower. The sheer force of the reversal candle indicates a major change in character for the market.</p>
      </>
    )
  },
  {
    id: 'concealing-baby-swallow-bearish',
    title: 'Concealing Baby Swallow (Bearish)',
    emoji: '🐦',
    image: generatePatternUrl('Concealing Baby Swallow (Bearish)'),
    content: (
      <>
        <Image 
            src={generateExampleUrl('Concealing Baby Swallow (Bearish)')}
            alt="Concealing Baby Swallow on a chart" 
            caption="An extremely rare but potent four-candle bearish reversal pattern."
        />
        <h3 className="text-2xl font-bold mb-2">The Bearish Concealing Baby Swallow</h3>
        <p className="mb-6 text-lg">An extremely rare four-candle bearish reversal pattern at the top of an uptrend. Its complexity makes it difficult to spot, but it is considered a very strong signal of a buying climax.</p>
        <h4 className="text-xl font-semibold mt-8 mb-4 border-l-4 border-red-500 pl-4">What The Pattern Looks Like</h4>
        <ul className="space-y-4 mb-6 list-disc pl-5">
            <li><strong>First Two Candles:</strong> Two long green marubozu candles, continuing a strong uptrend.</li>
            <li><strong>Third Candle:</strong> A green candle that opens with a gap up but then sells off to close inside the body of the second candle (a shooting star shape).</li>
            <li><strong>Fourth Candle:</strong> A long green candle that completely engulfs the third candle and makes a new high.</li>
        </ul>
        <Diagram 
            src={generatePatternUrl('Concealing Baby Swallow (Bearish)')}
            alt="Concealing Baby Swallow pattern diagram"
        />
        <h4 className="text-xl font-semibold mt-8 mb-4 border-l-4 border-red-500 pl-4">Pattern Psychology</h4>
        <p>This pattern represents a final, exhaustive buying climax that fails. The first two days are euphoric. The third day shows the first sign of selling pressure, as the market fails to hold its highs. The fourth day appears to be a massive bullish victory, as it engulfs the prior day's action and rallies to a new high. However, this is often a "blow-off top" or buying climax. All the remaining buyers have been flushed into the market in this final, dramatic push higher. With no buyers left to push the price further, the market has nowhere to go but down. This extreme buying exhaustion often marks the exact top of a move.</p>
      </>
    )
  }
];