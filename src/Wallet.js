function Wallet() {
  /* Face value of the coins we consider, in pence and in decreasing
   * order.  The text of the assignment seems to omit 10p and 5p coins,
   * which is reproduced in the array below.  It is straightforward to
   * change it if desired.
   */
  this.denominations = [1, 2, 20, 50, 100, 200];
}

Wallet.prototype.pick = function(amountAsString) {
  var amount = Wallet.normalise(amountAsString);
  if(amount == NaN) return undefined;

  /* The array containing the set of coins that make up the desired sum.  We
   * initialise here so as to have a clean one after each run of pick().
   */
  this.set = new Array();

  /* Main routine.  We loop over the array of admissible denominations,
   * highest value first, picking as many as we can each time: that’s
   * the Euclidean division.
   *
   * This may not yield the smallest set each time, by I haven’t been
   * able to find a counterexample – AR, 2013-01-10.
   */

  this.set = Wallet.recurse(amount, this.denominations.slice()).slice();
}

Wallet.countCoins = function(set) {
  var numCoins = 0;
  for(coin in set) {
    numCoins += set[coin];
  }

  return numCoins;
}

Wallet.recurse = function(amount, denoms) {
  /*
  console.log(amount);
  console.log(denoms);
  */

  var x;
  while((x = denoms.pop()) > amount);

  var q = Math.floor(amount / x);
  if(denoms.length == 0 || amount % x == 0) {
    var result = [];
    result[x] = q;
    /*
    console.log("Returning:");
    console.log(result);
    */
    if(x == 20 && q == 3) console.log("Returning the right result");
    return result;
  }

  var candidate;

  for(var i = 0; i <= q; i++) {
    var set = Wallet.recurse(amount - i * x, denoms.slice());
    if(set[20] == 3 && Wallet.countCoins(set) == 3) console.log("Got the right result.  x = " + x + " and i = " + i);
    if(x > 0) set[x] = q;
    if(Wallet.countCoins(candidate) == 0 || (Wallet.countCoins(candidate) > Wallet.countCoins(set))) candidate = set;
  }

  return candidate;
}

// TODO: Refactor that to make calls in normalise() more rational.
Wallet.penceFromString = function(poundString) {
  /* Usual round function: fractional parts in the range [0, 1/2[ are
   * rounded down, the ones in the range [1/2, 1[ are rounded up.  In
   * orders words, we round down if and only if the first digit is
   * between 0 and 4; and in particular, 0.5 is rounded up to 1.
   */
  if(poundString == "") return undefined;
  else return Math.floor(poundString * 100 + 0.5);
}

Wallet.normalise = function(input) {
  // TODO trim from whitespace

  /* Parsing the input
   * The conventions for analysing the input string can be construed as
   * follows:
   * A valid input consists of either:
   *   a. A pound sign (£), a number represented in base 10 with or
   *   without a decimal dot, and an optional penny sign (p).  In this
   *   case, it represents an amount in pounds.
   *   b. A number in base 10 containing a mandatory decimal dot,
   *   optionally followed by a penny sign.  It’s also an amount in
   *   pounds in that case.
   *   c. A number in base 10 with no decimal dot, followed by an
   *   optional penny sign.
   * All other input is invalid.
   *
   * The three regular expressions below capture these rules.
   *
   * It should be noted that the code abstracts slightly from the
   * conventions laid out, and has a small potential for confusion.  For
   * instance, a string such as "3.", although visually very close to
   * "3", means something different ("three pounds" for the former,
   * "three pence" for the latter).  This behaviour may need to be
   * clarified for a smoother user interface.
   */
  if(match = /^£(\d*\.?\d*)p?$/.exec(input)) {
    var pounds = match[1];
    if(pounds === ".") return undefined;
    else return Wallet.penceFromString(pounds);
  } else if(match = /^(\d*\.\d*)p?$/.exec(input)) {
    var pounds = match[1];
    if(pounds === ".") return undefined;
    else return Wallet.penceFromString(pounds);
  }
  else if(match = /^(\d+)p?$/.exec(input)) {
    return Math.floor(match[1]);
  } else {
    return undefined;
  }
}

/* Format the name of the coin.  The input is a number of pence, and the
 * output is of the form "xxp" or "£y".
 */
Wallet.format = function(pence) {
  if(pence >= 100) return "£" + Math.floor(pence / 100);
  else return Math.floor(pence) + "p";
}
