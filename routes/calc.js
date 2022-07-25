"use strict";

/** Routes for calculations to external API and displays actions. */

const jsonschema = require("jsonschema");

// TODO - clean up
const express = require("express");
const { BadRequestError } = require("../expressError");
// const User = require("../models/user");
// const { ensureLoggedIn, ensureCorrectUser } = require("../middleware/auth");
const providersList = require("../schemas/providersList.json");
const apiCallSchema = require("../schemas/externalApiReq.json");
const {BASE_EXT_API} = require("../config")
const {API_KEY} = require("../config")
const axios = require('axios')

const router = express.Router();


// ******************* M A I N FUNCTIONALITY ************************
// 1 - display form - GET
// 2 -  CPU submit external API request => return co2e,
//      2A - STRETCH - Show actions based on values
// 3 - Memory & Storage POST 

/** GET /  => { providersList }
 * This should providersList for the form to use
 *
 * Authorization required: none
 **/
router.get("/", function (req, res, next) {
  try {
    console.log("Successfully made get", providersList);
    return res.json({ providersList })
  } catch (error) {
    return next(error);
  }
})


/** POST / { FORM API PARAMS }  => { co2e }
 * 
 * This should take from req.body data { provider, type, region, API PARAMS }
 * 
 * Returns { External API Data }
 *
 * Authorization required: none
 **/
// CAPSTONE 2 - 
router.post("/cpu", async function (req, res, next) {
  try {
    // Check valid incoming data - TODO
    // const validator = jsonschema.validate(req.body, apiCallSchema);
    // if (!validator.valid) {
    //   const errs = validator.errors.map(e => e.stack);
    //   throw new BadRequestError(errs);
    // }


    // HARD / FIGURE OUT Put together JSON request - BYPASS FOR NOW - to check all esle:
    /**input needs to be {
        "emission_factor": "cpu-provider_aws-region_us_west_1",
        "parameters":
            {
        "number": 1,
        "time": 24,
        "time_unit": "h"
            }
        } */
    let testParams = {
      "emission_factor": "cpu-provider_aws-region_us_west_1",
      "parameters":
          {
      "number": 1,
      "time": 1,
      "time_unit": "h"
          }
      }
    let paramsJSON = req.body
    
    // send data to external API
    const extAPICall = await axios.post(BASE_EXT_API + "/estimate", paramsJSON, {
      headers: {
        "Authorization": `Bearer ${API_KEY}`
      }
    })
    
    return res.json(extAPICall.data);
  } catch (err) {
    return next(err);
  }
});





/** POST / {  }  => {  }
 * 
 *
 * Authorization required: XYZ
 **/
// CAPSTONE 2 - 

// router.get("/:username", ensureCorrectUser, async function (req, res, next) {
//   try {
//     const user = await User.get(req.params.username);
//     return res.json({ user });
//   } catch (err) {
//     return next(err);
//   }
// });


/** POST / {  }  => {  }
 * 
 *
 * Authorization required: XYZ
 **/
// CAPSTONE 2 - 
// router.patch("/:username", async function (req, res, next) {
//   try {
//     const validator = jsonschema.validate(req.body, userUpdateSchema);
//     if (!validator.valid) {
//       const errs = validator.errors.map(e => e.stack);
//       throw new BadRequestError(errs);
//     }

//     const user = await User.update(req.params.username, req.body);
//     return res.json({ user });
//   } catch (err) {
//     return next(err);
//   }
// });


/** POST / {  }  => {  }
 * 
 *
 * Authorization required: XYZ
 **/
// CAPSTONE 2 - 
// router.delete("/:username", ensureCorrectUser, async function (req, res, next) {
//   try {
//     await User.remove(req.params.username);
//     return res.json({ deleted: req.params.username });
//   } catch (err) {
//     return next(err);
//   }
// });




module.exports = router;
