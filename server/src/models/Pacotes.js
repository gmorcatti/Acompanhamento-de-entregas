const { Schema, model } = require('../database');

const PacotesSchema = new Schema({
    name: {
        type: String,
        required: [true, 'O nome do pacote é obrigatório']
    },
    isStopped: {
        type: Boolean,
        default: true,
    },
    stoppedIn: {
        latitude: {
            type: String,
            required: function() {
                return this.isStopped;
            }
        },
        longitude: {
            type: String,
            required: function() {
                return this.isStopped;
            }
        },
    },
    transportador: {
        type: String,
        required: function() {
            return !this.isStopped;
        }
    },
});

const Pacotes = model('Pacotes', PacotesSchema);

module.exports = Pacotes;