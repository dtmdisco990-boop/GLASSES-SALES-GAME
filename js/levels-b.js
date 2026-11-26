/* Frame Margin — levels 6-10 (Tier 2 escalating optical/eBay abuse, then first double-problem buyer) */
(function () {
  'use strict';
  var FM = window.FM;
  FM.LEVELS = (FM.LEVELS || []).concat([

    /* ---------- 6 : Off-eBay Pickup & Bundle Scheme ---------- */
    {
      name: 'Off-eBay Bundle Scheme', user: 'cash_bundle_bo', fb: 56, color: '#be185d',
      item: 'Crystal Cat-Eye 52-17-142', art: { shape: 'cat', frame: '#c98aa8', lens: '#f1c6d9' },
      tasks: [{ after: 2, id: 'recount' }],
      rounds: [
        {
          m: ["I'm only 15 minutes from your zip code! I'll swing by tonight - refund shipping AND knock 15% off."],
          o: [
            {
              k: 'b',
              text: "Thanks for asking, but this listing is ship-only. It's packed and goes out tracked today as ordered.",
              reply: "Ship-only when I'm right down the road? That's wild."
            },
            {
              k: 'g', give: 11,
              text: "I can't do local pickup on this listing, though I'll refund $11.00 of the shipping cost to help out.",
              why: "Refunding shipping on a ship-only listing invites bigger off-platform asks",
              reply: "Nice, $11 back already. Now let's talk about a bundle."
            },
            {
              k: 'w',
              text: "Hmm, local pickup can be kind of awkward to coordinate around store hours, so I'm not sure where we'd meet.",
              why: "Leaving pickup open as a logistics issue invites the buyer to push",
              reply: "Easy - I'll meet you in your parking lot at 6pm sharp!"
            },
            {
              k: 't',
              trap: "Policy trap",
              why: "Agreeing to off-eBay local cash pickup forfeits seller protection and violates policy",
              text: "Sure, cancel here and bring $90 cash to the shop tonight so we skip shipping and eBay fees.",
              reply: "Wait - you want me to cancel on eBay and bring cash?! Sketchy!"
            }
          ]
        },
        {
          m: ["Forget pickup then - text me your number and I'll Venmo $55 for your tortoise listing too so we save eBay's 13% fee."],
          branch: {
            b: ["Fine, ship this one. Text me your number so I can Venmo $55 for your tortoise pair and skip eBay's 13% fee."],
            g: ["Since you just hooked me up with $11, send your Venmo and I'll add your tortoise pair for $50 off-eBay."],
            w: ["Skip the parking lot then - text me your Venmo and I'll grab your tortoise pair for $55 with no eBay fees."],
            t: ["Wait, if you're fine skipping fees, just drop your Venmo here and I'll grab your tortoise pair for $50 too."]
          },
          o: [
            {
              k: 'b',
              text: "All sales stay on eBay. I can send a combined-shipping eBay offer at the listed price.",
              reply: "Sticking strictly to the platform, huh? Fine."
            },
            {
              k: 'g', give: 10,
              text: "I have to keep everything inside eBay, though I'll take $10.00 off this order if you bundle both on eBay.",
              why: "Discounting an already-paid order to chase a second sale bleeds margin",
              reply: "Cool, I'll take the $10 off now and think about the second pair."
            },
            {
              k: 'w',
              text: "I'm honestly not sure if I still have that tortoise pair in stock - let me check the back shelf sometime.",
              why: "Dodging the off-eBay Venmo ask fails to shut down a policy-risk request",
              reply: "Okay well text me once you check so we can do Venmo."
            },
            {
              k: 't',
              trap: "Policy trap",
              why: "Sharing phone numbers or payment handles in eBay Messages risks account suspension",
              text: "Look up my shop name online for my direct Venmo - eBay scans handles here.",
              reply: "Trying to dodge eBay's message filter?! I'm flagging this chat!"
            }
          ]
        },
        {
          m: ["Fine, keep it on eBay. Then throw in a free polarized clip-on and hard case - every boutique seller does."],
          branch: {
            b: ["Alright, keep it on eBay. At least toss in a free polarized clip-on and hard case like other shops do."],
            g: ["You're already helping me out - toss a polarized clip-on and hard case in the box before you seal it."],
            w: ["Never mind the second pair. Just toss a free polarized clip-on and hard case into this order."],
            t: ["Forget off-eBay deals - throw in a free polarized clip-on and hard case or I'm done with this shop."]
          },
          o: [
            {
              k: 'b',
              text: "This order includes the microfiber pouch pictured in photo 6. Hard cases and clip-ons are sold separately.",
              reply: "Nickel-and-diming over a case and clip-on. Great."
            },
            {
              k: 'g', give: 12,
              text: "I can't include a clip-on, though I'll add a hard case on me - that's $12.00 out of my margin.",
              why: "Throwing in unlisted accessories rewards persistent haggling",
              reply: "Nice, at least I got the hard case out of it."
            },
            {
              k: 'w',
              text: "I really wish I could toss extras in, honestly, optical cases and clip-ons have gotten so expensive lately.",
              why: "Complaining about wholesale costs leaves your boundaries soft",
              reply: "Not my fault your supplier raised prices - throw one in anyway."
            },
            {
              k: 't',
              trap: "Dismissive brush-off",
              why: "Telling buyers to shop elsewhere invites cancellations and bad reviews",
              text: "If those other boutique sellers hand out free clip-ons and cases, you should probably buy from them instead.",
              reply: "Telling a paying customer to shop elsewhere?! Unbelievable."
            }
          ]
        },
        {
          m: ["No pickup, no Venmo deal, no case. Give me $15 back right now or I cancel and leave a neutral on communication."],
          branch: {
            b: ["No pickup, no bundle break, no case. Give me $15 back or I cancel and leave neutral feedback."],
            g: ["You already budged once - make it $10 more and I won't cancel or leave a neutral on communication."],
            w: ["Stop making excuses. $15 back right now or I cancel the whole order and leave neutral feedback."],
            t: ["After telling me to shop elsewhere, refund $15 right now or I cancel and leave a brutal review."]
          },
          o: [
            {
              k: 'b',
              text: "I can't discount a paid order, sorry. Happy to cancel free now or ship tracked today.",
              reply: "Alright, don't cancel - I actually want the crystal cat-eyes."
            },
            {
              k: 'g', give: 10,
              text: "Let's keep the order moving - I'll send $10.00 back now and get them dropped at USPS today.",
              why: "Paying to stop a cancellation threat cuts directly into your floor",
              reply: "Finally. That's all I was asking for."
            },
            {
              k: 'w',
              text: "Please don't cancel - I already printed your shipping label and taped the box shut on the desk.",
              why: "Begging not to cancel signals desperation instead of calm options",
              reply: "Sounds like saving the label is worth $15 to you then."
            },
            {
              k: 't',
              trap: "Escalation threat",
              why: "Threatening to report a buyer mid-thread guarantees negative fallout",
              text: "Asking for off-eBay Venmo and threatening neutrals breaks eBay rules - I'm reporting your account now.",
              reply: "Reporting ME?! Cancel everything, I'm calling eBay Support!"
            }
          ]
        }
      ],
      close: "No pickup, no Venmo, no free case. Fine - ship the crystal cat-eyes.",
      closeBranch: {
        gave: "Got a credit out of it at least. Go ahead and ship them.",
        tense: "Wildly tense chat, honestly, but I still want the frames. Ship them."
      }
    },

    /* ---------- 7 : Prescription, PD & Axis Dispute ---------- */
    {
      name: 'Rx, PD & Axis Dispute', user: 'rx_rita', fb: 143, color: '#9d174d',
      item: 'Rose Gold Oval 50-19-140 + Rx', art: { shape: 'oval', frame: '#c98b6b', lens: '#f5d0c5' },
      tasks: [{ after: 1, id: 'lens' }],
      rounds: [
        {
          m: ["My right lens is WRONG! I ordered OD -2.25 and everything looks swimmy and blurry. You sent someone else's Rx!"],
          o: [
            {
              k: 'b',
              text: "Sorry it feels swimmy. Your order and lab slip both show OD -2.25, OS -1.75 - mind checking it?",
              reply: "The paper slip says -2.25, sure, that doesn't mean the lens does!"
            },
            {
              k: 'g', give: 10,
              text: "So sorry the right lens feels off - I'll refund $10.00 now while we check.",
              why: "Refunding before checking the lab slip concedes an unverified lab error",
              reply: "$10 doesn't fix blurry vision, though it tells me your lab messes up."
            },
            {
              k: 'w',
              text: "Blurry how? AR coatings pick up transit oils easily, so maybe wipe them well?",
              why: "Guessing smudges instead of verifying the order Rx frustrates Rx buyers",
              reply: "I know how to clean glasses! The prescription power is wrong!"
            },
            {
              k: 't',
              trap: "Condescending blame",
              why: "Blaming the buyer's eye doctor or prescription input escalates Rx disputes",
              text: "Labs cut straight from what you typed - sounds like your optometrist wrote a sloppy Rx or you mistyped it.",
              reply: "Blaming my doctor AND me?! I'm opening an INAD case right now!"
            }
          ]
        },
        {
          m: ["The slip says -2.25, but I can FEEL it's wrong compared to my old glasses! Refund $45 for the lenses."],
          branch: {
            b: ["Paper slips can be wrong - my old pair is way sharper! Refund $45 for these lenses right now."],
            g: ["You already sent $10 because you doubt your own lab. Refund $35 more for the lenses right now."],
            w: ["They're spotless and still swimmy! My old glasses are way sharper - refund $45 for the lenses."],
            t: ["After insulting my optometrist, I definitely don't trust your lab. Refund $45 for the lenses right now."]
          },
          o: [
            {
              k: 'b',
              text: "New Rx takes 3-5 days to settle. If an optician's lensometer reading differs, I'll remake free.",
              reply: "Why should I visit an optician to prove your lab slipped?"
            },
            {
              k: 'g', give: 9.5,
              text: "Adjustment can take a few days, though I'll send $9.50 back now for the discomfort while you test them.",
              why: "Paying for normal Rx adaptation invites a full remake demand next",
              reply: "Thanks for the $9.50, though I still want a remake."
            },
            {
              k: 'w',
              text: "Every lab grinds lens curvature slightly differently, so honestly it's hard to say why they feel weird.",
              why: "Vague guesswork offers neither lensometer verification nor a remake rule",
              reply: "You're an optical seller and you don't know why they're blurry?!"
            },
            {
              k: 't',
              trap: "Dismissive brush-off",
              why: "Telling a buyer they're imagining vision issues provokes immediate disputes",
              text: "You can't feel a quarter-diopter just putting frames on - give it a rest and wear them.",
              reply: "Did you just tell me to 'give it a rest' about my eyesight?!"
            }
          ]
        },
        {
          m: ["I'm not paying an optician to verify YOUR lab! Remake them with my exact PD 62 and overnight them free."],
          branch: {
            b: ["I'm not paying an optical shop to verify YOUR lab! Remake them right now and overnight them free."],
            g: ["Since you're already issuing credits, stop stalling - remake the lenses and overnight them free."],
            w: ["Since you have no clue why they're blurry, remake them today and overnight them on your dime."],
            t: ["After dismissing my eyesight, remake these lenses today and overnight them free or I report your shop."]
          },
          o: [
            {
              k: 'b',
              text: "Most optical counters run a free 2-minute lensometer check. If power, axis, or PD 62 is off, remake is on me.",
              reply: "Fine, there's an optical counter inside the grocery store."
            },
            {
              k: 'g', give: 11,
              text: "I'll send $11.00 toward an optical shop verification check so you aren't out of pocket for testing them.",
              why: "Paying for a check most optical counters do free leaks margin",
              reply: "Good - if I'm making the trip, you should pay for it."
            },
            {
              k: 'w',
              text: "A full Rx remake takes our lab about a week plus shipping, so are you sure you want to wait that long?",
              why: "Discouraging a remake by citing delays avoids stating verification criteria",
              reply: "I wouldn't have to wait if you got them right the first time!"
            },
            {
              k: 't',
              trap: "INAD admission",
              why: "Admitting lab calibration issues without a lensometer reading hands over INAD",
              text: "Our lab has had a few axis calibration hiccups this month - send them back and I'll cover overnight both ways.",
              reply: "Your lab has calibration hiccups?! Forget a remake, I want a full refund!"
            }
          ]
        },
        {
          m: ["My optician friend looked at them and says the PD and cylinder axis look slightly off! Half refund or I report you."],
          branch: {
            b: ["Wait - my friend says the PD looks narrow and axis feels tilted! That's two flaws - half refund or report."],
            g: ["Plus my friend says the PD and axis look off! Send $9 more right now or I report your lab to eBay."],
            w: ["On top of your slow lab, my friend says the PD and axis look off! Half refund right now or I report you."],
            t: ["Even my friend spotted the axis and PD look off! Half refund right now or I file INAD with your chat."]
          },
          o: [
            {
              k: 'b',
              text: "PD 62 and axis match your checkout order attached here. A quick lensometer printout settles both.",
              reply: "Fine. I'll get the actual printout tomorrow."
            },
            {
              k: 'g', give: 9,
              text: "Let's wrap this smoothly - I'll send $9.00 back while you get a lensometer check.",
              why: "Paying on a friend's eyeball guess rewards unverified claims",
              reply: "Fine, $9 takes the sting out while I get them checked."
            },
            {
              k: 'w',
              text: "Your friend might be picking up on prism from the oval frame shape - it's really tough to judge by eye.",
              why: "Introducing 'prism' doubts without anchoring to checkout specs confuses buyers",
              reply: "Wait, prism?! Now you're saying there's prism error too?!"
            },
            {
              k: 't',
              trap: "Medical overreach",
              why: "Making medical claims or insulting the buyer's friend backfires on eBay",
              text: "Your friend can't eyeball a 62 mm PD, and I guarantee these lenses won't hurt your eyes - stop worrying.",
              reply: "Guaranteeing my medical eye health in writing?! Forwarding to eBay!"
            }
          ]
        }
      ],
      close: "...the optical counter lensometer says -2.25, axis and 62 PD are spot on. My eyes just needed two days.",
      closeBranch: {
        gave: "Lensometer actually read spot on - guess I just needed two days, plus thanks for the refund.",
        tense: "Rough chat, honestly, though the lensometer confirmed they're right. Keeping them."
      }
    },

    /* ---------- 8 : Feedback Extortion & Carrier Delay ---------- */
    {
      name: 'Feedback Extortion', user: 'feedback_fiona', fb: 1402, color: '#1d4ed8',
      item: 'Olive Keyhole 48-21-145', art: { shape: 'round', frame: '#556b2f', lens: '#cfe3a8' },
      tasks: [{ after: 3, id: 'courier' }],
      rounds: [
        {
          m: ["USPS took FOUR days to deliver these! Totally unacceptable. Send $25 back or I leave negative feedback."],
          o: [
            {
              k: 'b',
              text: "Glad they arrived safely. They shipped same day and landed inside checkout's 3-5 day window.",
              reply: "Four days still feels slow when I paid $100 for glasses."
            },
            {
              k: 'g', give: 9,
              text: "Sorry the transit felt slow - I'll send $9.00 back right now to make up for the extra day in shipping.",
              why: "Refunding for on-time carrier delivery rewards feedback threats",
              reply: "$9 is barely postage, though it's a step in the right direction."
            },
            {
              k: 'w',
              text: "USPS has been running really sluggish all week in our region, so sadly delivery speed is out of my hands.",
              why: "Failing to cite your same-day dispatch and checkout estimate sounds passive",
              reply: "I didn't buy from USPS, I bought from YOU! Make it right!"
            },
            {
              k: 't',
              trap: "Dismissive brush-off",
              why: "Telling buyers delivery speed isn't your responsibility provokes negatives",
              text: "Once USPS scans the parcel, transit time isn't on me - take it up with them.",
              reply: "'Take it up with the post office'?! Oh, that's going in my review!"
            }
          ]
        },
        {
          m: ["Look at my profile: 1,402 feedback. One negative from me sinks a small eyewear shop. $20 back keeps it 5 stars."],
          branch: {
            b: ["Look at my account: 1,402 feedback. One negative from me dents your store hard. $20 back keeps it 5 stars."],
            g: ["I have 1,402 feedback, so $9 won't cut it. Add $11 more and I'll leave a spotless 5-star review."],
            w: ["I don't care about USPS excuses - I have 1,402 feedback. Send $20 back right now to keep your rating safe."],
            t: ["With 1,402 feedback, quoting 'take it up with USPS' will wreck your score. Send $20 or I post it."]
          },
          o: [
            {
              k: 'b',
              text: "I value honest reviews, though eBay policy bars trading refunds for feedback scores.",
              reply: "Excuse me?! Are you accusing ME of extortion?!"
            },
            {
              k: 'g', give: 8.5,
              text: "I want you happy with the order - here's $8.50 back as goodwill for the wait.",
              why: "Paying immediately after a feedback threat reinforces extortion tactics",
              reply: "Smart move protecting your feedback score."
            },
            {
              k: 'w',
              text: "A negative review would really hurt my small optical shop's search ranking - please reconsider leaving one?",
              why: "Pleading over your feedback score gives the buyer maximum leverage",
              reply: "Then $20 is a bargain to protect your search ranking!"
            },
            {
              k: 't',
              trap: "Policy trap",
              why: "Offering a refund conditioned on 5-star feedback violates eBay Feedback Extortion Policy",
              text: "Post the 5-star review first so my metrics stay safe, and once it's live I'll send $10 back to you.",
              reply: "Bribing me for 5 stars in eBay Messages?! Reporting your account!"
            }
          ]
        },
        {
          m: ["Did you seriously just imply I'm extorting you?! Now I want $30 back AND a formal apology."],
          branch: {
            b: ["Did you seriously just imply I'm committing extortion?! Now I want $30 back AND an apology."],
            g: ["Wait - you paid $8.50 and still act like I'm shaking you down? Make it $15 more and apologize."],
            w: ["Stop whining about your ranking and stop acting like I'm the bad guy. $30 back and an apology."],
            t: ["First you try a shady review deal, now this?! Send $30 and a real apology or I contact eBay."]
          },
          o: [
            {
              k: 'b',
              text: "No accusation at all - just following eBay rules to protect us both. Happy to help with the frames.",
              reply: "Hmph. Well at least you walked that back politely."
            },
            {
              k: 'g', give: 10,
              text: "I apologize if that came across wrong - I'm sending $10.00 back right now to smooth things over.",
              why: "Caving when a buyer plays offended rewards manufactured outrage",
              reply: "Better. Though the box wasn't pristine either."
            },
            {
              k: 'w',
              text: "Oh no, I definitely didn't mean it like that at all, I'm so sorry I brought up any rules, never mind.",
              why: "Retracting valid eBay policy nervously invites fresh demands",
              reply: "Good - stop quoting rules at me and fix my order!"
            },
            {
              k: 't',
              trap: "Escalation threat",
              why: "Accusing the buyer directly and threatening to report escalates the feud",
              text: "Demanding $20 or a negative review is textbook feedback extortion - I'm reporting your 1,402 account to eBay.",
              reply: "Threatening my 1,402 account?! Oh, you just made a huge mistake!"
            }
          ]
        },
        {
          m: ["Also the cardboard shipping box had a corner dent and the olive case has a tiny scuff. Last offer: $15 cash back."],
          branch: {
            b: ["Also the outer mailer got dented and scuffed the olive case. Last offer: $15 back or it goes in my review."],
            g: ["One last thing - the case picked up a tiny transit scuff. Add $8.50 more and I won't mention it."],
            w: ["And the case got scuffed inside the mailer! Since you're done quoting rules, send $15 back right now."],
            t: ["On top of threatening my account, the case arrived scuffed! $15 back now or both go in my review."]
          },
          o: [
            {
              k: 'b',
              text: "Sorry about the case scuff. Send a quick photo and I'll mail a fresh case today free.",
              reply: "A brand-new case mailed out today? Okay, that's actually fair."
            },
            {
              k: 'g', give: 8.5,
              text: "Sorry about the scuffed case - I'll send $8.50 back right now rather than mailing another case out.",
              why: "Paying cash for an unphotographed minor scuff rewards last-second fishing",
              reply: "Fine, $8.50 works for a scuffed case."
            },
            {
              k: 'w',
              text: "Outer mailers always get minor sorting bumps, so a tiny scuff really isn't bad.",
              why: "Minimizing a buyer's reported case scuff without offering a fix feels dismissive",
              reply: "Don't tell me what 'isn't bad' on a $100 purchase!"
            },
            {
              k: 't',
              trap: "Accusatory tone",
              why: "Suggesting the buyer made up a scuff to chase money triggers hostility",
              text: "Funny how a scuffed case only showed up after the shipping complaint failed - send proof or drop it.",
              reply: "Calling me a liar?! That's a guaranteed 1-star review!"
            }
          ]
        }
      ],
      close: "A replacement case works. The frames themselves fit great - I'll leave a fair review.",
      closeBranch: {
        gave: "Between the refund and the frames fitting well, we're square.",
        tense: "Easily the testiest seller chat I've had, though the replacement case works."
      }
    },

    /* ---------- 9 : Wardrobing & Swapped-Frame Return Abuse ---------- */
    {
      name: 'Wardrobing Return Abuse', user: 'weekend_wear_wade', fb: 8, color: '#b91c1c',
      item: 'Havana Browline 52-19-145', art: { shape: 'square', frame: '#7a4a21', lens: '#e0c9a6' },
      tasks: [{ after: 1, id: 'printer' }, { after: 3, id: 'scratch' }],
      rounds: [
        {
          m: ["I wore these to a wedding Saturday and decided browlines aren't my vibe. Full $100 refund - and I tossed the case & cloth."],
          o: [
            {
              k: 'b',
              text: "30-day eBay returns stay open. Items must return intact with accessories to avoid deductions.",
              reply: "Deductions?! It's just a case and a cloth - nobody keeps those!"
            },
            {
              k: 'g', give: 8.5,
              text: "I hear you on the style not clicking - keep them and I'll send $8.50 back so we skip the return.",
              why: "Offering cash on pure buyer remorse encourages return leverage",
              reply: "$8.50 won't make me like browlines, though I'll keep pushing."
            },
            {
              k: 'w',
              text: "Oh no, you already threw away the hard case and cleaning cloth? I really need those to resell the pair.",
              why: "Complaining about resale without stating eBay return condition rules looks soft",
              reply: "Sounds like a resale headache for you - just send a refund anyway."
            },
            {
              k: 't',
              trap: "Policy violation",
              why: "Refusing to accept an eligible eBay return forces eBay to refund without return",
              text: "You wore them to a wedding and trashed the case - I'm refusing any return on worn frames, period.",
              reply: "Refusing a return on eBay?! Let's see how fast eBay refunds me anyway!"
            }
          ]
        },
        {
          m: ["Fine, I'll file 'Item Not As Described - arrived worn & bent' so I get 100% back with free postage. Unless you send $30."],
          branch: {
            b: ["Deductions? Then I'll file 'arrived worn & stretched' so I get a free label and 100% back - unless you send $30."],
            g: ["Since you already offered cash, make it $22 more and I won't file 'arrived worn' for a full refund."],
            w: ["Forget reselling them - I'll file 'arrived worn & bent' for a full refund and free label unless you send $30."],
            t: ["Try refusing an INAD! I'll claim they arrived worn and stretched - send $30 now or lose all $100."]
          },
          o: [
            {
              k: 'b',
              text: "You're welcome to open an eBay return. Your Saturday-wear note and dispatch photos stay on file.",
              reply: "Wait... eBay actually reads these messages during return reviews?"
            },
            {
              k: 'g', give: 8,
              text: "Let's avoid an INAD dispute - I'll refund $8.00 now if you decide to keep them as spare shades.",
              why: "Paying off an explicit wardrobing INAD threat rewards abuse",
              reply: "Thought mentioning INAD would speed things along."
            },
            {
              k: 'w',
              text: "Please don't file 'arrived worn' when they were brand new - false INADs really hurt my seller metrics.",
              why: "Pleading about seller metrics hands leverage straight to an abusive buyer",
              reply: "Great, so $30 to save your metrics sounds totally fair!"
            },
            {
              k: 't',
              trap: "Accusatory tone",
              why: "Calling the buyer a scammer/wardrober aggressively escalates conflict",
              text: "Free wedding rentals and lying on an INAD form is flat-out theft - I'll make sure eBay suspends you.",
              reply: "Calling me a thief in eBay Messages?! Reporting you for harassment!"
            }
          ]
        },
        {
          m: ["Whatever. I have an older brown pair lying around - maybe I'll just drop those in the return box. Nobody checks serials."],
          branch: {
            b: ["Fine, I'll return a pair anyway - maybe my old scuffed browlines. Nobody checks temple serial codes."],
            g: ["Or I return my older brown frames and keep these plus your refund. Nobody checks temple serials anyway."],
            w: ["If you won't pay $30, I'll just ship back my old worn browlines in the box. Nobody checks serials."],
            t: ["Keep threatening me and I'll just return an old worn pair in the box - prove it wasn't what you sent!"]
          },
          o: [
            {
              k: 'b',
              text: "Inner-temple serials and 5-barrel hinge stamps are logged before shipping for eBay inspection.",
              reply: "You photographed the inner-temple serial? Seriously?!"
            },
            {
              k: 'g', give: 9,
              text: "Please don't swap frames - take $9.00 back right now and let's just leave this order closed.",
              why: "Paying hush money over a return-swap threat sets a dangerous precedent",
              reply: "Knew you didn't want to deal with an inspection claim."
            },
            {
              k: 'w',
              text: "Hey, sending back different glasses really isn't cool - I'd definitely notice if the color looked older.",
              why: "Casual warning without citing serial photo documentation sounds bluffable",
              reply: "Same tortoise color, same shape - bet eBay sides with me anyway!"
            },
            {
              k: 't',
              trap: "Policy trap",
              why: "Threatening to withhold 100% outside eBay's return deduction guidelines backfires",
              text: "Swap frames and I'll keep 100% of your money and post your address online.",
              reply: "Threatening to dox a buyer?! I'm calling eBay Trust & Safety right now!"
            }
          ]
        },
        {
          m: ["Ugh, fine, I'll return the real ones - just refund me NOW before I drop the box off so I can buy another pair today."],
          branch: {
            b: ["Fine, I'll send the real pair back - just issue the refund NOW before tracking scans so I can shop today."],
            g: ["Okay, real pair then - send $8 more or refund me before I drop the box off so I can buy another pair."],
            w: ["Alright, alright, I'll mail the real pair - just refund me upfront right now so I don't have to wait."],
            t: ["Done arguing - refund me upfront right now before I mail the real pair back, or I escalate this chat!"]
          },
          o: [
            {
              k: 'b',
              text: "Per eBay policy, refunds issue after tracked return delivery and inspection. Window is 30 days.",
              reply: "No upfront refund, serials logged... yeah, forget it."
            },
            {
              k: 'g', give: 8,
              text: "I can't refund upfront, though I'll send $8.00 back right now if you'd rather just keep them.",
              why: "Giving a parting discount after neutralizing every bluff wastes margin",
              reply: "Alright, $8 off makes them decent weekend shades."
            },
            {
              k: 'w',
              text: "Usually sellers wait until the package gets back, I guess, because what if it gets lost in the mail?",
              why: "Sounding hesitant about standard return-before-refund rules invites pushing",
              reply: "It won't get lost - I'm literally walking to USPS! Refund now!"
            },
            {
              k: 't',
              trap: "Policy trap",
              why: "Promising an upfront refund before tracked return delivery causes total loss",
              text: "Okay, send a photo of the sealed box with the label on it and I'll refund half right now before USPS scans.",
              reply: "Half now for a photo of a box?! You're begging to get burned."
            }
          ]
        }
      ],
      close: "...not worth the hassle without the case. Honestly they looked good in the wedding photos anyway. Keeping them.",
      closeBranch: {
        gave: "With the cash back, I'll just keep them as backup shades. Thanks.",
        tense: "Rough thread, honestly, though I'll just keep the browlines."
      }
    },

    /* ---------- 10 : FIRST DOUBLE-PROBLEM BUYER (Polarized Glare + Overnight) ---------- */
    {
      name: 'Polarized + Overnight', user: 'double_trouble_dee', fb: 301, color: '#6d28d9',
      item: 'Slate Polarized Round 47-22-145', art: { shape: 'round', frame: '#4a6fa5', lens: '#bcd4f0' },
      tasks: [{ after: 1, id: 'dispute' }, { after: 3, id: 'robber' }],
      rounds: [
        {
          m: ["These 'polarized' lenses failed my phone test - zero dimming!", "ALSO I need a replacement overnighted free by Friday's trip."],
          o: [
            {
              k: 'b',
              text: "Rotate the lens 90 deg at an LCD to test polarization. Overnight shipping is a $24 upgrade.",
              reply: "Rotate 90 degrees? Fine, I'll test that - $24 is steep though."
            },
            {
              k: 'w',
              text: "Hold the lens in front of your phone LCD and rotate it 90 degrees until it darkens.",
              why: "Answered the polarized test but dodged the free overnight demand",
              reply: "Great, you ignored the Friday overnight shipping part completely!"
            },
            {
              k: 'g', give: 7,
              text: "Try rotating 90 deg on an LCD screen for the polarized test - and I'll put $7.00 toward faster shipping.",
              why: "Subsidizing express shipping on an unverified claim leaks margin",
              reply: "Cool, $7 toward shipping is a start, though Friday is tight."
            },
            {
              k: 't',
              trap: "Condescending tone",
              why: "Mocking a buyer's test method and deadline escalates both issues at once",
              text: "You held the lens at the wrong angle - learn how polarization works before demanding free overnight shipping.",
              reply: "Telling me to 'learn how it works'?! Opening a case on both!"
            }
          ]
        },
        {
          m: ["Your listing said 'fast shipping' - 3 days is NOT fast.", "And there's a hairline lens scratch, no time to upload a photo."],
          branch: {
            b: ["Okay, rotating 90 deg darkened it - but 3 days isn't 'fast shipping'.", "Plus there's a tiny lens scratch; trust me, no time for photos."],
            g: ["Since you sent $7 already, 3 days still wasn't 'fast shipping'.", "Plus there's a hairline lens scratch - send $10 more, skip photos."],
            w: ["Still dodging overnight - your listing promised 'fast shipping', not 3 days!", "AND there's a lens scratch; I'm too busy to upload a photo."],
            t: ["After your attitude, 3 days wasn't 'fast shipping' either!", "AND there's a lens scratch - fix both or I report this whole chat."]
          },
          o: [
            {
              k: 'b',
              text: "Shipped same day inside checkout's 3-5 day quote. Send a clear lens photo so I can check.",
              reply: "Fine, I'll snap a lens photo in a second."
            },
            {
              k: 'w',
              text: "Your order shipped the same day you paid, which matches checkout's 3-5 business day delivery window.",
              why: "Addressed shipping speed but ignored the lens scratch claim",
              reply: "You completely skipped the lens scratch! Are you even reading?!"
            },
            {
              k: 'g', give: 6.5,
              text: "Shipping met the 3-5 day quote, though I'll trust you and send $6.50 back now.",
              why: "Refunding a photo-less scratch claim rewards partial-refund fishing",
              reply: "Good - glad you skipped the photo interrogation."
            },
            {
              k: 't',
              trap: "INAD admission",
              why: "Admitting 'fast shipping' was exaggerated and skipping proof concedes INAD",
              text: "Yeah, 'fast shipping' can sound like next-day, and if you see a mark on the lens I'll eat the return cost.",
              reply: "Admitting both in writing?! Full refund and free return label!"
            }
          ]
        },
        {
          m: ["Photo sent - tiny bright mark right on the left lens!", "AND the screw-in silicone nose pads feel loose. Two defects."],
          branch: {
            b: ["Photo attached - tiny bright mark on the left lens!", "AND the screw-in nose pads feel loose. That's two defects."],
            g: ["Attached a photo anyway - bright mark on the left lens!", "Plus loose nose pads - add $8 more to cover both."],
            w: ["Here's the scratch photo you ignored earlier!", "AND the screw-in silicone nose pads wobble. Two separate defects."],
            t: ["Here's my lens photo for eBay too - bright spot right there!", "AND loose nose pads - two defects on one $100 pair!"]
          },
          o: [
            {
              k: 'b',
              text: "That spot shifts between shots - it's AR flash glare. Pad screws snug up with a quarter turn.",
              reply: "Flash glare on AR coating? Wait, let me check under daylight."
            },
            {
              k: 'w',
              text: "Those adjustable silicone nose pads use standard optical screws that tighten easily with a quick quarter turn.",
              why: "Answered the loose nose pads but ignored the lens photo",
              reply: "Okay, screws tighten - what about the bright spot in my photo?!"
            },
            {
              k: 'g', give: 8,
              text: "That spot is flash glare on the coating, though here's $8.00 back so an optician can snug the nose pads.",
              why: "Paying $8 for a 10-second quarter-turn screw check wastes margin",
              reply: "Fine, $8 covers having my optician tighten the pads."
            },
            {
              k: 't',
              trap: "Accusatory tone",
              why: "Accusing a buyer of faking a photo turns AR-glare confusion into a fight",
              text: "Using flash on AR lenses to stage a scratch claim won't fool eBay - stop inventing flaws.",
              reply: "Accusing me of manufacturing evidence?! Escalating to eBay now!"
            }
          ]
        },
        {
          m: ["I still want $25 back for all this hassle.", "AND email me a prepaid return label right now just in case."],
          branch: {
            b: ["Still want $25 back for the aggravation.", "AND send a prepaid return label upfront in case I return them."],
            g: ["Make it $6.50 more for the hassle.", "AND send a prepaid return label upfront just in case I change my mind."],
            w: ["You keep skipping half my messages! $25 back now.", "AND send a prepaid return label upfront in case I return."],
            t: ["After accusing me of faking evidence, $25 back now.", "AND send a prepaid label upfront or I open an INAD today."]
          },
          o: [
            {
              k: 'b',
              text: "No defect is confirmed, so no partial refund. Returns stay open 30 days via eBay's label flow.",
              reply: "Alright, fair enough - no defect confirmed."
            },
            {
              k: 'w',
              text: "If you open a return within 30 days, eBay generates the return label automatically.",
              why: "Explained the label process but dodged the $25 partial-refund demand",
              reply: "You didn't say yes or no to the $25! Stop dodging!"
            },
            {
              k: 'g', give: 6.5,
              text: "No upfront label needed - take $6.50 back right now to cover the hassle and let's keep the order closed.",
              why: "Paying after refuting every claim gives away hard-earned margin",
              reply: "Finally. $6.50 and we're done."
            },
            {
              k: 't',
              trap: "Policy trap",
              why: "Sending return labels off-eBay via email bypasses eBay tracking protection",
              text: "Drop your personal email and I'll send a private USPS label off-eBay so we keep any return off my metrics.",
              reply: "Asking for my email to hide returns from eBay?! Reporting this!"
            }
          ]
        }
      ],
      close: "...okay, the polarization works at 90 degrees and the 'scratch' wiped right off the AR coating. Keeping them.",
      closeBranch: {
        gave: "The glare wiped off and the credit helped. Keeping the polarized rounds.",
        tense: "Exhausting chat, honestly, though the lenses checked out clean. Keeping them."
      }
    }
  ]);
})();
