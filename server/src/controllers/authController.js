const Transportador = require('../models/Transportador');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const generateToken = (params = {}) => {
    return jwt.sign(params, process.env.JWT_TOKEN, {
        expiresIn: 86400
    })
}

const createTransportador = async (req, res) => {

    const { email } = req.body;

    try {
        if(await Transportador.findOne({ email }))
            return res.status(400).send({ error: 'User already exists' });
        
        const objTransportador = new Transportador(req.body);
        const transportador = await Transportador.create(objTransportador);

        transportador.password = undefined;

        const token = generateToken({ id: transportador.id });

        return res.send({
            transportador,
            token
        });

    } catch(err) {
        console.log(err)
        return res.status(400).send({error: 'Registration Failed', err: err});
    }
}

const authenticate = async (req, res) => {
    const { email, password } = req.body;

    const transportador = await Transportador.findOne({email}).select('+password');

    if(!transportador)
        return res.status(400).send({ error: 'Transportador not found' });

    if(!await bcrypt.compare(password, transportador.password))
        return res.status(400).send({ error: 'Invalid Password' });

    transportador.password = undefined;

    const token = generateToken({ id: transportador.id });

    res.send({
        transportador,
        token
    });
}

module.exports = {
    createTransportador,
    authenticate
}