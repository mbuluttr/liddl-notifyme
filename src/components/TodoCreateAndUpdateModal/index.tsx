import { View, Text, Switch, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { v4 as uuidv4 } from 'uuid';
import AppModal from '../AppModal';
import AddTodoInput from '../AddTodoInput';
import { ParentTodoType } from '../../screens/Todos/types';
import { useTheme } from '../../contexts/ThemeContext';
import { styles } from './styles';

type TodoCreateAndUpdateModalProps = {
  onCloseModal: () => void;
  onAddTodo: (item: ParentTodoType) => void;
  onUpdateTodo: (item: ParentTodoType) => void;
  selectedParent: ParentTodoType | null;
};

const TodoCreateAndUpdateModal = ({
  onCloseModal,
  onAddTodo,
  onUpdateTodo,
  selectedParent,
}: TodoCreateAndUpdateModalProps) => {
  const [todo, setTodo] = useState<ParentTodoType>({
    _id: selectedParent?._id || uuidv4(),
    text: selectedParent?.text || '',
    completed: selectedParent?.completed || false,
    subSteps: selectedParent?.subSteps || [],
    notification: selectedParent?.notification || {
      isEnabled: false,
      hour: 1,
      repeatedly: false,
    },
  });
  const [openNotification, setOpenNotification] = useState(selectedParent?.notification.isEnabled || false);
  const [repeatedly, setRepeatedly] = useState(selectedParent?.notification.repeatedly || false);
  const [reminderHour, setReminderHour] = useState(selectedParent?.notification.hour || 1);

  const { themeColor } = useTheme();

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

  const onReminderHourChange = (value: number) => {
    if (value < 1) {
      return;
    }

    setReminderHour(value);

    setTodo((prevState) => ({
      ...prevState,
      notification: {
        ...prevState.notification,
        hour: value,
      },
    }));
  };

  const onNotificationValueChange = (value: boolean) => {
    setOpenNotification(value);
    setTodo((prevState) => ({
      ...prevState,
      notification: {
        ...prevState.notification,
        isEnabled: value,
      },
    }));
  };

  const onRepeatedlyChange = (value: boolean) => {
    setRepeatedly(value);
    setTodo((prevState) => ({
      ...prevState,
      notification: {
        ...prevState.notification,
        repeatedly: value,
      },
    }));
  };

  return (
    <AppModal onClose={onCloseModal}>
      <AddTodoInput
        onAddSubStep={onAddSubStep}
        todoId={todo._id}
        onChangeInput={onChangeInput}
        lastItem={todo.subSteps.length === 0}
        defaultValue={todo.text}
      />
      {todo.subSteps.map((item, index) => (
        <AddTodoInput
          key={item._id}
          todoId={item._id}
          onChangeInput={onChangeInput}
          onRemoveSubStep={onRemoveSubStep}
          substep={true}
          lastItem={index === todo.subSteps.length - 1}
          defaultValue={todo.subSteps[index].text}
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
          onValueChange={onNotificationValueChange}
          value={openNotification}
        />
      </View>
      {openNotification && (
        <View>
          <View style={styles.reminderContainer}>
            <Text style={[styles.reminderText, { color: themeColor.text }]}>Remind me in</Text>
            <View style={styles.spinnerContainer}>
              <TouchableOpacity
                style={[styles.spinnerLeftButtonContainer, { backgroundColor: themeColor.button }]}
                activeOpacity={0.8}
                onPress={() => onReminderHourChange(reminderHour - 1)}
              >
                <AntDesign name="minus" size={24} color={themeColor.buttonIcon} />
              </TouchableOpacity>
              <View style={styles.spinnerTextContainer}>
                <Text style={[styles.spinnerText, { color: themeColor.text }]}>{reminderHour}h</Text>
              </View>
              <TouchableOpacity
                style={[styles.spinnerRightButtonContainer, { backgroundColor: themeColor.button }]}
                activeOpacity={0.8}
                onPress={() => onReminderHourChange(reminderHour + 1)}
              >
                <AntDesign name="plus" size={24} color={themeColor.buttonIcon} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.switchContainer}>
            <Text style={[styles.notificationInfoText, { color: themeColor.text }]}>
              Repeatedly {repeatedly ? 'ON' : 'OFF'}
            </Text>
            <Switch
              trackColor={{ false: themeColor.subStepSection, true: themeColor.subStepSection }}
              thumbColor={themeColor.text}
              ios_backgroundColor={themeColor.subStepSection}
              onValueChange={onRepeatedlyChange}
              value={repeatedly}
            />
          </View>
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
          onPress={() => {
            if (selectedParent) {
              onUpdateTodo(todo);
            } else {
              onAddTodo(todo);
            }
          }}
        >
          <Text style={[styles.buttonText, { color: themeColor.buttonIcon }]}>
            {selectedParent ? 'Update Todo' : 'Add Todo'}
          </Text>
        </TouchableOpacity>
      </View>
    </AppModal>
  );
};

export default TodoCreateAndUpdateModal;