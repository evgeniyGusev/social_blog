export const ApiError = {
  commonServerError(error, res) {
    return res
      .status(500)
      .json({ access: false, error: 'Произошла ошибка на сервере' });
  },
  notFound(res) {
    return res.status(404).json({ access: false, error: 'Не найдено' });
  },
};
