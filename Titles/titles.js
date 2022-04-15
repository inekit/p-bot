const fs = require('fs');
const { lang } = require('../node_modules/moment/moment');

class Titles {

	constructor() {

		const dataFolder = './Titles/Data'

		const langs = fs.readdirSync(dataFolder, { withFileTypes: true })
		.filter(d => d.isDirectory())
		.map(d => d.name);

		this.dictionary = [];

		for (let lang of langs){
			let folder = `./Data/${lang}/`

			let obj = {...require(folder + 'buttons'), ...require(folder + 'errors'), ...require(folder + 'titles'), ...require(folder + 'variables') }
			Object.keys(obj).map(key => this.dictionary[key] ? this.dictionary[key][lang] = obj[key] : this.dictionary[key] = {[lang]: obj[key]})
		}

		//console.log(this.dictionary)

	}

	insert(string, language, replacers) {

		const generator = (function* (replacers) {
			
			for(const replacer of replacers) {

				yield this.dictionary[replacer] ? this.dictionary[replacer][language] || this.dictionary[replacer] : replacer
			}

		}).bind(this)(replacers)

		return string.replaceAll(/\*/g, () => generator.next().value)
	}

	getTitle(title, language, replacers) {

		if(!this.dictionary[title]) {

			console.log(title)
			
			if (title?.toUpperCase() === title) {
			
				let file = JSON.parse(fs.readFileSync('./Titles/Data/ru/titles.json', 'utf-8'))
				file[title] = title
				fs.writeFileSync('./Titles/Data/ru/titles.json', JSON.stringify(file, null, 2));
	
			}
			
			return title
		}

		const string = this.dictionary[title][language] || this.dictionary[title]

		let res = replacers ? this.insert(string, language, replacers) : string

		//console.log(res);

		return res;
	}

	setTitle(title, value) {

		this.dictionary[title] = value
	}

	getValues(title) {

		const value = this.dictionary[title]

		return value ? typeof value === 'string' ? [ value ] : Object.values(value) : title
	}

	isInKey(title, value) {

		return this.getKeys(title).includes(value)
	}

	isInValue(title, value) {

		return this.getValues(title).includes(value)
	}
}

module.exports = new Titles()
