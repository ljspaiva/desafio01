import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const data = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false
    }

    setTasks(tasks => [...tasks, data]);
  }

  function handleToggleTaskDone(id: number) {
    const updatedTasks = tasks.map(task => ({ ...task }));

    // Solução utilizando find
    updatedTasks.find(item => {
      if (item.id === id) {
        if (item.done) {
          item.done = false;
        } else {
          item.done = true;
        }
      }
    });

    // Solução utilizando forEach
    // updatedTasks.forEach(item => {
    //   if (item.id === id) {
    //     if (item.done) {
    //       item.done = false;
    //     } else {
    //       item.done = true;
    //     }
    //   }
    // }
    // );

    setTasks(updatedTasks);
  }

  function handleRemoveTask(id: number) {
    setTasks(tasks => tasks.filter(
      task => task.id !== id
    ));
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})