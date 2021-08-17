function previewEngine(){

  this.engine = [];
  //var k = [{fileId: "12345", data: {g: "grem"} }]


}

previewEngine.prototype.register = function(p){

  var token = makeid(10);
  this.engine.push({
    name: p.name,
    scriptUrl: p.scriptUrl,
    id: token,
    admin: p.admin
  });

var permitted = [];
  var req = ary.map(p.permissions,
  function(e){




      permission.request({
        of: e.el,
        for: [
          {
            name: p.name
          },
          {
            id: "1234567"
          }
        ],
        onPermit: function(e){

        }
      });


  });



}

var previewEngine = new previewEngine();
var dialogBox = new dialog();


var permitted = [];


// $(".tools").click(function(){
//   previewEngine.register({
//       name: "Atom",
//       scriptUrl: "g",
//       admin: "golzen",
//       permissions: ["editor", "files"]})
// })
