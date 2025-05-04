//Create a Student interface with the following properties:
interface Student {
    id: number;
    name: string;
    age: number;
    grades: number[];
}

//Create a function calculateAverageGrade that:
const calculateAverageGrade = (students: Student[]): number => {
    const totalGrades = students.reduce((sum, student) => sum + student.grades.reduce((acc, grade) => acc + grade, 0), 0);
    const totalSubjects = students.reduce((count, student) => count + student.grades.length, 0);
    return totalGrades / totalSubjects;
};

//Create an enum GradeLevel with values:

enum GradeLevel {
    FRESHMAN = "FRESHMAN",
    SOPHOMORE = "SOPHOMORE",
    JUNIOR = "JUNIOR",
    SENIOR = "SENIOR"
}

//Create a function getGradeLevel that:

const getGradeLevel = (age: number): GradeLevel => {
    return (age >= 14 && age <= 15) ? GradeLevel.FRESHMAN as GradeLevel :
           (age >= 16 && age <= 17) ? GradeLevel.SOPHOMORE as GradeLevel :
           (age === 18) ? GradeLevel.JUNIOR as GradeLevel :
           GradeLevel.SENIOR as GradeLevel;
};
