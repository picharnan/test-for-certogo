// let numbers = [12, 14, 15, 30, 230, 389, 644, 645, 646, 724, 2334, 7734];

// init number
let numBegin = 0;
let numEnd = 100;
let numbers = [];
for(i = numBegin; i <= numEnd; i++){
  // prevent lower than 0
  if(i < 0 ) continue;
  numbers.push(i);
}

let primeFactorNumerResults = [];
let primeFactorNumerResultsNoDup = [];


numbers.forEach((num, index)=>{
  primeFactorNumerResults[index] = calPrimeFactorNumberList(num);
  console.log(`${numbers[index]} = ${primeFactorNumerResults[index].join(' x ')}`);
});


function calPrimeFactorNumberList(num){
  // if num lower than 2 should error or return itself
  // depand on business
  if(num < 2){
    return [num];
  }

  let result = [];

  let devideResult = -1;
  let devideCounter = 1;
  let isDevideSuccess = false;

  do{
    devideCounter++;
    devideResult = num / devideCounter;

    if(Number.isInteger(devideResult)){
      isDevideSuccess = true;
      result.push(devideCounter);

      // Check the end loop
      if(devideResult == 1){
        return result;
      }else{
        // recursive if not end loop
        let tailResult = calPrimeFactorNumberList(devideResult);
        tailResult.forEach((tNum)=>{
          result.push(tNum);
        });
        return result;
      }
    }

  }while(isDevideSuccess == false && devideCounter <= num);

  // reach here should be error
  throw new Error(`Error calPrimeFactorNumberList`);
}