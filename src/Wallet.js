function Wallet() {
  /* The text of the assignment seems to omit 10p and 5p coins, which is
   * reproduced in the array below.  It is straightforward to change it
   * if desired.
   */
  this.coins = [200, 100, 20, 2, 1];
}

Wallet.prototype.pick = function(input) {
  var sum = Wallet.normalise(input);

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
  var l = this.coins.length;
  for(var i = 0; i < l; i++) {
    var coin = this.coins[i];
    var quotient = Math.floor(sum / coin);
    if(quotient > 0)
    {
      this.set[coin] = quotient;
      sum -= quotient * coin;
    }
  }
}

// TODO Display (100 as £1, etc.).  Should ignore undefined’s AND zeros.

Wallet.penceFromPounds = function(pence) {
  // Usual round function
  return Math.floor(pence * 100 + 0.5);
}

Wallet.normalise = function(input) {
  // TODO trim from whitespace
  // We run two tests: first we test whether the first character is a
  // pound sign, then if the string contains a dot.
  // Hence 2.7 is actually more than 27 (£2.7 > 27p) !!! TODO check!

  /* Parsing the input
   * The conventions for analysing the input string can be construed as
   * follows:
   * 1. A valid input contains an optional pound sign (£), a decimal number
   * with or without a decimal dot, and an optional pence sign (p).
   * All other input is invalid.
   * 2. The input is interpreted in three different ways:
   *   a. If it starts with a pound sign, it’s an amount in pounds.
   *   b. If it contains a dot, it’s also expressed in pounds.
   *   c. If it contains neither a pound nor a dot, it’s an amount in pence.
   *
   * The three regular expressions below capture these rules (plus the
   * meaningless string consisting of a single dot, ".", see below).
   *
   * It should be noted that the code accepts inputs which are not
   * explicited allowed by the rules, such as "2.7", where the
   * fractional part contains a single digit, but there doesn’t seem to
   * be any reason to reject such an input, and its interpretation is
   * straightforward.
   */
  if(match = /^£(\d*\.?\d*)p?$/.exec(input)) {
    return Wallet.penceFromPounds(match[1]);
  } else if(match = /^(\d*\.\d*)p?$/.exec(input)) {
    // This expression matches ".", which is invalid.
    if(input === '.') { return 0; }
    else return Wallet.penceFromPounds(match[1]);
  }
  else if(match = /^(\d+)p?$/.exec(input)) {
    return Math.floor(match[1]);
  } else {
    return 0;
  }
}

Wallet.format = function(pence) {
  if(pence >= 100) return "£" + Math.floor(pence / 100);
  else return Math.floor(pence) + "p";
}
