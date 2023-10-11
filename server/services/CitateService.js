const Citate = require('../models/CitateModel')

class CitateService {
    async create(text, author) {
        const citate = await Citate.create({text, author})
        return {citate}
    }

    async update (data, id) {
        const citate = await Citate.findOne({where: {id}})
        if (!citate) {
            console.log("Citate not found")
        }
        await citate.update({...data})
        return {citate}
    }

    async delete (id) {
        const citate = await Citate.findOne({where: {id}})
        if (!citate) {
            console.log('Incorrect ID')
        }
        await Citate.destroy({where: {id}})
        return {citate}
    }
    async getAll() {
        const citates = await Citate.findAll()
        return {citates}
    }
}

module.exports = new CitateService()