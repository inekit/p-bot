const editJsonFile = require('edit-json-file')

let store = editJsonFile(`./db/store.json`, { autosave: true })


function randomInteger(min, max) {
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
  }
  
function randomP(){
    const rand = randomInteger(1, 100)
    if (rand <60 ) { 
        return randomInteger(10,15);
    } 
    else if (rand <30 ) { 
        return randomInteger(15,25);
    }
    else if (rand <15 ) { 
        return randomInteger(1,10);
    }
    else{ 
        return randomInteger(25,35);
    }
}

function dtime(dtime){
    return dtime?.toLocaleString('ru', {
        //hour: 'numeric',
        //minute: 'numeric',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
}

function getRate(group_id){
    return store.get(`avg-sizes.g${group_id}`)
}



const sendPenis = async (ctx)=> {

    if (!ctx) throw new Error('no ctx')

    const chat_id = ctx.message?.chat.id

    //console.log(`2.catchedBeforeReacted`)


    const lastScanDate = new Date(store.get(`last-date-${chat_id}-${ctx.from?.id}`)?.valueOf())
    const yesterdayDate = new Date()
    yesterdayDate.setDate(yesterdayDate.getDate() - 1);

    //console.log(`3.reacted, chat_id: ${ctx.message?.chat.first_name ?? ctx.message?.chat.id}, ctx.from?.id: ${ctx.from.username ?? ctx.from.id}, lastScanDate: ${lastScanDate}, yesterdayDate:${yesterdayDate}`)

    //console.log(yesterdayDate <=lastScanDate)
    if (yesterdayDate <=lastScanDate) 
     return ctx.telegram.sendMessage(chat_id, `Померить можно только раз в сутки. Для вас следующая возможность будет ${dtime(new Date(lastScanDate.setDate(lastScanDate.getDate() + 1)))}`)
      .catch(e=>console.log("new error thrown sending no p")); 
   
    const p_size = randomP()
    const msg = await ctx.telegram.sendMessage(chat_id, `Размер члена ${ctx.message?.from?.username ?? ""} - ${p_size} см ${valueSize(p_size)}`).catch(e=>console.log("new error thrown sending pSize")); 
    store.set(`last-date-${chat_id}-${ctx.from?.id}`, new Date().setHours(0,0,0,0))
    updateRate(chat_id, ctx.from?.id, p_size, ctx.from?.username)
}

function updateRate(group_id, person_id, penis_size, username){
    let {avg, count} = store.get(`avg-sizes.g${group_id}.p${person_id}`) ?? {}

    if (!avg || !count ) return store.set(`avg-sizes.g${group_id.toString()}.p${person_id.toString()}`,{username, avg: penis_size, count: 1})

    avg = (avg*count+penis_size)/(++count)

    store.set(`avg-sizes.g${group_id}.p${person_id}`,{username, avg, count})


}

function valueSize(size){
    if (size <= 10 ) { 
        return '👎'
    } 
    else if (size <=15 ) { 
        return '😔'
    }
    else if (size <=25 ) { 
        return '😏'
    }
    else{ 
        return '😱'
    }
}



module.exports = {
    randomInteger,randomP,dtime,getRate,updateRate,valueSize,sendPenis, store
}