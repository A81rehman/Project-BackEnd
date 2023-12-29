function admin(req, res, next) {
    if(req.Users.role!="admin") return res.status(403).send("you are not authorized");
    next();
}

module.exports = admin;