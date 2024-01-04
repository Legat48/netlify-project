/**
 * Поиск айди в задаче для ACV.
 *
 * @param {Array} taskList - список задач (описан в интерфейсах)
 */
interface Task {
  id: number;
  idStart: number;
  idEnd: number;
  substanceId: number;
  weight: number;
  priority: number,
  substanceName: string;
}

export function findMissingId (taskList: Task[]): number {
  const allIds: number[] = []

  taskList.forEach((task) => {
    allIds.push(task.id)
  })

  allIds.sort((a, b) => a - b)

  let missingId = 1
  for (const id of allIds) {
    if (id === missingId) {
      missingId++
    } else {
      break
    }
  }

  return missingId
}
