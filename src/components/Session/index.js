import axios from 'axios';

function setSession(id,data, callback){
    axios.post("/sessionSet",{
        id: id,
        data: data
    }).then(function(data){
        callback(data.data);
    }).catch(function(err){
        throw err;
    });
}
function getSession(id, callback){
    axios.post("/sessionGet",{
        id: id
    }).then(function(data){
        callback(data.data);
    }).catch(function(err){
        throw err;
    });
}
module.exports = {
    setSession: setSession,
    getSession: getSession
};
