const dynamic_grid = require("express").Router();
const { executeQuery } = require('../../database_functions/executeQuery');
var recordsPerPage=10;
var totalPages,currentPage,offset;
var ordertype='';

dynamic_grid.get("/dashboard/task-7/display",async (req, res) => {
  ordertype='';
  if(req.query['query']=='' || req.query['query']==null || req.query['query']==undefined || req.query['database']==undefined || req.query['database']==null || req.query['database']=='')
  {
      res.render('./task-7/html/display',{error:"Please Enter Query in Text Box and Enter Database Name!",query:'',database:''});
  }
  else
  {
      
      let result = await executeQuery(req.query['database'],req.query['query']);
      //Calculate Pages=============================================================================================

      if(result.length<recordsPerPage)
      {
          totalPages=1;
      }
      else
      {
          var totalRecords = result.length;
          totalPages=Math.ceil(totalRecords/recordsPerPage);
      }

      //Fetch Current Page==========================================================================================

      if(req.query['page']=='' || req.query['page']==null || req.query['page']==undefined)
      {
          currentPage=1;
          offset=0;
      }
      else
      {
          currentPage=req.query['page'];
          offset=(Number(currentPage) * recordsPerPage) - recordsPerPage;
      }
    
      //Render Data==================================================================================================

      
      if(result=="database"){
          res.render('./task-7/html/display',{error:"Opps Some Error in Database Connection!",query:'',database:'',ordertype:''});
      }

      else if(result==false){
          res.render('./task-7/html/display',{error:"Opps Some Error in Fetching Data from Table!",query:'',database:'',ordertype:''});
      }

      else if(totalPages < currentPage || currentPage < 1)
      {
          res.render('./task-7/html/display',{error:"Opps Some Error occured",query:'',database:'',ordertype:''});
      }

      else{
          if(req.query['clicked'])
          {
              // console.log(result.slice(0,10));
              result = result.slice(offset,currentPage*recordsPerPage);
              res.render('./task-7/html/display',{keys:result[0],results:result,page:currentPage,error:'',query:req.query['query'],lastpage:totalPages,database:req.query['database'],ordertype:ordertype})
          }
          else
          { 
              const sort = (data, key, type) => {
                  for(let i=0; i<data.length; i++)
                  {
                      for(let j=0; j<data.length-1; j++)
                      {
                          if(data[j][key] > data[j+1][key] && type=='ASC')
                          {
                              temp = data[j];
                              data[j] = data[j+1];
                              data[j+1] = temp;
                          }
                          if(data[j][key] < data[j+1][key] && type=='DESC')
                          {
                              temp = data[j];
                              data[j] = data[j+1];
                              data[j+1] = temp;
                          }
                      }
                  }
                  return data;
              }
              result = sort(result,req.query['orderby'],req.query['ordertype'])
              result = result.slice(offset,currentPage*recordsPerPage);
              res.render('./task-7/html/display',{keys:result[0],results:result,page:currentPage,error:'',query:req.query['query'],lastpage:totalPages,database:req.query['database'],ordertype:ordertype,orderby:req.query['orderby']})
            }
      }
  }
});



module.exports = dynamic_grid;