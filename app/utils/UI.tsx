import Snackbar from "react-native-snackbar";

export const ToastMessage = (text:string,textColor:string,duration:number =Snackbar.LENGTH_LONG,backgroundColor:string = 'transparent') => {
    return Snackbar.show({
        text,
        duration,
        textColor,
        backgroundColor,
      });
};
