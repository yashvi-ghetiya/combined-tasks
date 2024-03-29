const searching = require("express").Router();
var recordsPerPage=10;
var totalPages,currentPage,offset;
const { executeQuery  } = require('../../database_functions/executeQuery');
const { authentication,getUserId } = require("../../functions/authentication");

searching.get("/dashboard/task-8/display",async (req, res) => {
    if(authentication(req))
    {
        var userName = await executeQuery('combinedTask', `select firstname,lastname from users_task12 where id=${getUserId(req)} and status=1;`);
    if(req.query['iddetails']=='Show data')
    {
        if(req.query['database']==undefined || req.query['database']==null || req.query['database']=='')
        {
            res.render('./task-8/html/display',{ firstname:userName[0]['firstname'],lastname:userName[0]['lastname'] ,error:"Please Enter Ids in Text Box",query:'',database:'',more:0});
        }
        else
        {
            var arr = req.query['database'];
            var query = 'select * from student_master_task1 where sid in ('+arr+');';
            let result = await executeQuery('combinedTask',query);
           
           
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
                res.render('./task-8/html/display',{firstname:userName[0]['firstname'],lastname:userName[0]['lastname'],error:"Opps Some Error in Database Connection!",query:'',database:'',ordertype:'',more:2});
            }
    
            else if(result==false){
                res.render('./task-8/html/display',{firstname:userName[0]['firstname'],lastname:userName[0]['lastname'],error:"Opps Some Error in Fetching Data from Table!",query:'',database:'',ordertype:'',more:2});
            }
    
            else if(totalPages < currentPage || currentPage < 1)
            {
                res.render('./task-8/html/display',{firstname:userName[0]['firstname'],lastname:userName[0]['lastname'],error:"Opps Some Error occured",query:'',database:'',ordertype:'',more:2});
            }
    
            else{
                if(req.query['clicked'])
                {
                    
                    result = result.slice(offset,currentPage*recordsPerPage);
                    res.render('./task-8/html/display',{firstname:userName[0]['firstname'],lastname:userName[0]['lastname'],keys:result[0],results:result,page:currentPage,error:'',query:req.query['query'],lastpage:totalPages,database:req.query['database'],ordertype:'',more:0})
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
                    var orderby2='',ordertype2='';
                    if(req.query['orderby']!='' || req.query['ordertype']!='' || req.query['orderby']!=undefined || req.query['ordertype']!=undefined)
                    {
                        ordertype2=req.query['ordertype'];
                        orderby2=req.query['orderby'];
                    }
                    result = sort(result,req.query['orderby'],req.query['ordertype'])
                    result = result.slice(offset,currentPage*recordsPerPage);
                    res.render('./task-8/html/display',{firstname:userName[0]['firstname'],lastname:userName[0]['lastname'],keys:result[0],results:result,page:currentPage,error:'',query:req.query['query'],lastpage:totalPages,database:req.query['database'],ordertype:ordertype2,orderby:orderby2,more:0})
                }
                
    
            }
        }
    }

    else if(req.query['moredetails']=='Show data')
    {
        if(req.query['fname']==undefined || req.query['fname']==null || req.query['fname']=='')
        {
            if(req.query['lname']==undefined || req.query['lname']==null || req.query['lname']=='')
            {
                if(req.query['bgroup']==undefined || req.query['bgroup']==null || req.query['bgroup']=='')
                {
                    res.render('./task-8/html/display',{firstname:userName[0]['firstname'],lastname:userName[0]['lastname'],error:"Please Enter firstname,lastname and blood group in Text Box",query:'',database:'',more:2});
                }
            }
        }
        else
        {
            var query = 'select * from student_master_task1 where fname="'+req.query['fname']+'" '+req.query['op']+' lname="'+req.query['lname']+'" '+req.query['op']+' bgroup="'+req.query['bgroup']+'" ; ';
            let result = await executeQuery('combinedTask',query);
            if(result==undefined || result=='')
            {
                result="No data Found";
            }
           
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
                res.render('./task-8/html/display',{firstname:userName[0]['firstname'],lastname:userName[0]['lastname'],error:"Opps Some Error in Database Connection!",query:'',database:'',ordertype:'',more:2});
            }
    
            else if(result==false){
                res.render('./task-8/html/display',{firstname:userName[0]['firstname'],lastname:userName[0]['lastname'],error:"Opps Some Error in Fetching Data from Table!",query:'',database:'',ordertype:'',more:2});
            }
    
            else if(totalPages < currentPage || currentPage < 1)
            {
                res.render('./task-8/html/display',{firstname:userName[0]['firstname'],lastname:userName[0]['lastname'],error:"Opps Some Error occured",query:'',database:'',ordertype:'',more:2});
            }

            else if(typeof result == "string")
            {
                res.render('./task-8/html/display',{firstname:userName[0]['firstname'],lastname:userName[0]['lastname'],error:result,query:'',database:'',ordertype:'',more:2});
            }
    
            else{
                if(req.query['clicked'])
                {
                    
                    result = result.slice(offset,currentPage*recordsPerPage);
                    res.render('./task-8/html/display',{firstname:userName[0]['firstname'],lastname:userName[0]['lastname'],keys:result[0],results:result,page:currentPage,error:'',query:req.query['query'],lastpage:totalPages,database:req.query['database'],ordertype:'',more:1,fname:req.query['fname'],lname:req.query['lname'],bgroup:req.query['bgroup'],op:req.query['op']})
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
                    var orderby2='',ordertype2='';
                    if(req.query['orderby']!='' || req.query['ordertype']!='' || req.query['orderby']!=undefined || req.query['ordertype']!=undefined)
                    {
                        ordertype2=req.query['ordertype'];
                        orderby2=req.query['orderby'];
                    }
                    result = sort(result,req.query['orderby'],req.query['ordertype'])
                    result = result.slice(offset,currentPage*recordsPerPage);
                    res.render('./task-8/html/display',{firstname:userName[0]['firstname'],lastname:userName[0]['lastname'],keys:result[0],results:result,page:currentPage,error:'',query:req.query['query'],lastpage:totalPages,database:req.query['database'],ordertype:ordertype2,orderby:orderby2,more:1,fname:req.query['fname'],lname:req.query['lname'],bgroup:req.query['bgroup'],op:req.query['op']})
                }
                
    
            }
        }
    }
    else if(req.query['moredetails']=='Show data1')
    {
        res.render('./task-8/html/display',{firstname:userName[0]['firstname'],lastname:userName[0]['lastname'],query:'',database:'',more:1,fname:'',lname:'',bgroup:'',error:'Please Enter fname,lname,bgroup in Text Box'});
    }
    else
    {
        res.render('./task-8/html/display',{firstname:userName[0]['firstname'],lastname:userName[0]['lastname'],error:"Please Enter Ids in Text Box",query:'',database:'',more:0});
    }
    }
    else
    {
        res.redirect('/task-12/login');
    }
});

module.exports = searching;