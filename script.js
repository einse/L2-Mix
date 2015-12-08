var app = angular.module('myApp', []);

app.controller('myCtrl', function($scope) {
  
  $scope.raw2pure = function (string) {
    var pure = '';
    var char;
    var char_code;
    for (var i = 0; i < string.length; i++)
    {
      char_code = string.charCodeAt(i);
      if (((char_code >= 97) && (char_code <= 122)) || ((char_code >= 1072) && (char_code <= 1103)))
        pure += string[i];
    }
    return pure;
  }
  
  $scope.raw2pure2 = function (string) {
    var pure = '';
    var char;
    var char_code;
    for (var i = 0; i < string.length; i++)
    {
      char_code = string.charCodeAt(i);
      if (((char_code >= 97) && (char_code <= 122)) || ((char_code >= 1072) && (char_code <= 1103)) || (char_code == 95))
        pure += string[i];
    }
    return pure;
  }
  
  $scope.pure2separated = function (pure) {
    var separated = [];
    var cntr = 0;
    var tmp = '';
    for (var i = 0; i < pure.length; i++)
    {
      if (cntr < 15)
      {
        tmp += pure[i];
      }
      cntr++;
      if (cntr >= 15)
      {
        separated.push(tmp);
        tmp = '';
        cntr = 0;
      }
    }
    if (tmp != '')
    {
      if (tmp.length < 15)
      {
        var len = tmp.length;
        var fat = '';
        fat += tmp;
        while (len < 15)
        {
          fat += '_';
          len++;        
        }
      }
      separated.push(fat);
    }
    return separated;
  }
  
  $scope.e = function (msg) {
    var code = [];
    var cypher = [1,8,0,7,14,6,13,5,12,4,11,3,10,2,9];
    for (var i = 0; i < msg.length; i++)
    {
      var block = msg[i];
      var buffer = "";
      for (var j = 0; j < 15; j++)
      {
        buffer += block[cypher[j]];
      }
      code.push(buffer);
    }
    return code;
  }
  
  $scope.d = function (code) {
    var msg = [];
    var decypher = [2,0,13,11,9,7,5,3,1,14,12,10,8,6,4];
    for (var i = 0; i < code.length; i++)
    {
      var block = code[i];
      var buffer = "";
      for (var j = 0; j < 15; j++)
      {
        buffer += block[decypher[j]];
      }
      msg.push(buffer);
    }
    return msg;
  }
  
  $scope.friendly2separated = function (friendly) {
    var separated = [];
    var tmp;
    var fat = '';
    var len;
    for (var i = 0; i < friendly.length; i++)
    {
      tmp = friendly[i].toString(2);
      len = tmp.length;
      while (len < 5)
      {
        fat += '0';
        len++;
      }
      fat += tmp;
      separated.push(fat);
      fat = '';
    }
    return separated;
  }
  
  $scope.separated2pure = function (separated) {
    var pure = '';
    for (var i = 0; i < separated.length; i++)
    {
      pure += separated[i];
    }
    return pure;
  }
  
  $scope.decode = function (string) {
    return $scope.d($scope.pure2separated($scope.raw2pure2(string)));
  }
  
  $scope.copyAndPaste = function () {
    $scope.testInput = $scope.pureOutput;
  }
  
  $scope.example1 = function () {
    $scope.rawInput = "съешь еще немного этих мягких французских булочек да выпей же чаю";
  }
  
  $scope.example2 = function () {
    $scope.rawInput = "the quick brown fox jumps over the lazy dog";
  }
});
