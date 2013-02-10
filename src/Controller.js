Controller = function() {
}

Controller.input = function() {
  // alert('foo');
  // console.log($("#input").attr("value"));
  var wallet = new Wallet();
  wallet.pick($("#input").val());
  // console.log(wallet.set);

  var res = "Pick from your wallet: ";
  for(var pence in wallet.set) {
    var num = wallet.set[pence];
    // console.log(pence, num);
    if(num > 0)
      res += num + " " + pence + "-pence coin(s), ";
  }

  // res = "<p>" + res + "</p>";

  $("#result").html(res);
}
