#!/bin/sh

for f in SBOLTestSuite/SBOL2/*
do
  echo "Testing "$f
  validation_result=$(node ReadWriteTestlibSBOL.js $PWD/$f);
  if [[ $validation_result != "" ]]; then
      echo $validation_result;
      echo "   Failure!"
      if [[ $f != "SBOLTestSuite/SBOL2/SBOL1and2Test.xml" &&
            $f != "SBOLTestSuite/SBOL2/design-build-test-learn.xml" &&
            $f != "SBOLTestSuite/SBOL2/eukaryotic_promoters.xml" &&
            $f != "SBOLTestSuite/SBOL2/eukaryotic_promoters_enumerated.xml" &&
            $f != "SBOLTestSuite/SBOL2/eukaryotic_promoters_sampled.xml" &&
	    $f != "SBOLTestSuite/SBOL2/eukaryotic_transcriptional_unit.xml" &&
	    $f != "SBOLTestSuite/SBOL2/eukaryotic_transcriptional_unit_enumerated.xml" &&
	    $f != "SBOLTestSuite/SBOL2/gfp_reporter_template.xml" &&
	    $f != "SBOLTestSuite/SBOL2/gfp_reporter_template_cds_enumeration.xml" &&
	    $f != "SBOLTestSuite/SBOL2/gfp_reporter_template_enumerated.xml" &&
	    $f != "SBOLTestSuite/SBOL2/gfp_reporter_template_promoter_enumeration.xml" &&
	    $f != "SBOLTestSuite/SBOL2/gfp_reporter_template_sampled.xml" &&
	    $f != "SBOLTestSuite/SBOL2/implementation_example.xml" &&
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
