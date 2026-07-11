export class Student {
  name: string;
  age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  greet(courseName: string) {
    console.log(
      `Hi and welcome ${this.name}! Glad to have you here in this ${courseName}`,
    );
  }
}