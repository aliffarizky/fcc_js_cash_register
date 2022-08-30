/*
DISCLAIMER :
- This script is made solely for freecodecamp cash register problem on : https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/javascript-algorithms-and-data-structures-projects/cash-register
- This script is made with my-very-very-limited knowledge on javascript (my progress so far is only on Basic Javscript 83/113. Yes, i haven't even properly learned about js's array, for-loop, etc.)
- OBVIOUSLY, this script is not optimized both on codes and workflow, since i'am only doing this to solve the problem ASAP lastnight, as-per-jendol's-request
- This script will be updated later as soon as i learn more about javascript, so save your energy before critisizing this.

WORKFLOW :

Input :
cid = cash in drawer
cash = customer cash amount
price = yes, as you guessed it, the price that customer pays
change = customer's change amount

Output :
output = {status = "", change=[]}
    - .status = register status ("OPEN", "CLOSE", "INSUFFICIENT")
    - .change = array to store customer change unit and amount ex : ["QUARTER", [0.5]]
current_change = array to store temporary amount of customer-current-change from cid [unit = "", amount = 0]

Functions that i'am not familiar with :
.toFixed() = to round up value, maybe can be changed to more proper math functions
.reverse() = to reverse cid, maybe can be changde to more proper sorting functions

Flow :
1. create global currency as described on project
2. calculate current total cid
3. calculate customer change (change = cash-price)
3. compare cid with customer change
    a. if cid is lower than customer change, return status = "INSUFFICIENT_FUNDS" and change = empty array
    b. if cid is same as customer change, return status = "CLOSE" and change = current cid
    c. if cid is higher than customer change :
        - sort current cid from biggest to lowest change
        - iterate through global currency to get biggest change possible
        - loop the biggest-possible-global-currency, 
        - (inside loop) increment the amount into current_change amount until cid amount is empty,
        - (inside loop) decrease change value, and continue iterate for other cid
        - if change is zero, then return status = "OPEN" and change = current_change 
        - if change is not zero, then return status = "INSUFFICIENT_FUNDS" and change = empty array (console.log("Kembalian nya mau di donasikan saja kak?"))
*/


function checkCashRegister(price, cash, cid) 
{
  //global currency on this problem
  const global_currency = 
  {
    "PENNY" :	.01,
    "NICKEL"  : .05,
    "DIME"	 : .10,
    "QUARTER" :	.25 ,
    "ONE" :	1.00,
    "FIVE" : 5.00,
    "TEN"	: 10.00,
    "TWENTY" : 20.00,
    "ONE HUNDRED" : 100.00
  }

  //variables
  let output = {status: "", change: []}; //output of this function
  let total_cid = 0; //total cid
  let change = 0; //change value
  const change_amount = []; //current customer change amount

  //calculate current cash in drawer
  for (let cid_amount of cid)
  {
    total_cid += cid_amount[1];
  }
  total_cid = total_cid.toFixed(2) //round-up amount cid

  //calculate change
  change = cash - price;
  if (change > total_cid) //insufficient fund
  {
    output.status = "INSUFFICIENT_FUNDS";
    output.change = [];
  }
  else if (change.toFixed(2) === total_cid) //no more money in cid
  {
    output.status = "CLOSED";
    output.change = cid;
  }
  else //calculate change based on cid
  {
    cid = cid.reverse(); //sort biggest amount first;
    for (let element of cid) //iterate current cid
    {
      let cid_unit = element[0]; //ex : "PENNY", "NICKEL", "DIME", ETC
      let cid_amount = element[1]; //ex : 0.01, 0.25, 0.5, etc
      let current_change = [cid_unit,0]; //temp variable to store customer change array
      while (change >= global_currency[cid_unit] && cid_amount > 0) //loop while change is bigger than current currency and there is still money in cid
      {
        current_change[1] += global_currency[cid_unit]; //increment currency into customer_change
        cid_amount -= global_currency[cid_unit]; //decrease money in cid
        change -= global_currency[cid_unit]; //decrease change based on currency
        change = change.toFixed(2);
      }
      if (current_change[1] > 0) //add current change if cid is used
      {
        change_amount.push(current_change);
      }
    }
    if (change == 0.00) //if customer change is properly decreased
    {
      output.status = "OPEN";
      output.change = change_amount;
    }
    else //if there is still customer's change but the required change is not enough or too big in cid
    {
      output.status = "INSUFFICIENT_FUNDS";
      output.change = [];
    }
  }
  return output;
}
