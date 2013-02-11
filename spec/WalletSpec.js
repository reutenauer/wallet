describe("Wallet", function() {
  var wallet = new Wallet();

  describe("pick()", function() {
    var tests = [
      { "value" : 123, "set" : { 100 : 1, 20 : 1, 2 : 1, 1 : 1 } },
      { "value" : 323, "set" : { 200 : 1, 100 : 1, 20 : 1, 2 : 1, 1 : 1 } },
      // This tests that the set doesn’t contain garbage
      { "value" : 123, "set" : { 100 : 1, 20 : 1, 2 : 1, 1 : 1 } }]

    it("computes the sets of coins correctly", function() {
      var l = tests.length;

      for(var i = 0; i < l; i++) {
        var test = tests[i]
        wallet.pick(test.value);
        expect(wallet.set).toEqual(test.set);
      }
    });
  });

  describe("normalise()", function() {
    tests = [{ "input" : "4", "output" : 4 },
      { "input" : "85", "output" : 85 },
      { "input" : "197p", "output" : 197 },
      { "input" : "2p", "output" : 2 },
      { "input" : "1.87", "output" : 187 },
      { "input" : "£1.23", "output" : 123 },
      { "input" : "£2", "output" : 200 },
      { "input" : "£10", "output" : 1000 },
      { "input" : "£1.87p", "output" : 187 },
      { "input" : "£1p", "output" : 100 },
      { "input" : "£1.p", "output" : 100 },
      { "input" : "001.41p", "output" : 141 },
      { "input" : "4.235p", "output" : 424 },
      { "input" : "£1.257422457p", "output" : 126 },
      { "input" : "", "output" : undefined },
      { "input" : "1x", "output" : undefined },
      { "input" : "£1x.0p", "output" : undefined },
      { "input" : "£p", "output" : undefined },
      { "input" : "£.p", "output" : undefined },
      { "input" : ".", "output" : undefined }]


    it("returns an integral number of pence", function() {
      var l = tests.length;

      for(var i = 0; i < l; i++) {
        var test = tests[i];
        expect(Wallet.normalise(test.input)).toBe(test.output); // not toEqual.
      }
    });
  });

  describe("format()", function() {
    it("formats “100” sa £1", function() {
      expect(Wallet.format(100)).toEqual("£1");
    });
  });
});
