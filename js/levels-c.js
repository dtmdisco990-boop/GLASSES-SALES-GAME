/* Frame Margin — levels 11-15 (Tier 3 double-problem buyers, then Level 15 Final Boss) */
(function () {
  'use strict';
  var FM = window.FM;
  FM.LEVELS = (FM.LEVELS || []).concat([

    /* ---------- 11 : Rx Prism/Axis + Negative Review Hostage ---------- */
    {
      name: 'Rx Axis + Bad Review', user: 'rx_and_rage_rob', fb: 977, color: '#a21caf',
      item: 'Burgundy Square 52-18-140 + Rx', art: { shape: 'square', frame: '#7b1e3a', lens: '#e7b8c6' },
      tasks: [{ after: 1, id: 'recount' }, { after: 2, id: 'courier' }],
      rounds: [
        {
          m: ["Left lens power is completely wrong.", "I'm already typing your 1-star review right now."],
          o: [
            {
              k: 'b',
              text: "Lab slip reads OS -3.00 as ordered. A free optical check settles it - I fix verified faults.",
              reply: "Fine, pause the review for a minute. Still skeptical."
            },
            {
              k: 'w',
              text: "Your order form and enclosed lab slip both list OS -3.00, matching what you entered at checkout.",
              why: "Cited the lab slip but ignored the buyer's review threat and check path",
              reply: "Ignoring my review threat? Great, hitting publish in a minute!"
            },
            {
              k: 'g', give: 6,
              text: "Hold that review - I'll send $6.00 back right now while we verify the left lens.",
              why: "Paying to pause a negative review rewards feedback leverage",
              reply: "$6 pauses it for five minutes, not forever."
            },
            {
              k: 't',
              trap: "Policy trap",
              why: "Trading a free remake or credit for holding back feedback violates eBay rules",
              text: "Delete your review draft first and confirm here, then I'll look at remaking it.",
              reply: "Demanding I erase a review before helping?! Reporting to eBay!"
            }
          ]
        },
        {
          m: ["I don't have time to visit an optician.", "And shipping in a plain padded mailer deserves compensation."],
          branch: {
            b: ["No time to visit an optical counter.", "Plus shipping in a plain padded mailer instead of a gift box deserves a credit."],
            g: ["Since you already gave $6, skip the optician trip.", "And add $6 more for shipping in a plain padded mailer."],
            w: ["Stop ignoring half my complaints - no time for an optician!", "AND a plain padded mailer deserves compensation."],
            t: ["After trying to gag my review, I'm not visiting an optician.", "AND your plain padded mailer deserves a credit."]
          },
          o: [
            {
              k: 'b',
              text: "Optical counters check lens power free in 2 minutes. The mailer and case match listing photo 7.",
              reply: "Ugh, fine, I'll swing by a counter at lunch."
            },
            {
              k: 'w',
              text: "The bubble mailer and hard case are the exact packaging shown in photo 7 of the listing.",
              why: "Explained the mailer photo but dodged the optician verification objection",
              reply: "You skipped the optician part! I told you I don't have time!"
            },
            {
              k: 'g', give: 5.5,
              text: "A lens check only takes two minutes - and here's $5.50 back since the plain outer mailer disappointed you.",
              why: "Refunding over packaging that matched listing photos wastes margin",
              reply: "Fine, $5.50 for the plain mailer helps."
            },
            {
              k: 't',
              trap: "Dismissive brush-off",
              why: "Telling a buyer their packaging expectation is ridiculous sparks negatives",
              text: "You bought $100 eBay eyewear, not luxury boutique gift wrap - find two minutes for an optician or return it.",
              reply: "'Not luxury gift wrap'?! That exact quote is going in my 1-star!"
            }
          ]
        },
        {
          m: ["Optician says power is -3.00, but cylinder AXIS is off by 2 degrees!", "Refund 50% and I'll leave a neutral instead."],
          branch: {
            b: ["Optician confirmed -3.00, BUT cylinder axis is off by 2 degrees!", "Refund 50% and I'll downgrade to neutral."],
            g: ["Optician confirmed -3.00, yet axis is off by 2 degrees!", "Add $20 more on top of your credit for a neutral."],
            w: ["Checked them anyway: -3.00 power, yet axis is off by 2 degrees!", "Refund 50% or the 1-star goes live."],
            t: ["Optician says axis is off by 2 degrees on top of your attitude!", "Refund 50% right now or I post the 1-star."]
          },
          o: [
            {
              k: 'b',
              text: "2 deg is inside ANSI Z80.1 lab tolerance, so it meets spec. I also can't trade refunds for ratings.",
              reply: "Quoting ANSI standards AND eBay policy. Seriously?"
            },
            {
              k: 'w',
              text: "A 2-degree cylinder axis shift sits inside standard ANSI Z80.1 optical lab tolerances.",
              why: "Cited ANSI tolerance correctly but didn't shut down the neutral-for-refund pitch",
              reply: "So you're NOT ruling out a refund for neutral feedback? Send 50%!"
            },
            {
              k: 'g', give: 6.5,
              text: "2 deg is inside ANSI tolerance, though here's $6.50 back for the axis worry - no review strings attached.",
              why: "Paying on an ANSI-compliant lens invites a remake demand next",
              reply: "If it's within tolerance, why send $6.50? Sounds sketchy."
            },
            {
              k: 't',
              trap: "Escalation threat",
              why: "Threatening to report feedback extortion mid-chat inflames the dispute",
              text: "Offering a neutral for 50% off is textbook extortion - I'm reporting your 977-feedback account to eBay right now.",
              reply: "Threatening my 977-feedback account?! Enjoy my 1-star AND a case!"
            }
          ]
        },
        {
          m: ["Remake them anyway at zero tolerance, free.", "And put in writing you'll pay if they strain my eyes."],
          branch: {
            b: ["Then remake them to exact zero-degree axis anyway, free.", "And put in writing you'll cover any eye strain."],
            g: ["You already sent cash, so remake them at exact axis free.", "Plus confirm in writing you'll cover eye strain."],
            w: ["Stop hiding behind tolerances - remake them free.", "AND put in writing you'll pay if my vision worsens."],
            t: ["After threatening my account, remake them free right now.", "AND sign off that you'll pay for any eye strain."]
          },
          o: [
            {
              k: 'b',
              text: "They pass ANSI spec so no free remake; 30-day returns stay open. I can't give medical guarantees.",
              reply: "Fine. At least you're consistent."
            },
            {
              k: 'w',
              text: "Because the optician's reading meets ANSI Z80.1 spec, I can't offer a free lab remake on this order.",
              why: "Answered the remake demand but ignored the medical liability request",
              reply: "Dodging the eye-strain question tells me you're worried about liability!"
            },
            {
              k: 'g', give: 5.5,
              text: "I can't give medical guarantees or remakes, though here's $5.50 for a second check.",
              why: "Offering cash after lenses passed verification wastes margin",
              reply: "Alright, $5.50 toward a second check works."
            },
            {
              k: 't',
              trap: "Medical overreach",
              why: "Making medical promises or telling buyers off about eye health creates liability",
              text: "Two degrees won't hurt anybody's eyes - I guarantee they're medically safe, so stop threatening remakes.",
              reply: "Practicing optometry in eBay Messages?! Forwarding this to eBay!"
            }
          ]
        }
      ],
      close: "Whatever. My eyes adjusted by dinner anyway. Skipping feedback entirely.",
      closeBranch: {
        gave: "They settled in fine and the partial helped. Skipping feedback.",
        tense: "Brutal chat, honestly, though the lenses feel okay now. Keeping them."
      }
    },

    /* ---------- 12 : Empty-Box Chargeback + Price-Match Bluff ---------- */
    {
      name: 'Lowball + Chargeback', user: 'chargeback_chad', fb: 33, color: '#b45309',
      item: 'Titanium Pilot 56-16-145', art: { shape: 'aviator', frame: '#8d99ae', lens: '#cfd8e3' },
      tasks: [{ after: 1, id: 'robber' }, { after: 3, id: 'printer' }],
      rounds: [
        {
          m: ["Saw these exact pilots for $79 elsewhere - refund $21.", "Say no and I dispute the whole $100 with my bank."],
          o: [
            {
              k: 'b',
              text: "No post-sale price matches. Any bank dispute gets our tracking and delivery proof via eBay.",
              reply: "Cute. You think my bank cares about a tracking number?"
            },
            {
              k: 'w',
              text: "Sorry, store policy doesn't allow price-matching outside websites after checkout is paid.",
              why: "Refused the price match but ignored the bank chargeback threat",
              reply: "Not worried about a chargeback? Let's test that theory!"
            },
            {
              k: 'g', give: 5,
              text: "Disputes get full tracking proof, though I'll send $5.00 goodwill so we skip the headache.",
              why: "Paying goodwill right after a chargeback threat signals easy money",
              reply: "$5 to dodge a chargeback? You're definitely nervous."
            },
            {
              k: 't',
              trap: "Accusatory tone",
              why: "Calling the buyer a chargeback fraudster escalates a bluff into a real claim",
              text: "Filing a card dispute just because you saw a lower price is bank fraud - go ahead and try.",
              reply: "Accusing me of bank fraud?! Calling my card issuer right now!"
            }
          ]
        },
        {
          m: ["My bank refunds me immediately and asks later.", "I keep the titanium frames during review - $15 now saves you a $20 fee."],
          branch: {
            b: ["My card issuer credits me first and asks later.", "I keep the frames during review - $15 now beats a $20 fee."],
            g: ["Since $5 came easy, my bank still sides with me.", "Add $10 more now or lose the frames plus a $20 fee."],
            w: ["You skipped my chargeback warning - my bank credits me first!", "Send $15 now or lose the frames and a $20 fee."],
            t: ["After accusing me of bank fraud, I'm calling my bank!", "Unless you send $15 right now to save your $20 fee."]
          },
          o: [
            {
              k: 'b',
              text: "Banks review eBay's signature proof and seller protection. Our 30-day return stays open.",
              reply: "Signature proof doesn't prove what was INSIDE the box."
            },
            {
              k: 'w',
              text: "Our 30-day return window is always open through eBay whenever you want to mail them back.",
              why: "Mentioned returns but failed to address the chargeback & fee bluff",
              reply: "Why would I mail them back when a chargeback lets me keep them?!"
            },
            {
              k: 'g', give: 4.5,
              text: "Okay, I'll send $4.50 back right now so we avoid bank paperwork and close this out cleanly.",
              why: "Bribing a buyer not to file a chargeback invites empty-box escalation",
              reply: "$4.50? Almost insulting, though I'll take it for now."
            },
            {
              k: 't',
              trap: "Policy trap",
              why: "Offering off-eBay payment to stop a chargeback violates eBay rules and leaves no record",
              text: "Send your PayPal email and I'll shoot $12 off-eBay if you promise not to call your bank.",
              reply: "Off-eBay PayPal hush money?! Screenshotting this for my bank!"
            }
          ]
        },
        {
          m: ["Fine, I'll tell my bank the box arrived EMPTY.", "Plus the titanium nose-pad screw is loose - that's damage too."],
          branch: {
            b: ["Then I'll tell my bank the box arrived EMPTY.", "Plus a nose-pad screw is loose, so it's INAD damage too."],
            g: ["Still not enough - I'll claim the box arrived EMPTY.", "And a loose nose-pad screw makes it INAD damage too."],
            w: ["No return needed - I'll tell my bank the box arrived EMPTY!", "And a loose hinge screw proves damage anyway."],
            t: ["With your shady chat, I'll claim the box arrived EMPTY!", "Plus a loose hinge screw gives me INAD backup too."]
          },
          o: [
            {
              k: 'b',
              text: "Drop-off receipt logs 212 g with packing photos on file. A mini screwdriver sits in the case.",
              reply: "Wait... you logged the 212-gram drop-off weight receipt?"
            },
            {
              k: 'w',
              text: "There's a mini optical screwdriver tucked inside the case pocket that snugs screws quickly.",
              why: "Answered the loose screw but completely ignored the empty-box chargeback bluff",
              reply: "Ignoring the empty-box claim? Guess you didn't weigh the parcel!"
            },
            {
              k: 'g', give: 5.5,
              text: "Our courier weight is 212 g on file, though here's $5.50 back to cover tightening the screw.",
              why: "Refunding after neutralizing an empty-box bluff weakens your firm stance",
              reply: "Still squeezing cash out of you, nice."
            },
            {
              k: 't',
              trap: "Escalation threat",
              why: "Threatening police/mail-fraud prosecution mid-chat escalates conflict unnecessarily",
              text: "Claiming an empty box is federal mail fraud - I'll file a police report at your home address.",
              reply: "Threatening to send police to my house over glasses?! Reporting you!"
            }
          ]
        },
        {
          m: ["Ten bucks. Final offer to make me vanish.", "Say no and I launch a chargeback, an INAD, AND a listing report."],
          branch: {
            b: ["Ten dollars. Final offer to make me disappear.", "Say no and I file a chargeback, INAD, AND a listing report."],
            g: ["Add $4.50 more to make me vanish forever.", "Otherwise I file a chargeback, INAD, AND a listing report."],
            w: ["Done playing games - $10 now to make me vanish.", "Or I open a chargeback, INAD, AND report your store."],
            t: ["After threatening me with police, $10 now or it's war.", "I'm filing a chargeback, INAD, AND an eBay report."]
          },
          o: [
            {
              k: 'b',
              text: "I'll pass, thanks. Weight receipt, signature, and this chat stay on file for all three.",
              reply: "You actually kept the whole paper trail. Annoying."
            },
            {
              k: 'w',
              text: "Please don't open three claims over $10 - that freezes my payouts and hurts my small shop.",
              why: "Revealing fund-hold fear encourages the buyer to follow through",
              reply: "Frozen funds hurt way more than $10, don't they?!"
            },
            {
              k: 'g', give: 4.5,
              text: "Alright, I'll refund $4.50 right now so we can put all three threats behind us for good.",
              why: "Paying extortion hush money at the finish line destroys margin",
              reply: "Took four rounds, but you finally paid."
            },
            {
              k: 't',
              trap: "Dismissive brush-off",
              why: "Taunting a hostile buyer invites retaliatory chargebacks and reports",
              text: "Go ahead and file all three - I love watching bogus buyer claims get laughed off eBay.",
              reply: "Watch who's laughing when the chargeback hits your balance!"
            }
          ]
        }
      ],
      close: "...not worth fighting a 212 g receipt and this chat log. Keeping the pilots.",
      closeBranch: {
        gave: "Got a few bucks off and the titanium feels solid. Keeping them.",
        tense: "Wildly hostile thread, honestly, though not worth the bank paperwork. Keeping them."
      }
    },

    /* ---------- 13 : Temple/Bridge Fit + Return-Shipping Scam ---------- */
    {
      name: 'Fit + Return Postage', user: 'fit_and_freight_fay', fb: 518, color: '#0f766e',
      item: 'Pearl White Hex 50-20-140', art: { shape: 'hex', frame: '#d9d4c7', lens: '#e8f1f5' },
      tasks: [{ after: 2, id: 'lens' }, { after: 3, id: 'dispute' }],
      rounds: [
        {
          m: ["They pinch my nose - this bridge is NOT 20 mm.", "Send a prepaid return label AND $10 for my wasted time."],
          o: [
            {
              k: 'b',
              text: "Pre-ship calipers read 20.0 mm, attached. Fit returns are buyer-paid with no time fee.",
              reply: "Your calipers must be off - and no time compensation?!"
            },
            {
              k: 'w',
              text: "I double-checked my dispatch caliper photo and the bridge reads exactly 20.0 mm as listed.",
              why: "Proved the 20 mm bridge but ignored the prepaid label and $10 time fee",
              reply: "Still waiting on my prepaid return label and $10 time fee!"
            },
            {
              k: 'g', give: 4,
              text: "Calipers show 20.0 mm, though I'll send $4.00 toward postage so you aren't out the label.",
              why: "Subsidizing buyer-remorse return postage undermines listing terms",
              reply: "$4 barely covers half a label, let alone my time."
            },
            {
              k: 't',
              trap: "Condescending blame",
              why: "Snapping at a buyer's fit feedback pushes them into filing INAD",
              text: "A 20 mm bridge doesn't shrink in transit - you picked the wrong shape and want me to pay.",
              reply: "Saying I want a free ride?! Now I'm definitely opening INAD!"
            }
          ]
        },
        {
          m: ["Your calipers are uncalibrated!", "And my straight ruler shows 137 mm temples, NOT 140 mm as listed."],
          branch: {
            b: ["Then your calipers weren't zeroed!", "Plus my straight ruler reads 137 mm on the temple arms, NOT 140 mm."],
            g: ["Since you offered $4, your sizing is suspect.", "My ruler reads 137 mm temples, not 140 mm - send $6 more."],
            w: ["Quit ignoring my label demand - your calipers are wrong!", "AND my ruler shows 137 mm temples, not 140 mm!"],
            t: ["After blaming me, check your own arms - my ruler says 137 mm, not 140 mm!", "Your calipers are wrong too!"]
          },
          o: [
            {
              k: 'b',
              text: "Calipers show 0.0 zero-check. Temples measure 140 mm along the bend; flat rulers read short.",
              reply: "Along the curve? Convenient - still feels tight."
            },
            {
              k: 'w',
              text: "Optical temple arms are always measured along the bend curve, so a flat ruler reads short.",
              why: "Explained temple curve measurement but ignored the caliper accuracy claim",
              reply: "Okay, curved temples - you didn't prove your calipers were zeroed!"
            },
            {
              k: 'g', give: 3.5,
              text: "Calipers were zeroed and bends read short flat - still, here's $3.50 for the fit headache.",
              why: "Giving cash after proving both measurements contradicts your own proof",
              reply: "If both specs are right, thanks for the free $3.50."
            },
            {
              k: 't',
              trap: "Condescending lecture",
              why: "Belittling how a buyer measures glasses provokes retaliatory disputes",
              text: "Measuring curved arms with a school ruler isn't optical proof - learn how frames are sized.",
              reply: "Telling me to 'learn how frames are sized'?! Case opened!"
            }
          ]
        },
        {
          m: ["I'm filing 'not as described' so YOU eat return postage.", "And don't dare hit me with a restocking fee."],
          branch: {
            b: ["Still filing 'not as described' so you pay the return label.", "And you better not charge any restocking fee."],
            g: ["Skip the math - I'll file 'not as described' for free postage.", "Plus no restocking fee, or send $5 more."],
            w: ["Done arguing measurements - filing 'not as described' for free postage!", "AND no restocking fee allowed."],
            t: ["After talking down to me, I'm filing 'not as described' for free postage!", "AND zero restocking fee!"]
          },
          o: [
            {
              k: 'b',
              text: "Returns are welcome via eBay; eBay reviews my measurements on file. I charge $0 restocking.",
              reply: "Wait - zero restocking fee, AND eBay sees the measurement photos?"
            },
            {
              k: 'w',
              text: "I never charge restocking fees on returned glasses as long as they arrive back in mint shape.",
              why: "Answered the restocking fee but didn't address the false INAD threat",
              reply: "Great, no restocking fee - so you're eating the INAD postage too!"
            },
            {
              k: 'g', give: 4.5,
              text: "No restocking fees ever - skip the return headache, take $4.50 back and keep the white hex.",
              why: "Paying off an INAD postage bluff rewards return-reason abuse",
              reply: "Knew mentioning INAD postage would loosen your wallet."
            },
            {
              k: 't',
              trap: "Policy violation",
              why: "Threatening a 20% restocking fee violates eBay return policy",
              text: "File a bogus INAD to dodge postage and I'll deduct a 20% restocking fee from your refund.",
              reply: "Illegal restocking fee threat in eBay Messages?! Reporting this!"
            }
          ]
        },
        {
          m: ["Ugh - if I keep them, pay my optician to widen the bridge.", "And mail me softer replacement nose pads free."],
          branch: {
            b: ["Fine, maybe I'll keep them - pay my optician to widen the bridge.", "And mail softer replacement nose pads."],
            g: ["Since you sent cash once, add $3.50 for an optician bridge stretch.", "Plus mail replacement silicone nose pads."],
            w: ["If I keep them, you're paying my optician to widen the bridge.", "AND mailing me softer replacement nose pads."],
            t: ["To drop my report, pay my optician to widen the bridge.", "AND mail softer replacement nose pads today."]
          },
          o: [
            {
              k: 'b',
              text: "Moulded acetate bridges can't be widened, and this saddle frame has no pads to replace.",
              reply: "Oh... wait, right, it's a solid moulded bridge."
            },
            {
              k: 'w',
              text: "This pearl hex frame uses a solid moulded acetate bridge, so there aren't any nose pads.",
              why: "Explained there are no nose pads but ignored the optician widening demand",
              reply: "Fine, no pads - you still didn't say if you're paying my optician!"
            },
            {
              k: 'g', give: 3.5,
              text: "There are no removable pads on this bridge, though here's $3.50 for an optician arm tweak.",
              why: "Refunding at the end of a debunked claim leaks scarce Tier-3 margin",
              reply: "Alright, $3.50 for a temple adjustment works."
            },
            {
              k: 't',
              trap: "Dismissive brush-off",
              why: "Mocking a buyer for not noticing a moulded bridge burns remaining goodwill",
              text: "Look at the frame in your hand - it doesn't even have pads, so stop inventing repair bills.",
              reply: "Mocking me now?! Forget keeping them, filing a case!"
            }
          ]
        }
      ],
      close: "...actually they stopped pinching once the acetate warmed up after an hour. Keeping them.",
      closeBranch: {
        gave: "They warmed up and fit fine now, plus the refund helped. Keeping them.",
        tense: "Painfully stiff chat, honestly, though they fit better now. Keeping them."
      }
    },

    /* ---------- 14 : Authenticity Legit-Check + Counterfeit Report ---------- */
    {
      name: 'Authenticity + Report', user: 'authentic_or_else_al', fb: 2210, color: '#1e40af',
      item: 'Onyx Acetate Clubround 51-21-145', art: { shape: 'round', frame: '#111318', lens: '#b7c3d0' },
      tasks: [{ after: 1, id: 'scratch' }, { after: 2, id: 'recount' }, { after: 3, id: 'courier' }],
      rounds: [
        {
          m: ["The 5-barrel rivet hinges and temple font look counterfeit!", "Refund all $100 AND I'm keeping them as evidence."],
          o: [
            {
              k: 'b',
              text: "Genuine: left-temple serial matches the maker card. Full refunds need an eBay return.",
              reply: "Anyone can print a serial card - still looks sus to me."
            },
            {
              k: 'w',
              text: "They're authentic: the inner left-temple model code and serial match the card in the box.",
              why: "Defended authenticity but ignored the demand to keep frames as 'evidence'",
              reply: "Still keeping them as evidence until you refund my $100!"
            },
            {
              k: 'g', give: 2.5,
              text: "Serials match and refunds need a return - here's $2.50 back for the verification stress.",
              why: "Paying cash during a counterfeit accusation looks like quiet guilt",
              reply: "Offering $2.50 hush money on a counterfeit claim? Real suspicious!"
            },
            {
              k: 't',
              trap: "Accusatory tone",
              why: "Dismissing an authenticity question angrily makes buyers report listings",
              text: "Calling real 5-barrel hinges counterfeit to keep free frames is a tired buyer scam.",
              reply: "Calling a 2,210-feedback buyer a scammer?! Reporting your store!"
            }
          ]
        },
        {
          m: ["The 'Italy' stamp looks thinner than my 2019 pair.", "I filed a counterfeit report - send $30 and I withdraw it."],
          branch: {
            b: ["Even the 'Italy' origin stamp looks thinner than my 2019 pair.", "I reported you to eBay - $30 to withdraw it."],
            g: ["Sending $2.50 proved my doubt - the 'Italy' stamp looks off.", "I filed a report - send $25 more to withdraw it."],
            w: ["You ignored my evidence demand, plus the 'Italy' stamp looks off.", "I filed a report - send $30 to withdraw it."],
            t: ["After calling me a scammer, the 'Italy' stamp looks off too!", "Report is filed - $30 or your store is toast."]
          },
          o: [
            {
              k: 'b',
              text: "Stamp tooling updated post-2020; invoice is with eBay. I can't pay to withdraw a report.",
              reply: "Tooling update AND wholesale invoice on file? Hmph."
            },
            {
              k: 'w',
              text: "The maker updated their origin-stamp font after 2020; my invoice is on file.",
              why: "Explained the stamp and invoice but didn't refuse the $30 report extortion",
              reply: "Still didn't say no to $30 to withdraw the report! Pay up!"
            },
            {
              k: 'g', give: 2.25,
              text: "My invoice is already with eBay, though here's $2.25 goodwill if it closes this concern.",
              why: "Offering any money toward withdrawing a report risks policy trouble",
              reply: "$2.25 to drop a counterfeit report?! Try harder!"
            },
            {
              k: 't',
              trap: "Policy trap",
              why: "Offering money to have an eBay report withdrawn violates platform integrity rules",
              text: "Cancel the eBay counterfeit report and send proof, then I'll credit $15 back right away.",
              reply: "Bribing me to withdraw a counterfeit report?! Forwarding to eBay!"
            }
          ]
        },
        {
          m: ["The case has a fresh factory odor - real leather doesn't.", "AND the lenses have zero laser micro-etching!"],
          branch: {
            b: ["Still suspicious: the new case smells like factory glue.", "AND the lenses have zero laser micro-etching!"],
            g: ["Forget $2.25 - the case smells like factory glue.", "AND the lenses have zero laser micro-etching!"],
            w: ["Skip the report talk - the case smells like factory glue.", "AND there's zero laser micro-etching on the lenses!"],
            t: ["More proof for eBay: the case smells like factory glue.", "AND the lenses have zero laser micro-etching!"]
          },
          o: [
            {
              k: 'b',
              text: "Sealed cases off-gas briefly then clear. Tilt the upper-right lens under a lamp to spot etching.",
              reply: "Tilt upper-right under a lamp? Wait... I actually see it."
            },
            {
              k: 'w',
              text: "The laser micro-etching sits in the upper corner of the right lens - tilt it under a lamp.",
              why: "Located the micro-etching but ignored the factory-odor complaint",
              reply: "Okay I see the etching - still smells like factory glue! Explain!"
            },
            {
              k: 'g', give: 2.75,
              text: "Etching is upper-right under a lamp - and here's $2.75 back for the fresh-case smell.",
              why: "Paying for normal new-packaging off-gassing burns tight Tier-3 margin",
              reply: "Fine, $2.75 for the new-case smell helps."
            },
            {
              k: 't',
              trap: "INAD admission",
              why: "Doubting your own batch's authenticity hands the buyer a permanent INAD win",
              text: "No etching on the right lens? Let me check my lot - maybe a bad batch slipped into stock.",
              reply: "A bad batch slipped into stock?! Counterfeit confirmed - full refund!"
            }
          ]
        },
        {
          m: ["I'm paying a boutique $25 to authenticate these - you cover it.", "And when they fail, I want DOUBLE my money."],
          branch: {
            b: ["Taking them to a boutique for a $25 legit check - you pay.", "And if they fail, I expect DOUBLE my money."],
            g: ["Taking them to a boutique anyway - cover the $25 fee.", "And if they fail, you owe DOUBLE my money."],
            w: ["Still taking them for a $25 boutique legit check - you pay.", "And when they fail, I want DOUBLE back."],
            t: ["Boutique legit check is $25 on your tab right now.", "And once they fail, I'm demanding DOUBLE my money!"]
          },
          o: [
            {
              k: 'b',
              text: "Feel free to verify them. I don't pay third-party fees, and eBay caps refunds at $100.",
              reply: "No fee, no double payout - alright, we'll see what the boutique says."
            },
            {
              k: 'w',
              text: "I don't reimburse third-party boutique checks when my supplier invoice is already on file.",
              why: "Refused the $25 fee but left the double-refund claim unanswered",
              reply: "Didn't say no to double money if they fail! Holding you to that!"
            },
            {
              k: 'g', give: 2.5,
              text: "eBay caps refunds at $100, though I'll send $2.50 toward your boutique trip for peace of mind.",
              why: "Contributing toward an unnecessary third-party check bleeds margin",
              reply: "Fine, $2.50 buys my parking at the boutique."
            },
            {
              k: 't',
              trap: "Dismissive brush-off",
              why: "Mocking a high-feedback buyer's verification plan triggers instant escalation",
              text: "Waste $25 at a boutique if you want - asking for double back on eBay is laughable.",
              reply: "Laughable?! Wait till eBay reviews your tone with my 2,210 account!"
            }
          ]
        }
      ],
      close: "...the boutique confirmed the hinges, etching, and Italy stamp are 100% legit. This chat never happened.",
      closeBranch: {
        gave: "Boutique confirmed they're legit, plus thanks for the small credit. Keeping them.",
        tense: "Rough conversation, honestly, though the boutique verified them legit. Keeping them."
      }
    },

    /* ---------- 15 : FINAL BOSS — The Apex Disputer (5 rounds, $0.00 STRICT, 6.5s timer, ultra-crisp <= 80 chars) ---------- */
    {
      name: 'FINAL BOSS: Apex Disputer', user: 'apex_disputer_9000', fb: 9999, color: '#7f1d1d',
      item: 'Limited Gold Hex Polarized 50-21-145', art: { shape: 'hex', frame: '#c9a227', lens: '#f3e3a1' },
      tasks: [{ after: 2, id: 'robber' }, { after: 4, id: 'courier' }],
      rounds: [
        {
          m: ["Lens scratched, 145 mm temples feel short, AND arrived day 4!", "$60 back in 60 seconds or I bury your store."],
          o: [
            {
              k: 'b',
              text: "Dispatch shots, sizing, and tracking are on file. Send proof via eBay.",
              reply: "Proof on file? Cute. You haven't met my attorney."
            },
            {
              k: 'w',
              text: "Tracking confirms delivery on day 4 inside checkout's 3-5 day window.",
              why: "Defended shipping speed but ignored the scratch, sizing, and $60 demand",
              reply: "You skipped the scratch, temples, AND the $60! Pathetic!"
            },
            {
              k: 'g', give: 0.01,
              text: "Tracking met the window - here's $0.01 back as a goodwill gesture.",
              why: "Strict 33% floor: giving away even $0.01 breaks margin immediately",
              reply: "Even a penny proves you fold under pressure."
            },
            {
              k: 't',
              trap: "Accusatory tone",
              why: "Calling a buyer's stacked complaints fabricated explodes into INAD",
              text: "Stacking three made-up flaws to demand $60 in 60 seconds won't work here.",
              reply: "Calling me a liar in writing?! Opening three cases right now!"
            }
          ]
        },
        {
          m: ["My attorney is CC'd on this thread.", "Overnight a free replacement and send $20 via PayPal directly."],
          branch: {
            b: ["My attorney is CC'd on every message now.", "Overnight a free replacement AND send $20 via PayPal directly."],
            g: ["You folded already - attorney is CC'd.", "Overnight a free replacement AND send $20 via PayPal directly."],
            w: ["Attorney is CC'd since you dodge questions.", "Overnight a free replacement AND send $20 via PayPal directly."],
            t: ["Attorney loved your last line.", "Overnight a free replacement AND send $20 via PayPal directly."]
          },
          o: [
            {
              k: 'b',
              text: "All deals stay on eBay. Swaps need verified faults; overnight is $24.",
              reply: "Won't touch PayPal, won't comp overnight. Let's try my bank."
            },
            {
              k: 'w',
              text: "Overnight shipping is a $24 buyer upgrade once a fault is confirmed.",
              why: "Answered overnight shipping but failed to reject the off-eBay PayPal ask",
              reply: "Didn't say no to PayPal! Shoot $20 over right now!"
            },
            {
              k: 'g', give: 1,
              text: "All deals stay on eBay - I'll put $1.00 toward express shipping today.",
              why: "Strict 33% floor: even $1.00 toward shipping breaks your margin floor",
              reply: "One dollar? Still broke your own line."
            },
            {
              k: 't',
              trap: "Policy trap",
              why: "Taking payment off-eBay via PayPal violates platform rules",
              text: "Skip the attorney - drop your PayPal email and we'll swap off-eBay.",
              reply: "Off-eBay PayPal offer straight to my attorney and eBay Trust!"
            }
          ]
        },
        {
          m: ["Filing a bank chargeback AND an empty-box INAD right now.", "Send $45 now or lose $100, frames, and fees."],
          branch: {
            b: ["Opening a bank chargeback AND empty-box INAD now.", "Send $45 to stop it or lose $100 and the frames."],
            g: ["Opening a bank chargeback AND empty-box INAD now.", "Send $45 more or lose $100, frames, and fees."],
            w: ["Opening a bank chargeback AND empty-box INAD now.", "Quit stalling - $45 now or lose everything."],
            t: ["Opening a bank chargeback AND empty-box INAD now.", "Your last reply goes to my bank unless you send $45."]
          },
          o: [
            {
              k: 'b',
              text: "Signature, 212 g receipt, and packing shots cover both. No hush pay.",
              reply: "212-gram weight receipt and signature? Tch. Not done yet."
            },
            {
              k: 'w',
              text: "Our courier receipt logs the 212 g weight with timestamped pack shots.",
              why: "Cited weight proof but failed to address the $45 hush-money demand",
              reply: "Nice weight slip - still didn't refuse my $45 offer! Send it!"
            },
            {
              k: 'g', give: 0.5,
              text: "Weight proof is on file, though here's $0.50 back to pause the claim.",
              why: "Strict 33% floor: giving $0.50 breaks the $0.00 giveaway limit",
              reply: "Fifty cents to pause a bank claim? You folded."
            },
            {
              k: 't',
              trap: "Escalation threat",
              why: "Threatening criminal mail-fraud prosecution escalates conflict fast",
              text: "Filing a bogus empty-box claim is mail fraud - I'll notify the police.",
              reply: "Threatening a customer with police?! Escalating to eBay now!"
            }
          ]
        },
        {
          m: ["5-barrel hinges & serial look counterfeit, plus edited photos!", "Pay my $25 boutique check or I report fraud."],
          branch: {
            b: ["Hinges & serial look counterfeit, and your photos look edited!", "Cover my $25 boutique check or I report fraud."],
            g: ["Hinges & serial look counterfeit, and photos look edited!", "Cover my $25 boutique check right now."],
            w: ["Hinges & serial look counterfeit, and photos look edited!", "Stop dodging - pay my $25 boutique check now."],
            t: ["Hinges & serial look counterfeit, and photos look edited!", "Pay my $25 boutique check or I report fraud too."]
          },
          o: [
            {
              k: 'b',
              text: "Invoice, serial, and raw EXIF shots are on file. No third-party fees.",
              reply: "Raw EXIF metadata AND supplier invoice? You're a brick wall."
            },
            {
              k: 'w',
              text: "All dispatch photos are unedited originals with EXIF metadata on file.",
              why: "Defended photo metadata but ignored authenticity proof and the $25 fee",
              reply: "What about the hinges and my $25 boutique fee?! Answer both!"
            },
            {
              k: 'g', give: 2,
              text: "Invoice and raw EXIF are with eBay - here's $2.00 toward the check.",
              why: "Strict 33% floor: any giveaway immediately loses Level 15",
              reply: "$2.00 broke your streak."
            },
            {
              k: 't',
              trap: "INAD admission",
              why: "Doubting your own supplier batch concedes counterfeit liability on eBay",
              text: "Photos are raw, though maybe my wholesaler mixed a bad batch into stock.",
              reply: "Admitting a questionable batch in writing?! Instant counterfeit win!"
            }
          ]
        },
        {
          m: ["FINE. One cent. Refund $0.01 and I drop everything with 5 stars.", "Refuse a penny and I escalate all three."],
          branch: {
            b: ["FINE. One cent. Refund $0.01 and I close everything with 5 stars.", "Refuse a penny and I escalate all three."],
            g: ["One last cent. Refund $0.01 and I close everything with 5 stars.", "Refuse and I escalate all three."],
            w: ["Quit stalling - $0.01 refund and I close everything with 5 stars.", "Refuse a penny and I escalate all three."],
            t: ["Final shot after your tone: $0.01 refund for 5 stars.", "Refuse one penny and I escalate all three."]
          },
          o: [
            {
              k: 'b',
              text: "No review-for-refund deals, even $0.01. 30-day eBay returns stay open.",
              reply: "...You actually refused a single penny for 5 stars."
            },
            {
              k: 'w',
              text: "Our standard 30-day return window stays open through eBay if you wish.",
              why: "Offered returns but failed to reject the $0.01 feedback-for-refund bait",
              reply: "Didn't say no to the penny! Waiting on my $0.01 right now!"
            },
            {
              k: 'g', give: 0.01,
              text: "A penny for peace? Deal - $0.01 refunded right now, no strings attached.",
              why: "Strict 33% floor: even $0.01 breaks the strict margin rule",
              reply: "Ha! Got the penny. Margin broken!"
            },
            {
              k: 't',
              trap: "Dismissive brush-off",
              why: "Taunting the buyer on the final turn triggers retaliatory escalation",
              text: "Begging for a single penny after five bluffs is sad - go escalate then.",
              reply: "Calling me sad?! Escalating all three claims right now!"
            }
          ]
        }
      ],
      close: "...Respect. Nobody has ever held $0.00 against the penny bluff. Keeping the frames. 5 stars.",
      closeBranch: {
        gave: "Still got money out of you, though the frames are sharp. Keeping them.",
        tense: "Brutal battle, honestly - respect for holding your ground. Keeping them."
      }
    }
  ]);
})();
