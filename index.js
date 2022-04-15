const { Telegraf, Composer, Scenes: { BaseScene, Stage },session } = require('telegraf')

//const mainScene = new BaseScene('mainScene')

const token = ''

const bot = new Telegraf(token ?? process.env.BOT_TOKEN ?? token)
const Cron = require('./cron/cron')

const shortcuts = require("./context/shortcuts");
Object.assign(bot.context, shortcuts);
const ctx = {...bot.context, telegram: bot.telegram };

const administrationScene = require("./middlewares/administration");

const {drListener, drTimeListener} = require("./middlewares/birthday");
const {quitListener, startListener, penisListener, rateListener} = require("./middlewares/pen");
const { DB } = require('./db/db');


const stage = new Stage([administrationScene])

bot.use(drListener, drTimeListener)
bot.use(quitListener, startListener, penisListener, rateListener)


bot.use(session());
bot.use(stage.middleware());

bot.command('mail',(ctx)=>{
    if (checkAdmin(ctx.message?.chat?.id)) {
        ctx.scene.enter('adminScene')
    }
})


bot.command('statistics',async (ctx)=>{
    if (checkAdmin(ctx.message?.from?.id)) {
        const {users_count = 0, groups_count = 0} = await DB().getStatistics()
        ctx.replyWithTitle(`Ботом в настоящее время пользуется ${groups_count} группы и ${users_count} уникальных пользователей`);
    
    }
        //console.log(await DB().getStatistics())
        
})

bot.on('new_chat_members', ctx=>{

    if (ctx.message?.new_chat_members?.find(member=>member.id === ctx.botInfo?.id)) {
        DB().addGroup(ctx.message.chat.id);
    }
})

bot.on('left_chat_member', ctx=>{
    if (ctx.message?.left_chat_member?.id === ctx.botInfo?.id) {
        DB().removeGroup(ctx.message.chat.id);
    }
})

new Cron(ctx);

bot.launch()

process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))


function checkAdmin(id){
    if (id === 397249411 || id === 296846972) return true
    return false
}