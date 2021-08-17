function work(){

  this.funs = [];

  this.canEngineRun = true;

  this.index = 0;

  this.firstLoad = false;
  this.firstLoaded = false;
  this.para = "";
}

work.prototype.push = function(array){
    this.funs.push(array);
};

work.prototype.start = function(p)
{
  var i = this.index;

  if(!this.firstLoaded){
  if(this.index == 0){

      this.firstLoad = true;
    }
  }
  if(this.canEngineRun){

if(this.para == ""){
  this.para = p;
}







      if(this.index != this.funs.length){

        var wf = this.funs;
        var i = this.index;
        if(wf.length > 0){



          if (typeof wf[i] === 'function') {

            wf[i]();


          }
          var perc = (this.index/wf.length)*100;
          try
          {
              p.onProgress(perc);
          }
          catch(e){

          }


          try
          {
            if(perc == 100)
            {
              p.onDone(perc);
            }
          }
          catch(e){

          }






      }
}else {


    var perc = 100;

    try
    {
        p.onProgress(perc);
    }
    catch(e){

    }


    try
    {
      if(perc == 100)
      {
        p.onDone(perc);
      }
    }
    catch(e){

    }

}






  }
}
work.prototype.do = function(i, p){


    this.index = i;
    if(this.para == ""){

      this.para = p;
    }



    this.start(p);


}
work.prototype.reset = function(){
  this.index = 0;
}
work.prototype.stop = function(){
  this.canEngineRun = false;
}
work.prototype.nxt = function(){


    this.index = this.index+1;
  this.start(this.para);

}
