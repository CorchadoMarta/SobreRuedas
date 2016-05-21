#!/bin/sh

mongo autoescuela --eval 'db.usuarios.update({ nombre: "profesor" }, {$set :{role: "profesor"}})'

mongo autoescuela --eval 'db.usuarios.update({ nombre: "admin" }, {$set :{role: "admin"}})'
