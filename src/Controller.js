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

  var res = "Pick from your wallet: ";
  /* The purpose of this admittedly odd loop is to display the higher
   * denomination first: the array for 9p = 1 * 5p + 2 * 2p would be
   * [0, 0, 2, 0, 0, 1], hence we need to reverse the array, and to
   * flip the index to get the denomination in that new array (the 5p
   * coin now gets index 0, and 2p index 3, hence by computing 5 -
   * antiIndex, we get the denomination).
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
