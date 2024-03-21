const mongooseToSwagger = require('mongoose-to-swagger')
const User = require('./models/user.model')
const Product = require('./models/product.model')

exports.options = {
    "components": {
        "schemas": {
            User: mongooseToSwagger(User),   // Mongoose to swagger gia to schema User
            Product: mongooseToSwagger(Product)
        }
    },
    "openapi": "3.1.0",
    "info": {
        "version": "1.0.0",
        "title": "Products CRUD API",
        "description": "Products project application",
        "contact": {
            "name": "API Support",
            "url": "http://www.example.com",
            "email": "email@email.com"
        }
    },
    "servers": [
        {
            url: "http://localhost:3000",
            description: "local server"
        },
        {
            url: "http://www.example.com",
            description: "Testing server"
        }
    ],
    "tags": [
        {
            "name": "Users",
            "description": "API endpoint for users",
        },
        {
            "name": "Products",
            "description": "API endpoint for products"
        },
        {
            "name": "Users and Products",
            "description": "API endpoint for users and their products"
        }
    ],
    // Dhmiourgisame ta modela mas, tora tis kliseis mas/ SWAGGER LIB: Ta models pou exo me mongoose ta pernaei se JSON
    "paths": {
        "/api/users": {
            "get": {
                "tags": ["Users"],
                "description": "Returns all users",
                "responses": {
                    "200": {
                        "description": "A list of users",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "array",
                                    "items": {
                                        "$ref": "#/components/schemas/User"  // Auta ppu tha periexontai ikanopioun to schema User
                                    }
                                }
                            }
                        }
                    }

                }
            }
        },
        "/api/users/{username}": {     // {} Path Param
            "get": {
                "tags": ["Users"],
                "parameters": [
                    {
                        "name": "username",
                        "in": "path",
                        "required": true,
                        "description": "Username of user that we want to find",
                        "type": "string"
                    }
                ],
                "description": "Get user with specific username",
                "responses": {
                    "200": {
                        "description": "User to find",
                        "schema": {
                            "$ref": "#/components/schemas/User"
                        }
                    }
                }
            },
            "post":{
                "tags": ["Users"],
                "description":"Create new user",
                "requestBody":{
                  "description":"User schema to insert",
                  "content":{
                    "application/json":{
                      "schema":{
                        "type":"object",
                        "properties":{
                          "username": {"type":"string"},
                          "password": {"type":"string"},
                          "name": {"type":"string"},
                          "surname": {"type":"string"},
                          "email": {"type":"string"},
                          "address": {
                            "type":"object",
                            "properties":{
                              "area": {"type":"string"},
                              "road": {"type":"string"}
                            }
                          },
                          "phone":{
                            "type":"array",
                            "items":{
                              "type":"object",
                              "properties":{
                                "type": {"type":"string"},
                                "number": {"type":"string"}
                              }
                            }
                          }
                        },
                        "required":["username", "password","email"]
                      }
                    }
                  }
                },
                "responses":{
                  "200":{
                    "description": "New user inserted"
                    }
                }
            },
            "patch":{
                "tags":[ "Users" ],
                "description":"Update user in app",
                "parameters":[
                  {
                    "name":"username",
                    "in":"path",
                    "required":true,
                    "description":"Username of user to update",
                    "type":"string"
                  },
                ],
                "requestBody":{
                  "description": "User that we update",
                  "content":{
                    "application/json":{
                      "schema":{
                        "type":"object",
                        "properties":{
                          "username": {"type":"string"},
                          "name": {"type":"string"},
                          "surname":{"type":"string"},
                          "email": {"type": "string"},
                          "address": {
                            "type":"object",
                            "properties":{
                              "area": {"type":"string"},
                              "road": {"type":"string"}
                            }
                          },
                          "phone":{
                            "type":"array",
                            "items":{
                              "type":"object",
                              "properties":{
                                "type": {"type":"string"},
                                "number": {"type":"string"}
                              }
                            }
                          }
                        },
                        "required":["email"]
                      }
                    }
                  }
                },
                "responses":{
                  "200": {
                    "description": "Update user",
                    "schema":{
                      "$ref": "#/components/schemas/User"
                    }
                  }
                }
            },
            "delete": {
                "tags":["Users"],
                "description": "Delete a user",
                "parameter": [
                    {
                        "name": "username",
                        "in": "path",
                        "description": "User to delete",
                        "type": "string"

                    },
                ],
                "responses":{
                    "200": {
                      "description": "Delete user"
                    }
                }
            }
        }
    }
}