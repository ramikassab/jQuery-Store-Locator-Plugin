(function($) {
  /*
    ======== A Handy Little QUnit Reference ========
    http://api.qunitjs.com/

    Test methods:
      module(name, {[setup][ ,teardown]})
      test(name, callback)
      expect(numberOfAssertions)
      stop(increment)
      start(decrement)
    Test assertions:
      ok(value, [message])
      equal(actual, expected, [message])
      notEqual(actual, expected, [message])
      deepEqual(actual, expected, [message])
      notDeepEqual(actual, expected, [message])
      strictEqual(actual, expected, [message])
      notStrictEqual(actual, expected, [message])
      throws(block, [expected], [message])
  */

  module('storeLocator', {
    // This will run before each test in this module.
    setup: function() {
      this.elems = $('#qunit-fixture').children();
    }
  });

  test('is chainable', function() {
    expect(1);
    // Not a bad test to run on collection methods.
    strictEqual(this.elems.storeLocator(), this.elems, 'Should be chainable');
  });


	module('Independent methods', {
    // This will run before each test in this module.
    setup: function() {
      $('#map-container').storeLocator();
    },

		teardown: function() {
			$('#map-container').data('plugin_storeLocator').destroy();
		}
  });

	/**
	 * Distance calculations
	 */
	test('geoCodeCalcToRadian()', function() {
		var $this = $('#map-container').data('plugin_storeLocator');
		var radiansPerDegree = Math.PI / 180;

		deepEqual($this.geoCodeCalcToRadian(0), 0, "Zero test");
		deepEqual($this.geoCodeCalcToRadian(10), 10 * radiansPerDegree, "Integer test");
		deepEqual($this.geoCodeCalcToRadian(10.10), 10.10 * radiansPerDegree, "Float test");
	});

	test('geoCodeCalcDiffRadian()', function() {
		var $this = $('#map-container').data('plugin_storeLocator');
		
		deepEqual($this.geoCodeCalcDiffRadian(10, 5), ($this.geoCodeCalcToRadian(5) - $this.geoCodeCalcToRadian(10)), "Integer test");
		deepEqual($this.geoCodeCalcDiffRadian(10.10, 5.5), ($this.geoCodeCalcToRadian(5.5) - $this.geoCodeCalcToRadian(10.10)), "Float test");
	});

	/**
	 * Query string
	 *
	 * URL needs to be set to /test/storeLocator.html?bh-sl-address=test for this to pass
	 */
	test('getQueryString()', function() {
		var $this = $('#map-container').data('plugin_storeLocator');

		deepEqual($this.getQueryString(), undefined, "Empty test");
		deepEqual($this.getQueryString('bh-sl-address'), 'test', "String test");
	});

}(jQuery));
