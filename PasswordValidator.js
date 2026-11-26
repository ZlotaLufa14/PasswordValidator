class PasswordValidator {
  hasMinLength(password) {
    if (password.length >= 8) {
      return true;
    } else {
      return false;
    }
  }

  hasUpperCase(password) {
    for (let i = 0; i < password.length; i++) {
      let char = password[i];
      if (char >= "A" && char <= "Z") {
        return true;
      }
    }
    return false;
  }

  hasLowerCase(password) {
    for (let i = 0; i < password.length; i++) {
      let char = password[i];
      if (char >= "a" && char <= "z") {
        return true;
      }
    }
    return false;
  }

  hasDigit(password) {
    for (let i = 0; i < password.length; i++) {
      let char = password[i];
      if (char >= "0" && char <= "9") {
        return true;
      }
    }
    return false;
  }

  hasSpecialChar(password) {
    let specialChars = "!@#$%^&*()_+-=[]{};':\"\\|,.<>/?`~";

    for (let i = 0; i < password.length; i++) {
      for (let j = 0; j < specialChars.length; j++) {
        if (password[i] === specialChars[j]) {
          return true;
        }
      }
    }
    return false;
  }

  hasNoWhitespace(password) {
    for (let i = 0; i < password.length; i++) {
      if (password[i] === " ") {
        return false; 
      }
    }
    return true; 
  }

  validate(password) {
    if (typeof password !== "string") {
      throw new Error("Hasło musi być ciągiem znaków (string).");
    }

    return (
      this.hasMinLength(password) &&
      this.hasUpperCase(password) &&
      this.hasLowerCase(password) &&
      this.hasDigit(password) &&
      this.hasSpecialChar(password) &&
      this.hasNoWhitespace(password)
    );
  }
}

module.exports = PasswordValidator;
