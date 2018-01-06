#!/bin/sh

for f in SBOLTestSuite/SBOL2/*
do
  echo "Testing "$f
  if [[ $(node ReadWriteTestlibSBOL.js $PWD/$f) != "Validation successful, no errors." ]]; then
      echo "    Error!";
      exit 1;
  else echo "   Successful!"; fi
done
