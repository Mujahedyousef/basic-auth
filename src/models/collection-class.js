"use srtict"

class Collection {
    constructor(model) {
        this.model = model
    }
    async createRecord(obj) {
        try {
            return await this.model.create(obj)
        } catch (e) {
            console.error('error in creating a new record for model: ', this.model.name);
        }
    }

    async readRecord(userName) {
        try {
            if (userName) {
                return await this.model.findOne({ where: { userName: userName } })
            } else {
                return await this.model.findAll();
            }
        } catch (e) {
            console.error('error in reading record(s) for model: ', this.model.name);
        }
    }

    async updateRecord(userName, obj) {

        try {
            if (obj.userName) {
                return await this.model.update(obj, { where: { userName: userName }, returning: true })
            }

        } catch (e) {
            console.error('error in reading record and orders for model: ', this.model.name);
        }
    }

    async deleteRecord(id) {

        try {
            if (id) {
                return await this.model.destroy({ where: { userName: userName } })
            }

        } catch (e) {
            console.error('error in reading record and orders for model: ', this.model.name);
        }
    }

}

module.exports = Collection;
