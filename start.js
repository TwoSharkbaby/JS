var users = [
  { id: 1, name: "ID", age: 36 },
  { id: 2, name: "BJ", age: 32 },
  { id: 3, name: "JM", age: 32 },
  { id: 4, name: "PJ", age: 27 },
  { id: 5, name: "HA", age: 25 },
  { id: 6, name: "JE", age: 26 },
  { id: 7, name: "JI", age: 31 },
  { id: 8, name: "MP", age: 23 },
];

function _filter(list, predi) {
  var new_list = [];
  _each(list, function (val) {
    if (predi(val)) new_list.push(val);
  });
  return new_list;
}

// console.log(
//   _filter(users, function(user) { return user.age >= 30;})
// );

function _map(list, mapper) {
  var new_list = [];
  _each(list, function (val) {
    new_list.push(mapper(val));
  });
  return new_list;
}

// console.log(
//   _map(users, function(user) { return user.name;})
// );

// console.log(
//   _map(
//     _filter(users, function(user) { return user.age >= 30;}),
//     function(user) { return user.name; }
//   )
// );

function _each(list, iter) {
  for (var i = 0; i < list.length; i++) {
    iter(list[i]);
  }
  return list;
}

function _curry(fn) {
  return function (a, b) {
    return arguments.length == 2
      ? fn(a, b)
      : function (b) {
          return fn(a, b);
        };
  };
}

var add = _curry(function (a, b) {
  return a + b;
});

// console.log(add(10)(10));
// console.log(add(10, 20));

function _curryr(fn) {
  return function (a, b) {
    return arguments.length == 2
      ? fn(a, b)
      : function (b) {
          return fn(b, a);
        };
  };
}

var sub = _curryr(function (a, b) {
  return a - b;
});

// console.log(sub(10, 5));
// console.log(sub(10)(5));

var _get = _curryr(function (obj, key) {
  return obj == null ? undefined : obj[key];
});

// console.log(_get(users[0], "name"));
// console.log(_get(users[10], "name"));

// console.log(_get("name")(users[0]));
// console.log(_get("name")(users[10]));

// console.log(
//   _map(
//     _filter(users, function(user) { return user.age >= 30;}),
//     _get("name")
//   )
// );

function add(a, b) {
  return a + b;
}

var slice = Array.prototype.slice;
function _rest(list, num) {
  return slice.call(list, num || 1);
}

function _reduce(list, iter, memo) {
  if (arguments.length == 2) {
    memo = list[0];
    list = _rest(list);
  }
  _each(list, function (val) {
    memo = iter(memo, val);
  });
  return memo;
}

// console.log(
//   _reduce([1,2,3], add, 0)
// );
// console.log(
//   _reduce([1,2,3], add)
// );

function _pipe() {
  var fns = arguments;
  return function (arg) {
    return _reduce(
      fns,
      function (arg, fn) {
        return fn(arg);
      },
      arg
    );
  };
}

var f1 = _pipe(
  function (a) {
    return a + 1;
  },
  function (a) {
    return a * 2;
  },
  function (a) {
    return a * a;
  }
);

// console.log(f1(1));

function _go(arg) {
  var fns = _rest(arguments);
  return _pipe.apply(null, fns)(arg);
}

// _go(
//   1,
//   function (a) {
//     return a + 1;
//   },
//   function (a) {
//     return a * 2;
//   },
//   function (a) {
//     return a * a;
//   },
//   console.log
// );

// console.log(
//   _map(
//     _filter(users, function (user) {
//       return user.age >= 30;
//     }),
//     _get("name")
//   )
// );

_go(
  users,
  function (users) {
    return _filter(users, function (user) {
      return user.age >= 30;
    });
  },
  function (users) {
    return _map(users, _get("name"));
  },
  console.log
);

var _map = _curryr(_map),
  _filter = _curryr(_filter);

_go(
  users,
  _filter(function (user) {
    return user.age >= 30;
  }),
  _map(_get("name")),
  console.log
);

_go(
  users,
  _filter((user) => user.age >= 30),
  _map(_get("name")),
  console.log
);
