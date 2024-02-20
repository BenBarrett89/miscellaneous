// Error Interface

type MyErrorType = string;

type MyErrorField = string;

interface MyErrorInterface {
  type: MyErrorType;
  field: MyErrorField;
  handleErrorLink: (arg0: MyErrorInterface, arg1: number) => () => void;
}

// just a helper class to extend to save code duplication
class MyError {
  public type: MyErrorType;
  public field: MyErrorField;

  constructor(type: MyErrorType, field: MyErrorField) {
    this.type = type;
    this.field = field;
  }
}

// Error 1 - no overrides (but implements the interface)

class ErrorOne extends MyError implements MyErrorInterface {
  public handleErrorLink (error: MyErrorInterface, index: number) {
    return () => {
      console.log(`handled the ${error.type} error on the ${error.field}`);
    };
  };
}

// Error 2 - overrides the type and field and adds it's own fields (and implements the interface)

enum Error2Type {
  MISSING_SOMETHING = 'missing_something',
}

enum Error2Field {
  TITLE = 'title',
}

class ErrorTwo extends MyError {
  private something: string;

  /**
   * Creates an Error Two error
   * @param type {string} the type of the error - this must be from the given enum overriding the original
   * @param field the field that the error applies to
   * @param something this error's specific something that only applies to error twos
   */
  constructor(type: Error2Type, field: Error2Field, something: string) {
    // notice the overridden types
    super(type, field);
    this.something = something;
  }

  /**
   * Gets the error's additional something (string) - could be indices for example
   * @returns {string} something - this error's something
   */ 
  public getSomething (): string {
    return this.something;
  }

  public handleErrorLink (error: MyErrorInterface, index: number) {
    return () => {
      console.log(`${error.type} error was handled for the ${error.field} in my own way`);
    };
  };
}

const logTypeAndField = (error: MyErrorInterface) => {
  console.log(error.type, error.field);
};

const error1 = new ErrorOne('type 1', 'field 1');
const error2 = new ErrorTwo(Error2Type.MISSING_SOMETHING, Error2Field.TITLE, 'my something');
// note that you cannot create an ErrorTwo with a type that isn't from the enum, or a field that isn't from the enum
// const error2Invalid = new ErrorTwo('something not in the enum', 'something not in the enum', 'something'); // is invalid

logTypeAndField(error1);
logTypeAndField(error2); // even though the type and field have been overridden in ErrorTwo, this should still work

console.log(error2.getSomething());
