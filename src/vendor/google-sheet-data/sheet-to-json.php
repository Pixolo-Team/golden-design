<?php
require 'structure.php';


// CODE TO ADD FINAL STRUCTURE TO JSON FILE
// $fp = fopen('results.json', 'w');
// fwrite($fp, json_encode(getClientJson($sheetData)));
// fclose($fp);

// print_r(getClientJson($sheetData));

$sheetValues = [];
$y = 0;
$x=0;
$count=0;
$json=new stdClass();
$currentKey="";
$parentKeys=array();
$tempJson=new stdClass();

// print_r(json_encode(getClientJson($sheetData)));


// FUNCTION TO CONVERT UNSTRUCTURED EXCEL SHEET DATA INTO STRUCTURED DATA
function getDataJson($values){   
    global $sheetValues,$y,$structure,$json,$currentKey,$keyName;
    $sheetValues=$values;
    // print_r($sheetValues);
    $y = 0;
    $json=new stdClass();
   // This is outer loop of main keys
    while($y< count($sheetValues)){
        // Check if first element is not empty 
            if($sheetValues[$y] && $sheetValues[$y][0]!="" && count($sheetValues[$y])>0){ // This is the main key
                if($sheetValues[$y][1] == '1'){
                    $currentKey=transformStringToKey($sheetValues[$y][0]);
                    $json->$currentKey=checkKeyAndGetType($structure,$currentKey);
                }
             //   echo "</br>MERA I VALUE ".$i;
             }
             $y++;
        
    }
    return $json; 
}


// FUNCTION TO CHECK KEY AND ITS TYPE
function checkKeyAndGetType($currentObj,$currentKey){
    global $sheetValues,$y,$x,$json,$parentKeys;
    // print_r($currentObj);
    if(isset($currentObj->$currentKey)){ // If key exists        
        $type=gettype($currentObj->$currentKey);
    //   echo "</br>TYPE KYA BE ".$type;
        // $fnEnded=false;
        switch($type){
            case "string":
                return getString();
                // $fnEnded=true;
            case "object":
                // echo 'object';
               return getObject($currentObj->$currentKey);
             case "array":
                // echo 'array';
                 return checkAndGetArray($currentObj->$currentKey);
        }
    }    
    return true;
}

// FUNCTION TO TRANSFROM STRING TO PROPER KEY
function transformStringToKey($string)
{
    $key = $string;
    $key = strtolower($key); // Make it lower case
    $key = str_replace(" ", "_", $key); // replace space to _
    return $key;
}

// FUNCTION TO GET STRING ARRAY
function getStringArray(){
    $array= array();
    global $sheetValues,$y,$x;
    for($i=$x;$i<count($sheetValues[$y]);$i++){
        if($sheetValues[$y][$i]){
            array_push($array,$sheetValues[$y][$i]);
        }
    }
    return $array;
}


// FUNCTION TO GET PROPER STRUCTURED ARRAY OF OBJECT FROM KEY
function funarrayobject(){
    $array=array();
    global $sheetValues,$y,$x;
    $objectKeys=funarraystring();
    // echo "</br>OBJECT KEYS ";
    // print_r($objectKeys);
    $index=getFirstNonEmptyValueIndex($sheetValues[$y+1]);
    while($index>=$x && $y<count($sheetValues)){
          $y++;
          $obj=new stdClass();
          for($i=$x,$keyIndex=0;$i<count($sheetValues[$y]);$i++,$keyIndex++){
                $obj->{$objectKeys[$keyIndex]}=$sheetValues[$y][$i];
          }
          array_push($array,$obj);
           $index=getFirstNonEmptyValueIndex($sheetValues[$y+1]);
      }
    return $array;
}


// FUNCTION TO GET PROPER STRUCTURED ARRAY FROM KEY
function checkKeyTypeGetArray($currentObject,$x){
    $array=array();
    global $sheetValues,$y,$parentKeys,$currentKey,$json;
    $index=getFirstNonEmptyValueIndex($sheetValues[$y+1]);
    $objectKeys=getStringArray();
    while($index>=$x && $y<count($sheetValues)){
          $y++;
          $obj=new stdClass();
          for($i=$index,$keyIndex=0;$i<count($sheetValues[$y]);$i++,$keyIndex++){
              $keyType=gettype($currentObject[0]->{$objectKeys[$keyIndex]});
            //   echo "</br>key TYPE ".$keyType." AND KEY ".$objectKeys[$keyIndex];
              if($keyType=="string"){
                $obj->{$objectKeys[$keyIndex]}=$sheetValues[$y][$i];
              }else if($keyType=="array"){
                  if($sheetValues[$y][$i]=="1"){
                    // $y++;
                    // $x=$i-1;
                    // print_r($currentObject[0]->{$objectKeys[$keyIndex]});
                       $obj->{$objectKeys[$keyIndex]}=checkAndGetArray($currentObject[0]->{$objectKeys[$keyIndex]});
                  }else{
                      $obj->{$objectKeys[$keyIndex]}=array();
                  }              }          }
          array_push($array,$obj);
        if(($y+1) < count($sheetValues)){
            $index=getFirstNonEmptyValueIndex($sheetValues[$y+1]);
          }
          
      }
    return $array;
}

// FUNCTION TO GET ARRAY
function checkAndGetArray($currentObject){
    global $sheetValues,$x,$y,$parentKeys,$currentKey,$json;
    $x++;
    $tempArray=array();
    // print_r($sheetValues[$y]);
    // print_r($sheetValues[$y][$x]);
    // if($sheetValues[$y][$x]=="1"){
        $y++;
        $arrayElementType=gettype($currentObject[0]);
        if($arrayElementType=="string"){
            $tempArray= getStringArray();
        }else{
            if($arrayElementType=="object"){
                $tempArray=checkKeyTypeGetArray($currentObject,$x);
            }
        }
    // }
    $x--;
    return $tempArray;
}

function getString()
{
    global $sheetValues,$x,$y;
    // echo 'called';
    // print_r($x);
    $value=$sheetValues[$y][$x+1];
    return $value;
}

function getArrayOfObject()
{
}


// FUNCTION TO GET PROPER STRUCTURED OBJECT FROM KEY
function getObject($currentObj)
{
    global $sheetValues,$x,$y,$parentKeys,$currentKey,$json;
    $x++;
    $tempObject=new stdClass();
    // print_r($sheetValues);
    if($sheetValues[$y][$x]=="1"){
     $index=getFirstNonEmptyValueIndex($sheetValues[$y+1]);
      while($index>=$x && $y<count($sheetValues)){
          $y++;
          $key=transformStringToKey($sheetValues[$y][$x]);        //   echo " </br>Current KEy ".$key;
        //   echo " currentObject ".
        //   print_r($currentObj);
          $tempObject->$key=checkKeyAndGetType($currentObj,$key);
          $index=getFirstNonEmptyValueIndex($sheetValues[$y+1]);
      }
    }    
    $x--;
    // echo "</br>What's my x ".$x." and Y value ".$y." AND NON EMPTY index ".$index;
    return $tempObject;
}

// FUNCTION TO CHECK FIRST NON EMPTY VALUE
function getFirstNonEmptyValueIndex($array){
    $nonEmptyFound=false;
    
    // echo gettype($array);
        for($index=0;$index<count($array);$index++){
            if($array[$index] && $array[$index]!=""){
                $nonEmptyFound=true;
                break;
            }
        }
        // echo $index;
        return $nonEmptyFound?$index:0;
}


function changeParentKey($delta){
    global $parentKeys,$currentKey;
    if($delta<0){
        array_pop($parentKeys);
    }else{
        array_push($parentKeys,$currentKey);
    }
}

?>