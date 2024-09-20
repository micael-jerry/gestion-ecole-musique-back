import { MusicCategory } from '@prisma/client';

export const MusicCategoryOne: MusicCategory = {
  id: 'classical_music_id',
  name: 'Musique Classique',
  description:
    'La musique classique est un genre traditionnellement associé aux grandes œuvres de compositeurs tels que Beethoven, Mozart, Bach, et Tchaïkovski. Elle est caractérisée par des compositions complexes, souvent orchestrales ou pour instruments comme le piano et le violon.',
};

export const MusicCategoryTwo: MusicCategory = {
  id: 'pop_music_id',
  name: 'Pop',
  description:
    "La pop est un genre accessible et généralement rythmé. Elle met souvent l'accent sur des mélodies accrocheuses et des refrains mémorables. La pop moderne intègre parfois des éléments d'autres genres comme le rock, le R&B ou l'électronique.",
};

export const MusicCategoryThree: MusicCategory = {
  id: 'rock_music_id',
  name: 'Rock',
  description:
    "Le rock se caractérise par l'utilisation dominante de guitares électriques, d'une batterie, et souvent d'une basse. Le genre a évolué pour inclure diverses sous-catégories comme le rock alternatif, le punk, et le métal.",
};

export const MusicCategoryFour: MusicCategory = {
  id: 'jazz_music_id',
  name: 'Jazz',
  description:
    "Le jazz est né aux États-Unis au début du 20e siècle. Il se caractérise par l'improvisation, des rythmes syncopés, et une grande expressivité. Les instruments principaux incluent la trompette, le saxophone, et le piano.",
};

export const MusicCategoryFive: MusicCategory = {
  id: 'country_music_id',
  name: 'Country',
  description:
    'La musique country trouve ses racines dans le folk américain et est caractérisée par des mélodies simples accompagnées de guitares acoustiques, banjos, et harmonicas. Elle raconte souvent des histoires sur la vie rurale et les émotions humaines.',
};

export const MusicCategorySix: MusicCategory = {
  id: 'blues_music_id',
  name: 'Blues',
  description:
    "Le blues est un genre fondamental qui a influencé le rock, le jazz, et d'autres styles. Il se caractérise par des structures d'accords simples et des thèmes récurrents liés à la souffrance et la vie quotidienne.",
};
