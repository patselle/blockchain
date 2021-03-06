const express = require('express');
const parser = require('body-parser');
const Blockchain = require('./blockchain');
const PeerServer = require('./p2p');

const HTTP_PORT = process.env.HTTP_PORT || 8081;

class ApiServer
{

	constructor(chain, p2p)
	{
		this.app = express();

		this.app.use(parser.json());

		this.app.get('/blocks', (req, res) =>
		{
       	 		res.json(chain.blocks);
		});


		this.app.post('/mine', (req, res) =>
		{
        		chain.add(req.body.data);

        		p2p.broadcast();

        		res.redirect('/blocks');
		});
	}

	start()
	{
		this.app.listen(HTTP_PORT, () =>
		{
        		console.log(`[Api] listening on port ${HTTP_PORT}`);
		});
	}
}

module.exports = ApiServer;
