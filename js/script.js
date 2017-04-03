function calculate(str){
  var parenthesis = /(.+)?\(([^\)]+)\)(.+)?/.exec(str)
  var exponent = /((?:-?\d+(?:\.\d+)?(?:\+|-|\*|\/))*)(-?\d+(?:\.\d+)?)(\^)(-?\d+(?:\.\d+)?)(.+)?/.exec(str)
  var divMul = /((?:-?\d+(?:\.\d+)?(?:\+|-|\*|\/))*)(-?\d+(?:\.\d+)?)(\*|\/)(-?\d+(?:\.\d+)?)(.+)?/.exec(str)
  var addSubs = /(-?\d+(?:\.\d+)?)(-|\+)(-?\d+(?:\.\d+)?)(.+)?/.exec(str)
  console.log(str)

  if(divMul === null && addSubs === null && parenthesis === null && exponent === null){
    return str
  }
  else{
    if(parenthesis){
      console.log(parenthesis)
      console.log("()")
      if(parenthesis[1] && parenthesis[3]){
        return calculate(parenthesis[1] + calculate(parenthesis[2]) + parenthesis[3])
      }
      else if(parenthesis[1]){
        return calculate(parenthesis[1] + calculate(parenthesis[2]))
      }
      else if(parenthesis[3]){
        return calculate(calculate(parenthesis[2]) + parenthesis[3])
      }
      else{
        return calculate(parenthesis[2])
      }
    }
    else if(exponent){
      console.log(exponent)
      console.log("^")
      var result = Math.pow(parseFloat(exponent[2]), parseFloat(exponent[4]))

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

var inputEmpty = false;
window.onkeyup = function(key){
  if(key.keyCode < 106 && key.keyCode > 95){
    var keycode = key.keyCode - 48;
  }
  else{
    var keycode = key.keyCode;
  }
  if(keycode == 13){
    document.getElementById("currentNumber").innerHTML = calculate(document.getElementById("fullOperation").innerHTML);
    document.getElementById("fullOperation").innerHTML = calculate(document.getElementById("fullOperation").innerHTML);
    document.getElementById("fullOperation").style.display = "none";
    document.getElementById("keyboard").value = "";
    inputEmpty = true;
  }
  if(keycode == 27){
    document.getElementById("currentNumber").innerHTML = "";
    document.getElementById("fullOperation").innerHTML = "";
  }
}
window.onkeydown = function(key){
  if(key.keyCode == 8){
    return false;
  }
}
function operation(character){
  if(parseFloat(character) >= 0 && parseFloat(character) < 10 || character == "."){
    if(inputEmpty){
      document.getElementById("currentNumber").innerHTML = "";
      document.getElementById("fullOperation").innerHTML = "";
    }
    inputEmpty = false;
    document.getElementById("currentNumber").innerHTML += character;
    document.getElementById("fullOperation").innerHTML += character;
  }
  if(character == "+"){
    inputEmpty = false;
    document.getElementById("currentNumber").innerHTML = "";
    document.getElementById("fullOperation").innerHTML += "+";
    document.getElementById("fullOperation").style.display = "block";
  }
  if(character == "-"){
    inputEmpty = false;
    document.getElementById("currentNumber").innerHTML = "";
    document.getElementById("fullOperation").innerHTML += "-";
    document.getElementById("fullOperation").style.display = "block";
  }
  if(character == "*"){
    inputEmpty = false;
    document.getElementById("currentNumber").innerHTML = "";
    document.getElementById("fullOperation").innerHTML += "*";
    document.getElementById("fullOperation").style.display = "block";
  }
  if(character == "/"){
    inputEmpty = false;
    document.getElementById("currentNumber").innerHTML = "";
    document.getElementById("fullOperation").innerHTML += "/";
    document.getElementById("fullOperation").style.display = "block";
  }
  if(character == "^"){
    inputEmpty = false;
    document.getElementById("currentNumber").innerHTML = "";
    document.getElementById("fullOperation").innerHTML += "^";
    document.getElementById("fullOperation").style.display = "block";
  }
  if(character == "("){
    inputEmpty = false;
    document.getElementById("currentNumber").innerHTML = "";
    document.getElementById("fullOperation").innerHTML += "(";
    document.getElementById("fullOperation").style.display = "block";
  }
  if(character == ")"){
    inputEmpty = false;
    document.getElementById("currentNumber").innerHTML = "";
    document.getElementById("fullOperation").innerHTML += ")";
    document.getElementById("fullOperation").style.display = "block";
  }
  if(character == "="){
    document.getElementById("currentNumber").innerHTML = calculate(document.getElementById("fullOperation").innerHTML);
    document.getElementById("fullOperation").innerHTML = calculate(document.getElementById("fullOperation").innerHTML);
    document.getElementById("fullOperation").style.display = "none";
    document.getElementById("keyboard").value = "";
    inputEmpty = true;
  }
}
function input(){
  var string = document.getElementById("keyboard").value;
  operation(string[string.length - 1])

}

window.onload = function(){
  var options = document.getElementsByClassName("options");

  for(var i = 0; i < options.length; i++){
    options[i].onclick = function(){
      operation(this.innerHTML);
    }
  }
}
