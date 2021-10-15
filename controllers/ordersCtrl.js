const Payments = require('../models/ordersModel')
const Users = require('../models/userModel')
const Products = require('../models/productModel')


const orderCtrl = {

    getPayments: async(req, res) =>{
        try {
            const payments = await Payments.find()
            res.json(payments)
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },

    createPayment: async(req, res) => {
        try {
            const user = await Users.findById(req.user.id).select('name email')
            if(!user) return res.status(400).json({msg: "User does not exist."})

            // const order = await Payments.findById(req.user.id)

            const {cart, total, address, phone, paymentMethod} = req.body;

            const {_id, name, email} = user;

            const newPayment = new Payments({
                user_id: _id, name, email, cart, total, address, phone, paymentMethod
            })

            cart.filter(item => {
                return sold(item._id, item.quantity, item.sold)
            })

            
            await newPayment.save()
            res.json({msg: "Payment Success!"})
            
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }
}

const sold = async (id, quantity, oldSold) =>{
    await Products.findOneAndUpdate({_id: id}, {
        sold: quantity + oldSold
    })
}

module.exports = orderCtrl
