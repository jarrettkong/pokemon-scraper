const Nightmare = require('nightmare');
const nightmare = Nightmare({ show: true });

nightmare
	.goto('http://pokedream.com/pokedex/pokemon?display=gen1')
	.wait(5000)
	.evaluate(() => {
		const nodes = document.querySelectorAll('table#pokemon-table td:first-child img');
		return [...nodes].map(node => node.src);
	})
	.end()
	.then(result => console.log(result))
	.catch(err => console.log(err));
