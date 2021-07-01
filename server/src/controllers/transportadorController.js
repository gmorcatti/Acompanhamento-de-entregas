const Transportador = require('../models/Transportador');

const updateTravelStatus = async (req, res) => {
    try {
        const { isTraveling, latitude = '', longitude = '' } = req.body;

        const travelStatus = {
            isTraveling,
            latitude: isTraveling ? latitude : '',
            longitude: isTraveling ? longitude : '',
        }

        await Transportador.findByIdAndUpdate(
            req.userId, 
            travelStatus
        );

        console.log('updateTravelStatus', req.userId)
    
        res.status(200).send({ message: 'Atualização de status de viagem realizada com sucesso' });

    } catch(err) {
        console.log(err.message);
        res.status(400).send({ error: 'Erro ao atualizar dados do usuário' });
    }
}

const getName = async (req, res) => {
    try {
        const id = req.userId;

        const transportador = await Transportador.findById(id);
        const name = transportador.fullname;

        res.status(200).send({ name });

    } catch(err) {
        console.log(err.message);
        res.status(400).send({ error: 'Erro ao buscar nome do transportador' });
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

        await Transportador.findByIdAndUpdate(
            req.userId, 
            location
        );
        
        console.log(`Transportador ${transportador.fullname} teve sua localização atualizada: ${location}`);

        res.status(204).send();
    } catch(err) {
        console.log(err.message);
        res.status(400).send({ error: 'Erro ao atualizar dados do usuário' });
    }
}

module.exports = {
    updateTravelStatus,
    updateLocation,
    getName
}