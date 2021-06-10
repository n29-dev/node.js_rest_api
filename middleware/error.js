module.exports.error = (error, req, res) => {
    res.status(500).send(error)
}