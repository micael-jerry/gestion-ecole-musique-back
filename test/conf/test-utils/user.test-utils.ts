import {
  RoleAdmin,
  RoleManager,
  RoleStudent,
  RoleTeacher,
} from './role.test-utils';
import * as bcrypt from 'bcrypt';
import { UserWithIncluded } from 'src/user/types/user-with-included.type';
import { CourseOne, CourseThree, CourseTwo } from './course.test-utils';

export const UserAdminOne: UserWithIncluded = {
  id: 'user_one_id',
  roleId: RoleAdmin.id,
  firstname: 'Doe',
  lastname: 'John',
  email: 'johndoe@example.com',
  password: bcrypt.hashSync('password123', bcrypt.genSaltSync()),
  address: '123 Main St',
  phone: '0342222222',
  picture: null,
  description: null,
  role: RoleAdmin,
  courses: [],
  isArchive: false,
};

export const UserAdminTwo: UserWithIncluded = {
  id: 'user_two_id',
  roleId: RoleAdmin.id,
  firstname: 'Alice',
  lastname: 'Johnson',
  email: 'alicejohnson@example.com',
  password: bcrypt.hashSync('myPass789', bcrypt.genSaltSync()),
  address: '789 Pine Rd',
  phone: '0344444443',
  picture: null,
  description: null,
  role: RoleAdmin,
  courses: [],
  isArchive: false,
};

export const UserAdminThree: UserWithIncluded = {
  id: 'user_three_id',
  roleId: RoleAdmin.id,
  firstname: 'Chris',
  lastname: 'Evans',
  email: 'chrisevans@example.com',
  password: bcrypt.hashSync('evansPassword', bcrypt.genSaltSync()),
  address: '987 Willow Ln',
  phone: '0346666664',
  picture: null,
  description: null,
  role: RoleAdmin,
  courses: [],
  isArchive: false,
};

export const UserManagerOne: UserWithIncluded = {
  id: 'user_four_id',
  roleId: RoleManager.id,
  firstname: 'Tom',
  lastname: 'Holland',
  email: 'tomholland@example.com',
  password: bcrypt.hashSync('hollandSecurePass', bcrypt.genSaltSync()),
  address: '321 Birch Blvd',
  phone: '0348888885',
  picture: null,
  description: null,
  role: RoleManager,
  courses: [],
  isArchive: false,
};

export const UserManagerTwo: UserWithIncluded = {
  id: 'user_five_id',
  roleId: RoleManager.id,
  firstname: 'Bob',
  lastname: 'Williams',
  email: 'bobwilliams@example.com',
  password: bcrypt.hashSync('passWord321', bcrypt.genSaltSync()),
  address: '321 Cedar St',
  phone: '0345555556',
  picture: null,
  description: null,
  role: RoleManager,
  courses: [],
  isArchive: false,
};

export const UserManagerThree: UserWithIncluded = {
  id: 'user_six_id',
  roleId: RoleManager.id,
  firstname: 'Natalie',
  lastname: 'Portman',
  email: 'natalieportman@example.com',
  password: bcrypt.hashSync('nataliePass123', bcrypt.genSaltSync()),
  address: '654 Maple Dr',
  phone: '0347777777',
  picture: null,
  description: null,
  role: RoleManager,
  courses: [],
  isArchive: false,
};

export const UserStudentOne: UserWithIncluded = {
  id: 'user_seven_id',
  roleId: RoleStudent.id,
  firstname: 'Emily',
  lastname: 'Clark',
  email: 'emilyclark@example.com',
  password: bcrypt.hashSync('alicePass123', bcrypt.genSaltSync()),
  address: '123 Elm St',
  phone: '0348888888',
  picture: null,
  description: 'Passionnée de musique et d’art.',
  role: RoleStudent,
  courses: [CourseOne, CourseTwo],
  isArchive: false,
};

export const UserStudentTwo: UserWithIncluded = {
  id: 'user_eight_id',
  roleId: RoleStudent.id,
  firstname: 'Michael',
  lastname: 'Smith',
  email: 'michaelsmith@example.com',
  password: bcrypt.hashSync('bobPass123', bcrypt.genSaltSync()),
  address: '234 Oak St',
  phone: '0349999999',
  picture: null,
  description: 'Amateur de jazz et de guitare.',
  role: RoleStudent,
  courses: [CourseOne, CourseTwo],
  isArchive: false,
};

export const UserStudentThree: UserWithIncluded = {
  id: 'user_nine_id',
  roleId: RoleStudent.id,
  firstname: 'Charlie',
  lastname: 'Brown',
  email: 'charliebrown@example.com',
  password: bcrypt.hashSync('charliePass123', bcrypt.genSaltSync()),
  address: '345 Pine St',
  phone: '0350000000',
  picture: null,
  description: 'Futur compositeur avec un grand rêve.',
  role: RoleStudent,
  courses: [CourseOne, CourseTwo],
  isArchive: false,
};

export const UserStudentFour: UserWithIncluded = {
  id: 'user_ten_id',
  roleId: RoleStudent.id,
  firstname: 'Diana',
  lastname: 'Prince',
  email: 'dianaprince@example.com',
  password: bcrypt.hashSync('dianaPass123', bcrypt.genSaltSync()),
  address: '456 Cedar St',
  phone: '0351111111',
  picture: null,
  description: 'Passionnée par les arts martiaux et la musique.',
  role: RoleStudent,
  courses: [CourseOne],
  isArchive: false,
};

export const UserStudentFive: UserWithIncluded = {
  id: 'user_eleven_id',
  roleId: RoleStudent.id,
  firstname: 'Oliver',
  lastname: 'Twist',
  email: 'olivertwist@example.com',
  password: bcrypt.hashSync('oliverPass789', bcrypt.genSaltSync()),
  address: '345 Pine St',
  phone: '0358888888',
  picture: null,
  description: 'Jeune artiste, passionné de théâtre et de musique.',
  role: RoleStudent,
  courses: [CourseOne],
  isArchive: false,
};

export const UserStudentSix: UserWithIncluded = {
  id: 'user_twelve_id',
  roleId: RoleStudent.id,
  firstname: 'Fiona',
  lastname: 'Shrek',
  email: 'fionashrek@example.com',
  password: bcrypt.hashSync('fionaPass123', bcrypt.genSaltSync()),
  address: '678 Maple Ave',
  phone: '0353333333',
  picture: null,
  description: 'Amoureuse de la nature et des animaux.',
  role: RoleStudent,
  courses: [CourseTwo],
  isArchive: false,
};

export const UserStudentSeven: UserWithIncluded = {
  id: 'user_thirteen_id',
  roleId: RoleStudent.id,
  firstname: 'Liam',
  lastname: 'Johnson',
  email: 'liamjohnson@example.com',
  password: bcrypt.hashSync('liamPass456', bcrypt.genSaltSync()),
  address: '234 Oak St',
  phone: '0357777777',
  picture: null,
  description: 'Passionné de technologie et de musique.',
  role: RoleStudent,
  courses: [CourseTwo],
  isArchive: false,
};

export const UserStudentEight: UserWithIncluded = {
  id: 'user_fourteen_id',
  roleId: RoleStudent.id,
  firstname: 'Sophia',
  lastname: 'Johnson',
  email: 'sophiajohnson@example.com',
  password: bcrypt.hashSync('sophiaPass456', bcrypt.genSaltSync()),
  address: '123 Willow Rd',
  phone: '0357777777',
  picture: null,
  description: 'Étudiante en musique, passionnée par le chant et la danse.',
  role: RoleStudent,
  courses: [CourseThree],
  isArchive: false,
};

export const UserStudentNine: UserWithIncluded = {
  id: 'user_fifteen_id',
  roleId: RoleStudent.id,
  firstname: 'Ian',
  lastname: 'Malcolm',
  email: 'ianmalcolm@example.com',
  password: bcrypt.hashSync('ianPass123', bcrypt.genSaltSync()),
  address: '901 Willow St',
  phone: '0356666666',
  picture: null,
  description: 'Amateur de science et de musique.',
  role: RoleStudent,
  courses: [CourseThree],
  isArchive: false,
};

export const UserStudentTen: UserWithIncluded = {
  id: 'user_sixteen_id',
  roleId: RoleStudent.id,
  firstname: 'Jenna',
  lastname: 'Marbles',
  email: 'jennamarbles@example.com',
  password: bcrypt.hashSync('jennaPass123', bcrypt.genSaltSync()),
  address: '012 Aspen St',
  phone: '0357777777',
  picture: null,
  description: 'Créative et pleine d’idées pour la musique.',
  role: RoleStudent,
  courses: [CourseThree],
  isArchive: false,
};

export const UserTeacherOne: UserWithIncluded = {
  id: 'user_seventeen_id',
  roleId: RoleTeacher.id,
  firstname: 'William',
  lastname: 'Turner',
  email: 'williamturner@example.com',
  password: bcrypt.hashSync('turnerPass123', bcrypt.genSaltSync()),
  address: '321 Oak St',
  phone: '0345555555',
  picture: null,
  description: 'Professeur de musique expérimenté.',
  role: RoleTeacher,
  courses: [CourseOne],
  isArchive: false,
};

export const UserTeacherTwo: UserWithIncluded = {
  id: 'user_eighteen_id',
  roleId: RoleTeacher.id,
  firstname: 'Laura',
  lastname: 'Croft',
  email: 'lauracroft@example.com',
  password: bcrypt.hashSync('croftPass123', bcrypt.genSaltSync()),
  address: '432 Elm St',
  phone: '0346666666',
  picture: null,
  description: 'Enseignante en piano et chant.',
  role: RoleTeacher,
  courses: [CourseTwo],
  isArchive: false,
};

export const UserTeacherThree: UserWithIncluded = {
  id: 'user_nineteen_id',
  roleId: RoleTeacher.id,
  firstname: 'Bruce',
  lastname: 'Wayne',
  email: 'brucewayne@example.com',
  password: bcrypt.hashSync('waynePass123', bcrypt.genSaltSync()),
  address: '543 Maple St',
  phone: '0347777777',
  picture: null,
  description: 'Musicien et compositeur professionnel.',
  role: RoleTeacher,
  courses: [CourseThree],
  isArchive: false,
};

export const UserTeacherFour: UserWithIncluded = {
  id: 'user_twenty_id',
  roleId: RoleTeacher.id,
  firstname: 'Samantha',
  lastname: 'Carter',
  email: 'samanthacarter@example.com',
  password: bcrypt.hashSync('carterPass123', bcrypt.genSaltSync()),
  address: '654 Birch St',
  phone: '0348888888',
  picture: null,
  description: 'Passionnée de guitare et d’enseignement.',
  role: RoleTeacher,
  courses: [CourseOne, CourseTwo],
  isArchive: false,
};

export const UserTeacherFive: UserWithIncluded = {
  id: 'teacher_five_id',
  roleId: RoleTeacher.id,
  firstname: 'Olivia',
  lastname: 'Grant',
  email: 'oliviagrant@example.com',
  password: bcrypt.hashSync('teacherPass654', bcrypt.genSaltSync()),
  address: '890 Harmony Ave',
  phone: '0358888888',
  picture: null,
  description:
    'Enseignante de violon, passionnée par la musique classique et l’éducation musicale.',
  role: RoleTeacher,
  courses: [CourseOne, CourseTwo, CourseThree],
  isArchive: false,
};

export const UserTeacherSix: UserWithIncluded = {
  id: 'teacher_six_id',
  roleId: RoleTeacher.id,
  firstname: 'Emma',
  lastname: 'Watson',
  email: 'emmawatson@example.com',
  password: bcrypt.hashSync('emmaPass321', bcrypt.genSaltSync()),
  address: '456 Maple Ave',
  phone: '0358888888',
  picture: null,
  description: 'Instructrice de piano avec une passion pour la musique jazz.',
  role: RoleTeacher,
  courses: [CourseOne, CourseTwo, CourseThree],
  isArchive: false,
};

export const UserTeacherSeven: UserWithIncluded = {
  id: 'teacher_seven_id',
  roleId: RoleTeacher.id,
  firstname: 'Ethan',
  lastname: 'Hunt',
  email: 'ethanhunt@example.com',
  password: bcrypt.hashSync('teacherPass159', bcrypt.genSaltSync()),
  address: '789 Teacher St',
  phone: '0354444444',
  picture: null,
  description:
    'Professeur de musique contemporaine avec une approche innovante.',
  role: RoleTeacher,
  courses: [CourseOne, CourseTwo, CourseThree],
  isArchive: false,
};

export const UserTeacherEight: UserWithIncluded = {
  id: 'teacher_eight_id',
  roleId: RoleTeacher.id,
  firstname: 'Sophia',
  lastname: 'Turner',
  email: 'sophiaturner@example.com',
  password: bcrypt.hashSync('sophiaPass456', bcrypt.genSaltSync()),
  address: '234 Oak St',
  phone: '0359999999',
  picture: null,
  description:
    "Professeur de guitare, passionnée par l'enseignement et l'innovation musicale.",
  role: RoleTeacher,
  courses: [CourseOne, CourseTwo, CourseThree],
  isArchive: false,
};

export const UserTeacherNine: UserWithIncluded = {
  id: 'teacher_nine_id',
  roleId: RoleTeacher.id,
  firstname: 'George',
  lastname: 'Smith',
  email: 'georgesmith@example.com',
  password: bcrypt.hashSync('teacherPass456', bcrypt.genSaltSync()),
  address: '901 Teacher St',
  phone: '0356666666',
  picture: null,
  description:
    'Spécialiste de la percussion avec une passion pour l’enseignement.',
  role: RoleTeacher,
  courses: [CourseOne, CourseTwo, CourseThree],
  isArchive: false,
};

export const UserTeacherTen: UserWithIncluded = {
  id: 'teacher_ten_id',
  roleId: RoleTeacher.id,
  firstname: 'Hannah',
  lastname: 'Montana',
  email: 'hannahmontana@example.com',
  password: bcrypt.hashSync('teacherPass852', bcrypt.genSaltSync()),
  address: '012 Teacher St',
  phone: '0357777777',
  picture: null,
  description:
    'Professeur de danse et de musique, inspirant la prochaine génération.',
  role: RoleTeacher,
  courses: [CourseOne, CourseTwo, CourseThree],
  isArchive: false,
};

export const AllUser: UserWithIncluded[] = [
  UserAdminOne,
  UserAdminTwo,
  UserAdminThree,
  UserManagerOne,
  UserManagerTwo,
  UserManagerThree,
  UserStudentOne,
  UserStudentTwo,
  UserStudentThree,
  UserStudentFour,
  UserStudentFive,
  UserStudentSix,
  UserStudentSeven,
  UserStudentEight,
  UserStudentNine,
  UserStudentTen,
  UserTeacherOne,
  UserTeacherTwo,
  UserTeacherThree,
  UserTeacherFour,
  UserTeacherFive,
  UserTeacherSix,
  UserTeacherSeven,
  UserTeacherEight,
  UserTeacherNine,
  UserTeacherTen,
];
