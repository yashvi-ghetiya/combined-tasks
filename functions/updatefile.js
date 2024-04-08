
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
  let query = `UPDATE candidateMaster_task15
   SET fname = ?, lname = ?,designation = ?,city = ?,state = ?,email = ?,phoneNo = ?,zipCode = ?,gender = ?,relationship = ?,dob = ?,add1 = ?,add2 = ?
   WHERE canid = ?;`;
   console.log(arr['fname']);
  let values = [arr['fname'], arr['lname'], arr['desig'], arr['city'], arr['state'], arr['email'], arr['contact'], arr['zipcode'], arr['gender'], arr['relationship'], arr['dob'], arr['add1'], arr['add2'], id];
 await executeQueryupdate(database, query, values);

}

async function edu(database, arr, id) {
  query = "SELECT * from educationDetails_task15 where canid = ? ;";
  values = [id]
  result = await executeQueryselect(database, query, values);

  let len = 0;
  for (let i = 0; i < arr['edu'].length; i++) {
    if (arr['edu'][i] == '') {
      break;
    }

    len++;
  }

  if (result.length == len) {
    for (let i = 0; i < len; i++) {
      let query = `UPDATE educationDetails_task15
        SET degree = ?,board_courseName = ?,passingYear = ?,percentage = ?
        WHERE eid = ? ;`;
      let values = [arr['degree'][i], arr['edu'][i], arr['edupassingyear'][i], arr['eduper'][i], arr['eduid'][i]];
      await executeQueryupdate(database, query, values);

    }
  }
  else if (result.length < len) {

    for (let i = 0; i < result.length; i++) {
      let query = `UPDATE educationDetails_task15
        SET degree = ?,board_courseName = ?,passingYear = ?,percentage = ?
        WHERE eid = ? ;`;
      let values = [arr['degree'][i], arr['edu'][i], arr['edupassingyear'][i], arr['eduper'][i], arr['eduid'][i]];
      await executeQueryupdate(database, query, values);
    }
    for (let i = result.length; i < len; i++) {

      let query = `INSERT INTO educationDetails_task15
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

    for (let i = 0; i < len; i++) {

      let query = `UPDATE educationDetails_task15
        SET degree = ?,board_courseName = ?,passingYear = ?,percentage = ?
        WHERE eid = ? ;`;
      let values = [arr['degree'][i], arr['edu'][i], arr['edupassingyear'][i], arr['eduper'][i], arr['eduid'][i]];
      await executeQueryupdate(database, query, values);
    }
    for (let i = len; i < result.length; i++) {

      let query = `delete from educationDetails_task15 where eid=` + arr['eduid'][i];
      await executeQuery(database, query);

    }
  }
}

async function work(database, arr, id) {
  query = "SELECT * from workExperience_task15 where canid = ? ;";
  values = [id]
  result = await executeQueryselect(database, query, values);

  let len = 0;
  for (let i = 0; i < arr['company'].length; i++) {
    if (arr['company'][i] == '') {
      break;
    }
    len++;
  }

  if (result.length == len) {
    
    for (let i = 0; i < len; i++) {
      let query = `UPDATE workExperience_task15
        SET companyName = ?,designation = ?,fromDate = ?,toDate = ?
        WHERE wid = ? ;`;
      let values = [arr['company'][i], arr['des'][i], arr['workfrom'][i], arr['workto'][i], arr['workid'][i]];
      let result = await executeQueryupdate(database, query, values);
    }
  }
  else if (result.length < len) {
    
    for (let i = 0; i < result.length; i++) {
      let query = `UPDATE workExperience_task15
      SET companyName = ?,designation = ?,fromDate = ?,toDate = ?
      WHERE wid = ? ;`;
      let values = [arr['company'][i], arr['des'][i], arr['workfrom'][i], arr['workto'][i], arr['workid'][i]];
      await executeQueryupdate(database, query, values);
    }
    for (let i = result.length; i < len; i++) {

      let query = `INSERT INTO workExperience_task15 
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
   
    for (let i = 0; i < len; i++) {
      let query = `UPDATE workExperience_task15
      SET companyName = ?,designation = ?,fromDate = ?,toDate = ?
      WHERE wid = ? ;`;
      let values = [arr['company'][i], arr['des'][i], arr['workfrom'][i], arr['workto'][i], arr['workid'][i]];
      await executeQueryupdate(database, query, values);
    }
    for (let i = len; i < result.length; i++) {
    
      if(arr['workid'][i]==undefined)
      {
       
        let query = `delete from workExperience_task15 where wid >` + arr['workid'][i-1];
        
        
        await executeQuery(database, query);
        break;
     
      }
      else
      {
        
        let query = `delete from workExperience_task15 where wid=` + arr['workid'][i];
        await executeQuery(database, query);
      }
      
    }
  }
}

async function ref(database, arr, id) {
  query = "SELECT * from referenceContact_task15 where canid = ? ;";
  values = [id]
  result = await executeQueryselect(database, query, values);
 
  let len = 0;
  for (let i = 0; i < arr['refname'].length; i++) {
    if (arr['refname'][i] == '') {
      break;
    }
    len++;
  }

 
  if (result.length == len) {
 
    for (let i = 0; i < len; i++) {
      let query = `UPDATE referenceContact_task15
        SET name = ?,contactNo = ?,relation = ?
        WHERE rid = ? ;`;
      let values = [arr['refname'][i], arr['refcontact'][i], arr['refrel'][i],arr['rid'][i]];
      let result = await executeQueryupdate(database, query, values);
      
    }
  }
  else if (result.length < len) {
   
    for (let i = 0; i < result.length; i++) {
      let query = `UPDATE referenceContact_task15
        SET name = ?,contactNo = ?,relation = ?
        WHERE rid = ? ;`;
        let values = [arr['refname'][i], arr['refcontact'][i], arr['refrel'][i],arr['rid'][i]];
      await executeQueryupdate(database, query, values);
    }
    for (let i = result.length; i < len; i++) {

      let query = `INSERT INTO referenceContact_task15 
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
   
    for (let i = 0; i < len; i++) {
      let query = `UPDATE referenceContact_task15
        SET name = ?,contactNo = ?,relation = ?
        WHERE rid = ? ;`;
        let values = [arr['refname'][i], arr['refcontact'][i], arr['refrel'][i],arr['rid'][i]];
      await executeQueryupdate(database, query, values);
      
    }
    for (let i = len; i < result.length; i++) {
    
      if(arr['workid'][i]==undefined)
      {
        let query = `delete from referenceContact_task15 where rid >` + arr['rid'][i-1];
        
        await executeQuery(database, query);
        break;
     
      }
      else
      {
        
        let query = `delete from referenceContact_task15 where rid=` + arr['rid'][i];
        await executeQuery(database, query);
      }
      
    }
  }
}

async function pref(database, arr, id) {
 
  let query = `UPDATE preference_task15
   SET preferedLocation = ?,noticePeriod = ?,expectedCTC = ?,currentCTC = ?,department = ?
   WHERE canid = ?;`;
  let values = [arr["preferedlocation"].toString(),arr['noticeperiod'],arr['expectedCTC'],arr['currentCTC'],arr['department'], id];
  let result = await executeQueryupdate(database, query, values);
}

async function tech(database, arr, id) {
  let query = `delete from technologyYouKnow_task15 where canid=` + id;
  await executeQuery(database, query);

  if(arr['php']!=undefined)
  {
     result2 = await insertData(database,`INSERT INTO technologyYouKnow_task15 
    (canid,technology,level) 
       VALUES 
       ('${id}',
       'php',
       '${arr['php']}')`);
       
  }
  if(arr['mysql']!=undefined)
  {
     result2 = await insertData(database,`INSERT INTO technologyYouKnow_task15 
     (canid,technology,level) 
       VALUES 
       ('${id}',
       'mysql',
       '${arr['mysql']}')`);
       
  }
  if(arr['laravel']!=undefined)
  {
     result2 = await insertData(database,`INSERT INTO technologyYouKnow_task15 
     (canid,technology,level) 
       VALUES 
       ('${id}',
       'laravel',
       '${arr['laravel']}')`);
       
  }
  if(arr['oracle']!=undefined)
  {
     result2 = await insertData(database,`INSERT INTO technologyYouKnow_task15 
     (canid,technology,level) 
       VALUES 
       ('${id}',
       'oracle',
       '${arr['oracle']}')`);
       
  }
}

async function lang(database,arr,id)
{
  let arr1 =['canRead','canWrite','canSpeak'];
      let arr2=[];
      let query = `delete from languageKnown_task15 where canid=` + id;
      await executeQuery(database, query);
      
      if(arr['hindi']!=undefined)
      {
         for(let i=0;i<3;i++)
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
         
         result2 = await insertData(database,`INSERT INTO languageKnown_task15 
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
         for(let i=0;i<3;i++)
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
        
         result2 = await insertData(database,`INSERT INTO languageKnown_task15 
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
         for(let i=0;i<3;i++)
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
        
         result2 = await insertData(database,`INSERT INTO languageKnown_task15 
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