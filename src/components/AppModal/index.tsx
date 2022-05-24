import React, { useRef, useState } from 'react';
import { NativeScrollEvent, NativeSyntheticEvent, ScrollView, View } from 'react-native';
import Modal from 'react-native-modal';
import { useTheme } from '../../contexts/ThemeContext';
import { styles } from './styles';

type AppModalProps = {
  children: React.ReactNode;
  onClose: () => void;
};

const AppModal = ({ children, onClose }: AppModalProps) => {
  const { themeColor } = useTheme();

  const [scrollOffset, setScrollOffset] = useState(0);

  const scrollRef = useRef<ScrollView>(null);

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    setScrollOffset(event.nativeEvent.contentOffset.y);
  };

  const onScrollTo = (e: any) => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo(e);
    }
  };

  return (
    <Modal
      style={styles.container}
      isVisible={true}
      backdropColor={themeColor.subStepSection}
      swipeDirection={'down'}
      hideModalContentWhileAnimating={true}
      avoidKeyboard={true}
      propagateSwipe={true}
      onSwipeComplete={onClose}
      onDismiss={onClose}
      onBackButtonPress={onClose}
      onBackdropPress={onClose}
      scrollTo={onScrollTo}
      scrollOffset={scrollOffset}
      scrollOffsetMax={75}
    >
      <View style={[styles.childrenContainer, { backgroundColor: themeColor.background }]}>
        <View style={[styles.line, { backgroundColor: themeColor.text }]} />
        <ScrollView
          ref={scrollRef}
          onScroll={onScroll}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps={'always'}
          scrollEventThrottle={16}
          contentContainerStyle={{ paddingBottom: 75 }}
        >
          {children}
        </ScrollView>
      </View>
    </Modal>
  );
};

export default AppModal;
