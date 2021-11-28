require("dotenv").config()
const {
    GMAIL_ID,
    GMAIL_PASSWORD
} = process.env

module.exports = {
    GMAIL_ID: `${GMAIL_ID}`,
    GMAIL_PASSWORD: `${GMAIL_PASSWORD}`
}