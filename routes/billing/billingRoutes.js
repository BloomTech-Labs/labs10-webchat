const express = require("express");
const router = express.Router();
const db = require('../../data/helpers/subDb');
const repDb = require('../../data/helpers/repDb');

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);


router.post('/addSub', async (req, res) => {
    let plan = req.body.subscription.plan;  // comes from Billing form
    let uid = req.body.uid;                  // rep uid attached to body in firebase auth check on base url
<<<<<<< HEAD

    let rep_info = await repDb.getByUid(uid);               // get info for current rep using uid
    let company_id = rep_info.company_id;              // take company_id from rep info
    let existingSub = await db.getSub(company_id);          // check Database for an existing subscription:



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

        let subInfo = {
          company_id: company_id,
          stripe_customer_id: charge.customer,
          stripe_subscription_id: charge.id,
          stripe_subscription_status: charge.status,
          stripe_plan_id: charge.plan.id,
          stripe_plan_nickname: charge.plan.nickname,
        }

        let inserted = await db.insert(subInfo)

=======

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

>>>>>>> 7454562bf11f9a657ffd040fe3b4ffa0663ce036
        res.status(201).json({ message: `subscription created`, inserted })
      } catch (err) {
        res.status(500).json({ error: err })
      }
    } else {
      res.status(400).json({ message: `you already have a subscription` })
<<<<<<< HEAD
=======
    }
});

router.get('/getSub/:id', async (req, res) => {
    const company_id = req.params.id; 
    console.log('company_id in getSub endpoint: ', company_id);
    const noSubTeamSize = 4;                              // max_reps to return for 'Free' plan if no sub exists
    
    try {
        const existingSub = await db.getSub(company_id); 
        if(!existingSub) {
            res.status(200).json(noSubTeamSize);          // if no sub, return max-reps for 'Free' plan
        } else {
            res.status(200).json(existingSub.max_reps);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
>>>>>>> 7454562bf11f9a657ffd040fe3b4ffa0663ce036
    }
});

// router.post(
//     '/updateFromStripe',
//     checkMemberSizeToDowngrade,
//     async (req, res) => {
//       let newPlan = req.body.subscription.plan
  
//       try {
//         let subInfo = await db('subscriptions')
//           .where({ user_id: req.userInfo.id })
//           .first()
  
//         const subscription = await stripe.subscriptions.retrieve(
//           subInfo.subscription
//         )
  
//         //update subscription plan
//         const newSub = await stripe.subscriptions.update(subInfo.subscription, {
//           cancel_at_period_end: false,
//           items: [
//             {
//               id: subscription.items.data[0].id,
//               plan: newPlan,
//             },
//           ],
//         })
  
//         //create invoice to pay/credit difference
//         try {
//           await stripe.invoices.create({
//             customer: newSub.customer,
//           })
//         } catch (err) {
//           console.log(err)
//         }
  
//         let subInfo = {
//             company_id: company_id,
//             stripe_customer_id: charge.customer,
//             stripe_subscription_id: charge.id,
//             stripe_subscription_status: charge.status,
//             stripe_plan_id: charge.plan.id,
//             stripe_plan_nickname: charge.plan.nickname,
//             max_reps: Number(charge.plan.metadata.max_reps)         // max_reps for the payment plan set in Stripe Dashboard
//         }
  
  
//         await db('subscriptions')
//           .where({ user_id: req.userInfo.id })
//           .update(newInfo)
  
//         res
//           .status(200)
//           .json({ message: `subscription updated`, type: newInfo.type })
//       } catch (err) {
//         res.status(500).json({ error: err })
//       }
//     }
// )

module.exports = router;