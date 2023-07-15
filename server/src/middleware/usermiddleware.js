const jwt = require('jsonwebtoken');
const dotENV = require('dotenv');
dotENV.config();

let key = "3ad9b2599ea414ddd65e4521c167abd17ece589f75a3779475f0d64b8f52e7f3e330a9c364c1db7d677d35a46fe526976f25bf28b2187da68f4dae66f1d7ae19";

const authenticate = (req, res, next) => {
  try {
    
    let token = req.headers["x-api-key"];
    
    if (!token) return res.status(400).send({ status: false, msg: "token must be present" });

    let decodedToken = jwt.verify(token, key);

    if (!decodedToken) return res.status(401).send({ status: false, msg: "token is invalid" });
    req.decodedToken = decodedToken;
    next();
  }
  catch (error) {
    res.status(500).send({ staus: false, msg: error });
  }
}

const authorize = function (req, res, next) {
  try {
    let token = req.headers["x-api-key"];

    if (!token) return res.status(400).send({ status: false, msg: "token must be present" });

    let decodedToken = jwt.verify(token, key);

    if (!decodedToken)
      return res.status(401).send({ status: false, msg: "token is invalid" });

    if (req.body.authorId == decodedToken.authorId) return next();
    else return res.status(403).send({ status: false, msg: "you are not authorised !" });

  } catch (error) {
    return res.status(500).send({ msg: error.message })
  }
}

module.exports = { authenticate, authorize };