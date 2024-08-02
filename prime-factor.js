// let numbers = [14, 15, 644, 645, 646];

let numBegin = 0;
let numEnd = 9999;

let numbers = [];
let primeFactorNumbers = [];
let firstHitConsecutiveChecked = {};

if(numEnd < numBegin){
  let tmp = numEnd;
  numEnd = numBegin;
  numBegin = tmp;
}
if(numBegin < 0) numBegin = 0;
if(numEnd < 0) numEnd = 0;

let numBeginLength = numBegin.toString().length;
let numEndLength = numEnd.toString().length;

for(i = numBegin; i <= numEnd; i++){
  // prevent lower than 0
  if(i < 0 ) continue;
  numbers.push(i);
}


console.log(`Solve ${numBegin}-${numEnd}\r\n`);

numbers.forEach((num, index)=>{

  let calNumberResult = calPrimeFactorNumberList(num);
  let numberNoDup = removeDuplicates(calNumberResult);

  primeFactorNumbers[index] = {
    number : num, // 88
    numberLength: num.toString().length,
    primeFactoryNumberList: calNumberResult, // [2, 2, 2, 11]
    primeFactoryNumberListNoDup: numberNoDup, // [2, 11]
    primeFactoryNumberListNoDupLength: numberNoDup.length,
  }

  // console.log(`${numbers[index]} = ${primeFactorNumbers[index].primeFactoryNumberList.join(' x ')}`);

  // check hit first consecutive numbers series
  let toCheckFactorNumber = primeFactorNumbers[index];
  let keyByLength = `length_${toCheckFactorNumber.numberLength}`;

  if(firstHitConsecutiveChecked[keyByLength] == undefined){
    // always hit when lower than 2
    if(toCheckFactorNumber.numberLength < 2 && toCheckFactorNumber.primeFactoryNumberListNoDupLength == 1){
      firstHitConsecutiveChecked[keyByLength] = {
        checked : true,
        startIndex: index,
        length: toCheckFactorNumber.numberLength,
      }
    }else{
      let startCheckAtIndex = index - toCheckFactorNumber.numberLength + 1;
      let lengthToCheck = toCheckFactorNumber.numberLength;
      let isAllConsecutive = true;
      for(i = startCheckAtIndex ; i <= index; i++ ){
        if(primeFactorNumbers[i]?.primeFactoryNumberListNoDupLength != lengthToCheck || isAllConsecutive == false){
          isAllConsecutive = false;
        }  
      }

      if(isAllConsecutive == true){
        firstHitConsecutiveChecked[keyByLength] = {
          checked : true,
          startIndex: startCheckAtIndex,
          length: toCheckFactorNumber.numberLength,
        }
      }

    }
  }

});

// console.log(firstHitConsecutiveChecked);

for(i = numBeginLength; i <= numEndLength; i++){
  let firstHitKey = `length_${i}`;
  console.log(`#${i}`);
  if(firstHitConsecutiveChecked[firstHitKey]){
    let startIndex = firstHitConsecutiveChecked[firstHitKey].startIndex;
    for(j = startIndex; j < startIndex + firstHitConsecutiveChecked[firstHitKey].length; j++){
      // console.log(`${numbers[j]} = ${primeFactorNumbers[j].primeFactoryNumberList.join(' x ')}`);
      console.log(`${numbers[j]} = ${logFormatPower(primeFactorNumbers[j].primeFactoryNumberList).join(` x `)}`);
    }
  }else{
    console.log(`Not found`);
  }
  console.log();
}


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

function logFormatPower(numList){
  let result = [];
  let numCounter = {};

  numList.forEach((num)=>{
    if(numCounter[num] == undefined){
      numCounter[num] = { num :num, counter: 1 };
    }else{
      numCounter[num].counter = numCounter[num].counter + 1;
    }
  });

  for (const [key, num] of Object.entries(numCounter)) {
    if(num.counter == 1){
      result.push(`${num.num}`);
    }else{
      result.push(`${num.num}^${num.counter}`);
    }
  }
  return result;
}

function removeDuplicates(arr) {
  return arr.filter((item, index) => arr.indexOf(item) === index);
}