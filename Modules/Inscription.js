module.exports = Inscription

/**
 * @constructor
 * @typedef {object} Inscription
 * @this {Inscription} Notre Objet Inscription
 * @param {string} param 
 * @property {mongojs} mongojs
 * @property {string} TypeOfInscription
 */
function Inscription(param){
    const mongojs = require('mongojs')
    this.DataBase = mongojs("localhost:27017/Test", ['User']);
    this.TypeOfInscription = param
    this.err = require('./Static-Error')

    /**
     * @this {Connexion} Notre Objet Inscription
     * @param {object} data Object content User Info
     * @return {Promise} Async Func
     * @private Acces
     */
    this.VerifUsername = function(data){
        let db = this.DataBase
        return new Promise(function(resolve, reject){
            db.User.find({
                Username:data.Username
            },function(err,res){
                if (err) reject(err)
                else if(res.length > 0) resolve(true)
                else resolve(false)
            })
        })
    }

    /**
     * @this {Inscription}
     * @param {object} data Object content User Info
     * @return {Promise}
     * @private
     */
    this.AddUser = function(data){
        let db = this.DataBase
        return new Promise(function(resolve, reject){
            db.User.insert({
                Username:data.Username,
                Password:data.Password,
                Name:data.Name,
                LastName:data.LastName,
                Email:data.Email
            },function(err,res){
                if (err) reject(err)
                else if(res) resolve(res)
                else resolve(false)
            })
        })
    }

}
/**
 * @this {Inscription}
 * @param {object} data Object content User Info
 * @param {object} socket Object Socket De notre User
 * @public
 */
Inscription.prototype.Init = function(data,socket){
    let UsernameTaken = this.VerifUsername(data)
    let myself =  this
    UsernameTaken.then(function(IsUsernameTaken){
        return IsUsernameTaken
    },this.err)
    .then(function(IsUsernameTaken){
        if(IsUsernameTaken===undefined) {
            return undefined
        }
        else if(!IsUsernameTaken){
            let Inscription = myself.AddUser(data)
            return Inscription.then(function(IsUserSignUp){
                return IsUserSignUp
            },myself.err)
        } 
        else {
            return true
        }
    },this.err)
    .then(function(IsUserSignUp){
        if(IsUserSignUp===undefined){
            console.log('Error Serveur')
        } 
        else if(IsUserSignUp._id !== undefined) {
            console.log(IsUserSignUp.Username+' is SignIn')
            var MySocket = require('./Socket.js')
            const ActionOnSocket = new MySocket()
            socket.IsUserConnected = ActionOnSocket.UpdateStateConnection(socket)
            socket.IdUser = IsUserSignUp._id
            socket.Username = IsUsernameAndPasswordValid.Username
        }
        else if (IsUserSignUp){
            console.log('Username Already Taken')
        }
        else {
            console.log('Error Insert BDD')
        }
    },this.err)
}
