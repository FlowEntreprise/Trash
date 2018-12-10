module.exports = ActionFlow

/**
 * @summary An Object who regroupe all the method can be apply on object Flow
 * @constructor
 * @typedef {object} ActionFlow
 */
function ActionFlow(){
    const mongojs = require('mongojs')
    this.DataBase = mongojs("localhost:27017/Test", ['Flow']);
    this.err = require('./Static-Error')
    /**
     * @typedef {const}
     * @param {object} data Object Contenant Les infos du Flow à ajouté
     * @private
     */
    this.AddFlowDatabase = function(data,socket){
        let db = this.DataBase;
        return new Promise(function(resolve, reject){
            db.Flow.insert({
                IdUser:socket.IdUser,
                Tags:data.Tags,
                Flow:data.Flow
            },function(err,res){
                if (err) reject(err)
                else if(res.lenght > 0) resolve(res)
                else resolve(false)
            })
        })
    }

}

/**
 * @this ActionFlow
 * @param {object} data Object Contenant Les infos du Flow à ajouté
 * @param {Socket} socket Object Socket De notre User
 * @public
 */
ActionFlow.prototype.AddFlow = function(data,socket){
    let Flow = this.AddFlowDatabase(data,socket)
    Flow.then(function(IsFlowAdd){
        return IsFlowAdd
    },this.err)
    .then(function(IsFlowAdd){
        if(IsFlowAdd===undefined){
            console.log('Error Serveur')
        }
        else if(IsFlowAdd){
            console.log('Flow Add by '+IsFlowAdd.Author)
        }
        else{
            console.log('Error Insert BDD')
        }
    },this.err)

}

