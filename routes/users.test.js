"use strict";

const request = require("supertest");

const db = require("../db.js");
const app = require("../app");
const User = require("../models/user");

const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  u1Token,
  u2Token,

} = require("./_testCommon");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

/************************************** POST /users */

describe("POST /users", function () {
  test("works for admins: create non-admin", async function () {
    const resp = await request(app)
        .post("/users")
        .send({
          username: "u-new",
          password: "password-new",

        })

    expect(resp.statusCode).toEqual(201);
    expect(resp.body).toEqual({
      user: {
        username: "u-new",
      }, token: expect.any(String),
    });
  });

  test("works for admins: create admin", async function () {
    const resp = await request(app)
        .post("/users")
        .send({
          username: "u-new",
          password: "password-new",  
        })
   
    expect(resp.statusCode).toEqual(201);
    expect(resp.body).toEqual({
      user: {
        username: "u-new",
      }, token: expect.any(String),
    });
  });

  test("unauth for users", async function () {
    const resp = await request(app)
        .post("/users")
        .send({
          username: "u-new",
          password: "password-new", 
        })
        .set("authorization", `Bearer ${u1Token}`);
    expect(resp.statusCode).toEqual(401);
  });

  test("unauth for anon", async function () {
    const resp = await request(app)
        .post("/users")
        .send({
          username: "u-new",
          password: "password-new",
        });
    expect(resp.statusCode).toEqual(401);
  });

  test("bad request if missing data", async function () {
    const resp = await request(app)
        .post("/users")
        .send({
          username: "u-new",
        })
    expect(resp.statusCode).toEqual(400);
  });

  test("bad request if invalid data", async function () {
    const resp = await request(app)
        .post("/users")
        .send({
          username: "u-new", 
          password: "password-new",     
        })
    
    expect(resp.statusCode).toEqual(400);
  });
});

/************************************** GET /users */

// describe("GET /users", function () {
//   test("works for admins", async function () {
//     const resp = await request(app)
//         .get("/users")
        
//     expect(resp.body).toEqual({
//       users: [
//         {
//           username: "u1",
//         },
//         {
//           username: "u2",
//         },
//         {
//           username: "u3",  
//         },
//       ],
//     });
//   });

//   test("unauth for non-admin users", async function () {
//     const resp = await request(app)
//         .get("/users")
//         .set("authorization", `Bearer ${u1Token}`);
//     expect(resp.statusCode).toEqual(401);
//   });

//   test("unauth for anon", async function () {
//     const resp = await request(app)
//         .get("/users");
//     expect(resp.statusCode).toEqual(401);
//   });



// /************************************** GET /users/:username */

// describe("GET /users/:username", function () {

//   test("works for same user", async function () {
//     const resp = await request(app)
//         .get(`/users/u1`)
//         .set("authorization", `Bearer ${u1Token}`);
//     expect(resp.body).toEqual({
//       user: {
//         username: "u1",
//       },
//     });
//   });

//   test("unauth for other users", async function () {
//     const resp = await request(app)
//         .get(`/users/u1`)
//         .set("authorization", `Bearer ${u2Token}`);
//     expect(resp.statusCode).toEqual(401);
//   });

//   test("unauth for anon", async function () {
//     const resp = await request(app)
//         .get(`/users/u1`);
//     expect(resp.statusCode).toEqual(401);
//   });


// });

