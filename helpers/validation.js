const Joi = require('joi');
//Register Validation

const registerValidation = data => {
    const schema = Joi.object({
        name: Joi.string()
            .min(6)
            .max(255)
            .required(),
        mobile: Joi.string()
            .min(11)
            .max(14)
            .required(),
        areaId: Joi.string()
            .max(24)
            //.pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
            .required(),
        address: Joi.string()
            .min(6)
            .max(255)
            .required(),
        nid: Joi.string()
            .min(10)
            .max(255),
        location: Joi.string()
            .min(6)
            .max(255),
        latitude: Joi.number(),
        longitude: Joi.number(),
        isActive: Joi.boolean,
        otp: Joi.string()
            .max(6),
        fcm_token: Joi.string(),
        image: Joi.string(),
        created_at: Joi.date()
            .default,
        updated_at: Joi.date()
            .default,

    });
    const { error } = schema.validate({
        name: data.name,
        mobile: data.mobile,
        areaId: data.areaId,
        address: data.address,
    })
    return error;
}

const loginValidation = data => {
    const schema = Joi.object({

        mobile: Joi.string()
            .min(11)
            .max(14)
            .required(),
        // password: Joi.string()
        //     .min(6)
        //     .max(1024)
        //     .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        //     .required(),

    });
    const { error } = schema.validate({
        mobile: data.mobile,
    })
    return error;
}


const riceVarietyValidation = (name, description, varietyCode) => {
    const schema = Joi.object({
        name: Joi.string()
            .max(255)
            .required(),
        description: Joi.string()
            .required(),
        varietyCode: Joi.string()
            .required(),
        isActive: Joi.boolean,
        image: Joi.string(),
        created_at: Joi.date()
            .default,
        updated_at: Joi.date()
            .default,

    });
    const { error } = schema.validate({
        name: name,
        description: description,
        varietyCode: varietyCode,
    })
    return error;
}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.riceVarietyValidation = riceVarietyValidation;

