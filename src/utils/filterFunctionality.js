const mongoose = require("mongoose")
const ReturnMods = require("../models/returnMods")

async function removeForbidden(results) {
    try {
        const filteredArray = []
        const forbiddenArray = await FilterList.filter_array.findOne()
            for(let j = 0; j < forbiddenArray.length; j++)
            if(!Object.values(results[0].includes(forbiddenArray[j]))) {
                filteredArray.push(results[0])
                return filteredArray
            }
        } catch (err) {
            return err
        }
    }

    module.exports = removeForbidden