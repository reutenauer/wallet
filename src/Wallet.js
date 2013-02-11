function Wallet() {
  /* Face value of the coins we consider, in pence and in decreasing
   * order.  The text of the assignment seems to omit 10p and 5p coins,
   * which is reproduced in the array below.  It is straightforward to
   * change it if desired.
   */
  this.denominations = [200, 100, 50, 20, 2, 1];
}

Wallet.prototype.pick = function(amountAsString) {
  var amount = Wallet.normalise(amountAsString);
  if(amount == NaN) return undefined;

  /* The array containing the set of coins that make the desired sum.
   * We initialise here so as to have a clean one after here run of
   * pick().
   */
  this.set = new Array();

  /* Main routine.  We loop over the array of admissible denominations,
   * highest value first, picking as many as we can each time: that’s
   * the Euclidean division.
   *
   * This may not yield the smallest set each time, by I haven’t been
   * able to find a counterexample – AR, 2013-01-10.
   */
  var l = this.denominations.length;
  for(var i = 0; i < l; i++) {
    var coin = this.denominations[i];
    var quotient = Math.floor(amount / coin);
    if(quotient > 0)
    {
      this.set[coin] = quotient;
      amount -= quotient * coin;
    }
  }
}

Wallet.penceFromPounds = function(pence) {
  /* Usual round function: fractional parts in the range [0, 1/2[ are
   * rounded down, the ones in the range [1/2, 1[ are rounded up.  In
   * orders words, we round down if and only if the first digit is
   * between 0 and 4; and in particular, 0.5 is rounded up to 1.
   */
  return Math.floor(pence * 100 + 0.5);
}

Wallet.normalise = function(input) {
  // TODO trim from whitespace

  /* Parsing the input
   * The conventions for analysing the input string can be construed as
   * follows:
   * A valid input consists of either:
   *   a. A pound sign (£), a number represented in base 10, with or
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
    return Wallet.penceFromPounds(match[1]);
  } else if(match = /^(\d*\.\d*)p?$/.exec(input)) {
    return Wallet.penceFromPounds(match[1]);
  }
  else if(match = /^(\d+)p?$/.exec(input)) {
    return Math.floor(match[1]);
  } else {
    return NaN;
  }
}

/* Format the name of the coin.  The input is a number of pence, and the
 * output is is "xxp" or "£y".
 */
Wallet.format = function(pence) {
  if(pence >= 100) return "£" + Math.floor(pence / 100);
  else return Math.floor(pence) + "p";
}
