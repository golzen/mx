function work(){

  this.funs = [];

  this.canEngineRun = true;

  this.index = 0;

}

work.prototype.push = function(array){
    this.funs.push(array);
};

work.prototype.start = function(speed)
{
  var i = this.index;

  if(this.canEngineRun){






      console.log(this.funs.length+" "+this.funs.length);
      if(this.index != this.funs.length){

        var wf = this.funs;
        var i = this.index;
        if(wf.length > 0){



          if (typeof wf[i] === 'function') {

            wf[i]();

          }





      }
}






  }
}

work.prototype.reset = function(){
  this.index = 0;
}
work.prototype.stop = function(){
  this.canEngineRun = false;
}
work.prototype.nxt = function(){

    this.index = this.index+1;
  this.start();

}

var work = new work();
