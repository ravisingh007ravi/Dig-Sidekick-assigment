const UserModel = require("../models/usersModel")
const { isValid, isValidName, isValidphoneNo, isValidEmail, isValidPassword, isdescription } = require("../validation/validation")
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const usersModel = require("../models/usersModel");

const createUsers = async (req, res) => {

    try {
        let { fname, lname, email, phoneNo, password, description } = req.body


        if (!(isValid(fname))) { return res.status(400).send({ status: false, message: "please enter first name" }) }
        if (!(isValidName(fname))) { return res.status(400).send({ status: false, message: "please enter valid first name" }) }

        if (!(isValid(lname))) { return res.status(400).send({ status: false, message: "please enter last name" }) }
        if (!(isValidName(lname))) { return res.status(400).send({ status: false, message: "please enter valid last name" }) }

        if (!(isValid(email))) { return res.status(400).send({ status: false, message: "please enter email" }) }
        if (!(isValidEmail(email))) { return res.status(400).send({ status: false, message: "please enter valid Email" }) }

        const duplicateEmail = await UserModel.findOne({ email: email });
        if (duplicateEmail) { return res.status(400).send({ status: false, message: "Email is already exist" }) };

        if (!(isValid(phoneNo))) { return res.status(400).send({ status: false, message: "please enter phone No" }) }
        if (!(isValidphoneNo(phoneNo))) { return res.status(400).send({ status: false, message: "please enter valid phone No" }) }

        const duplicatePhone = await UserModel.findOne({ phoneNo: phoneNo });
        if (duplicatePhone) { return res.status(400).send({ status: false, message: "phone is already exist" }) };


        if (!(isValid(password))) return res.status(400).send({ status: false, message: "please enter password" })

        if (!isValidPassword(password)) {
            return res.status(400).send({ status: false, message: 'Password should be of minimum 8 characters & maximum 15 characters' })
        }

        const rounds = 10;
        let hash = await bcrypt.hash(password, rounds);
        password = hash;

        if (!(isValid(description))) { return res.status(400).send({ status: false, message: "please enter description" }) }
        if (!(isdescription(description))) { return res.status(400).send({ status: false, message: "please enter valid description" }) }

        let data = req.body
        let result = await usersModel.create(data)
        res.status(201).send({ status: true, message: "User created successfully", data: result })
    }
    catch (error) {
        res.status(500).send({ status: false, msg: error.message })
    }
}

const getallUsers = async (req, res) => {

    try {
        let result = await usersModel.find()

        return res.status(200).send({ msg: result })
    }
    catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }
}

module.exports = { createUsers, getallUsers }