const { Telegraf } = require("telegraf");
const moment = require('moment')
const dateFormats = [
    'D.MMMM.YYYY',
    'DD.MM.YY',
    'DD.MM.YYYY',
    'DD.MM.YYYY'
  ];
  const { dtime } = require("./utils")

const {DB} = require('../db/db')
  

const drListener = Telegraf.command('dr',async ctx=>{
    const chat_id = ctx.message.chat.id
    
    const birthdays = await DB().getAllBD(chat_id)

    let birthdaysStr;
    //console.log(birthdays)

    if (!birthdays) birthdaysStr = "Задайте дни рождения командой /drtime"

    else birthdaysStr = birthdays.reduce((prev, cur, i)=>
     prev+`${i+1}) @${cur.username ?? cur.tg_id}: ${dtime(cur.b_date) ?? 'неизвестен'}\n`, 
      "Дни рождения участников группы: \n")

    ctx.telegram.sendMessage(chat_id, birthdaysStr).catch(e=>console.log("error sending rate string"))
})

const drTimeListener = Telegraf.command('drtime',async ctx=>{
    const date = ctx.message?.text?.match(/^\/drtime\s*([0-9]{1,2}.[0-9]{1,2}.[0-9]{2,4})\s*$/)?.[1]

    if (moment(date, dateFormats, true).isValid()){ 

        if (await DB().addBD(ctx.from?.id, ctx.chat?.id, ctx.from?.username, moment(date, dateFormats, true).toDate())) {
            ctx.reply(`День рождения  @${ctx.message?.from?.username ?? ""} - ${date}`);
        } else ctx.reply(`Ошибка базы при добавлении дня рождения`);

    } else ctx.reply('Неправильный формат даты. Для добавления дня рождения введите ее в формате 31.12.2022')
})

module.exports={drListener, drTimeListener}