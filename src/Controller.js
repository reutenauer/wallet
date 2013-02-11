Controller = function() {
}

Controller.handleInput = function() {
  var wallet = new Wallet();
  wallet.pick($("#input").val());

  if(!wallet.set || wallet.set.length == 0)
  {
    $("#result").html("Input invalid.");
    return;
  }

  /* wallet.set is an array, and we need both its minimum and its
   * maximum index.
   */
  var maxIndex = wallet.set.length - 1; /* As indexes start at zero ... */
  var minIndex = -1;
  for(var m in wallet.set) { /* FIXME loop ugly */
    minIndex = m;
    break;
  }

  /* The string to be displayed to the user. */

  var res = "Pick from your wallet: ";
  /* The purpose of this admittedly odd loop is to display the higher
   * denomination first.  In order to do that we reverse the array; but now we
   * also need to find the index of each value in the original array.
   * For example, the array for 9p = 2 * 2p + 1 * 5p would be [0, 0, 2, 0, 0, 1],
   * and in the reversed array ([1, 0, 0, etc.]), the 5p coin now gets index 0,
   * the 2p coin index 3.  We call the index in the reversed array antiIndex,
   * and by computing maxIndex - antiIndex, we get the denomination of each
   * coin.
   */
  for(var antiIndex in wallet.set.reverse()) {
    var pence = maxIndex - antiIndex;
    var numCoins = wallet.set[antiIndex];
    if(numCoins && numCoins > 0) /* Catch undefined et al. */
      res += Wallet.format(pence) + ": " + numCoins + " coin";
      if(numCoins > 1) res += "s"; /* plural */
      if(pence == minIndex) res += "." /* Full stop for the last item, */
      else res += ", "; /* otherwise a comma. */
  }

  $("#result").html(res);
}
