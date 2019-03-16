const express = require("express");
const router = express.Router();
const db = require('../../data/helpers/subDb');
const repDb = require('../../data/helpers/repDb');

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);


router.post('/addSub', async (req, res) => {
    let plan = req.body.subscription.plan  // comes from Billing form
    let uid = req.body.uid;                // rep uid attached to body in firebase auth check on base url

    let rep_info = await repDb.getByUid(uid);  
    
    //check Database for a subscription:
    let existingSub = await db.getExistingSub(uid);

    if (!existingSub) {
      try {
        let customer = await stripe.customers.create({
          email: req.body.email,
          source: req.body.id,
        })

        let charge = await stripe.subscriptions.create({
          customer: customer.id,
          items: [{ plan }],
        })

        let subInfo = {
          user_id: req.userInfo.id,
          customer: charge.customer,
          subscription: charge.id,
          status: charge.status,
          plan: charge.plan.id,
          product: charge.plan.product,
          type: charge.plan.nickname,
        }

        let inserted = await db('subscriptions').insert(subInfo)

        res.status(201).json({ message: `subscription created`, inserted })
      } catch (err) {
        res.status(500).json({ error: err })
      }
    } else {
      res.status(400).json({ message: `you already have a subscription` })
    }
  }

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