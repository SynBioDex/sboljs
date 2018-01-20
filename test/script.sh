#!/bin/bash

for f in SBOLTestSuite/SBOL2/*
do
  echo "Testing "$f
  validation_result=$(node ReadWriteTestlibSBOL.js $PWD/$f);
  if [[ $validation_result != "" ]]; then
      # Not sure why this does not work, new lines are lost
      # echo $validation_result
      node ReadWriteTestlibSBOL.js $PWD/$f;
      echo "   Failure!"
      if [[ $f != "SBOLTestSuite/SBOL2/SBOL1and2Test.xml" &&
            $f != "SBOLTestSuite/SBOL2/design-build-test-learn.xml" &&
	    $f != "SBOLTestSuite/SBOL2/pIKE_pTAK_cassettes 2.xml" &&
	    $f != "SBOLTestSuite/SBOL2/pIKE_pTAK_cassettes 2_orig.xml" &&
	    $f != "SBOLTestSuite/SBOL2/SBOL1and2Test.xml" &&
	    $f != "SBOLTestSuite/SBOL2/pIKE_pTAK_toggle_switches_orig.xml" 
         ]]; then
          echo "   New Failure!"
          exit 1;
      fi
  else echo "   Successful!"; fi
done
