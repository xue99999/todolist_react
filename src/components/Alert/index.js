import { Modal } from 'antd-mobile';
const alert = Modal.alert;

export default function (props) {
    alert(props.title, props.content, [
        { text: 'Cancel', onPress: props.cancelClick },
        { text: 'Ok', onPress: props.okClick },
    ])
}
