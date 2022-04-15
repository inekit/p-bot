const { Telegraf } = require("telegraf");

const { randomInteger,randomP,dtime,getRate,updateRate,valueSize, store, sendPenis } = require("./utils")
let username = store.get(`username`)

const quitListener = Telegraf.command('quit', (ctx) => {

    const chat_id = ctx.message.chat.id

    if (ctx.chat?.type === 'private') return
  
    ctx.telegram.leaveChat(chat_id).catch(e=>console.log("cant leave chat"))

})

const startListener = Telegraf.command(['start','help'],  async (ctx) => {

    const msg = await ctx.telegram.sendMessage(ctx.message.chat.id, `Привет. Чтобы узнать размер своего члена, набери /penis, или мое имя, добавив меня в администраторы. Так же можно узнать это тет-а-тет в приватном чате. Чтобы посмотреть рейтинг по группе, набери /rate`).catch(e=>console.log("cant send help"))

    store.set(`username`, msg?.from?.username ?? 'username')
  
})


const penisListener = Telegraf.command('penis',  async (ctx) => await sendPenis(ctx))

const rateListener = Telegraf.command('rate', async (ctx) => {

    const chat_id = ctx.message.chat.id
    
    const rate = getRate(chat_id)

    let rateStr;

    if (!rate) rateStr = "Рейтинг пока не составлен"

    else rateStr = Object.entries(rate).sort((a,b)=>{return b[1].avg - a[1].avg})
     .reduce((prev, cur, i)=>
     prev+`${i+1}) @${cur[1]?.username ?? cur[0]?.substring(1)}: ${cur[1]?.avg.toFixed(1) ? +cur[1]?.avg.toFixed(1)+ " см "+valueSize(cur[1]?.avg) : "Пока не измерен"}\n`, 
      "Средний размер члена за все время: \n")

    ctx.telegram.sendMessage(chat_id, rateStr).catch(e=>console.log("error sending rate string"))
})


/*bot.use(async (ctx, next) => {
   
    console.log(`1.log from chat: ${ctx.message?.chat.first_name ?? ctx.message?.chat.id} from ${ctx.from.username ?? ctx.from.id}, u_id = ${ctx.update?.update_id}, ut: ${ctx.message?.text}`)
    await next() 
  })*/





/*bot.on('message', async (ctx) => {
    
    //if (ctx.chat?.type === 'private') return await sendPenis(ctx)

    if ((ctx?.message?.text?.indexOf(store.get(`username`)) + 1)) await sendPenis(ctx)
})*/

module.exports = {quitListener, startListener, penisListener, rateListener}