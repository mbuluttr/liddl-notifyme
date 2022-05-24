import { Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { useTheme } from '../../../contexts/ThemeContext';
import { styles } from './styles';
import Octicons from 'react-native-vector-icons/Octicons';
import { TodoType } from '../../../screens/Todos/types';

type ChildTodoProps = {
  item: TodoType;
  onCompleteTodo: (id: string) => void;
};

const ChildTodoItem = ({ item, onCompleteTodo }: ChildTodoProps) => {
  const { themeColor } = useTheme();

  return (
    <View>
      <TouchableOpacity
        style={[
          styles.container,
          {
            backgroundColor: themeColor.subStepSection,
          },
        ]}
        activeOpacity={0.8}
        onPress={() => onCompleteTodo(item.id)}
      >
        <View style={styles.leftContainer}>
          {item.completed ? (
            <View style={styles.stepCheck}>
              <Octicons name="check" size={24} color={themeColor.stepCheck} />
            </View>
          ) : (
            <View style={[styles.circleOuter, { backgroundColor: themeColor.circleOuter }]}>
              <View style={[styles.circleInner, { backgroundColor: themeColor.circleInner }]} />
            </View>
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
    </View>
  );
};

export default ChildTodoItem;
