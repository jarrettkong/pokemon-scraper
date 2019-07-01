const Nightmare = require('nightmare');
const nightmare = Nightmare({ show: true });

export const getPokemonData = async pokemon => {
	try {
		const pokemon = await nightmare
			.goto('http://pokedream.com/pokedex/pokemon?display=gen1')
			.wait(5000)
			.evaluate(() => {
				const nodes = document.querySelectorAll('table#pokemon-table td:first-child img');
				return {
					id: numberNode.innerText,
					name: nameNode.innerText,
					type: [...typeNodes].map(n => n.innerText),
					HP: hpNode.innerText,
					Attack: attackNode.innerText,
					Defense: defenseNode.innerText,
					'Sp Attack': spAttackNode.innerText,
					'Sp Defense': spDefenseNode.innerText,
					Speed: speedNode.innerText
				};
			})
			.end();
		return pokemon;
	} catch (err) {
		console.log(err);
	}
};
