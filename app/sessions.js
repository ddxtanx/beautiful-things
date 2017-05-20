var sessions = {};
function getSession(req, res){
    var id = req.body.id;
    res.writeHead(200, {'Content-Type': 'text/json'});
    res.write(JSON.stringify(sessions[id]||{}));
    res.end();
}
function setSession(req, res){
    var id = req.body.id;
    var data = req.body.data;
    sessions[id]=data;
    res.writeHead(200, {'Content-Type': 'text/json'});
    res.write(JSON.stringify(sessions[id]));
    res.end();
}
function destroy(req, res){
    var id = req.query.id;
    console.log(req);
    sessions[id] = {loggedin: false, loginData:{name: "", id: 0, email:""}};
    res.redirect("/");
}
module.exports = {
    getSession: getSession,
    setSession: setSession,
    destroy: destroy
}