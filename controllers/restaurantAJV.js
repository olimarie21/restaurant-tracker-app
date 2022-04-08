// validate with AJV
const Ajv = require("ajv");
const ajv = new Ajv({allErrors: true, coerceTypes: true, useDefaults: true});

require("ajv-formats")(ajv);
require("ajv-errors")(ajv);

const ajvValidator = (req, res, next) => {
    let ajvSchema = {
        type: 'object',
        properties: {
            restaurant: {
                type: 'string',
                minLength: 1,
                maxLength: 70,
                errorMessage: {
                    minLength: "Please enter the name of the restaurant.",
                    maxLength: "The text you have entered exceeds the maximum amount of characters."
                }
            },
            website: {
                type: 'string',
                format: 'url',
                errorMessage: {
                    format: 'You must input a valid website.'
                }
            },
            address: {
                type: 'string',
                errorMessage: {
                    type: 'Please enter a valid address.'
                }
            },
            type: {
                type: 'string',
                enum: ["Thai", "Chinese", "Brazilian", "Japanese", "Mexican", "Cuban", "Korean", "American", "Fast food", "Vietnamese", "Vegan", "Vegetarian", "Indian", "Breakfast", "Other"],
                errorMessage: {
                    enum: 'Selected type is not a valid option.',
                    type: 'Please select a type of food from the dropdown menu.'
                }
            },
            dateAdded: {
                type: 'date'
            },
            visited: {
                type: 'boolean'
            },
            happyHour: {
                type: 'boolean'
            },
        },
        required: ['restaurant', 'website', 'address', 'type', 'visited', 'happyHour'],
        errorMessage: {
            required: {
                'restaurant': 'Please enter the name of the restaurant',
                'website': 'Please enter the restaurants website.',
                'address': 'Please enter the address of the restaurant.',
                'type': 'Please choose a category from the drop-down menu.',
                'visited': 'Please check the box if you have visited, or leave empty if not.',
                'happyHour': 'Please check the box if the restaurant has a happy hour, or leave empty if not.'
            }
    }};
    
    const validateSchema = ajv.compile(ajvSchema);

    validateSchema(req.body); // validate the body

    if(validateSchema.errors != null) {
        res.render('error', {errors:validateSchema.errors});
    }
    else {
        next();
    }
}

module.exports = {
    ajvValidator
};