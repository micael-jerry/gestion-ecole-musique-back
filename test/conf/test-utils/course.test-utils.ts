import { Course } from '@prisma/client';

export const CourseOne: Course = {
  id: 'guitar_course_id',
  name: 'Cours de Guitare',
  description:
    'Apprenez à maîtriser la guitare acoustique et électrique. Ce cours couvre les bases des accords, des gammes, et des techniques de jeu avancées, adaptées aux styles folk, rock, et classique.',
};

export const CourseTwo: Course = {
  id: 'piano_course_id',
  name: 'Cours de Piano',
  description:
    'Ce cours est conçu pour les pianistes de tous niveaux, offrant des leçons sur la technique, la lecture de partitions, et l’interprétation de morceaux classiques, jazz, et modernes.',
};

export const CourseThree: Course = {
  id: 'singing_course_id',
  name: 'Cours de Chant',
  description:
    "Développez votre voix et améliorez votre technique vocale avec ce cours de chant. Les leçons incluent la respiration, l'articulation, et l'interprétation vocale dans divers styles musicaux.",
};

export const CourseFour: Course = {
  id: 'drums_course_id',
  name: 'Cours de Batterie',
  description:
    'Apprenez les bases du rythme et de la coordination à travers ce cours de batterie. Il couvre les techniques de base et avancées pour jouer dans des styles comme le rock, le jazz, et le funk.',
};

export const CourseFive: Course = {
  id: 'violin_course_id',
  name: 'Cours de Violon',
  description:
    'Ce cours s’adresse aux débutants et aux violonistes intermédiaires. Les étudiants apprendront à jouer des morceaux classiques, tout en maîtrisant les techniques de base comme le pizzicato et les gammes.',
};

export const CourseSix: Course = {
  id: 'music_production_course_id',
  name: 'Cours de Production Musicale',
  description:
    'Apprenez à créer et à produire de la musique avec des logiciels de production audio. Ce cours couvre la composition, le mixage, et la maîtrise des morceaux dans divers genres comme l’électronique, le hip-hop, et la pop.',
};
