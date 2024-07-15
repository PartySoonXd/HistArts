const ApiError = require('../exceptions/ApiError');
const Subscriber = require('../models/SubscriberModel')
const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: true,
    auth: {
      user: process.env.EMAIL_NAME,
      pass: process.env.EMAIL_PASS,
    },
    tls: {
        rejectUnauthorized: false,
    }
  });
class SubscribeService {
    async subscribe (email) {
        const check = await Subscriber.findAll({where: {email}})
        if (check.length > 0) {
            throw ApiError.BadRequest("This email address is already subscribed.")
        }
        const subscriber = await Subscriber.create({email})
        return subscriber
    }

    async notify (info) {
        const subscribers = await Subscriber.findAll()

        subscribers.forEach(async(subscriber) => {
            await transporter.sendMail({
                from: process.env.EMAIL_NAME,
                to: subscriber.dataValues.email,
                subject: "New post on HIST.ARTS",
                text: `Check new post about ${info.firstName} ${info.secondName} in ${info.category} category. Link ${process.env.CLIENT_URL}/figure/${info.slug}`,
                html: `<p>Check new post about <a href="${process.env.CLIENT_URL}/figure/${info.slug}">${info.firstName} ${info.secondName}</a> in ${info.category} category.</p>`
            }, (error, info) => {
                if (error) {
                    return console.log(error)
                }
            })
        })

        return 
    }

    async getAll () {
        const subscribers = await Subscriber.findAll()
        if (!subscribers) {
            throw ApiError.NotFound("Subscribers not found")
        }
        return subscribers
    }
    async unsubscribe (email) {
        const subscriber = await Subscriber.findOne({where: {email}})
        if (!subscriber) {
            throw ApiError.NotFound("Subscriber not found")
        }
        await subscriber.destroy()
        console.log('123123122313')
        return subscriber
    }
}

module.exports = new SubscribeService()