const express = require("express");
const router = express.Router();
const db = require('../../data/helpers/subDb');
const repDb = require('../../data/helpers/repDb');

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);


router.post('/addSub', async (req, res) => {
    let plan = req.body.subscription.plan;  // comes from Billing form
    let uid = req.body.uid;                  // rep uid attached to body in firebase auth check on base url

    let rep_info = await repDb.getByUid(uid);               // get info for current rep using uid
    let company_id = rep_info.company_id;              // take company_id from rep info
    let existingSub = await db.getSub(company_id);          // check Database for an existing subscription

    if (!existingSub) {
      try {
        let customer = await stripe.customers.create({
          email: rep_info.email,     // ** attach to body
          source: req.body.id,            // ** attach to body-- WHAT IS SOURCE?
        })

        let charge = await stripe.subscriptions.create({
          customer: customer.id,    // comes from creatCustomer call above
          items: [{ plan }],        
        })
        console.log('charge response from Stripe: ', charge);
        let subInfo = {
          company_id: company_id,
          stripe_customer_id: charge.customer,
          stripe_subscription_id: charge.id,
          stripe_subscription_status: charge.status,
          stripe_plan_id: charge.plan.id,
          stripe_plan_nickname: charge.plan.nickname,
          max_reps: Number(charge.plan.metadata.max_reps)         // max_reps for the payment plan set in Stripe Dashboard
        }

        let inserted = await db.insert(subInfo)

        res.status(201).json({ message: `subscription created`, inserted })
      } catch (err) {
        res.status(500).json({ error: err })
      }
    } else {
      res.status(400).json({ message: `you already have a subscription` })
    }
});

router.get('/getSub/:id', async (req, res) => {
    const company_id = req.params.id; 
    console.log('company_id in getSub endpoint: ', company_id);
    const noSubTeamSize = 5;                              // max_reps to return for 'Free' plan if no sub exists
    
    try {
        const existingSub = await db.getSub(company_id); 
        if(!existingSub) {
            res.status(200).json(noSubTeamSize);          // if no sub, return max-reps for 'Free' plan
        } else {
            res.status(200).json(existingSub.max_reps);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// router.post("/charge", async (req, res) => {
//     // Take the Stripe token and company_id from req.body:
//     let { token, company_id } = req.body;
//     // Get the company by id:
//     const company = db.getById(company_id);

//     if (company.length === 0) {
//         console.log("Company not found");
//         return res.status(500).send("Company not found");
//     }
//     // Charge company $30:
//     try {
//         let { status } = await stripe.charges.create({
//             amount: 3000,
//             currency: "usd",
//             source: req.body.token
//         });
//         // Change has_paid boolean to true for company
//         await db.updatePayment(company_id, true);
//         res.json({ status });
//     } catch (err) {
//         console.log(err);
//         res.status(500).json({ message: err.message });
//     }
// });

module.exports = router;