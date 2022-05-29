import React, { useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './styles';
import Header from '../../components/Header';
import { ScrollView } from 'react-native';
import FloatButton from '../../components/FloatButton';
import { ParentTodoType } from './types';
import { ParentTodoItem } from '../../components/Todo';
import TodoCreateAndUpdateModal from './components/TodoCreateAndUpdateModal';

const Todos = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [todos, setTodos] = useState<ParentTodoType[]>([]);

  const { themeColor } = useTheme();

  const onAddTodo = (item: ParentTodoType) => {
    if (item.text) {
      item.subSteps = item.subSteps.filter((step) => step.text);
      setTodos([...todos, item]);
      setIsVisible(false);
    }
  };

  const onCompleteTodo = (_id: string) => {
    setTodos((prevState) => {
      return prevState.map((item) => {
        if (item._id === _id) {
          const allStepsCompleted = item.subSteps.every((child) => child.completed);
          if (allStepsCompleted) {
            return {
              ...item,
              completed: !item.completed,
              subSteps: item.subSteps.map((child) => {
                return {
                  ...child,
                  completed: !item.completed,
                };
              }),
            };
          }
        }

        return {
          ...item,
          subSteps: item.subSteps.map((subStep) => {
            if (subStep._id === _id) {
              item.completed = false;
              return { ...subStep, completed: !subStep.completed };
            }
            return subStep;
          }),
        };
      });
    });
  };

  const onEditTodo = () => {};

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: themeColor.background }]}>
      <Header />
      <ScrollView style={{ paddingTop: 16 }}>
        {todos.map((item) => (
          <ParentTodoItem key={item._id} item={item} onCompleteTodo={onCompleteTodo} onEditTodo={onEditTodo} />
        ))}
      </ScrollView>
      <FloatButton onPress={() => setIsVisible(!isVisible)} />
      {isVisible && <TodoCreateAndUpdateModal onCloseModal={() => setIsVisible(false)} onAddTodo={onAddTodo} />}
    </SafeAreaView>
  );
};

export default Todos;