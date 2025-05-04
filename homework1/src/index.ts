//Create a Student interface with the following properties:
interface Student {
  id: number;
  name: string;
  age: number;
  grades: number[];
}

//Create a function calculateAverageGrade that:
const calculateAverageGrade = (students: Student[]): number => {
  if (students.length === 0) return 0; // Prevent division by zero

  const totalGrades = students.reduce(
    (sum, student) =>
      sum + student.grades.reduce((acc, grade) => acc + grade, 0),
    0
  );
  const totalSubjects = students.reduce(
    (count, student) => count + student.grades.length,
    0
  );

  return totalSubjects === 0 ? 0 : totalGrades / totalSubjects; // Prevent division by zero
};

const students: Student[] = [
  { id: 1, name: "Ane", age: 20, grades: [90, 90, 90] },
  { id: 2, name: "Iko", age: 22, grades: [86, 89, 88] },
  { id: 3, name: "Toni", age: 22, grades: [70, 75, 77] },
];

console.log("Average Grade:", calculateAverageGrade(students));

//Create an enum GradeLevel with values
enum GradeLevel {
  FRESHMAN = "FRESHMAN",
  SOPHOMORE = "SOPHOMORE",
  JUNIOR = "JUNIOR",
  SENIOR = "SENIOR",
}

//Create a function getGradeLevel that:
const getGradeLevel = (age: number): GradeLevel => {
  if (age >= 14 && age <= 15) return GradeLevel.FRESHMAN;
  if (age >= 16 && age <= 17) return GradeLevel.SOPHOMORE;
  if (age >= 18 && age <= 19) return GradeLevel.JUNIOR;
  return GradeLevel.SENIOR; // Default to senior for ages 20+
};

const studentAge = 16;
console.log("Grade Level:", getGradeLevel(studentAge));
