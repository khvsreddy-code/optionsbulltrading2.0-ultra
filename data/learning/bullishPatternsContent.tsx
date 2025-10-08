import React from 'react';

export interface Pattern {
  id: string;
  title: string;
  emoji: string;
  content: React.ReactNode;
}

export const bullishPatterns: Pattern[] = [
  {
    id: 'hammer',
    title: 'Hammer',
    emoji: '🔨',
    content: (
      <>
        <h3 className="text-2xl font-bold mb-4">Hammer 🔨</h3>
        <p className="mb-4">The Hammer is a single-candle bullish reversal pattern that appears after a noticeable downtrend. It is characterized by a small body (either green/hollow or red/filled, though green is slightly more bullish) positioned at the upper end of the trading range, and a long lower shadow that is typically at least twice the length of the real body.</p>
        <h4 className="text-xl font-semibold mt-6 mb-2">Formation Psychology</h4>
        <p className="mb-4">The long lower shadow signifies that sellers initially pushed the price down aggressively after the open (demonstrating the existing downtrend force). However, at the low point, powerful buying pressure suddenly entered the market, rejecting the lower prices and driving the price all the way back up to close near the high of the session. The resulting candle looks like a hammer, signaling that the market has "hammered out a bottom."</p>
        <p className="mb-4">A close above the open (a green body) is slightly stronger as it shows buyers managed to finish the period in control, but the mere existence of the long lower tail is the primary signal of rejection. The reliability of the Hammer increases when the lower shadow pierces a key support level.</p>
      </>
    ),
  },
  {
    id: 'bullish-engulfing',
    title: 'Bullish Engulfing',
    emoji: '🟢',
    content: (
        <>
            <h3 className="text-2xl font-bold mb-4">Bullish Engulfing 🟢</h3>
            <p className="mb-4">The Bullish Engulfing is a two-candle reversal pattern occurring after a downtrend. It is formed by a small red (bearish) body followed immediately by a large green (bullish) body that completely envelops or "engulfs" the real body of the prior red candle.</p>
            <p className="mb-4">Crucially, the open price of the second (green) candle is lower than the close of the first (red) candle, creating a gap down or a slightly lower opening, and its close price must be higher than the first candle's open.</p>
            <h4 className="text-xl font-semibold mt-6 mb-2">Formation Psychology</h4>
            <p className="mb-4">The pattern starts with a bearish candle confirming the sellers are still in control. The next day, the price may even gap down, giving sellers an initial advantage. However, from that low point, massive buying demand enters the market and dominates the entire period. This force not only absorbs all the selling that occurred the day before but also drives the price far higher than the previous day's open. This strong and undeniable shift from selling to buying pressure is a very potent sign of trend reversal, as the buyers have completely erased and overwhelmed the previous day's bearish activity.</p>
        </>
    ),
  },
  {
    id: 'piercing-pattern',
    title: 'Piercing Pattern',
    emoji: '뚫',
    content: (
        <>
            <h3 className="text-2xl font-bold mb-4">Piercing Pattern 뚫</h3>
            <p className="mb-4">The Piercing Pattern is another two-candle bullish reversal pattern found at the bottom of a downtrend. It is formed by a long red (bearish) candle followed by a long green (bullish) candle.</p>
            <h4 className="text-xl font-semibold mt-6 mb-2">Key Requirements</h4>
            <p className="mb-4">The second candle must gap down (open below the low of the first candle), but then rally strongly to close more than halfway up the real body of the first red candle (i.e., above the 50% midpoint).</p>
            <h4 className="text-xl font-semibold mt-6 mb-2">Formation Psychology</h4>
            <p className="mb-4">The downtrend appears to continue with the gap down, giving sellers hope. When the buyers aggressively push the price back up, closing over the midpoint of the prior red candle is a significant psychological victory. This closing action demonstrates that buyers not only held the line against the gap down but also took back more than half the territory previously gained by the sellers. The deeper the pierce into the red body, the more reliable the reversal signal, as it suggests a major shift in short-term market control.</p>
        </>
    ),
  },
  {
    id: 'morning-star',
    title: 'Morning Star',
    emoji: '⭐',
    content: (
        <>
            <h3 className="text-2xl font-bold mb-4">Morning Star ⭐</h3>
            <p className="mb-4">The Morning Star is a three-candle bullish reversal pattern that suggests a "dawn" after a period of darkness (downtrend). It is composed of three parts:</p>
            <ol className="list-decimal pl-6 space-y-2 mb-4">
                <li>A long red (bearish) candle, indicating strong selling pressure.</li>
                <li>A small-bodied candle (Doji or spinning top), which can be red or green, that gaps down from the first candle. This small candle represents a state of indecision or equilibrium where the selling pressure has stalled.</li>
                <li>A long green (bullish) candle that gaps up from the small middle candle and closes well into the body of the first red candle.</li>
            </ol>
            <h4 className="text-xl font-semibold mt-6 mb-2">Formation Psychology</h4>
            <p className="mb-4">The first day is all bearish. The second day's gap down confirms fear, but the small body shows sellers can't push the price much further. The third day's gap up and strong rally signals that buyers have seized control during the period of indecision and are now aggressively reversing the downtrend. The star acts as a signal flare, indicating the end of the downtrend's dominance.</p>
        </>
    ),
  },
  {
    id: 'three-white-soldiers',
    title: 'Three White Soldiers',
    emoji: '🧍🧍🧍',
    content: (
        <>
            <h3 className="text-2xl font-bold mb-4">Three White Soldiers 🧍🧍🧍</h3>
            <p className="mb-4">This is a three-candle bullish continuation or reversal pattern that shows a steady, powerful advance. It is formed by three consecutive long green (bullish) candles that close progressively higher.</p>
            <h4 className="text-xl font-semibold mt-6 mb-2">Key Requirements</h4>
            <p className="mb-4">Each candle should open within the real body of the preceding candle (ideally near the midpoint) and then close near its high, leaving very small or no upper shadows.</p>
            <h4 className="text-xl font-semibold mt-6 mb-2">Formation Psychology</h4>
            <p className="mb-4">The pattern is a strong visual representation of sustained buying strength. Each new period opens at a reasonable price, allowing new buyers to enter, and then those buyers maintain strong momentum throughout the period, pushing the price to a new high for the third consecutive time. The lack of significant shadows indicates minimal selling pressure or profit-taking during the rally. This pattern signifies the market has found its conviction and a new, reliable upward trend has begun.</p>
        </>
    ),
  },
  {
    id: 'inverted-hammer',
    title: 'Inverted Hammer',
    emoji: '⛮',
    content: (
        <>
            <h3 className="text-2xl font-bold mb-4">Inverted Hammer ⛮</h3>
            <p className="mb-4">The Inverted Hammer is a single-candle bullish reversal pattern similar to the Hammer, but with the shadow reversed. It has a small body (green or red) at the lower end of the range and a long upper shadow (at least twice the length of the body). It appears after a downtrend.</p>
            <h4 className="text-xl font-semibold mt-6 mb-2">Formation Psychology</h4>
            <p className="mb-4">The long upper shadow suggests that buyers attempted to push the price up significantly after the open, challenging the prevailing bearish control. While sellers eventually pushed the price back down to close near the open or low, the initial effort by the buyers to take control and test higher prices is a clear warning sign to the bears. Unlike the Hammer, which shows an outright rejection of lows, the Inverted Hammer shows an aggressive scouting of higher prices, suggesting that buyers are lurking and waiting to take charge.</p>
        </>
    ),
  },
  {
    id: 'tweezer-bottom',
    title: 'Tweezer Bottom',
    emoji: '🗜️',
    content: (
        <>
            <h3 className="text-2xl font-bold mb-4">Tweezer Bottom 🗜️</h3>
            <p className="mb-4">The Tweezer Bottom is a two-candle bullish reversal pattern formed after a downtrend where two consecutive candles have identical lows. The first candle is typically bearish (red), and the second is typically bullish (green).</p>
            <h4 className="text-xl font-semibold mt-6 mb-2">Formation Psychology</h4>
            <p className="mb-4">This pattern signifies an absolute, non-negotiable floor set by buyers. The first candle hits a new low, but the second candle halts its decline at that exact same price level. The matching lows indicate that at this precise price point, the buying demand is perfectly matched with or even overwhelms the selling supply. The formation implies that the price will not be allowed to fall any further, and the market is poised for a reversal.</p>
        </>
    ),
  },
   {
    id: 'morning-doji-star',
    title: 'Morning Doji Star',
    emoji: '🌟',
    content: (
        <>
            <h3 className="text-2xl font-bold mb-4">Morning Doji Star 🌟</h3>
            <p className="mb-4">This is a highly reliable three-candle bullish reversal pattern that serves as an enhanced version of the standard Morning Star. It is identical to the Morning Star, but the small middle candle must be a Doji (a candle where the Open and Close prices are virtually the same, resulting in a tiny, cross-shaped body).</p>
            <h4 className="text-xl font-semibold mt-6 mb-2">Key Requirements</h4>
            <ol className="list-decimal pl-6 space-y-2 mb-4">
                <li>A long red candle.</li>
                <li>A Doji that gaps down from the first candle. This Doji signifies maximum market indecision—neither buyers nor sellers could gain control.</li>
                <li>A long green candle that closes well into the body of the first red candle.</li>
            </ol>
            <h4 className="text-xl font-semibold mt-6 mb-2">Formation Psychology</h4>
            <p className="mb-4">The presence of the Doji on the second day dramatically amplifies the pattern's reliability. A regular small body signals indecision, but a Doji signals total equilibrium after a strong downtrend. This abrupt halt in selling momentum makes the aggressive reversal (the long green third candle) a much more powerful confirmation that the trend has changed. The Doji is the precise pivot point where the market transitions from bearish control to bullish dominance.</p>
        </>
    ),
  },
  {
    id: 'bullish-harami-cross',
    title: 'Bullish Harami (Cross)',
    emoji: '🤰',
    content: (
        <>
            <h3 className="text-2xl font-bold mb-4">Bullish Harami (Cross) 🤰</h3>
            <p className="mb-4">The Harami is a two-candle bullish reversal pattern appearing at the bottom of a downtrend, often referred to as a "Pregnant Woman" pattern (from the Japanese). It is formed by a large red (bearish) body followed by a small green or red body that is completely contained within the vertical range of the first body (the second candle is "pregnant" within the first). The "Cross" version is when the second candle is a Doji.</p>
            <h4 className="text-xl font-semibold mt-6 mb-2">Formation Psychology</h4>
            <p className="mb-4">The large red candle confirms the strong selling pressure. The following small candle opens and closes within the confines of the previous day, showing a dramatic contraction of volatility and a sudden loss of downward momentum. The sellers simply cannot push the price to a new low, and the buyers are testing the waters. The shrinking range signals that the old trend is exhausted and an immediate pause or reversal is likely. The Bullish Harami Cross (where the second day is a Doji) is considered more reliable because the Doji signifies complete equilibrium, a stronger indication of a turning point.</p>
        </>
    ),
  },
  {
    id: 'three-inside-up',
    title: 'Three Inside Up',
    emoji: '⏫',
    content: (
        <>
            <h3 className="text-2xl font-bold mb-4">Three Inside Up (Reversal) ⏫</h3>
            <p className="mb-4">This is a three-candle bullish reversal pattern that confirms a two-candle Bullish Harami formation. It requires three steps:</p>
            <ol className="list-decimal pl-6 space-y-2 mb-4">
                <li>A long red (bearish) candle.</li>
                <li>A small green candle whose body is entirely contained within the first red body (forming a Bullish Harami).</li>
                <li>A final green candle that closes higher than the high of the first red candle.</li>
            </ol>
            <h4 className="text-xl font-semibold mt-6 mb-2">Formation Psychology</h4>
            <p className="mb-4">The first two candles signal the halt and indecision (the Harami). The third, long green candle provides the crucial confirmation. By closing above the high of the very first bearish day, the buyers have definitively proven they have overcome the initial selling pressure and have pushed the price into new bullish territory. This pattern is prized for its high reliability because it includes a strong confirmation move on the third day, mitigating the risk of a false Harami signal.</p>
        </>
    ),
  },
  {
    id: 'white-marubozu',
    title: 'White Marubozu',
    emoji: '⚪',
    content: (
        <>
            <h3 className="text-2xl font-bold mb-4">White Marubozu (Bullish Marubozu) ⚪</h3>
            <p className="mb-4">The White Marubozu is a single-candle continuation or strong reversal pattern characterized by a long green body with virtually no upper or lower shadows.</p>
            <h4 className="text-xl font-semibold mt-6 mb-2">Key Requirements</h4>
            <p className="mb-4">The Open price is the low of the period, and the Close price is the high of the period.</p>
            <h4 className="text-xl font-semibold mt-6 mb-2">Formation Psychology</h4>
            <p className="mb-4">This candle represents unrelenting, absolute buying power from open to close. The price never dropped below the opening level (no lower shadow), and it never pulled back from the highest price achieved (no upper shadow). It signifies that buyers had complete control for the entire period, dominating the market and forcing all sellers to stand aside. If this appears during a downtrend, it can signal an aggressive and immediate reversal. If it appears during an uptrend, it is a powerful signal of strong trend continuation.</p>
        </>
    ),
  },
  {
    id: 'homing-pigeon',
    title: 'Homing Pigeon',
    emoji: '🐦',
    content: (
        <>
            <h3 className="text-2xl font-bold mb-4">Homing Pigeon 🐦</h3>
            <p className="mb-4">A two-candle bullish continuation/reversal pattern that occurs in a downtrend. It consists of two consecutive black (red/bearish) candles, where the second candle's body is entirely contained within the body of the first candle. Note: Unlike the Bullish Harami (which requires the second candle to be the opposite color for reversal), this pattern uses two red candles.</p>
            <h4 className="text-xl font-semibold mt-6 mb-2">Formation Psychology</h4>
            <p className="mb-4">The first red candle continues the downtrend. The second red candle, although still bearish, has a significantly smaller range, and its entire activity occurs within the previous day's trading range. This signals a sharp reduction in selling enthusiasm and range. Even though sellers are still technically in control (the candles are red), the lack of new low prices and the overall contraction of volatility suggest that the momentum of the downtrend is critically stalling. It's a subtle but important signal that the "selling is homing" or winding down, and a reversal is imminent.</p>
        </>
    ),
  },
];
