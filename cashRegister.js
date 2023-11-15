function checkCashRegister(price, cash, cid) {
    const currencyUnit = {
      "PENNY": 0.01,
      "NICKEL": 0.05,
      "DIME": 0.1,
      "QUARTER": 0.25,
      "ONE": 1,
      "FIVE": 5,
      "TEN": 10,
      "TWENTY": 20,
      "ONE HUNDRED": 100
    };
    // Calculate the change due
    let changeDue = cash - price;

    // Calculate the total cash-in-drawer
    let totalCID = 0;
    for (let i = 0; i < cid.length; i++) {
      totalCID += cid[i][1];
    }
    
    // Format the totalCID to handle floating-point precision
    totalCID = totalCID.toFixed(2);
  
    // Check if there is insufficient funds in the cash-in-drawer
    if (Number(totalCID) < changeDue) {
      return { status: "INSUFFICIENT_FUNDS", change: [] };
    } else if (Number(totalCID) === changeDue) {
    // Check if the cash-in-drawer equals the change due
      return { status: "CLOSED", change: cid };
    } else {
    // Calculate the change using available denominations
      let change = [];
      for (let i = cid.length - 1; i >= 0; i--) {
        const currentCurrency = currencyUnit[cid[i][0]];
        const maxToReturn = Math.floor(cid[i][1] / currentCurrency);
        let returned = 0;
        
        // Return the maximum possible amount of current currency
        while (changeDue >= currentCurrency && returned < maxToReturn) {
          changeDue -= currentCurrency;
          changeDue = changeDue.toFixed(2);
          returned++;
        }
        // If any amount of current currency is returned, add it to the change array
        if (returned > 0) {
          change.push([cid[i][0], returned * currentCurrency]);
        }
      }
      // Check if there is still change due
      if (Number(changeDue) > 0) {
        return { status: "INSUFFICIENT_FUNDS", change: [] };
      } else {
        return { status: "OPEN", change: change };
      }
    }
  }
  
  // Test cases
  console.log(checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]));
  console.log(checkCashRegister(3.26, 100, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]));
  console.log(checkCashRegister(19.5, 20, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]));
  console.log(checkCashRegister(19.5, 20, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 1], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]));
  console.log(checkCashRegister(19.5, 20, [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]));