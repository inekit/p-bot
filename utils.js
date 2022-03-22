const editJsonFile = require('edit-json-file')


let store = editJsonFile(`./store.json`, { autosave: true })


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
    randomInteger,randomP,dtime,getRate,updateRate,valueSize, store
}