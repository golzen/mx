function gate(){



}

gate.prototype.get = function(p)
{
  $.ajax({
       type: 'POST',
       url: p.url,

       data: p.data,
     beforeSend: function(XMLHttpRequest)
       {


       },
       success: function(readed){

         var response = readed;
         console.log(readed);
         p.ondone(readed);
     },


 });
}
gate.prototype.read = function(p)
{
  this.get(p);
}
var gate = new gate();
