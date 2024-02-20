type MyErrorType = string;

type MyErrorField = string;

interface MyErrorInterface {
  type: MyErrorType;
  field: MyErrorField;
  handleErrorLink: (arg0: MyError, arg1: number) => () => void;
}

class MyError {
  public type: MyErrorType;
  public field: MyErrorField;

  constructor(type: MyErrorType, field: MyErrorField) {
    this.type = type;
    this.field = field;
  }
}

class ErrorOne extends MyError implements MyErrorInterface {
  public handleErrorLink (error: MyError, index: number) {
    return () => console.log('handled it');
  };
}

enum Error2Type {
  MISSING_SOMETHING = 'missing_something',
}

enum Error2Field {
  TITLE = 'title',
}

class ErrorTwo extends MyError implements MyErrorInterface {
  private something: string;

  /**
   * Creates an Error Two error
   * @param type {string} the type of the error - this must be from the given enum overriding the original
   * @param field the field that the error applies to
   * @param something this error's specific something that only applies to error twos
   */
  constructor(type: Error2Type, field: Error2Field, something: string) {
    // notice the overridden type 
    super(type, field);
    this.something = something;
  }

  /**
   * Gets the error's additional something (string) - could be indices for example
   * @returns {string} something - this error's something
   */ 
  public getSomething () {
    return this.something;
  }

  public handleErrorLink (error: MyError, index: number) {
    return () => console.log('handled it or whatever');
  };
}

const logTypeAndField = (error: MyError) => {
  console.log(error.type, error.field);
};

const error1 = new ErrorOne('type 1', 'field 1');
const error2 = new ErrorTwo(Error2Type.MISSING_SOMETHING, Error2Field.TITLE, 'my something');
// note that you cannot create an ErrorTwo with a type that isn't from the enum, or a field that isn't from the enum

logTypeAndField(error1);
logTypeAndField(error2);   // even though the type has been overridden in ErrorTwo, this should still work

console.log(error2.getSomething());
