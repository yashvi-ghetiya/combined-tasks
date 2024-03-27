const { executeQueryselect, executeQueryupdate, executeQuery,insertData } = require('../database_functions/executeQuery');

let updateData = async (database, arr, id) => {

  basic_details(database, arr, id);
  edu(database, arr, id);
  work(database, arr, id);
  ref(database,arr,id);
  pref(database,arr,id);
  tech(database,arr,id);
  lang(database,arr,id);
}

async function basic_details(database, arr, id) {
  //basic detail
  var query = `UPDATE candidateMaster
   SET fname = ?, lname = ?,designation = ?,city = ?,state = ?,email = ?,phoneNo = ?,zipCode = ?,gender = ?,relationship = ?,dob = ?,add1 = ?,add2 = ?
   WHERE canid = ?;`;
  var values = [arr['fname'], arr['lname'], arr['desig'], arr['city'], arr['state'], arr['email'], arr['contact'], arr['zipcode'], arr['gender'], arr['relationship'], arr['dob'], arr['add1'], arr['add2'], id];
  let result = await executeQueryupdate(database, query, values);

}

async function edu(database, arr, id) {
  query = "SELECT * from educationDetails where canid = ? ;";
  values = [id]
  result = await executeQueryselect(database, query, values);

  var len = 0;
  for (var i = 0; i < arr['edu'].length; i++) {
    if (arr['edu'][i] == '') {
      break;
    }

    len++;
  }

  if (result.length == len) {
    for (var i = 0; i < len; i++) {
      var query = `UPDATE educationDetails
        SET degree = ?,board_courseName = ?,passingYear = ?,percentage = ?
        WHERE eid = ? ;`;
      var values = [arr['degree'][i], arr['edu'][i], arr['edupassingyear'][i], arr['eduper'][i], arr['eduid'][i]];
      await executeQueryupdate(database, query, values);

    }
  }
  else if (result.length < len) {

    for (var i = 0; i < result.length; i++) {
      var query = `UPDATE educationDetails
        SET degree = ?,board_courseName = ?,passingYear = ?,percentage = ?
        WHERE eid = ? ;`;
      var values = [arr['degree'][i], arr['edu'][i], arr['edupassingyear'][i], arr['eduper'][i], arr['eduid'][i]];
      await executeQueryupdate(database, query, values);
    }
    for (var i = result.length; i < len; i++) {

      var query = `INSERT INTO educationDetails 
        (canid,degree,board_courseName,passingYear,percentage) 
        VALUES 
        ('${id}',
        '${arr['degree'][i]}',
        '${arr['edu'][i]}',
        '${arr['edupassingyear'][i]}',
        '${Number(arr['eduper'][i])}')`;
      await executeQuery(database, query);

    }
  }
  else if (result.length > len) {

    for (var i = 0; i < len; i++) {

      var query = `UPDATE educationDetails
        SET degree = ?,board_courseName = ?,passingYear = ?,percentage = ?
        WHERE eid = ? ;`;
      var values = [arr['degree'][i], arr['edu'][i], arr['edupassingyear'][i], arr['eduper'][i], arr['eduid'][i]];
      await executeQueryupdate(database, query, values);
    }
    for (var i = len; i < result.length; i++) {

      var query = `delete from educationDetails where eid=` + arr['eduid'][i];
      await executeQuery(database, query);

    }
  }
}

async function work(database, arr, id) {
  query = "SELECT * from workExperience where canid = ? ;";
  values = [id]
  result = await executeQueryselect(database, query, values);

  var len = 0;
  for (var i = 0; i < arr['company'].length; i++) {
    if (arr['company'][i] == '') {
      break;
    }
    len++;
  }

  if (result.length == len) {
    
    for (var i = 0; i < len; i++) {
      var query = `UPDATE workExperience
        SET companyName = ?,designation = ?,fromDate = ?,toDate = ?
        WHERE wid = ? ;`;
      var values = [arr['company'][i], arr['des'][i], arr['workfrom'][i], arr['workto'][i], arr['workid'][i]];
      var result = await executeQueryupdate(database, query, values);
    }
  }
  else if (result.length < len) {
    
    for (var i = 0; i < result.length; i++) {
      var query = `UPDATE workExperience
      SET companyName = ?,designation = ?,fromDate = ?,toDate = ?
      WHERE wid = ? ;`;
      var values = [arr['company'][i], arr['des'][i], arr['workfrom'][i], arr['workto'][i], arr['workid'][i]];
      await executeQueryupdate(database, query, values);
    }
    for (var i = result.length; i < len; i++) {

      var query = `INSERT INTO workExperience 
        (canid,companyName,designation,fromDate,toDate) 
        VALUES 
        ('${id}',
        '${arr['company'][i]}',
        '${arr['des'][i]}',
        '${arr['workfrom'][i]}',
        '${arr['workto'][i]}')`;
      await executeQuery(database, query);

    }
  }
  else if (result.length > len) {
   
    for (var i = 0; i < len; i++) {
      var query = `UPDATE workExperience
      SET companyName = ?,designation = ?,fromDate = ?,toDate = ?
      WHERE wid = ? ;`;
      var values = [arr['company'][i], arr['des'][i], arr['workfrom'][i], arr['workto'][i], arr['workid'][i]];
      await executeQueryupdate(database, query, values);
    }
    for (var i = len; i < result.length; i++) {
    
      if(arr['workid'][i]==undefined)
      {
       
        var query = `delete from workExperience where wid >` + arr['workid'][i-1];
        
        
        await executeQuery(database, query);
        break;
     
      }
      else
      {
        
        var query = `delete from workExperience where wid=` + arr['workid'][i];
        await executeQuery(database, query);
      }
      
    }
  }
}

async function ref(database, arr, id) {
  query = "SELECT * from referenceContact where canid = ? ;";
  values = [id]
  result = await executeQueryselect(database, query, values);
 
  var len = 0;
  for (var i = 0; i < arr['refname'].length; i++) {
    if (arr['refname'][i] == '') {
      break;
    }
    len++;
  }

 
  if (result.length == len) {
 
    for (var i = 0; i < len; i++) {
      var query = `UPDATE referenceContact
        SET name = ?,contactNo = ?,relation = ?
        WHERE rid = ? ;`;
      var values = [arr['refname'][i], arr['refcontact'][i], arr['refrel'][i],arr['rid'][i]];
      var result = await executeQueryupdate(database, query, values);
      
    }
  }
  else if (result.length < len) {
   
    for (var i = 0; i < result.length; i++) {
      var query = `UPDATE referenceContact
        SET name = ?,contactNo = ?,relation = ?
        WHERE rid = ? ;`;
        var values = [arr['refname'][i], arr['refcontact'][i], arr['refrel'][i],arr['rid'][i]];
      await executeQueryupdate(database, query, values);
    }
    for (var i = result.length; i < len; i++) {

      var query = `INSERT INTO referenceContact 
        (canid,name,contactNo,relation) 
        VALUES 
        ('${id}',
        '${arr['refname'][i]}',
        '${arr['refcontact'][i]}',
        '${arr['refrel'][i]}')`;
      await executeQuery(database, query);

    }
  }
  else if (result.length > len) {
   
    for (var i = 0; i < len; i++) {
      var query = `UPDATE referenceContact
        SET name = ?,contactNo = ?,relation = ?
        WHERE rid = ? ;`;
        var values = [arr['refname'][i], arr['refcontact'][i], arr['refrel'][i],arr['rid'][i]];
      await executeQueryupdate(database, query, values);
      
    }
    for (var i = len; i < result.length; i++) {
    
      if(arr['workid'][i]==undefined)
      {
        var query = `delete from referenceContact where rid >` + arr['rid'][i-1];
        
        await executeQuery(database, query);
        break;
     
      }
      else
      {
        
        var query = `delete from referenceContact where rid=` + arr['rid'][i];
        await executeQuery(database, query);
      }
      
    }
  }
}

async function pref(database, arr, id) {
 
  var query = `UPDATE preference
   SET preferedLocation = ?,noticePeriod = ?,expectedCTC = ?,currentCTC = ?,department = ?
   WHERE canid = ?;`;
  var values = [arr["preferedlocation"].toString(),arr['noticeperiod'],arr['expectedCTC'],arr['currentCTC'],arr['department'], id];
  let result = await executeQueryupdate(database, query, values);
}

async function tech(database, arr, id) {
  var query = `delete from technologyYouKnow where canid=` + id;
  await executeQuery(database, query);

  if(arr['php']!=undefined)
  {
     result2 = await insertData(database,`INSERT INTO technologyYouKnow 
    (canid,technology,level) 
       VALUES 
       ('${id}',
       'php',
       '${arr['php']}')`);
       console.log("yes");
  }
  if(arr['mysql']!=undefined)
  {
     result2 = await insertData(database,`INSERT INTO technologyYouKnow 
     (canid,technology,level) 
       VALUES 
       ('${id}',
       'mysql',
       '${arr['mysql']}')`);
       console.log("yes");
  }
  if(arr['laravel']!=undefined)
  {
     result2 = await insertData(database,`INSERT INTO technologyYouKnow 
     (canid,technology,level) 
       VALUES 
       ('${id}',
       'laravel',
       '${arr['laravel']}')`);
       console.log("yes");
  }
  if(arr['oracle']!=undefined)
  {
     result2 = await insertData(database,`INSERT INTO technologyYouKnow 
     (canid,technology,level) 
       VALUES 
       ('${id}',
       'oracle',
       '${arr['oracle']}')`);
       console.log("yes");
  }
}

async function lang(database,arr,id)
{
  var arr1 =['canRead','canWrite','canSpeak'];
      var arr2=[];
      var query = `delete from languageKnown where canid=` + id;
      await executeQuery(database, query);
      
      if(arr['hindi']!=undefined)
      {
         for(var i=0;i<3;i++)
         {
            if(arr1.includes(arr['hindi'][i]))
            {
               arr2.push(1);
            }
            else
            {
               arr2.push(0);
            }
         }
         
         result2 = await insertData(database,`INSERT INTO languageKnown 
         (canid,language,canRead,canWrite,canSpeak) 
         VALUES 
         ('${id}',
         'hindi',
         '${arr2[0]}',
         '${arr2[1]}',
         '${arr2[2]}')`);
      }
      arr2=[];
      if(arr['english']!=undefined)
      {
         for(var i=0;i<3;i++)
         {
            if(arr1.includes(arr['english'][i]))
            {
               arr2.push(1);
            }
            else
            {
               arr2.push(0);
            }
         }
        
         result2 = await insertData(database,`INSERT INTO languageKnown 
         (canid,language,canRead,canWrite,canSpeak) 
         VALUES 
         ('${id}',
         'english',
         '${arr2[0]}',
         '${arr2[1]}',
         '${arr2[2]}')`);
      }
      arr2=[];
      if(arr['gujarati']!=undefined)
      {
         for(var i=0;i<3;i++)
         {
            if(arr1.includes(arr['gujarati'][i]))
            {
               arr2.push(1);
            }
            else
            {
               arr2.push(0);
            }
         }
        
         result2 = await insertData(database,`INSERT INTO languageKnown 
         (canid,language,canRead,canWrite,canSpeak) 
         VALUES 
         ('${id}',
         'gujarati',
         '${arr2[0]}',
         '${arr2[1]}',
         '${arr2[2]}')`);
      }
}


module.exports = { updateData };