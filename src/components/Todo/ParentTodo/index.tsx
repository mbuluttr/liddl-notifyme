import { Alert, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { useTheme } from '../../../contexts/ThemeContext';
import { styles } from './styles';
import Octicons from 'react-native-vector-icons/Octicons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ParentTodoType } from '../../../screens/Todos/types';
import ChildTodoItem from '../ChildTodo';

type ParentTodoProps = {
  item: ParentTodoType;
  onCompleteTodo: (_id: string) => void;
  onParentTodoLongPress: (_id: string) => void;
  onDeleteTodo: (_id: string) => void;
};

const ParentTodoItem = ({ item, onCompleteTodo, onParentTodoLongPress, onDeleteTodo }: ParentTodoProps) => {
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
          {item.completed && (
            <TouchableOpacity
              style={styles.deleteButton}
              hitSlop={{ left: 56, right: 56, top: 56, bottom: 56 }}
              activeOpacity={0.8}
              onPress={() =>
                Alert.alert('Delete', 'Are you sure you want to delete this todo?', [
                  { text: 'Cancel', style: 'cancel' },
                  { text: 'Delete', onPress: () => onDeleteTodo(item._id) },
                ])
              }
            >
              <Ionicons name="trash-outline" size={24} color={themeColor.button} />
            </TouchableOpacity>
          )}
        </View>
      </TouchableOpacity>

      {item.subSteps.map((subStep) => (
        <ChildTodoItem item={subStep} key={subStep._id} onCompleteTodo={onCompleteTodo} />
      ))}
    </View>
  );
};

export default ParentTodoItem;
