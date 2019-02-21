const express = require("express");
const router = express.Router();
const db = require('../../data/helpers/companiesDb');
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);


router.post("/charge", async (req, res) => {
    // Take the Stripe token and company_id from req.body:
    let { token, company_id } = req.body;
    // Get the company by id:
    const company = db.getById(company_id);

    if (company.length === 0) {
        console.log("Company not found");
        return res.status(500).send("Company not found");
    }
    // Charge company $30:
    try {
        let { status } = await stripe.charges.create({
            amount: 3000,
            currency: "usd",
            source: req.body.token
        });
        // Change has_paid boolean to true for company
        await db.updatePayment(company_id, true);
        res.json({ status });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;