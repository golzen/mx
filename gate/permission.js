function permission(){

  this.permitted = [];
  this.length = [];

}

permission.prototype.request = function(p){


    var key;

    var permitted = this.permitted;
    var t = this;




    const data = [
      {
        typ: "editor",
        data: "all your codes"
      },
      {
        typ: "files",
        data: "all your project files."
      }
    ];


    var txt =
    ary.map(data, function(i){

      if(i.el.typ == p.of){

        dialogBox.show({
          title: "Permission Required",
          text: "<b>"+p.for[0].name+"</b> required your "+i.el.typ+" access. <br><br>By giving this permission, <underlined>"+p.for[0].name+" will able to access "+i.el.data+"</underlined>",
          btn: [
            {
              text: "Allow",
              click: function(k){
                p.onPermit(i.el.typ);




                var isAlreadyNotDefined = ary.map(t.permitted, function(e){


                  if(t.permitted.length > 0){



                    if(e.el.name == permitted[e.key].name){
                      key = e.key;
                      return false;
                    }

              }else{
                  key = 0;
              }

                });

                if(isAlreadyNotDefined == false){

                  t.permitted[key].array.push(i.el.typ);
                }else{

                  t.permitted[permitted.length] = {
                    name: p.for[0].name,
                    array: [i.el.typ]
                  };


                }
                console.log(permitted);
              }
            },
            {
              text: "Block",
              click: function(k){

              }
            }
          ]
        });
        return false;
      }
    });
}

var permission = new permission();
