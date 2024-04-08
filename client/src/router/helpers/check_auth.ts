import user from '@/store/index';

export default function checkAuth(): boolean {
  console.log(user.value);
  if (!user.value) {
    const token = localStorage.getItem('access_token');

    if (token) {
      // тут запрос на проверку токена
      // типа всё прошло хорошо и мы получили юзера и записали его в стор и разрешили хуярить дальше по урлу

      return true;
    }
    return false;
  } else {
    return true;
  }
}
