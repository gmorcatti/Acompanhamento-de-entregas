const Pacotes = require('../models/Pacotes');
const Transportador = require('../models/Transportador');

const createPackage = async (req, res) => {

    const package = {...req.body};

    try {

        const objPacotes = new Pacotes(package);
        const pacote = await Pacotes.create(objPacotes);

        return res.send(pacote);

    } catch(err) {
        console.error(err)
        return res.status(400).send({error: 'Erro ao criar pacote', message: err.message || err});
    }
}

const getPackageLocation = async (req, res) => {
    try {
        const packageId = req.params.id;
        const pacote = await Pacotes.findById(packageId);
        
        const transportadorId = pacote.transportador;
        
        const transportador = await Transportador.findById(transportadorId);

        if(transportador.isTraveling){
            const transportadorLocation = {
                latitude: transportador.latitude,
                longitude: transportador.longitude,
            }
    
            return res.send({
                isTraveling: true,
                location: transportadorLocation
            });
        } else {
            return res.send({ isTraveling: false });
        }

    } catch(err) {
        console.error(err)
        return res.status(400).send({error: 'Erro ao consultar localização do pacote.', message: err.message || err});
    }
}

module.exports = {
    createPackage,
    getPackageLocation
}