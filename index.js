var MySocket = require('./Modules/Socket.js')
var Connexion = require('./Modules/Connexion.js');
var Inscription = require('./Modules/Inscription.js');
var FlowManager = require('./Modules/Flow.js')
var Download = require('./Modules/Download.js')
var http = require('http');

SOCKET_LIST = {};

var server = http.createServer(function(req,res){
	fs.readFile('./index.html','utf-8',function(error, content){
		res.writeHead(200, {"Content-Type":"text/html"})
		res.end(content)
	});
});

const io = require('socket.io').listen(server,{});


var data = {
	Connexion:'Flow',
	Inscription:'Inscription',
	Username:'Vicfou',
	Password:'1234',
	Name:'Victor',
	LastName:'Morel',
	Email:'victormorel.pro@gmail.com',
	Picture:'https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Challenge_vs_skill_fr.svg/220px-Challenge_vs_skill_fr.svg.png'	
}

const Picture = new Download(data.Picture);
console.log(Picture);


io.on('connection',function(socket){
	const ActionOnSocket = new MySocket()
	socket.id = ActionOnSocket.GiveId()
	socket.isUserConnected = ActionOnSocket.UpdateStateConnection(socket)
	ActionOnSocket.AddSocketToSocketList(socket)
	
	//const _Inscription = new Inscription(data.Inscription)
	//_Inscription.Init(data,socket)
	const _Connexion = new Connexion(data.Connexion);
	_Connexion.Init(data,socket)

	console.log(socket.id)
	socket.on('AddFlow',function(socket,data){
		const _FlowManager = new FlowManager()
		_FlowManager.AddFlow()
	})
	
})

server.listen(8080);