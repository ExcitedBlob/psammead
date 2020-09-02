import moment from 'moment';
import './ha';

moment.locale('ha');

// This asset overrides the gunit assertion done in the moment codebase.
// Format and styling of this file has been keep consistent with the official moment tests.
// An example of these tests can be seen at https://github.com/moment/moment/blob/develop/src/test/locale/en-gb.js
const assert = { equal: (val1, val2) => expect(val1).toEqual(val2) };

test('format', function () {
  var a = [
      ['LL', '14 Fabrairu 2010'],
      ['D MMMM YYYY', '14 Fabrairu 2010'],
    ],
    b = moment(new Date(2010, 1, 14, 15, 25, 50, 125)),
    i;
  for (i = 0; i < a.length; i++) {
    assert.equal(b.format(a[i][0]), a[i][1], a[i][0] + ' ---> ' + a[i][1]);
  }
});

test('from', function () {
  var start = moment([2007, 1, 28]);

  assert.equal(
    start.from(moment([2007, 1, 28]).add({ s: 45 }), true),
    'Minti 1 da ta',
    '45 seconds = a minute'
  );
  assert.equal(
    start.from(moment([2007, 1, 28]).add({ s: 89 }), true),
    'Minti 1 da ta',
    '89 seconds = a minute'
  );
  assert.equal(
    start.from(moment([2007, 1, 28]).add({ s: 90 }), true),
    'Mintuna 2 da suka',
    '90 seconds = 2 minutes'
  );
  assert.equal(
    start.from(moment([2007, 1, 28]).add({ m: 44 }), true),
    'Mintuna 44 da suka',
    '44 minutes = 44 minutes'
  );
  assert.equal(
    start.from(moment([2007, 1, 28]).add({ m: 45 }), true),
    "Sa'a 1 da ta",
    '45 minutes = an hour'
  );
  assert.equal(
    start.from(moment([2007, 1, 28]).add({ m: 89 }), true),
    "Sa'a 1 da ta",
    '89 minutes = an hour'
  );
  assert.equal(
    start.from(moment([2007, 1, 28]).add({ m: 90 }), true),
    "Sa'o'i 2 da suka",
    '90 minutes = 2 hours'
  );
  assert.equal(
    start.from(moment([2007, 1, 28]).add({ h: 5 }), true),
    "Sa'o'i 5 da suka",
    '5 hours = 5 hours'
  );
  assert.equal(
    start.from(moment([2007, 1, 28]).add({ h: 21 }), true),
    "Sa'o'i 21 da suka",
    '21 hours = 21 hours'
  );
});

test('suffix', function () {
  assert.equal(moment(0).from(50000), 'Minti 1 da ta wuce', 'suffix');
});
