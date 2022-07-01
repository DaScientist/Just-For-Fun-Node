const fs =  require("fs");
const path = require("path");
const Papa = require('papaparse');

function init() {
	stream = fs.createReadStream(path.join(process.cwd(), 'its.tsv'))
		.once('open', function () {
			Papa.parse(stream, {
				delimiter: '\t',
				escapeChar: '\n',
				// header: true,
				// chunk: (),
				complete: (results) => {
					console.log('search has been completed')
					console.log(results)
				},
				error: function (error) {
					process.send(['search-failed', 'process']); //mainWindow.webContents.send('search-failed', 'process');
					console.log(error);
				}
			});
		})
		.on('error', function (err) {
			process.send(['search-failed', 'read']); //mainWindow.webContents.send('search-failed', 'read');
			console.log(err);
		});
}

init()
