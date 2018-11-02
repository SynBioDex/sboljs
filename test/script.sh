#!/bin/bash

for f in SBOLTestSuite/SBOL2*/*
do
  echo "Testing "$f
  validation_result=$(node ReadWriteTestlibSBOL.js $PWD/$f);
  if [[ $validation_result != "" ]]; then
      # Not sure why this does not work, new lines are lost
      # echo $validation_result
      node ReadWriteTestlibSBOL.js $PWD/$f;
      echo "   Failure!"
      if [[ $f != "SBOLTestSuite/SBOL2_nc/SBOL1and2Test.xml" &&
	    $f != "SBOLTestSuite/SBOL2/pIKE_pTAK_cassettes_2.xml" &&
	    $f != "SBOLTestSuite/SBOL2_nc/pIKE_pTAK_cassettes_2_orig.xml" &&
	    $f != "SBOLTestSuite/SBOL2_nc/pIKE_pTAK_toggle_switches_orig.xml" &&
	    $f != "SBOLTestSuite/SBOL2/manifest" &&
	    $f != "SBOLTestSuite/SBOL2_bp/manifest" &&
	    $f != "SBOLTestSuite/SBOL2_ic/manifest" &&
	    $f != "SBOLTestSuite/SBOL2_nc/manifest" 
         ]]; then
          echo "   New Failure!"
          exit 1;
      fi
  else echo "   Successful!"; fi
done
