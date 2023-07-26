const http = require('http');
const PORT = 3005;
const server = http.createServer();

const friends = [
	{
		id: 0,
		name: 'Emmanuel',
	},
	{
		id: 1,
		name: 'Princess',
	},
	{
		id: 2,
		name: 'Glydell',
	},
	{
		id: 3,
		name: 'Rod Abraham',
	},
];

server.on('request', (req, res) => {
	const items = req.url.split('/');

	if (req.method === 'POST' && items[1] === 'friends') {
		req.on('data', (data) => {
			const friend = data.toString();
			console.log(`Request: ${friend}`);
			friends.push(JSON.parse(friend));
		});
		req.pipe(res);
	} else if (req.method === 'GET' && items[1] === 'friends') {
		// res.writeHead(200, {
		// 	'Content-Type': 'application/json',
		// });
		res.statusCode = 200;
		res.setHeader('Content-Type', 'application/json');
		if (items.length === 3) {
			const friendIndex = Number(items[2]);
			res.end(JSON.stringify(friends[friendIndex]));
		} else {
			res.end(JSON.stringify(friends));
		}
	} else if (req.method === 'GET' && items[1] === 'messages') {
		res.setHeader('Content-Type', 'text/html');
		res.write('<html>');
		res.write('<body>');
		res.write('<ul>');
		res.write('<li>Hello Princess!!!</li>');
		res.write('<li>');
		res.write('<h1>You are so beautiful</h1>');
		res.write('</li>');
		res.write('</ul>');
		res.write('</body>');
		res.write('</html>');
		res.end();
	} else {
		res.statusCode = 404;
		res.end();
	}
});

server.listen(PORT, () => {
	console.log(`Listening on port ${PORT}...`);
}); // 127.0.0.1 => localhost
