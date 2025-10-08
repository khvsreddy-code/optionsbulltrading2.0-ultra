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
  {
    id: 'bullish-kicking',
    title: 'Bullish Kicking',
    emoji: '👟',
    content: (
        <>
            <h3 className="text-2xl font-bold mb-4">Bullish Kicking 👟</h3>
            <p className="mb-4">A powerful two-candle reversal pattern that signifies an extremely abrupt and violent shift in sentiment, essentially "kicking" the bears out of the market. It is formed by a Marubozu Black (long red candle with no shadows) followed by a Marubozu White (long green candle with no shadows).</p>
            <h4 className="text-xl font-semibold mt-6 mb-2">Key Requirements</h4>
            <p className="mb-4">The second green candle must gap up significantly from the first red candle, and the two bodies should not overlap at all.</p>
            <h4 className="text-xl font-semibold mt-6 mb-2">Formation Psychology</h4>
            <p className="mb-4">The first day's Marubozu Black demonstrates total bearish control. The gap up on the second day, followed by a Marubozu White, is a shock to the market. It means that overnight, sentiment completely flipped, and buyers were so aggressive they prevented the price from ever trading into the previous day's bearish territory. This pattern, though rare, is an extremely strong signal because it shows an overwhelming force has entered the market and is acting with maximum conviction from open to close, typically associated with major, unexpected news or a strong "buy the dip" institutional surge.</p>
        </>
    ),
  },
  {
    id: 'concealing-baby-swallow',
    title: 'Concealing Baby Swallow',
    emoji: '👶',
    content: (
        <>
            <h3 className="text-2xl font-bold mb-4">Concealing Baby Swallow 👶</h3>
            <p className="mb-4">This is a highly reliable, four-candle bullish reversal pattern that only occurs during a deep, mature downtrend. It is made up of four consecutive black (red) candles.</p>
            <h4 className="text-xl font-semibold mt-6 mb-2">Key Requirements</h4>
            <ol className="list-decimal pl-6 space-y-2 mb-4">
                <li>The first two candles are long black Marubozu-like candles, continuing the steep descent.</li>
                <li>The third candle is a short black candle that gaps down (opens lower) but trades entirely within the high-low range of the second day (a Harami-like structure).</li>
                <li>The fourth candle is a small black candle that is also entirely contained within the body of the third candle (a "baby swallow").</li>
            </ol>
            <h4 className="text-xl font-semibold mt-6 mb-2">Formation Psychology</h4>
            <p className="mb-4">This is a pattern of exhaustion. The first two candles confirm extreme bearishness. The third day's small body within the previous day's range suggests selling is stalling. The final, tiny fourth day, completely contained, shows that sellers are now concealing their selling; they are afraid to push the price further, and volatility has collapsed. The downtrend is dead, and the concealed action signals a reversal is ready to spring from this compressed volatility.</p>
        </>
    ),
  },
  {
    id: 'separating-lines-bullish',
    title: 'Separating Lines (Bullish)',
    emoji: '➗',
    content: (
        <>
            <h3 className="text-2xl font-bold mb-4">Separating Lines (Bullish) ➗</h3>
            <p className="mb-4">This is a two-candle bullish continuation pattern that appears during an uptrend. It consists of a red (bearish) candle followed by a green (bullish) candle.</p>
            <h4 className="text-xl font-semibold mt-6 mb-2">Key Requirements</h4>
            <ol className="list-decimal pl-6 space-y-2 mb-4">
                <li>The red candle confirms a minor pullback in the existing uptrend.</li>
                <li>The green candle must open at the exact same price as the open of the red candle.</li>
                <li>The green candle then closes higher than the red candle's close.</li>
            </ol>
            <h4 className="text-xl font-semibold mt-6 mb-2">Formation Psychology</h4>
            <p className="mb-4">This pattern confirms the market's underlying bullish conviction. The red candle's drop is interpreted as temporary profit-taking within the uptrend. The next day, the price opens right back at the strong conviction level (the previous day's open), effectively separating the bears from the market. The ability of the market to instantly reject the red candle's bearish low and continue its rally from the exact previous point of strength proves that the buyers are committed, and the pullback is over.</p>
        </>
    ),
  },
  {
    id: 'on-neck-line',
    title: 'On Neck Line',
    emoji: '💈',
    content: (
        <>
            <h3 className="text-2xl font-bold mb-4">On Neck Line (Followed by Confirmation) 💈</h3>
            <p className="mb-4">This is a two-candle pattern that initially signals bearish weakness but often precedes a strong bullish reversal when followed by confirmation. It consists of a long red (bearish) candle followed by a small green (bullish) candle.</p>
            <h4 className="text-xl font-semibold mt-6 mb-2">Key Requirements</h4>
            <ol className="list-decimal pl-6 space-y-2 mb-4">
                <li>The green candle must gap down.</li>
                <li>The green candle's close price is equal to or very slightly above the low price of the preceding red candle. The two closes form a horizontal "neck line."</li>
            </ol>
            <h4 className="text-xl font-semibold mt-6 mb-2">Formation Psychology</h4>
            <p className="mb-4">The pattern shows that sellers attempted to push the price lower with the gap down, but the subsequent buying pressure was just strong enough to hold the line at the previous low. The sellers failed to make a new low. While traditionally considered a weak bearish continuation signal (because the close didn't fully penetrate the red body), its failure to break the low often acts as a pivot. In modern trading, if the next candle is a strong green one, the "On Neck" level is confirmed as a solid support level, transforming the pattern into a highly reliable reversal.</p>
        </>
    ),
  },
  {
    id: 'stick-sandwich-bullish',
    title: 'Stick Sandwich (Bullish)',
    emoji: '🥪',
    content: (
        <>
            <h3 className="text-2xl font-bold mb-4">Stick Sandwich (Bullish) 🥪</h3>
            <p className="mb-4">A rare three-candle bullish reversal pattern occurring after a downtrend. It is composed of a red candle (stick), followed by a green candle (sandwich filler), and then another red candle (stick).</p>
            <h4 className="text-xl font-semibold mt-6 mb-2">Key Requirements</h4>
            <ol className="list-decimal pl-6 space-y-2 mb-4">
                <li>The first and third (red) candles must close at the exact same price level.</li>
                <li>The middle (green) candle's body must be completely contained within the ranges of the two red candles.</li>
            </ol>
            <h4 className="text-xl font-semibold mt-6 mb-2">Formation Psychology</h4>
            <p className="mb-4">The pattern starts with a bearish candle and ends with a bearish candle, yet it is bullish. The two red candles closing at the identical low price is the key. This establishes a clear, undeniable support level—the "sandwich bottom." Despite the sellers trying twice (on Day 1 and Day 3), the price cannot penetrate this level. The buyers, having successfully defended this price twice, are clearly dominating that specific point, creating a strong floor for an aggressive reversal to follow.</p>
        </>
    ),
  },
  {
    id: 'mat-hold-bullish',
    title: 'Mat Hold (Bullish)',
    emoji: '🎗️',
    content: (
        <>
            <h3 className="text-2xl font-bold mb-4">Bullish Mat Hold 🎗️</h3>
            <p className="mb-4">The Mat Hold is a five-candle bullish continuation pattern that signals an extremely robust, persistent uptrend following a minor, corrective pause. It is one of the most reliable continuation patterns.</p>
            <h4 className="text-xl font-semibold mt-6 mb-2">Key Requirements</h4>
            <ol className="list-decimal pl-6 space-y-2 mb-4">
                <li>A long green candle that establishes the primary trend.</li>
                <li>Three small red (bearish) candles that follow, trading gently lower but remaining above the low of the first green candle. This forms the "mat."</li>
                <li>A final long green candle that opens above the close of the last red candle and closes at a new high for the pattern.</li>
            </ol>
            <h4 className="text-xl font-semibold mt-6 mb-2">Formation Psychology</h4>
            <p className="mb-4">The three red candles represent a healthy, controlled, and minor pullback or profit-taking. The price drifts sideways/slightly down, allowing weaker hands to exit, but the market never trades back to the starting point. The fifth candle's powerful move to a new high confirms that the initial bullish force has resumed with renewed conviction, easily overcoming the brief bearish correction. This pattern demonstrates strong underlying market health and is a signal to aggressively re-enter or hold long positions.</p>
        </>
    ),
  },
  {
    id: 'ladder-bottom',
    title: 'Ladder Bottom',
    emoji: '🪜',
    content: (
        <>
            <h3 className="text-2xl font-bold mb-4">Ladder Bottom 🪜</h3>
            <p className="mb-4">A five-candle bullish reversal pattern that appears after a pronounced downtrend. It is a rare and highly reliable pattern characterized by a change in the closing dynamics.</p>
            <h4 className="text-xl font-semibold mt-6 mb-2">Key Requirements</h4>
            <ol className="list-decimal pl-6 space-y-2 mb-4">
                <li>Three consecutive long red (bearish) candles with small or no lower shadows (showing strong selling).</li>
                <li>A fourth red candle that forms with a long upper shadow and a small or no real body (a shooting star-like appearance, but red).</li>
                <li>A final green candle that gaps up (opens above the body of the fourth candle) and closes significantly higher.</li>
            </ol>
            <h4 className="text-xl font-semibold mt-6 mb-2">Formation Psychology</h4>
            <p className="mb-4">The first three days confirm the bearishness. The fourth day is the pivot: the long upper shadow shows a brief, unsuccessful attempt by buyers to rally, but the strong rejection of the lows still signals a potential shift. The fifth day's gap up and strong green candle acts as a final, decisive "breakaway," proving that the brief buying attempt on Day 4 has now escalated into a full-scale bullish reversal. The entire structure of the first four candles represents the market descending a ladder; the fifth candle represents the forceful launch away from the bottom rung.</p>
        </>
    ),
  },
  {
    id: 'abandoned-baby-bullish',
    title: 'Abandoned Baby (Bullish)',
    emoji: '👶🏻',
    content: (
        <>
            <h3 className="text-2xl font-bold mb-4">Abandoned Baby (Bullish) 👶🏻</h3>
            <p className="mb-4">This is one of the rarest and most powerful three-candle bullish reversal patterns, considered an extreme version of the Morning Star.</p>
            <h4 className="text-xl font-semibold mt-6 mb-2">Key Requirements</h4>
            <ol className="list-decimal pl-6 space-y-2 mb-4">
                <li>A long red candle continuing a sharp downtrend.</li>
                <li>A Doji (or spinning top) that has gapped completely below the low of the first red candle, with its shadows not overlapping the shadows of the first candle (it is "abandoned" below the previous trading range).</li>
                <li>A long green candle that gaps completely above the high of the Doji (and does not overlap the Doji's shadows).</li>
            </ol>
            <h4 className="text-xl font-semibold mt-6 mb-2">Formation Psychology</h4>
            <p className="mb-4">This is a clear signal of panic followed by an immediate institutional reversal. The Doji is abandoned at an extreme low, showing that selling pressure ran out of steam, and the price essentially stopped trading for a moment in a vacuum. The massive gap up on the third day proves that large buyers entered the market overnight, completely bypassing the indecisive low and isolating the Doji. The Doji is left "abandoned" below the new, upward price action, confirming that the reversal is violent, aggressive, and highly reliable.</p>
        </>
    ),
  },
  {
    id: 'bullish-belt-hold',
    title: 'Bullish Belt Hold (Yorikiri)',
    emoji: '🥋',
    content: (
        <>
            <h3 className="text-2xl font-bold mb-4">Bullish Belt Hold (Yorikiri) 🥋</h3>
            <p className="mb-4">A strong single-candle bullish reversal pattern that appears during a downtrend. It is a variant of the White Marubozu.</p>
            <h4 className="text-xl font-semibold mt-6 mb-2">Key Requirements</h4>
            <p className="mb-4">The candle is a long green body that has no lower shadow (the Open is the Low of the period) and closes near its high. Crucially, it must open below the previous day's close (gapping down) and then immediately rally.</p>
            <h4 className="text-xl font-semibold mt-6 mb-2">Formation Psychology</h4>
            <p className="mb-4">This pattern represents the moment the bulls "grab the belt" of the market (the term is from Sumo wrestling, meaning to seize the initiative). The market opens lower, potentially scaring out remaining sellers, but aggressive buying immediately enters the market, driving the price up from the very first moment and preventing it from ever trading lower. This strong, relentless single-period control, especially after a period of bearishness, signifies that the low has been decisively rejected.</p>
        </>
    ),
  },
  {
    id: 'thrusting-line',
    title: 'Thrusting Line',
    emoji: '↗️',
    content: (
        <>
            <h3 className="text-2xl font-bold mb-4">Thrusting Line (Bullish Reversal) ↗️</h3>
            <p className="mb-4">A two-candle pattern appearing in a downtrend. It is formed by a long red (bearish) candle followed by a green (bullish) candle.</p>
            <h4 className="text-xl font-semibold mt-6 mb-2">Key Requirements</h4>
            <p className="mb-4">The green candle must open below the low of the first red candle (a gap down) and then close no higher than the midpoint of the first red candle's body.</p>
            <h4 className="text-xl font-semibold mt-6 mb-2">Formation Psychology</h4>
            <p className="mb-4">Similar to the Piercing Pattern, sellers dominate on the first day, and their control seems confirmed by the gap down on the second day. However, aggressive buying immediately enters the market, pushing the price back up. Unlike the Piercing Pattern (which closes above the midpoint), the Thrusting Line only closes near or just below the midpoint. This shows the bulls are strong enough to prevent a total bearish day but not strong enough to completely dominate the session. While traditionally a weak bullish signal (or even a pause signal), its failure to continue the downtrend after a gap down is interpreted as a loss of momentum for the bears. A close right on the midpoint is a more decisive sign of equilibrium, often preceding a strong reversal day.</p>
        </>
    ),
  },
  {
    id: 'meeting-lines-bullish',
    title: 'Meeting Lines (Bullish)',
    emoji: '🤝',
    content: (
        <>
            <h3 className="text-2xl font-bold mb-4">Bullish Meeting Lines 🤝</h3>
            <p className="mb-4">A two-candle bullish reversal pattern found in a downtrend. It consists of a long red (bearish) candle followed by a long green (bullish) candle.</p>
            <h4 className="text-xl font-semibold mt-6 mb-2">Key Requirements</h4>
            <p className="mb-4">The green candle must open lower than the red candle's close (continuing the bearish momentum), but then rally sharply to close at the exact same price level as the close of the first red candle. The two closing prices "meet."</p>
            <h4 className="text-xl font-semibold mt-6 mb-2">Formation Psychology</h4>
            <p className="mb-4">The first day's close is a point of concern for buyers. The market starts the next day even lower, tempting more selling. However, the subsequent, powerful green candle signals a successful and exact defense of the previous period's closing price. The fact that buyers could push the price all the way back up to that precise level, erasing all of the day's losses, indicates a strong commitment to defending that price point. The meeting close establishes a clear, immediate support level that often acts as the launchpad for a reversal.</p>
        </>
    ),
  },
  {
    id: 'three-outside-up',
    title: 'Three Outside Up',
    emoji: '⬆️⬆️⬆️',
    content: (
        <>
            <h3 className="text-2xl font-bold mb-4">Three Outside Up (Reversal) ⬆️⬆️⬆️</h3>
            <p className="mb-4">A powerful three-candle bullish reversal pattern that confirms the Bullish Engulfing formation. It is one of the most reliable multi-candle signals.</p>
            <h4 className="text-xl font-semibold mt-6 mb-2">Key Requirements</h4>
            <ol className="list-decimal pl-6 space-y-2 mb-4">
                <li>A small red (bearish) candle.</li>
                <li>A large green candle that completely engulfs the body of the first candle (forming the Bullish Engulfing pattern).</li>
                <li>A final green candle that closes higher than the high of the second (engulfing) candle.</li>
            </ol>
            <h4 className="text-xl font-semibold mt-6 mb-2">Formation Psychology</h4>
            <p className="mb-4">The first two candles signal the complete shift in control from bears to bulls. The third, final green candle provides the unquestionable confirmation. By closing at a new high, the buyers prove that their dominance was not a one-day anomaly but a genuine, committed reversal of the trend. This pattern is highly valued because it shows both the initial aggressive reversal (engulfing) and the follow-through strength (the higher close), significantly reducing the risk of a false signal.</p>
        </>
    ),
  },
  {
    id: 'high-wave-candle',
    title: 'High Wave Candle',
    emoji: '🌊',
    content: (
        <>
            <h3 className="text-2xl font-bold mb-4">High Wave Candle (Bottom Reversal) 🌊</h3>
            <p className="mb-4">A single-candle pattern that signals maximum market confusion and a potential turning point, especially when it appears at the end of a downtrend. It is characterized by a small real body (red or green) and very long upper and lower shadows.</p>
            <h4 className="text-xl font-semibold mt-6 mb-2">Formation Psychology</h4>
            <p className="mb-4">This candle reflects extreme volatility and an internal battle where neither buyers nor sellers could secure a decisive victory. During the period, prices swung wildly high and low, demonstrating large forces pulling in both directions. The small final close, however, shows that despite all the intra-period action, the price ultimately ended the period near where it began. In a downtrend, this shift from calm bearish direction to chaotic, two-sided fighting often signals that the long-term selling control is collapsing. It's an alert for a shift in volatility and an imminent trend change; traders must wait for the next candle to confirm the new direction.</p>
        </>
    ),
  },
  {
    id: 'short-line-bullish',
    title: 'Short Line (Bullish)',
    emoji: '➖',
    content: (
        <>
            <h3 className="text-2xl font-bold mb-4">Short Line (Bullish)</h3>
            <p className="mb-4">A subtle single-candle continuation pattern that confirms underlying bullish stability within an existing uptrend.</p>
            <h4 className="text-xl font-semibold mt-6 mb-2">Key Requirements</h4>
            <p className="mb-4">It is a small green candle with a short body, often found after a strong upward movement. The entire candle (high and low) should stay within the body of the preceding large green candle.</p>
            <h4 className="text-xl font-semibold mt-6 mb-2">Formation Psychology</h4>
            <p className="mb-4">After a strong rally, the market needs a breather. The small green body shows that buyers are still in control (the candle is green) but are taking a moment to consolidate their gains. The fact that the price never fell outside the range of the previous day's massive rally shows that strong, committed buyers are defending the previous day's gains, preventing any significant retracement. It suggests a pause before the next leg up in the uptrend, signaling quiet strength and continued bullish resolve.</p>
        </>
    ),
  },
  {
    id: 'matching-lows',
    title: 'Matching Lows',
    emoji: '⚖️',
    content: (
        <>
            <h3 className="text-2xl font-bold mb-4">Matching Lows (Bullish Reversal) ⚖️</h3>
            <p className="mb-4">A two-candle bullish reversal pattern that is essentially a variant of the Tweezer Bottom. It occurs at the bottom of a downtrend.</p>
            <h4 className="text-xl font-semibold mt-6 mb-2">Key Requirements</h4>
            <ol className="list-decimal pl-6 space-y-2 mb-4">
                <li>The first candle is a long red (bearish) candle.</li>
                <li>The second candle is also a red (bearish) candle, but it has the exact same low price as the first candle. The bodies themselves do not need to be the same size.</li>
            </ol>
            <h4 className="text-xl font-semibold mt-6 mb-2">Formation Psychology</h4>
            <p className="mb-4">The key is the shared, identical low price. While both days are bearish in their closing action, the failure of the market on the second day to push the price even a single tick lower than the previous day's low signifies an absolute price floor. This shows an incredibly specific and firm point where buying demand has entirely absorbed the selling pressure. The shared low acts as a concrete line of defense, signaling that the downtrend has found its psychological or technical boundary. Confirmation from the next candle, closing green, is highly recommended for trade entry.</p>
        </>
    ),
  },
  {
    id: 'upside-gap-two-crows',
    title: 'Upside Gap Two Crows',
    emoji: '🐦‍🐦‍',
    content: (
        <>
            <h3 className="text-2xl font-bold mb-4">Upside Gap Two Crows (Bullish Reversal) 🐦‍🐦‍</h3>
            <p className="mb-4">This is a highly specialized, three-candle bullish reversal pattern that is confusingly named, as it looks bearish but signals an imminent bullish reversal. It typically appears after a period of consolidation following a downtrend.</p>
            <h4 className="text-xl font-semibold mt-6 mb-2">Key Requirements</h4>
            <ol className="list-decimal pl-6 space-y-2 mb-4">
                <li>A long green (bullish) candle setting a new high.</li>
                <li>A small black (bearish) candle that gaps up from the first candle's body.</li>
                <li>A second black (bearish) candle that is also small, opens above the first black candle, but closes above the close of the first green candle.</li>
            </ol>
            <h4 className="text-xl font-semibold mt-6 mb-2">Formation Psychology</h4>
            <p className="mb-4">The initial green candle suggests a rally. The two small black candles that gap up show profit-taking or minor bearish entries, but the fact that they gapped up and the final close remains high (above the initial green candle's close) shows bulls are firmly defending the gap. Bears managed to enter (two black days), but they failed to push the price into the gap or below the initial starting point. This inability to drive the price lower, despite two days of selling, traps the bears, leading to an aggressive bullish move as the price resumes its trend.</p>
        </>
    ),
  },
  {
    id: 'bullish-hook',
    title: 'Bullish Hook',
    emoji: '🎣',
    content: (
        <>
            <h3 className="text-2xl font-bold mb-4">Bullish Hook (Continuation) 🎣</h3>
            <p className="mb-4">A two-candle bullish continuation pattern that occurs during an existing uptrend. It is a sign of a minimal, healthy pullback and immediate resumption of the trend.</p>
            <h4 className="text-xl font-semibold mt-6 mb-2">Key Requirements</h4>
            <ol className="list-decimal pl-6 space-y-2 mb-4">
                <li>A small red (bearish) candle with a low close.</li>
                <li>A green (bullish) candle that follows. Crucially, the green candle's low price is higher than the red candle's low price, but the green candle's close price is lower than the red candle's close price. The candle bodies effectively overlap, giving the appearance of a temporary hook.</li>
            </ol>
            <h4 className="text-xl font-semibold mt-6 mb-2">Formation Psychology</h4>
            <p className="mb-4">The small red candle represents mild profit-taking or minor selling. The green candle that follows has a higher low, which is the key bullish signal, as it shows buyers did not allow the price to fall as low as the previous day. Even though the price closed slightly lower, the rising low indicates underlying strength and buyer impatience. This is a very short and shallow correction, signaling that the uptrend is pausing and ready to immediately continue higher.</p>
        </>
    ),
  },
  {
    id: 'last-engulfing-bottom',
    title: 'Last Engulfing Bottom',
    emoji: '🔄',
    content: (
        <>
            <h3 className="text-2xl font-bold mb-4">Last Engulfing Bottom (Bullish Reversal) 🔄</h3>
            <p className="mb-4">A two-candle bullish reversal pattern that signifies a false signal from a bearish perspective. It occurs in a downtrend.</p>
            <h4 className="text-xl font-semibold mt-6 mb-2">Key Requirements</h4>
            <ol className="list-decimal pl-6 space-y-2 mb-4">
                <li>A small green (bullish) candle (a previous reversal attempt).</li>
                <li>A large red (bearish) candle that engulfs the first green candle, closing at a new low.</li>
                <li>The next candle (the confirmation) must immediately turn green and close significantly higher.</li>
            </ol>
            <h4 className="text-xl font-semibold mt-6 mb-2">Formation Psychology</h4>
            <p className="mb-4">This pattern is about recognizing a bear trap. The first green candle attempts a reversal, but the second large red candle seemingly crushes that hope, engulfing the green candle and closing at a new low, signaling to bears that the downtrend is safely continuing. However, if the very next candle is a strong green bar, it means that the selling effort was the "last gasp" of the bears. The market immediately reverses and leaves the bears who entered on the engulfing signal trapped at the low. This pattern is exceptionally reliable because it represents the final exhaustion of the sellers.</p>
        </>
    ),
  },
];