const Nightmare = require('nightmare');
const nightmare = Nightmare({ show: true });

nightmare
	.goto('http://reddit.com/r/world_news')
	.wait(5000)
	.evaluate(() => {
		const nodes = document.querySelectorAll('h3');
		return [...nodes].map(node => node.innerText);
	})
	.end()
	.then(result => console.log(result))
	.catch(err => console.log(err));
