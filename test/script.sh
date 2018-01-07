#!/bin/sh

for f in SBOLTestSuite/SBOL2/*
do
  echo "Testing "$f
  validation_result=$(node ReadWriteTestlibSBOL.js $PWD/$f);
  if [[ $validation_result != "Validation successful, no errors." ]]; then
      echo $validation_result;
      exit 1;
  else echo "   Successful!"; fi
done
