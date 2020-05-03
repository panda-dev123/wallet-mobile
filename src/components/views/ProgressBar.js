import React, {Component} from 'react';
import { 
    View, 
    ActivityIndicator
} from 'react-native';
import colors from "../../theme/colors";


export default ProgressBar = props => {
    if(props.visible){
        return(
            <View style={[{
                position: 'absolute',
                top: 0, bottom: 0, left: 0, right: 0,
                alignItems: 'center', justifyContent: 'center',
                backgroundColor: '#ffffffAA'
            }, props.style]}>
                <ActivityIndicator size="large" color={colors.navBarColor} />
            </View>
        )
    }else{
        return null
    }
}