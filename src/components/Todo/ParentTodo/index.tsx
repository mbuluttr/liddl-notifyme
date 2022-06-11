import { Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { useTheme } from '../../../contexts/ThemeContext';
import { styles } from './styles';
import Octicons from 'react-native-vector-icons/Octicons';
import { ParentTodoType } from '../../../screens/Todos/types';
import ChildTodoItem from '../ChildTodo';

type ParentTodoProps = {
  item: ParentTodoType;
  onCompleteTodo: (_id: string) => void;
  onParentTodoLongPress: (_id: string) => void;
};

const ParentTodoItem = ({ item, onCompleteTodo, onParentTodoLongPress }: ParentTodoProps) => {
  const { themeColor } = useTheme();

  return (
    <View>
      <TouchableOpacity
        style={[
          styles.container,
          {
            backgroundColor: item.subSteps.length > 0 ? themeColor.subStepSection : themeColor.background,
          },
        ]}
        activeOpacity={0.8}
        onPress={() => onCompleteTodo(item._id)}
        onLongPress={() => onParentTodoLongPress(item._id)}
      >
        <View style={styles.leftContainer}>
          {item.completed ? (
            <View style={[styles.completedSquare, { backgroundColor: themeColor.completedSquare }]}>
              <Octicons name="check" size={20} color={themeColor.completedSquareCheck} />
            </View>
          ) : (
            <View style={[styles.nonCompletedSquare, { backgroundColor: themeColor.nonCompletedSquare }]} />
          )}
          <Text
            style={[
              styles.text,
              {
                color: themeColor.text,
                textDecorationLine: item.completed ? 'line-through' : 'none',
              },
            ]}
            numberOfLines={1}
          >
            {item.text}
          </Text>
        </View>
      </TouchableOpacity>

      {item.subSteps.map((subStep) => (
        <ChildTodoItem item={subStep} key={subStep._id} onCompleteTodo={onCompleteTodo} />
      ))}
    </View>
  );
};

export default ParentTodoItem;
