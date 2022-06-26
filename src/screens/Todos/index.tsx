import React, { useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './styles';
import Header from '../../components/Header';
import { ScrollView } from 'react-native';
import FloatButton from '../../components/FloatButton';
import { ParentTodoType } from './types';
import { ParentTodoItem } from '../../components/Todo';
import TodoCreateAndUpdateModal from '../../components/TodoCreateAndUpdateModal';
import NotificationHelper from '../../helpers/NotificationHelper';

const Todos = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [todos, setTodos] = useState<ParentTodoType[]>([]);
  const [selectedParent, setSelectedParent] = useState<ParentTodoType | null>(null);

  const { themeColor } = useTheme();

  const onAddTodo = (item: ParentTodoType) => {
    if (item.text) {
      item.subSteps = item.subSteps.filter((step) => step.text);
      setTodos([...todos, item]);
      setIsVisible(false);
    }

    if (item.notification.isEnabled) {
      NotificationHelper.createNormalNotification(item);
      NotificationHelper.createTriggerNotification(item);
    }
  };

  const onUpdateTodo = (item: ParentTodoType) => {
    if (item.text) {
      item.subSteps = item.subSteps.filter((step) => step.text);
      setTodos(todos.map((todo) => (todo._id === item._id ? item : todo)));
      setIsVisible(false);
      setSelectedParent(null);
    }

    if (item.notification.isEnabled) {
      NotificationHelper.createNormalNotification(item);
      NotificationHelper.createTriggerNotification(item);
    } else {
      NotificationHelper.cancelNotification(item._id);
    }
  };

  const onParentTodoLongPress = (_id: string) => {
    const item = todos.find((todo) => todo._id === _id);

    if (item) {
      setSelectedParent(item);
      setIsVisible(true);
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

  const onDeleteTodo = (_id: string) => {
    setTodos((prevState) => prevState.filter((item) => item._id !== _id));
    NotificationHelper.cancelNotification(_id);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: themeColor.background }]}>
      <Header title={'notify.me'} canGoBack={false} />
      <ScrollView style={{ paddingTop: 16 }}>
        {todos.map((item) => (
          <ParentTodoItem
            key={item._id}
            item={item}
            onCompleteTodo={onCompleteTodo}
            onParentTodoLongPress={onParentTodoLongPress}
            onDeleteTodo={onDeleteTodo}
          />
        ))}
      </ScrollView>
      <FloatButton onPress={() => setIsVisible(!isVisible)} />
      {isVisible && (
        <TodoCreateAndUpdateModal
          onCloseModal={() => {
            setIsVisible(false);
            setSelectedParent(null);
          }}
          onAddTodo={onAddTodo}
          onUpdateTodo={onUpdateTodo}
          selectedParent={selectedParent}
        />
      )}
    </SafeAreaView>
  );
};

export default Todos;
