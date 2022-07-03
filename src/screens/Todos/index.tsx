import React, { useEffect, useState } from 'react';
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
import StorageHelper from '../../helpers/StorageHelper';

const Todos = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [todos, setTodos] = useState<ParentTodoType[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const { themeColor } = useTheme();

  useEffect(() => {
    const getStoragedTodos = async () => {
      const storagedTodos = await StorageHelper.getStoragedData('@todos');
      if (storagedTodos) {
        setTodos(storagedTodos);
      }
    };

    getStoragedTodos();
  }, []);

  const onAddTodo = async (item: ParentTodoType) => {
    if (item.text) {
      item.subSteps = item.subSteps.filter((step) => step.text);
      setTodos([...todos, item]);
      await StorageHelper.setStoragedData('@todos', [...todos, item]);
      setIsVisible(false);
    }

    if (item.notification.isEnabled) {
      NotificationHelper.createNormalNotification(item);
      NotificationHelper.createTriggerNotification(item);
    }
  };

  const onUpdateTodo = async (item: ParentTodoType) => {
    if (item.text) {
      item.subSteps = item.subSteps.filter((step) => step.text);
      setTodos(todos.map((todo) => (todo._id === item._id ? item : todo)));

      await StorageHelper.setStoragedData(
        '@todos',
        todos.map((todo) => (todo._id === item._id ? item : todo)),
      );

      setIsVisible(false);
      setSelectedId(null);
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
      setSelectedId(item._id);
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

  const onDeleteTodo = async (_id: string) => {
    setTodos((prevState) => prevState.filter((item) => item._id !== _id));
    await StorageHelper.setStoragedData(
      '@todos',
      todos.filter((item) => item._id !== _id),
    );

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
            setSelectedId(null);
          }}
          onAddTodo={onAddTodo}
          onUpdateTodo={onUpdateTodo}
          selectedId={selectedId}
        />
      )}
    </SafeAreaView>
  );
};

export default Todos;
