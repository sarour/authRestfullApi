const Rice = require('../Models/Rice.model');
const { riceVarietyValidation } = require('../helpers/validation')
const formidable = require('formidable')
const detect = require('detect-file-type')
const mv = require('mv');
const path = require('path')


module.exports = {
    all: async (req, res, next) => {
        try {
            const options = {
                page: req.params.page,
                limit: 9
            };
            var myAggregate = Rice.aggregate();

            Rice.aggregatePaginate(myAggregate, options, (err, results) => {
                if (err) {
                    console.log(err);
                } else {

                    res.status(200).json({
                        status: true,
                        msg: 'Success',
                        total: results.totalDocs,
                        limit: results.limit,
                        page: results.page,
                        pages: results.totalPages,
                        hasPrev: results.hasPrevPage,
                        hasNext: results.hasNextPage,
                        prev: results.prevPage,
                        next: results.nextPage,
                        riceVarieties: results.docs,
                    });


                    // res.status(200).json({
                    //     status: true,
                    //     msg: 'Success',
                    //     data: results
                    // });
                }
            })


            // const rices = await Rice.find({}).sort({ created_at: -1 });
            // res.status(200).json({
            //     status: true,
            //     msg: 'Success',
            //     totla: rices.length,
            //     riceVarieties: rices
            // });
        } catch (error) {
            res.json({
                message: error
            })
        }
    },
    save: async (req, res) => {
        const form = formidable.IncomingForm();
        form.parse(req, async (error, fields, files) => {
            if (error) {
                return res.json({
                    status: false,
                    msg: 'Error in file'
                })
            }
            const err = riceVarietyValidation(fields.name, fields.description, fields.varietyCode);
            if (err) return res.status(400).send({
                status: false,
                msg: err.details[0].message
            });

            const riceExist = await Rice.findOne({
                varietyCode: fields.varietyCode
            });
            if (riceExist) return res.status(400).send({
                status: false,
                mgs: riceExist.varietyCode + ' is exist in database'
            })
            detect.fromFile(files.image.path, async (error, result) => {
                if (result === null)
                    return res.json({
                        status: false,
                        msg: "Not allowed this file type"
                    })
                const pictureName = Math.floor(1000 + Math.random() * 9000) + '_' + Date.now() + '.' + result.ext;
                const allowedImageTypes = ['jpg', 'jpeg', 'png'];
                if (!allowedImageTypes.includes(result.ext)) {
                    return res.json({
                        status: false,
                        msg: result.ext + " not allowed "
                    })
                }
                const oldPath = files.image.path;
                const newPath = path.join(__dirname, '..', 'Resource', 'Images', pictureName)
                const riceVariety = new Rice({
                    name: fields.name,
                    description: fields.description,
                    varietyCode: fields.varietyCode,
                    image: files.image.path ? path.join('Resource', 'Images', pictureName) : '',
                });
                await riceVariety.save();
                mv(oldPath, newPath, err => {
                    if (err) {
                        return res.json({
                            status: false,
                            msg: "Image not move"
                        })
                    } else {
                        return res.json({
                            status: true,
                            msg: "Save success"
                        })
                    }
                })
            })
        })
    },

    getVarietyRiceById: async (req, res) => {
        try {
            const rice = await Rice.findById(req.params.varietyId);
            res.status(200).json({
                status: true,
                msg: 'Get rice success',
                rice: rice
            });
        } catch (error) {
            res.json({
                message: error
            })
        }
    },

    deleteVarietyRiceById: async (req, res) => {
        try {

            const riceExist = await Rice.findOne({
                _id: req.params.varietyId
            });

            if (!riceExist) return res.status(400).send({
                status: false,
                mgs: riceExist.name + ' not found in database'
            })

            const remove = await Rice.remove({
                _id: req.params.varietyId
            });
            res.status(200).json({
                status: true,
                msg: 'Remove success',
                rice: remove
            });
        } catch (error) {
            res.json({
                message: error
            })
        }
    },
}
