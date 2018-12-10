module.exports = ActionSocket

/**
 * @summary An Object who regroupe all the method can be apply on object Socket
 * @constructor
 */
function ActionSocket(){
    
}

/**
 * @returns {string} Return an Object Id based On Current Timestamp And Random Number beetween (0,16)
 */
ActionSocket.prototype.GiveId = function(){
    return (new Date().getTime() / 1000 | 0).toString(16) + 'xxxxxxxxxxxxxxxx'.replace(/[x]/g,function(){
        return (Math.random() * 16 | 0).toString(16)
    }).toLowerCase()
}

/**
 * @returns {boolean} False If User Not Connected To the Server or Already Login else Return True
 */
ActionSocket.prototype.UpdateStateConnection = function(socket){
    if(socket.isUserConnected === undefined) return false
    else if(!socket.isUserConnected) return true
    else return false
}

/**
 * @param {socket} socket Take an Object Socket and add him to SOCKET_LIST Server based on his own ID
 */
ActionSocket.prototype.AddSocketToSocketList = function(socket){
    SOCKET_LIST[socket.id] = socket;
}