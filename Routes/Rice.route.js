const router = require('express').Router();
const RiceController = require('../Controllers/Rice.Controller')
const verify = require('../helpers/verifyToken')

//GET BACK ALL THE VARIETY OF RICE
router.get('/all/:page', RiceController.all)
//SUBMIT A RICE VARIETY
router.post('/save', RiceController.save)
//GET BACK A SPECIFIC VARIETY USING VARIETY_ID
router.get('/:varietyId', RiceController.getVarietyRiceById)
//DELETE A SPECIFIC RICE VARIETY
router.delete('/:varietyId', RiceController.deleteVarietyRiceById);

module.exports = router;