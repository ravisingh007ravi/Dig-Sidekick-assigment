const UserModel = require("../models/usersModel")
const { isValid, isValidName, isValidphoneNo, isValidEmail, isValidPassword, isdescription } = require("../validation/validation")
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const usersModel = require("../models/usersModel");

exports.createUsers = async (req, res) => {

    try {

        let data = req.body;
        let { fname, lname, email, phoneNo, password, description } = data;


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
        data.password = hash;

        if (!(isValid(description))) { return res.status(400).send({ status: false, message: "please enter description" }) }
        if (!(isdescription(description))) { return res.status(400).send({ status: false, message: "please enter valid description" }) }

        let result = await usersModel.create(data)
        res.status(201).send({ status: true, message: "User created successfully", data: result })
    }
    catch (error) {
        res.status(500).send({ status: false, msg: error.message })
    }
}

exports.getallUsers = async (req, res) => {

    try {
        let result = await usersModel.find()

        return res.status(200).send({ msg: result })
    }
    catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }
}

exports.login = async (req, res) => {
    try {

        let author = req.body;

        let { email, password } = author;

        if (email.trim().length === 0 || password.trim().length === 0) return res.status(400).send({ status: false, msg: "please provide login details" });

        if (!email) return res.status(400).send({ msg: " email is required " })
        if (!password) return res.status(400).send({ msg: "  password is required " })

        let users = await usersModel.findOne({ email: email })
        if (!users) return res.status(400).send({ msg: "Email is Incorrect!" })


        const checkpasword = await bcrypt.compare(password.trim(), users.password);
        if (!checkpasword) return res.status(400).send({ msg: "password is Incorrect!" });

        let token = jwt.sign(
            {
                authorId: users._id.toString(),
                batch: "lithium",
                project: "Blog-Project"
            },
            process.env.AcessSecretKey, { expiresIn: '12h' }
        )

        const UserId = users['_id'];

        return res.status(201).send({ msg: "User logged in successfully!", users, token, UserId })
    } catch (error) {
        return res.status(500).send({ msg: error.message })
    }
}

