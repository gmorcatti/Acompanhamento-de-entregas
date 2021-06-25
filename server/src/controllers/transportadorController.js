const Transportador = require('../models/Transportador');

const updateTravelStatus = async (req, res) => {
    try {
        const { isTraveling, latitude = '', longitude = '' } = req.body;

        const travelStatus = {
            isTraveling,
            latitude: isTraveling ? latitude : '',
            longitude: isTraveling ? longitude : '',
        }

        await Transportador.findOneAndUpdate(
            req.userId, 
            travelStatus
        );
    
        res.status(200).send({ message: 'Atualização de status de viagem realizada com sucesso' });

    } catch(err) {
        res.status(400).send({ error: 'Erro ao atualizar dados do usuário' });
    }
}

const updateLocation = async (req, res) => {
    try {
        const location = {
            latitude: req.body.latitude,
            longitude: req.body.longitude
        }

        if(!location.latitude || !location.longitude)
            return res.status(400).send({ error: 'As informações de localização não foram informadas'});

        const transportador = await Transportador.findById(req.userId);

        if(!transportador.isTraveling)
            return res.status(400).send({ error: 'Transportador não está em viagem' });

        await Transportador.findOneAndUpdate(
            req.userId, 
            location
        );
    
        res.status(204).send();

    } catch(err) {
        res.status(400).send({ error: 'Erro ao atualizar dados do usuário' });
    }
}

module.exports = {
    updateTravelStatus,
    updateLocation
}