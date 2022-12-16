export default class Validation {
  checkTring(data, id, min, max,strongRegex, messRong, messCString, messRegex) {
    if (data === "") {
      document.getElementById(id).style.display = "block";
      document.getElementById(id).innerHTML = messRong;
      return false;
    }
    else if (!(data.trim().length > min && data.trim().length < max)) {
      document.getElementById(id).innerHTML = messCString;
      document.getElementById(id).style.display = "block";
      console.log("1");
      return false;
    }
    else {
      if (data.match(strongRegex)) {
        document.getElementById(id).style.display = "none";
        document.getElementById(id).innerHTML = "";
        return true;
      }
      else {
        document.getElementById(id).style.display = "block";
        document.getElementById(id).innerHTML = messRegex;
        return false;
      }
    }
  }
  checkSelec(data, id, mess) {
    if (data <= 0) {
      document.getElementById(id).style.display = "block";
      document.getElementById(id).innerHTML = mess;
    return false;
    }
    else {
      document.getElementById(id).style.display = "none";
      document.getElementById(id).innerHTML = "";
      return true;

    }

  }
}
