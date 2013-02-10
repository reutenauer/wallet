Controller = function() {
}

Controller.input = function() {
  // alert('foo');
  // console.log($("#input").attr("value"));
  var wallet = new Wallet();
  wallet.pick($("#input").val());
  // console.log(wallet.set);

  var res = "Pick from your wallet: ";
  var max = wallet.set.length;
  var min = -1;
  for(var m in wallet.set) {
    min = m;
    break;
  }

  for(var pence in wallet.set.reverse()) {
    var num = wallet.set[pence];
    // console.log(pence, num);
    if(num > 0)
      res += Wallet.format(max - 1 - pence) + ": " + num;
      if(max - 1 - pence != min) res += ", ";
  }

  // res = "<p>" + res + "</p>";

  $("#result").html(res);
}
