export const ApiError = {
  commonServerError(res) {
    return res
      .status(500)
      .json({ access: false, error: 'Произошла ошибка на сервере' });
  },
  userNotFound(res) {
    return res
      .status(404)
      .json({ access: false, error: 'Пользователь не найден' });
  },
};
