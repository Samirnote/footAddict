require("./../config/mongodb");

const Mangas = require("./../model/Manga");

const mangas = [
	{
		name: "One Piece",
		category: "yellow",
		material: "plastic",
		age: "24",
		cover:
			"https://upload.wikimedia.org/wikipedia/fr/thumb/1/1a/Logo_One_piece.svg/langfr-2880px-Logo_One_piece.svg.png",
	},
	{
		name: "Fairy Tail",
		category: "green",
		material: "wood",
		age: 42,
		cover:
			"https://upload.wikimedia.org/wikipedia/fr/thumb/c/c8/Logo_FairyTail.svg/langfr-2880px-Logo_FairyTail.svg.png",
	},
	{
		name: "Guard",
		category: "red",
		material: "gold",
		age: 35,
		cover:
			"https://amsterdamduckstore.com/wp-content/uploads/2015/07/british-rubber-duck-front-e1569574622812-400x400.jpg",
	},
];

(async function () {
	try {
		await Mangas.deleteMany();
		const createdMangas = await Mangas.create(mangas);
		console.log(`Just created ${createdMangas.length} 🦆`);
		process.exit();
	} catch (err) {
		console.error(err);
		process.exit();
	}
})();
