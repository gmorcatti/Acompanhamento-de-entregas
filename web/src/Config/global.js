import { toast } from 'react-toastify';

export function showError(e, msg){
    if(e && e.response && e.response.data){
        toast.error(msg ? msg : e.response.data);
        console.error(e, e.response.data);
    } else if(typeof e == 'string'){
        toast.error(msg ? msg : e);
        console.error(e);
    } else {
        toast.error();
    }
}

export function showSuccess(msg){
    if(typeof msg == 'string'){
        toast.success(msg);
    } else {
        toast.success();
    }
}