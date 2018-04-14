"use strict";

var consts = {
    EMAIL_HOST: {
        URL: 'mail.tribation.com',
        PORT1: 25,
        PORT2: 587,
        USER1: 'support@tribation.com',
        PASS1: '$upp2018_4Tribation!',
        USER2: 'noreply@tribation.com',
        PASS2: 'no_tribationR3ply!',
        USER3: 'scoutpayment@tribation.com',
        PASS3: '!sc_2018tribationpay',
        FIRST_NAME: 'Neo',
        LAST_NAME: 'Canada'
    },
    MESSAGE: {
        SIGNUP: {
            TEMPORARY_EMAIL: "Your email is temporary email",
            ALREADY_EMAIL: "Someone already has this email address. Try another email.",
            VERIFY: {
                SUCCESS: 'Congratulation! Your email is verifed successfully.',
                FAIL: 'Sorry, your email is not verifed. Please try again.'
            },
            SUCCESS: 'Congratulation! Your email is created successfully. Please verify your email'
        },
        LOGIN: {
            FAIL: 'Your email or password is incorrect. Please try again'
        }
    },
    USER_TYPE: {
        REGULAR: 'regular',
        VERIFIED: 'verified',
        SCOUT: 'scout'
    },
    EMAIL_STATUS: {
        PENDING: 'pending',
        VERIFIED: 'verified'
    }
};

module.exports = consts;
