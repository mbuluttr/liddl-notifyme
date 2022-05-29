import { View, Text, Switch, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { v4 as uuidv4 } from 'uuid';
import AppModal from '../../../../components/AppModal';
import AddTodoInput from '../../../../components/AddTodoInput';
import { ParentTodoType } from '../../types';
import { useTheme } from '../../../../contexts/ThemeContext';
import { styles } from './styles';

type TodoCreateAndUpdateModalProps = {
  onCloseModal: () => void;
  onAddTodo: (item: ParentTodoType) => void;
};

const TodoCreateAndUpdateModal = ({ onCloseModal, onAddTodo }: TodoCreateAndUpdateModalProps) => {
  const [todo, setTodo] = useState<ParentTodoType>({
    _id: uuidv4(),
    text: '',
    completed: false,
    subSteps: [],
  });
  const [openNotification, setOpenNotification] = useState(false);
  const [repeatedly, setRepeatedly] = useState(false);
  const [reminderHour, setReminderHour] = useState(1);

  const { themeColor } = useTheme();

  const onReminderHour = (type: 'plus' | 'minus') => {
    type === 'minus' && reminderHour > 1
      ? setReminderHour(reminderHour - 1)
      : type === 'plus' && setReminderHour(reminderHour + 1);
  };

  const onAddSubStep = () => {
    setTodo((prevState) => {
      return {
        ...prevState,
        subSteps: [...prevState.subSteps, { _id: uuidv4(), text: '', completed: false }],
      };
    });
  };

  const onRemoveSubStep = (id: string) => {
    setTodo((prevState) => {
      return {
        ...prevState,
        subSteps: prevState.subSteps.filter((subStep) => subStep._id !== id),
      };
    });
  };

  const onChangeInput = (text: string, id: string) => {
    setTodo((prevState) => {
      return {
        ...prevState,
        text: prevState._id === id ? text : prevState.text,
        subSteps: prevState.subSteps.map((item) => {
          if (item._id === id) {
            return { ...item, text: text };
          }
          return item;
        }),
      };
    });
  };

  return (
    <AppModal onClose={onCloseModal}>
      <AddTodoInput
        onAddSubStep={onAddSubStep}
        todoId={todo._id}
        onChangeInput={onChangeInput}
        lastItem={todo.subSteps.length === 0}
      />
      {todo.subSteps.map((item, index) => (
        <AddTodoInput
          key={item._id}
          todoId={item._id}
          onChangeInput={onChangeInput}
          onRemoveSubStep={onRemoveSubStep}
          substep={true}
          lastItem={index === todo.subSteps.length - 1}
        />
      ))}
      <View style={styles.switchContainer}>
        <Text style={[styles.notificationInfoText, { color: themeColor.text }]}>
          Notification {openNotification ? 'ON' : 'OFF'}
        </Text>
        <Switch
          trackColor={{ false: themeColor.subStepSection, true: themeColor.subStepSection }}
          thumbColor={themeColor.text}
          ios_backgroundColor={themeColor.subStepSection}
          onValueChange={() => {
            setOpenNotification(!openNotification);
            setRepeatedly(false);
            setReminderHour(1);
          }}
          value={openNotification}
        />
      </View>
      {openNotification && (
        <View style={styles.reminderContainer}>
          <Text style={[styles.reminderText, { color: themeColor.text }]}>Remind me in</Text>
          <View style={styles.spinnerContainer}>
            <TouchableOpacity
              style={[styles.spinnerLeftButtonContainer, { backgroundColor: themeColor.button }]}
              activeOpacity={0.8}
              onPress={() => onReminderHour('minus')}
            >
              <AntDesign name="minus" size={24} color={themeColor.buttonIcon} />
            </TouchableOpacity>
            <View style={styles.spinnerTextContainer}>
              <Text style={[styles.spinnerText, { color: themeColor.text }]}>{reminderHour}h</Text>
            </View>
            <TouchableOpacity
              style={[styles.spinnerRightButtonContainer, { backgroundColor: themeColor.button }]}
              activeOpacity={0.8}
              onPress={() => onReminderHour('plus')}
            >
              <AntDesign name="plus" size={24} color={themeColor.buttonIcon} />
            </TouchableOpacity>
          </View>
        </View>
      )}
      {openNotification && (
        <View style={styles.switchContainer}>
          <Text style={[styles.notificationInfoText, { color: themeColor.text }]}>
            Repeatedly {repeatedly ? 'ON' : 'OFF'}
          </Text>
          <Switch
            trackColor={{ false: themeColor.subStepSection, true: themeColor.subStepSection }}
            thumbColor={themeColor.text}
            ios_backgroundColor={themeColor.subStepSection}
            onValueChange={() => setRepeatedly(!repeatedly)}
            value={repeatedly}
          />
        </View>
      )}
      <View style={styles.bottomButtonContainer}>
        <TouchableOpacity
          style={[styles.button, { borderWidth: 1, borderColor: themeColor.button }]}
          activeOpacity={0.8}
        >
          <Text style={[styles.buttonText, { color: themeColor.text }]}>Cancel</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: themeColor.button }]}
          activeOpacity={0.8}
          onPress={() => onAddTodo(todo)}
        >
          <Text style={[styles.buttonText, { color: themeColor.buttonIcon }]}>Add Todo</Text>
        </TouchableOpacity>
      </View>
    </AppModal>
  );
};

export default TodoCreateAndUpdateModal;
