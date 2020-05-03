import React from 'react';
import { Button } from 'react-native-elements';

const CustomButton = ({ onPress, title, titleStyle, buttonStyle, containerStyle }) => {

  return (
    <Button
      title={title}
      titleStyle={titleStyle}
      buttonStyle={buttonStyle}
      containerStyle={containerStyle}
      onPress={() => { onPress(); }}
    />
  );
};

export { CustomButton };
