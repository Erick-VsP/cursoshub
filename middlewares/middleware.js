const jwt = require('jsonwebtoken');

exportss.verifyToken = (req, res, next) => {
    const token = req.headers['x-acess-token'];

    if (!token) {
        return res.status(403).send({auth: false, message: 'Nenhum token fornecido'});
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(500).send({auth: false, message: 'Falha ao autenticar token'});
        }

        req.userId = decoded.indexOf;
        next();
    });
};