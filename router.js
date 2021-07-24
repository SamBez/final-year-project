var express = require('express')
const authenticate = require('./controls/authentication')
const router = express.Router();

router.post('/login', authenticate.login)