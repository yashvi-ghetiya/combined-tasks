const searching_by_delimiter = require("express").Router();

const { executeQuery } = require('../../database_functions/executeQuery');

searching_by_delimiter.get("/dashboard/task-9/display",async (req, res) => {
    res.render('./task-9/html/display',{keys:'',results:'',error:'Enter values'})

});

searching_by_delimiter.post("/dashboard/task-9/display",async (req, res) => {
    var data=req.body.clause;
   
    var query="select * from student_master where";
   
    if(generateQuery(data,'_',"fname"))
    {
        query+=' '+generateQuery(data,'_',"fname");
    }
    if(generateQuery(data,'^',"lname"))
    {
        if(query.includes(')'))
        {
            query+=' and '+generateQuery(data,'^',"lname");
        }
        else
        {
            query+=' '+generateQuery(data,'^',"lname");
        }
    }
    if(generateQuery(data,'$',"email"))
    {
        if(query.includes(')'))
        {
            query+=' and '+generateQuery(data,'$',"email");
        }
        else
        {
            query+=' '+generateQuery(data,'$',"email");
        }
    }
    if(generateQuery(data,'}',"gender"))
    {
        if(query.includes(')'))
        {
            query+=' and '+generateQuery(data,'}',"gender");
        }
        else
        {
            query+=' '+generateQuery(data,'}',"gender");
      
        }
    }
    if(generateQuery(data,'{',"bgroup"))
    {
        if(query.includes(')'))
        {
            query+=' and '+generateQuery(data,'{',"bgroup");
        }
        else
        {
            query+=' '+generateQuery(data,'{',"bgroup");
        }
    }
    if(generateQuery(data,'#',"address"))
    {
        if(query.includes(')'))
        {
            query+=' and '+generateQuery(data,'#',"address");
        }
        else
        {
            query+=' '+generateQuery(data,'#',"address");
        }
    }
    query+=' ;';
    console.log(query);
   
           
    let result = await executeQuery('studentMaster',query);
    res.render('./task-9/html/display',{keys:result[0],results:result,error:''})
});

function generateQuery(data,delimiter,columnname)
{
    var mainstr='';
    var delimiters=['_','^','}','{','#','$'];
    if(data.includes(delimiter))
    {
        mainstr='(';
        var count=0;
        for(var i=0;i<data.length;i++)
        {
            var str='';
            if(data[i]==delimiter)
            {
                str+=columnname+" like '";

                for(var j=i+1;j<data.length;j++)
                {
                    if(delimiters.includes(data[j]))
                    {
                        break;
                    }
                    str+=data[j];
                }
                str+="%'";
                if(count==0)
                {
                    mainstr+=str;
                }
                else
                {
                    mainstr+=' or '+str;
                }
                count++;
            }
        }
        mainstr+=')';
        return mainstr;
    }
    else
    {
        return mainstr;
    }
}

module.exports = searching_by_delimiter;