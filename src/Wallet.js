function Wallet() {
  this.coins = [200, 100, 20, 2, 1];
}

Wallet.prototype.pick = function(input) {
  var sum = Wallet.normalise(input);

  var l = this.coins.length;

  this.set = new Array();

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
// TODO From Tess: display in decreasing order, display 200p as £2, the s’s.

Wallet.penceFromPounds = function(pence) {
  // Usual round function
  return Math.floor(pence * 100 + 0.5);
}

Wallet.normalise = function(input) {
  // TODO trim from whitespace
  // We run two tests: first we test whether the first character is a
  // pound sign, then if the string contains a dot.
  // Hence 2.7 is actually more than 27 (£2.7 > 27p) !!! TODO check!
  if(match = /^£(\d*\.?\d*)p?$/.exec(input)) {
    return Wallet.penceFromPounds(match[1]);
  } else if(match = /^(\d*\.\d*)p?$/.exec(input)) {
    if(input === '.') { return 0; } // FIXME blaah
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
