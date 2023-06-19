import React, { useState, useEffect, useCallback } from 'react';
import { View } from 'react-native';
import { Snackbar as ReactSnackbar } from 'react-native-paper';

const Snackbar = ({ text, label = 'Dismiss', onDismiss }) => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (text) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [text]);

  const onSnakcbarDismiss = useCallback(() => {
    setVisible(false);
    if (onDismiss) onDismiss();
  }, [setVisible, onDismiss]);

  return (
    <View>
      <ReactSnackbar
        visible={visible}
        onDismiss={onSnakcbarDismiss}
        action={{
          label,
        }}>
        {text}
      </ReactSnackbar>
    </View>
  );
};

export default Snackbar;
