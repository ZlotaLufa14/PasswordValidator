const PasswordValidator = require("./PasswordValidator");

describe("PasswordValidator", () => {
  let validator;

  beforeEach(() => {
    validator = new PasswordValidator();
  });

  describe("hasMinLength()", () => {
    test("powinien zwrócić true, gdy hasło ma dokładnie 8 znaków", () => {
      expect(validator.hasMinLength("Abcdef1!")).toBe(true);
    });

    test("powinien zwrócić true, gdy hasło ma więcej niż 8 znaków", () => {
      expect(validator.hasMinLength("BardzoDlugieHaslo1!")).toBe(true);
    });

    test("powinien zwrócić false, gdy hasło ma mniej niż 8 znaków", () => {
      expect(validator.hasMinLength("Abcd1!")).toBe(false);
    });
  });

  describe("hasUpperCase()", () => {
    test("powinien zwrócić true, gdy hasło zawiera wielką literę", () => {
      expect(validator.hasUpperCase("hasloZduza")).toBe(true);
    });

    test("powinien zwrócić false, gdy hasło nie zawiera wielkiej litery", () => {
      expect(validator.hasUpperCase("haslobezduzej1!")).toBe(false);
    });
  });

  describe("hasLowerCase()", () => {
    test("powinien zwrócić true, gdy hasło zawiera małą literę", () => {
      expect(validator.hasLowerCase("HASLOZmala")).toBe(true);
    });

    test("powinien zwrócić false, gdy hasło nie zawiera małej litery", () => {
      expect(validator.hasLowerCase("TYLKODUZE1!")).toBe(false);
    });
  });

  describe("hasDigit()", () => {
    test("powinien zwrócić true, gdy hasło zawiera cyfrę", () => {
      expect(validator.hasDigit("Haslo1")).toBe(true);
    });

    test("powinien zwrócić false, gdy hasło nie zawiera cyfry", () => {
      expect(validator.hasDigit("HasloBezCyfry!")).toBe(false);
    });
  });

  describe("hasSpecialChar()", () => {
    test("powinien zwrócić true, gdy hasło zawiera znak specjalny", () => {
      expect(validator.hasSpecialChar("Haslo1!")).toBe(true);
      expect(validator.hasSpecialChar("Haslo1@")).toBe(true);
      expect(validator.hasSpecialChar("Haslo1#")).toBe(true);
    });

    test("powinien zwrócić false, gdy hasło nie zawiera znaku specjalnego", () => {
      expect(validator.hasSpecialChar("HasloBezZnaku1")).toBe(false);
    });
  });

  describe("hasNoWhitespace()", () => {
    test("powinien zwrócić true, gdy hasło nie zawiera białych znaków", () => {
      expect(validator.hasNoWhitespace("PoprawneHaslo1!")).toBe(true);
    });

    test("powinien zwrócić false, gdy hasło zawiera spację", () => {
      expect(validator.hasNoWhitespace("Haslo ze spacja1!")).toBe(false);
    });
  });

  describe("validate()", () => {
    test("powinien zwrócić true dla hasła spełniającego wszystkie wymagania", () => {
      expect(validator.validate("SilneHaslo1!")).toBe(true);
    });

    test("powinien zwrócić false, gdy brakuje któregokolwiek z wymogów", () => {
      expect(validator.validate("Krotk1!")).toBe(false);          // za krótkie
      expect(validator.validate("bezduzej1!")).toBe(false);       // brak wielkiej litery
      expect(validator.validate("BEZMALEJ1!")).toBe(false);       // brak małej litery
      expect(validator.validate("BezCyfry!!")).toBe(false);       // brak cyfry
      expect(validator.validate("BezZnaku12")).toBe(false);       // brak znaku specjalnego
      expect(validator.validate("Ze Spacja1!")).toBe(false);      // biały znak
    });

    test("powinien odrzucić (zwrócić false lub rzucić błąd), gdy parametr nie jest typu string", () => {
      expect(() => validator.validate(12345678)).toThrow("Hasło musi być ciągiem znaków (string).");
      expect(() => validator.validate(null)).toThrow("Hasło musi być ciągiem znaków (string).");
      expect(() => validator.validate(undefined)).toThrow("Hasło musi być ciągiem znaków (string).");
      expect(() => validator.validate({})).toThrow("Hasło musi być ciągiem znaków (string).");
    });
  });
});