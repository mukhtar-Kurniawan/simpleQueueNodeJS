let poolLength = 100
let pool = []
let q = []
let waitingSum = 0
let respondSum = 0
let serviceSum = 0
let queueLength = 0
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
  pool.push(temp)
}

q.push(pool[0])
pool.shift()

while (q.length > 0 && q.length <= 8 && pool.length >= 0) {
  if (pool.length > 0) {
    console.log(q);
    queueLength += (q.length - 1) //every iteration, we will record the queue length

    if (q.length == 8) { // The next pool is going to be dropped
      dropOut.push(pool[0])
      pool.shift()

      for (let i = 1; i < q.length; i++) {
        q[i].waitingTime += q[0].serviceTime
      }

      waitingSum += q[0].waitingTime
      respondSum += q[0].waitingTime + q[0].serviceTime
      q.shift()
    } else {
      console.log('Next arrive Time : ' + pool[0].arriveTime);
      console.log('Difference : ' + (q[0].serviceTime - pool[0].arriveTime));
      if (q[0].serviceTime > pool[0].arriveTime) {
        q[0].serviceTime -= pool[0].arriveTime
        pool[0].arriveTime--

        serviceSum += pool[0].serviceTime //serviceSum will be add up when pool[0] will come in so it can hold the service time
        q.push(pool[0])
        pool.shift()

        for (let i = 1; i < q.length; i++) {
          q[i].waitingTime += q[0].serviceTime //every move, we will add up the waiting time in the queue
        }

      } else if (q[0].serviceTime < pool[0].arriveTime) {
        pool[0].arriveTime -= q[0].serviceTime
        q[0].serviceTime--

        for (let i = 1; i < q.length; i++) {
          q[i].waitingTime += q[0].serviceTime
        }

        waitingSum += q[0].waitingTime                      // before q[0] comes out, we will record the waiting time
        respondSum += q[0].waitingTime + q[0].serviceTime   // and respond time
        q.shift()

        if (q.length == 0) {
          serviceSum += pool[0].serviceTime
          q.push(pool[0])
          pool.shift()
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

        serviceSum += pool[0].serviceTime
        q.push(pool[0])
        pool.shift()
      }
    }
  } else {
    for (let i = 1; i < q.length; i++) {
      q[i].waitingTime += q[0].serviceTime
    }
    q.shift()
  }
}

var waitingRate = waitingSum / (poolLength - dropOut.length)
var respondRate = respondSum / (poolLength - dropOut.length)
var serviceRate = serviceSum / (100)
var queueLengthRate = queueLength / 100

console.log(queueLength);

console.log('==================');
console.log('waiting = ' + waitingRate.toFixed(2));
console.log('respond = ' + respondRate.toFixed(2));
console.log('service = ' + serviceRate.toFixed(2));
console.log('queueLength = ' + queueLengthRate.toFixed(2));
console.log('dropout = ' + dropOut.length);

console.log(q);