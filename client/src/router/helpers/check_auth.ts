import userStore from '@/store/index';

export default function checkAuth(): boolean {
  console.log(userStore.value);
  if (!userStore.value) {
    const token = localStorage.getItem('access_token');

    if (token) {
      // тут запрос на проверку токена
      // типа всё прошло хорошо и мы получили юзера и записали его в стор и разрешили хуярить дальше по урлу
      userStore.value = {
        _id: '660d17dab9e5816ef9cdb58a',
        fullName: 'Эдуард',
        email: 'test@test.test',
        avatarUrl:
          'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.youtube.com%2F%40TeamAvatar&psig=AOvVaw0TKLHEuFUlrp3CFuGOEdU1&ust=1685633295854000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCKClyMDvn_8CFQAAAAAdAAAAABAE',
        posts: [],
        friends: [],
        createdAt: '2024-04-03T08:48:26.236Z',
        updatedAt: '2024-04-03T08:48:26.236Z',
        __v: 0,
      };

      return true;
    }
    return false;
  } else {
    return true;
  }
}
