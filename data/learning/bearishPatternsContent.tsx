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
  {
    id: 'evening-doji-star',
    title: 'Evening Doji Star',
    emoji: '🌟',
    content: (
        <>
            <h3 className="text-2xl font-bold mb-4">Evening Doji Star 🌟</h3>
            <p className="mb-4">This is a highly reliable three-candle bearish reversal pattern that serves as an enhanced version of the standard Evening Star. It is identical to the Evening Star, but the small middle candle must be a Doji (a candle where the Open and Close prices are virtually the same, resulting in a tiny, cross-shaped body).</p>
            <h4 className="text-xl font-semibold mt-6 mb-2">Key Requirements</h4>
            <ol className="list-decimal pl-6 space-y-2 mb-4">
                <li>A long green candle.</li>
                <li>A Doji that gaps up from the first candle. This Doji signifies maximum market indecision—neither buyers nor sellers could gain control.</li>
                <li>A long red candle that closes well into the body of the first green candle.</li>
            </ol>
            <h4 className="text-xl font-semibold mt-6 mb-2">Formation Psychology</h4>
            <p className="mb-4">The presence of the Doji on the second day dramatically amplifies the pattern's reliability. A regular small body signals indecision, but a Doji signals total equilibrium at a high level after a strong uptrend. This abrupt halt in buying momentum makes the aggressive reversal (the long red third candle) a much more powerful confirmation that the trend has changed. The Doji is the precise pivot point where the market transitions from bullish control to bearish dominance.</p>
        </>
    ),
  },
  {
    id: 'three-inside-down',
    title: 'Three Inside Down',
    emoji: '⬇️',
    content: (
        <>
            <h3 className="text-2xl font-bold mb-4">Three Inside Down (Reversal) ⬇️</h3>
            <p className="mb-4">This is a three-candle bearish reversal pattern that confirms a two-candle Bearish Harami formation. It requires three steps:</p>
            <ol className="list-decimal pl-6 space-y-2 mb-4">
                <li>A long green (bullish) candle.</li>
                <li>A small red candle whose body is entirely contained within the first green body (forming a Bearish Harami).</li>
                <li>A final red candle that closes lower than the low of the first green candle.</li>
            </ol>
            <h4 className="text-xl font-semibold mt-6 mb-2">Formation Psychology</h4>
            <p className="mb-4">The first two candles signal the halt and indecision (the Harami). The third, long red candle provides the crucial confirmation. By closing below the low of the very first bullish day, the sellers have definitively proven they have overcome the initial buying pressure and have pushed the price into new bearish territory. This pattern is prized for its high reliability because it includes a strong confirmation move on the third day, mitigating the risk of a false Harami signal.</p>
        </>
    ),
  },
  {
    id: 'falling-three-methods',
    title: 'Falling Three Methods',
    emoji: '📉',
    content: (
        <>
            <h3 className="text-2xl font-bold mb-4">Falling Three Methods 📉</h3>
            <p className="mb-4">This is a five-candle bearish continuation pattern that signals an extremely robust, persistent downtrend following a minor, corrective pause. It is one of the most reliable continuation patterns.</p>
            <h4 className="text-xl font-semibold mt-6 mb-2">Key Requirements</h4>
            <ol className="list-decimal pl-6 space-y-2 mb-4">
                <li>A long red candle that establishes the primary trend.</li>
                <li>Three small green (bullish) candles that follow, trading gently higher but remaining below the high of the first red candle. This forms the "methods."</li>
                <li>A final long red candle that opens below the close of the last green candle and closes at a new low for the pattern.</li>
            </ol>
            <h4 className="text-xl font-semibold mt-6 mb-2">Formation Psychology</h4>
            <p className="mb-4">The three green candles represent a healthy, controlled, and minor retracement or profit-taking by bears. The price drifts sideways/slightly up, allowing short-term buyers to be trapped, but the market never trades back to the starting high point. The fifth candle's powerful move to a new low confirms that the initial bearish force has resumed with renewed conviction, easily overcoming the brief bullish correction. This pattern demonstrates strong underlying market weakness and is a signal to aggressively re-enter or hold short positions.</p>
        </>
    ),
  },
  {
    id: 'black-marubozu',
    title: 'Black Marubozu',
    emoji: '⚫',
    content: (
        <>
            <h3 className="text-2xl font-bold mb-4">Black Marubozu (Bearish Marubozu) ⚫</h3>
            <p className="mb-4">The Black Marubozu is a single-candle continuation or strong reversal pattern characterized by a long red body with virtually no upper or lower shadows.</p>
            <h4 className="text-xl font-semibold mt-6 mb-2">Key Requirements</h4>
            <p className="mb-4">The Open price is the high of the period, and the Close price is the low of the period.</p>
            <h4 className="text-xl font-semibold mt-6 mb-2">Formation Psychology</h4>
            <p className="mb-4">This candle represents unrelenting, absolute selling power from open to close. The price never rose above the opening level (no upper shadow), and it never pulled back from the lowest price achieved (no lower shadow). It signifies that sellers had complete control for the entire period, dominating the market and forcing all buyers to stand aside. If this appears during an uptrend, it can signal an aggressive and immediate reversal. If it appears during a downtrend, it is a powerful signal of strong trend continuation.</p>
        </>
    ),
  },
  {
    id: 'tweezer-top',
    title: 'Tweezer Top',
    emoji: '🗜️',
    content: (
        <>
            <h3 className="text-2xl font-bold mb-4">Tweezer Top 🗜️</h3>
            <p className="mb-4">The Tweezer Top is a two-candle bearish reversal pattern formed after an uptrend where two consecutive candles have identical high prices. The first candle is typically bullish (green), and the second is typically bearish (red).</p>
            <h4 className="text-xl font-semibold mt-6 mb-2">Formation Psychology</h4>
            <p className="mb-4">This pattern signifies an absolute, non-negotiable ceiling set by sellers. The first candle hits a new high, but the second candle halts its advance at that exact same price level. The matching highs indicate that at this precise price point, the selling supply is perfectly matched with or even overwhelms the buying demand. The formation implies that the price will not be allowed to rise any further, and the market is poised for a reversal. The two identical highs represent the powerful resistance point that the buyers were unable to overcome.</p>
        </>
    ),
  },
  {
    id: 'bearish-belt-hold',
    title: 'Bearish Belt Hold',
    emoji: '🥋',
    content: (
        <>
            <h3 className="text-2xl font-bold mb-4">Bearish Belt Hold (Yorikiri) 🥋</h3>
            <p className="mb-4">A strong single-candle bearish reversal pattern that appears during an uptrend. It is a variant of the Black Marubozu.</p>
            <h4 className="text-xl font-semibold mt-6 mb-2">Key Requirements</h4>
            <p className="mb-4">The candle is a long red body that has no upper shadow (the Open is the High of the period) and closes near its low. Crucially, it must open above the previous day's close (gapping up) and then immediately decline.</p>
            <h4 className="text-xl font-semibold mt-6 mb-2">Formation Psychology</h4>
            <p className="mb-4">This pattern represents the moment the bears "grab the belt" of the market (the term is from Sumo wrestling, meaning to seize the initiative). The market opens higher, potentially fooling buyers, but aggressive selling immediately enters the market, driving the price down from the very first moment and preventing it from ever trading higher. This strong, relentless single-period control, especially after a period of bullishness, signifies that the high has been decisively rejected, and sellers are now in command.</p>
        </>
    ),
  },
  {
    id: 'separating-lines-bearish',
    title: 'Separating Lines (Bearish)',
    emoji: '➗',
    content: (
        <>
            <h3 className="text-2xl font-bold mb-4">Bearish Separating Lines ➗</h3>
            <p className="mb-4">This is a two-candle bearish continuation pattern that appears during a clear downtrend. It is the opposite of the Bullish Separating Lines. It consists of a green (bullish) candle followed by a red (bearish) candle.</p>
            <h4 className="text-xl font-semibold mt-6 mb-2">Key Requirements</h4>
            <ol className="list-decimal pl-6 space-y-2 mb-4">
                <li>The green candle confirms a minor rally or correction in the existing downtrend.</li>
                <li>The red candle must open at the exact same price as the open of the green candle.</li>
                <li>The red candle then closes lower than the green candle's close.</li>
            </ol>
            <h4 className="text-xl font-semibold mt-6 mb-2">Formation Psychology</h4>
            <p className="mb-4">This pattern confirms the market's underlying bearish conviction. The green candle's rally is interpreted as temporary profit-taking or short-covering within the downtrend. The next day, the price opens right back at the strong conviction level (the previous day's open), effectively separating the bulls from the market. The ability of the market to instantly reject the green candle's bullish high and continue its decline from the exact previous point of weakness proves that the sellers are committed, and the correction is over.</p>
        </>
    ),
  },
  {
    id: 'matching-highs',
    title: 'Matching Highs',
    emoji: '⚖️',
    content: (
        <>
            <h3 className="text-2xl font-bold mb-4">Matching Highs (Bearish Reversal) ⚖️</h3>
            <p className="mb-4">A two-candle bearish reversal pattern that is essentially a variant of the Tweezer Top. It occurs at the top of an uptrend.</p>
            <h4 className="text-xl font-semibold mt-6 mb-2">Key Requirements</h4>
            <ol className="list-decimal pl-6 space-y-2 mb-4">
                <li>The first candle is a long green (bullish) candle.</li>
                <li>The second candle is also a green (bullish) candle (or sometimes red), but it has the exact same high price as the first candle. The bodies themselves do not need to be the same size.</li>
            </ol>
            <h4 className="text-xl font-semibold mt-6 mb-2">Formation Psychology</h4>
            <p className="mb-4">The key is the shared, identical high price. While both days are technically bullish in their candle bodies (if both are green), the failure of the market on the second day to push the price even a single tick higher than the previous day's high signifies an absolute price ceiling. This shows an incredibly specific and firm point where selling supply has entirely absorbed the buying pressure. The shared high acts as a concrete line of resistance, signaling that the uptrend has found its psychological or technical boundary. Confirmation from the next candle, closing red, is highly recommended for trade entry.</p>
        </>
    ),
  },
  {
    id: 'stick-sandwich-bearish',
    title: 'Stick Sandwich (Bearish)',
    emoji: '🥪',
    content: (
        <>
            <h3 className="text-2xl font-bold mb-4">Bearish Stick Sandwich 🥪</h3>
            <p className="mb-4">A rare three-candle bearish reversal pattern occurring after an uptrend. It is composed of a green candle (stick), followed by a red candle (sandwich filler), and then another green candle (stick).</p>
            <h4 className="text-xl font-semibold mt-6 mb-2">Key Requirements</h4>
            <ol className="list-decimal pl-6 space-y-2 mb-4">
                <li>The first and third (green) candles must close at the exact same price level.</li>
                <li>The middle (red) candle's body must be completely contained within the ranges of the two green candles.</li>
            </ol>
            <h4 className="text-xl font-semibold mt-6 mb-2">Formation Psychology</h4>
            <p className="mb-4">The pattern starts with a bullish candle and ends with a bullish candle, yet it is bearish. The two green candles closing at the identical high price is the key. This establishes a clear, undeniable resistance level—the "sandwich top." Despite the buyers trying twice (on Day 1 and Day 3), the price cannot penetrate this level. The sellers, having successfully defended this price twice, are clearly dominating that specific point, creating a strong ceiling for an aggressive reversal to follow.</p>
        </>
    ),
  },
  {
    id: 'last-engulfing-top',
    title: 'Last Engulfing Top',
    emoji: '🔄',
    content: (
        <>
            <h3 className="text-2xl font-bold mb-4">Last Engulfing Top (Bearish Reversal) 🔄</h3>
            <p className="mb-4">A two-candle bearish reversal pattern that signifies a false signal from a bullish perspective. It occurs in an uptrend.</p>
            <h4 className="text-xl font-semibold mt-6 mb-2">Key Requirements</h4>
            <ol className="list-decimal pl-6 space-y-2 mb-4">
                <li>A small red (bearish) candle (a previous reversal attempt).</li>
                <li>A large green (bullish) candle that engulfs the first red candle, closing at a new high.</li>
                <li>The next candle (the confirmation) must immediately turn red and close significantly lower.</li>
            </ol>
            <h4 className="text-xl font-semibold mt-6 mb-2">Formation Psychology</h4>
            <p className="mb-4">This pattern is about recognizing a bull trap. The first red candle attempts a reversal, but the second large green candle seemingly crushes that hope, engulfing the red candle and closing at a new high, signaling to bulls that the uptrend is safely continuing. However, if the very next candle is a strong red bar, it means that the buying effort was the "last gasp" of the bulls. The market immediately reverses and leaves the bulls who entered on the engulfing signal trapped at the high. This pattern is exceptionally reliable because it represents the final exhaustion of the buyers.</p>
        </>
    ),
  },
  {
    id: 'thrusting-line-bearish',
    title: 'Thrusting Line (Bearish)',
    emoji: '⬇️',
    content: (
        <>
            <h3 className="text-2xl font-bold mb-4">Bearish Thrusting Line (Continuation) ⬇️</h3>
            <p className="mb-4">A two-candle pattern appearing in an uptrend that is usually considered a bearish continuation signal. It is formed by a long green (bullish) candle followed by a red (bearish) candle.</p>
            <h4 className="text-xl font-semibold mt-6 mb-2">Key Requirements</h4>
            <p className="mb-4">The red candle must open above the high of the first green candle (a gap up) but then close no lower than the midpoint of the first green candle's body.</p>
            <h4 className="text-xl font-semibold mt-6 mb-2">Formation Psychology</h4>
            <p className="mb-4">This pattern is the opposite of the Bullish Thrusting Line. Buyers dominate on the first day, and the gap up on the second day seems to confirm their control. However, aggressive selling immediately enters the market, pushing the price back down. The close above the midpoint suggests buyers are still present, but the failure to hold the morning's gains after a gap-up shows significant underlying selling pressure. This pattern is often interpreted as a weak sign for the bulls, suggesting the uptrend is stalled and that a definitive bearish move is imminent if the next day closes lower.</p>
        </>
    ),
  },
  {
    id: 'upside-gap-three-methods',
    title: 'Upside Gap Three Methods',
    emoji: '⬆️',
    content: (
        <>
            <h3 className="text-2xl font-bold mb-4">Upside Gap Three Methods (Continuation) ⬆️</h3>
            <p className="mb-4">This is a five-candle bearish continuation pattern that occurs during an existing uptrend. It signals that a strong rally is being followed by an inadequate correction, leading to a breakdown.</p>
            <h4 className="text-xl font-semibold mt-6 mb-2">Key Requirements</h4>
            <ol className="list-decimal pl-6 space-y-2 mb-4">
                <li>A long green candle (continuing the uptrend).</li>
                <li>A gap up where the next three candles form small, overlapping red (bearish) candles. These small red candles trade sideways, failing to close the gap or fall into the body of the first candle.</li>
                <li>A final long red candle that closes below the low of the first green candle.</li>
            </ol>
            <h4 className="text-xl font-semibold mt-6 mb-2">Formation Psychology</h4>
            <p className="mb-4">The first day creates a new high and a gap, confirming bullish strength. The next three days are a warning: the price doesn't drop back, but it can't move higher either (stalling). The final red candle's powerful move, closing below the low of the original strong green candle, is a complete breakdown. It proves that the sellers who were stalling the price have now decisively taken control, exploiting the buyer exhaustion revealed by the sideways "methods" phase.</p>
        </>
    ),
  },
   {
    id: 'deliberation',
    title: 'Deliberation',
    emoji: '🛑',
    content: (
        <>
            <h3 className="text-2xl font-bold mb-4">Deliberation 🛑</h3>
            <p className="mb-4">A three-candle bearish reversal pattern appearing after a strong rally. It signals a major shift from aggressive buying to careful indecision, leading to a break.</p>
            <h4 className="text-xl font-semibold mt-6 mb-2">Key Requirements</h4>
            <ol className="list-decimal pl-6 space-y-2 mb-4">
                <li>A large green (bullish) candle showing strong momentum.</li>
                <li>A second, smaller green candle that has a higher close than the first.</li>
                <li>A final, very small green or red body (like a spinning top) that opens and closes below the high of the second day.</li>
            </ol>
            <h4 className="text-xl font-semibold mt-6 mb-2">Formation Psychology</h4>
            <p className="mb-4">The first two candles confirm the uptrend, but the diminishing size of the bodies shows the buying enthusiasm is waning. The third tiny body, unable to push to a new high, is the deliberation—the market is pausing right at the peak because buyers lack conviction. This stall after a strong run often traps late buyers, setting up a sharp decline as sellers exploit the exhaustion. It is a sign of a final, failed push by the bulls.</p>
        </>
    ),
  },
  {
    id: 'side-by-side-white-lines-bearish',
    title: 'Side-by-Side White Lines (Bearish)',
    emoji: '📉',
    content: (
        <>
            <h3 className="text-2xl font-bold mb-4">Side-by-Side White Lines (Bearish Reversal) 📉</h3>
            <p className="mb-4">A three-candle bearish reversal pattern that is confusingly composed mostly of green (white) candles. It appears after a strong uptrend.</p>
            <h4 className="text-xl font-semibold mt-6 mb-2">Key Requirements</h4>
            <ol className="list-decimal pl-6 space-y-2 mb-4">
                <li>A long red (bearish) or green candle.</li>
                <li>A long green candle that gaps up.</li>
                <li>A second long green candle that has the same open price as the second green candle and is of similar size.</li>
            </ol>
            <h4 className="text-xl font-semibold mt-6 mb-2">Formation Psychology</h4>
            <p className="mb-4">The two identical, long green candles that form the "side-by-side white lines" signal that buyers are attempting a push, but the market is completely stalled at a high level. The fact that the price gaps up but then fails to show new follow-through strength on the third day (instead simply re-opening at the same high level) signals a lack of conviction at the high. This exhaustion, confirmed by the repeated high open, suggests the rally has run out of fuel, making it a reliable point for sellers to enter and reverse the trend.</p>
        </>
    ),
  },
  {
    id: 'bearish-kicking',
    title: 'Bearish Kicking',
    emoji: '👟',
    content: (
        <>
            <h3 className="text-2xl font-bold mb-4">Bearish Kicking 👟</h3>
            <p className="mb-4">A powerful two-candle bearish reversal pattern that signifies an extremely abrupt and violent shift in sentiment, essentially "kicking" the bulls out of the market. It is the opposite of the Bullish Kicking pattern. It is formed by a Marubozu White (long green candle with no shadows) followed by a Marubozu Black (long red candle with no shadows).</p>
            <h4 className="text-xl font-semibold mt-6 mb-2">Key Requirements</h4>
            <p className="mb-4">The second red candle must gap down significantly from the first green candle, and the two bodies should not overlap at all.</p>
            <h4 className="text-xl font-semibold mt-6 mb-2">Formation Psychology</h4>
            <p className="mb-4">The first day's Marubozu White demonstrates total bullish control. The gap down on the second day, followed by a Marubozu Black, is a shock to the market. It means that overnight, sentiment completely flipped, and sellers were so aggressive they prevented the price from ever trading into the previous day's bullish territory. This pattern, though rare, is an extremely strong signal because it shows an overwhelming force has entered the market and is acting with maximum conviction from open to close, typically associated with major, unexpected negative news or an institutional panic sell-off.</p>
        </>
    ),
  },
  {
    id: 'three-line-strike-bearish',
    title: 'Three-Line Strike (Bearish)',
    emoji: '⚔️',
    content: (
        <>
            <h3 className="text-2xl font-bold mb-4">Three-Line Strike (Bearish Continuation) ⚔️</h3>
            <p className="mb-4">A four-candle bearish continuation pattern that signals an extremely powerful and confirmed continuation of the downtrend.</p>
            <h4 className="text-xl font-semibold mt-6 mb-2">Key Requirements</h4>
            <ol className="list-decimal pl-6 space-y-2 mb-4">
                <li>Three consecutive red (bearish) candles, each closing lower, similar to the Three Black Crows, confirming the established downtrend.</li>
                <li>A final, fourth candle that is a long green (bullish) candle that opens below the close of the third red candle but then rallies strongly to close above the open of the first red candle.</li>
            </ol>
            <h4 className="text-xl font-semibold mt-6 mb-2">Formation Psychology</h4>
            <p className="mb-4">The first three candles solidify the bearish trend. The fourth green candle is the trap. It looks like a powerful reversal, convincing short-term traders to buy. However, this candle is viewed as a deep, failed counter-attack by the bulls. The price rally fails to hold, and the very existence of a long green candle is immediately interpreted as a liquidity grab before the next leg down. The overall structure confirms that the underlying force is bearish, and the deep reversal failed to change the trend, making the continuation signal extremely strong.</p>
        </>
    ),
  },
  {
    id: 'high-wave-candle-top',
    title: 'High Wave Candle (Top Reversal)',
    emoji: '🌊',
    content: (
        <>
            <h3 className="text-2xl font-bold mb-4">High Wave Candle (Bearish) 🌊</h3>
            <p className="mb-4">A single-candle pattern that signals maximum market confusion and a potential turning point, especially when it appears at the end of an uptrend. It is characterized by a small real body (red or green) and very long upper and lower shadows.</p>
            <h4 className="text-xl font-semibold mt-6 mb-2">Formation Psychology</h4>
            <p className="mb-4">This candle reflects extreme volatility and an internal battle where neither buyers nor sellers could secure a decisive victory. During the period, prices swung wildly high and low, demonstrating large forces pulling in both directions. The small final close shows that despite all the intra-period action, the price ultimately ended the period near where it began. In an uptrend, this shift from calm bullish direction to chaotic, two-sided fighting often signals that the long-term buying control is collapsing. It's an alert for a shift in volatility and an imminent trend change; the market is signaling exhaustion at the high, and traders must wait for the next candle to confirm the new bearish direction.</p>
        </>
    ),
  },
  {
    id: 'abandoned-baby-bearish',
    title: 'Abandoned Baby (Bearish)',
    emoji: '👶🏻',
    content: (
        <>
            <h3 className="text-2xl font-bold mb-4">Abandoned Baby (Bearish) 👶🏻</h3>
            <p className="mb-4">This is one of the rarest and most powerful three-candle bearish reversal patterns, the opposite of the Bullish Abandoned Baby. It appears at the peak of an uptrend.</p>
            <h4 className="text-xl font-semibold mt-6 mb-2">Key Requirements</h4>
            <ol className="list-decimal pl-6 space-y-2 mb-4">
                <li>A long green candle continuing a sharp uptrend.</li>
                <li>A Doji (or spinning top) that has gapped completely above the high of the first green candle, with its shadows not overlapping the shadows of the first candle (it is "abandoned" above the previous trading range).</li>
                <li>A long red candle that gaps completely below the low of the Doji (and does not overlap the Doji's shadows).</li>
            </ol>
            <h4 className="text-xl font-semibold mt-6 mb-2">Formation Psychology</h4>
            <p className="mb-4">This is a clear signal of euphoria followed by an immediate institutional reversal. The Doji is abandoned at an extreme high, showing that buying pressure ran out of steam, and the price essentially stopped trading for a moment in a vacuum. The massive gap down on the third day proves that large sellers entered the market overnight, completely bypassing the indecisive high and isolating the Doji. The Doji is left "abandoned" above the new, downward price action, confirming that the reversal is violent, aggressive, and highly reliable.</p>
        </>
    ),
  },
  {
    id: 'tower-top',
    title: 'Tower Top',
    emoji: '🗼',
    content: (
        <>
            <h3 className="text-2xl font-bold mb-4">Tower Top 🗼</h3>
            <p className="mb-4">A multi-candle (5+ bar) bearish reversal pattern that signifies a slow, rounded transition from an uptrend to a downtrend, often at a major market peak.</p>
            <h4 className="text-xl font-semibold mt-6 mb-2">Key Requirements</h4>
            <ol className="list-decimal pl-6 space-y-2 mb-4">
                <li>A long green candle at the end of the uptrend.</li>
                <li>A series of small-bodied, choppy candles (red and green) that trade sideways at a high level for several periods, forming the "top" of the tower.</li>
                <li>A final, long red candle that closes significantly lower, marking the sharp descent down the other side.</li>
            </ol>
            <h4 className="text-xl font-semibold mt-6 mb-2">Formation Psychology</h4>
            <p className="mb-4">The long green candle marks the final push. The ensuing small, choppy candles indicate a period of slow distribution, where large institutional sellers are gradually offloading positions without causing a price crash. The market is pausing, but beneath the surface, supply is building. The final long red candle breaks the consolidation, confirming that the accumulation of selling pressure has finally overwhelmed demand, and the price is now reversing from the "tower."</p>
        </>
    ),
  },
  {
    id: 'on-neck-line-bearish',
    title: 'On Neck Line (Bearish)',
    emoji: '💈',
    content: (
        <>
            <h3 className="text-2xl font-bold mb-4">On Neck Line (Bearish Continuation) 💈</h3>
            <p className="mb-4">A two-candle bearish continuation pattern that occurs during an existing downtrend. It consists of a long red (bearish) candle followed by a small green (bullish) candle.</p>
            <h4 className="text-xl font-semibold mt-6 mb-2">Key Requirements</h4>
            <p className="mb-4">The green candle must gap down and then rally just enough to close equal to or very slightly above the close of the preceding red candle. The two closes form a horizontal "neck line."</p>
            <h4 className="text-xl font-semibold mt-6 mb-2">Formation Psychology</h4>
            <p className="mb-4">The pattern shows that although buyers attempted a mild rally after the gap down, they were only able to push the price up to the previous period's low (the "neck line"). The sellers immediately defended that level, preventing any higher close. This pattern confirms that the bears are firmly holding their ground; the slight bullish push failed to overcome the resistance, signaling that the downtrend is likely to continue from this defended price level.</p>
        </>
    ),
  },
  {
    id: 'downside-gap-three-methods',
    title: 'Downside Gap Three Methods',
    emoji: '⬇️',
    content: (
        <>
            <h3 className="text-2xl font-bold mb-4">Downside Gap Three Methods (Continuation) ⬇️</h3>
            <p className="mb-4">This is a five-candle bearish continuation pattern that occurs during an existing downtrend. It signals that a strong decline is being followed by an inadequate correction, leading to a breakdown.</p>
            <h4 className="text-xl font-semibold mt-6 mb-2">Key Requirements</h4>
            <ol className="list-decimal pl-6 space-y-2 mb-4">
                <li>A long red candle (continuing the downtrend).</li>
                <li>A gap down where the next three candles form small, overlapping green (bullish) candles. These small green candles trade sideways, failing to close the gap or rise into the body of the first candle.</li>
                <li>A final long red candle that closes below the low of the first red candle.</li>
            </ol>
            <h4 className="text-xl font-semibold mt-6 mb-2">Formation Psychology</h4>
            <p className="mb-4">The first day creates a new low and a gap, confirming bearish strength. The next three days are a warning: the price doesn't rise back, but it can't move lower either (stalling). The final red candle's powerful move, closing below the low of the original strong red candle, is a complete continuation of the trend. It proves that the buyers who were attempting to halt the decline have now been decisively overcome, exploiting the seller exhaustion revealed by the sideways "methods" phase.</p>
        </>
    ),
  },
  {
    id: 'meeting-lines-bearish',
    title: 'Meeting Lines (Bearish)',
    emoji: '🤝',
    content: (
        <>
            <h3 className="text-2xl font-bold mb-4">Bearish Meeting Lines 🤝</h3>
            <p className="mb-4">A two-candle bearish reversal pattern found in an uptrend. It is the opposite of the Bullish Meeting Lines. It consists of a long green (bullish) candle followed by a long red (bearish) candle.</p>
            <h4 className="text-xl font-semibold mt-6 mb-2">Key Requirements</h4>
            <p className="mb-4">The red candle must open higher than the green candle's close (continuing the bullish momentum), but then decline sharply to close at the exact same price level as the close of the first green candle. The two closing prices "meet."</p>
            <h4 className="text-xl font-semibold mt-6 mb-2">Formation Psychology</h4>
            <p className="mb-4">The first day's close is a point of triumph for buyers. The market starts the next day even higher, tempting more buying. However, the subsequent, powerful red candle signals a successful and exact defense of the previous period's closing price. The fact that sellers could push the price all the way back down to that precise level, erasing all of the day's high price action, indicates a strong commitment to defending that price point. The meeting close establishes a clear, immediate resistance level that often acts as the launchpad for a reversal.</p>
        </>
    ),
  },
];