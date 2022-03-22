const { Telegraf } = require("telegraf");


const token = ''

const bot = new Telegraf(process.env.BOT_TOKEN ?? token)

const { randomInteger,randomP,dtime,getRate,updateRate,valueSize, store } = require("./utils")

let username = store.get(`username`)

const sendPenis = async (ctx)=> {
    if (!ctx) throw new Error('no ctx')

    const chat_id = ctx.message.chat.id

    const lastScanDate = new Date(store.get(`last-date-${chat_id}-${ctx.from?.id}`)?.valueOf())
    const yesterdayDate = new Date()
    yesterdayDate.setDate(yesterdayDate.getDate() - 1);;

    //console.log(yesterdayDate <=lastScanDate)
    if (yesterdayDate <=lastScanDate) 
     return ctx.telegram.sendMessage(chat_id, `Померить можно только раз в сутки. Для вас следующая возможность будет ${dtime(new Date(lastScanDate.setDate(lastScanDate.getDate() + 1)))}`).catch(e=>console.log()); 
   
    const p_size = randomP()
    const msg = await ctx.telegram.sendMessage(chat_id, `Размер члена ${ctx.message?.from?.username ?? ""} - ${p_size} см ${valueSize(p_size)}`).catch(e=>console.log()); 
    store.set(`last-date-${chat_id}-${ctx.from?.id}`, new Date().setHours(0,0,0,0))
    updateRate(chat_id, ctx.from?.id, p_size, ctx.from?.username)
}

bot.command('quit', (ctx) => {

    const chat_id = ctx.message.chat.id

    if (ctx.chat?.type === 'private') return
  
    ctx.telegram.leaveChat(chat_id).catch(e=>console.log())

})

bot.command(['start', 'help'],  async (ctx) => {

    const msg = await ctx.telegram.sendMessage(ctx.message.chat.id, `Привет. Чтобы узнать размер своего члена, набери /penis, или мое имя, добавив меня в администраторы. Так же можно узнать это тет-а-тет в приватном чате. Чтобы посмотреть рейтинг по группе, набери /rate`).catch(e=>console.log())

    store.set(`username`, msg?.from?.username ?? username)
  
})


bot.command('penis',  async (ctx) => await sendPenis(ctx))

bot.command('rate', async (ctx) => {

    const chat_id = ctx.message.chat.id
    
    const rate = getRate(chat_id)

    let rateStr;

    if (!rate) rateStr = "Рейтинг пока не составлен"

    else rateStr = Object.entries(rate).sort((a,b)=>a[1].avg>b[1].avg)
     .reduce((prev, cur, i)=>
     prev+`${cur[1]?.username ?? cur[0]?.substring(1)}: ${cur[1]?.avg.toFixed(1) ? +cur[1]?.avg.toFixed(1)+ " см "+valueSize(cur[1]?.avg) : "Пока не измерен"}\n\n`, 
      "Рейтинг по группе: \n\n")

    ctx.telegram.sendMessage(chat_id, rateStr).catch(e=>console.log())
})


bot.on('message', async (ctx) => {
    
    //if (ctx.chat?.type === 'private') return await sendPenis(ctx)

    if ((ctx?.message?.text?.indexOf(store.get(`username`)) + 1)) await sendPenis(ctx)
})



bot.launch()

process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))
