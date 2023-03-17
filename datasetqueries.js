"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.deleteUser = exports.partialupdateUser = exports.updateUser = exports.createUser = exports.getUserById = exports.getUsers = void 0;
var Pool = require('pg').Pool;
var pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    //'host.docker.internal' if we want to connect in docker
    database: 'postgres',
    password: '12345',
    port: 5432
});
pool.connect(function (err, res) {
    if (err) {
        console.error("Bad connection");
        console.log(err);
        try {
            throw err;
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
var getUsers = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var aclient;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, pool.query('select * from datasets order by id;')];
            case 1:
                aclient = _a.sent();
                if (aclient.rows.length === 0) {
                    res.status(400).send({
                        "status_code": 400,
                        "reason_phrase": "Bad Request",
                        "error_code": "Empty_table",
                        "error_message": "Insert some data in the table"
                    });
                }
                else {
                    res.json(aclient.rows);
                }
                return [2 /*return*/];
        }
    });
}); };
exports.getUsers = getUsers;
//get user by id
var getUserById = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, gclient;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = parseInt(req.params.id);
                return [4 /*yield*/, pool.query('select * from datasets where id = $1;', [id], function (error, results) {
                        if (results.rows.length === 0) {
                            res.status(404).send({
                                "status_code": 404,
                                "reason_phrase": "The requested operation failed because a resource associated with the request could not be found.",
                                "error_code": "Not_found",
                                "error_message": "The data you requested could not be found in Database"
                            });
                        }
                        else {
                            res.json(results.rows);
                        }
                    })];
            case 1:
                gclient = _a.sent();
                return [2 /*return*/];
        }
    });
}); };
exports.getUserById = getUserById;
//create user
var createUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var now, _a, id, data_schema, router_config, status, created_by, updated_by, created_dated, updated_date, recExists, cclient;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                now = new Date();
                _a = req.body, id = _a.id, data_schema = _a.data_schema, router_config = _a.router_config, status = _a.status, created_by = _a.created_by, updated_by = _a.updated_by, created_dated = _a.created_dated, updated_date = _a.updated_date;
                return [4 /*yield*/, pool.query("select * from datasets where id = '".concat(id, "'"))];
            case 1:
                recExists = _b.sent();
                if (recExists.rows.length == 0) {
                    cclient = pool.query('INSERT INTO datasets values($1,$2,$3,$4,$5,$6,$7,$8);', [id, data_schema, router_config, status, created_by, updated_by, now, now], function (error, result) {
                        if (!error) {
                            res.status(201).send({
                                "status_code": 201,
                                "success_message": "The record is successfully created"
                            });
                        }
                        else {
                            res.status(400).send({
                                "status_code": 400,
                                "reason_phrase": "The requested operation failed because there is missing data in the input.",
                                "error_code": "Bad Request",
                                "error_message": "Data is incomplete"
                            });
                        }
                    });
                }
                else {
                    res.status(409).send({
                        "status_code": 409,
                        "reason_phrase": "The requested operation failed because it tried to create a resource that already exists.",
                        "error_code": "duplicate",
                        "error_message": "The data you posted already exists in the Database"
                    });
                }
                return [2 /*return*/];
        }
    });
}); };
exports.createUser = createUser;
var updateUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var now, id, recExists, _a, data_schema, router_config, status, updated_by;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                now = new Date();
                id = parseInt(req.params.id);
                return [4 /*yield*/, pool.query("select * from datasets where id = '".concat(id, "'"))];
            case 1:
                recExists = _b.sent();
                _a = req.body, data_schema = _a.data_schema, router_config = _a.router_config, status = _a.status, updated_by = _a.updated_by;
                if (recExists.rows.length != 0) {
                    pool.query("UPDATE datasets set data_schema=$1,router_config=$2,status=$3,updated_by=$4,updated_date=$5 where id =$6 ;", [data_schema, router_config, status, updated_by, now, id], function (error, result) {
                        if (!error) {
                            res.status(200).send({
                                "status_code": 200,
                                "success_message": "The record is successfully updated"
                            });
                        }
                        else {
                            res.status(400).send({
                                "status_code": 400,
                                "reason_phrase": "Null values found.",
                                "error_code": "Bad Request",
                                "error_message": "insufficient data"
                            });
                        }
                    });
                }
                else {
                    res.status(404).send({
                        "status_code": 404,
                        "reason_phrase": "The requested operation failed because a resource associated with the request could not be found.",
                        "error_code": "Not_found",
                        "error_message": "The data you requested could not be found in Database"
                    });
                }
                return [2 /*return*/];
        }
    });
}); };
exports.updateUser = updateUser;
var partialupdateUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var now, id, recExists, data_schema, router_config, status, updated_by;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                now = new Date();
                id = parseInt(req.params.id);
                return [4 /*yield*/, pool.query("select * from datasets where id = '".concat(id, "'"))];
            case 1:
                recExists = _a.sent();
                if (recExists.rows.length != 0) {
                    data_schema = req.body.data_schema || recExists.rows[0].data_schema;
                    router_config = req.body.router_config || recExists.rows[0].router_config;
                    status = req.body.status || recExists.rows[0].status;
                    updated_by = req.body.updated_by || recExists.rows[0].updated_date;
                    // if(req.body.updated_by==null){
                    //   updated_by=recExists.rows[0].updated_by
                    // }
                    pool.query("UPDATE datasets set data_schema=$1,router_config=$2,status=$3,updated_by=$4,updated_date=$5 where id =$6 ;", [data_schema, router_config, status, updated_by, now, id], function (error, result) {
                        if (!error) {
                            res.status(200).send({
                                "status_code": 200,
                                "success_message": "The record is successfully updated"
                            });
                        }
                        else {
                            res.status(400).send({
                                "status_code": 400,
                                "error_code": "Bad Request",
                                "error_message": "Invalid datatype"
                            });
                        }
                    });
                }
                else {
                    res.status(404).send({
                        "status_code": 404,
                        "reason_phrase": "The requested operation failed because a resource associated with the request could not be found.",
                        "error_code": "Not_found",
                        "error_message": "The data you requested could not be found in Database"
                    });
                }
                return [2 /*return*/];
        }
    });
}); };
exports.partialupdateUser = partialupdateUser;
var deleteUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, recExists, gclient;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = parseInt(req.params.id);
                return [4 /*yield*/, pool.query("select * from datasets where id = '".concat(id, "'"))];
            case 1:
                recExists = _a.sent();
                if (!(recExists.rows.length != 0)) return [3 /*break*/, 3];
                return [4 /*yield*/, pool.query(' delete from datasets where id = $1;', [id], function (error, results) {
                        if (!error) {
                            res.status(200).send({
                                "status_code": 200,
                                "success_message": "The record is deleted"
                            });
                        }
                    })];
            case 2:
                gclient = _a.sent();
                return [3 /*break*/, 4];
            case 3:
                res.status(404).send({
                    "status_code": 404,
                    "reason_phrase": "The requested operation failed because a resource associated with the request could not be found.",
                    "error_code": "Not_found",
                    "error_message": "The data you requested could not be found in Database"
                });
                _a.label = 4;
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.deleteUser = deleteUser;
