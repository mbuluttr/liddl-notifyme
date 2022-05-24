import { TextInput, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { styles } from './styles';
import { useTheme } from '../../contexts/ThemeContext';
import AntDesign from 'react-native-vector-icons/AntDesign';

type AddTodoInputProps = {
  todoId: string;
  substep?: boolean;
  lastItem?: boolean;
  onChangeInput: (text: string, id: string) => void;
  onAddSubStep?: () => void;
  onRemoveSubStep?: (id: string) => void;
};

const AddTodoInput = ({
  todoId,
  substep,
  onChangeInput,
  onAddSubStep,
  onRemoveSubStep,
  lastItem,
}: AddTodoInputProps) => {
  const { themeColor } = useTheme();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: themeColor.subStepSection,
          paddingLeft: substep ? 36 : 24,
          borderTopRightRadius: substep ? 0 : 6,
          borderTopLeftRadius: substep ? 0 : 6,
          borderBottomRightRadius: lastItem ? 6 : 0,
          borderBottomLeftRadius: lastItem ? 6 : 0,
        },
      ]}
    >
      {substep ? (
        <View style={[styles.circleOuter, { backgroundColor: themeColor.circleOuter }]}>
          <View style={[styles.circleInner, { backgroundColor: themeColor.circleInner }]} />
        </View>
      ) : (
        <View style={[styles.nonCompletedSquare, { backgroundColor: themeColor.nonCompletedSquare }]} />
      )}
      <TextInput
        style={[styles.textInput, { color: themeColor.text, backgroundColor: themeColor.input }]}
        onChangeText={(text) => onChangeInput(text, todoId)}
        placeholder={substep ? 'Add a step' : 'Add a todo'}
        placeholderTextColor={themeColor.text}
      />

      {onAddSubStep && (
        <TouchableOpacity
          style={[styles.addSubStepButton, { backgroundColor: themeColor.button }]}
          activeOpacity={0.8}
          onPress={() => onAddSubStep()}
        >
          <AntDesign name={'plus'} size={20} color={themeColor.buttonIcon} />
        </TouchableOpacity>
      )}

      {onRemoveSubStep && (
        <TouchableOpacity
          style={[styles.addSubStepButton, { backgroundColor: themeColor.button }]}
          activeOpacity={0.8}
          onPress={() => onRemoveSubStep(todoId)}
        >
          <AntDesign name={'minus'} size={20} color={themeColor.buttonIcon} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default AddTodoInput;
