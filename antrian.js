var count = 0
const pool = []
const q = []

for (var i = 0; i < 10; i++) {
  var randService = Math.floor(Math.random() * 1000) + 0;
  var randArrive = Math.floor(Math.random() * 1000) + 0;
  var temp = {
    user: i + 1,
    arriveTime: randArrive,
    // waitingTime: 0,
    serviceTime: randService,
    // respondTime: 0
  };
  pool.push(temp)
}

q.push(pool[0])
pool.shift()

while (q.length > 0 && q.length < 7 && pool.length >= 0) { 
  console.log('Next arrive Time : ' + pool[0].arriveTime);
  console.log(q);
  console.log('Selisih : ' + (q[0].serviceTime - pool[0].arriveTime) );

  if (q[0].serviceTime > pool[0].arriveTime) {
    q[0].serviceTime -= pool[0].arriveTime
    pool[0].arriveTime--

    q.push(pool[0])
    pool.shift()

  } else if(q[0].serviceTime < pool[0].arriveTime){
    pool[0].arriveTime -= q[0].serviceTime
    q[0].serviceTime--

    q.shift()

    if(q.length == 0){
      q.push(pool[0])
      pool.shift()
    } 
  }
}