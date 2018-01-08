#!/bin/sh

ERROR=0

for f in SBOLTestSuite/SBOL2/*
do
  echo "Testing "$f
  validation_result=$(node ReadWriteTestlibSBOL.js $PWD/$f)
  if [[ $validation_result == "" ]]
  then
      echo "   Successful!"
  else
      echo "    Failed."
      echo "$validation_result"
      ERROR=1
  fi
done

exit $ERROR
