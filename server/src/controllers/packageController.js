const Pacotes = require('../models/Pacotes');
const Transportador = require('../models/Transportador');

const ObjectId = require('mongodb').ObjectID;

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

        if(pacote.isStopped) {
            return res.send({
                isTraveling: false,
                location: pacote.stoppedIn
            });
        }

        const transportadorId = pacote.transportador;
        console.log(pacote);
        
        const transportador = await Transportador.findById(transportadorId);
        console.log(transportador)
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

const packageExists = async (req, res) => {
    try {
        const packageId = req.params.id;
        const packageObjectId = ObjectId(packageId);

        const pacote = await Pacotes.find({ _id: packageObjectId });

        if(pacote.length > 0) return res.send(true);
        else return res.send(false);
        
    } catch(err) {
        return res.send(false);
    }
}



module.exports = {
    createPackage,
    getPackageLocation,
    packageExists
}