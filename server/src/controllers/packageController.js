
const teste = async (req, res) => {
    console.log(req.body)
    res.send({ ok: true });
}

module.exports = {
    teste,
}