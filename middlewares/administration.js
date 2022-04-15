const { Telegraf, Composer, Scenes: { BaseScene } } = require('telegraf')
const { DB } = require('../db/db')


const scene = new BaseScene('adminScene')

scene.enter(async ctx => {
    ctx.replyWithTitle("Напишите сообщение для рассылки")
})

scene.on('message', ctx => {
    console.log(ctx)
    ctx.scene.state.text = ctx?.message?.text
    ctx.replyWithKeyboard("Подтвердите рассылку сообщения", 'confirm_cancel_keyboard')

})

scene.action('confirm', async ctx=>{
    ctx.answerCbQuery().catch(console.log);
    
    if (ctx.scene.state.text) 
        (await DB().getAllGroups())?.forEach(group=>{
            ctx.telegram.sendMessage(group.group_id,ctx.scene.state.text).catch(console.log)
            
        })
    else ctx.replyWithTitle('Неверный текст')

    ctx.scene.leave();
})

scene.action('cancel', ctx=>{
    ctx.answerCbQuery().catch(console.log);
    ctx.scene.leave();
})

module.exports = scene
