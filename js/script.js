// the calculate function will take a mathematical operation as a string and parse it to get the answer
function calculate(str){
  //we use regex to find mathematical expressions in order of operation priority
  var parenthesis = /(.+)?\(([^\)]+)\)(.+)?/.exec(str)
  var exponent = /((?:-?\d+(?:\.\d+)?(?:\+|-|\*|\/))*)(-?\d+(?:\.\d+)?)(\^)(-?\d+(?:\.\d+)?)(.+)?/.exec(str)
  var divMul = /((?:-?\d+(?:\.\d+)?(?:\+|-|\*|\/))*)(-?\d+(?:\.\d+)?)(\*|\/)(-?\d+(?:\.\d+)?)(.+)?/.exec(str)
  var addSubs = /(-?\d+(?:\.\d+)?)(-|\+)(-?\d+(?:\.\d+)?)(.+)?/.exec(str)
  console.log(str)

  //if everything returns null it means the operation is complete or that it isn't a valid mathematical
  //operation, so we return the result
  if(divMul === null && addSubs === null && parenthesis === null && exponent === null){
    return str
  }
  else{
    //if there's a match with the parenthesis expression
    if(parenthesis){
      console.log(parenthesis)
      console.log("()")
      //if there's a match for something before and after the parenthesis
      if(parenthesis[1] && parenthesis[3]){
        //we create a new operation string with what is before and after the parenthesis
        //and the answer of what's inside the parenthesis and recursively call calculate to get
        //the answer of this new operation
        return calculate(parenthesis[1] + calculate(parenthesis[2]) + parenthesis[3])
      }
      //if there's only something before the parenthesis
      else if(parenthesis[1]){
        return calculate(parenthesis[1] + calculate(parenthesis[2]))
      }
      else if(parenthesis[3]){
        return calculate(calculate(parenthesis[2]) + parenthesis[3])
      }
      //if there's nothing before or afther the parenthesis
      else{
        //we just calculate what's inside the parenthesis
        return calculate(parenthesis[2])
      }
    }
    //if there's a match for and exponent
    else if(exponent){
      console.log(exponent)
      console.log("^")
      //we get the result
      var result = Math.pow(parseFloat(exponent[2]), parseFloat(exponent[4]))

      //and create a new operation with what's before and after;
      if(exponent[5] && exponent[1]){
        return calculate(exponent[1] + result.toString() + exponent[5]);
      }
      else if(exponent[5]){
        return calculate(result.toString() + exponent[5]);
      }
      else if(exponent[1]){
        return calculate(exponent[1] + result.toString());
      }
      else{
        return calculate(result.toString());
      }
    }
    else if(divMul && divMul[3] == "*"){
      console.log(divMul)
      console.log("*")
      var result = parseFloat(divMul[2]) * parseFloat(divMul[4])
      if(divMul[5] && divMul[1]){
        return calculate(divMul[1] + result.toString() + divMul[5]);
      }
      else if(divMul[5]){
        return calculate(result.toString() + divMul[5]);
      }
      else if(divMul[1]){
        return calculate(divMul[1] + result.toString());
      }
      else{
        return calculate(result.toString());
      }
    }
    else if(divMul && divMul[3] == "/"){
      console.log(divMul)
      console.log("/")
      var result = parseFloat(divMul[2]) / parseFloat(divMul[4])
      if(divMul[5] && divMul[1]){
        return calculate(divMul[1] + result.toString() + divMul[5]);
      }
      else if(divMul[5]){
        return calculate(result.toString() + divMul[5]);
      }
      else if(divMul[1]){
        return calculate(divMul[1] + result.toString());
      }
      else{
        return calculate(result.toString());
      }
    }
    else if(addSubs && addSubs[2] == "+"){
      console.log(addSubs)
      console.log("+")
      var result = parseFloat(addSubs[1]) + parseFloat(addSubs[3])
      if(addSubs[4]){
        return calculate(result.toString() + addSubs[4]);
      }
      else{
        return calculate(result.toString());
      }
    }
    else if(addSubs && addSubs[2] == "-"){
      console.log(addSubs)
      console.log("-")
      var result = parseFloat(addSubs[1]) - parseFloat(addSubs[3])
      if(addSubs[4]){
        return calculate(result.toString() + addSubs[4]);
      }
      else{
        return calculate(result.toString());
      }
    }
    else{
      console.log("bleh")
    }
  }
}

var inputEmpty = true;
window.onkeyup = function(key){
  if(key.keyCode < 106 && key.keyCode > 95){
    var keycode = key.keyCode - 48;
  }
  else{
    var keycode = key.keyCode;
  }
  //when we press enter we calculate the answer
  if(keycode == 13){
    document.getElementById("currentNumber").innerHTML = calculate(document.getElementById("fullOperation").innerHTML);
    document.getElementById("fullOperation").innerHTML = calculate(document.getElementById("fullOperation").innerHTML);
    document.getElementById("fullOperation").style.opacity = "0";
    document.getElementById("keyboard").value = "";
    inputEmpty = true;
  }
  //when we press esc. we reset the operation
  if(keycode == 27){
    document.getElementById("currentNumber").innerHTML = "0";
    document.getElementById("fullOperation").innerHTML = "0";
  }
}
window.onkeydown = function(key){
  //we use the last character added in an hidden iput to make the operation.
  //when we press backspace the last character added are previous numbers so we need to deactivate it
  if(key.keyCode == 8){
    return false;
  }
}
//the operation function verify if the character to add is valid and add it to the operation
function operation(character){
  var fullOperation = document.getElementById("fullOperation");
  if(parseFloat(character) >= 0 && parseFloat(character) < 10 || character == "."){
    if(inputEmpty){
      document.getElementById("currentNumber").innerHTML = "";
      document.getElementById("fullOperation").innerHTML = "";
    }
    inputEmpty = false;
    if(document.getElementById("fullOperation").innerHTML == "0"){
      document.getElementById("currentNumber").innerHTML = character;
      document.getElementById("fullOperation").innerHTML = character;
    }
    else if(document.getElementById("fullOperation").innerHTML == "-"){
      document.getElementById("currentNumber").innerHTML = character;
      document.getElementById("fullOperation").innerHTML += character;
    }
    else if(document.getElementById("currentNumber").innerHTML == "0"){
      document.getElementById("currentNumber").innerHTML = character;
      document.getElementById("fullOperation").innerHTML += character;
    }
    else{
      document.getElementById("currentNumber").innerHTML += character;
      document.getElementById("fullOperation").innerHTML += character;
    }

  }
  if(character == "+"){
    if(/(-|\+|\*|\/|\^)$/.test(document.getElementById("fullOperation").innerHTML)){
      document.getElementById("fullOperation").innerHTML = fullOperation.innerHTML.slice(0, -1);
    }
    inputEmpty = false;
    if(document.getElementById("fullOperation").innerHTML != "0"){
      document.getElementById("currentNumber").innerHTML = "0";
      document.getElementById("fullOperation").innerHTML += "+";
      document.getElementById("fullOperation").style.opacity = "1";
    }
  }
  if(character == "-"){
    if(/(-|\+|\*|\/|\^)$/.test(document.getElementById("fullOperation").innerHTML)){
      document.getElementById("fullOperation").innerHTML = fullOperation.innerHTML.slice(0, -1);
    }
    inputEmpty = false;
    if(document.getElementById("fullOperation").innerHTML == "0"){
      document.getElementById("currentNumber").innerHTML = "0";
      document.getElementById("fullOperation").innerHTML = "-";
      document.getElementById("fullOperation").style.opacity = "1";
    }
    else{
      document.getElementById("currentNumber").innerHTML = "0";
      document.getElementById("fullOperation").innerHTML += "-";
      document.getElementById("fullOperation").style.opacity = "1";
    }
  }
  if(character == "*"){
    if(/(-|\+|\*|\/|\^)$/.test(document.getElementById("fullOperation").innerHTML)){
      document.getElementById("fullOperation").innerHTML = fullOperation.innerHTML.slice(0, -1);
    }
    inputEmpty = false;
    document.getElementById("currentNumber").innerHTML = "0";
    document.getElementById("fullOperation").innerHTML += "*";
    document.getElementById("fullOperation").style.opacity = "1";
  }
  if(character == "/"){
    if(/(-|\+|\*|\/|\^)$/.test(document.getElementById("fullOperation").innerHTML)){
      document.getElementById("fullOperation").innerHTML = fullOperation.innerHTML.slice(0, -1);
    }
    inputEmpty = false;
    document.getElementById("currentNumber").innerHTML = "0";
    document.getElementById("fullOperation").innerHTML += "/";
    document.getElementById("fullOperation").style.opacity = "1";
  }
  if(character == "^"){
    if(/(-|\+|\*|\/|\^)$/.test(document.getElementById("fullOperation").innerHTML)){
      document.getElementById("fullOperation").innerHTML = fullOperation.innerHTML.slice(0, -1);
    }
    inputEmpty = false;
    document.getElementById("currentNumber").innerHTML = "0";
    document.getElementById("fullOperation").innerHTML += "^";
    document.getElementById("fullOperation").style.opacity = "1";
  }
  if(character == "("){
    inputEmpty = false;
    document.getElementById("currentNumber").innerHTML = "0";
    document.getElementById("fullOperation").innerHTML += "(";
    document.getElementById("fullOperation").style.opacity = "1";
  }
  if(character == ")"){
    inputEmpty = false;
    document.getElementById("currentNumber").innerHTML = "0";
    document.getElementById("fullOperation").innerHTML += ")";
    document.getElementById("fullOperation").style.opacity = "1";
  }
  //if the character is "=" we get the answer
  if(character == "="){
    document.getElementById("currentNumber").innerHTML = calculate(document.getElementById("fullOperation").innerHTML);
    document.getElementById("fullOperation").innerHTML = calculate(document.getElementById("fullOperation").innerHTML);
    document.getElementById("fullOperation").style.opacity = "0";
    document.getElementById("keyboard").value = "";
    inputEmpty = true;
  }
  if(character == "CE"){
    var regex = new RegExp(document.getElementById("currentNumber").innerHTML + "$")
    document.getElementById("fullOperation").innerHTML = document.getElementById("fullOperation").innerHTML.replace(regex, "")
    document.getElementById("currentNumber").innerHTML = "0";
  }
  if(character == "C"){
    document.getElementById("currentNumber").innerHTML = "0";
    document.getElementById("fullOperation").innerHTML = "0";
  }
}
//the input function is called everytime there's something new in the hidden input
function input(){
  //we take the last character typed in the input
  var string = document.getElementById("keyboard").value;
  //and see if it's a valid character to add to the operation
  operation(string[string.length - 1])
}

window.onload = function(){
  //every buttons
  var options = document.getElementsByClassName("options");

  //for every buttons
  for(var i = 0; i < options.length; i++){
    options[i].onclick = function(){
      //we add it to the operation on click
      operation(this.innerHTML);
    }
  }
}
