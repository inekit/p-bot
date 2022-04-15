const mysql = require("mysql2");
const {mysqlParams} = require("../config")

let pool=mysql.createPool(
  mysqlParams,
  (err) => console.log(err)
);
pool.on('uncaughtException', function (err) {
  console.log('uncaughtException', err);
})

pool.on('error', function(err) {
  console.log("I'm dead",err);
})
function DB() {
  let con = pool
  con.addBD = addBD;
  con.setCelebrated = setCelebrated;
  con.getTodaysBD = getTodaysBD;
  con.getAllBD = getAllBD;
  con.defaultQuery=defaultQuery;
  con.getAllGroups=getAllGroups;
  con.getStatistics=getStatistics;
  con.addGroup=addGroup;
  con.removeGroup=removeGroup;
  return con;
}

function defaultQuery(query,arguments){
    return this.promise()
    .query(query, arguments)
    .catch((err) => {
      console.log(err);
      return;
    })
    .then((res) => {
      return res;
    })
}



async function getStatistics(){
    let query=`SELECT count(DISTINCT group_id) groups_count, count(DISTINCT tg_id) users_count FROM tg_birthdays.birthday`;
  return (await this.defaultQuery(query))?.[0]?.[0]
}

async function getAllGroups(){
    let query=`SELECT group_id FROM tg_birthdays.groups`;
  return (await this.defaultQuery(query))?.[0]
}

async function getTodaysBD(){
  let query=`SELECT JSON_OBJECTAGG(tg_id, username) usernames, group_id FROM tg_birthdays.birthday as b
  WHERE MONTH(b.b_date) = MONTH(now()) and DAY(b.b_date) = DAY(now()) 
  AND (last_time_sent is null OR last_time_sent <> date(now()))
  GROUP BY group_id`;
  return (await this.defaultQuery(query))?.[0]
}

async function getAllBD(group_id){
    let query=`SELECT * FROM tg_birthdays.birthday as b
    WHERE group_id = ?
    ORDER BY MONTH(b.b_date), DAY(b.b_date)`;
    return (await this.defaultQuery(query, [group_id]))?.[0]
  }

async function setCelebrated(tg_id,group_id) {
    let query=`UPDATE tg_birthdays.birthday SET last_time_sent = now() WHERE tg_id = ? AND group_id = ?`;
    return (await this.defaultQuery(query,[tg_id,group_id]))?.[0]?.affectedRows;
}

async function addBD(tg_id, group_id, username, b_date) {
    let query="REPLACE into tg_birthdays.birthday (tg_id, group_id, username, b_date) values (?, ?, ?, ?)";
    let arguments=[tg_id, group_id, username, b_date];
    return (await this.defaultQuery(query,arguments))?.[0]?.affectedRows;
}

async function addGroup(group_id) {
    let query="REPLACE into tg_birthdays.groups (group_id) values (?)";
    let arguments=[group_id];
    return (await this.defaultQuery(query,arguments))?.[0]?.affectedRows;
}

async function removeGroup(group_id) {
    let query="DELETE FROM tg_birthdays.groups WHERE group_id = ?";
    let arguments=[group_id];
    return (await this.defaultQuery(query,arguments))?.[0]?.affectedRows;
}



module.exports = { DB };
