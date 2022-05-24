import { TouchableOpacity } from 'react-native';
import React from 'react';
import { styles } from './styles';
import Octicons from 'react-native-vector-icons/Octicons';
import { useTheme } from '../../contexts/ThemeContext';

type FloatButtonProps = {
  onPress: () => void;
};

const FloatButton = ({ onPress }: FloatButtonProps) => {
  const { themeColor } = useTheme();

  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor: themeColor.button }]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Octicons name={'plus'} size={32} color={themeColor.buttonIcon} />
    </TouchableOpacity>
  );
};

export default FloatButton;
