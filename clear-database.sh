#!/bin/bash
sqlite3 server/src/database/database.sqlite "delete from users where id > 3; delete from classes where id > 3; delete from class_schedule where class_id > 3;";