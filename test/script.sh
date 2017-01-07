#!/bin/sh

for f in SBOL2/*
do
  echo $f
  node ReadWriteTestlibSBOL.js $PWD/$f 
  echo 
done
