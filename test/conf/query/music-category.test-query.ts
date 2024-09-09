export const findAllMusicCategoryTestQuery = () => `
      query FindAllMusicCategory {
        findAllMusicCategory {
          id
          name
          description
        }
      }
    `;
