const USER_MESSAGES = {
  ALREADY_EXISTS: 'User already exists',
  INVALID_CREDENTIALS: 'Invalid user credentials',
  INVALID_DATA: 'Invalid user data',
  NOT_FOUND: 'User not found'
}

const MOVIE_MESSAGES = {
  NOT_FOUND: 'Movie not found',
  CREATED: 'Movie created successfully',
  UPDATED: 'Movie updated successfully',
  DELETED: 'Movie deleted successfully'
}

const COMMON_MESSAGES = {
  SOMETHING_WENT_WRONG: 'Something went wrong'
}

export const Messages = {
  User: { ...USER_MESSAGES },
  Movie: { ...MOVIE_MESSAGES },
  Common: { ...COMMON_MESSAGES }
}
