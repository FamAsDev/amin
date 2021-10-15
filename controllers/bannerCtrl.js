const Banners = require("../models/bannerModel");


const bannerCtrl = {

    getBanner: async (req, res) => {
        try {
            const banner = await Banners.find()

            res.json(banner)
        } catch (err) {
            return res.status(500).json({msg: err.message});
        }
    },

    createBanner: async (req, res) => {
        try {
            const { banner_id, banner } = req.body;

            if(!banner) return res.status(400).json({msg: "No banner image upload"});
            
            const Banner = await Banners.findOne({banner_id}) 

            if(Banner) return res.status(400).json({msg: "this banner already exists"});

            const newBanner = new Banners({
                banner_id, banner
            })

            await newBanner.save();    
            res.json({msg: "Created a banner"})

        } catch (err) {
            return res.status(500).json({msg: err.message});
        }
    },

    deleteBanner: async (req, res) => {
        try {
            await Banners.findByIdAndDelete(req.params.id);
            res.json({msg: "deleted a Banner"})
        } catch (err) {
            return res.status(500).json({msg: err.message});
        }
    }
}

module.exports = bannerCtrl;