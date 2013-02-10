Controller = function() {
}

Controller.input = function() {
  var wallet = new Wallet();
  wallet.pick($("#input").val());

  var res = "Pick from your wallet: ";
  var max = wallet.set.length;
  var min = -1;
  for(var m in wallet.set) {
    min = m;
    break;
  }

  for(var pence in wallet.set.reverse()) {
    var num = wallet.set[pence];
    if(num > 0)
      res += Wallet.format(max - 1 - pence) + ": " + num;
      if(max - 1 - pence != min) res += ", ";
  }

  $("#result").html(res);
}
