module.exports = Connexion;

/**
 * @constructor
 * @typedef {object} Connexion
 * @this {Connexion}
 * @param {string} param 
 * @property {mongojs} mongojs
 * @property {string} TypeOfConnexion
 */
function Connexion(param){
    const mongojs = require('mongojs');
    this.DataBase = mongojs("localhost:27017/Test",['User']);
    this.TypeOfConnexion = param;
    this.err = require('./Static-Error');
    this.ActionSocket = require('./Socket');

    /**
     * @this {Connexion}
     * @param {object} data Object content User Info
     * @return {Promise} 
     * @private
     */
    this.VerifUsernameAndPassword = function(data){
        let db = this.DataBase;
        return new Promise(function(resolve, reject){
                db.User.find({
                Username:data.Username,
                Password:data.Password
            },function(err,res){
                if (err) reject(err);
                else if(res.length > 0) resolve(res)
                else resolve(false);
            })
        })
    }
}

/**
 * @this {Connexion}
 * @param {object} data Object content User Info
 * @param {socket} socket Object Socket De notre User
 * @public
 */
Connexion.prototype.Init = function(data,socket){
    let Connexion = this.VerifUsernameAndPassword(data);
    Connexion.then(function(IsUsernameAndPasswordValid){
        return IsUsernameAndPasswordValid;
    },this.err)
    .then(function(IsUsernameAndPasswordValid){
        if(IsUsernameAndPasswordValid===undefined) {
            console.log('Error Serveur');
        }
        else if(IsUsernameAndPasswordValid) {
            console.log(IsUsernameAndPasswordValid[0].Username+' is Connected')
            var MySocket = require('./Socket.js');
            const ActionOnSocket = new MySocket();
            socket.IsUserConnected = ActionOnSocket.UpdateStateConnection(socket)
            socket.IdUser = IsUsernameAndPasswordValid._id;
            socket.Username = IsUsernameAndPasswordValid.Username;
        }
        else {
            console.log('Mot de passe / Pseudo Incorrect');
        }
    },this.err);
}



