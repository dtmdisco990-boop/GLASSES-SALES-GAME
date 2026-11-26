/* Frame Margin — levels 1-5 (Tier 1 & entry Tier 2: realistic eBay eyewear scenarios with branching & subtle traps) */
(function () {
  'use strict';
  var FM = window.FM;
  FM.LEVELS = (FM.LEVELS || []).concat([

    /* ---------- 1 : Lowball Partial-Refund Fisher ---------- */
    {
      name: 'The Lowball Fisher', user: 'bargain_bill_77', fb: 212, color: '#c2410c',
      item: 'Havana Keyhole Round 49-20-145', art: { shape: 'round', frame: '#6b3f1d', lens: '#8ecae6' },
      tasks: [{ after: 1, id: 'robber' }],
      rounds: [
        {
          m: ["Paid $100, then saw similar tortoise frames elsewhere for $70. Refund me $30 and we're square."],
          o: [
            {
              k: 'b',
              text: "Thanks for reaching out. The price was agreed at checkout, so I can't discount a completed order.",
              reply: "Every seller says that at first. Nobody actually sticks to it."
            },
            {
              k: 'g', give: 16,
              text: "I hear you on finding a lower listing - I can send $16.00 back right now as a one-time goodwill credit.",
              why: "Partial refunds on price-fishing invite buyers to ask for more",
              reply: "$16 back without a fight? Clearly your markup is huge."
            },
            {
              k: 'w',
              text: "Those $70 listings can look pretty close in photos, so let me look into what other shops charge first.",
              why: "Stalling without stating your pricing policy invites pressure",
              reply: "Look into it? I'm asking for $30 back, not a market report."
            },
            {
              k: 't',
              trap: "Condescending blame",
              why: "Scolding buyers for not comparison-shopping earlier escalates conflict",
              text: "You really should have compared listings before clicking Buy - asking for $30 afterward is unfair to me.",
              reply: "Lecturing a paying customer? Watch how fast I open a return."
            }
          ]
        },
        {
          m: ["Come on, everybody on eBay does partial refunds. Send $20 back and I'll leave you a glowing 5-star review."],
          branch: {
            b: ["Fine, forget $30. Plenty of eyewear sellers still do $20 partials - send it and I'll leave 5 stars."],
            g: ["You just gave $16 right away, so add $14 more and I'll drop a glowing 5-star review right now."],
            w: ["You didn't even answer me. Send $20 back right now and I'll leave 5 stars instead of a complaint."],
            t: ["After lecturing me about how to shop, $20 back is the minimum - send it and I'll still leave 5 stars."]
          },
          o: [
            {
              k: 'b',
              text: "I appreciate feedback, but eBay rules bar trading refunds for ratings. Your pair ships tracked today.",
              reply: "Quoting the eBay handbook now. Real charming."
            },
            {
              k: 'g', give: 15,
              text: "I'd love to keep this smooth, so I'll send $15.00 back as a courtesy - no pressure on your review.",
              why: "Giving a refund right after a review pitch rewards feedback leverage",
              reply: "Finally some sense. Still feels a little light though."
            },
            {
              k: 'w',
              text: "Five-star reviews really do help small optical shops, I just don't know if I'm allowed to adjust orders.",
              why: "Sounding unsure of eBay policy encourages the buyer to push",
              reply: "You run the store and don't even know your own rules?"
            },
            {
              k: 't',
              trap: "Policy trap",
              why: "Trading refunds or credits for positive feedback violates eBay policy",
              text: "Leave the 5-star feedback first so I know you're serious, and then I'll send a courtesy refund back.",
              reply: "Did you just ask for 5 stars in exchange for money? Screenshotted."
            }
          ]
        },
        {
          m: ["Wait - looking closely at your listing, the left temple hinge looks slightly loose. Knock $15 off for repairs."],
          branch: {
            b: ["Wait - zooming into your photo, the left barrel hinge looks slightly loose. Knock $15 off for repairs."],
            g: ["Also zooming in, that left barrel hinge looks loose. You already did a partial, so add $15 for a tune-up."],
            w: ["Since you're dodging price, look at photo 4 - the left hinge looks loose. Take $15 off for an optician."],
            t: ["On top of your shady message, photo 4 shows a loose left hinge. Knock $15 off or I flag the listing."]
          },
          o: [
            {
              k: 'b',
              text: "I checked both 5-barrel hinges before packing - tension is even and snug. Happy to share a closer shot.",
              reply: "Convenient that they're suddenly 'snug' now that I noticed."
            },
            {
              k: 'g', give: 17,
              text: "Just to save you a trip to an optical shop, I'll refund $17.00 so you can have the hinges tightened.",
              why: "Paying for an unverified hinge claim invites further fishing",
              reply: "Good - should have started with that instead of arguing."
            },
            {
              k: 'w',
              text: "Acetate hinges can sometimes loosen a bit in storage, honestly, so it's tough to tell from a single shot.",
              why: "Speculating about defects without checking undermines your listing",
              reply: "So you're admitting you didn't even inspect them before listing?!"
            },
            {
              k: 't',
              trap: "Accusatory tone",
              why: "Accusing a buyer of inventing flaws provokes retaliatory INAD claims",
              text: "You're clearly hunting for any excuse to shave $15 off this order - that hinge is completely untouched.",
              reply: "Calling me a liar now?! I'm saving this whole thread for eBay."
            }
          ]
        },
        {
          m: ["Last shot: throw in a free hard clamshell case or refund $15, otherwise I return them and you eat postage."],
          branch: {
            b: ["Last shot: throw in a free hard clamshell case or $15 off, or I'll return them and stick you with shipping."],
            g: ["You already opened your wallet once - add a free hard case or $14 more and I'll drop the whole thing."],
            w: ["Stop dancing around it. Free hard case or $15 back right now, or I open a return and make you eat postage."],
            t: ["After accusing me of lying, send a free hard case or $15 back - otherwise I file a return immediately."]
          },
          o: [
            {
              k: 'b',
              text: "The soft pouch shown in the photos is included. You're welcome to use our 30-day return if they aren't right.",
              reply: "Not budging an inch, huh? Alright, I hear you."
            },
            {
              k: 'g', give: 14,
              text: "Alright, I'll upgrade you to a hard clamshell case and cleaning kit on me - that's $14.00 from my side.",
              why: "Giving away unlisted extras teaches buyers that ultimatums work",
              reply: "Knew you'd fold once I mentioned return shipping."
            },
            {
              k: 'w',
              text: "Please don't open a return over a case - return shipping really hurts small eyewear sellers on eBay.",
              why: "Pleading about seller costs signals desperation instead of firm policy",
              reply: "Sounds like a great reason to give me the $15 then."
            },
            {
              k: 't',
              trap: "Escalation threat",
              why: "Threatening to report or block a buyer mid-thread triggers retaliation",
              text: "Go ahead and file a false return - I'll report your account to eBay buyer abuse and block you immediately.",
              reply: "Threatening to report ME? Enjoy explaining that to eBay Support."
            }
          ]
        }
      ],
      close: "Ugh. Fine. Ship the frames as listed.",
      closeBranch: {
        gave: "Glad you finally sent a credit. Go ahead and ship them.",
        tense: "Rough back-and-forth, honestly, but fine - ship them."
      }
    },

    /* ---------- 2 : Bridge Width & Nose-Pad Fit ---------- */
    {
      name: 'Bridge-Width Fit', user: 'narrow_nose_nina', fb: 87, color: '#7c3aed',
      item: 'Matte Black Saddle Square 51-16-140', art: { shape: 'square', frame: '#1f2430', lens: '#a7c7e7' },
      tasks: [{ after: 2, id: 'printer' }],
      rounds: [
        {
          m: ["Wait, these say 16 mm bridge! My daily pair is an 18 mm keyhole. These will pinch my nose - why didn't you warn me?"],
          o: [
            {
              k: 'b',
              text: "The 51-16-140 sizing is in the title and photo 4. I can verify the bridge with calipers before shipping.",
              reply: "Fine. Use digital calipers, not a plastic ruler."
            },
            {
              k: 'g', give: 15,
              text: "Sorry for the sizing surprise - I'll refund $15.00 now so you can have an optician check the fit.",
              why: "Refunding before verifying specs concedes fault you don't own",
              reply: "$15 already? That makes me think the sizing really is off."
            },
            {
              k: 'w',
              text: "Bridge numbers feel totally different from brand to brand, so you won't really know until you wear them.",
              why: "Vague reassurance skips concrete measurement proof or cancel option",
              reply: "I didn't ask for a guess - I asked about a 2 mm difference!"
            },
            {
              k: 't',
              trap: "Condescending blame",
              why: "Blaming the buyer for misreading sizing turns fit questions into INADs",
              text: "The 16 mm spec was clearly printed in the title - reading your own frame numbers before buying avoids this.",
              reply: "Excuse me?! Blaming me for asking a fit question? Unbelievable."
            }
          ]
        },
        {
          m: ["Measure them with calipers then. If the bridge reads even 15.5 mm, I expect $20 off right away."],
          branch: {
            b: ["Put digital calipers on the bridge then. If it reads even 15.5 mm instead of 16, I expect $20 off."],
            g: ["Since you sent $15 without checking, I don't trust the listing. Caliper photo now, or $15 more off."],
            w: ["Stop guessing and measure them. Put calipers on the bridge - if it's even 15.5 mm, you owe me $20."],
            t: ["After telling me to read my own numbers, send a caliper photo right now - $20 off if it's even 15.5 mm."]
          },
          o: [
            {
              k: 'b',
              text: "Measured zeroed calipers just now: 16.0 mm exact, matching the stamp. Photo uploaded to this thread.",
              reply: "Okay, 16.0 mm. Still tighter than an 18 mm keyhole."
            },
            {
              k: 'g', give: 14,
              text: "It looks right around 16 mm, but I'll knock $14.00 off just in case the saddle bridge sits high on you.",
              why: "Discounting an accurately measured frame invites another demand",
              reply: "Good - saddle bridges always sit higher than keyhole ones."
            },
            {
              k: 'w',
              text: "I don't have digital calipers at the packing desk right now, though the temple stamp says 51-16-140.",
              why: "Refusing to verify a spec after offering to measure erodes trust",
              reply: "Then why offer to measure?! Stamps are wrong all the time!"
            },
            {
              k: 't',
              trap: "INAD admission",
              why: "Admitting a spec might be inaccurate hands the buyer an INAD case",
              text: "Acetate molds can shrink half a millimeter in production, so yeah, it might sit closer to 15.5 mm.",
              reply: "Aha! You just admitted it's smaller than listed - that's INAD!"
            }
          ]
        },
        {
          m: ["Fine, it's 16 mm. Still, my optician says they'll have to heat-widen the acetate bridge for $20. You cover it."],
          branch: {
            b: ["Okay, 16 mm confirmed. Still, my optician charges $20 to stretch the bridge wider - you should cover it."],
            g: ["You already helped on price, now cover the $20 my optician wants to widen this tight saddle bridge."],
            w: ["Without a real measurement, I'll need an optician to stretch the bridge for $20. Put that on your tab."],
            t: ["Since you admitted sizing can run tight, you're paying my optician $20 to widen the bridge."]
          },
          o: [
            {
              k: 'b',
              text: "Moulded acetate bridges can't be stretched safely. I can cancel free before shipping or accept 30-day returns.",
              reply: "Great, so it can't even be widened. What about pads?"
            },
            {
              k: 'g', give: 16,
              text: "I can't cover $20, but I'll send $16.00 toward whatever bridge work your optician recommends for better comfort.",
              why: "Paying for impossible acetate modifications leaks margin unnecessarily",
              reply: "Fine, $16 helps - though I still need pads added."
            },
            {
              k: 'w',
              text: "Maybe call around to a couple local optical shops first - some of them adjust acetate bridges free if you ask.",
              why: "Giving inaccurate optical advice dodges the return/cancel policy",
              reply: "They don't work for free and you didn't answer if you're paying!"
            },
            {
              k: 't',
              trap: "Policy trap",
              why: "Offering off-eBay Venmo/CashApp payments violates eBay policies",
              text: "Drop your Venmo handle here and I'll shoot you $15 outside eBay so we don't have to mess with the eBay order.",
              reply: "Asking for my Venmo in eBay Messages?! That's against eBay rules!"
            }
          ]
        },
        {
          m: ["Then send stick-on silicone nose pads and refund $15 for the hassle, or I'll file 'not as described' when they arrive."],
          branch: {
            b: ["Then throw in stick-on silicone pads and $15 for the hassle, or I'll claim the fit wasn't as described."],
            g: ["One last ask: send stick-on nose pads and $13 more, otherwise I return them as 'not as described'."],
            w: ["Quit stalling. Send silicone pads and $15 off, or I'm filing 'not as described' the day they land."],
            t: ["After that sketchy message, send silicone pads and $15 off or I file 'not as described' plus a report."]
          },
          o: [
            {
              k: 'b',
              text: "The caliper photo matches 16 mm exact. I can cancel free now, or ship with 30-day eBay returns.",
              reply: "Alright, no need to cancel - I'll try them first."
            },
            {
              k: 'g', give: 13,
              text: "Let's avoid a return - I'll take $13.00 off so you can pick up adhesive nose pads locally.",
              why: "Caving to an INAD bluff rewards abusive return threats",
              reply: "Thank you. That should cover the pads at least."
            },
            {
              k: 'w',
              text: "Please don't file 'not as described' over a bridge size - that gives my shop a defect on eBay.",
              why: "Revealing fear of seller defects hands leverage straight to the buyer",
              reply: "Then avoiding a defect is worth $15 to you, isn't it?"
            },
            {
              k: 't',
              trap: "Dismissive brush-off",
              why: "Dismissing buyer fit concerns coldly pushes them to open a case",
              text: "How a 16 mm bridge sits on your nose has nothing to do with me - all sales are final once packed.",
              reply: "'All sales final' on eBay?! eBay's Money Back Guarantee says otherwise!"
            }
          ]
        }
      ],
      close: "Fine, ship them. I'll still check them with my own calipers when they arrive.",
      closeBranch: {
        gave: "Since you knocked money off, I'll give the 16 mm bridge a shot. Ship them.",
        tense: "Not thrilled with your attitude, honestly, but go ahead and ship them."
      }
    },

    /* ---------- 3 : Temple Length & Ear Pinch ---------- */
    {
      name: 'Short Temple Pinch', user: 'temple_tight_troy', fb: 431, color: '#0f766e',
      item: 'Espresso Acetate Panto 48-21-135', art: { shape: 'round', frame: '#4a2c1d', lens: '#b5d6c6' },
      tasks: [{ after: 1, id: 'lens' }],
      rounds: [
        {
          m: ["These just arrived and the ear arms pinch like crazy! I always wear 145 mm - why did you sell me tiny 135 mm temples?!"],
          o: [
            {
              k: 'b',
              text: "Sorry they feel tight. The listing states 48-21-135 in the title and specs - 30-day returns are open.",
              reply: "Well 135 mm doesn't even fit a normal adult head."
            },
            {
              k: 'g', give: 14,
              text: "Sorry about the ear pinch - I'll send $14.00 back so you can have an optician adjust the temple tips.",
              why: "Paying for buyer-selected sizing teaches them to push for more",
              reply: "$14 won't lengthen plastic arms, though I'll take it for starters."
            },
            {
              k: 'w',
              text: "Oh no, 135 mm really can feel snug behind the ears - maybe give them a few days to loosen up a little?",
              why: "Telling a buyer to endure pinching skips sizing facts and return policy",
              reply: "I'm not getting headaches for days waiting on hard plastic!"
            },
            {
              k: 't',
              trap: "INAD admission",
              why: "Calling an adult frame 'kids sizing' contradicts your own listing",
              text: "Honestly 135 mm runs super small, almost youth sizing - I probably should have flagged that in bold.",
              reply: "You just admitted the listing was missing key info! Full refund!"
            }
          ]
        },
        {
          m: ["I just laid a ruler from hinge to tip and got 130 mm, NOT 135 mm! Your listing is flat-out wrong - refund $25."],
          branch: {
            b: ["Even worse: my ruler reads 130 mm from hinge to tip, NOT 135 mm! Listing is wrong - refund $25."],
            g: ["And I just measured them: 130 mm on a ruler, not 135! Since you already sent $14, add $15 more."],
            w: ["Forget waiting - my ruler says 130 mm from hinge to tip, not 135 mm! That's a listing error, send $25."],
            t: ["Not only did you admit they're youth-sized, my ruler says 130 mm instead of 135 mm! Refund $25 now."]
          },
          o: [
            {
              k: 'b',
              text: "Temple length measures 135 mm along the ear bend - a straight ruler reads 4-5 mm short.",
              reply: "Convenient optical math. Sounds like an excuse."
            },
            {
              k: 'g', give: 13,
              text: "Temples follow the bend curve, so flat rulers read short - still, I'll refund $13.00 for the confusion.",
              why: "Refunding after explaining a valid optical measurement contradicts yourself",
              reply: "If it's 'just the curve,' why are you refunding $13?"
            },
            {
              k: 'w',
              text: "Rulers can definitely be tricky on curved glasses - maybe try measuring the other arm to see if it matches?",
              why: "Unclear explanation fails to establish that 135 mm is accurate",
              reply: "Both arms say 130 mm on my ruler! That's still wrong!"
            },
            {
              k: 't',
              trap: "Condescending lecture",
              why: "Talking down about how to measure frames provokes defensive escalation",
              text: "Anyone who wears glasses knows you don't measure curved temples with a straight ruler - do it right.",
              reply: "Don't tell me to 'do it right' like I'm an idiot! Case incoming."
            }
          ]
        },
        {
          m: ["My optician says heating and flattening the ear bend to gain 5 mm costs $20. Pay that or swap longer 145 mm arms on."],
          branch: {
            b: ["Fine, call it 135 along the curve. My optician wants $20 to straighten the bend for extra reach - pay it."],
            g: ["Since you're flexible, cover the $20 my optician wants to flatten the temple drop so they clear my ears."],
            w: ["You still haven't fixed the pinch. Pay the $20 optician bill to straighten the tips or send 145 mm arms."],
            t: ["After talking down to me, you owe the $20 optician adjustment to flatten the tips - or send 145 mm arms."]
          },
          o: [
            {
              k: 'b',
              text: "I can't swap arms or fund custom fitting since the frame matches 48-21-135. Returns are open.",
              reply: "So I'm stuck paying postage back just because they pinch?"
            },
            {
              k: 'g', give: 15,
              text: "I can't swap arms, but I'll send $15.00 toward the optician heat adjustment so you can wear them.",
              why: "Funding personal fit tailoring erodes margin on accurate listings",
              reply: "Alright, $15 covers most of it - still annoying though."
            },
            {
              k: 'w',
              text: "You can actually warm acetate temples carefully with a hair dryer at home if you want to bend the tip.",
              why: "Advising DIY heat bending risks buyer-damaged frames and liability",
              reply: "Use a hair dryer on $100 frames?! What if they snap?!"
            },
            {
              k: 't',
              trap: "Dismissive brush-off",
              why: "Coldly rejecting fit issues without mentioning returns drives INAD filings",
              text: "Tailoring frames to your head shape isn't included in a $100 eBay listing - ask your optician, not me.",
              reply: "Wow, zero help. Glad eBay protects buyers from attitudes like yours."
            }
          ]
        },
        {
          m: ["I'm not paying return shipping for frames that hurt. I'll mark them 'defective' so YOU pay postage - unless you send $18."],
          branch: {
            b: ["Not paying return postage for frames that hurt. I'll file 'defective' so you cover the label unless you send $18."],
            g: ["You already sent a partial - send $12 more so I keep them, otherwise I file 'defective' for a free label."],
            w: ["No way I'm taking a hair dryer to them. Send $18 now or I mark them 'defective' so you pay return shipping."],
            t: ["With that attitude, I'm filing 'defective' so you eat return shipping - unless you send $18 right now."]
          },
          o: [
            {
              k: 'b',
              text: "You're welcome to open an eBay return. The 48-21-135 specs and this thread stay on file.",
              reply: "Smart move putting that on the record. Fine."
            },
            {
              k: 'g', give: 12,
              text: "Let's skip a messy return - I'll send $12.00 back so we can both close this order out today.",
              why: "Paying off a false-INAD threat rewards return-reason abuse",
              reply: "Figured $12 was easier for you than fighting a case."
            },
            {
              k: 'w',
              text: "If you file 'defective' when nothing is broken, eBay charges me the return label and penalizes my account.",
              why: "Explaining how INAD hurts your metrics encourages weaponizing it",
              reply: "Good to know! Makes my $18 ask look pretty reasonable then."
            },
            {
              k: 't',
              trap: "Accusatory threat",
              why: "Accusing a buyer of return fraud mid-chat escalates hostility",
              text: "Filing a false defect claim to dodge postage is return fraud, and I will report your account to eBay.",
              reply: "Accusing me of fraud in writing?! I'm escalating to eBay right now!"
            }
          ]
        }
      ],
      close: "Actually, my optician straightened the tips for free in 2 minutes. Keeping them.",
      closeBranch: {
        gave: "Between your credit and a quick tweak, they fit alright now. Keeping them.",
        tense: "Terrible chat, honestly, but my optician fixed the bend. Keeping them."
      }
    },

    /* ---------- 4 : Polarized vs. UV400 Lens Confusion ---------- */
    {
      name: 'Polarized Confusion', user: 'glare_check_greg', fb: 56, color: '#be185d',
      item: 'Gold Pilot UV400 Tint 58-14-145', art: { shape: 'aviator', frame: '#b8860b', lens: '#4a7c59' },
      tasks: [{ after: 2, id: 'dispute' }],
      rounds: [
        {
          m: ["I held these up to my phone screen and tilted them - zero blackout! You sold me NON-polarized lenses! Refund $30!"],
          o: [
            {
              k: 'b',
              text: "Thanks for checking. These are UV400 G-15 tinted lenses, listed as Non-Polarized in item specifics.",
              reply: "Wait - UV400 isn't the same thing as polarized?!"
            },
            {
              k: 'g', give: 13,
              text: "Sorry they weren't polarized like you hoped - I'll send $13.00 back toward the lens difference.",
              why: "Refunding when the listing specs were accurate invites bigger claims",
              reply: "$13 doesn't turn them polarized, though it's a start."
            },
            {
              k: 'w',
              text: "Some newer phone screens have different display coatings now, so the tilt test doesn't always black out.",
              why: "Dodging the fact that the lenses are non-polarized misleads the buyer",
              reply: "Stop blaming my phone! Are the lenses polarized or NOT?!"
            },
            {
              k: 't',
              trap: "Condescending tone",
              why: "Mocking a buyer's confusion over optical specs escalates disputes",
              text: "Nowhere did this listing say polarized - maybe check item specifics before doing phone-screen tests.",
              reply: "Nice snark. Way to treat someone who just paid you $100."
            }
          ]
        },
        {
          m: ["Your listing says '100% UV400 Glare-Reducing Tint'! To any normal buyer that means polarized - send $25 back."],
          branch: {
            b: ["Your title says 'UV400 Sun Tint'! Most people think UV400 means polarized glare blocking - send $25 back."],
            g: ["You already refunded $13 because you know 'UV400 Tint' sounds polarized. Add $15 more and we're done."],
            w: ["Answer straight: your listing says 'UV400 Sun Tint' - if they aren't polarized, that's misleading! $25 off."],
            t: ["After that snark, look at your own listing: 'UV400 Sun Tint' sounds polarized to anyone! Refund $25."]
          },
          o: [
            {
              k: 'b',
              text: "UV400 blocks UV; polarization filters glare. The Polarized field in specifics is marked No.",
              reply: "Nobody scrolls down to item specifics on mobile."
            },
            {
              k: 'g', give: 12,
              text: "UV400 and polarized are different, though I get the mix-up - here's $12.00 back for the hassle.",
              why: "Compensating for clearly listed specifics rewards buyer misreads",
              reply: "At least you admit the wording tripped me up."
            },
            {
              k: 'w',
              text: "Yeah, optical terms like UV400 and polarization get mixed up all the time online, it's really confusing.",
              why: "Agreeing it's confusing without citing your exact listing specs weakens defense",
              reply: "If you know it's confusing, why didn't you put NON-POLARIZED in caps?!"
            },
            {
              k: 't',
              trap: "INAD admission",
              why: "Admitting your listing wording was misleading backs up an INAD claim",
              text: "Fair point, my title wording does sound polarized - I should rewrite it.",
              reply: "Bingo! You just admitted the listing is misleading. Full refund!"
            }
          ]
        },
        {
          m: ["I bought these for boating and driving on wet roads! Swap polarized lenses into the frame for free."],
          branch: {
            b: ["Well I bought them for fishing and wet-road driving! Swap polarized lenses into this frame at your cost."],
            g: ["I need polarization for boating. Keep the credit I got and send me a free pair of polarized lenses to swap in."],
            w: ["You didn't fix my boating glare problem. Swap polarized lenses into these frames free or pay my optician."],
            t: ["Since you admitted the title is misleading, swap polarized lenses into these frames free right now."]
          },
          o: [
            {
              k: 'b',
              text: "I don't do free swaps on non-polarized stock, but 30-day returns let you switch to a polarized pair.",
              reply: "Great, so now I'm out boating without polarized shades."
            },
            {
              k: 'g', give: 14,
              text: "I can't swap the lenses here, so I'll put $14.00 toward polarized replacement lenses from your optician.",
              why: "Funding an upgrade the buyer didn't purchase breaks your pricing model",
              reply: "Fine, $14 takes a dent out of replacement lenses."
            },
            {
              k: 'w',
              text: "Honestly, G-15 green lenses cut bright sunlight pretty well on water even without a polarized filter.",
              why: "Overselling non-polarized water glare performance dodges the return option",
              reply: "Have you ever been on a boat?! Non-polarized does nothing for glare!"
            },
            {
              k: 't',
              trap: "Policy trap",
              why: "Directing buyers off-eBay to purchase upgrades violates platform rules",
              text: "Email me directly outside eBay and I can sell you polarized drop-in lenses at cost without eBay fees.",
              reply: "Trying to dodge eBay fees in eBay Messages? Reporting this!"
            }
          ]
        },
        {
          m: ["Last chance: $20 partial refund so I keep them for cloudy days, or I return them and leave a warning review."],
          branch: {
            b: ["Last chance: send $20 back so I keep them as backup shades, or I return them and warn other buyers."],
            g: ["Send $12 more so I keep them as backup sunglasses, otherwise I open a return and warn other buyers."],
            w: ["Stop defending non-polarized glare. $20 back right now or I return them and post a warning review."],
            t: ["After that off-platform pitch, send $20 back now or I return them AND report your listing to eBay."]
          },
          o: [
            {
              k: 'b',
              text: "I can't discount an accurate listing, sorry. Returns stay open 30 days through eBay if preferred.",
              reply: "Alright, fair enough. At least my car HUD is readable with these."
            },
            {
              k: 'g', give: 12,
              text: "Okay, $12.00 back so you can keep them as driving backups and we skip the return process.",
              why: "Paying to avoid a review reinforces feedback pressure tactics",
              reply: "Fine, $12 makes them decent glove-box sunglasses."
            },
            {
              k: 'w',
              text: "Please don't leave a warning review - it honestly does say Non-Polarized if you scroll down the page.",
              why: "Begging about reviews instead of restating calm return terms looks weak",
              reply: "If you don't want that review, $20 solves it right now."
            },
            {
              k: 't',
              trap: "Feedback extortion trap",
              why: "Threatening to get negative reviews removed mid-chat provokes buyers",
              text: "Leave whatever review you want - since you didn't read the listing, eBay will wipe your feedback anyway.",
              reply: "Try me! Let's see what eBay thinks of that attitude."
            }
          ]
        }
      ],
      close: "Actually, non-polarized lets me read my boat GPS screen without blacking out. Keeping them.",
      closeBranch: {
        gave: "Works fine as a glove-box pair with the refund you sent. Keeping them.",
        tense: "Painful chat, honestly, but at least I can read my dashboard. Keeping them."
      }
    },

    /* ---------- 5 : Photo-Less Micro-Scratch Bluff ---------- */
    {
      name: 'The Scratch Bluff', user: 'scuffed_steve', fb: 19, color: '#b45309',
      item: 'Navy Acetate Rectangle 54-17-145', art: { shape: 'square', frame: '#1e3a8a', lens: '#93c5fd' },
      tasks: [{ after: 2, id: 'scratch' }],
      rounds: [
        {
          m: ["These arrived SCRATCHED! Deep gouge right across the right temple. Send $35 back or I open an INAD case."],
          o: [
            {
              k: 'b',
              text: "Sorry to hear that. Please send a clear photo of the temple so I can compare with my dispatch shots.",
              reply: "Why do I have to do photography work to prove damage?"
            },
            {
              k: 'g', give: 12,
              text: "So sorry about a mark in transit - I'll send $12.00 back right away to save us both the trouble.",
              why: "Refunding without a single photo fuels partial-refund fishing",
              reply: "$12 without even seeing it? Must happen to your frames a lot."
            },
            {
              k: 'w',
              text: "Oh no, that's really weird - are you sure it isn't just a little dust or dried polish on the acetate?",
              why: "Guessing without asking for photo documentation stalls resolution",
              reply: "I know the difference between dust and a gouge! Send $35!"
            },
            {
              k: 't',
              trap: "Accusatory tone",
              why: "Calling an unverified claim a scam before seeing photos backfires",
              text: "Every frame leaves here mint - buyers pull this scratch story all the time to fish for partial refunds.",
              reply: "Calling me a scammer without even checking?! Opening INAD!"
            }
          ]
        },
        {
          m: ["I'm not messing with uploads - I shouldn't have to prove anything. Give me $30 and I drop the whole claim."],
          branch: {
            b: ["I'm not wasting my night taking macro photos. Just trust your buyer - send $30 and I drop it."],
            g: ["You already gave $12 with no photo, so skip the paperwork and add $18 more to close this out."],
            w: ["It's not dust and I'm not sending photos. Send $30 right now or I open an INAD return."],
            t: ["After calling me a scammer, I'm definitely not jumping through hoops. $30 now or I report you."]
          },
          o: [
            {
              k: 'b',
              text: "I get the hassle, but eBay asks for condition photos on damage claims. Send one and I'll act fast.",
              reply: "Fine, give me ten seconds. Uploading one now."
            },
            {
              k: 'g', give: 11,
              text: "Alright, skip the photo upload - I'll send $11.00 back right now as goodwill so you don't have to bother.",
              why: "Waiving photo proof confirms the partial-refund bluff works",
              reply: "See how easy that was? Still short of $30 though."
            },
            {
              k: 'w',
              text: "Well, I guess I can't force you to take a picture if your phone camera isn't cooperating right now.",
              why: "Backing down on photo verification leaves you defenseless",
              reply: "Great, so since you don't need a photo, send the $30!"
            },
            {
              k: 't',
              trap: "Escalation trap",
              why: "Refusing to assist unless the buyer backs off escalates straight to eBay",
              text: "No photo means no damage in my book - go ahead and open your eBay case and see how far it gets.",
              reply: "Bet! Opening an INAD case right now and quoting that line."
            }
          ]
        },
        {
          m: ["Fine, photo attached! See that bright line on the temple? (attachment: blurry dark shot under ceiling lamp)"],
          branch: {
            b: ["Happy now? Photo attached - see that bright white line on the right temple? (blurry lamp reflection)"],
            g: ["Here's your photo anyway - bright line right on the temple. Add $15 on top of what you sent."],
            w: ["Took a quick pic anyway - giant white line on the temple. Now pay up! (blurry ceiling-lamp glare)"],
            t: ["Here's the proof you demanded - bright gouge on the temple. Pay up or I send this to eBay!"]
          },
          o: [
            {
              k: 'b',
              text: "That bright line looks like lamp glare and dispatch shots show it clean. Mind a sunlit angle?",
              reply: "Sunlit angle? You're really making me work for this."
            },
            {
              k: 'g', give: 13,
              text: "It's pretty blurry, though I think I might see a hairline mark - sending $13.00 back just to be safe.",
              why: "Conceding on an unreadable photo rewards low-effort bluffs",
              reply: "Good - knew you'd spot it once you looked."
            },
            {
              k: 'w',
              text: "Hmm, the lighting is super dark so it's really hard to tell if that's a mark or just glare on glossy navy.",
              why: "Indecisive response fails to cite dispatch photos or request a clear shot",
              reply: "It's NOT glare! Stop squinting and send the refund!"
            },
            {
              k: 't',
              trap: "Accusatory tone",
              why: "Insulting the buyer's photo as intentional trickery triggers INAD",
              text: "You clearly took that in the dark so a ceiling reflection looks like a scratch - nice try.",
              reply: "Accusing me of faking photos?! I'm forwarding this to eBay!"
            }
          ]
        },
        {
          m: ["Forget more photos. The hinge screw feels slightly loose too. $20 back or I return them INAD on your dime."],
          branch: {
            b: ["Forget daylight photos. The right hinge screw is loose too. $20 back now or I return INAD on your dime."],
            g: ["Forget more angles - the hinge screw is loose too. Send $11 more or I open an INAD return."],
            w: ["Done with photos. Plus a hinge screw is loose. $20 right now or you're paying return postage both ways."],
            t: ["After accusing me of staging photos, plus a loose hinge screw, it's $20 now or an INAD case tonight."]
          },
          o: [
            {
              k: 'b',
              text: "You can return them via eBay - I'll inspect against dispatch photos and refund per policy.",
              reply: "Wait... you actually inspect returns against dispatch photos?"
            },
            {
              k: 'g', give: 11,
              text: "Let's skip return shipping - I'll send $11.00 back to cover a tiny screwdriver tune-up and close this.",
              why: "Paying to avoid a return confirms the threat works",
              reply: "Finally. Should have skipped the photo drama."
            },
            {
              k: 'w',
              text: "A loose screw is super easy to fix with a butter knife - please don't open an INAD return over that.",
              why: "Suggesting a butter knife risks scratching lenses while pleading looks weak",
              reply: "A butter knife on my lenses?! Forget it, I want $20!"
            },
            {
              k: 't',
              trap: "INAD admission",
              why: "Admitting warehouse QC slipped locks you into seller-paid INAD postage",
              text: "Yeah, our packing bench missed tightening screws on a few pairs last week - just keep them and don't file.",
              reply: "You just admitted defective QC in writing! Opening INAD right now!"
            }
          ]
        }
      ],
      close: "...never mind. Wiped it with the microfiber cloth and it vanished. Keeping them.",
      closeBranch: {
        gave: "Wiped clean after all, and thanks for the extra cash. Keeping them.",
        tense: "Rough chat, honestly, but the mark wiped right off. Keeping them."
      }
    }
  ]);
})();
