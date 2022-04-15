const cron = require('node-cron')
const moment = require('moment')
const {DB} = require('../db/db')

module.exports = class Cron {

	constructor(ctx) {

		this.ctx = ctx
        
		cron.schedule('0 * * * *', async () => {
            this.checkTodayBD()
		  });

	}

	async checkTodayBD() {
        const groups = await DB().getTodaysBD()
        groups.forEach(group=>{
            console.log(group)
            const entries = Object.entries(group.usernames)
            const celebratorsStr = entries.reduce((prev, cur, i) => `${prev}@${cur[1] ?? cur[0]}\n`, `Сегодня отмечают свой день рождения:\n`)
            this.ctx.telegram.sendMessage(group.group_id,celebratorsStr)
            entries.forEach(async entry=>{
                await DB().setCelebrated(entry[0],group.group_id)
            })
           
        })
	}

}