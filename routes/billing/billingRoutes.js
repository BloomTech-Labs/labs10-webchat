const express = require("express");
const Router = express.Router();
const db = require('../../data/helpers/companiesDb');
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);


Router.route("/charge").post(async (req, res) => {
    // Gets the company by id
    const company = db("companies").where("id", company_id);
    if (company.length === 0) {
        return res.status(500).send("Company not found");
    }
    // Charges company $30
    try {
        let { status } = await stripe.charges.create({
            amount: 3000,
            currency: "usd",
            source: req.body.token
        });
        // Changes has_paid boolean to true for company
        await db("companies")
            .where("id", req.body.customer_id)
            .update({ has_paid: true });
        res.json({ status });
    } catch (err) {
        res.status(500).end();
    }
});

module.exports = Router;