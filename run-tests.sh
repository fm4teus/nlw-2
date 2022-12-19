#!/bin/bash
./clear-database.sh

python3 acceptance-test/create.py 

./clear-database.sh

python3 acceptance-test/filter.py 

cd server && npm run test && cd .. 

./clear-database.sh