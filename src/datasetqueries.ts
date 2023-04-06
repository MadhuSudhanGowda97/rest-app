let joi = require('joi')
var Pool = require('pg').Pool
var dotenv = require('dotenv')
dotenv.config();
// const TestPool = require('test-pg-pool');
// if(process.env.NODE_ENV == 'test'){

//   const pool = new TestPool();
// }
// else{
var pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: "12345",
  port: 5432,


})
interface Dbrecord {
  id: string,
  data_schema: object,
  router_config: object,
  status: string,
  created_by: string,
  updated_by: string,
  created_dated: string,
  updated_date: string
}
import { Request, Response } from "express";

// pool.connect(function (err: any, res: any) {
//   if (err) {
//     console.error("Bad connection");
//     console.log(err)
//     try {
//       throw err
//     }
//     catch (err) {
//       console.error({
//         "error code": 502,
//         "error message": "Bad gateway"
//       })
//     }
//   }
//   else {
//     console.log("Connected!");
//   }
// });

//get all users
var getUsers = async (req: Request, res: Response) => {
  var aclient = await pool.query('select * from datasets order by id;')

  if (aclient.rows.length === 0) {
    res.status(400).json({
      "status_code": 400,
      "reason_phrase": "Bad Request",
      "error_code": "Empty_table",
      "error_message": "Insert some data in the table"
    })
  }
  else {
    res.status(200).json(aclient.rows)
  }
}
//get user by id
var getUserById = async (req: Request, res: Response) => {
  var id = parseInt(req.params.id)

  var gclient = await pool.query('select * from datasets where id = $1;', [id])
  if (gclient.rows.length === 0) {
    res.status(404).json({
      "status_code": 404,
      "reason_phrase": "The requested operation failed because a resource associated with the request could not be found.",
      "error_code": "Not_found",
      "error_message": "The data you requested could not be found in Database"
    })
  }
  else {
    res.status(200).json(gclient.rows)
  }
}
//create user
var createUser = async (req: Request, res: Response) => {

  // try {
    var now = new Date()
    var { id, data_schema, router_config, status, created_by, updated_by, created_dated, updated_date }: Dbrecord = req.body
    var recExists = await pool.query(`select * from datasets where id = '${id}'`)
    if (recExists.rows.length === 0) {
      try{
        var newRecord = await pool.query('INSERT INTO datasets values($1,$2,$3,$4,$5,$6,$7,$8);',
        [id, data_schema, router_config, status, created_by, updated_by, now, now])
        
        
      if (!newRecord.error) {
        res.status(200).json({
          "status_code": 200,
          "success_message": "The record is successfully created"
        })
      }}
      catch(error){
        res.status(400).json({
          "status_code": 400,
          "reason_phrase": "The requested operation failed because there is missing data in the input.",
          "error_code": "Bad Request",
          "error_message": "Data is incomplete"
        })
      }
    }
    else {
      res.status(409).json({
        "status_code": 409,
        "reason_phrase": "The requested operation failed because it tried to create a resource that already exists.",
        "error_code": "duplicate",
        "error_message": "The data you posted already exists in the Database"
      })
    }
  // } catch (error) {
  //   res.status(500).json({
  //     "status_code": 500,
  //     "error_message": "Something went wrong"
  //   })
  // }
  }


var updateUser = async (req: any, res: any) => {
  var now = new Date()
  var id = parseInt(req.params.id)
  var recExists = await pool.query(`select * from datasets where id = '${id}'`)
  var { data_schema, router_config, status, updated_by }: Dbrecord = req.body
  if (recExists.rowCount === 1) {
   try{
    var record= await pool.query(`UPDATE datasets set data_schema=$1,router_config=$2,status=$3,updated_by=$4,updated_date=$5 where id =$6 ;`,
      [data_schema, router_config, status, updated_by, now, id])
        if (!record.error) {


          res.status(200).json({
            "status_code": 200,
            "success_message": "The record is successfully updated"
          }
          )
        }
      }
      catch(error){
          res.status(400).json({
            "status_code": 400,
            "reason_phrase": "Null values found.",
            "error_code": "Bad Request",
            "error_message": "insufficient data"
          })
        }
      }
  else {
    res.status(404).json({
      "status_code": 404,
      "reason_phrase": "The requested operation failed because a resource associated with the request could not be found.",
      "error_code": "Not_found",
      "error_message": "The data you requested could not be found in Database"
    })
  }
}

var partialupdateUser = async (req: any, res: any) => {
  var now = new Date()
  var id = parseInt(req.params.id)
  var recExists = await pool.query(`select * from datasets where id = '${id}'`)
  if (recExists.rows.length != 0) {
    var data_schema: object = req.body.data_schema || recExists.rows[0].data_schema
    var router_config: object = req.body.router_config || recExists.rows[0].router_config
    var status: string = req.body.status || recExists.rows[0].status
    var updated_by: string = req.body.updated_by || recExists.rows[0].updated_date
    // if(req.body.updated_by==null){
    //   updated_by=recExists.rows[0].updated_by
    // }
    try{
      var record = await pool.query(`UPDATE datasets set data_schema=$1,router_config=$2,status=$3,updated_by=$4,updated_date=$5 where id =$6 ;`,
      [data_schema, router_config, status, updated_by, now, id])
          res.status(200).json({
            "status_code": 200,
            "success_message": "The record is successfully updated"
          })
        }
        catch(error){
          res.status(400).json({
            "status_code": 400,
            "reason_phrase": "invalid datatype found.",
            "error_code": "Bad Request",
            "error_message": "insufficient data"
          }) 
        }
      }
        
        
  else {
    res.status(404).json({
      "status_code": 404,
      "reason_phrase": "The requested operation failed because a resource associated with the request could not be found.",
      "error_code": "Not_found",
      "error_message": "The data you requested could not be found in Database"
    })
  }
}



var deleteUser = async (req: Request, res: Response) => {
  var id = parseInt(req.params.id)
  var recExists = await pool.query(`select * from datasets where id = '${id}'`)
  if (recExists.rows.length != 0) {
    var response = await pool.query(' delete from datasets where id = $1;', [id]);
    res.status(200).json({
      "status_code": 200,
      "success_message": "The record is deleted"

    })
  }
  else {
    res.status(404).json({
      "status_code": 404,
      "reason_phrase": "The requested operation failed because a resource associated with the request could not be found.",
      "error_code": "Not_found",
      "error_message": "The data you requested could not be found in Database"
    })
  }
}

// module.exports = {
//   getUsers,
//   getUserById,
//   createUser,
//   updateUser,
//   deleteUser
// }


export {
  pool,
  getUsers,
  getUserById,
  createUser,
  updateUser,
  partialupdateUser,
  deleteUser
}