let poolLength = 100
let pool = []
let q = []
let waitingSum = 0.00
let respondSum = 0.00
let serviceSum = 0.00
let queueLength = 0.00
let dropOut = []

for (var i = 0; i < poolLength; i++) {
  var randService = Math.floor(Math.random() * 100) + 5;
  var randArrive = Math.floor(Math.random() * 100) + 5;
  var temp = {
    user: i + 1,
    arriveTime: randArrive,
    waitingTime: 0,
    serviceTime: randService,
    respondTime: 0
  };
  serviceSum += temp.serviceTime
  pool.push(temp)
}

q.push(pool[0])
pool.shift()

while (q.length > 0 && q.length <= 8 && pool.length >= 0) {
  if (pool.length > 0) {
    console.log(q);
    if (q.length == 8) { // The next pool is going to be dropped
      dropOut.push(pool[0])
      pool.shift()

      for (let i = 1; i < q.length; i++) {
        q[i].waitingTime += q[0].serviceTime
      }

      waitingSum += q[0].waitingTime
      respondSum += q[0].waitingTime + q[0].serviceTime
      queueLength += q.length
      q.shift()
    } else {
      console.log('Next arrive Time : ' + pool[0].arriveTime);
      console.log('Selisih : ' + (q[0].serviceTime - pool[0].arriveTime));
      if (q[0].serviceTime > pool[0].arriveTime) {
        q[0].serviceTime -= pool[0].arriveTime
        pool[0].arriveTime--

        q.push(pool[0])
        pool.shift()
        queueLength += q.length

        for (let i = 1; i < q.length; i++) {
          q[i].waitingTime += q[0].serviceTime
        }

      } else if (q[0].serviceTime < pool[0].arriveTime) {
        pool[0].arriveTime -= q[0].serviceTime
        q[0].serviceTime--

        for (let i = 1; i < q.length; i++) {
          q[i].waitingTime += q[0].serviceTime
        }

        waitingSum += q[0].waitingTime
        respondSum += q[0].waitingTime + q[0].serviceTime
        q.shift()

        if (q.length == 0) {
          q.push(pool[0])
          pool.shift()
          queueLength += q.length
        }
      } else if (q[0].serviceTime = pool[0].arriveTime) {
        pool[0].arriveTime -= q[0].serviceTime
        q[0].serviceTime--

        for (let i = 1; i < q.length; i++) {
          q[i].waitingTime += q[0].serviceTime
        }

        waitingSum += q[0].waitingTime
        respondSum += q[0].waitingTime + q[0].serviceTime
        
        q.shift()

        q.push(pool[0])
        pool.shift()
        queueLength += q.length
      }
    }
  } else {
    for (let i = 1; i < q.length; i++) {
      q[i].waitingTime += q[0].serviceTime
    }

    q.shift()
  }
}

var totQueueLength = 0

totQueueLength += 2

var waitingRate = waitingSum / (poolLength - dropOut.length)
var respondRate = respondSum / (poolLength - dropOut.length)
var serviceRate = serviceSum / (100)
var queueLengthRate = totQueueLength / 100

console.log('==================');
console.log('waiting = ' + waitingRate.toFixed(2));
console.log('respond = ' + respondRate.toFixed(2));
console.log('service = ' + serviceRate.toFixed(2));
console.log('queueLength = ' + queueLengthRate.toFixed(2));
console.log('dropout = ' + dropOut.length);

console.log(q);