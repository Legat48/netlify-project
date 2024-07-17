export default function (timestamp) {
  // Получаем текущее время в формате UNIX (количество секунд с начала эпохи)
  const currentTime = Math.floor(Date.now())
  // Вычисляем 15 минут в секундах
  const fifteenMinutes = 15 * 60
  // Вычисляем время, прошедшее с timestamp
  const timePassed = currentTime - timestamp
  // Проверяем, что время, прошедшее с timestamp, не превышает 15 минут
  return timePassed / 1000 <= fifteenMinutes
}
