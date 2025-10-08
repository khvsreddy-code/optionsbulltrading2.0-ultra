import React from 'react';
import type { Pattern } from './bullishPatternsContent'; // Re-use the same interface

export const bearishPatterns: Pattern[] = [
  {
    id: 'shooting-star',
    title: 'Shooting Star',
    emoji: '☄️',
    content: (
      <>
        <h3 className="text-2xl font-bold mb-4">Shooting Star ☄️</h3>
        <p className="mb-4">The Shooting Star is a single-candle bearish reversal pattern that appears after a noticeable uptrend. It is the inverted version of the Hammer. It is characterized by a small body (either red/filled or green/hollow, though red is slightly more bearish) positioned at the lower end of the trading range, and a long upper shadow that is typically at least twice the length of the real body.</p>
        <h4 className="text-xl font-semibold mt-6 mb-2">Formation Psychology</h4>
        <p className="mb-4">The long upper shadow signifies that buyers initially pushed the price up aggressively after the open (demonstrating the existing uptrend force) to a new high. However, at the peak, powerful selling pressure suddenly entered the market, rejecting the higher prices and driving the price all the way back down to close near the low of the session. The resulting candle looks like a shooting star falling to Earth, signaling that the rally has failed. A close below the open (a red body) is slightly stronger as it shows sellers managed to finish the period in control, but the mere existence of the long upper tail is the primary signal of rejection. The reliability of the Shooting Star increases when the upper shadow pierces a key resistance level.</p>
      </>
    ),
  },
  {
    id: 'bearish-engulfing',
    title: 'Bearish Engulfing',
    emoji: '🔴',
    content: (
        <>
            <h3 className="text-2xl font-bold mb-4">Bearish Engulfing 🔴</h3>
            <p className="mb-4">The Bearish Engulfing is a powerful two-candle bearish reversal pattern occurring after an uptrend. It is the opposite of the Bullish Engulfing pattern. It is formed by a small green (bullish) body followed immediately by a large red (bearish) body that completely envelops or "engulfs" the real body of the prior green candle.</p>
            <p className="mb-4">Crucially, the open price of the second (red) candle is higher than the close of the first (green) candle, and its close price must be lower than the first candle's open.</p>
            <h4 className="text-xl font-semibold mt-6 mb-2">Formation Psychology</h4>
            <p className="mb-4">The pattern starts with a bullish candle confirming the buyers are still in control. The next day, the price may even gap up, giving buyers an initial advantage. However, from that high point, massive selling demand enters the market and dominates the entire period. This force not only absorbs all the buying that occurred the day before but also drives the price far lower than the previous day's open. This strong and undeniable shift from buying to selling pressure is a very potent sign of trend reversal, as the sellers have completely erased and overwhelmed the previous day's bullish activity.</p>
        </>
    ),
  },
  {
    id: 'dark-cloud-cover',
    title: 'Dark Cloud Cover',
    emoji: '☁️',
    content: (
        <>
            <h3 className="text-2xl font-bold mb-4">Dark Cloud Cover ☁️</h3>
            <p className="mb-4">The Dark Cloud Cover is a two-candle bearish reversal pattern found at the top of an uptrend. It is the opposite of the Piercing Pattern. It is formed by a long green (bullish) candle followed by a long red (bearish) candle.</p>
            <h4 className="text-xl font-semibold mt-6 mb-2">Key Requirements</h4>
            <p className="mb-4">The second candle must gap up (open above the high of the first candle), but then sellers aggressively push the price down to close more than halfway down the real body of the first green candle (i.e., below the 50% midpoint).</p>
            <h4 className="text-xl font-semibold mt-6 mb-2">Formation Psychology</h4>
            <p className="mb-4">The uptrend appears to continue with the gap up, giving buyers hope. When the sellers aggressively push the price back down, closing over the midpoint of the prior green candle is a significant psychological victory for the bears. This deep penetration (the "dark cloud" covering the previous bullish day) demonstrates that sellers not only held the line against the gap up but also took back more than half the territory previously gained by the buyers. The deeper the cover into the green body, the more reliable the reversal signal.</p>
        </>
    ),
  },
  {
    id: 'evening-star',
    title: 'Evening Star',
    emoji: '🌃',
    content: (
        <>
            <h3 className="text-2xl font-bold mb-4">Evening Star 🌃</h3>
            <p className="mb-4">The Evening Star is a three-candle bearish reversal pattern that suggests the "setting" of the uptrend. It is the opposite of the Morning Star. It is composed of three parts:</p>
            <ol className="list-decimal pl-6 space-y-2 mb-4">
                <li>A long green (bullish) candle, indicating strong buying pressure.</li>
                <li>A small-bodied candle (Doji or spinning top), which can be red or green, that gaps up from the first candle. This small candle represents a state of indecision or equilibrium where the buying pressure has stalled.</li>
                <li>A long red (bearish) candle that gaps down from the small middle candle and closes well into the body of the first green candle.</li>
            </ol>
            <h4 className="text-xl font-semibold mt-6 mb-2">Formation Psychology</h4>
            <p className="mb-4">The first day is all bullish. The second day's gap up confirms enthusiasm, but the small body shows buyers can't push the price much further. The third day's gap down and strong decline signals that sellers have seized control during the period of indecision and are now aggressively reversing the uptrend. The star acts as a warning sign, indicating the end of the uptrend's dominance.</p>
        </>
    ),
  },
  {
    id: 'three-black-crows',
    title: 'Three Black Crows',
    emoji: '🐦🐦🐦',
    content: (
        <>
            <h3 className="text-2xl font-bold mb-4">Three Black Crows 🐦🐦🐦</h3>
            <p className="mb-4">This is a three-candle bearish continuation or reversal pattern that shows a steady, powerful decline. It is the opposite of the Three White Soldiers. It is formed by three consecutive long red (bearish) candles that close progressively lower.</p>
            <h4 className="text-xl font-semibold mt-6 mb-2">Key Requirements</h4>
            <p className="mb-4">Each candle should open within the real body of the preceding candle (ideally near the midpoint) and then close near its low, leaving very small or no lower shadows.</p>
            <h4 className="text-xl font-semibold mt-6 mb-2">Formation Psychology</h4>
            <p className="mb-4">The pattern is a strong visual representation of sustained selling strength. Each new period opens at a slightly higher or reasonable price, allowing new sellers to enter, and then those sellers maintain strong momentum throughout the period, pushing the price to a new low for the third consecutive time. The lack of significant shadows indicates minimal buying pressure or pushback during the decline. This pattern signifies the market has found its conviction and a new, reliable downward trend has begun.</p>
        </>
    ),
  },
  {
    id: 'hanging-man',
    title: 'Hanging Man',
    emoji: '🧍',
    content: (
        <>
            <h3 className="text-2xl font-bold mb-4">Hanging Man 🧍</h3>
            <p className="mb-4">The Hanging Man is a single-candle bearish reversal pattern that appears after an uptrend. It is structurally identical to the bullish Hammer, but its location (at the top of an uptrend) changes its interpretation. It has a small body (red or green) at the upper end of the range and a long lower shadow.</p>
            <h4 className="text-xl font-semibold mt-6 mb-2">Formation Psychology</h4>
            <p className="mb-4">The long lower shadow shows that sellers aggressively pushed the price down significantly during the session. Although buyers managed to rally the price back up to close near the high, the initial, aggressive intrusion by the sellers is the warning sign. It suggests that the buying enthusiasm is thin, and the market is extremely vulnerable to selling pressure—the market is "hanging" onto its high price by a thread. Confirmation from the next candle closing significantly lower is essential to confirm the reversal.</p>
        </>
    ),
  },
  {
    id: 'bearish-harami-cross',
    title: 'Bearish Harami (Cross)',
    emoji: '🤰',
    content: (
        <>
            <h3 className="text-2xl font-bold mb-4">Bearish Harami (Cross) 🤰</h3>
            <p className="mb-4">The Bearish Harami is a two-candle bearish reversal pattern appearing at the top of an uptrend. It is formed by a large green (bullish) body followed by a small red or green body that is completely contained within the vertical range of the first body. The "Cross" version is when the second candle is a Doji.</p>
            <h4 className="text-xl font-semibold mt-6 mb-2">Formation Psychology</h4>
            <p className="mb-4">The large green candle confirms the strong buying pressure. The following small candle opens and closes within the confines of the previous day, showing a dramatic contraction of volatility and a sudden loss of upward momentum. The buyers simply cannot push the price to a new high, and the sellers are testing the waters. The shrinking range signals that the old trend is exhausted and an immediate pause or reversal is likely. The Cross version (second day is a Doji) is considered more reliable because the Doji signifies complete equilibrium, a stronger indication of a turning point.</p>
        </>
    ),
  },
  {
    id: 'three-outside-down',
    title: 'Three Outside Down',
    emoji: '⬇️⬇️⬇️',
    content: (
        <>
            <h3 className="text-2xl font-bold mb-4">Three Outside Down (Reversal) ⬇️⬇️⬇️</h3>
            <p className="mb-4">A powerful three-candle bearish reversal pattern that confirms the Bearish Engulfing formation.</p>
             <h4 className="text-xl font-semibold mt-6 mb-2">Key Requirements</h4>
             <ol className="list-decimal pl-6 space-y-2 mb-4">
                <li>A small green (bullish) candle.</li>
                <li>A large red candle that completely engulfs the body of the first candle (forming the Bearish Engulfing pattern).</li>
                <li>A final red candle that closes lower than the low of the second (engulfing) candle.</li>
            </ol>
            <h4 className="text-xl font-semibold mt-6 mb-2">Formation Psychology</h4>
            <p className="mb-4">The first two candles signal the complete shift in control from bulls to bears. The third, final red candle provides the unquestionable confirmation. By closing at a new low, the sellers prove that their dominance was not a one-day anomaly but a genuine, committed reversal of the trend. This pattern is highly valued because it shows both the initial aggressive reversal (engulfing) and the follow-through strength (the lower close), mitigating the risk of a false signal.</p>
        </>
    ),
  },
];