var Pool = require('pg').Pool
var pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  //'host.docker.internal' if we want to connect in docker
  database: 'postgres',
  password: '12345',
  port: 5432

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
pool.connect(function (err: any, res: any) {
  if (err) {
    console.error("Bad connection");
    console.log(err)
    try {
      throw err
    }
    catch (err) {
      // console.error({
      //   "error code":502,
      //   "error message":"Bad gateway"
      // })
    }
  }
  else {
    console.log("Connected!");
  }
});

//get all users
var getUsers = async (req: Request, res: Response) => {
  var aclient = await pool.query('select * from datasets order by id;')
  if (aclient.rows.length === 0) {
    res.status(400).send({
      "status_code": 400,
      "reason_phrase": "Bad Request",
      "error_code": "Empty_table",
      "error_message": "Insert some data in the table"
    })
  }
  else {
    res.json(aclient.rows)
  }
}
//get user by id
var getUserById = async (req: Request, res: Response) => {
  var id = parseInt(req.params.id)

  var gclient = await pool.query('select * from datasets where id = $1;', [id], (error: any, results: any) => {
    if (results.rows.length === 0) {
      res.status(404).send({
        "status_code": 404,
        "reason_phrase": "The requested operation failed because a resource associated with the request could not be found.",
        "error_code": "Not_found",
        "error_message": "The data you requested could not be found in Database"
      })
    }
    else {
      res.json(results.rows)
    }
  })
}
//create user
var createUser = async (req: Request, res: Response) => {
  var now = new Date()
  var { id, data_schema, router_config, status, created_by, updated_by, created_dated, updated_date }: Dbrecord = req.body
  var recExists = await pool.query(`select * from datasets where id = '${id}'`)
  if (recExists.rows.length == 0) {
    var cclient = pool.query('INSERT INTO datasets values($1,$2,$3,$4,$5,$6,$7,$8);',
      [id, data_schema, router_config, status, created_by, updated_by, now, now], (error: any, result: any) => {
        if (!error) {
          res.status(201).send({
            "status_code": 201,
            "success_message": "The record is successfully created"
          })
        }
        else {
          res.status(400).send({
            "status_code": 400,
            "reason_phrase": "The requested operation failed because there is missing data in the input.",
            "error_code": "Bad Request",
            "error_message": "Data is incomplete"
          })
        }
      })
  }
  else {
    res.status(409).send({
      "status_code": 409,
      "reason_phrase": "The requested operation failed because it tried to create a resource that already exists.",
      "error_code": "duplicate",
      "error_message": "The data you posted already exists in the Database"
    })
  }
}


var updateUser = async (req: any, res: any) => {
  var now = new Date()
  var id = parseInt(req.params.id)
  var recExists = await pool.query(`select * from datasets where id = '${id}'`)
  var { data_schema, router_config, status, updated_by }: Dbrecord = req.body
  if (recExists.rows.length != 0) {
    pool.query(`UPDATE datasets set data_schema=$1,router_config=$2,status=$3,updated_by=$4,updated_date=$5 where id =$6 ;`,
      [data_schema, router_config, status, updated_by, now, id], (error: any, result: any) => {
      if (!error) {
        res.status(200).send({
          "status_code": 200,
          "success_message": "The record is successfully updated"
        })
      }
      else {
        res.status(400).send({
          "status_code": 400,
          "reason_phrase": "Null values found.",
          "error_code": "Bad Request",
          "error_message": "insufficient data"
        })
      }
    })
  }
  else {
    res.status(404).send({
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
    var data_schema:object= req.body.data_schema||recExists.rows[0].data_schema
  var router_config:object=req.body.router_config||recExists.rows[0].router_config
  var status:string= req.body.status|| recExists.rows[0].status
  var updated_by:string=req.body.updated_by|| recExists.rows[0].updated_date
  // if(req.body.updated_by==null){
  //   updated_by=recExists.rows[0].updated_by
  // }
    pool.query(`UPDATE datasets set data_schema=$1,router_config=$2,status=$3,updated_by=$4,updated_date=$5 where id =$6 ;`,
      [data_schema, router_config, status, updated_by, now, id], (error: any, result: any) => {
      if (!error) {
        res.status(200).send({
          "status_code": 200,
          "success_message": "The record is successfully updated"
        })
      }
      else {
        res.status(400).send({
          "status_code": 400,
          "error_code": "Bad Request",
          "error_message": "Invalid datatype"
        })
      }
    })
  }
  else {
    res.status(404).send({
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
    var gclient = await pool.query(' delete from datasets where id = $1;', [id], (error: any, results: any) => {
      if (!error) {
        res.status(200).send({
          "status_code": 200,
          "success_message": "The record is deleted"
        })

      }
    })
  }
  else {
    res.status(404).send({
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
  getUsers,
  getUserById,
  createUser,
  updateUser,
  partialupdateUser,
  deleteUser
}