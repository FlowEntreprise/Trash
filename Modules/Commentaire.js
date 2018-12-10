module.exports = ActionComment

/**
 * @summary An Object who regroupe all the method can be apply on object Comment
 * @constructor
 * @typedef {object} ActionComment
 */
function ActionComment(){
    const mongojs = require('mongojs')
    this.DataBase = mongojs("localhost:27017/Test", ['Comment']);
    this.err = require('./Static-Error')
    const overloadMethod = require('./Overload')

    overloadMethod(this, "DeleteCommentDatabase", function(data){
        let db = this.DataBase
        return new Promise(function(resolve,reject){
            db.Comment.find({
                _id:data.Id,
            },function(err,res){
                if (err) reject(err)
                else if(res.lenght > 0) resolve(res)
                else resolve(false)
            })
        })
   });


   overloadMethod(this, "DeleteCommentDatabase", function(data,socket){
        let db = this.DataBase
        return new Promise(function(resolve,reject){
            db.Comment.find({
                _id:data.Id,
                IdUser:socket.IdUser
            },function(err,res){
                if (err) reject(err)
                else if(res.lenght > 0) resolve(res)
                else resolve(false)
            })
        })
    });
}

/**
 * @this {Comment}
 * @param {object} data Object content Comment Info
 * @param {socket} socket Object Socket User
 * @public
 */
ActionCommentaire.prototype.AddComment = function(data,socket){
    let Comment = AddCommentDatabase(data,socket)
    Comment.then(function(IsCommentAdd){
        return IsCommentAdd
    },this.err)
    .then(function(IsCommentAdd){
        if(IsCommentAdd===undefined){
            console.log('Error Serveur')
        }
        else if(IsCommentAdd){
            console.log('Comment Add by '+IsCommentAdd.Author)
        }
        else{
            console.log('Error Insert BDD')
        }
    },this.err)

    /**
     * @typedef {const}
     * @param {object} data Object Contenant Les infos du Commentaire à ajouté
     * @private
     */
    const AddCommentDatabase = function(data,socket){
        let db = this.DataBase
        return new Promise(function(resolve,reject){
            db.Comment.insert({
                IdUser:socket.IdUser,
                IdFlow:data.Id,
                Comment:data.Message
            },function(err,res){
                if (err) reject(err)
                else if(res.lenght > 0) resolve(res)
                else resolve(false)
            })
        })
    }
}

/**
 * @this {Comment}
 * @param {object} data Object content Comment Info Delete
 * @param {socket} socket Object Socket User
 * @public
 */
ActionCommentaire.prototype.DeleteComment = function(data,socket){
    let Comment = DeleteCommentDatabase(data,socket)
    Comment.then(function(IsCommentDelete){
        return IsCommentDelete
    },this.err)
    .then(function(IsCommentDelete){
        if(IsCommentDelete===undefined){
            console.log('Error Serveur')
        }
        else if(IsCommentDelete){
            console.log('Comment Delete by '+IsCommentDelete.IdUser)
        }
        else{
            console.log('Error Insert BDD')
        }
    },this.err)

}

/**
 * @this {Comment}
 * @param {object} data Object content Comment Info Delete
 * @param {socket} socket Object Socket User
 * @public
 */
ActionCommentaire.prototype.DeleteAllComment = function(data,socket){
    let Comment = DeleteCommentDatabase(data)
    Comment.then(function(IsAllCommentDelete){
        return IsAllCommentDelete
    },this.err)
    .then(function(IsCommentDelete){
        if(IsCommentDelete===undefined){
            console.log('Error Serveur')
        }
        else if(IsCommentDelete){
            console.log('All Comment delete by '+socket.IdUser)
        }
        else{
            console.log('Error Delete BDD')
        }
    },this.err)

}