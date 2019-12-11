const Sample = require('../models/SampleModel');
const SampleValidator = require('../validators/SampleValidator');

class SampleController {
    async index(req, res) {
        const response = await Sample.find();

        return res.json(response);
    }

    async show(req, res) {
        const response = await Sample.findById(req.params.id);

        return res.json(response);
    }

    async store(req, res) {
        if(!(await SampleValidator.store.isValid(req.body))) return res.status(400).json({ error: 'Validation fails' })

        const response = await Sample.create(req.body);

        return res.json(response);
    }

    async update(req, res) {
        if(!(await SampleValidator.update.isValid(req.body))) return res.status(400).json({ error: 'Validation fails' })

        const response = await Sample.findByIdAndUpdate(req.params.id, req.body);

        return res.json(response);
    }

    async delete(req, res) {
        await Sample.findByIdAndDelete(req.params.id);

        return res.send(true);
    }
}

module.exports = new SampleController();
