const { Schema, model } = require('../database');
const bcrypt = require('bcrypt');

const TransportadorSchema = new Schema({
    fullname: {
        type: String,
        required: [true, 'O nome do transportador é obrigatório']
    },
    email: {
        type: String,
        required: [true, 'O e-mail é obrigatório'],
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: [true, 'A senha é obrigatório'],
        select: false
    },
    isTraveling: {
        type: Boolean,
        default: false
    },
    latitude: {
        type: String,
        required: function() {
            return this.isTraveling;
        }
    },
    longitude: {
        type: String,
        required: function() {
            return this.isTraveling;
        }
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

TransportadorSchema.pre('save', async function(next) {
    const hash = await bcrypt.hash(this.password, 11);
    this.password = hash;

    next();
})

const Transportador = model('Transportador', TransportadorSchema);

module.exports = Transportador;